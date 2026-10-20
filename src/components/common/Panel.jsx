import React from 'react'

export function Panel({ children, className = '', id, ...props }) {
  return (
    <section
      id={id}
      className={`rounded-2xl border border-slate-200/90 bg-white shadow-soft transition-all ${className}`}
      {...props}
    >
      {children}
    </section>
  )
}

export function SectionHeading({ eyebrow, title, subtitle, action, className = '' }) {
  return (
    <div className={`flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between mb-6 ${className}`}>
      <div>
        {eyebrow && (
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-teal-700 mb-1">
            {eyebrow}
          </p>
        )}
        <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1 text-sm text-slate-500 max-w-3xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
