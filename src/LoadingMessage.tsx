import { useEffect, useRef, useState } from 'react'
import { useLoadingMessage } from './useLoadingMessage'
import { Spinner } from './Spinner'
import type { LoadingMessageProps, Message } from './types'

/**
 * A component that displays delightful loading messages with customizable spinners
 * 
 * @example
 * ```tsx
 * // Using API messages
 * <LoadingMessage 
 *   category="tech" 
 *   spinnerType="dots-bounce" 
 *   spinnerColor="#3b82f6" 
 * />
 * 
 * // Using custom messages
 * <LoadingMessage 
 *   messages={['Loading...', 'Please wait...', 'Almost there...']}
 *   interval={2000}
 * />
 * ```
 */
export function LoadingMessage({
  messages: customMessages,
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
  // Use custom messages cycling if provided
  const [customIndex, setCustomIndex] = useState(0)
  
  useEffect(() => {
    if (!customMessages || customMessages.length === 0) return
    
    const timer = setInterval(() => {
      setCustomIndex((prev) => (prev + 1) % customMessages.length)
    }, interval)
    
    return () => clearInterval(timer)
  }, [customMessages, interval])
  
  // Use API hook only if no custom messages
  const { message: apiMessage, isLoading } = useLoadingMessage({
    category,
    tone,
    safe,
    interval,
    manual: !!customMessages, // Disable API fetch if using custom messages
  })

  const currentMessage = customMessages 
    ? customMessages[customIndex] 
    : apiMessage?.message

  const onMessageChangeRef = useRef(onMessageChange)
  onMessageChangeRef.current = onMessageChange

  useEffect(() => {
    if (currentMessage && onMessageChangeRef.current) {
      // Create a synthetic Message object for custom messages
      const msg: Message = customMessages 
        ? { message: currentMessage, category: 'custom', tags: [], tone: 'custom', safe: true }
        : apiMessage!
      onMessageChangeRef.current(msg)
    }
  }, [currentMessage, customMessages, apiMessage])

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
      <span>{isLoading && !currentMessage ? 'Loading...' : currentMessage}</span>
    </div>
  )
}
