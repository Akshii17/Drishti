import React from 'react'

export function Badge({ children, tone = 'slate', dot = false, size = 'sm', className = '' }) {
  const tones = {
    emerald: 'bg-emerald-50 text-emerald-800 ring-emerald-200/80 border-emerald-200',
    green: 'bg-emerald-50 text-emerald-800 ring-emerald-200/80 border-emerald-200',
    amber: 'bg-amber-50 text-amber-800 ring-amber-200/80 border-amber-200',
    yellow: 'bg-amber-50 text-amber-800 ring-amber-200/80 border-amber-200',
    rose: 'bg-rose-50 text-rose-800 ring-rose-200/80 border-rose-200',
    red: 'bg-rose-50 text-rose-800 ring-rose-200/80 border-rose-200',
    sky: 'bg-sky-50 text-sky-800 ring-sky-200/80 border-sky-200',
    blue: 'bg-sky-50 text-sky-800 ring-sky-200/80 border-sky-200',
    teal: 'bg-teal-50 text-teal-800 ring-teal-200/80 border-teal-200',
    slate: 'bg-slate-100 text-slate-700 ring-slate-200/80 border-slate-200',
  }

  const sizes = {
    xs: 'px-2 py-0.5 text-[10px]',
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
  }

  const dotTones = {
    emerald: 'bg-emerald-500',
    green: 'bg-emerald-500',
    amber: 'bg-amber-500',
    yellow: 'bg-amber-500',
    rose: 'bg-rose-500',
    red: 'bg-rose-500',
    sky: 'bg-sky-500',
    blue: 'bg-sky-500',
    teal: 'bg-teal-600',
    slate: 'bg-slate-500',
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full ring-1 ring-inset ${
        tones[tone] || tones.slate
      } ${sizes[size] || sizes.sm} ${className}`}
    >
      {dot && <span className={`h-1.5 w-1.5 rounded-full ${dotTones[tone] || 'bg-current'}`} />}
      {children}
    </span>
  )
}

export function toneForStatus(status) {
  if (!status) return 'slate'
  const s = status.toLowerCase()
  if (['healthy', 'seen', 'resolved', 'confirmed', 'normal', 'online', 'completed', 'eligible'].some(k => s.includes(k))) {
    return 'green'
  }
  if (['blocked', 'pending', 'review', 'recheck', 'not seen', 'restricted', 'in progress', 'partial', 'medium'].some(k => s.includes(k))) {
    return 'yellow'
  }
  if (['camera issue', 'unavailable', 'overdue', 'high', 'critical', 'offline', 'ineligible'].some(k => s.includes(k))) {
    return 'red'
  }
  if (['unable', 'technical', 'model_not_validated', 'scheduled', 'low'].some(k => s.includes(k))) {
    return 'blue'
  }
  return 'slate'
}
