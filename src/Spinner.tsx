import { useMemo } from 'react'
import type { SpinnerType } from './spinners/types'
import { spinnerKeyframes, getSpinnerStyles, getSpinnerContent } from './spinners/styles'

export interface SpinnerProps {
  /**
   * The type of spinner to display
   * @default 'circle'
   */
  type?: SpinnerType
  
  /**
   * Size in pixels
   * @default 40
   */
  size?: number
  
  /**
   * Color (any valid CSS color)
   * @default 'currentColor'
   */
  color?: string
  
  /**
   * Animation speed multiplier (1 = normal, 2 = 2x faster, 0.5 = half speed)
   * @default 1
   */
  speed?: number
  
  /**
   * Additional CSS class name
   */
  className?: string
  
  /**
   * Inline style overrides for the container
   */
  style?: React.CSSProperties
  
  /**
   * Accessible label for screen readers
   * @default 'Loading'
   */
  label?: string
}

/**
 * A customizable loading spinner with 50+ animation styles
 * 
 * @example
 * ```tsx
 * <Spinner type="dots-bounce" size={48} color="#3b82f6" />
 * ```
 */
export function Spinner({
  type = 'circle',
  size = 40,
  color = 'currentColor',
  speed = 1,
  className = '',
  style,
  label = 'Loading',
}: SpinnerProps) {
  const styles = useMemo(
    () => getSpinnerStyles(type, size, color, speed),
    [type, size, color, speed]
  )
  
  const content = getSpinnerContent(type)
  
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: spinnerKeyframes }} />
      <span
        role="status"
        aria-label={label}
        className={className}
        style={{ ...styles.container, ...style }}
      >
        {content && <span aria-hidden="true">{content}</span>}
        {styles.elements?.map((elementStyle, index) => (
          <span key={index} style={elementStyle} aria-hidden="true" />
        ))}
        <span className="sr-only" style={{ 
          position: 'absolute',
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          border: 0,
        }}>
          {label}
        </span>
      </span>
    </>
  )
}
