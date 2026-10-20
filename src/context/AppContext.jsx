import React, { createContext, useContext, useState, useEffect } from 'react'
import {
  initialCentres,
  initialAlerts,
  equipmentData,
  activityWorkstations,
  camerasList,
  initialCorrectiveActions,
  historicalIntelligencePatterns,
} from '../data/mockData'

const AppContext = createContext(null)

const AUTH_STORAGE_KEY = 'drishti_auth_session'
const SETTINGS_STORAGE_KEY = 'drishti_app_settings'

export function AppProvider({ children }) {
  // Demo Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY)
      return stored === 'true'
    } catch {
      return false
    }
  })

  const [currentUser, setCurrentUser] = useState({
    name: 'Admin Officer (AO)',
    role: 'State Monitoring Officer',
    department: 'Directorate of Vocational Education & Training, Maharashtra',
    email: 'officer.sih@drishti.gov.in',
    avatarInitials: 'AO',
  })

  // Global filters
  const [selectedCentreId, setSelectedCentreId] = useState('ALL')
  const [dateRange, setDateRange] = useState('Today (18 Oct 2026)')
  const [globalSearch, setGlobalSearch] = useState('')

  // Core mutable datasets
  const [centres, setCentres] = useState(initialCentres)
  const [alerts, setAlerts] = useState(initialAlerts)
  const [equipment, setEquipment] = useState(equipmentData)
  const [activityStations, setActivityStations] = useState(activityWorkstations)
  const [cameras, setCameras] = useState(camerasList)
  const [correctiveActions, setCorrectiveActions] = useState(initialCorrectiveActions)
  const [intelligencePatterns] = useState(historicalIntelligencePatterns)

  // Modals & Drawers
  const [selectedAlert, setSelectedAlert] = useState(null)
  const [selectedCentreDetail, setSelectedCentreDetail] = useState(null)
  const [evidenceViewer, setEvidenceViewer] = useState(null) // { title, type, frame, details, metadata }
  const [toast, setToast] = useState(null) // { message, type: 'success' | 'info' | 'warning' }

  // Settings
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_STORAGE_KEY)
      if (saved) return JSON.parse(saved)
    } catch {}
    return {
      attendanceTolerance: '1',
      activityThreshold: '35',
      consecutiveMissCount: '2',
      notifyEmail: true,
      notifySMS: false,
      notifyWhatsApp: true,
      autoRefreshInterval: '30',
      privacyBlurFaces: true,
      evidenceRetentionDays: '90',
    }
  })

  // Toast Helper
  const showToast = (message, type = 'success') => {
    setToast({ id: Date.now(), message, type })
  }

  const hideToast = () => {
    setToast(null)
  }

  // Auth actions
  const login = (email, password) => {
    // Demonstration frontend login
    setIsAuthenticated(true)
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, 'true')
    } catch {}
    showToast('Signed in successfully as Demo Monitoring Officer', 'success')
    return true
  }

  const logout = () => {
    setIsAuthenticated(false)
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY)
    } catch {}
    showToast('Signed out of Drishti Monitoring System', 'info')
  }

  // Alert Actions
  const updateAlert = (alertId, updates) => {
    setAlerts((prev) =>
      prev.map((item) => {
        if (item.id === alertId) {
          return { ...item, ...updates }
        }
        return item
      })
    )

    // Update centre open alert counts dynamically
    const targetAlert = alerts.find((a) => a.id === alertId)
    if (targetAlert && (updates.status === 'Resolved' || updates.status === 'Dismissed')) {
      setCentres((prevCentres) =>
        prevCentres.map((c) => {
          if (c.id === targetAlert.centreId) {
            const remaining = alerts.filter(
              (a) => a.centreId === c.id && a.id !== alertId && !['Resolved', 'Dismissed'].includes(a.status)
            ).length
            return {
              ...c,
              alerts: Math.max(0, remaining),
              status: remaining === 0 ? 'Healthy' : c.status,
            }
          }
          return c
        })
      )
    }

    if (selectedAlert && selectedAlert.id === alertId) {
      setSelectedAlert((prev) => ({ ...prev, ...updates }))
    }

    showToast(`Alert ${alertId} updated: ${updates.status || 'Updated'}`, 'success')
  }

  // Corrective Action lifecycle
  const createCorrectiveAction = (actionData) => {
    const newId = `CA-${Math.floor(100 + Math.random() * 900)}`
    const newAction = {
      id: newId,
      alertId: actionData.alertId || null,
      centreId: actionData.centreId,
      centreName: actionData.centreName,
      room: actionData.room || 'General Room',
      title: actionData.title,
      assignedTo: actionData.assignedTo || 'Centre Coordinator',
      dueDate: actionData.dueDate || '2026-10-25',
      priority: actionData.priority || 'Medium',
      status: 'Open',
      createdDate: '18 Oct 2026',
      notes: actionData.notes || 'Created via Drishti Review Portal',
    }

    setCorrectiveActions((prev) => [newAction, ...prev])

    // If linked to an alert, update alert
    if (actionData.alertId) {
      updateAlert(actionData.alertId, {
        status: 'Under review',
        assignedTo: newAction.assignedTo,
        dueDate: newAction.dueDate,
        reviewerNotes: `Action ${newId} created: ${newAction.title}`,
      })
    }

    showToast(`Corrective Action ${newId} created and assigned`, 'success')
    return newAction
  }

  const completeCorrectiveAction = (actionId, note) => {
    setCorrectiveActions((prev) =>
      prev.map((act) => {
        if (act.id === actionId) {
          return {
            ...act,
            status: 'Completed',
            notes: note ? `${act.notes} | Resolved: ${note}` : act.notes,
          }
        }
        return act
      })
    )
    showToast(`Action ${actionId} marked completed`, 'success')
  }

  // Update Settings
  const updateSettings = (newSettings) => {
    setSettings(newSettings)
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(newSettings))
    } catch {}
    showToast('Monitoring configuration saved', 'success')
  }

  // Demo Reset
  const resetDemoData = () => {
    setCentres(initialCentres)
    setAlerts(initialAlerts)
    setEquipment(equipmentData)
    setActivityStations(activityWorkstations)
    setCameras(camerasList)
    setCorrectiveActions(initialCorrectiveActions)
    setSelectedCentreId('ALL')
    setSelectedAlert(null)
    setSelectedCentreDetail(null)
    setEvidenceViewer(null)
    showToast('Demo data restored to initial benchmark state', 'info')
  }

  // Export current data to CSV
  const exportToCSV = (data, filename = 'drishti_export.csv') => {
    if (!data || !data.length) {
      showToast('No data available to export', 'warning')
      return
    }

    const headers = Object.keys(data[0])
    const csvRows = []
    csvRows.push(headers.join(','))

    data.forEach((row) => {
      const values = headers.map((header) => {
        const val = row[header]
        if (val === null || val === undefined) return '""'
        const escaped = ('' + val).replace(/"/g, '""')
        return `"${escaped}"`
      })
      csvRows.push(values.join(','))
    })

    const csvString = csvRows.join('\n')
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', filename)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    showToast(`Exported ${data.length} records to ${filename}`, 'success')
  }

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        currentUser,
        selectedCentreId,
        setSelectedCentreId,
        dateRange,
        setDateRange,
        globalSearch,
        setGlobalSearch,
        centres,
        alerts,
        updateAlert,
        equipment,
        setEquipment,
        activityStations,
        cameras,
        correctiveActions,
        createCorrectiveAction,
        completeCorrectiveAction,
        intelligencePatterns,
        settings,
        updateSettings,
        resetDemoData,
        exportToCSV,
        selectedAlert,
        setSelectedAlert,
        selectedCentreDetail,
        setSelectedCentreDetail,
        evidenceViewer,
        setEvidenceViewer,
        toast,
        showToast,
        hideToast,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}
