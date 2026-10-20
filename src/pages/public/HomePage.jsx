import React, { useState } from 'react'
import {
  Eye, ShieldCheck, ArrowRight, CheckCircle2, AlertTriangle, Users, Wrench, Activity,
  Video, FileBarChart, BrainCircuit, Check, ExternalLink, Menu, X, ChevronRight,
  Sparkles, Lock, BarChart3, Database, Layers, RefreshCw, Cpu, Building2
} from 'lucide-react'
import { Link, useNavigate } from '../../router/Router'
import { useApp } from '../../context/AppContext'
import { Badge } from '../../components/common/Badge'

export function HomePage() {
  const navigate = useNavigate()
  const { isAuthenticated } = useApp()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLaunchDemo = () => {
    if (isAuthenticated) {
      navigate('/dashboard')
    } else {
      navigate('/login')
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F7F7] text-ink antialiased">
      {/* 1. Header & Navigation */}
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-800 text-white shadow-md ring-2 ring-teal-700/20">
              <Eye size={24} className="text-teal-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight text-ink">Drishti</span>
                <span className="rounded bg-teal-100 px-1.5 py-0.5 text-[10px] font-black text-teal-800 tracking-wider">
                  SIH 2026
                </span>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                AI Monitoring & Compliance
              </p>
            </div>
          </div>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#problem-solution" className="hover:text-teal-800 transition">
              Overview
            </a>
            <a href="#how-it-works" className="hover:text-teal-800 transition">
              How It Works
            </a>
            <a href="#capabilities" className="hover:text-teal-800 transition">
              Capabilities
            </a>
            <a href="#responsible-ai" className="hover:text-teal-800 transition">
              Responsible AI
            </a>
            <a href="#impact" className="hover:text-teal-800 transition">
              Evaluation Metrics
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              to="/login"
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-xs"
            >
              Sign In
            </Link>
            <button
              onClick={handleLaunchDemo}
              className="inline-flex items-center gap-2 rounded-xl bg-teal-800 px-5 py-2.5 text-xs font-bold text-white hover:bg-teal-900 transition shadow-card"
            >
              Explore Dashboard <ArrowRight size={14} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden rounded-xl border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-slate-200 bg-white px-6 py-5 space-y-4">
            <a
              href="#problem-solution"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold text-slate-700"
            >
              Overview
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold text-slate-700"
            >
              How It Works
            </a>
            <a
              href="#capabilities"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold text-slate-700"
            >
              Capabilities
            </a>
            <a
              href="#responsible-ai"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold text-slate-700"
            >
              Responsible AI
            </a>
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <Link
                to="/login"
                className="w-full text-center py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700"
              >
                Sign In
              </Link>
              <button
                onClick={handleLaunchDemo}
                className="w-full text-center py-2.5 rounded-xl bg-teal-800 text-xs font-bold text-white"
              >
                Explore Dashboard
              </button>
            </div>
          </div>
        )}
      </header>

      {/* 2. Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Heading and CTAs */}
            <div className="lg:col-span-7 space-y-6">
              {/* SIH Pill */}
              <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3.5 py-1.5 text-xs font-bold text-teal-900 shadow-xs">
                <span className="flex h-2 w-2 rounded-full bg-teal-600 animate-pulse" />
                <span>Smart India Hackathon 2026 • Problem Statement 26245</span>
              </div>

              {/* Master Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-ink leading-[1.15]">
                See Every Centre.{' '}
                <span className="text-teal-800">Detect Every Gap.</span>{' '}
                Improve Every Outcome.
              </h1>

              {/* Supporting Copy */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl">
                Drishti is an AI-assisted training centre monitoring and compliance platform that helps administrators review attendance discrepancies, verify infrastructure availability, monitor scheduled training activity, and manage corrective actions through one unified interface.
              </p>

              {/* 4 Capability Pills */}
              <div className="flex flex-wrap gap-2.5 pt-1">
                {[
                  { label: 'Attendance Reconciliation', icon: Users },
                  { label: 'Infrastructure Verification', icon: Wrench },
                  { label: 'Practical Activity Tracking', icon: Activity },
                  { label: 'Corrective Action Governance', icon: ShieldCheck },
                ].map((cap) => {
                  const Icon = cap.icon
                  return (
                    <span
                      key={cap.label}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-xs"
                    >
                      <Icon size={14} className="text-teal-700" />
                      {cap.label}
                    </span>
                  )
                })}
              </div>

              {/* Main Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-3">
                <button
                  onClick={handleLaunchDemo}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-800 px-6 py-3.5 text-sm font-bold text-white shadow-card hover:bg-teal-900 transition"
                >
                  Explore Monitoring Demo <ArrowRight size={16} />
                </button>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 hover:bg-slate-50 transition shadow-xs"
                >
                  Discover How It Works
                </a>
              </div>

              <div className="flex items-center gap-4 pt-2 text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={15} className="text-teal-700" /> Zero Live Biometrics Captured
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={15} className="text-teal-700" /> Officer Sign-off Required
                </span>
              </div>
            </div>

            {/* Right Column: Miniature Real React Dashboard Preview */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xl ring-1 ring-slate-900/5">
                {/* Mini Window Controls */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-rose-400" />
                    <span className="h-3 w-3 rounded-full bg-amber-400" />
                    <span className="h-3 w-3 rounded-full bg-emerald-400" />
                    <span className="ml-2 text-[11px] font-mono font-bold text-slate-400">
                      DRISHTI_LIVE_PANEL.EXE
                    </span>
                  </div>
                  <Badge tone="teal" size="xs" dot>
                    Demo Live
                  </Badge>
                </div>

                {/* Mini KPI Cards */}
                <div className="grid grid-cols-2 gap-2.5 mb-4">
                  <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3">
                    <span className="text-[10px] font-bold uppercase text-slate-400">Monitored Centres</span>
                    <p className="text-xl font-extrabold text-ink mt-0.5">24</p>
                    <span className="text-[10px] text-teal-800 font-semibold">Maharashtra State</span>
                  </div>
                  <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3">
                    <span className="text-[10px] font-bold uppercase text-slate-400">Review Queue</span>
                    <p className="text-xl font-extrabold text-amber-700 mt-0.5">5 Pending</p>
                    <span className="text-[10px] text-slate-500">Human triage needed</span>
                  </div>
                </div>

                {/* Mini Attendance Trend Graphic */}
                <div className="rounded-xl border border-slate-100 bg-cream/40 p-3 mb-4">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-bold text-ink">Room 2 Attendance Reconciliation</span>
                    <span className="text-[10px] font-mono text-amber-700 font-bold">Gap: 1</span>
                  </div>
                  <div className="h-16 flex items-end gap-1.5 px-2">
                    {[65, 75, 78, 72, 74, 80, 84, 80, 75, 79].map((val, i) => (
                      <div key={i} className="flex-1 bg-slate-200 rounded-t h-full flex flex-col justify-end">
                        <div
                          className={`w-full rounded-t transition-all ${
                            i === 6 ? 'bg-amber-500' : 'bg-teal-700'
                          }`}
                          style={{ height: `${val}%` }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-[9px] text-slate-400 mt-1.5 px-1 font-mono">
                    <span>09:00 AM (Ref: 24)</span>
                    <span>10:45 AM (Est: 20 + 3)</span>
                  </div>
                </div>

                {/* Mini Recent Alert Row */}
                <div className="space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Latest Operational Finding
                  </p>
                  <div className="rounded-xl border border-amber-200/90 bg-amber-50/50 p-2.5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-100 text-amber-800">
                        <AlertTriangle size={13} />
                      </span>
                      <div>
                        <p className="font-bold text-ink text-[11px]">Pune Skills Hub (MH-04)</p>
                        <p className="text-[10px] text-slate-500">Minimum apparent gap: 1 trainee</p>
                      </div>
                    </div>
                    <Badge tone="yellow" size="xs">
                      Review
                    </Badge>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Centre camera sync: 96.8%</span>
                  <span className="text-teal-800 font-bold hover:underline cursor-pointer" onClick={handleLaunchDemo}>
                    Open full demo &rarr;
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Problem and Solution */}
      <section id="problem-solution" className="py-20 bg-white border-y border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-teal-800 mb-2">
              The Operational Challenge
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink">
              Bridging the Monitoring Gap in Skill Development
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              State vocational programmes rely on trust, physical audits, and fragmented paperwork. Drishti transforms irregular oversight into automated, verified compliance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Left: Identified Problems */}
            <div className="rounded-2xl border border-rose-200/80 bg-rose-50/30 p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 text-rose-800 font-bold text-base">
                <AlertTriangle size={20} />
                <h3>Conventional Monitoring Challenges</h3>
              </div>
              <ul className="space-y-3.5 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <span className="h-5 w-5 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✕</span>
                  <span><strong>Attendance Discrepancies:</strong> Trainees marked present in morning logs absent during actual vocational hours.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="h-5 w-5 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✕</span>
                  <span><strong>Ghost Infrastructure:</strong> High-value machinery (CNC units, sewing machines) removed or locked away after registration audits.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="h-5 w-5 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✕</span>
                  <span><strong>Inactive Practical Sessions:</strong> Scheduled practical hours spent on idle lectures without hands-on machine interaction.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="h-5 w-5 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✕</span>
                  <span><strong>Unverifiable Evidence:</strong> Blurry or obstructed cameras falsely passed as operational proof without telemetry checks.</span>
                </li>
              </ul>
            </div>

            {/* Right: Drishti Solution */}
            <div className="rounded-2xl border border-teal-200/80 bg-teal-50/40 p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 text-teal-900 font-bold text-base">
                <ShieldCheck size={20} className="text-teal-800" />
                <h3>The Drishti Unified Solution</h3>
              </div>
              <ul className="space-y-3.5 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <span className="h-5 w-5 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</span>
                  <span><strong>Automated Reconciliation:</strong> Correlates official roster counts with conservative CCTV peak occupancy bounds.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="h-5 w-5 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</span>
                  <span><strong>Fixed-Slot Inventory Checks:</strong> Verifies registered machine slots across consecutive clear-view camera sweeps.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="h-5 w-5 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</span>
                  <span><strong>Motion Cue Assessment:</strong> Evaluates optical motion density during scheduled practical training windows.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="h-5 w-5 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</span>
                  <span><strong>Human-in-the-Loop Actions:</strong> Converts uncertain detections into structured reviewer tasks and corrective action notices.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. How Drishti Works (5-Step Visual Process) */}
      <section id="how-it-works" className="py-20 bg-[#F5F7F7]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-teal-800 mb-2">
              Execution Architecture
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink">
              The 5-Step Operational Pipeline
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              How raw inputs from training centres are ingested, validated, and translated into verified compliance outcomes.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              {
                step: '01',
                title: 'Input Ingestion',
                desc: 'Collects authorised roster records, scheduled batch timetables, and calibrated CCTV streams.',
                icon: Database,
              },
              {
                step: '02',
                title: 'Evidence Validation',
                desc: 'Checks lighting, lens occlusion, and frame rates. Discards invalid feeds to prevent false alarms.',
                icon: Video,
              },
              {
                step: '03',
                title: 'Pipeline Analysis',
                desc: 'Applies occupancy bounding, fixed equipment slot scanning, and practical workstation motion cues.',
                icon: Cpu,
              },
              {
                step: '04',
                title: 'Human Review',
                desc: 'Divergent findings route to monitoring officers with supporting snapshots for manual verification.',
                icon: Users,
              },
              {
                step: '05',
                title: 'Corrective Actions',
                desc: 'Tracks issued notices, physical audit assignments, and longitudinal centre compliance trends.',
                icon: ShieldCheck,
              },
            ].map((step) => {
              const Icon = step.icon
              return (
                <div
                  key={step.step}
                  className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-soft flex flex-col justify-between hover:-translate-y-1 hover:shadow-card transition duration-200"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-black text-teal-800 bg-teal-50 px-2.5 py-1 rounded-lg">
                        STEP {step.step}
                      </span>
                      <Icon size={20} className="text-teal-700" />
                    </div>
                    <h3 className="text-sm font-bold text-ink">{step.title}</h3>
                    <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 5. Feature Showcase (8 Feature Cards) */}
      <section id="capabilities" className="py-20 bg-white border-t border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-teal-800 mb-2">
              Platform Features
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink">
              Comprehensive Monitoring Capabilities
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              Every monitoring dimension required by government vocational regulators in one integrated suite.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Attendance Reconciliation',
                desc: 'Calculates conservative classroom occupancy and identifies apparent gaps against authorized rosters.',
                icon: Users,
                link: '/dashboard/attendance',
              },
              {
                title: 'Infrastructure Verification',
                desc: 'Monitors configured equipment slots with multi-state detection (Seen, Blocked, Not Seen, Unverified).',
                icon: Wrench,
                link: '/dashboard/infrastructure',
              },
              {
                title: 'Activity Monitoring',
                desc: 'Evaluates hands-on workstation motion cues during scheduled practical lab sessions.',
                icon: Activity,
                link: '/dashboard/activity',
              },
              {
                title: 'Training Centre Directory',
                desc: 'Registry of training centres, rooms, cameras, active batches, and compliance scores across the state.',
                icon: Building2,
                link: '/dashboard/centres',
              },
              {
                title: 'Alerts & Human Review',
                desc: 'Action portal to confirm findings, dismiss false leads, assign rechecks, and record audit rationale.',
                icon: AlertTriangle,
                link: '/dashboard/alerts',
              },
              {
                title: 'Camera & Evidence Health',
                desc: 'Telemetry tracking for lens occlusion, lighting quality, resolution stability, and monitoring eligibility.',
                icon: Video,
                link: '/dashboard/cameras',
              },
              {
                title: 'Reports & Analytics',
                desc: 'Longitudinal trend charts, 7-day pipeline breakdown, resolution metrics, and clean CSV data export.',
                icon: FileBarChart,
                link: '/dashboard/reports',
              },
              {
                title: 'Historical Intelligence',
                desc: 'Detects repeated discrepancy patterns and recurrent equipment issues across recurring sessions.',
                icon: BrainCircuit,
                link: '/dashboard/intelligence',
              },
            ].map((f) => {
              const Icon = f.icon
              return (
                <div
                  key={f.title}
                  className="rounded-2xl border border-slate-200/90 bg-[#F5F7F7]/60 p-6 flex flex-col justify-between hover:bg-white hover:border-teal-300 hover:shadow-card transition duration-200 group"
                >
                  <div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-800 border border-teal-100 mb-4 group-hover:bg-teal-800 group-hover:text-white transition">
                      <Icon size={20} />
                    </div>
                    <h3 className="text-base font-bold text-ink">{f.title}</h3>
                    <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                      {f.desc}
                    </p>
                  </div>

                  <button
                    onClick={() => navigate(f.link)}
                    className="mt-6 flex items-center gap-1.5 text-xs font-bold text-teal-800 group-hover:text-teal-950 transition"
                  >
                    View in Dashboard <ArrowRight size={13} />
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 6. Responsible AI & Privacy */}
      <section id="responsible-ai" className="py-20 bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-teal-900/60 border border-teal-500/40 px-3.5 py-1.5 text-xs font-bold text-teal-300">
                <ShieldCheck size={16} /> Privacy-First Architecture
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                Built on Ethical AI Principles & Human Accountability
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Automated vision models can make mistakes under challenging lighting or partial sightline obstructions. Drishti is built from the ground up to prevent punitive actions based on unverified raw inference.
              </p>

              <div className="space-y-4 pt-2">
                {[
                  {
                    title: 'No Facial Recognition or Biometrics',
                    desc: 'Drishti estimates bulk occupancy and centroid counts. Individual identity is never extracted or stored.',
                  },
                  {
                    title: 'Uncertainty Never Implies Violation',
                    desc: 'If a camera view is obstructed or lighting drops, the system marks the period "Unable to Verify"—never a confirmed discrepancy.',
                  },
                  {
                    title: 'Mandatory Human Officer Sign-off',
                    desc: 'Every alert remains a potential finding until an authorized officer reviews the snapshot evidence and issues a formal decision.',
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-800/80 text-teal-300 shrink-0 mt-0.5 text-xs font-bold">
                      ✓
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-white">{item.title}</h4>
                      <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl border border-slate-700 bg-slate-800/80 p-6 space-y-4">
                <h4 className="text-sm font-bold text-teal-300 uppercase tracking-wider">
                  Operational Safeguards Matrix
                </h4>
                <div className="divide-y divide-slate-700 text-xs">
                  <div className="py-3 flex justify-between">
                    <span className="text-slate-400">Raw Model Inference</span>
                    <span className="text-amber-300 font-semibold">Treated as Indication</span>
                  </div>
                  <div className="py-3 flex justify-between">
                    <span className="text-slate-400">Conservative Occupancy Margin</span>
                    <span className="text-emerald-400 font-semibold">+2 to +3 Trainee Allowance</span>
                  </div>
                  <div className="py-3 flex justify-between">
                    <span className="text-slate-400">Obstruction State</span>
                    <span className="text-sky-300 font-semibold">Flagged as Blocked (Not Missing)</span>
                  </div>
                  <div className="py-3 flex justify-between">
                    <span className="text-slate-400">Compliance Action</span>
                    <span className="text-emerald-400 font-semibold">Requires Signed Audit Note</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 bg-slate-900/60 p-3 rounded-xl border border-slate-700">
                  ⚠️ Note: Demonstration environment uses synthetic datasets matching Maharashtra vocational standards. No live CCTV streams or real student data are accessed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Impact and Measurement (Proposed Evaluation Metrics) */}
      <section id="impact" className="py-20 bg-white border-t border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-teal-800 mb-2">
              Benchmarking Framework
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink">
              Proposed Performance & Impact Metrics
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              Standardized key performance indicators designed for the Smart India Hackathon jury and state administrators to evaluate pilot deployment efficacy.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                metric: 'Discrepancy Resolution Time',
                benchmark: '< 24 Hours',
                hint: 'Target turnaround from automated alert to human officer sign-off.',
              },
              {
                metric: 'Equipment Detection Fidelity',
                benchmark: 'Multi-frame Verification',
                hint: 'Requiring 2 consecutive valid observation sweeps prevents transient misclassifications.',
              },
              {
                metric: 'Camera Telemetry Coverage',
                benchmark: '> 95% Uptime',
                hint: 'Guarantees reliable footage availability for scheduled batch time slots.',
              },
              {
                metric: 'Recurring Gap Mitigation',
                benchmark: 'Longitudinal Tracking',
                hint: 'Identifies systemic patterns across centres before subsidy disbursements.',
              },
            ].map((m) => (
              <div
                key={m.metric}
                className="rounded-2xl border border-slate-200 bg-[#F5F7F7] p-6 text-center"
              >
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Target Indicator
                </span>
                <p className="text-xl font-extrabold text-teal-800 mt-2">{m.benchmark}</p>
                <h4 className="text-sm font-bold text-ink mt-2">{m.metric}</h4>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">{m.hint}</p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-xs text-slate-400 max-w-2xl mx-auto">
            * The metrics above represent the evaluation criteria proposed for pilot validation under SIH 2026 guidelines.
          </p>
        </div>
      </section>

      {/* 8. Final CTA & Professional Footer */}
      <section className="py-20 bg-gradient-to-br from-teal-800 to-teal-950 text-white text-center">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-6">
          <span className="inline-block rounded-full bg-teal-700/60 px-4 py-1.5 text-xs font-bold text-teal-200">
            Smart India Hackathon 2026 Interactive Demonstration
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Ready to Experience the Drishti Monitoring System?
          </h2>
          <p className="text-base text-teal-100 max-w-2xl mx-auto leading-relaxed">
            Access the complete operational prototype with pre-loaded vocational centre data, attendance gap calculations, fixed-slot infrastructure checks, and reviewer workflows.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleLaunchDemo}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-sm font-bold text-teal-900 shadow-xl hover:bg-teal-50 transition"
            >
              Launch Operational Demo <ArrowRight size={16} />
            </button>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3.5 text-sm font-bold text-white hover:bg-white/10 transition"
            >
              Official Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-12 text-xs text-slate-500">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <p className="font-bold text-ink mb-3 text-sm">Platform</p>
              <ul className="space-y-2">
                <li><a href="#capabilities" className="hover:text-teal-800">Attendance Monitoring</a></li>
                <li><a href="#capabilities" className="hover:text-teal-800">Infrastructure Verification</a></li>
                <li><a href="#capabilities" className="hover:text-teal-800">Activity Telemetry</a></li>
                <li><a href="#capabilities" className="hover:text-teal-800">Hardware Telemetry</a></li>
              </ul>
            </div>
            <div>
              <p className="font-bold text-ink mb-3 text-sm">Governance</p>
              <ul className="space-y-2">
                <li><a href="#responsible-ai" className="hover:text-teal-800">Responsible AI Design</a></li>
                <li><a href="#responsible-ai" className="hover:text-teal-800">Privacy Safeguards</a></li>
                <li><a href="#impact" className="hover:text-teal-800">Evaluation Metrics</a></li>
              </ul>
            </div>
            <div>
              <p className="font-bold text-ink mb-3 text-sm">SIH 2026 Project</p>
              <ul className="space-y-2">
                <li><span>Problem Statement: 26245</span></li>
                <li><span>Category: Software / AI</span></li>
                <li><span>Focus: Skill Development</span></li>
              </ul>
            </div>
            <div>
              <p className="font-bold text-ink mb-3 text-sm">Access</p>
              <ul className="space-y-2">
                <li><Link to="/login" className="hover:text-teal-800 font-semibold">Demo Sign In</Link></li>
                <li><Link to="/dashboard" className="hover:text-teal-800 font-semibold">Direct Dashboard</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
            <p>© 2026 Drishti Monitoring Platform • Smart India Hackathon Submission.</p>
            <p className="max-w-md text-center sm:text-right">
              Disclaimer: Prototype presented for hackathon evaluation with synthetic demonstration data. Not an official endorsement by any state authority.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
