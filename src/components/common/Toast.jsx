import React, { useEffect } from 'react'
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react'

export function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => {
      onClose()
    }, 4000)
    return () => clearTimeout(timer)
  }, [toast, onClose])

  if (!toast) return null

  const icons = {
    success: <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />,
    warning: <AlertCircle size={18} className="text-amber-400 shrink-0" />,
    info: <Info size={18} className="text-sky-400 shrink-0" />,
  }

  return (
    <div
      role="status"
      className="fixed bottom-6 right-6 z-[70] flex max-w-md items-center gap-3 rounded-2xl bg-[#172B2B] px-4 py-3.5 text-sm font-medium text-white shadow-2xl ring-1 ring-white/10 animate-fade-in"
    >
      {icons[toast.type] || icons.success}
      <span className="flex-1 leading-snug">{toast.message}</span>
      <button
        onClick={onClose}
        className="ml-2 rounded-lg p-1 text-slate-400 hover:text-white hover:bg-white/10 transition"
        aria-label="Dismiss toast"
      >
        <X size={15} />
      </button>
    </div>
  )
}
