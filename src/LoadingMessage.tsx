import { useEffect, useRef } from 'react'
import { useLoadingMessage } from './useLoadingMessage'
import type { LoadingMessageProps } from './types'

/**
 * A component that displays delightful loading messages
 */
export function LoadingMessage({
  category,
  tone,
  safe = true,
  interval = 3000,
  showSpinner = true,
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

  const spinnerStyle: React.CSSProperties = {
    display: 'inline-block',
    width: '1em',
    height: '1em',
    border: '2px solid currentColor',
    borderRightColor: 'transparent',
    borderRadius: '50%',
    animation: 'flibbertigibbeting-spin 0.75s linear infinite',
    marginRight: '0.5em',
  }

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

  return (
    <>
      <style>
        {`@keyframes flibbertigibbeting-spin {
          to { transform: rotate(360deg); }
        }`}
      </style>
      <div style={containerStyle} className={className}>
        {showSpinner && <span style={spinnerStyle} aria-hidden="true" />}
        <span>{isLoading && !message ? 'Loading...' : message?.message}</span>
      </div>
    </>
  )
}
