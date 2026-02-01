# @flibbertigibbeting/loading-message

React components for delightful loading messages and 50+ customizable spinners from [flibbertigibbeting.dev](https://flibbertigibbeting.dev).

## Installation

```bash
npm install @flibbertigibbeting/loading-message
```

## Components

### LoadingMessage

Displays delightful loading messages with optional spinner.

```tsx
import { LoadingMessage } from '@flibbertigibbeting/loading-message'

function App() {
  return (
    <LoadingMessage 
      category="tech"
      spinnerType="dots-bounce"
      spinnerColor="#3b82f6"
    />
  )
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `category` | `string` | - | Filter messages by category |
| `tone` | `string` | - | Filter messages by tone |
| `safe` | `boolean` | `true` | Only show SFW messages |
| `interval` | `number` | `3000` | Time between message changes (ms) |
| `showSpinner` | `boolean` | `true` | Show animated spinner |
| `spinnerType` | `SpinnerType` | `'circle'` | Spinner animation style |
| `spinnerSize` | `number` | `20` | Spinner size in pixels |
| `spinnerColor` | `string` | `'currentColor'` | Spinner color |
| `spinnerSpeed` | `number` | `1` | Animation speed multiplier |
| `className` | `string` | - | Custom CSS classes |
| `onMessageChange` | `(message) => void` | - | Callback when message updates |

### Spinner

Standalone customizable spinner with 50+ animation styles.

```tsx
import { Spinner } from '@flibbertigibbeting/loading-message'

function App() {
  return <Spinner type="dots-bounce" size={48} color="#3b82f6" />
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `SpinnerType` | `'circle'` | Spinner animation style |
| `size` | `number` | `40` | Size in pixels |
| `color` | `string` | `'currentColor'` | Any valid CSS color |
| `speed` | `number` | `1` | Animation speed multiplier |
| `className` | `string` | - | Additional CSS class |
| `style` | `CSSProperties` | - | Inline style overrides |
| `label` | `string` | `'Loading'` | Accessible label |

## Available Spinner Types

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

## Hooks

### useLoadingMessage

Hook for fetching loading messages directly.

```tsx
import { useLoadingMessage } from '@flibbertigibbeting/loading-message'

function App() {
  const { message, isLoading, refresh } = useLoadingMessage({
    category: 'tech',
    interval: 5000,
  })

  return <p>{message?.message}</p>
}
```

## Utilities

### allSpinnerTypes

Array of all 55 available spinner type names.

```tsx
import { allSpinnerTypes } from '@flibbertigibbeting/loading-message'

// ['circle', 'circle-fade', 'circle-dots', ...]
```

### spinnerCategories

Spinner types organized by category.

```tsx
import { spinnerCategories } from '@flibbertigibbeting/loading-message'

// {
//   circle: ['circle', 'circle-fade', ...],
//   dots: ['dots-bounce', 'dots-fade', ...],
//   ...
// }
```

## License

MIT © [flibbertigibbeting](https://flibbertigibbeting.dev)
