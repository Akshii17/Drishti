import React, { useState } from 'react'
import {
  LayoutDashboard, Building2, Users, Wrench, Activity, Bell, Video, FileBarChart,
  BrainCircuit, Settings, LogOut, ChevronLeft, ChevronRight, ShieldCheck, Eye,
  SlidersHorizontal, RefreshCcw, Sparkles
} from 'lucide-react'
import { Link, useLocation, useNavigate } from '../../router/Router'
import { useApp } from '../../context/AppContext'

const navGroups = [
  {
    label: 'OVERVIEW',
    items: [
      { id: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    ],
  },
  {
    label: 'MONITORING PIPELINES',
    items: [
      { id: 'centres', label: 'Training Centres', path: '/dashboard/centres', icon: Building2 },
      { id: 'attendance', label: 'Attendance', path: '/dashboard/attendance', icon: Users },
      { id: 'infrastructure', label: 'Infrastructure', path: '/dashboard/infrastructure', icon: Wrench },
      { id: 'activity', label: 'Activity Monitoring', path: '/dashboard/activity', icon: Activity },
    ],
  },
  {
    label: 'OPERATIONS & REVIEWS',
    items: [
      { id: 'alerts', label: 'Alerts & Reviews', path: '/dashboard/alerts', icon: Bell, badgeKey: 'alertsCount' },
      { id: 'cameras', label: 'Camera Health', path: '/dashboard/cameras', icon: Video },
      { id: 'reports', label: 'Reports & Analytics', path: '/dashboard/reports', icon: FileBarChart },
      { id: 'intelligence', label: 'Historical Intelligence', path: '/dashboard/intelligence', icon: BrainCircuit },
    ],
  },
  {
    label: 'ADMINISTRATION',
    items: [
      { id: 'settings', label: 'Configuration', path: '/dashboard/settings', icon: Settings },
    ],
  },
]

export function Sidebar({ mobileOpen, onCloseMobile }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { alerts, logout, currentUser, resetDemoData } = useApp()
  const [collapsed, setCollapsed] = useState(false)

  const pendingAlertsCount = alerts.filter(
    (a) => !['Resolved', 'Dismissed', 'Confirmed'].includes(a.status)
  ).length

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#172B2B]/60 backdrop-blur-xs lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex flex-col border-r border-slate-200/90 bg-white transition-all duration-200 select-none ${
          collapsed ? 'w-20' : 'w-64'
        } ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Brand Header */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-100 px-4">
          <Link
            to="/dashboard"
            onClick={onCloseMobile}
            className="flex items-center gap-3 overflow-hidden text-left"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-800 text-white shadow-sm ring-2 ring-teal-700/20">
              <Eye size={22} className="text-teal-200" />
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold tracking-tight text-ink text-base">
                    Drishti
                  </span>
                  <span className="rounded bg-teal-100 px-1 py-0.2 text-[9px] font-black text-teal-800 tracking-wider">
                    SIH
                  </span>
                </div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                  AI Monitoring Suite
                </p>
              </div>
            )}
          </Link>

          {/* Collapse toggle (desktop only) */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 lg:block transition"
            title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Demo Mode Badge */}
        {!collapsed ? (
          <div className="mx-3 mt-3 flex items-center justify-between rounded-xl border border-amber-200 bg-amber-50/70 px-3 py-2 text-[11px] font-semibold text-amber-800">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
              Demo Environment
            </span>
            <button
              onClick={resetDemoData}
              title="Reset Demo Data"
              className="rounded p-1 text-amber-700 hover:bg-amber-100/80 transition"
            >
              <RefreshCcw size={12} />
            </button>
          </div>
        ) : (
          <div className="mx-auto mt-3 flex h-7 w-7 items-center justify-center rounded-full bg-amber-100 text-amber-800" title="Demo Mode">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
          </div>
        )}

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {navGroups.map((group) => (
            <div key={group.label}>
              {!collapsed && (
                <p className="px-3 mb-2 text-[10px] font-bold tracking-[0.16em] text-slate-400">
                  {group.label}
                </p>
              )}
              <nav className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon
                  const isActive =
                    item.path === '/dashboard'
                      ? pathname === '/dashboard'
                      : pathname.startsWith(item.path)

                  return (
                    <Link
                      key={item.id}
                      to={item.path}
                      onClick={onCloseMobile}
                      className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold transition ${
                        isActive
                          ? 'bg-teal-50 text-teal-800 ring-1 ring-inset ring-teal-200/70 font-bold'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-ink'
                      } ${collapsed ? 'justify-center px-2' : ''}`}
                      title={collapsed ? item.label : undefined}
                    >
                      <Icon
                        size={18}
                        className={`shrink-0 ${
                          isActive
                            ? 'text-teal-800'
                            : 'text-slate-400 group-hover:text-slate-700'
                        }`}
                      />
                      {!collapsed && <span className="flex-1 truncate">{item.label}</span>}
                      {!collapsed && item.badgeKey === 'alertsCount' && pendingAlertsCount > 0 && (
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                            isActive
                              ? 'bg-teal-800 text-white'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {pendingAlertsCount}
                        </span>
                      )}
                      {collapsed && item.badgeKey === 'alertsCount' && pendingAlertsCount > 0 && (
                        <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-amber-500" />
                      )}
                    </Link>
                  )
                })}
              </nav>
            </div>
          ))}
        </div>

        {/* Responsible AI Card */}
        {!collapsed && (
          <div className="mx-3 mb-3 rounded-xl border border-teal-200/80 bg-gradient-to-br from-teal-50/60 to-teal-100/30 p-3.5 text-ink">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-teal-800" />
              <span className="text-xs font-bold text-teal-950">Responsible AI</span>
            </div>
            <p className="mt-1.5 text-[11px] leading-relaxed text-slate-600">
              Findings indicate operational divergence. Sanction determinations require authorized human sign-off.
            </p>
          </div>
        )}

        {/* User Profile & Logout */}
        <div className="border-t border-slate-100 p-3">
          <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'}`}>
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ink text-xs font-bold text-white shadow-xs">
                {currentUser.avatarInitials}
              </div>
              {!collapsed && (
                <div className="min-w-0 text-left">
                  <p className="text-xs font-bold text-ink truncate">{currentUser.name}</p>
                  <p className="text-[10px] text-slate-500 truncate">{currentUser.role}</p>
                </div>
              )}
            </div>

            {!collapsed && (
              <button
                onClick={handleLogout}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-rose-600 transition"
                title="Sign out of demo session"
              >
                <LogOut size={16} />
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  )
}
