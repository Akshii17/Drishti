import React, { useState, useMemo } from 'react'
import {
  Bell, Search, Filter, CheckCheck, Clock3, AlertTriangle, Users, Wrench,
  Activity, Video, ChevronRight, Download, CheckCircle2, RefreshCw, X, ShieldCheck
} from 'lucide-react'
import { Panel, SectionHeading } from '../../components/common/Panel'
import { MetricCard } from '../../components/common/MetricCard'
import { Badge, toneForStatus } from '../../components/common/Badge'
import { EmptyState } from '../../components/common/EmptyState'
import { useApp } from '../../context/AppContext'

export function AlertsPage() {
  const { alerts, updateAlert, setSelectedAlert, centres, exportToCSV, showToast } = useApp()

  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('ALL')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [priorityFilter, setPriorityFilter] = useState('ALL')
  const [centreFilter, setCentreFilter] = useState('ALL')

  const filteredAlerts = useMemo(() => {
    return alerts.filter((a) => {
      const matchesSearch =
        `${a.id} ${a.reason} ${a.centre} ${a.centreId} ${a.room}`.toLowerCase().includes(search.toLowerCase())
      const matchesType = typeFilter === 'ALL' || a.type === typeFilter
      const matchesStatus = statusFilter === 'ALL' || a.status === statusFilter
      const matchesPriority = priorityFilter === 'ALL' || a.priority === priorityFilter
      const matchesCentre = centreFilter === 'ALL' || a.centreId === centreFilter
      return matchesSearch && matchesType && matchesStatus && matchesPriority && matchesCentre
    })
  }, [alerts, search, typeFilter, statusFilter, priorityFilter, centreFilter])

  // Count summaries
  const pendingCount = alerts.filter(
    (a) => !['Resolved', 'Dismissed', 'Confirmed'].includes(a.status)
  ).length
  const confirmedCount = alerts.filter((a) => a.status === 'Confirmed').length
  const dismissedCount = alerts.filter((a) => a.status === 'Dismissed').length

  const handleResolveAllPendingDemo = () => {
    alerts.forEach((a) => {
      if (!['Resolved', 'Dismissed', 'Confirmed'].includes(a.status)) {
        updateAlert(a.id, {
          status: 'Resolved',
          reviewerNotes: 'Bulk resolved in SIH demo mode.',
        })
      }
    })
    showToast('All pending findings updated to Resolved (Demo Mode)', 'info')
  }

  const handleExport = () => {
    exportToCSV(
      filteredAlerts.map((a) => ({
        ID: a.id,
        Type: a.type,
        Centre: a.centre,
        CentreID: a.centreId,
        Room: a.room,
        Priority: a.priority,
        Status: a.status,
        Reason: a.reason,
        ReportedDate: a.date,
        ReportedTime: a.time,
        AssignedTo: a.assignedTo || 'Unassigned',
        ReviewerNotes: a.reviewerNotes || 'None',
      })),
      `drishti_alerts_${Date.now()}.csv`
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <SectionHeading
        eyebrow="Action & Governance"
        title="Alerts & Human Review Queue"
        subtitle="Review divergent automated indicators across attendance, equipment, and activity. Issue formal audit decisions and corrective actions."
        action={
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleExport}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-xs"
            >
              <Download size={14} /> Export CSV
            </button>
            <button
              onClick={handleResolveAllPendingDemo}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-xs"
            >
              <CheckCheck size={14} /> Demo: Resolve Pending
            </button>
          </div>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Total Findings"
          value={alerts.length}
          hint="All logged issues"
          icon={Bell}
          tone="teal"
        />
        <MetricCard
          label="Pending Review"
          value={pendingCount}
          hint="Officer action needed"
          icon={Clock3}
          tone="yellow"
        />
        <MetricCard
          label="Confirmed Findings"
          value={confirmedCount}
          hint="Verified discrepancies"
          icon={AlertTriangle}
          tone="red"
        />
        <MetricCard
          label="Dismissed / Resolved"
          value={dismissedCount}
          hint="Review signed off"
          icon={CheckCircle2}
          tone="green"
        />
      </div>

      {/* Main Alert List Panel */}
      <Panel className="overflow-hidden">
        {/* Search & Multi-filter Bar */}
        <div className="flex flex-col gap-3 border-b border-slate-100 p-4 lg:flex-row lg:items-center lg:justify-between bg-slate-50/50">
          <div className="relative flex-1 max-w-sm">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search alert ID, reason, centre..."
              className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-xs outline-none focus:border-teal-700"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Type */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 outline-none"
            >
              <option value="ALL">All Types</option>
              <option value="Attendance">Attendance</option>
              <option value="Infrastructure">Infrastructure</option>
              <option value="Activity">Activity</option>
              <option value="Camera">Camera</option>
            </select>

            {/* Status */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 outline-none"
            >
              <option value="ALL">All Statuses</option>
              <option value="Pending review">Pending review</option>
              <option value="Under review">Under review</option>
              <option value="Recheck required">Recheck required</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Dismissed">Dismissed</option>
              <option value="Technical issue">Technical issue</option>
              <option value="Resolved">Resolved</option>
            </select>

            {/* Priority */}
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 outline-none"
            >
              <option value="ALL">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

            {/* Centre */}
            <select
              value={centreFilter}
              onChange={(e) => setCentreFilter(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 outline-none max-w-[150px] truncate"
            >
              <option value="ALL">All Centres</option>
              {centres.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.id} - {c.name}
                </option>
              ))}
            </select>

            {(search || typeFilter !== 'ALL' || statusFilter !== 'ALL' || priorityFilter !== 'ALL' || centreFilter !== 'ALL') && (
              <button
                onClick={() => {
                  setSearch('')
                  setTypeFilter('ALL')
                  setStatusFilter('ALL')
                  setPriorityFilter('ALL')
                  setCentreFilter('ALL')
                }}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-500 hover:bg-slate-50"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Table of Findings */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[800px]">
            <thead className="bg-slate-50 text-[10px] uppercase font-bold tracking-wider text-slate-400">
              <tr>
                <th className="px-5 py-3">Finding & ID</th>
                <th className="px-5 py-3">Training Centre / Room</th>
                <th className="px-5 py-3">Priority</th>
                <th className="px-5 py-3">Review Status</th>
                <th className="px-5 py-3">Reported Time</th>
                <th className="px-5 py-3">Assigned To</th>
                <th className="px-5 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAlerts.map((a) => (
                <tr
                  key={a.id}
                  onClick={() => setSelectedAlert(a)}
                  className="hover:bg-teal-50/40 cursor-pointer transition group"
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-start gap-3">
                      <span
                        className={`mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg shrink-0 ${
                          a.type === 'Attendance'
                            ? 'bg-sky-50 text-sky-700'
                            : a.type === 'Infrastructure'
                            ? 'bg-amber-50 text-amber-700'
                            : a.type === 'Camera'
                            ? 'bg-rose-50 text-rose-700'
                            : 'bg-teal-50 text-teal-700'
                        }`}
                      >
                        {a.type === 'Attendance' ? (
                          <Users size={16} />
                        ) : a.type === 'Infrastructure' ? (
                          <Wrench size={16} />
                        ) : a.type === 'Camera' ? (
                          <Video size={16} />
                        ) : (
                          <Activity size={16} />
                        )}
                      </span>
                      <div>
                        <p className="font-bold text-ink group-hover:text-teal-800 transition">
                          {a.reason}
                        </p>
                        <p className="text-[10px] text-slate-400 mt-0.5 font-mono">
                          {a.id} • {a.type}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <p className="font-semibold text-slate-700">{a.centre}</p>
                    <p className="text-[10px] text-slate-400">{a.room} • {a.batch || 'Batch'}</p>
                  </td>
                  <td className="px-5 py-3.5">
                    <Badge tone={a.priority === 'High' ? 'red' : a.priority === 'Medium' ? 'yellow' : 'slate'} size="xs">
                      {a.priority}
                    </Badge>
                  </td>
                  <td className="px-5 py-3.5">
                    <Badge tone={toneForStatus(a.status)} size="xs" dot>
                      {a.status}
                    </Badge>
                  </td>
                  <td className="px-5 py-3.5 text-slate-500 text-[11px]">
                    {a.date} • {a.time}
                  </td>
                  <td className="px-5 py-3.5 text-slate-600 font-medium">
                    {a.assignedTo || 'Unassigned'}
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedAlert(a)
                      }}
                      className="rounded-lg p-1.5 text-slate-400 hover:text-teal-800 hover:bg-slate-100 transition"
                      aria-label="Inspect alert"
                    >
                      <ChevronRight size={17} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredAlerts.length === 0 && (
            <EmptyState
              title="No alerts match your filter"
              description="Adjust the status or type dropdowns to view other findings."
            />
          )}
        </div>

        <div className="border-t border-slate-100 px-5 py-3 text-xs text-slate-400 bg-slate-50/40 flex items-center justify-between">
          <span>Showing {filteredAlerts.length} of {alerts.length} logged findings</span>
          <span>Decision support workflow active</span>
        </div>
      </Panel>
    </div>
  )
}
