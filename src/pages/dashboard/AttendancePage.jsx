import React, { useState } from 'react'
import {
  Users, Activity, ShieldCheck, AlertTriangle, Calendar, Video, Download,
  CheckCircle2, Info, ArrowRight, Eye, RefreshCw
} from 'lucide-react'
import {
  Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis
} from 'recharts'
import { Panel, SectionHeading } from '../../components/common/Panel'
import { MetricCard } from '../../components/common/MetricCard'
import { Badge } from '../../components/common/Badge'
import { occupancyTimelineData } from '../../data/mockData'
import { useApp } from '../../context/AppContext'

export function AttendancePage() {
  const { centres, setEvidenceViewer, setSelectedAlert, alerts, exportToCSV } = useApp()

  const [selectedCentre, setSelectedCentre] = useState('Pune Skills Hub')
  const [selectedRoom, setSelectedRoom] = useState('Room 2 (Electronics)')
  const [selectedDate, setSelectedDate] = useState('18 Oct 2026')
  const [selectedBatch, setSelectedBatch] = useState('A12 - Advanced CNC')

  // Sample values for selected session
  const referenceRoster = 24
  const peakObserved = 20
  const upperAllowance = 3
  const conservativeEstimate = peakObserved + upperAllowance // 23
  const minimumApparentGap = Math.max(0, referenceRoster - conservativeEstimate) // 1

  const handleOpenEvidence = () => {
    setEvidenceViewer({
      title: 'Classroom Occupancy Evidence Frame',
      type: 'Attendance Pipeline',
      centre: `${selectedCentre} (MH-04)`,
      room: selectedRoom,
      timestamp: `${selectedDate}, 10:42 AM`,
      summary: 'Conservative peak classroom occupancy calculated at 20 centroids with +3 error margin applied.',
    })
  }

  const handleExportReconciliation = () => {
    exportToCSV(
      occupancyTimelineData.map((d) => ({
        Interval: d.time,
        AuthorizedReference: d.reference,
        EstimatedOccupancy: d.occupancy,
        ConfidenceScore: `${d.confidence}%`,
        Status: d.occupancy + 3 < d.reference ? 'Potential Gap' : 'Normal',
      })),
      `drishti_attendance_reconciliation_${Date.now()}.csv`
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <SectionHeading
        eyebrow="Pipeline 01"
        title="Attendance Reconciliation"
        subtitle="Reconciles authorised roster registers against vision-derived classroom occupancy bounds to identify apparent training gaps."
        action={
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleExportReconciliation}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-xs"
            >
              <Download size={14} /> Export Interval Log
            </button>
            <button
              onClick={handleOpenEvidence}
              className="inline-flex items-center gap-2 rounded-xl bg-teal-800 px-4 py-2 text-xs font-bold text-white hover:bg-teal-900 transition shadow-card"
            >
              <Video size={14} /> Inspect Frame Evidence
            </button>
          </div>
        }
      />

      {/* Mandatory SIH Transparency Banner */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-amber-900 shadow-xs">
        <div className="flex items-center gap-2.5">
          <ShieldCheck size={18} className="text-amber-700 shrink-0" />
          <div>
            <span className="font-extrabold tracking-wide">
              DEMO MODE — NO LIVE AEBAS CONNECTION.
            </span>
            <span className="ml-1 text-amber-800">
              Roster inputs in this prototype are simulated. Conservative upper bound formula ensures no trainee absence is assumed without human review.
            </span>
          </div>
        </div>
        <Badge tone="yellow" size="xs">
          Synthetic Evaluation
        </Badge>
      </div>

      {/* Filters Row */}
      <Panel className="p-4 bg-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="block font-bold text-slate-500 uppercase tracking-wider mb-1 text-[10px]">
              Training Centre
            </label>
            <select
              value={selectedCentre}
              onChange={(e) => setSelectedCentre(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 font-medium text-slate-700 outline-none"
            >
              {centres.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-500 uppercase tracking-wider mb-1 text-[10px]">
              Classroom / Room
            </label>
            <select
              value={selectedRoom}
              onChange={(e) => setSelectedRoom(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 font-medium text-slate-700 outline-none"
            >
              <option>Room 2 (Electronics)</option>
              <option>Room 1 (Theory Lab)</option>
              <option>Workshop 1 (Electrical)</option>
              <option>Computer Lab 1</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-500 uppercase tracking-wider mb-1 text-[10px]">
              Scheduled Batch
            </label>
            <select
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 font-medium text-slate-700 outline-none"
            >
              <option>A12 - Advanced CNC</option>
              <option>E03 - Electrical Wiring</option>
              <option>D01 - Data Operator</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-500 uppercase tracking-wider mb-1 text-[10px]">
              Session Date
            </label>
            <input
              type="text"
              readOnly
              value={selectedDate}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 font-medium text-slate-700 outline-none"
            />
          </div>
        </div>
      </Panel>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Muster Reference"
          value={referenceRoster}
          hint="Demo official roster"
          icon={Users}
          tone="blue"
        />
        <MetricCard
          label="Peak Occupancy"
          value={peakObserved}
          hint="Highest CCTV count"
          icon={Activity}
          tone="teal"
        />
        <MetricCard
          label="Margin Allowance"
          value={`+${upperAllowance}`}
          hint="Calibrated occluded buffer"
          icon={ShieldCheck}
          tone="yellow"
        />
        <MetricCard
          label="Apparent Gap"
          value={minimumApparentGap}
          hint="Awaiting officer review"
          icon={AlertTriangle}
          tone={minimumApparentGap > 0 ? 'red' : 'green'}
        />
      </div>

      {/* Visual Chart */}
      <Panel className="p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base text-ink">
                Classroom Occupancy Over Session Intervals
              </h3>
              <Badge tone="yellow" size="xs" dot>
                Gap Flagged: 1 Candidate
              </Badge>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {selectedCentre} • {selectedRoom} • Morning Batch (09:00 - 12:00)
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400">
            15-minute observation windows
          </span>
        </div>

        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={occupancyTimelineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="attendanceAreaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0F766E" stopOpacity={0.22} />
                  <stop offset="100%" stopColor="#0F766E" stopOpacity={0.01} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#e2e8f0" strokeDasharray="4 4" vertical={false} />
              <XAxis dataKey="time" tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
              <YAxis domain={[0, 30]} tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null
                  return (
                    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-lg text-xs">
                      <p className="font-bold text-slate-400 mb-1">Time: {label}</p>
                      <p className="font-bold text-slate-700">Muster: {payload[0]?.payload.reference}</p>
                      <p className="font-bold text-teal-800">CCTV Detected: {payload[0]?.payload.occupancy}</p>
                      <p className="text-[10px] text-slate-500 mt-1">
                        Confidence: {payload[0]?.payload.confidence}%
                      </p>
                    </div>
                  )
                }}
              />
              <Area
                type="monotone"
                dataKey="reference"
                name="Roster Reference"
                stroke="#94a3b8"
                strokeDasharray="5 4"
                strokeWidth={2}
                fill="transparent"
              />
              <Area
                type="monotone"
                dataKey="occupancy"
                name="Vision Occupancy"
                stroke="#0F766E"
                strokeWidth={2.5}
                fill="url(#attendanceAreaGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-3 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-3">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-teal-800" /> Vision Detected Occupancy
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-0.5 w-4 border-t-2 border-dashed border-slate-400" /> Authorized Muster Reference (24)
            </span>
          </div>
          <span className="text-[11px] text-slate-400">
            Face blurring active per ISO 27701
          </span>
        </div>
      </Panel>

      {/* Reconciliation Math & Quality Assurance Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Step-by-Step Calculation Panel */}
        <Panel className="p-5 sm:p-6">
          <h3 className="font-bold text-base text-ink">Reconciliation Formula Breakdown</h3>
          <p className="text-xs text-slate-500 mt-1">
            Conservative math protects candidates from unvalidated AI deductions.
          </p>

          <div className="mt-5 space-y-3 text-xs">
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">1. Authorized Attendance Reference (Muster / AEBAS demo):</span>
              <span className="font-bold text-ink">{referenceRoster} candidates</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">2. Peak Sustained CCTV Occupancy:</span>
              <span className="font-bold text-ink">{peakObserved} observed</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">3. Calibrated Upper Error Margin (+15% allowance):</span>
              <span className="font-bold text-teal-800">+{upperAllowance} candidates</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">4. Conservative Upper Bound (Peak + Margin):</span>
              <span className="font-bold text-ink">{conservativeEstimate} candidates</span>
            </div>
            <div className="flex items-center justify-between p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 font-bold">
              <div>
                <p className="text-xs">Minimum Apparent Discrepancy Gap</p>
                <p className="text-[10px] font-normal text-amber-800">
                  Calculated: max(0, Reference - Conservative Upper Bound)
                </p>
              </div>
              <span className="text-2xl font-extrabold">{minimumApparentGap}</span>
            </div>
          </div>
        </Panel>

        {/* Video Quality Telemetry Panel */}
        <Panel className="p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-base text-ink">Telemetry & Evidence Confidence</h3>
            <p className="text-xs text-slate-500 mt-1">
              Quality metrics for the camera feed covering this session.
            </p>

            <div className="mt-5 space-y-4 text-xs">
              <div>
                <div className="flex justify-between mb-1.5 font-semibold">
                  <span className="text-slate-600">Usable 5-minute observation windows</span>
                  <span className="text-teal-800">92%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-teal-700 rounded-full" style={{ width: '92%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1.5 font-semibold">
                  <span className="text-slate-600">Classroom ambient illumination index</span>
                  <span className="text-teal-800">95%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-teal-700 rounded-full" style={{ width: '95%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1.5 font-semibold">
                  <span className="text-slate-600">Sightline clearance (low occlusion)</span>
                  <span className="text-amber-700">84%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: '84%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">
              Feed ID: CAM-PN-01 (1080p @ 25fps)
            </span>
            <button
              onClick={() => {
                const alertItem = alerts.find((a) => a.id === 'DR-104')
                if (alertItem) setSelectedAlert(alertItem)
              }}
              className="inline-flex items-center gap-1.5 rounded-xl bg-teal-800 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-teal-900 transition"
            >
              Open Audit Review &rarr;
            </button>
          </div>
        </Panel>
      </div>
    </div>
  )
}
