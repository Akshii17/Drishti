import React, { useState, useMemo } from 'react'
import {
  Building2, Search, Filter, Plus, ChevronRight, Video, AlertTriangle,
  Download, ArrowUpDown, MapPin, CheckCircle2, ChevronLeft
} from 'lucide-react'
import { Panel, SectionHeading } from '../../components/common/Panel'
import { MetricCard } from '../../components/common/MetricCard'
import { Badge, toneForStatus } from '../../components/common/Badge'
import { EmptyState } from '../../components/common/EmptyState'
import { useApp } from '../../context/AppContext'

export function CentresPage() {
  const { centres, setSelectedCentreDetail, exportToCSV, showToast } = useApp()

  const [search, setSearch] = useState('')
  const [districtFilter, setDistrictFilter] = useState('ALL')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [sortBy, setSortBy] = useState('name') // 'name' | 'alerts' | 'score'
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  // Unique districts
  const districts = useMemo(() => {
    return Array.from(new Set(centres.map((c) => c.district))).sort()
  }, [centres])

  // Filtered & Sorted
  const filtered = useMemo(() => {
    return centres
      .filter((c) => {
        const matchesSearch =
          `${c.name} ${c.id} ${c.district} ${c.coordinator}`.toLowerCase().includes(search.toLowerCase())
        const matchesDistrict = districtFilter === 'ALL' || c.district === districtFilter
        const matchesStatus = statusFilter === 'ALL' || c.status === statusFilter
        return matchesSearch && matchesDistrict && matchesStatus
      })
      .sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name)
        if (sortBy === 'alerts') return b.alerts - a.alerts
        if (sortBy === 'score') return b.complianceScore - a.complianceScore
        return 0
      })
  }, [centres, search, districtFilter, statusFilter, sortBy])

  // Pagination
  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1
  const paginatedCentres = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleExport = () => {
    exportToCSV(
      filtered.map((c) => ({
        ID: c.id,
        Name: c.name,
        District: c.district,
        Rooms: c.roomsCount,
        Cameras: c.cameras,
        Alerts: c.alerts,
        ComplianceScore: `${c.complianceScore}%`,
        Status: c.status,
      })),
      `drishti_centres_${Date.now()}.csv`
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Heading */}
      <SectionHeading
        eyebrow="Registry & Compliance"
        title="Training Centres"
        subtitle="Operational registry of vocational training centres, classroom room allocations, and camera status across Maharashtra."
        action={
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleExport}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-xs"
            >
              <Download size={14} /> Export CSV
            </button>
            <button
              onClick={() => showToast('Centre onboarding wizard is simulated in this SIH demo.', 'info')}
              className="inline-flex items-center gap-2 rounded-xl bg-teal-800 px-4 py-2 text-xs font-bold text-white hover:bg-teal-900 transition shadow-card"
            >
              <Plus size={15} /> Add Training Centre
            </button>
          </div>
        }
      />

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricCard
          label="Registered Centres"
          value={centres.length}
          hint="Operational state institutes"
          icon={Building2}
          tone="teal"
        />
        <MetricCard
          label="Network Camera Health"
          value="96.8%"
          hint="42 of 44 online cameras"
          icon={Video}
          tone="green"
        />
        <MetricCard
          label="Centres Under Review"
          value={centres.filter((c) => c.status !== 'Healthy').length}
          hint="Open operational findings"
          icon={AlertTriangle}
          tone="yellow"
        />
      </div>

      {/* Main Panel with Filter Controls and Table */}
      <Panel className="overflow-hidden">
        {/* Filter Bar */}
        <div className="flex flex-col gap-3 border-b border-slate-100 p-4 lg:flex-row lg:items-center lg:justify-between bg-slate-50/50">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setCurrentPage(1)
              }}
              placeholder="Search by centre name, ID, district or coordinator..."
              className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-xs outline-none focus:border-teal-700"
            />
          </div>

          {/* Dropdown Filters */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* District */}
            <select
              value={districtFilter}
              onChange={(e) => {
                setDistrictFilter(e.target.value)
                setCurrentPage(1)
              }}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 outline-none"
            >
              <option value="ALL">All Districts</option>
              {districts.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>

            {/* Status */}
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value)
                setCurrentPage(1)
              }}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 outline-none"
            >
              <option value="ALL">All Statuses</option>
              <option value="Healthy">Healthy</option>
              <option value="Review needed">Review needed</option>
              <option value="Camera issue">Camera issue</option>
            </select>

            {/* Sort by */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 outline-none"
            >
              <option value="name">Sort by Name</option>
              <option value="alerts">Sort by Open Alerts</option>
              <option value="score">Sort by Compliance Score</option>
            </select>

            {(search || districtFilter !== 'ALL' || statusFilter !== 'ALL') && (
              <button
                onClick={() => {
                  setSearch('')
                  setDistrictFilter('ALL')
                  setStatusFilter('ALL')
                  setCurrentPage(1)
                }}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-500 hover:bg-slate-50"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Centres Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[760px]">
            <thead className="bg-slate-50 text-[10px] uppercase font-bold tracking-wider text-slate-400">
              <tr>
                <th className="px-5 py-3">Centre Name & Code</th>
                <th className="px-5 py-3">District</th>
                <th className="px-5 py-3">Coordinator</th>
                <th className="px-5 py-3">Rooms</th>
                <th className="px-5 py-3">Cameras Online</th>
                <th className="px-5 py-3">Open Findings</th>
                <th className="px-5 py-3">Compliance</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedCentres.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => setSelectedCentreDetail(c)}
                  className="hover:bg-teal-50/40 cursor-pointer transition"
                >
                  <td className="px-5 py-3.5">
                    <p className="font-bold text-ink">{c.name}</p>
                    <p className="text-[10px] font-mono text-slate-400">{c.id}</p>
                  </td>
                  <td className="px-5 py-3.5 text-slate-600">{c.district}</td>
                  <td className="px-5 py-3.5 text-slate-600">
                    <p className="font-medium">{c.coordinator}</p>
                    <p className="text-[10px] text-slate-400">{c.phone}</p>
                  </td>
                  <td className="px-5 py-3.5 text-slate-600 font-semibold">{c.roomsCount}</td>
                  <td className="px-5 py-3.5 text-slate-600 font-mono">{c.cameras}</td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`font-bold ${
                        c.alerts > 0 ? 'text-amber-700' : 'text-slate-400'
                      }`}
                    >
                      {c.alerts}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className="h-full bg-teal-700 rounded-full"
                          style={{ width: `${c.complianceScore}%` }}
                        />
                      </div>
                      <span className="font-bold text-teal-800">{c.complianceScore}%</span>
                    </div>
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
                      className="rounded-lg p-1.5 text-slate-400 hover:text-teal-800 hover:bg-slate-100 transition"
                      aria-label={`View details of ${c.name}`}
                    >
                      <ChevronRight size={17} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <EmptyState
              title="No training centres found"
              description="No centre matches the active search term or district filter."
              action={
                <button
                  onClick={() => {
                    setSearch('')
                    setDistrictFilter('ALL')
                    setStatusFilter('ALL')
                  }}
                  className="rounded-xl bg-teal-800 px-4 py-2 text-xs font-bold text-white"
                >
                  Clear Filters
                </button>
              }
            />
          )}
        </div>

        {/* Pagination Footer */}
        <div className="border-t border-slate-100 px-5 py-3 flex items-center justify-between text-xs text-slate-500 bg-slate-50/40">
          <span>
            Showing {(currentPage - 1) * itemsPerPage + 1} -{' '}
            {Math.min(currentPage * itemsPerPage, filtered.length)} of {filtered.length} centres
          </span>

          {totalPages > 1 && (
            <div className="flex items-center gap-1.5">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="rounded-lg border border-slate-200 bg-white p-1 text-slate-600 disabled:opacity-40"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="px-2 text-xs font-semibold">
                Page {currentPage} of {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="rounded-lg border border-slate-200 bg-white p-1 text-slate-600 disabled:opacity-40"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </Panel>
    </div>
  )
}
