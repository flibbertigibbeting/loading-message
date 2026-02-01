import { useEffect, useRef } from 'react'
import { useLoadingMessage } from './useLoadingMessage'
import { Spinner } from './Spinner'
import type { LoadingMessageProps } from './types'

/**
 * A component that displays delightful loading messages with customizable spinners
 * 
 * @example
 * ```tsx
 * <LoadingMessage 
 *   category="tech" 
 *   spinnerType="dots-bounce" 
 *   spinnerColor="#3b82f6" 
 * />
 * ```
 */
export function LoadingMessage({
  category,
  tone,
  safe = true,
  interval = 3000,
  showSpinner = true,
  spinnerType = 'circle',
  spinnerSize,
  spinnerColor = 'currentColor',
  spinnerSpeed = 1,
  className = '',
  onMessageChange,
}: LoadingMessageProps) {
  const { message, isLoading } = useLoadingMessage({
    category,
    tone,
    safe,
    interval,
  })

  const onMessageChangeRef = useRef(onMessageChange)
  onMessageChangeRef.current = onMessageChange

  useEffect(() => {
    if (message && onMessageChangeRef.current) {
      onMessageChangeRef.current(message)
    }
  }, [message])

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5em',
  }

  return (
    <div style={containerStyle} className={className}>
      {showSpinner && (
        <Spinner
          type={spinnerType}
          size={spinnerSize ?? 20}
          color={spinnerColor}
          speed={spinnerSpeed}
        />
      )}
      <span>{isLoading && !message ? 'Loading...' : message?.message}</span>
    </div>
  )
}
