import React, { useState } from 'react'
import {
  X, Building2, MapPin, Phone, User, Video, Users, Wrench, Activity, AlertTriangle,
  CheckCircle2, Clock, Calendar, ArrowRight, ShieldCheck
} from 'lucide-react'
import { Badge, toneForStatus } from './Badge'
import { Panel } from './Panel'
import { useApp } from '../../context/AppContext'
import { useNavigate } from '../../router/Router'

export function CentreDetailDrawer({ centre, onClose }) {
  const { alerts, cameras, equipment, correctiveActions, setSelectedCentreId, setSelectedAlert } = useApp()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview') // 'overview' | 'rooms' | 'alerts' | 'history'

  if (!centre) return null

  // Filter relevant items for this centre
  const centreAlerts = alerts.filter((a) => a.centreId === centre.id)
  const centreCameras = cameras.filter((c) => c.centreId === centre.id)
  const centreEquipment = equipment.filter((e) => e.centreId === centre.id)
  const centreActions = correctiveActions.filter((ca) => ca.centreId === centre.id)

  const handleFilterDashboardToThisCentre = () => {
    setSelectedCentreId(centre.id)
    onClose()
    navigate('/dashboard')
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#172B2B]/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <aside className="relative flex h-full w-full max-w-2xl flex-col bg-white shadow-2xl z-10 overflow-hidden">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/95 px-6 py-4 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-800 text-white shadow-sm">
              <Building2 size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-teal-800 uppercase tracking-wider">
                  {centre.id}
                </span>
                <span className="text-slate-300">•</span>
                <Badge tone={toneForStatus(centre.status)} dot>
                  {centre.status}
                </Badge>
              </div>
              <h2 className="text-lg font-bold text-ink truncate max-w-md">
                {centre.name}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl border border-slate-200 p-2 text-slate-400 hover:bg-slate-50 hover:text-slate-700 transition"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Quick Nav Tabs */}
        <div className="flex border-b border-slate-200 px-6 bg-slate-50/70 text-xs font-semibold">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'rooms', label: `Rooms & Cams (${centre.rooms?.length || centre.roomsCount})` },
            { id: 'alerts', label: `Open Alerts (${centreAlerts.length})` },
            { id: 'history', label: 'Audit History' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-3 border-b-2 font-medium transition ${
                activeTab === tab.id
                  ? 'border-teal-700 text-teal-800 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'overview' && (
            <>
              {/* Centre Details Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50/60 p-3.5">
                  <MapPin size={16} className="text-teal-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Location & District
                    </span>
                    <p className="text-xs font-semibold text-ink mt-0.5">{centre.address}</p>
                    <p className="text-xs text-slate-500">District: {centre.district}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50/60 p-3.5">
                  <User size={16} className="text-teal-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Centre Coordinator
                    </span>
                    <p className="text-xs font-semibold text-ink mt-0.5">{centre.coordinator}</p>
                    <p className="text-xs text-slate-500">{centre.phone}</p>
                  </div>
                </div>
              </div>

              {/* Status Metrics */}
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-xl border border-slate-200 bg-white p-3.5 text-center">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Compliance Score
                  </p>
                  <p className="text-2xl font-extrabold text-teal-800 mt-1">
                    {centre.complianceScore}%
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Benchmarked Grade</p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-3.5 text-center">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Cameras Online
                  </p>
                  <p className="text-2xl font-extrabold text-ink mt-1">{centre.cameras}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Active edge nodes</p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-3.5 text-center">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Open Alerts
                  </p>
                  <p
                    className={`text-2xl font-extrabold mt-1 ${
                      centreAlerts.length > 0 ? 'text-amber-700' : 'text-emerald-700'
                    }`}
                  >
                    {centreAlerts.length}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Awaiting resolution</p>
                </div>
              </div>

              {/* Active Batches */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Active Scheduled Batches
                </h4>
                <div className="flex flex-wrap gap-2">
                  {centre.activeBatches?.map((b) => (
                    <span
                      key={b}
                      className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>

              {/* Open Corrective Actions */}
              {centreActions.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Assigned Corrective Actions
                  </h4>
                  <div className="space-y-2">
                    {centreActions.map((ca) => (
                      <div
                        key={ca.id}
                        className="rounded-xl border border-slate-200 p-3 bg-white flex items-center justify-between"
                      >
                        <div>
                          <p className="text-xs font-bold text-ink">{ca.title}</p>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            Assigned to: {ca.assignedTo} • Due: {ca.dueDate}
                          </p>
                        </div>
                        <Badge tone={ca.status === 'Completed' ? 'green' : 'yellow'}>
                          {ca.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {activeTab === 'rooms' && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Registered Training Classrooms & Workshops
              </h4>
              <div className="divide-y divide-slate-100 rounded-xl border border-slate-200 overflow-hidden bg-white">
                {centre.rooms?.map((rm) => (
                  <div key={rm.id} className="p-3.5 flex items-center justify-between hover:bg-slate-50">
                    <div>
                      <p className="text-sm font-bold text-ink">{rm.name}</p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {rm.cameras} Dedicated Monitoring Camera(s)
                      </p>
                    </div>
                    <Badge tone={toneForStatus(rm.status)} dot>
                      {rm.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'alerts' && (
            <div className="space-y-3">
              {centreAlerts.length === 0 ? (
                <div className="text-center py-10 bg-slate-50 rounded-xl">
                  <CheckCircle2 size={32} className="mx-auto text-emerald-600 mb-2" />
                  <p className="text-sm font-bold text-ink">No Pending Findings</p>
                  <p className="text-xs text-slate-400">All alerts for this centre are resolved.</p>
                </div>
              ) : (
                centreAlerts.map((al) => (
                  <div
                    key={al.id}
                    onClick={() => {
                      setSelectedAlert(al)
                      onClose()
                    }}
                    className="p-4 rounded-xl border border-slate-200 bg-white hover:border-teal-500 cursor-pointer transition shadow-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-teal-800">{al.id}</span>
                      <Badge tone={toneForStatus(al.status)} dot>
                        {al.status}
                      </Badge>
                    </div>
                    <p className="text-sm font-bold text-ink mt-1.5">{al.reason}</p>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{al.detail}</p>
                    <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-100 pt-2">
                      <span>Room: {al.room}</span>
                      <span>{al.time}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Official Centre Monitoring Timeline
              </h4>
              <div className="space-y-3">
                {centre.history?.map((h, i) => (
                  <div key={i} className="flex gap-3 text-xs">
                    <span className="mt-1 h-2 w-2 rounded-full bg-teal-600 shrink-0" />
                    <div>
                      <p className="font-bold text-slate-400">{h.date}</p>
                      <p className="text-slate-700 font-medium mt-0.5">{h.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 border-t border-slate-200 bg-slate-50 p-4 px-6 flex items-center justify-between">
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
          >
            Close
          </button>
          <button
            onClick={handleFilterDashboardToThisCentre}
            className="inline-flex items-center gap-2 rounded-xl bg-teal-800 px-4 py-2 text-xs font-bold text-white hover:bg-teal-900 transition"
          >
            Filter Dashboard to this Centre <ArrowRight size={14} />
          </button>
        </div>
      </aside>
    </div>
  )
}
