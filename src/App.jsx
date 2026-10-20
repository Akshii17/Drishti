import React from 'react'
import { RouterProvider, useLocation } from './router/Router'
import { AppProvider, useApp } from './context/AppContext'
import { HomePage } from './pages/public/HomePage'
import { LoginPage } from './pages/public/LoginPage'
import { DashboardLayout } from './components/layout/DashboardLayout'
import { OverviewPage } from './pages/dashboard/OverviewPage'
import { CentresPage } from './pages/dashboard/CentresPage'
import { AttendancePage } from './pages/dashboard/AttendancePage'
import { InfrastructurePage } from './pages/dashboard/InfrastructurePage'
import { ActivityPage } from './pages/dashboard/ActivityPage'
import { AlertsPage } from './pages/dashboard/AlertsPage'
import { CamerasPage } from './pages/dashboard/CamerasPage'
import { ReportsPage } from './pages/dashboard/ReportsPage'
import { IntelligencePage } from './pages/dashboard/IntelligencePage'
import { SettingsPage } from './pages/dashboard/SettingsPage'
import { EmptyState } from './components/common/EmptyState'

function AppRoutes() {
  const { pathname } = useLocation()
  const { isAuthenticated } = useApp()

  // 1. Public Homepage
  if (pathname === '/' || pathname === '') {
    return <HomePage />
  }

  // 2. Login Page
  if (pathname === '/login') {
    return <LoginPage />
  }

  // Protected Dashboard Routes Guard
  // In demo mode: If not authenticated and visiting /dashboard, show login
  if (!isAuthenticated && pathname.startsWith('/dashboard')) {
    return <LoginPage />
  }

  // 3. One Unified Monitoring Dashboard Shell
  return (
    <DashboardLayout>
      {(() => {
        switch (pathname) {
          case '/dashboard':
            return <OverviewPage />
          case '/dashboard/centres':
            return <CentresPage />
          case '/dashboard/attendance':
            return <AttendancePage />
          case '/dashboard/infrastructure':
            return <InfrastructurePage />
          case '/dashboard/activity':
            return <ActivityPage />
          case '/dashboard/alerts':
            return <AlertsPage />
          case '/dashboard/cameras':
            return <CamerasPage />
          case '/dashboard/reports':
            return <ReportsPage />
          case '/dashboard/intelligence':
            return <IntelligencePage />
          case '/dashboard/settings':
            return <SettingsPage />
          default:
            return (
              <EmptyState
                title="Page not found"
                description={`The requested route "${pathname}" does not exist in the Drishti monitoring console.`}
              />
            )
        }
      })()}
    </DashboardLayout>
  )
}

export default function App() {
  return (
    <RouterProvider>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </RouterProvider>
  )
}
