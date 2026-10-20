import React from 'react'
import {
  Building2, Users, Wrench, Activity, AlertTriangle, Video, ArrowUpRight,
  CheckCheck, Clock3, RefreshCw, ChevronRight, Download, ShieldCheck, Wifi,
  MonitorCheck, AlertCircle, Sparkles, CheckCircle2, ArrowRight
} from 'lucide-react'
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer,
  Tooltip, XAxis, YAxis
} from 'recharts'
import { Panel, SectionHeading } from '../../components/common/Panel'
import { MetricCard } from '../../components/common/MetricCard'
import { Badge, toneForStatus } from '../../components/common/Badge'
import { occupancyTimelineData } from '../../data/mockData'
import { useApp } from '../../context/AppContext'
import { useNavigate } from '../../router/Router'

export function OverviewPage() {
  const navigate = useNavigate()
  const {
    centres,
    alerts,
    equipment,
    activityStations,
    cameras,
    correctiveActions,
    selectedCentreId,
    setSelectedCentreId,
    setSelectedAlert,
    setSelectedCentreDetail,
    exportToCSV,
  } = useApp()

  // Filter if centre selected
  const visibleCentres = selectedCentreId === 'ALL'
    ? centres
    : centres.filter((c) => c.id === selectedCentreId)

  const visibleAlerts = selectedCentreId === 'ALL'
    ? alerts
    : alerts.filter((a) => a.centreId === selectedCentreId)

  const pendingAlerts = visibleAlerts.filter(
    (a) => !['Resolved', 'Dismissed', 'Confirmed'].includes(a.status)
  )

  const attendanceDiscrepancies = visibleAlerts.filter((a) => a.type === 'Attendance').length
  const infraIssues = visibleAlerts.filter((a) => a.type === 'Infrastructure').length
  const lowActivityIssues = visibleAlerts.filter((a) => a.type === 'Activity').length
  const centresNeedingReview = visibleCentres.filter((c) => c.status !== 'Healthy')

  // Category data for BarChart
  const pipelineBreakdown = [
    { name: 'Attendance', count: visibleAlerts.filter((a) => a.type === 'Attendance').length, fill: '#0F766E' },
    { name: 'Infrastructure', count: visibleAlerts.filter((a) => a.type === 'Infrastructure').length, fill: '#0284C7' },
    { name: 'Activity', count: visibleAlerts.filter((a) => a.type === 'Activity').length, fill: '#D97706' },
    { name: 'Camera Telemetry', count: visibleAlerts.filter((a) => a.type === 'Camera').length, fill: '#DC2626' },
  ]

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-lg text-xs">
        <p className="font-bold text-slate-500 mb-1">{label}</p>
        {payload.map((p) => (
          <p key={p.dataKey} className="font-semibold text-ink">
            {p.name}: <span className="text-teal-800">{p.value}</span>
          </p>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-7">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-800">
              Statewide Operations
            </span>
            {selectedCentreId !== 'ALL' && (
              <Badge tone="teal" size="xs">
                Filtered: {selectedCentreId}
              </Badge>
            )}
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl mt-1">
            Monitoring Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time compliance synthesis across Maharashtra vocational training centres.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => exportToCSV(visibleAlerts, `drishti_alerts_summary_${Date.now()}.csv`)}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-xs"
          >
            <Download size={14} /> Export Summary
          </button>
          <button
            onClick={() => navigate('/dashboard/reports')}
            className="inline-flex items-center gap-2 rounded-xl bg-teal-800 px-4 py-2 text-xs font-bold text-white hover:bg-teal-900 transition shadow-card"
          >
            View Analytics <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Primary KPI Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5">
        <MetricCard
          label="Total Centres"
          value={visibleCentres.length}
          hint="Registered institutes"
          icon={Building2}
          tone="teal"
          onClick={() => navigate('/dashboard/centres')}
        />
        <MetricCard
          label="Review Queue"
          value={pendingAlerts.length}
          hint="Urgent officer reviews"
          icon={AlertTriangle}
          tone="yellow"
          onClick={() => navigate('/dashboard/alerts')}
        />
        <MetricCard
          label="Attendance Gaps"
          value={attendanceDiscrepancies}
          hint="Discrepancies flagged"
          icon={Users}
          tone="blue"
          onClick={() => navigate('/dashboard/attendance')}
        />
        <MetricCard
          label="Infra Issues"
          value={infraIssues}
          hint="Slot verification flags"
          icon={Wrench}
          tone="red"
          onClick={() => navigate('/dashboard/infrastructure')}
        />
        <MetricCard
          label="Low Activity"
          value={lowActivityIssues}
          hint="Lab workstation cues"
          icon={Activity}
          tone="yellow"
          onClick={() => navigate('/dashboard/activity')}
        />
        <MetricCard
          label="Camera Uptime"
          value="96.8%"
          hint="Connected telemetry"
          icon={Video}
          tone="green"
          trend="+1.2%"
          onClick={() => navigate('/dashboard/cameras')}
        />
      </div>

      {/* Main Visualizations Row */}
      <div className="grid gap-6 xl:grid-cols-[1.75fr_1fr]">
        {/* Occupancy Reconciliation Timeline Area Chart */}
        <Panel className="p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-ink">
                  Occupancy & Attendance Reconciliation Trend
                </h3>
                <Badge tone="teal" size="xs" dot>
                  Calibrated Interval
                </Badge>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Authorised reference roll call vs. conservative CCTV centroid occupancy.
              </p>
            </div>
            <button
              onClick={() => navigate('/dashboard/attendance')}
              className="text-xs font-bold text-teal-800 hover:underline inline-flex items-center gap-1"
            >
              Full Reconciliation &rarr;
            </button>
          </div>

          <div className="h-[270px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={occupancyTimelineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="occupancyFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0F766E" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#0F766E" stopOpacity={0.01} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#e2e8f0" strokeDasharray="4 4" vertical={false} />
                <XAxis dataKey="time" tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="reference"
                  name="Attendance Reference"
                  stroke="#94a3b8"
                  strokeDasharray="5 4"
                  strokeWidth={2}
                  fill="transparent"
                />
                <Area
                  type="monotone"
                  dataKey="occupancy"
                  name="Estimated Occupancy"
                  stroke="#0F766E"
                  strokeWidth={2.5}
                  fill="url(#occupancyFill)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-3 text-xs text-slate-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 font-medium">
                <span className="h-2.5 w-2.5 rounded-full bg-teal-800" /> Conservative Peak Occupancy
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <span className="h-0.5 w-4 border-t-2 border-dashed border-slate-400" /> Authorized Muster
              </span>
            </div>
            <span className="text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              Tolerance threshold: 1 person
            </span>
          </div>
        </Panel>

        {/* Pipeline Distribution Bar Chart */}
        <Panel className="p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-bold text-base text-ink">Active Findings by Pipeline</h3>
              <Badge tone="yellow" size="xs">
                {visibleAlerts.length} Total
              </Badge>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Breakdown across the 4 monitoring domains.
            </p>

            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={pipelineBreakdown} layout="vertical" margin={{ top: 5, right: 15, left: 10, bottom: 5 }}>
                  <CartesianGrid stroke="#f1f5f9" horizontal={false} />
                  <XAxis type="number" tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 11 }} allowDecimals={false} />
                  <YAxis type="category" dataKey="name" width={110} tickLine={false} axisLine={false} tick={{ fill: '#334155', fontSize: 11, fontWeight: 500 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="count" name="Open Alerts" radius={[0, 6, 6, 0]} barSize={16}>
                    {pipelineBreakdown.map((d) => (
                      <Cell key={d.name} fill={d.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">Need immediate action:</span>
            <button
              onClick={() => navigate('/dashboard/alerts')}
              className="text-xs font-bold text-teal-800 hover:text-teal-950 flex items-center gap-1"
            >
              Open Alerts Workspace &rarr;
            </button>
          </div>
        </Panel>
      </div>

      {/* Urgent Attention Grid: Recent Alerts & Priority Corrective Actions */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Priority Alerts Table */}
        <Panel className="overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 bg-slate-50/60">
            <div>
              <h3 className="font-bold text-sm text-ink">Urgent Review Queue</h3>
              <p className="text-xs text-slate-500 mt-0.5">High & medium priority AI findings</p>
            </div>
            <button
              onClick={() => navigate('/dashboard/alerts')}
              className="text-xs font-bold text-teal-800 hover:underline"
            >
              View All ({visibleAlerts.length})
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {pendingAlerts.slice(0, 4).map((alert) => (
              <div
                key={alert.id}
                onClick={() => setSelectedAlert(alert)}
                className="p-4 hover:bg-slate-50/80 cursor-pointer transition flex items-start justify-between gap-3"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <span
                    className={`mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg shrink-0 ${
                      alert.type === 'Attendance'
                        ? 'bg-sky-50 text-sky-700'
                        : alert.type === 'Infrastructure'
                        ? 'bg-amber-50 text-amber-700'
                        : alert.type === 'Camera'
                        ? 'bg-rose-50 text-rose-700'
                        : 'bg-teal-50 text-teal-700'
                    }`}
                  >
                    {alert.type === 'Attendance' ? (
                      <Users size={16} />
                    ) : alert.type === 'Infrastructure' ? (
                      <Wrench size={16} />
                    ) : alert.type === 'Camera' ? (
                      <Video size={16} />
                    ) : (
                      <Activity size={16} />
                    )}
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-ink truncate">{alert.reason}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {alert.centre} • {alert.room}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 flex flex-col items-end gap-1">
                  <Badge tone={toneForStatus(alert.status)} size="xs" dot>
                    {alert.status}
                  </Badge>
                  <span className="text-[10px] text-slate-400">{alert.time}</span>
                </div>
              </div>
            ))}
          </div>
        </Panel>

        {/* Priority Corrective Actions */}
        <Panel className="overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 bg-slate-50/60">
            <div>
              <h3 className="font-bold text-sm text-ink">Active Corrective Actions (CAs)</h3>
              <p className="text-xs text-slate-500 mt-0.5">Assigned field tasks & audits</p>
            </div>
            <button
              onClick={() => navigate('/dashboard/alerts')}
              className="text-xs font-bold text-teal-800 hover:underline"
            >
              Action Portal &rarr;
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {correctiveActions.slice(0, 4).map((action) => (
              <div
                key={action.id}
                className="p-4 hover:bg-slate-50/80 transition flex items-start justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-teal-800">{action.id}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-[11px] font-semibold text-slate-600 truncate max-w-[220px]">
                      {action.centreName}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-ink mt-1">{action.title}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Assigned: {action.assignedTo} • Due: {action.dueDate}
                  </p>
                </div>
                <Badge
                  tone={action.status === 'Completed' ? 'green' : 'yellow'}
                  size="xs"
                >
                  {action.status}
                </Badge>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      {/* Centres Requiring Attention Table */}
      <Panel className="overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 bg-slate-50/60">
          <div>
            <h3 className="font-bold text-sm text-ink">Centres Requiring Attention</h3>
            <p className="text-xs text-slate-500 mt-0.5">Institutes with active review flags</p>
          </div>
          <button
            onClick={() => navigate('/dashboard/centres')}
            className="text-xs font-bold text-teal-800 hover:underline"
          >
            All Centres Directory &rarr;
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[700px]">
            <thead className="bg-slate-50 text-[10px] uppercase font-bold tracking-wider text-slate-400">
              <tr>
                <th className="px-5 py-3">Centre Name & ID</th>
                <th className="px-5 py-3">District</th>
                <th className="px-5 py-3">Rooms</th>
                <th className="px-5 py-3">Camera Status</th>
                <th className="px-5 py-3">Open Alerts</th>
                <th className="px-5 py-3">Compliance</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {centresNeedingReview.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => setSelectedCentreDetail(c)}
                  className="hover:bg-teal-50/30 cursor-pointer transition"
                >
                  <td className="px-5 py-3.5">
                    <p className="font-bold text-ink">{c.name}</p>
                    <p className="text-[10px] font-mono text-slate-400">{c.id}</p>
                  </td>
                  <td className="px-5 py-3.5 text-slate-600">{c.district}</td>
                  <td className="px-5 py-3.5 text-slate-600">{c.roomsCount}</td>
                  <td className="px-5 py-3.5 text-slate-600 font-mono">{c.cameras}</td>
                  <td className="px-5 py-3.5 font-bold text-amber-700">{c.alerts}</td>
                  <td className="px-5 py-3.5">
                    <span className="font-bold text-teal-800">{c.complianceScore}%</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <Badge tone={toneForStatus(c.status)} size="xs" dot>
                      {c.status}
                    </Badge>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedCentreDetail(c)
                      }}
                      className="rounded-lg p-1 text-slate-400 hover:text-teal-800 hover:bg-slate-100"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  )
}
