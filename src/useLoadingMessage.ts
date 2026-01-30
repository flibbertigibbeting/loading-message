import { useState, useEffect, useCallback, useRef } from 'react'
import type { Message, UseLoadingMessageOptions } from './types'

const API_BASE = 'https://flibbertigibbeting.dev/api'

/**
 * Hook for fetching and managing loading messages
 */
export function useLoadingMessage(options: UseLoadingMessageOptions = {}) {
  const {
    category,
    tone,
    safe = true,
    interval = 3000,
    manual = false,
  } = options

  const [message, setMessage] = useState<Message | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const fetchMessage = useCallback(async () => {
    try {
      const params = new URLSearchParams()
      if (category) params.set('category', category)
      if (tone) params.set('tone', tone)
      if (!safe) params.set('safe', 'false')

      const url = `${API_BASE}/message${params.toString() ? `?${params}` : ''}`
      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data: Message = await response.json()
      setMessage(data)
      setError(null)
      return data
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch message')
      setError(error)
      return null
    } finally {
      setIsLoading(false)
    }
  }, [category, tone, safe])

  const refresh = useCallback(async () => {
    setIsLoading(true)
    return fetchMessage()
  }, [fetchMessage])

  // Initial fetch
  useEffect(() => {
    fetchMessage()
  }, [fetchMessage])

  // Auto-refresh interval
  useEffect(() => {
    if (manual || interval <= 0) return

    intervalRef.current = setInterval(() => {
      fetchMessage()
    }, interval)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [fetchMessage, interval, manual])

  return {
    message,
    isLoading,
    error,
    refresh,
  }
}
