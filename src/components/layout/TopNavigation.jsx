import React, { useState, useRef, useEffect } from 'react'
import {
  Menu, Bell, Search, Building2, SlidersHorizontal, ChevronRight, X,
  Check, ArrowRight, ShieldCheck, RefreshCw, Calendar, ExternalLink
} from 'lucide-react'
import { useLocation, useNavigate } from '../../router/Router'
import { useApp } from '../../context/AppContext'
import { Badge, toneForStatus } from '../common/Badge'

export function TopNavigation({ onOpenMobile }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const {
    centres,
    alerts,
    selectedCentreId,
    setSelectedCentreId,
    dateRange,
    setDateRange,
    setSelectedAlert,
    setSelectedCentreDetail,
    resetDemoData,
  } = useApp()

  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  const searchInputRef = useRef(null)
  const notifRef = useRef(null)

  // Map route to title & breadcrumb
  const routeMeta = {
    '/dashboard': { title: 'Monitoring Overview', category: 'Operational Dashboard' },
    '/dashboard/centres': { title: 'Training Centres', category: 'Registry & Audit' },
    '/dashboard/attendance': { title: 'Attendance Reconciliation', category: 'Pipeline 01' },
    '/dashboard/infrastructure': { title: 'Infrastructure Verification', category: 'Pipeline 02' },
    '/dashboard/activity': { title: 'Activity Monitoring', category: 'Pipeline 03' },
    '/dashboard/alerts': { title: 'Alerts & Reviews', category: 'Action Portal' },
    '/dashboard/cameras': { title: 'Camera & Evidence Health', category: 'Hardware Telemetry' },
    '/dashboard/reports': { title: 'Reports & Analytics', category: 'Analytics Intelligence' },
    '/dashboard/intelligence': { title: 'Historical Intelligence', category: 'Audit Patterns' },
    '/dashboard/settings': { title: 'System Configuration', category: 'Administration' },
  }

  const currentMeta = routeMeta[pathname] || { title: 'Dashboard', category: 'Drishti' }

  // Pending alerts
  const pendingAlerts = alerts.filter(
    (a) => !['Resolved', 'Dismissed', 'Confirmed'].includes(a.status)
  )

  // Quick search matching centres and alerts
  const matchingCentres = searchQuery.trim()
    ? centres.filter((c) =>
        `${c.name} ${c.id} ${c.district}`.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : []

  const matchingAlerts = searchQuery.trim()
    ? alerts.filter((a) =>
        `${a.id} ${a.reason} ${a.centre}`.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : []

  // Close notifications if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotificationsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b border-slate-200/90 bg-[#F5F7F7]/95 px-4 backdrop-blur-md sm:px-6 lg:px-8">
      {/* Left: Mobile Toggle & Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobile}
          className="rounded-xl border border-slate-200 bg-white p-2 text-slate-600 hover:bg-slate-50 lg:hidden transition"
          aria-label="Open sidebar menu"
        >
          <Menu size={18} />
        </button>

        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400">
            <span>Drishti</span>
            <ChevronRight size={12} className="text-slate-300" />
            <span className="text-teal-800">{currentMeta.category}</span>
          </div>
          <h1 className="text-sm sm:text-base font-bold text-ink leading-tight">
            {currentMeta.title}
          </h1>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Centre Dropdown Filter */}
        <div className="hidden md:flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-1.5 shadow-xs">
          <Building2 size={15} className="text-teal-800 shrink-0" />
          <select
            value={selectedCentreId}
            onChange={(e) => setSelectedCentreId(e.target.value)}
            className="bg-transparent text-xs font-semibold text-slate-700 outline-none cursor-pointer max-w-[190px] truncate"
            aria-label="Filter by Training Centre"
          >
            <option value="ALL">All Centres (Maharashtra)</option>
            {centres.map((c) => (
              <option key={c.id} value={c.id}>
                {c.id} — {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Global Search Button */}
        <div className="relative">
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-2.5 sm:px-3 py-1.5 text-xs text-slate-500 hover:border-teal-400 hover:text-slate-700 shadow-xs transition"
            aria-label="Search centres and alerts"
          >
            <Search size={15} className="text-slate-400" />
            <span className="hidden sm:inline">Search...</span>
          </button>

          {/* Search Modal Overlay */}
          {searchOpen && (
            <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-ink/50 backdrop-blur-xs">
              <div
                className="fixed inset-0"
                onClick={() => setSearchOpen(false)}
              />
              <div className="relative w-full max-w-xl rounded-2xl bg-white p-4 shadow-2xl ring-1 ring-slate-900/10 z-10">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                  <Search size={18} className="text-teal-700 shrink-0" />
                  <input
                    ref={searchInputRef}
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search training centres, alert IDs, rooms, equipment..."
                    className="w-full text-sm font-medium outline-none text-ink placeholder:text-slate-400"
                  />
                  <button
                    onClick={() => {
                      setSearchQuery('')
                      setSearchOpen(false)
                    }}
                    className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Results List */}
                <div className="mt-3 max-h-80 overflow-y-auto space-y-2 text-xs">
                  {searchQuery.trim() ? (
                    <>
                      {matchingCentres.length > 0 && (
                        <div>
                          <p className="px-2 py-1 font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                            Training Centres
                          </p>
                          {matchingCentres.map((c) => (
                            <button
                              key={c.id}
                              onClick={() => {
                                setSelectedCentreDetail(c)
                                setSearchOpen(false)
                              }}
                              className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-teal-50 text-left transition"
                            >
                              <div>
                                <span className="font-bold text-ink">{c.name}</span>
                                <span className="ml-2 text-slate-400">({c.id})</span>
                              </div>
                              <span className="text-slate-500">{c.district}</span>
                            </button>
                          ))}
                        </div>
                      )}

                      {matchingAlerts.length > 0 && (
                        <div className="pt-2">
                          <p className="px-2 py-1 font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                            Findings & Alerts
                          </p>
                          {matchingAlerts.map((a) => (
                            <button
                              key={a.id}
                              onClick={() => {
                                setSelectedAlert(a)
                                setSearchOpen(false)
                              }}
                              className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-teal-50 text-left transition"
                            >
                              <div className="truncate max-w-sm">
                                <span className="font-bold text-teal-800">{a.id}: </span>
                                <span className="text-ink">{a.reason}</span>
                              </div>
                              <Badge tone={toneForStatus(a.status)} size="xs">
                                {a.status}
                              </Badge>
                            </button>
                          ))}
                        </div>
                      )}

                      {matchingCentres.length === 0 && matchingAlerts.length === 0 && (
                        <p className="p-4 text-center text-slate-400">
                          No matching records for "{searchQuery}".
                        </p>
                      )}
                    </>
                  ) : (
                    <div className="p-3 text-slate-400 text-center">
                      Type a keyword (e.g. "Pune", "DR-104", "Sewing", "Attendance")
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Notifications Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative rounded-xl border border-slate-200 bg-white p-2 text-slate-600 hover:border-teal-400 hover:text-teal-800 shadow-xs transition"
            aria-label="Open notifications"
          >
            <Bell size={16} />
            {pendingAlerts.length > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-600 text-[10px] font-bold text-white ring-2 ring-white">
                {pendingAlerts.length}
              </span>
            )}
          </button>

          {/* Notifications Popover */}
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl border border-slate-200 bg-white p-4 shadow-dropdown z-40">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-ink">Urgent Review Queue</h3>
                  <Badge tone="yellow" size="xs">
                    {pendingAlerts.length} pending
                  </Badge>
                </div>
                <button
                  onClick={() => {
                    navigate('/dashboard/alerts')
                    setNotificationsOpen(false)
                  }}
                  className="text-xs font-semibold text-teal-800 hover:underline"
                >
                  View All
                </button>
              </div>

              <div className="mt-2 divide-y divide-slate-100 max-h-64 overflow-y-auto">
                {pendingAlerts.length === 0 ? (
                  <p className="py-6 text-center text-xs text-slate-400">
                    No open alerts requiring attention.
                  </p>
                ) : (
                  pendingAlerts.slice(0, 4).map((alert) => (
                    <div
                      key={alert.id}
                      onClick={() => {
                        setSelectedAlert(alert)
                        setNotificationsOpen(false)
                      }}
                      className="py-2.5 px-1 hover:bg-slate-50 cursor-pointer transition rounded-lg"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-teal-800">{alert.id}</span>
                        <span className="text-[10px] text-slate-400">{alert.time}</span>
                      </div>
                      <p className="text-xs font-semibold text-ink mt-0.5 truncate">{alert.reason}</p>
                      <p className="text-[10px] text-slate-500">{alert.centre} • {alert.room}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Live Active Pill */}
        <div className="hidden sm:flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Monitoring Active</span>
        </div>
      </div>
    </header>
  )
}
