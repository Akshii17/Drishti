import React from 'react'
import { ClipboardCheck } from 'lucide-react'

export function EmptyState({
  title = 'No records found',
  description = 'Try adjusting your search criteria or active filters.',
  icon: Icon = ClipboardCheck,
  action,
}) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-teal-800 border border-teal-100 shadow-sm">
        <Icon size={24} />
      </span>
      <h3 className="mt-4 text-base font-bold text-ink">{title}</h3>
      <p className="mt-1.5 max-w-sm text-sm text-slate-500 leading-relaxed">
        {description}
      </p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}
