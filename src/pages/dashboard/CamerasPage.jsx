import React, { useState, useMemo } from 'react'
import {
  Video, VideoOff, Wifi, AlertTriangle, CheckCircle2, ShieldCheck, Download,
  Search, Info, Eye, Layers, RefreshCw
} from 'lucide-react'
import { Panel, SectionHeading } from '../../components/common/Panel'
import { MetricCard } from '../../components/common/MetricCard'
import { Badge, toneForStatus } from '../../components/common/Badge'
import { EmptyState } from '../../components/common/EmptyState'
import { useApp } from '../../context/AppContext'

export function CamerasPage() {
  const { cameras, centres, setEvidenceViewer, exportToCSV } = useApp()

  const [search, setSearch] = useState('')
  const [centreFilter, setCentreFilter] = useState('ALL')
  const [statusFilter, setStatusFilter] = useState('ALL')

  const filtered = useMemo(() => {
    return cameras.filter((cam) => {
      const matchesSearch =
        `${cam.id} ${cam.centreName} ${cam.room} ${cam.ip}`.toLowerCase().includes(search.toLowerCase())
      const matchesCentre = centreFilter === 'ALL' || cam.centreId === centreFilter
      const matchesStatus = statusFilter === 'ALL' || cam.status === statusFilter
      return matchesSearch && matchesCentre && matchesStatus
    })
  }, [cameras, search, centreFilter, statusFilter])

  const totalCameras = cameras.length
  const onlineCameras = cameras.filter((c) => c.status === 'Online').length
  const restrictedCameras = cameras.filter((c) => c.monitoringEligibility === 'Restricted').length
  const offlineCameras = cameras.filter((c) => c.status === 'Offline').length

  const handleInspectCamera = (cam) => {
    setEvidenceViewer({
      title: `Camera Feed Telemetry: ${cam.id}`,
      type: 'Camera Stream Diagnostic',
      centre: cam.centreName,
      room: cam.room,
      timestamp: cam.lastFrameTime,
      summary: `Resolution: ${cam.resolution}. Lighting Index: ${cam.lightingScore}%. Occlusion: ${cam.occlusionScore}%. Eligibility: ${cam.monitoringEligibility}.`,
    })
  }

  const handleExport = () => {
    exportToCSV(
      filtered.map((c) => ({
        CameraID: c.id,
        Centre: c.centreName,
        Room: c.room,
        Status: c.status,
        Resolution: c.resolution,
        LightingScore: `${c.lightingScore}%`,
        OcclusionScore: `${c.occlusionScore}%`,
        Eligibility: c.monitoringEligibility,
        Warning: c.warning || 'None',
      })),
      `drishti_camera_telemetry_${Date.now()}.csv`
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <SectionHeading
        eyebrow="Hardware & Edge Telemetry"
        title="Camera Health & Evidence Quality"
        subtitle="Monitors frame resolution, illumination index, lens obstruction, and edge sync to guarantee evidence reliability for audit integrity."
        action={
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleExport}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-xs"
            >
              <Download size={14} /> Export Telemetry CSV
            </button>
            <button
              onClick={() => handleInspectCamera(cameras[0])}
              className="inline-flex items-center gap-2 rounded-xl bg-teal-800 px-4 py-2 text-xs font-bold text-white hover:bg-teal-900 transition shadow-card"
            >
              <Video size={14} /> Diagnostic Feed Test
            </button>
          </div>
        }
      />

      {/* Mandatory Demo Label Banner */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-4 text-xs text-amber-950 flex items-start gap-2.5 shadow-xs">
        <ShieldCheck size={18} className="text-amber-700 shrink-0 mt-0.5" />
        <div>
          <span className="font-extrabold tracking-wide">
            TELEMETRY SIMULATION PROTOCOL:
          </span>
          <span className="ml-1 text-slate-700">
            Hardware statuses below are benchmark telemetry mockups. Drishti enforces strict validation rules: if a feed drops below 80% lighting or exceeds 25% occlusion, automated compliance algorithms pause to avoid false penalties.
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Total Deployed Cameras"
          value={totalCameras}
          hint="Across state workshops"
          icon={Video}
          tone="teal"
        />
        <MetricCard
          label="Live Stream Active"
          value={onlineCameras}
          hint="Valid diagnostic heartbeat"
          icon={CheckCircle2}
          tone="green"
        />
        <MetricCard
          label="Restricted Sightline"
          value={restrictedCameras}
          hint="Partial view occlusion"
          icon={AlertTriangle}
          tone="yellow"
        />
        <MetricCard
          label="Interrupted / Offline"
          value={offlineCameras}
          hint="Technical investigation"
          icon={VideoOff}
          tone="red"
        />
      </div>

      {/* Cameras Table Panel */}
      <Panel className="overflow-hidden">
        {/* Filter Controls */}
        <div className="flex flex-col gap-3 border-b border-slate-100 p-4 lg:flex-row lg:items-center lg:justify-between bg-slate-50/50">
          <div className="relative flex-1 max-w-sm">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search camera ID, centre, or room..."
              className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-xs outline-none focus:border-teal-700"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <select
              value={centreFilter}
              onChange={(e) => setCentreFilter(e.target.value)}
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
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 outline-none"
            >
              <option value="ALL">All Statuses</option>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
            </select>

            {(search || centreFilter !== 'ALL' || statusFilter !== 'ALL') && (
              <button
                onClick={() => {
                  setSearch('')
                  setCentreFilter('ALL')
                  setStatusFilter('ALL')
                }}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-500 hover:bg-slate-50"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[800px]">
            <thead className="bg-slate-50 text-[10px] uppercase font-bold tracking-wider text-slate-400">
              <tr>
                <th className="px-5 py-3">Camera Node ID</th>
                <th className="px-5 py-3">Training Centre</th>
                <th className="px-5 py-3">Assigned Room</th>
                <th className="px-5 py-3">Connection</th>
                <th className="px-5 py-3">Resolution & FPS</th>
                <th className="px-5 py-3">Lighting Index</th>
                <th className="px-5 py-3">Occlusion</th>
                <th className="px-5 py-3">Audit Eligibility</th>
                <th className="px-5 py-3 text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((cam) => (
                <tr
                  key={cam.id}
                  onClick={() => handleInspectCamera(cam)}
                  className="hover:bg-teal-50/40 cursor-pointer transition"
                >
                  <td className="px-5 py-3.5 font-bold font-mono text-teal-800">{cam.id}</td>
                  <td className="px-5 py-3.5 font-bold text-ink">{cam.centreName}</td>
                  <td className="px-5 py-3.5 text-slate-600 font-medium">{cam.room}</td>
                  <td className="px-5 py-3.5">
                    <Badge tone={cam.status === 'Online' ? 'green' : 'red'} size="xs" dot>
                      {cam.status}
                    </Badge>
                  </td>
                  <td className="px-5 py-3.5 font-mono text-slate-500">{cam.resolution}</td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`font-bold ${
                        cam.lightingScore > 85
                          ? 'text-emerald-700'
                          : cam.lightingScore > 0
                          ? 'text-amber-700'
                          : 'text-rose-700'
                      }`}
                    >
                      {cam.lightingScore > 0 ? `${cam.lightingScore}%` : '—'}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`font-semibold ${
                        cam.occlusionScore > 20 ? 'text-amber-700 font-bold' : 'text-slate-500'
                      }`}
                    >
                      {cam.occlusionScore}%
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <Badge tone={toneForStatus(cam.monitoringEligibility)} size="xs">
                      {cam.monitoringEligibility}
                    </Badge>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleInspectCamera(cam)
                      }}
                      className="rounded-lg p-1.5 text-slate-400 hover:text-teal-800 hover:bg-slate-100 transition"
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
              title="No cameras found"
              description="No edge node matches the current filters."
            />
          )}
        </div>

        <div className="border-t border-slate-100 px-5 py-3 text-xs text-slate-400 bg-slate-50/40 flex items-center justify-between">
          <span>Showing {filtered.length} of {cameras.length} registered CCTV edge gateways</span>
          <span>90-day evidence retention compliance active</span>
        </div>
      </Panel>
    </div>
  )
}
