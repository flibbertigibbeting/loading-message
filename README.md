# @flibbertigibbeting/loading-message

> Delightful loading messages for React apps

Drop-in component for loading states that don't suck.

## Installation

```bash
npm install @flibbertigibbeting/loading-message
# or
yarn add @flibbertigibbeting/loading-message
# or
pnpm add @flibbertigibbeting/loading-message
```

## Basic Usage

```tsx
import { LoadingMessage } from '@flibbertigibbeting/loading-message'

function MyComponent() {
  const [isLoading, setIsLoading] = useState(true)

  if (isLoading) {
    return <LoadingMessage />
  }

  return <div>Content loaded!</div>
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `category` | `string` | - | Filter messages by category |
| `tone` | `string` | - | Filter messages by tone |
| `safe` | `boolean` | `true` | Only show SFW messages |
| `interval` | `number` | `3000` | Time between message changes (ms) |
| `showSpinner` | `boolean` | `true` | Show animated spinner |
| `className` | `string` | - | Custom CSS classes |
| `onMessageChange` | `function` | - | Callback when message updates |

## Examples

### Filtered by Category

```tsx
<LoadingMessage category="tech" tone="nerdy" />
```

### Custom Refresh Interval

```tsx
<LoadingMessage
  interval={5000} // Change every 5 seconds
  showSpinner={false}
/>
```

### With Message Callback

```tsx
<LoadingMessage
  onMessageChange={(msg) => {
    console.log('New message:', msg.message)
    analytics.track('loading_message_shown', { category: msg.category })
  }}
/>
```

### Custom Styling

```tsx
<LoadingMessage className="text-2xl font-bold text-purple-500" />
```

## Hooks

Need more control? Use the hook directly:

```tsx
import { useLoadingMessage } from '@flibbertigibbeting/loading-message'

function CustomLoader() {
  const { message, isLoading, refresh } = useLoadingMessage({
    category: 'existential',
    interval: 4000
  })

  return (
    <div className="flex flex-col items-center gap-4">
      <p>{message?.message}</p>
      <button onClick={refresh}>
        Get another
      </button>
    </div>
  )
}
```

### Hook Return Values

| Value | Type | Description |
|-------|------|-------------|
| `message` | `Message \| null` | Current message object |
| `isLoading` | `boolean` | True while fetching |
| `error` | `Error \| null` | Error if fetch failed |
| `refresh` | `function` | Manually fetch new message |

## TypeScript

Full TypeScript support included. Import types as needed:

```tsx
import type {
  Message,
  LoadingMessageProps,
  UseLoadingMessageOptions
} from '@flibbertigibbeting/loading-message'

// Message type
interface Message {
  message: string
  category: string
  tags: string[]
  tone: string
  safe: boolean
}
```

## Categories

- `whimsical` - Playful and magical
- `tech` - Developer humor
- `existential` - Deep thoughts
- `absurd` - Pure nonsense
- `scifi` - Sci-fi references
- `systems` - Classic computing

## Tones

- `whimsical` - Light & airy
- `cheeky` - Playfully bold
- `dry` - Deadpan humor
- `nerdy` - Reference-heavy

## License

MIT
