import React, { useState, useEffect, useCallback } from 'react'
import { Spinner } from './Spinner'
import type { SpinnerType } from './spinners/types'

export interface AdaptiveLoaderProps {
  /** Content to show when not loading */
  children?: React.ReactNode
  /** Whether currently loading */
  isLoading?: boolean
  /** Milliseconds before showing extended UI for slow connections */
  slowThreshold?: number
  /** Show progress indicator for slow connections */
  showProgress?: boolean
  /** Messages to cycle through for slow connections */
  slowMessages?: string[]
  /** Message cycle interval in ms */
  messageInterval?: number
  /** Spinner type for fast connections */
  fastSpinnerType?: SpinnerType
  /** Spinner type for slow connections */
  slowSpinnerType?: SpinnerType
  /** Spinner size */
  spinnerSize?: number
  /** Spinner color */
  spinnerColor?: string
  /** Custom className */
  className?: string
  /** Callback when connection type changes */
  onConnectionChange?: (type: ConnectionType) => void
  /** Fallback content for offline state */
  offlineFallback?: React.ReactNode
  /** Accessible label */
  label?: string
}

export type ConnectionType = 'fast' | 'slow' | 'offline' | 'unknown'

interface NetworkInformation {
  effectiveType?: '4g' | '3g' | '2g' | 'slow-2g'
  downlink?: number
  rtt?: number
  saveData?: boolean
  addEventListener?: (type: string, listener: () => void) => void
  removeEventListener?: (type: string, listener: () => void) => void
}

declare global {
  interface Navigator {
    connection?: NetworkInformation
    mozConnection?: NetworkInformation
    webkitConnection?: NetworkInformation
  }
}

/**
 * Hook to detect connection quality
 */
export function useConnectionType(): ConnectionType {
  const [connectionType, setConnectionType] = useState<ConnectionType>('unknown')

  useEffect(() => {
    const getConnectionType = (): ConnectionType => {
      // Check if offline
      if (typeof navigator !== 'undefined' && !navigator.onLine) {
        return 'offline'
      }

      // Get network information
      const connection = 
        navigator?.connection || 
        navigator?.mozConnection || 
        navigator?.webkitConnection

      if (!connection) {
        return 'unknown'
      }

      // Check for data saver mode
      if (connection.saveData) {
        return 'slow'
      }

      // Check effective connection type
      const effectiveType = connection.effectiveType
      if (effectiveType === 'slow-2g' || effectiveType === '2g') {
        return 'slow'
      }
      if (effectiveType === '3g') {
        // 3G can be borderline, check RTT if available
        if (connection.rtt && connection.rtt > 500) {
          return 'slow'
        }
        return 'fast'
      }
      if (effectiveType === '4g') {
        return 'fast'
      }

      // Fallback: check downlink speed
      if (connection.downlink !== undefined) {
        // Less than 1 Mbps is considered slow
        return connection.downlink < 1 ? 'slow' : 'fast'
      }

      return 'unknown'
    }

    // Initial check
    setConnectionType(getConnectionType())

    // Listen for online/offline events
    const handleOnline = () => setConnectionType(getConnectionType())
    const handleOffline = () => setConnectionType('offline')

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Listen for connection changes
    const connection = 
      navigator?.connection || 
      navigator?.mozConnection || 
      navigator?.webkitConnection

    const handleConnectionChange = () => setConnectionType(getConnectionType())
    
    if (connection?.addEventListener) {
      connection.addEventListener('change', handleConnectionChange)
    }

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
      if (connection?.removeEventListener) {
        connection.removeEventListener('change', handleConnectionChange)
      }
    }
  }, [])

  return connectionType
}

/**
 * Hook to detect reduced motion preference
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
    }

    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  return prefersReducedMotion
}

/**
 * Simple hook for cycling through messages locally
 */
function useMessageCycler(messages: string[], interval: number, isActive: boolean) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!isActive || messages.length === 0) {
      setIndex(0)
      return
    }

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length)
    }, interval)

    return () => clearInterval(timer)
  }, [messages, interval, isActive])

  return messages[index] || messages[0]
}

/**
 * Adaptive loading component that adjusts UI based on connection speed
 */
export function AdaptiveLoader({
  children,
  isLoading = true,
  slowThreshold = 500,
  showProgress = true,
  slowMessages = [
    'Loading...',
    'Still working on it...',
    'Taking a bit longer than usual...',
    'Almost there...',
  ],
  messageInterval = 3000,
  fastSpinnerType = 'circle',
  slowSpinnerType = 'dots-bounce',
  spinnerSize = 32,
  spinnerColor,
  className,
  onConnectionChange,
  offlineFallback,
  label = 'Loading content',
}: AdaptiveLoaderProps) {
  const connectionType = useConnectionType()
  const prefersReducedMotion = usePrefersReducedMotion()
  const [showExtendedUI, setShowExtendedUI] = useState(false)
  const [loadingDuration, setLoadingDuration] = useState(0)

  // Track loading duration
  useEffect(() => {
    if (!isLoading) {
      setShowExtendedUI(false)
      setLoadingDuration(0)
      return
    }

    const startTime = Date.now()
    const interval = setInterval(() => {
      const duration = Date.now() - startTime
      setLoadingDuration(duration)
      
      if (duration >= slowThreshold && !showExtendedUI) {
        setShowExtendedUI(true)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [isLoading, slowThreshold, showExtendedUI])

  // Notify parent of connection changes
  useEffect(() => {
    onConnectionChange?.(connectionType)
  }, [connectionType, onConnectionChange])

  // Determine if we should show slow UI
  const isSlow = connectionType === 'slow' || showExtendedUI

  // Cycle messages for slow UI
  const currentMessage = useMessageCycler(slowMessages, messageInterval, isLoading && isSlow && showProgress)

  // Not loading - show children
  if (!isLoading) {
    return <>{children}</>
  }

  // Offline state
  if (connectionType === 'offline') {
    return (
      <div className={className} role="alert" aria-live="assertive">
        {offlineFallback || (
          <div style={{ textAlign: 'center', padding: '1rem' }}>
            <p style={{ marginBottom: '0.5rem' }}>You appear to be offline</p>
            <button 
              onClick={() => window.location.reload()}
              style={{
                padding: '0.5rem 1rem',
                cursor: 'pointer',
              }}
            >
              Retry
            </button>
          </div>
        )}
      </div>
    )
  }

  // Reduced motion - show simple text
  if (prefersReducedMotion) {
    return (
      <div 
        className={className} 
        role="status" 
        aria-live="polite"
        aria-label={label}
      >
        <p>Loading...</p>
      </div>
    )
  }

  // Slow connection or extended loading time
  if (isSlow && showProgress) {
    return (
      <div 
        className={className} 
        role="status" 
        aria-live="polite"
        aria-label={label}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
      >
        <Spinner 
          type={slowSpinnerType} 
          size={spinnerSize} 
          color={spinnerColor}
        />
        <p style={{ margin: 0 }}>{currentMessage}</p>
        {loadingDuration > 5000 && (
          <p style={{ 
            fontSize: '0.875rem', 
            opacity: 0.7, 
            margin: 0 
          }}>
            This is taking longer than expected...
          </p>
        )}
      </div>
    )
  }

  // Fast connection - simple spinner
  return (
    <div 
      className={className} 
      role="status" 
      aria-live="polite"
      aria-label={label}
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Spinner 
        type={fastSpinnerType} 
        size={spinnerSize} 
        color={spinnerColor}
        label={label}
      />
    </div>
  )
}
