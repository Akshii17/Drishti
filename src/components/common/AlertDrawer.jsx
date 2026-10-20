import React, { useState, useEffect } from 'react'
import {
  X, Check, CircleX, RefreshCw, Clock3, AlertTriangle, Video, Users, Wrench, Activity,
  Calendar, UserCheck, ShieldCheck, FileCheck, ArrowRight, CornerDownRight, MessageSquare
} from 'lucide-react'
import { Badge, toneForStatus } from './Badge'
import { Panel } from './Panel'
import { useApp } from '../../context/AppContext'

export function AlertDrawer({ alert, onClose }) {
  const { updateAlert, createCorrectiveAction, setEvidenceViewer } = useApp()

  const [decisionNote, setDecisionNote] = useState('')
  const [assignedOfficer, setAssignedOfficer] = useState('Centre coordinator')
  const [targetDate, setTargetDate] = useState('2026-10-22')
  const [showCreateActionForm, setShowCreateActionForm] = useState(false)
  const [actionTitle, setActionTitle] = useState('')
  const [actionNotes, setActionNotes] = useState('')
  const [confirmModal, setConfirmModal] = useState(null) // { action, label, onProceed }

  useEffect(() => {
    if (alert) {
      setDecisionNote(alert.reviewerNotes || '')
      setAssignedOfficer(alert.assignedTo || 'Centre coordinator')
      setActionTitle(
        alert.type === 'Attendance'
          ? `Re-verify biometric & physical muster records for ${alert.batch || 'Batch'}`
          : alert.type === 'Infrastructure'
          ? `Physical site audit for equipment slot in ${alert.room}`
          : `Field inspection & diagnostic check for ${alert.centre}`
      )
    }
  }, [alert])

  if (!alert) return null

  const handleUpdateStatus = (newStatus, reasonText) => {
    updateAlert(alert.id, {
      status: newStatus,
      reviewerNotes: reasonText || decisionNote || `Status updated to ${newStatus} on 18 Oct 2026.`,
      assignedTo: assignedOfficer,
      dueDate: targetDate,
    })
    setConfirmModal(null)
    onClose()
  }

  const handleCreateActionSubmit = (e) => {
    e.preventDefault()
    if (!actionTitle.trim()) return

    createCorrectiveAction({
      alertId: alert.id,
      centreId: alert.centreId,
      centreName: alert.centre,
      room: alert.room,
      title: actionTitle,
      assignedTo: assignedOfficer,
      dueDate: targetDate,
      priority: alert.priority,
      notes: actionNotes || decisionNote || 'Generated from Alert review workflow',
    })

    setShowCreateActionForm(false)
  }

  const openEvidence = () => {
    setEvidenceViewer({
      title: `${alert.id} Evidence Frame — ${alert.reason}`,
      type: alert.type,
      centre: `${alert.centre} (${alert.centreId})`,
      room: alert.room,
      timestamp: `${alert.date}, ${alert.time}`,
      summary: alert.detail,
    })
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
        {/* Top Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/95 px-6 py-4 backdrop-blur">
          <div className="flex items-center gap-3">
            <span
              className={`flex h-10 w-10 items-center justify-center rounded-xl ${
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
                <Users size={20} />
              ) : alert.type === 'Infrastructure' ? (
                <Wrench size={20} />
              ) : alert.type === 'Camera' ? (
                <Video size={20} />
              ) : (
                <Activity size={20} />
              )}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-800">
                  {alert.id}
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-xs text-slate-500 font-medium">{alert.type} Finding</span>
              </div>
              <h2 className="text-base font-bold text-ink leading-snug truncate max-w-md">
                {alert.centre}
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

        {/* Responsible AI Notice */}
        <div className="bg-slate-50 border-b border-slate-200/80 px-6 py-2.5 text-[11px] text-slate-600 flex items-center gap-2">
          <ShieldCheck size={14} className="text-teal-700 shrink-0" />
          <span>
            <strong>AI Operational Indicator:</strong> This is a decision-support alert. Consequential determinations require human verification.
          </span>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Status and Priority Row */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Badge tone={alert.priority === 'High' ? 'red' : alert.priority === 'Medium' ? 'yellow' : 'slate'}>
                {alert.priority} Priority
              </Badge>
              <Badge tone={toneForStatus(alert.status)} dot>
                {alert.status}
              </Badge>
            </div>
            <span className="text-xs text-slate-400 font-medium">
              Reported: {alert.date} at {alert.time}
            </span>
          </div>

          {/* Finding summary */}
          <div>
            <h3 className="text-lg font-bold text-ink">{alert.reason}</h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed bg-cream/70 p-4 rounded-xl border border-slate-200/60">
              {alert.detail}
            </p>
          </div>

          {/* Location & Context Metadata */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Centre Code</span>
              <p className="mt-1 text-sm font-bold text-ink">{alert.centreId}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Assigned Room</span>
              <p className="mt-1 text-sm font-bold text-ink">{alert.room}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Batch Code</span>
              <p className="mt-1 text-sm font-bold text-ink">{alert.batch || 'General'}</p>
            </div>
          </div>

          {/* Attendance Pipeline Details */}
          {alert.type === 'Attendance' && (
            <Panel className="p-4 border-slate-200 bg-white">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Attendance Reconciliation Breakdown
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Authorized Attendance Reference:</span>
                  <span className="font-semibold text-ink">{alert.reference || 24} candidates</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Vision Peak Occupancy (CCTV):</span>
                  <span className="font-semibold text-ink">{alert.observed || 20} candidates</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Conservative Upper Margin allowance:</span>
                  <span className="font-semibold text-teal-800">+{alert.margin || 3}</span>
                </div>
                <div className="flex justify-between py-2 bg-amber-50/80 px-3 rounded-lg text-amber-900 font-bold">
                  <span>Minimum Apparent Discrepancy Gap:</span>
                  <span>{alert.calculatedGap ?? 1} candidate(s)</span>
                </div>
              </div>
            </Panel>
          )}

          {/* Supporting Evidence Card */}
          <Panel className="p-4 border-slate-200 bg-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Video size={17} className="text-teal-800" />
                <h4 className="text-sm font-bold text-ink">Visual Evidence & Frame Quality</h4>
              </div>
              <button
                onClick={openEvidence}
                className="inline-flex items-center gap-1.5 rounded-lg bg-teal-50 px-3 py-1.5 text-xs font-bold text-teal-800 hover:bg-teal-100 transition"
              >
                Inspect Evidence Frame <ArrowRight size={13} />
              </button>
            </div>
            <p className="mt-2 text-xs text-slate-500">
              Source telemetry: {alert.sourceLabel || 'Calibrated Fixed CCTV Edge Node'}. Face blurring active.
            </p>
          </Panel>

          {/* Reviewer Note and Assignment */}
          <div className="space-y-4 rounded-xl border border-slate-200 bg-slate-50/50 p-4">
            <h4 className="text-sm font-bold text-ink flex items-center gap-2">
              <MessageSquare size={16} className="text-teal-700" />
              Officer Review Decision & Assignment
            </h4>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Official Review Rationale / Notes
              </label>
              <textarea
                value={decisionNote}
                onChange={(e) => setDecisionNote(e.target.value)}
                rows={3}
                placeholder="State the rationale for confirmation, dismissal or additional verification request..."
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-teal-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Assignee for Follow-up
                </label>
                <select
                  value={assignedOfficer}
                  onChange={(e) => setAssignedOfficer(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none"
                >
                  <option>Centre coordinator</option>
                  <option>District monitoring officer</option>
                  <option>Technical maintenance team</option>
                  <option>State administrative auditor</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Compliance Due Date
                </label>
                <input
                  type="date"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none"
                />
              </div>
            </div>

            {/* Quick action to create formal corrective action */}
            {!showCreateActionForm ? (
              <button
                onClick={() => setShowCreateActionForm(true)}
                className="inline-flex items-center gap-2 text-xs font-semibold text-teal-800 hover:text-teal-950"
              >
                <CornerDownRight size={14} /> Link a new formal Corrective Action (CA)
              </button>
            ) : (
              <div className="mt-3 p-3 bg-white rounded-xl border border-teal-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-teal-900">
                    New Corrective Action Record
                  </span>
                  <button
                    onClick={() => setShowCreateActionForm(false)}
                    className="text-xs text-slate-400 hover:text-slate-600"
                  >
                    Cancel
                  </button>
                </div>
                <input
                  value={actionTitle}
                  onChange={(e) => setActionTitle(e.target.value)}
                  placeholder="Action title (e.g. Conduct biometric physical muster audit)"
                  className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-xs outline-none"
                />
                <textarea
                  value={actionNotes}
                  onChange={(e) => setActionNotes(e.target.value)}
                  rows={2}
                  placeholder="Instructions for the assigned team..."
                  className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-xs outline-none"
                />
                <button
                  onClick={handleCreateActionSubmit}
                  className="rounded-lg bg-teal-800 px-3 py-1.5 text-xs font-bold text-white hover:bg-teal-900"
                >
                  Assign Corrective Action
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Consequential Action Confirmation Modal */}
        {confirmModal && (
          <div className="absolute inset-0 z-30 flex items-center justify-center p-6 bg-ink/70 backdrop-blur-xs">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
              <div className="flex items-center gap-3 text-amber-600">
                <AlertTriangle size={24} />
                <h4 className="text-base font-bold text-ink">Confirm Consequential Decision</h4>
              </div>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                You are about to mark this finding as{' '}
                <strong className="text-ink">{confirmModal.label}</strong>. This decision will update official audit metrics and notify the centre coordinator.
              </p>
              <div className="mt-5 flex items-center justify-end gap-2">
                <button
                  onClick={() => setConfirmModal(null)}
                  className="rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmModal.onProceed}
                  className="rounded-xl bg-ink px-4 py-2 text-xs font-bold text-white hover:bg-teal-800"
                >
                  Proceed & Record
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Sticky Action Footer */}
        <div className="sticky bottom-0 border-t border-slate-200 bg-white p-4 sm:px-6">
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() =>
                setConfirmModal({
                  label: 'Dismissed',
                  onProceed: () => handleUpdateStatus('Dismissed', decisionNote || 'Dismissed after officer verification.'),
                })
              }
              className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              <CircleX size={15} /> Dismiss
            </button>

            <button
              onClick={() => handleUpdateStatus('Recheck required', decisionNote || 'Recheck requested from centre.')}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2.5 text-xs font-semibold text-amber-800 hover:bg-amber-100 transition"
            >
              <RefreshCw size={15} /> Recheck
            </button>

            <button
              onClick={() =>
                setConfirmModal({
                  label: 'Confirmed Discrepancy',
                  onProceed: () => handleUpdateStatus('Confirmed', decisionNote || 'Finding confirmed by monitoring officer.'),
                })
              }
              className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-teal-800 px-3 py-2.5 text-xs font-bold text-white hover:bg-teal-900 transition"
            >
              <Check size={16} /> Confirm Finding
            </button>
          </div>
        </div>
      </aside>
    </div>
  )
}
