/**
 * All available spinner types organized by category
 */

// Circle-based spinners
export type CircleSpinner =
  | 'circle'           // Classic spinning circle
  | 'circle-fade'      // Fading circle segments
  | 'circle-dots'      // Dots around a circle
  | 'circle-pulse'     // Pulsing circle
  | 'circle-notch'     // Circle with notch
  | 'circle-quarter'   // Quarter circle spinner
  | 'circle-half'      // Half circle spinner
  | 'circle-split'     // Split circle
  | 'dual-ring'        // Two concentric rings
  | 'ring-resize'      // Ring that resizes

// Dot-based spinners
export type DotSpinner =
  | 'dots-bounce'      // Three bouncing dots
  | 'dots-fade'        // Three fading dots
  | 'dots-pulse'       // Three pulsing dots
  | 'dots-wave'        // Wave of dots
  | 'dots-flashing'    // Flashing dots
  | 'dots-elastic'     // Elastic bouncing dots
  | 'dots-carousel'    // Rotating carousel of dots
  | 'dots-scale'       // Scaling dots
  | 'dots-orbit'       // Orbiting dots
  | 'dots-shuffle'     // Shuffling dots

// Bar-based spinners
export type BarSpinner =
  | 'bars'             // Classic bars/equalizer
  | 'bars-fade'        // Fading bars
  | 'bars-scale'       // Scaling bars
  | 'bars-wave'        // Wave bars
  | 'bars-pulse'       // Pulsing bars
  | 'bars-rotate'      // Rotating bars (like loading icon)

// Square/Block spinners
export type SquareSpinner =
  | 'square-spin'      // Spinning square
  | 'square-fold'      // Folding square
  | 'squares-grid'     // Grid of squares
  | 'squares-shift'    // Shifting squares
  | 'cube'             // 3D cube
  | 'cube-grid'        // Grid of cubes
  | 'blocks-wave'      // Wave of blocks
  | 'blocks-shuffle'   // Shuffling blocks

// Line spinners
export type LineSpinner =
  | 'line-wobble'      // Wobbling line
  | 'line-scale'       // Scaling line
  | 'line-wave'        // Wave line
  | 'line-bounce'      // Bouncing line

// Creative/Fun spinners
export type CreativeSpinner =
  | 'heart-beat'       // Beating heart
  | 'hourglass'        // Hourglass flip
  | 'infinity'         // Infinity loop
  | 'ripple'           // Ripple effect
  | 'orbit'            // Orbital motion
  | 'atom'             // Atom-like orbits
  | 'dna'              // DNA helix
  | 'pacman'           // Pacman chomping
  | 'clock'            // Clock hands
  | 'gear'             // Spinning gear
  | 'flower'           // Flower petals
  | 'spiral'           // Spiral motion
  | 'windmill'         // Windmill rotation
  | 'seesaw'           // Seesaw motion

// Progress-style spinners
export type ProgressSpinner =
  | 'progress-bar'     // Indeterminate progress bar
  | 'progress-orbit'   // Orbiting progress
  | 'meter'            // Meter filling

// All spinner types
export type SpinnerType =
  | CircleSpinner
  | DotSpinner
  | BarSpinner
  | SquareSpinner
  | LineSpinner
  | CreativeSpinner
  | ProgressSpinner

// Spinner categories for documentation/filtering
export const spinnerCategories = {
  circle: [
    'circle', 'circle-fade', 'circle-dots', 'circle-pulse', 'circle-notch',
    'circle-quarter', 'circle-half', 'circle-split', 'dual-ring', 'ring-resize'
  ],
  dots: [
    'dots-bounce', 'dots-fade', 'dots-pulse', 'dots-wave', 'dots-flashing',
    'dots-elastic', 'dots-carousel', 'dots-scale', 'dots-orbit', 'dots-shuffle'
  ],
  bars: ['bars', 'bars-fade', 'bars-scale', 'bars-wave', 'bars-pulse', 'bars-rotate'],
  squares: [
    'square-spin', 'square-fold', 'squares-grid', 'squares-shift',
    'cube', 'cube-grid', 'blocks-wave', 'blocks-shuffle'
  ],
  lines: ['line-wobble', 'line-scale', 'line-wave', 'line-bounce'],
  creative: [
    'heart-beat', 'hourglass', 'infinity', 'ripple', 'orbit', 'atom',
    'dna', 'pacman', 'clock', 'gear', 'flower', 'spiral', 'windmill', 'seesaw'
  ],
  progress: ['progress-bar', 'progress-orbit', 'meter']
} as const

// All spinner types as array
export const allSpinnerTypes: SpinnerType[] = [
  ...spinnerCategories.circle,
  ...spinnerCategories.dots,
  ...spinnerCategories.bars,
  ...spinnerCategories.squares,
  ...spinnerCategories.lines,
  ...spinnerCategories.creative,
  ...spinnerCategories.progress
]
