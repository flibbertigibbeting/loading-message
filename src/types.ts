/**
 * A loading message returned from the API
 */
export interface Message {
  /** The loading message text */
  message: string
  /** Message category (e.g., "tech", "whimsical", "existential") */
  category: string
  /** Associated tags */
  tags: string[]
  /** Message tone/style (e.g., "cheeky", "dry", "nerdy") */
  tone: string
  /** Whether the message is safe for work */
  safe: boolean
}

/**
 * Options for the useLoadingMessage hook
 */
export interface UseLoadingMessageOptions {
  /** Filter messages by category */
  category?: string
  /** Filter messages by tone */
  tone?: string
  /** Only show SFW messages (default: true) */
  safe?: boolean
  /** Time between message changes in ms (default: 3000) */
  interval?: number
  /** If true, auto-refresh is disabled */
  manual?: boolean
}

import type { SpinnerType } from './spinners/types'

/**
 * Props for the LoadingMessage component
 */
export interface LoadingMessageProps {
  /** Custom messages to cycle through (overrides API fetch) */
  messages?: string[]
  /** Filter messages by category (ignored if messages provided) */
  category?: string
  /** Filter messages by tone (ignored if messages provided) */
  tone?: string
  /** Only show SFW messages (default: true, ignored if messages provided) */
  safe?: boolean
  /** Time between message changes in ms (default: 3000) */
  interval?: number
  /** Show animated spinner (default: true) */
  showSpinner?: boolean
  /** Spinner type (default: 'circle') */
  spinnerType?: SpinnerType
  /** Spinner size in pixels (default: matches text) */
  spinnerSize?: number
  /** Spinner color (default: 'currentColor') */
  spinnerColor?: string
  /** Spinner animation speed multiplier (default: 1) */
  spinnerSpeed?: number
  /** Custom CSS classes */
  className?: string
  /** Callback when message updates */
  onMessageChange?: (message: Message) => void
}
