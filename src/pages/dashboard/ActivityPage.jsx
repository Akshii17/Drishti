import React, { useState } from 'react'
import {
  Activity, Wrench, AlertTriangle, Eye, Video, Download, CheckCircle2,
  Clock, ShieldCheck, Info, UserCheck, Layers, RefreshCw
} from 'lucide-react'
import {
  Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis
} from 'recharts'
import { Panel, SectionHeading } from '../../components/common/Panel'
import { MetricCard } from '../../components/common/MetricCard'
import { Badge, toneForStatus } from '../../components/common/Badge'
import { activityTimeSeriesData } from '../../data/mockData'
import { useApp } from '../../context/AppContext'

export function ActivityPage() {
  const { activityStations, centres, setEvidenceViewer, setSelectedAlert, alerts, exportToCSV } = useApp()

  const [selectedLab, setSelectedLab] = useState('Tailoring Lab (Kolhapur Skills Centre)')
  const [selectedSession, setSelectedSession] = useState('Morning Practical (09:00 - 11:30 AM)')

  const totalTracked = activityStations.length
  const activeStations = activityStations.filter((s) => s.status === 'Normal').length
  const reviewRequiredStations = activityStations.filter((s) => s.status === 'Review Required').length
  const unclearStations = activityStations.filter((s) => s.status === 'Unable to Verify').length

  const handleInspectMotion = (ws) => {
    setEvidenceViewer({
      title: `Workstation Optical Cue: ${ws.name}`,
      type: 'Activity Telemetry',
      centre: 'Kolhapur Skills Centre (MH-02)',
      room: 'Tailoring Lab',
      timestamp: '18 Oct 2026, 09:20 AM',
      summary: `Observed motion cue: ${ws.motionRatio}. Operator status: ${ws.operator}. AI optical density measured.`,
    })
  }

  const handleExport = () => {
    exportToCSV(
      activityStations.map((ws) => ({
        WorkstationID: ws.id,
        Name: ws.name,
        Room: ws.room,
        State: ws.state,
        MotionRatio: ws.motionRatio,
        OperatorPresence: ws.operator,
        MonitoringStatus: ws.status,
      })),
      `drishti_activity_monitoring_${Date.now()}.csv`
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <SectionHeading
        eyebrow="Pipeline 03"
        title="Practical Activity Monitoring"
        subtitle="Analyses continuous visual motion cues and tool manipulation density during scheduled practical workshop hours."
        action={
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleExport}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-xs"
            >
              <Download size={14} /> Export Workstation Telemetry
            </button>
            <button
              onClick={() => {
                const activityAlert = alerts.find((a) => a.id === 'DR-107')
                if (activityAlert) setSelectedAlert(activityAlert)
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-teal-800 px-4 py-2 text-xs font-bold text-white hover:bg-teal-900 transition shadow-card"
            >
              <AlertTriangle size={14} /> Review Low-Activity Finding
            </button>
          </div>
        }
      />

      {/* Responsibility Clarification Banner */}
      <div className="rounded-2xl border border-sky-200 bg-sky-50/80 p-4 text-xs text-sky-950 flex items-start gap-2.5 shadow-xs">
        <Info size={18} className="text-sky-700 shrink-0 mt-0.5" />
        <div>
          <span className="font-extrabold tracking-wide">
            ACTIVITY METRIC PROTOCOL:
          </span>
          <span className="ml-1 text-slate-700">
            A low optical motion score is an <strong>indicator of visual inactivity</strong>—not conclusive proof of absent instruction or equipment failure. Trainees may be attending verbal demonstrations or inspecting blueprints. Consequential actions require 3 consecutive intervals and officer verification.
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Tracked Workstations"
          value={totalTracked}
          hint="Tailoring practical bays"
          icon={Wrench}
          tone="teal"
        />
        <MetricCard
          label="Sustained Activity"
          value={activeStations}
          hint="Motion cues >35% threshold"
          icon={CheckCircle2}
          tone="green"
        />
        <MetricCard
          label="Review Required"
          value={reviewRequiredStations}
          hint="3 consecutive low clips"
          icon={AlertTriangle}
          tone="yellow"
        />
        <MetricCard
          label="Inconclusive / Occluded"
          value={unclearStations}
          hint="Sightline obscured"
          icon={Eye}
          tone="blue"
        />
      </div>

      {/* Chart and Workstations Split */}
      <div className="grid gap-6 xl:grid-cols-[1.65fr_1fr]">
        {/* Optical Motion Time Series Chart */}
        <Panel className="p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-ink">
                  Observed Hand & Tool Motion Density Cue
                </h3>
                <Badge tone="yellow" size="xs" dot>
                  Low Cue Window (09:10 - 09:20)
                </Badge>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Kolhapur Skills Centre • Tailoring Lab • Workstation SM-03
              </p>
            </div>
            <span className="text-xs font-mono text-slate-400">
              5-minute clip sample resolution
            </span>
          </div>

          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityTimeSeriesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="activityAreaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0284C7" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#0284C7" stopOpacity={0.01} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#e2e8f0" strokeDasharray="4 4" vertical={false} />
                <XAxis dataKey="time" tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
                <YAxis unit="%" domain={[0, 100]} tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (!active || !payload?.length) return null
                    const dataPoint = payload[0]?.payload
                    return (
                      <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-lg text-xs">
                        <p className="font-bold text-slate-400 mb-1">Time: {label}</p>
                        <p className="font-bold text-sky-800">Motion Score: {dataPoint?.motionScore}%</p>
                        <p className="font-semibold text-slate-500">Threshold: {dataPoint?.threshold}%</p>
                        <p className="text-[10px] text-slate-400 mt-1">
                          Operator Present: {dataPoint?.operatorPresent ? 'YES' : 'NO'}
                        </p>
                      </div>
                    )
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="threshold"
                  name="Activity Threshold"
                  stroke="#f59e0b"
                  strokeDasharray="4 4"
                  strokeWidth={2}
                  fill="transparent"
                />
                <Area
                  type="monotone"
                  dataKey="motionScore"
                  name="Observed Motion Cue"
                  stroke="#0284C7"
                  strokeWidth={2.5}
                  fill="url(#activityAreaGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-3 text-xs text-slate-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 font-medium">
                <span className="h-2.5 w-2.5 rounded-full bg-sky-600" /> Observed Optical Motion Ratio
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <span className="h-0.5 w-4 border-t-2 border-dashed border-amber-500" /> Baseline Threshold (35%)
              </span>
            </div>
            <span className="text-[11px] text-slate-400">
              Only eligible clips with detected operator are scored
            </span>
          </div>
        </Panel>

        {/* Workstations Status List */}
        <Panel className="p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-bold text-base text-ink">Lab Workstations Status</h3>
              <Badge tone="teal" size="xs">
                Tailoring Lab
              </Badge>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Real-time optical cue breakdown by workstation.
            </p>

            <div className="space-y-3">
              {activityStations.map((ws) => (
                <div
                  key={ws.id}
                  onClick={() => handleInspectMotion(ws)}
                  className="rounded-xl border border-slate-200 bg-white p-3 hover:border-teal-400 hover:bg-slate-50 cursor-pointer transition shadow-2xs"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-slate-400">{ws.id}</span>
                      <h4 className="text-xs font-bold text-ink">{ws.name}</h4>
                    </div>
                    <Badge tone={toneForStatus(ws.status)} size="xs" dot>
                      {ws.status}
                    </Badge>
                  </div>

                  <div className="mt-2.5 flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                    <span>Motion Cue: <strong className="text-ink">{ws.motionRatio}</strong></span>
                    <span>Operator: <strong className="text-slate-700">{ws.operator}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-400">Batch T04 (Tailoring)</span>
            <button
              onClick={() => handleInspectMotion(activityStations[2])}
              className="text-teal-800 font-bold hover:underline"
            >
              Inspect SM-03 Frame &rarr;
            </button>
          </div>
        </Panel>
      </div>
    </div>
  )
}
