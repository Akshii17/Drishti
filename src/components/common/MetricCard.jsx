import React from 'react'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { Panel } from './Panel'

export function MetricCard({
  label,
  value,
  hint,
  icon: Icon,
  tone = 'teal',
  trend,
  trendDirection = 'neutral',
  onClick,
}) {
  const tones = {
    teal: 'bg-teal-50 text-teal-800 border-teal-100',
    blue: 'bg-sky-50 text-sky-800 border-sky-100',
    yellow: 'bg-amber-50 text-amber-800 border-amber-100',
    red: 'bg-rose-50 text-rose-800 border-rose-100',
    green: 'bg-emerald-50 text-emerald-800 border-emerald-100',
    slate: 'bg-slate-100 text-slate-700 border-slate-200',
  }

  return (
    <Panel
      className={`p-5 transition duration-200 ${
        onClick
          ? 'cursor-pointer hover:-translate-y-1 hover:shadow-card hover:border-teal-300 ring-offset-2'
          : 'hover:shadow-soft'
      }`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">{label}</p>
          <p className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-ink">
            {value}
          </p>
        </div>
        {Icon && (
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${
              tones[tone] || tones.teal
            }`}
          >
            <Icon size={20} strokeWidth={2.2} />
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between gap-2 border-t border-slate-100 pt-3 text-xs">
        <span className="truncate text-slate-500 font-medium">{hint}</span>
        {trend && (
          <span
            className={`inline-flex shrink-0 items-center gap-0.5 font-semibold ${
              trendDirection === 'up' || trend.startsWith('+')
                ? 'text-emerald-700'
                : trendDirection === 'down' || trend.startsWith('-')
                ? 'text-rose-700'
                : 'text-slate-600'
            }`}
          >
            {trend.startsWith('+') ? (
              <ArrowUpRight size={13} strokeWidth={2.5} />
            ) : trend.startsWith('-') ? (
              <ArrowDownRight size={13} strokeWidth={2.5} />
            ) : null}
            {trend}
          </span>
        )}
      </div>
    </Panel>
  )
}
