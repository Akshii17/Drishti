import React, { useState, useMemo } from 'react'
import {
  Wrench, Search, Filter, ShieldCheck, AlertTriangle, Eye, Video, Download,
  CheckCircle2, Clock3, Info, ChevronRight, Layers, FileCheck
} from 'lucide-react'
import { Panel, SectionHeading } from '../../components/common/Panel'
import { MetricCard } from '../../components/common/MetricCard'
import { Badge, toneForStatus } from '../../components/common/Badge'
import { EmptyState } from '../../components/common/EmptyState'
import { useApp } from '../../context/AppContext'

const SLOT_STATES = [
  'ALL',
  'SEEN',
  'NOT_SEEN_CLEAR_VIEW',
  'BLOCKED',
  'PARTIAL',
  'UNABLE_TO_VERIFY',
  'MODEL_NOT_VALIDATED',
  'REVIEW_REQUIRED',
]

export function InfrastructurePage() {
  const { equipment, centres, setEvidenceViewer, setSelectedAlert, alerts, exportToCSV } = useApp()

  const [search, setSearch] = useState('')
  const [selectedCentre, setSelectedCentre] = useState('ALL')
  const [stateFilter, setStateFilter] = useState('ALL')
  const [categoryFilter, setCategoryFilter] = useState('ALL')

  const categories = useMemo(() => {
    return Array.from(new Set(equipment.map((e) => e.category))).sort()
  }, [equipment])

  const filtered = useMemo(() => {
    return equipment.filter((item) => {
      const matchesSearch =
        `${item.slot} ${item.name} ${item.room} ${item.notes}`.toLowerCase().includes(search.toLowerCase())
      const matchesCentre = selectedCentre === 'ALL' || item.centreId === selectedCentre
      const matchesState = stateFilter === 'ALL' || item.state === stateFilter
      const matchesCategory = categoryFilter === 'ALL' || item.category === categoryFilter
      return matchesSearch && matchesCentre && matchesState && matchesCategory
    })
  }, [equipment, search, selectedCentre, stateFilter, categoryFilter])

  // Aggregate metrics
  const totalSlots = equipment.length
  const verifiedSeen = equipment.filter((e) => e.state === 'SEEN').length
  const blockedCount = equipment.filter((e) => e.state === 'BLOCKED' || e.state === 'PARTIAL').length
  const reviewRequired = equipment.filter(
    (e) => e.state === 'NOT_SEEN_CLEAR_VIEW' || e.state === 'REVIEW_REQUIRED'
  ).length

  const handleExport = () => {
    exportToCSV(
      filtered.map((e) => ({
        SlotID: e.slot,
        Equipment: e.name,
        Category: e.category,
        Room: e.room,
        State: e.state,
        Confidence: e.confidence,
        LastChecked: e.checked,
        Notes: e.notes,
      })),
      `drishti_infrastructure_inventory_${Date.now()}.csv`
    )
  }

  const handleInspectSlot = (item) => {
    setEvidenceViewer({
      title: `Equipment Slot ${item.slot}: ${item.name}`,
      type: 'Infrastructure Verification',
      centre: `Centre ${item.centreId}`,
      room: item.room,
      timestamp: `18 Oct 2026, ${item.checked}`,
      summary: `State: ${item.state}. ${item.notes}. Fixed spatial boundary check applied.`,
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <SectionHeading
        eyebrow="Pipeline 02"
        title="Infrastructure Verification"
        subtitle="Monitors registered fixed equipment slots (lathes, workbenches, tailoring units, safety kits) against calibrated CCTV field-of-view sweeps."
        action={
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleExport}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-xs"
            >
              <Download size={14} /> Export Inventory CSV
            </button>
            <button
              onClick={() => {
                const infraAlert = alerts.find((a) => a.id === 'DR-105')
                if (infraAlert) setSelectedAlert(infraAlert)
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-teal-800 px-4 py-2 text-xs font-bold text-white hover:bg-teal-900 transition shadow-card"
            >
              <AlertTriangle size={14} /> Review Flagged Slots
            </button>
          </div>
        }
      />

      {/* Compliance Rule Banner */}
      <div className="rounded-2xl border border-teal-200 bg-teal-50/70 p-4 text-xs text-teal-950 flex items-start gap-2.5 shadow-xs">
        <Info size={18} className="text-teal-800 shrink-0 mt-0.5" />
        <div>
          <span className="font-extrabold tracking-wide">
            VERIFICATION STANDARD NOTICE:
          </span>
          <span className="ml-1 text-slate-700">
            An equipment slot obscured or missing in available camera frames is <strong>NOT</strong> automatically proven absent. The system designates such observations as <em>BLOCKED</em> or <em>REVIEW_REQUIRED</em>, mandating a formal physical audit before punitive sanctions.
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Total Calibrated Slots"
          value={totalSlots}
          hint="Registered fixed positions"
          icon={Wrench}
          tone="teal"
        />
        <MetricCard
          label="Positively Verified"
          value={verifiedSeen}
          hint="Clear spatial detection"
          icon={CheckCircle2}
          tone="green"
        />
        <MetricCard
          label="Sightline Blocked"
          value={blockedCount}
          hint="View obscured / partial"
          icon={Eye}
          tone="yellow"
        />
        <MetricCard
          label="Review Required"
          value={reviewRequired}
          hint="2 consecutive sweeps"
          icon={AlertTriangle}
          tone="red"
        />
      </div>

      {/* Table & Filter Controls */}
      <Panel className="overflow-hidden">
        {/* Filter Bar */}
        <div className="flex flex-col gap-3 border-b border-slate-100 p-4 lg:flex-row lg:items-center lg:justify-between bg-slate-50/50">
          <div className="relative flex-1 max-w-sm">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search slot ID, machine, or room..."
              className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-xs outline-none focus:border-teal-700"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <select
              value={selectedCentre}
              onChange={(e) => setSelectedCentre(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 outline-none"
            >
              <option value="ALL">All Centres</option>
              {centres.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.id} — {c.name}
                </option>
              ))}
            </select>

            <select
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 outline-none"
            >
              <option value="ALL">All Observed States</option>
              {SLOT_STATES.filter((s) => s !== 'ALL').map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 outline-none"
            >
              <option value="ALL">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            {(search || selectedCentre !== 'ALL' || stateFilter !== 'ALL' || categoryFilter !== 'ALL') && (
              <button
                onClick={() => {
                  setSearch('')
                  setSelectedCentre('ALL')
                  setStateFilter('ALL')
                  setCategoryFilter('ALL')
                }}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-500 hover:bg-slate-50"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Inventory Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[760px]">
            <thead className="bg-slate-50 text-[10px] uppercase font-bold tracking-wider text-slate-400">
              <tr>
                <th className="px-5 py-3">Slot ID</th>
                <th className="px-5 py-3">Equipment Name</th>
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3">Room / Workshop</th>
                <th className="px-5 py-3">Observed State</th>
                <th className="px-5 py-3">Confidence</th>
                <th className="px-5 py-3">Last Sweep</th>
                <th className="px-5 py-3">Field Notes</th>
                <th className="px-5 py-3 text-right">Evidence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => handleInspectSlot(item)}
                  className="hover:bg-teal-50/40 cursor-pointer transition"
                >
                  <td className="px-5 py-3.5 font-bold font-mono text-teal-800">{item.slot}</td>
                  <td className="px-5 py-3.5 font-bold text-ink">{item.name}</td>
                  <td className="px-5 py-3.5 text-slate-500">{item.category}</td>
                  <td className="px-5 py-3.5 text-slate-600 font-medium">{item.room}</td>
                  <td className="px-5 py-3.5">
                    <Badge tone={toneForStatus(item.state)} size="xs" dot>
                      {item.state}
                    </Badge>
                  </td>
                  <td className="px-5 py-3.5 font-mono text-slate-500">{item.confidence}</td>
                  <td className="px-5 py-3.5 text-slate-400">{item.checked}</td>
                  <td className="px-5 py-3.5 text-slate-500 max-w-xs truncate">{item.notes}</td>
                  <td className="px-5 py-3.5 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleInspectSlot(item)
                      }}
                      className="rounded-lg p-1.5 text-slate-400 hover:text-teal-800 hover:bg-slate-100"
                    >
                      <Video size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <EmptyState
              title="No equipment slots match"
              description="Try selecting a different status filter or clearing your search term."
            />
          )}
        </div>

        <div className="border-t border-slate-100 px-5 py-3 text-xs text-slate-400 bg-slate-50/40 flex items-center justify-between">
          <span>Showing {filtered.length} of {equipment.length} calibrated workstation slots</span>
          <span>Fixed slot boundaries • Synthetic validation active</span>
        </div>
      </Panel>

      {/* Guide to Interpreting Slot States */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel className="p-5">
          <h3 className="font-bold text-sm text-ink mb-1">Slot State Interpretation Guide</h3>
          <p className="text-xs text-slate-500 mb-4">
            How officers must interpret automated optical states under SIH compliance protocol.
          </p>

          <div className="space-y-3 text-xs">
            <div className="flex items-start gap-3">
              <Badge tone="green" size="xs">SEEN</Badge>
              <p className="text-slate-600">Equipment detected inside calibrated spatial polygon with valid confidence.</p>
            </div>
            <div className="flex items-start gap-3">
              <Badge tone="yellow" size="xs">BLOCKED</Badge>
              <p className="text-slate-600">Sightline occluded by cardboard, curtains, or trainees. Not a missing finding.</p>
            </div>
            <div className="flex items-start gap-3">
              <Badge tone="yellow" size="xs">PARTIAL</Badge>
              <p className="text-slate-600">Equipment partially visible (&gt;50% occluded). Re-sweep scheduled.</p>
            </div>
            <div className="flex items-start gap-3">
              <Badge tone="red" size="xs">NOT_SEEN_CLEAR_VIEW</Badge>
              <p className="text-slate-600">Clear camera view of floor mount, but machinery missing across 2 sweeps.</p>
            </div>
            <div className="flex items-start gap-3">
              <Badge tone="blue" size="xs">UNABLE_TO_VERIFY</Badge>
              <p className="text-slate-600">Camera lighting or resolution below required diagnostic threshold.</p>
            </div>
          </div>
        </Panel>

        <Panel className="p-5 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-sm text-ink mb-1">Recent Multi-Sweep History</h3>
            <p className="text-xs text-slate-500 mb-4">
              Automated spatial sweeps conducted today for Nashik & Pune.
            </p>

            <div className="space-y-3.5 text-xs">
              <div className="flex items-start gap-3">
                <span className="h-2 w-2 rounded-full bg-amber-500 mt-1 shrink-0" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-ink">10:30 AM Post-Session Sweep</span>
                    <Badge tone="yellow" size="xs">2 Flags</Badge>
                  </div>
                  <p className="text-slate-500 mt-0.5">Slot SM-04 absent in clear view; SM-03 blocked by divider.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="h-2 w-2 rounded-full bg-teal-600 mt-1 shrink-0" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-ink">08:45 AM Baseline Morning Sweep</span>
                    <Badge tone="green" size="xs">Verified</Badge>
                  </div>
                  <p className="text-slate-500 mt-0.5">Pre-session calibration confirmed 8 of 10 visible stations ready.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Next automatic sweep: 01:30 PM</span>
            <span className="text-teal-800 font-bold">Audit Interval: 120 mins</span>
          </div>
        </Panel>
      </div>
    </div>
  )
}
