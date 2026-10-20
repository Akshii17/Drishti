import React, { useState } from 'react'
import {
  Settings, SlidersHorizontal, Bell, ShieldCheck, RefreshCcw, Save,
  AlertTriangle, Check, Info, Lock
} from 'lucide-react'
import { Panel, SectionHeading } from '../../components/common/Panel'
import { Badge } from '../../components/common/Badge'
import { useApp } from '../../context/AppContext'

export function SettingsPage() {
  const { settings, updateSettings, resetDemoData } = useApp()

  const [formState, setFormState] = useState({ ...settings })
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  const handleChange = (key, value) => {
    setFormState((prev) => ({ ...prev, [key]: value }))
    setHasChanges(true)
  }

  const handleSave = (e) => {
    e.preventDefault()
    updateSettings(formState)
    setHasChanges(false)
  }

  const handleResetToBenchmark = () => {
    resetDemoData()
    setFormState({
      attendanceTolerance: '1',
      activityThreshold: '35',
      consecutiveMissCount: '2',
      notifyEmail: true,
      notifySMS: false,
      notifyWhatsApp: true,
      autoRefreshInterval: '30',
      privacyBlurFaces: true,
      evidenceRetentionDays: '90',
    })
    setShowResetConfirm(false)
    setHasChanges(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <SectionHeading
        eyebrow="System Governance"
        title="Configuration & Compliance Rules"
        subtitle="Manage automated discrepancy tolerances, persistence rules for infrastructure detection, and official alert dispatch channels."
        action={
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setShowResetConfirm(true)}
              className="inline-flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2 text-xs font-bold text-rose-800 hover:bg-rose-100 transition shadow-xs"
            >
              <RefreshCcw size={14} /> Factory Reset Demo State
            </button>
            <button
              onClick={handleSave}
              disabled={!hasChanges}
              className="inline-flex items-center gap-2 rounded-xl bg-teal-800 px-4 py-2 text-xs font-bold text-white hover:bg-teal-900 transition shadow-card disabled:opacity-50"
            >
              <Save size={14} /> Save Configuration
            </button>
          </div>
        }
      />

      <form onSubmit={handleSave} className="grid gap-6 xl:grid-cols-2">
        {/* Monitoring Rules & Thresholds */}
        <Panel className="p-5 sm:p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-base text-ink">Discrepancy Trigger Rules</h3>
              <p className="text-xs text-slate-500 mt-0.5">Calibrate tolerances for automated pipeline flags.</p>
            </div>
            <Badge tone="teal" size="xs">
              Pipeline Calibrations
            </Badge>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1 text-[10px]">
                Minimum Attendance Discrepancy Tolerance
              </label>
              <p className="text-[11px] text-slate-500 mb-2">
                Raise an automated review alert only when the calculated apparent gap exceeds this number of persons.
              </p>
              <select
                value={formState.attendanceTolerance}
                onChange={(e) => handleChange('attendanceTolerance', e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-700 outline-none focus:border-teal-700"
              >
                <option value="0">0 Candidates (Zero tolerance)</option>
                <option value="1">1 Candidate (Recommended standard)</option>
                <option value="2">2 Candidates (Accommodates larger lab motion)</option>
                <option value="3">3 Candidates (High-motion workshops)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1 text-[10px]">
                Practical Activity Motion Score Threshold
              </label>
              <p className="text-[11px] text-slate-500 mb-2">
                Consecutive optical density below this percentage flags workstation for review.
              </p>
              <select
                value={formState.activityThreshold}
                onChange={(e) => handleChange('activityThreshold', e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-700 outline-none focus:border-teal-700"
              >
                <option value="25">25% Optical Motion Density</option>
                <option value="35">35% Optical Motion Density (Standard)</option>
                <option value="50">50% Optical Motion Density (Strict)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1 text-[10px]">
                Infrastructure Multi-Check Persistence Rule
              </label>
              <p className="text-[11px] text-slate-500 mb-2">
                Number of successive valid clear-view checks before an equipment slot triggers an officer alert.
              </p>
              <select
                value={formState.consecutiveMissCount}
                onChange={(e) => handleChange('consecutiveMissCount', e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-700 outline-none focus:border-teal-700"
              >
                <option value="1">1 Check (Immediate flag)</option>
                <option value="2">2 Checks (Default: Eliminates temporary occlusion)</option>
                <option value="3">3 Checks (Conservative)</option>
              </select>
            </div>
          </div>

          <div className="rounded-xl bg-cream p-3 text-xs text-slate-600 border border-slate-200/60 leading-relaxed">
            <span className="font-bold text-teal-900 block mb-0.5">Persistence Policy:</span>
            Uncertain visual conditions (blocked sightlines, poor illumination, unvalidated equipment models) remain designated as Unverified—never transformed into confirmed violations.
          </div>
        </Panel>

        {/* Notifications & Responsible Privacy */}
        <div className="space-y-6">
          <Panel className="p-5 sm:p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-base text-ink">Alert Dispatch Channels</h3>
                <p className="text-xs text-slate-500 mt-0.5">Configure automated notification pathways for urgent reviews.</p>
              </div>
              <Bell size={16} className="text-teal-800" />
            </div>

            <div className="space-y-3 text-xs">
              {[
                {
                  key: 'notifyEmail',
                  title: 'Official Email Dispatch',
                  desc: 'Sends detailed alert dossier with frame snapshot links to assigned district officers.',
                },
                {
                  key: 'notifyWhatsApp',
                  title: 'WhatsApp Official Gateway',
                  desc: 'Delivers actionable interactive review prompts to verified centre coordinators.',
                },
                {
                  key: 'notifySMS',
                  title: 'SMS Critical Urgency Gateway',
                  desc: 'Sends instant SMS alerts for high-priority camera dropouts and overdue audits.',
                },
              ].map((channel) => (
                <label
                  key={channel.key}
                  className="flex items-start justify-between gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition"
                >
                  <div>
                    <span className="font-bold text-ink block">{channel.title}</span>
                    <span className="text-[11px] text-slate-500 mt-0.5 block leading-relaxed">
                      {channel.desc}
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={formState[channel.key]}
                    onChange={(e) => handleChange(channel.key, e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-teal-800 focus:ring-teal-700 accent-teal-800 shrink-0 mt-1"
                  />
                </label>
              ))}
            </div>
          </Panel>

          <Panel className="p-5 sm:p-6 space-y-4">
            <div className="flex items-center gap-2 text-teal-900 font-bold text-sm">
              <ShieldCheck size={18} className="text-teal-800" />
              <span>Privacy & Retention Safeguards</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Facial Blurring Pre-Processing:</span>
                <span className="font-bold text-emerald-700">Enforced Globally</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Evidence Frame Retention Window:</span>
                <span className="font-bold text-ink">{formState.evidenceRetentionDays} Days (Compliant)</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-slate-600">State Gateway Audit Log:</span>
                <span className="font-bold text-teal-800">Immutable Hash Active</span>
              </div>
            </div>
          </Panel>
        </div>
      </form>

      {/* Confirmation Modal for Resetting Demo Data */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/70 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center gap-3 text-rose-600">
              <AlertTriangle size={24} />
              <h4 className="text-base font-bold text-ink">Restore Initial SIH Benchmark State?</h4>
            </div>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              This will reset all modified alerts, resolved reviews, newly created corrective actions, and custom thresholds back to the official pre-loaded demo benchmark.
            </p>
            <div className="mt-5 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleResetToBenchmark}
                className="rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white hover:bg-rose-700 transition"
              >
                Yes, Reset Everything
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
