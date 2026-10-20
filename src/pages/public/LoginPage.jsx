import React, { useState } from 'react'
import {
  Eye, EyeOff, ShieldCheck, ArrowRight, Lock, Mail, Users, Wrench, Activity,
  CheckCircle2, ArrowLeft, Info, Sparkles, Building2
} from 'lucide-react'
import { Link, useNavigate } from '../../router/Router'
import { useApp } from '../../context/AppContext'

export function LoginPage() {
  const navigate = useNavigate()
  const { login } = useApp()

  const [email, setEmail] = useState('officer.sih@drishti.gov.in')
  const [password, setPassword] = useState('Drishti2026!')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrorMessage('')

    if (!email.trim()) {
      setErrorMessage('Please enter your authorized monitoring email.')
      return
    }
    if (!password.trim()) {
      setErrorMessage('Please enter your password.')
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      login(email, password)
      setIsLoading(false)
      navigate('/dashboard')
    }, 600)
  }

  const handleFillDemoCredentials = () => {
    setEmail('officer.sih@drishti.gov.in')
    setPassword('Drishti2026!')
    setErrorMessage('')
  }

  return (
    <div className="min-h-screen bg-[#F5F7F7] flex flex-col justify-center">
      <div className="mx-auto w-full max-w-6xl p-4 sm:p-6 lg:p-8">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-teal-800 transition"
          >
            <ArrowLeft size={14} /> Back to Public Homepage
          </Link>
        </div>

        {/* Split Screen Container */}
        <div className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-2xl grid lg:grid-cols-12">
          {/* Left Panel: Enterprise Branding & Showcase */}
          <div className="lg:col-span-6 bg-gradient-to-br from-teal-800 via-teal-900 to-slate-900 p-8 sm:p-12 text-white flex flex-col justify-between">
            <div>
              {/* Branding */}
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white backdrop-blur-md ring-1 ring-white/20 shadow-md">
                  <Eye size={24} className="text-teal-300" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-extrabold tracking-tight text-white">Drishti</span>
                    <span className="rounded bg-teal-400/20 px-1.5 py-0.5 text-[10px] font-black text-teal-300 tracking-wider">
                      SIH 2026
                    </span>
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-teal-300/80">
                    AI Monitoring & Compliance
                  </p>
                </div>
              </div>

              {/* Welcome text */}
              <div className="mt-10 space-y-3">
                <span className="inline-block rounded-full bg-teal-500/20 border border-teal-400/30 px-3 py-1 text-xs font-bold text-teal-200">
                  Authorised Officer Portal
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                  State Training Centre Compliance Suite
                </h2>
                <p className="text-xs sm:text-sm text-teal-100/90 leading-relaxed max-w-md">
                  Unified AI monitoring system for the verification of candidate attendance, physical workshop machinery, and active practical sessions across vocational institutes.
                </p>
              </div>

              {/* 3 Core Capability Blocks */}
              <div className="mt-8 space-y-3">
                {[
                  {
                    title: 'Automated Attendance Reconciliation',
                    desc: 'Conservative classroom occupancy analysis against authorized muster records.',
                    icon: Users,
                  },
                  {
                    title: 'Fixed Equipment Verification',
                    desc: 'Multi-frame visual confirmation for registered machine slots.',
                    icon: Wrench,
                  },
                  {
                    title: 'Practical Activity Tracking',
                    desc: 'Motion density monitoring during scheduled hands-on lab sessions.',
                    icon: Activity,
                  },
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <div
                      key={item.title}
                      className="flex items-start gap-3 rounded-xl bg-white/5 border border-white/10 p-3 backdrop-blur-xs"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-500/20 text-teal-300 shrink-0">
                        <Icon size={16} />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white">{item.title}</h4>
                        <p className="text-[11px] text-teal-200/70 mt-0.5 leading-snug">{item.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Privacy Footer */}
            <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-2 text-[11px] text-teal-200/70">
              <ShieldCheck size={14} className="text-teal-300 shrink-0" />
              <span>Zero facial recognition • Synthetic evaluation dataset pre-loaded</span>
            </div>
          </div>

          {/* Right Panel: Login Form */}
          <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between bg-white">
            <div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-ink">Sign In to Dashboard</h3>
                <p className="text-xs text-slate-500">
                  Enter your credentials to access the monitoring suite.
                </p>
              </div>

              {/* Demo Mode Notice with One-Click Autofill */}
              <div className="mt-5 rounded-2xl border border-teal-200 bg-teal-50/70 p-4 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-teal-900 font-bold text-xs">
                    <Sparkles size={14} className="text-teal-700" />
                    <span>SIH 2026 Evaluation Demo</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleFillDemoCredentials}
                    className="rounded-lg bg-teal-800 px-2.5 py-1 text-[11px] font-bold text-white hover:bg-teal-900 transition shadow-xs"
                  >
                    Autofill Credentials
                  </button>
                </div>
                <p className="text-[11px] text-teal-900/80 leading-relaxed">
                  Frontend demonstration environment. Click "Autofill Credentials" to quickly inspect the platform with full administrative review privileges.
                </p>
              </div>

              {/* Error Message if any */}
              {errorMessage && (
                <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-semibold text-rose-800">
                  {errorMessage}
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Monitoring Officer Email
                  </label>
                  <div className="relative">
                    <Mail
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. officer@drishti.gov.in"
                      className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-xs sm:text-sm font-medium text-ink outline-none focus:border-teal-700 focus:ring-1 focus:ring-teal-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <Lock
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter account password"
                      className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-10 text-xs sm:text-sm font-medium text-ink outline-none focus:border-teal-700 focus:ring-1 focus:ring-teal-700"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-300 text-teal-800 focus:ring-teal-700 accent-teal-800"
                    />
                    <span>Remember this session</span>
                  </label>
                  <span className="text-slate-400 hover:text-slate-600 cursor-pointer">
                    Forgot password?
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-teal-800 py-3 text-xs sm:text-sm font-bold text-white shadow-card hover:bg-teal-900 transition disabled:opacity-75"
                >
                  {isLoading ? (
                    <span>Verifying Credentials...</span>
                  ) : (
                    <>
                      <span>Enter Monitoring Console</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Bottom Demo Clarification */}
            <div className="mt-8 pt-6 border-t border-slate-100 text-center">
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Demo authentication simulates role-based state security. In production deployments, authentication links to OpenID / State SSO gateways.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
