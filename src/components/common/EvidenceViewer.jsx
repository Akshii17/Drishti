import React, { useState } from 'react'
import { X, Video, ShieldCheck, Eye, Download, Info, Maximize2, AlertTriangle, Layers } from 'lucide-react'
import { Badge } from './Badge'

export function EvidenceViewer({ evidence, onClose }) {
  const [showOverlays, setShowOverlays] = useState(true)

  if (!evidence) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#172B2B]/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-900/10 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-800 text-white shadow-sm">
              <Video size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-800">
                  {evidence.type || 'Monitoring Evidence'}
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-xs text-slate-500 font-mono">
                  {evidence.timestamp || '18 Oct 2026, 10:42 AM'}
                </span>
              </div>
              <h3 className="text-base font-bold text-ink">
                {evidence.title || 'Evidence Frame Inspection'}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-200 bg-white p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition"
            aria-label="Close evidence viewer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Responsible AI Banner */}
        <div className="bg-amber-50/90 border-b border-amber-200 px-6 py-2.5 flex items-start gap-2.5 text-xs text-amber-900">
          <ShieldCheck size={16} className="text-amber-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">DEMO EVIDENCE MODE — NO LIVE AEBAS OR BIOMETRIC SURVEILLANCE.</span>
            <span className="ml-1 text-amber-800">
              Facial recognition is explicitly disabled. Visual counts and equipment slot states are conservative AI estimates designed to support—not replace—human officer review.
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Main Visual Display */}
          <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-slate-900 border border-slate-700 shadow-inner flex flex-col justify-between p-4">
            {/* Top Frame Overlay */}
            <div className="flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 rounded-md bg-black/60 backdrop-blur px-2.5 py-1 text-[11px] font-mono text-emerald-400 border border-white/10">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  FEED: {evidence.cameraId || 'CAM-PN-02'}
                </span>
                <span className="rounded-md bg-black/60 backdrop-blur px-2.5 py-1 text-[11px] font-mono text-white/80 border border-white/10">
                  {evidence.resolution || '1080p @ 25fps'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowOverlays(!showOverlays)}
                  className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium backdrop-blur transition border ${
                    showOverlays
                      ? 'bg-teal-600 text-white border-teal-500'
                      : 'bg-black/60 text-white/70 border-white/10 hover:text-white'
                  }`}
                >
                  <Layers size={13} />
                  {showOverlays ? 'AI Overlays: ON' : 'AI Overlays: OFF'}
                </button>
              </div>
            </div>

            {/* Central Simulated Inspection Canvas */}
            <div className="absolute inset-0 flex items-center justify-center p-8">
              {/* Classroom / Workshop Mock Wireframe Graphic */}
              <div className="relative w-full h-full border border-slate-700/60 rounded-lg bg-gradient-to-b from-slate-800/40 to-slate-900/80 flex flex-col items-center justify-center">
                <div className="text-center p-4">
                  <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-900/60 text-teal-300 border border-teal-700/50">
                    <Video size={28} />
                  </div>
                  <p className="text-sm font-semibold text-slate-200">
                    {evidence.room || 'Room 2 (Electronics & CNC Workshop)'}
                  </p>
                  <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                    {evidence.summary ||
                      'Sample frame captured for scheduled batch verification. Visual ROI boundaries are calibrated to fixed workstation slots.'}
                  </p>
                </div>

                {/* Simulated Bounding Boxes when showOverlays is true */}
                {showOverlays && (
                  <>
                    <div className="absolute left-[15%] top-[25%] w-[28%] h-[35%] rounded border-2 border-teal-400/80 bg-teal-500/10 p-1.5 flex flex-col justify-between">
                      <span className="bg-teal-500 text-slate-950 font-mono text-[9px] font-bold px-1.5 py-0.5 rounded-sm self-start">
                        OCCUPANCY REGION #1: 12 SEATS
                      </span>
                      <span className="text-[10px] text-teal-300 font-mono self-end">
                        CONF: 94%
                      </span>
                    </div>

                    <div className="absolute right-[18%] top-[28%] w-[24%] h-[32%] rounded border-2 border-amber-400/80 bg-amber-500/10 p-1.5 flex flex-col justify-between">
                      <span className="bg-amber-500 text-slate-950 font-mono text-[9px] font-bold px-1.5 py-0.5 rounded-sm self-start">
                        EQUIPMENT SLOT WB-03: PARTIAL
                      </span>
                      <span className="text-[10px] text-amber-300 font-mono self-end">
                        OCCLUSION: 42%
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Bottom Frame Stamp */}
            <div className="flex items-center justify-between z-10 text-[11px] font-mono text-slate-400 bg-black/60 backdrop-blur px-3 py-1.5 rounded-md border border-white/10">
              <span>LOCATION: {evidence.centre || 'Pune Skills Hub (MH-04)'}</span>
              <span className="text-amber-400">
                FRAME INTEGRITY: 96.4% • LIGHTING: GOOD
              </span>
            </div>
          </div>

          {/* Key Metrics & Telemetry Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <p className="text-[11px] font-semibold text-slate-500 uppercase">Evidence Type</p>
              <p className="text-sm font-bold text-ink mt-1">{evidence.type || 'Automated Sample'}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <p className="text-[11px] font-semibold text-slate-500 uppercase">Lighting Quality</p>
              <p className="text-sm font-bold text-emerald-700 mt-1">94% (Optimal)</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <p className="text-[11px] font-semibold text-slate-500 uppercase">Sightline Occlusion</p>
              <p className="text-sm font-bold text-amber-700 mt-1">8% (Within limits)</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <p className="text-[11px] font-semibold text-slate-500 uppercase">Privacy Mask</p>
              <p className="text-sm font-bold text-teal-800 mt-1">Active (Faces Blurred)</p>
            </div>
          </div>

          {/* Detailed Observations */}
          <div className="rounded-xl border border-slate-200 p-4">
            <h4 className="text-sm font-bold text-ink mb-1">
              Officer Review Guidelines for this Evidence
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              1. Verify that the camera sightline was completely unobstructed during the observation period.
              <br />
              2. Do not treat temporary absence (e.g. washroom break, instructional lecture at board) as missing training hours.
              <br />
              3. If video quality dropped below 80% during the session, mark as <strong>Unable to Verify</strong> rather than confirming a violation.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 bg-slate-50 px-6 py-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Info size={14} className="text-teal-700 shrink-0" />
            <span>Digital hash verified • Stored under 90-day compliance retention</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => alert('Demo evidence frame snapshot downloaded.')}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              <Download size={14} /> Export Frame Snapshot
            </button>
            <button
              onClick={onClose}
              className="rounded-xl bg-ink px-4 py-2 text-xs font-semibold text-white hover:bg-teal-800 transition"
            >
              Done Inspecting
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
