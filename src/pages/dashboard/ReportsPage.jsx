import React, { useState } from 'react'
import {
  FileBarChart, Download, Printer, CheckCheck, Clock3, RefreshCw,
  Building2, Users, Wrench, Activity, Video, TrendingUp, Calendar, ChevronRight
} from 'lucide-react'
import {
  Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend
} from 'recharts'
import { Panel, SectionHeading } from '../../components/common/Panel'
import { MetricCard } from '../../components/common/MetricCard'
import { Badge } from '../../components/common/Badge'
import { reportWeekData } from '../../data/mockData'
import { useApp } from '../../context/AppContext'

export function ReportsPage() {
  const { exportToCSV, centres, alerts, correctiveActions } = useApp()
  const [selectedPeriod, setSelectedPeriod] = useState('Last 7 Days')

  const totalFindingsWeek = 63
  const reviewCompletionRate = 84
  const averageResolutionHours = 6.4
  const repeatFindingsCount = 9

  const handlePrint = () => {
    window.print()
  }

  const handleExportCSV = () => {
    exportToCSV(
      reportWeekData.map((d) => ({
        Day: d.day,
        AttendanceGaps: d.attendance,
        InfrastructureIssues: d.infra,
        ActivityFlags: d.activity,
        CameraOutages: d.cameras,
        TotalFindings: d.total,
      })),
      `drishti_weekly_pipeline_report_${Date.now()}.csv`
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <SectionHeading
        eyebrow="Intelligence & Audits"
        title="Reports & Analytics"
        subtitle="Longitudinal performance summaries, review completion turnaround, repeated operational findings, and cross-centre compliance indices."
        action={
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-xs no-print"
            >
              <Printer size={14} /> Print Report
            </button>
            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-2 rounded-xl bg-teal-800 px-4 py-2 text-xs font-bold text-white hover:bg-teal-900 transition shadow-card no-print"
            >
              <Download size={14} /> Export CSV Dataset
            </button>
          </div>
        }
      />

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Findings Logged"
          value={totalFindingsWeek}
          hint="All monitoring pipelines"
          icon={FileBarChart}
          tone="teal"
        />
        <MetricCard
          label="Review Completion"
          value={`${reviewCompletionRate}%`}
          hint="Sessions with officer sign-off"
          icon={CheckCheck}
          tone="green"
        />
        <MetricCard
          label="Avg Resolution Time"
          value={`${averageResolutionHours} hrs`}
          hint="Time from flag to resolution"
          icon={Clock3}
          tone="blue"
        />
        <MetricCard
          label="Repeat Findings"
          value={repeatFindingsCount}
          hint="Recurring centre patterns"
          icon={RefreshCw}
          tone="yellow"
        />
      </div>

      {/* 7-Day Stacked Bar Chart */}
      <Panel className="p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base text-ink">
                Weekly Pipeline Discrepancy Ingestion
              </h3>
              <Badge tone="teal" size="xs">
                {selectedPeriod}
              </Badge>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Aggregated operational findings by pipeline category across all 24 monitored state centres.
            </p>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Source: Drishti Aggregation Engine
          </span>
        </div>

        <div className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={reportWeekData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid stroke="#e2e8f0" strokeDasharray="4 4" vertical={false} />
              <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null
                  return (
                    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-lg text-xs space-y-1">
                      <p className="font-bold text-slate-500 mb-1">{label}</p>
                      {payload.map((p) => (
                        <p key={p.dataKey} className="font-semibold text-ink flex justify-between gap-4">
                          <span>{p.name}:</span>
                          <span className="font-bold">{p.value}</span>
                        </p>
                      ))}
                    </div>
                  )
                }}
              />
              <Legend
                wrapperStyle={{ fontSize: 12, paddingTop: 12 }}
                formatter={(val) => <span className="text-slate-600 font-medium text-xs">{val}</span>}
              />
              <Bar dataKey="attendance" name="Attendance Discrepancies" stackId="a" fill="#0F766E" />
              <Bar dataKey="infra" name="Infrastructure Misses" stackId="a" fill="#0284C7" />
              <Bar dataKey="activity" name="Low Activity Cues" stackId="a" fill="#D97706" />
              <Bar dataKey="cameras" name="Camera Drops" stackId="a" fill="#DC2626" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Panel>

      {/* Analytical Breakdown: Review Outcomes & Quality Indicators */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Review Outcomes Breakdown */}
        <Panel className="p-5 sm:p-6">
          <h3 className="font-bold text-base text-ink">Human Review Outcomes Distribution</h3>
          <p className="text-xs text-slate-500 mt-1">
            Breakdown of signed decisions recorded by monitoring officers this week.
          </p>

          <div className="mt-5 space-y-4 text-xs">
            {[
              { label: 'Confirmed Findings (Formal Discrepancy)', percentage: 56, color: 'bg-emerald-600' },
              { label: 'Dismissed (False Indication / Valid Exception)', percentage: 22, color: 'bg-slate-400' },
              { label: 'Recheck Requested (Additional Verification)', percentage: 22, color: 'bg-amber-500' },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between mb-1.5 font-semibold">
                  <span className="text-slate-600">{item.label}</span>
                  <span className="text-ink font-bold">{item.percentage}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl bg-cream p-3 text-xs text-slate-600 border border-slate-200/60 leading-relaxed">
            * 22% dismissal rate confirms that automated AI triggers are properly scrutinized before any punitive subsidy clawbacks occur.
          </div>
        </Panel>

        {/* State Monitoring Coverage Indices */}
        <Panel className="p-5 sm:p-6">
          <h3 className="font-bold text-base text-ink">State Monitoring Quality Indices</h3>
          <p className="text-xs text-slate-500 mt-1">
            Data integrity and camera network coverage indicators for Maharashtra.
          </p>

          <div className="mt-5 space-y-4 text-xs">
            {[
              { label: 'Usable Camera Video Coverage (>80% lighting/clarity)', val: 91 },
              { label: 'Edge Node Heartbeat Uptime', val: 97 },
              { label: 'Scheduled Batches with Signed Review Audits', val: 84 },
              { label: 'Corrective Action Turnaround Compliance', val: 89 },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between mb-1.5 font-semibold">
                  <span className="text-slate-600">{item.label}</span>
                  <span className="text-teal-800 font-bold">{item.val}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-teal-800 rounded-full" style={{ width: `${item.val}%` }} />
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 text-[11px] text-slate-400">
            Demonstration metrics benchmarked against SIH evaluation guidelines.
          </p>
        </Panel>
      </div>
    </div>
  )
}
