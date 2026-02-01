# Claude Instructions for @flibbertigibbeting/loading-message

This file helps Claude (and Claude-based tools) understand how to use this library.

## Overview

`@flibbertigibbeting/loading-message` provides React components for loading states:
- `Spinner` — 50+ animated spinner styles
- `LoadingMessage` — Cycling messages with optional spinner
- `useLoadingMessage` — Hook for custom implementations

## Installation

```bash
npm install @flibbertigibbeting/loading-message
```

## Usage Patterns

### Pattern 1: Simple Spinner
For quick async operations (button clicks, form submits):

```tsx
import { Spinner } from '@flibbertigibbeting/loading-message'

function SubmitButton({ isLoading, onClick }) {
  return (
    <button onClick={onClick} disabled={isLoading}>
      {isLoading ? <Spinner type="dots-bounce" size={16} /> : 'Submit'}
    </button>
  )
}
```

### Pattern 2: Loading Messages
For longer operations (API calls, file processing):

```tsx
import { LoadingMessage } from '@flibbertigibbeting/loading-message'

function DataLoader({ isLoading, children }) {
  if (isLoading) {
    return (
      <LoadingMessage
        messages={[
          "Fetching data...",
          "Processing...",
          "Almost there..."
        ]}
        interval={2000}
        spinnerType="circle"
      />
    )
  }
  return children
}
```

### Pattern 3: Custom Hook
For fine-grained control:

```tsx
import { useLoadingMessage } from '@flibbertigibbeting/loading-message'

function StepProgress() {
  const { message, index, isComplete, reset } = useLoadingMessage({
    messages: ["Step 1: Validating...", "Step 2: Uploading...", "Step 3: Done!"],
    interval: 1500,
    loop: false
  })

  return (
    <div>
      <p>{message}</p>
      <progress value={index + 1} max={3} />
      {isComplete && <button onClick={reset}>Start Over</button>}
    </div>
  )
}
```

## Spinner Selection Guide

| Use Case | Recommended Types |
|----------|-------------------|
| Professional/Minimal | `circle`, `dots-fade`, `bars` |
| Playful/Fun | `dots-bounce`, `pacman`, `orbit` |
| Progress indication | `progress-bar`, `meter`, `ring-resize` |
| Tech/Developer | `circle-notch`, `dual-ring`, `cube` |

## Key Props

### Spinner
- `type`: SpinnerType (default: 'circle')
- `size`: number in pixels (default: 40)
- `color`: CSS color (default: 'currentColor')
- `speed`: number multiplier (default: 1)
- `label`: string for accessibility

### LoadingMessage
- `messages`: string[] — messages to cycle
- `interval`: number — ms between messages (default: 3000)
- `spinnerType`: SpinnerType
- `showSpinner`: boolean (default: true)

## Accessibility

All components are accessible by default:
- Uses `aria-live="polite"` for screen readers
- Respects `prefers-reduced-motion`
- Customizable labels via `label` prop

## TypeScript

```tsx
import type { SpinnerType, SpinnerProps, LoadingMessageProps } from '@flibbertigibbeting/loading-message'
```
