# GitHub Copilot Instructions for @flibbertigibbeting/loading-message

This project uses `@flibbertigibbeting/loading-message` for loading states.

## Quick Reference

### Import
```tsx
import { Spinner, LoadingMessage, useLoadingMessage } from '@flibbertigibbeting/loading-message'
```

### Basic Spinner
```tsx
<Spinner type="dots-bounce" size={32} color="#3b82f6" />
```

### Loading Messages
```tsx
<LoadingMessage 
  messages={["Loading...", "Please wait..."]}
  interval={2000}
  spinnerType="circle"
/>
```

### Hook for Custom Logic
```tsx
const { message, isComplete } = useLoadingMessage({
  messages: ["Step 1", "Step 2", "Done"],
  loop: false
})
```

## Available Spinner Types

Circle: `circle`, `circle-fade`, `circle-dots`, `circle-pulse`, `dual-ring`
Dots: `dots-bounce`, `dots-fade`, `dots-pulse`, `dots-wave`, `dots-scale`
Bars: `bars`, `bars-fade`, `bars-scale`, `bars-wave`
Creative: `orbit`, `ripple`, `pacman`, `hourglass`, `infinity`

## Guidelines

1. Use `<Spinner />` for quick operations under 2 seconds
2. Use `<LoadingMessage />` for longer operations to keep users engaged
3. Components are accessible by default (aria-live, reduced-motion)
4. Use the hook when you need custom control over loading state
