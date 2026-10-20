import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

const RouterContext = createContext(null)

export function RouterProvider({ children }) {
  const [currentPath, setCurrentPath] = useState(() => {
    return window.location.pathname || '/'
  })

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/')
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigate = useCallback((to, options = {}) => {
    if (to === currentPath && !options.replace) return
    if (options.replace) {
      window.history.replaceState({}, '', to)
    } else {
      window.history.pushState({}, '', to)
    }
    setCurrentPath(to)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentPath])

  const value = {
    pathname: currentPath,
    navigate,
  }

  return (
    <RouterContext.Provider value={value}>
      {children}
    </RouterContext.Provider>
  )
}

export function useRouter() {
  const context = useContext(RouterContext)
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider')
  }
  return context
}

export function useLocation() {
  const { pathname } = useRouter()
  return { pathname }
}

export function useNavigate() {
  const { navigate } = useRouter()
  return navigate
}

export function Link({ to, children, className = '', onClick, ...props }) {
  const { navigate, pathname } = useRouter()
  const handleClick = (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    e.preventDefault()
    if (onClick) onClick(e)
    navigate(to)
  }

  const isCurrent = pathname === to

  return (
    <a
      href={to}
      onClick={handleClick}
      className={className}
      aria-current={isCurrent ? 'page' : undefined}
      {...props}
    >
      {children}
    </a>
  )
}
