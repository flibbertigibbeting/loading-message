# @flibbertigibbeting/loading-message

> **Loading states done right.** Delightful messages, 50+ spinners, accessible by default.

[![npm version](https://img.shields.io/npm/v/@flibbertigibbeting/loading-message.svg)](https://www.npmjs.com/package/@flibbertigibbeting/loading-message)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@flibbertigibbeting/loading-message)](https://bundlephobia.com/package/@flibbertigibbeting/loading-message)
[![license](https://img.shields.io/npm/l/@flibbertigibbeting/loading-message.svg)](https://github.com/flibbertigibbeting/loading-message/blob/main/LICENSE)

---

## Why?

Loading states are tedious. You either grab a spinner that doesn't match your app, or build something custom every time. Meanwhile, users stare at generic "Loading..." text.

This library gives you:
- **50+ spinner animations** — from minimal to playful
- **Cycling loading messages** — keep users engaged during waits
- **Accessible by default** — `aria-live`, reduced-motion support
- **Tiny bundle** — tree-shakeable, zero dependencies

---

## Quick Start

```bash
npm install @flibbertigibbeting/loading-message
```

```tsx
import { Spinner, LoadingMessage } from '@flibbertigibbeting/loading-message'

// Simple spinner
<Spinner type="dots-bounce" />

// Cycling messages with spinner
<LoadingMessage 
  messages={["Loading...", "Almost there...", "Just a moment..."]}
  spinnerType="circle"
/>
```

---

## When to Use What

| Situation | Component | Example |
|-----------|-----------|---------|
| Quick async operation (<2s) | `<Spinner />` | Button click, form submit |
| Longer operation (2-10s) | `<LoadingMessage />` | API calls, file processing |
| Custom implementation | `useLoadingMessage()` | Complex loading UX |

---

## Components

### `<Spinner />`

Standalone animated spinner with 50+ styles.

```tsx
import { Spinner } from '@flibbertigibbeting/loading-message'

<Spinner 
  type="dots-bounce"  // See all types below
  size={32}           // Size in pixels
  color="#3b82f6"     // Any CSS color
  speed={1}           // Animation speed multiplier
/>
```

#### Spinner Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `SpinnerType` | `'circle'` | Animation style (see list below) |
| `size` | `number` | `40` | Size in pixels |
| `color` | `string` | `'currentColor'` | Any valid CSS color |
| `speed` | `number` | `1` | Animation speed (0.5 = slower, 2 = faster) |
| `label` | `string` | `'Loading'` | Accessible label for screen readers |
| `className` | `string` | - | Additional CSS classes |

---

### `<LoadingMessage />`

Displays cycling messages with optional spinner.

```tsx
import { LoadingMessage } from '@flibbertigibbeting/loading-message'

// Basic usage
<LoadingMessage messages={["Loading...", "Please wait..."]} />

// With custom spinner
<LoadingMessage 
  messages={["Fetching data...", "Processing...", "Almost done..."]}
  interval={2000}
  spinnerType="dots-bounce"
  spinnerColor="#10b981"
/>

// Using built-in message categories
<LoadingMessage category="tech" tone="playful" />
```

#### LoadingMessage Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `messages` | `string[]` | - | Custom messages to cycle through |
| `category` | `string` | - | Use built-in messages by category |
| `tone` | `string` | - | Filter by tone (playful, professional, etc.) |
| `interval` | `number` | `3000` | Milliseconds between messages |
| `showSpinner` | `boolean` | `true` | Show spinner alongside message |
| `spinnerType` | `SpinnerType` | `'circle'` | Spinner animation style |
| `spinnerSize` | `number` | `20` | Spinner size in pixels |
| `spinnerColor` | `string` | `'currentColor'` | Spinner color |
| `onMessageChange` | `(msg) => void` | - | Callback when message changes |

---

### `useLoadingMessage()` Hook

For custom loading implementations.

```tsx
import { useLoadingMessage } from '@flibbertigibbeting/loading-message'

function CustomLoader() {
  const { message, index, isComplete, reset } = useLoadingMessage({
    messages: ["Step 1...", "Step 2...", "Step 3..."],
    interval: 1500,
    loop: false,  // Stop after last message
  })

  return (
    <div>
      <p>{message}</p>
      {isComplete && <button onClick={reset}>Retry</button>}
    </div>
  )
}
```

#### Hook Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `messages` | `string[]` | Required | Messages to cycle through |
| `interval` | `number` | `3000` | Milliseconds between messages |
| `loop` | `boolean` | `true` | Loop back to first message |
| `autoStart` | `boolean` | `true` | Start cycling immediately |

#### Hook Returns

| Property | Type | Description |
|----------|------|-------------|
| `message` | `string` | Current message |
| `index` | `number` | Current message index |
| `isComplete` | `boolean` | True if finished (when `loop: false`) |
| `start()` | `function` | Start/resume cycling |
| `stop()` | `function` | Pause cycling |
| `reset()` | `function` | Reset to first message |

---

## All Spinner Types

### Circle (10 types)
`circle` · `circle-fade` · `circle-dots` · `circle-pulse` · `circle-notch` · `circle-quarter` · `circle-half` · `circle-split` · `dual-ring` · `ring-resize`

### Dots (10 types)
`dots-bounce` · `dots-fade` · `dots-pulse` · `dots-wave` · `dots-flashing` · `dots-elastic` · `dots-carousel` · `dots-scale` · `dots-orbit` · `dots-shuffle`

### Bars (6 types)
`bars` · `bars-fade` · `bars-scale` · `bars-wave` · `bars-pulse` · `bars-rotate`

### Squares (8 types)
`square-spin` · `square-fold` · `squares-grid` · `squares-shift` · `cube` · `cube-grid` · `blocks-wave` · `blocks-shuffle`

### Lines (4 types)
`line-wobble` · `line-scale` · `line-wave` · `line-bounce`

### Creative (14 types)
`heart-beat` · `hourglass` · `infinity` · `ripple` · `orbit` · `atom` · `dna` · `pacman` · `clock` · `gear` · `flower` · `spiral` · `windmill` · `seesaw`

### Progress (3 types)
`progress-bar` · `progress-orbit` · `meter`

---

## Utilities

```tsx
import { allSpinnerTypes, spinnerCategories } from '@flibbertigibbeting/loading-message'

// Array of all 55 spinner type names
console.log(allSpinnerTypes)
// ['circle', 'circle-fade', 'dots-bounce', ...]

// Types organized by category
console.log(spinnerCategories)
// { circle: [...], dots: [...], bars: [...], ... }
```

---

## Accessibility

This library is built with accessibility in mind:

- ✅ **Screen reader support** — Uses `aria-live="polite"` to announce loading state changes
- ✅ **Reduced motion** — Respects `prefers-reduced-motion` automatically
- ✅ **Semantic HTML** — Proper role and label attributes
- ✅ **Customizable labels** — Override `label` prop for context-specific announcements

```tsx
// Custom accessible label
<Spinner type="circle" label="Loading your dashboard" />
```

---

## TypeScript

Full TypeScript support with exported types:

```tsx
import type { 
  SpinnerType, 
  SpinnerProps, 
  LoadingMessageProps,
  UseLoadingMessageOptions 
} from '@flibbertigibbeting/loading-message'
```

---

## Browser Support

Works in all modern browsers. Uses CSS animations with no JavaScript animation runtime.

---

## License

MIT © [flibbertigibbeting](https://flibbertigibbeting.dev)

---

<p align="center">
  <a href="https://flibbertigibbeting.dev">Website</a> •
  <a href="https://flibbertigibbeting.dev/docs">Docs</a> •
  <a href="https://github.com/flibbertigibbeting/loading-message/issues">Issues</a>
</p>
