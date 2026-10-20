import React, { useState } from 'react'
import { Sidebar } from './Sidebar'
import { TopNavigation } from './TopNavigation'
import { AlertDrawer } from '../common/AlertDrawer'
import { CentreDetailDrawer } from '../common/CentreDetailDrawer'
import { EvidenceViewer } from '../common/EvidenceViewer'
import { Toast } from '../common/Toast'
import { useApp } from '../../context/AppContext'
import { ShieldCheck, Info } from 'lucide-react'

export function DashboardLayout({ children }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const {
    selectedAlert,
    setSelectedAlert,
    selectedCentreDetail,
    setSelectedCentreDetail,
    evidenceViewer,
    setEvidenceViewer,
    toast,
    hideToast,
  } = useApp()

  return (
    <div className="min-h-screen bg-[#F5F7F7] text-ink antialiased">
      {/* Sidebar */}
      <Sidebar
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex flex-col min-h-screen transition-all duration-200 lg:pl-64">
        {/* Top Navbar */}
        <TopNavigation onOpenMobile={() => setMobileSidebarOpen(true)} />

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1600px] w-full mx-auto">
          {children}
        </main>

        {/* Global Dashboard Footer */}
        <footer className="border-t border-slate-200/90 bg-white/50 px-6 py-4 text-xs text-slate-500">
          <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="font-bold text-ink">Drishti Platform</span>
              <span className="text-slate-300">•</span>
              <span>Smart India Hackathon 2026 (Problem Statement 26245)</span>
            </div>
            <div className="flex items-center gap-4 text-slate-400">
              <span className="flex items-center gap-1.5 text-teal-800 font-medium">
                <ShieldCheck size={14} /> Human-in-the-loop Governance
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Info size={14} /> Synthetic Demonstration Mode
              </span>
            </div>
          </div>
        </footer>
      </div>

      {/* Global Modals & Drawers */}
      {selectedAlert && (
        <AlertDrawer
          alert={selectedAlert}
          onClose={() => setSelectedAlert(null)}
        />
      )}

      {selectedCentreDetail && (
        <CentreDetailDrawer
          centre={selectedCentreDetail}
          onClose={() => setSelectedCentreDetail(null)}
        />
      )}

      {evidenceViewer && (
        <EvidenceViewer
          evidence={evidenceViewer}
          onClose={() => setEvidenceViewer(null)}
        />
      )}

      <Toast toast={toast} onClose={hideToast} />
    </div>
  )
}
