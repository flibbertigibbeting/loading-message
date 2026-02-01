import type { SpinnerType } from './types'

/**
 * CSS keyframes for all spinner animations
 */
export const spinnerKeyframes = `
/* Circle animations */
@keyframes flib-spin { to { transform: rotate(360deg); } }
@keyframes flib-pulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(0.8); opacity: 0.5; } }
@keyframes flib-fade-circle { 0%, 100% { opacity: 1; } 50% { opacity: 0.2; } }
@keyframes flib-ring-resize { 0% { width: 0; height: 0; opacity: 1; } 100% { width: 100%; height: 100%; opacity: 0; } }

/* Dot animations */
@keyframes flib-bounce { 0%, 80%, 100% { transform: translateY(0); } 40% { transform: translateY(-100%); } }
@keyframes flib-fade { 0%, 100% { opacity: 1; } 50% { opacity: 0.2; } }
@keyframes flib-scale { 0%, 100% { transform: scale(1); } 50% { transform: scale(0.5); } }
@keyframes flib-elastic { 0% { transform: scale(1); } 30% { transform: scale(1.25); } 60% { transform: scale(0.75); } 100% { transform: scale(1); } }
@keyframes flib-wave { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-50%); } }

/* Bar animations */
@keyframes flib-bar-scale { 0%, 100% { transform: scaleY(0.4); } 50% { transform: scaleY(1); } }
@keyframes flib-bar-fade { 0%, 100% { opacity: 0.2; } 50% { opacity: 1; } }

/* Square animations */
@keyframes flib-square-spin { 0% { transform: perspective(120px) rotateX(0deg) rotateY(0deg); } 50% { transform: perspective(120px) rotateX(-180deg) rotateY(0deg); } 100% { transform: perspective(120px) rotateX(-180deg) rotateY(-180deg); } }
@keyframes flib-fold { 0%, 10% { transform: perspective(140px) rotateX(-180deg); opacity: 0; } 25%, 75% { transform: perspective(140px) rotateX(0deg); opacity: 1; } 90%, 100% { transform: perspective(140px) rotateY(180deg); opacity: 0; } }

/* Line animations */
@keyframes flib-wobble { 0%, 100% { transform: translateX(-50%) scaleX(0.2); } 50% { transform: translateX(50%) scaleX(0.2); } 25%, 75% { transform: translateX(0) scaleX(1); } }
@keyframes flib-line-scale { 0%, 100% { transform: scaleX(0.1); } 50% { transform: scaleX(1); } }

/* Creative animations */
@keyframes flib-heartbeat { 0%, 100% { transform: scale(1); } 14% { transform: scale(1.3); } 28% { transform: scale(1); } 42% { transform: scale(1.3); } 70% { transform: scale(1); } }
@keyframes flib-hourglass { 0% { transform: rotate(0deg); } 50% { transform: rotate(180deg); } 100% { transform: rotate(180deg); } }
@keyframes flib-ripple { 0% { transform: scale(0); opacity: 1; } 100% { transform: scale(1); opacity: 0; } }
@keyframes flib-orbit { 0% { transform: rotate(0deg) translateX(100%) rotate(0deg); } 100% { transform: rotate(360deg) translateX(100%) rotate(-360deg); } }

/* Progress animations */
@keyframes flib-progress { 0% { left: -35%; right: 100%; } 60% { left: 100%; right: -90%; } 100% { left: 100%; right: -90%; } }
@keyframes flib-progress2 { 0% { left: -200%; right: 100%; } 60% { left: 107%; right: -8%; } 100% { left: 107%; right: -8%; } }
`

/**
 * Get inline styles for a specific spinner type
 */
export function getSpinnerStyles(
  type: SpinnerType,
  size: number,
  color: string,
  speed: number = 1
): { container: React.CSSProperties; elements?: React.CSSProperties[] } {
  const duration = 1 / speed
  
  const baseContainer: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: size,
    height: size,
    position: 'relative',
  }

  switch (type) {
    // CIRCLE SPINNERS
    case 'circle':
      return {
        container: {
          ...baseContainer,
          border: `${size * 0.1}px solid ${color}20`,
          borderTopColor: color,
          borderRadius: '50%',
          animation: `flib-spin ${duration * 0.75}s linear infinite`,
        }
      }
    
    case 'circle-fade':
      return {
        container: baseContainer,
        elements: Array(8).fill(0).map((_, i) => ({
          position: 'absolute' as const,
          width: size * 0.15,
          height: size * 0.15,
          backgroundColor: color,
          borderRadius: '50%',
          transform: `rotate(${i * 45}deg) translateY(${-size * 0.35}px)`,
          animation: `flib-fade ${duration}s ease-in-out ${i * 0.125}s infinite`,
        }))
      }

    case 'circle-dots':
      return {
        container: {
          ...baseContainer,
          animation: `flib-spin ${duration * 1.2}s linear infinite`,
        },
        elements: Array(8).fill(0).map((_, i) => ({
          position: 'absolute' as const,
          width: size * 0.15,
          height: size * 0.15,
          backgroundColor: color,
          borderRadius: '50%',
          transform: `rotate(${i * 45}deg) translateY(${-size * 0.35}px)`,
          opacity: 1 - (i * 0.1),
        }))
      }

    case 'circle-pulse':
      return {
        container: {
          ...baseContainer,
          backgroundColor: color,
          borderRadius: '50%',
          animation: `flib-pulse ${duration}s ease-in-out infinite`,
        }
      }

    case 'circle-notch':
      return {
        container: {
          ...baseContainer,
          border: `${size * 0.1}px solid transparent`,
          borderTopColor: color,
          borderRightColor: color,
          borderRadius: '50%',
          animation: `flib-spin ${duration * 0.75}s linear infinite`,
        }
      }

    case 'circle-quarter':
      return {
        container: {
          ...baseContainer,
          border: `${size * 0.1}px solid transparent`,
          borderTopColor: color,
          borderRadius: '50%',
          animation: `flib-spin ${duration}s linear infinite`,
        }
      }

    case 'circle-half':
      return {
        container: {
          ...baseContainer,
          border: `${size * 0.1}px solid transparent`,
          borderTopColor: color,
          borderRightColor: color,
          borderBottomColor: color,
          borderRadius: '50%',
          animation: `flib-spin ${duration}s linear infinite`,
        }
      }

    case 'circle-split':
      return {
        container: {
          ...baseContainer,
          border: `${size * 0.1}px solid transparent`,
          borderTopColor: color,
          borderBottomColor: color,
          borderRadius: '50%',
          animation: `flib-spin ${duration}s linear infinite`,
        }
      }

    case 'dual-ring':
      return {
        container: {
          ...baseContainer,
          border: `${size * 0.08}px solid transparent`,
          borderTopColor: color,
          borderBottomColor: color,
          borderRadius: '50%',
          animation: `flib-spin ${duration}s linear infinite`,
        },
        elements: [{
          position: 'absolute' as const,
          width: size * 0.6,
          height: size * 0.6,
          border: `${size * 0.08}px solid transparent`,
          borderLeftColor: color,
          borderRightColor: color,
          borderRadius: '50%',
          animation: `flib-spin ${duration * 0.75}s linear infinite reverse`,
        }]
      }

    case 'ring-resize':
      return {
        container: baseContainer,
        elements: [0, 1].map((i) => ({
          position: 'absolute' as const,
          width: size,
          height: size,
          border: `${size * 0.08}px solid ${color}`,
          borderRadius: '50%',
          animation: `flib-ring-resize ${duration * 1.5}s ease-out ${i * 0.75}s infinite`,
        }))
      }

    // DOT SPINNERS
    case 'dots-bounce':
      return {
        container: { ...baseContainer, gap: size * 0.15 },
        elements: [0, 1, 2].map((i) => ({
          width: size * 0.25,
          height: size * 0.25,
          backgroundColor: color,
          borderRadius: '50%',
          animation: `flib-bounce ${duration}s ease-in-out ${i * 0.16}s infinite`,
        }))
      }

    case 'dots-fade':
      return {
        container: { ...baseContainer, gap: size * 0.15 },
        elements: [0, 1, 2].map((i) => ({
          width: size * 0.25,
          height: size * 0.25,
          backgroundColor: color,
          borderRadius: '50%',
          animation: `flib-fade ${duration}s ease-in-out ${i * 0.2}s infinite`,
        }))
      }

    case 'dots-pulse':
      return {
        container: { ...baseContainer, gap: size * 0.15 },
        elements: [0, 1, 2].map((i) => ({
          width: size * 0.25,
          height: size * 0.25,
          backgroundColor: color,
          borderRadius: '50%',
          animation: `flib-pulse ${duration}s ease-in-out ${i * 0.2}s infinite`,
        }))
      }

    case 'dots-wave':
      return {
        container: { ...baseContainer, gap: size * 0.1, alignItems: 'flex-end' },
        elements: [0, 1, 2, 3, 4].map((i) => ({
          width: size * 0.12,
          height: size * 0.12,
          backgroundColor: color,
          borderRadius: '50%',
          animation: `flib-wave ${duration}s ease-in-out ${i * 0.1}s infinite`,
        }))
      }

    case 'dots-flashing':
      return {
        container: { ...baseContainer, gap: size * 0.15 },
        elements: [0, 1, 2].map((i) => ({
          width: size * 0.25,
          height: size * 0.25,
          backgroundColor: color,
          borderRadius: '50%',
          animation: `flib-fade ${duration * 0.8}s ease-in-out ${i * 0.15}s infinite alternate`,
        }))
      }

    case 'dots-elastic':
      return {
        container: { ...baseContainer, gap: size * 0.15 },
        elements: [0, 1, 2].map((i) => ({
          width: size * 0.25,
          height: size * 0.25,
          backgroundColor: color,
          borderRadius: '50%',
          animation: `flib-elastic ${duration}s ease-in-out ${i * 0.15}s infinite`,
        }))
      }

    case 'dots-carousel':
      return {
        container: {
          ...baseContainer,
          animation: `flib-spin ${duration * 1.5}s linear infinite`,
        },
        elements: [0, 1, 2, 3].map((i) => ({
          position: 'absolute' as const,
          width: size * 0.2,
          height: size * 0.2,
          backgroundColor: color,
          borderRadius: '50%',
          transform: `rotate(${i * 90}deg) translateY(${-size * 0.35}px)`,
        }))
      }

    case 'dots-scale':
      return {
        container: { ...baseContainer, gap: size * 0.1 },
        elements: [0, 1, 2].map((i) => ({
          width: size * 0.25,
          height: size * 0.25,
          backgroundColor: color,
          borderRadius: '50%',
          animation: `flib-scale ${duration}s ease-in-out ${i * 0.2}s infinite`,
        }))
      }

    case 'dots-orbit':
      return {
        container: baseContainer,
        elements: [0, 1].map((i) => ({
          position: 'absolute' as const,
          width: size * 0.25,
          height: size * 0.25,
          backgroundColor: color,
          borderRadius: '50%',
          animation: `flib-orbit ${duration * 1.5}s linear ${i * 0.75}s infinite`,
        }))
      }

    case 'dots-shuffle':
      return {
        container: { ...baseContainer, gap: size * 0.1 },
        elements: [0, 1, 2].map((i) => ({
          width: size * 0.25,
          height: size * 0.25,
          backgroundColor: color,
          borderRadius: '50%',
          animation: `flib-bounce ${duration * 1.2}s ease-in-out ${i * 0.2}s infinite`,
        }))
      }

    // BAR SPINNERS
    case 'bars':
      return {
        container: { ...baseContainer, gap: size * 0.08 },
        elements: [0, 1, 2, 3, 4].map((i) => ({
          width: size * 0.12,
          height: size * 0.8,
          backgroundColor: color,
          borderRadius: size * 0.02,
          animation: `flib-bar-scale ${duration}s ease-in-out ${i * 0.1}s infinite`,
        }))
      }

    case 'bars-fade':
      return {
        container: { ...baseContainer, gap: size * 0.08 },
        elements: [0, 1, 2, 3, 4].map((i) => ({
          width: size * 0.12,
          height: size * 0.8,
          backgroundColor: color,
          borderRadius: size * 0.02,
          animation: `flib-bar-fade ${duration}s ease-in-out ${i * 0.1}s infinite`,
        }))
      }

    case 'bars-scale':
      return {
        container: { ...baseContainer, gap: size * 0.06, alignItems: 'center' },
        elements: [0, 1, 2, 3].map((i) => ({
          width: size * 0.15,
          height: size * 0.6,
          backgroundColor: color,
          borderRadius: size * 0.04,
          animation: `flib-bar-scale ${duration * 0.8}s ease-in-out ${i * 0.12}s infinite`,
        }))
      }

    case 'bars-wave':
      return {
        container: { ...baseContainer, gap: size * 0.06, alignItems: 'flex-end' },
        elements: [0, 1, 2, 3, 4].map((i) => ({
          width: size * 0.12,
          height: size * 0.5,
          backgroundColor: color,
          borderRadius: size * 0.02,
          animation: `flib-bar-scale ${duration}s ease-in-out ${i * 0.1}s infinite`,
        }))
      }

    case 'bars-pulse':
      return {
        container: { ...baseContainer, gap: size * 0.08 },
        elements: [0, 1, 2].map((i) => ({
          width: size * 0.2,
          height: size * 0.7,
          backgroundColor: color,
          borderRadius: size * 0.04,
          animation: `flib-pulse ${duration}s ease-in-out ${i * 0.15}s infinite`,
        }))
      }

    case 'bars-rotate':
      return {
        container: {
          ...baseContainer,
          animation: `flib-spin ${duration}s linear infinite`,
        },
        elements: Array(12).fill(0).map((_, i) => ({
          position: 'absolute' as const,
          width: size * 0.08,
          height: size * 0.25,
          backgroundColor: color,
          borderRadius: size * 0.02,
          transform: `rotate(${i * 30}deg) translateY(${-size * 0.35}px)`,
          opacity: 1 - (i * 0.07),
        }))
      }

    // SQUARE SPINNERS
    case 'square-spin':
      return {
        container: {
          ...baseContainer,
          width: size * 0.6,
          height: size * 0.6,
          backgroundColor: color,
          animation: `flib-square-spin ${duration * 1.5}s infinite`,
        }
      }

    case 'square-fold':
      return {
        container: { ...baseContainer, flexWrap: 'wrap' },
        elements: [0, 1, 3, 2].map((i) => ({
          width: size * 0.45,
          height: size * 0.45,
          backgroundColor: color,
          animation: `flib-fold ${duration * 2.4}s infinite linear both`,
          animationDelay: `${i * 0.3}s`,
        }))
      }

    case 'squares-grid':
      return {
        container: { 
          ...baseContainer, 
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: size * 0.08,
        },
        elements: Array(9).fill(0).map((_, i) => ({
          width: size * 0.25,
          height: size * 0.25,
          backgroundColor: color,
          animation: `flib-scale ${duration * 1.3}s ease-in-out ${i * 0.1}s infinite`,
        }))
      }

    case 'squares-shift':
      return {
        container: { 
          ...baseContainer, 
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: size * 0.1,
        },
        elements: [0, 1, 2, 3].map((i) => ({
          width: size * 0.35,
          height: size * 0.35,
          backgroundColor: color,
          animation: `flib-scale ${duration}s ease-in-out ${i * 0.15}s infinite`,
        }))
      }

    case 'cube':
      return {
        container: {
          ...baseContainer,
          perspective: size * 3,
        },
        elements: [{
          width: size * 0.5,
          height: size * 0.5,
          backgroundColor: color,
          animation: `flib-square-spin ${duration * 1.2}s infinite`,
        }]
      }

    case 'cube-grid':
      return {
        container: { 
          ...baseContainer, 
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: size * 0.06,
        },
        elements: Array(9).fill(0).map((_, i) => ({
          width: size * 0.25,
          height: size * 0.25,
          backgroundColor: color,
          animation: `flib-scale ${duration * 1.3}s ease-in-out ${((i % 3) + Math.floor(i / 3)) * 0.1}s infinite`,
        }))
      }

    case 'blocks-wave':
      return {
        container: { ...baseContainer, gap: size * 0.08 },
        elements: [0, 1, 2, 3].map((i) => ({
          width: size * 0.18,
          height: size * 0.18,
          backgroundColor: color,
          animation: `flib-wave ${duration}s ease-in-out ${i * 0.15}s infinite`,
        }))
      }

    case 'blocks-shuffle':
      return {
        container: { 
          ...baseContainer, 
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: size * 0.1,
        },
        elements: [0, 1, 2, 3].map((i) => ({
          width: size * 0.35,
          height: size * 0.35,
          backgroundColor: color,
          animation: `flib-bounce ${duration}s ease-in-out ${[0, 0.2, 0.3, 0.1][i]}s infinite`,
        }))
      }

    // LINE SPINNERS
    case 'line-wobble':
      return {
        container: {
          ...baseContainer,
          overflow: 'hidden',
        },
        elements: [{
          width: size * 0.4,
          height: size * 0.15,
          backgroundColor: color,
          borderRadius: size * 0.1,
          animation: `flib-wobble ${duration * 1.5}s ease-in-out infinite`,
        }]
      }

    case 'line-scale':
      return {
        container: baseContainer,
        elements: [{
          width: size * 0.8,
          height: size * 0.15,
          backgroundColor: color,
          borderRadius: size * 0.1,
          animation: `flib-line-scale ${duration}s ease-in-out infinite`,
        }]
      }

    case 'line-wave':
      return {
        container: { ...baseContainer, gap: size * 0.1 },
        elements: [0, 1, 2].map((i) => ({
          width: size * 0.2,
          height: size * 0.08,
          backgroundColor: color,
          borderRadius: size * 0.04,
          animation: `flib-wave ${duration}s ease-in-out ${i * 0.15}s infinite`,
        }))
      }

    case 'line-bounce':
      return {
        container: baseContainer,
        elements: [{
          width: size * 0.8,
          height: size * 0.15,
          backgroundColor: color,
          borderRadius: size * 0.1,
          animation: `flib-bounce ${duration}s ease-in-out infinite`,
        }]
      }

    // CREATIVE SPINNERS
    case 'heart-beat':
      return {
        container: {
          ...baseContainer,
          fontSize: size * 0.7,
          color: color,
          animation: `flib-heartbeat ${duration}s ease-in-out infinite`,
        }
      }

    case 'hourglass':
      return {
        container: {
          ...baseContainer,
          fontSize: size * 0.7,
          color: color,
          animation: `flib-hourglass ${duration * 1.5}s ease-in-out infinite`,
        }
      }

    case 'infinity':
      return {
        container: {
          ...baseContainer,
          width: size * 1.5,
          height: size * 0.75,
        },
        elements: [0, 1].map((i) => ({
          position: 'absolute' as const,
          width: size * 0.5,
          height: size * 0.5,
          border: `${size * 0.1}px solid transparent`,
          borderTopColor: color,
          borderRadius: '50%',
          left: i === 0 ? 0 : size * 0.5,
          animation: `flib-spin ${duration}s linear infinite ${i === 0 ? '' : 'reverse'}`,
        }))
      }

    case 'ripple':
      return {
        container: baseContainer,
        elements: [0, 1].map((i) => ({
          position: 'absolute' as const,
          width: size,
          height: size,
          border: `${size * 0.1}px solid ${color}`,
          borderRadius: '50%',
          animation: `flib-ripple ${duration * 1.5}s ease-out ${i * 0.5}s infinite`,
        }))
      }

    case 'orbit':
      return {
        container: baseContainer,
        elements: [
          {
            position: 'absolute' as const,
            width: size * 0.3,
            height: size * 0.3,
            backgroundColor: color,
            borderRadius: '50%',
          },
          {
            position: 'absolute' as const,
            width: size * 0.15,
            height: size * 0.15,
            backgroundColor: color,
            borderRadius: '50%',
            animation: `flib-orbit ${duration}s linear infinite`,
          }
        ]
      }

    case 'atom':
      return {
        container: baseContainer,
        elements: [
          {
            position: 'absolute' as const,
            width: size * 0.2,
            height: size * 0.2,
            backgroundColor: color,
            borderRadius: '50%',
          },
          ...[0, 1, 2].map((i) => ({
            position: 'absolute' as const,
            width: size,
            height: size,
            border: `${size * 0.03}px solid ${color}40`,
            borderTopColor: color,
            borderRadius: '50%',
            transform: `rotate(${i * 60}deg)`,
            animation: `flib-spin ${duration * 1.5}s linear infinite`,
          }))
        ]
      }

    case 'dna':
      return {
        container: { ...baseContainer, gap: size * 0.1, flexDirection: 'column' as const },
        elements: [0, 1, 2, 3].map((i) => ({
          display: 'flex',
          justifyContent: 'space-between',
          width: size * 0.8,
          animation: `flib-scale ${duration}s ease-in-out ${i * 0.15}s infinite`,
        }))
      }

    case 'pacman':
      return {
        container: { ...baseContainer, gap: size * 0.1 },
        elements: [
          {
            width: size * 0.5,
            height: size * 0.5,
            backgroundColor: color,
            borderRadius: '50%',
            clipPath: 'polygon(100% 50%, 50% 0%, 50% 100%)',
            animation: `flib-pulse ${duration * 0.3}s ease-in-out infinite`,
          },
          ...[0, 1, 2].map((i) => ({
            width: size * 0.1,
            height: size * 0.1,
            backgroundColor: color,
            borderRadius: '50%',
            animation: `flib-fade ${duration}s ease-in-out ${i * 0.2}s infinite`,
          }))
        ]
      }

    case 'clock':
      return {
        container: {
          ...baseContainer,
          border: `${size * 0.05}px solid ${color}`,
          borderRadius: '50%',
        },
        elements: [
          {
            position: 'absolute' as const,
            width: size * 0.04,
            height: size * 0.3,
            backgroundColor: color,
            borderRadius: size * 0.02,
            transformOrigin: 'bottom center',
            bottom: '50%',
            animation: `flib-spin ${duration * 2}s linear infinite`,
          },
          {
            position: 'absolute' as const,
            width: size * 0.03,
            height: size * 0.2,
            backgroundColor: color,
            borderRadius: size * 0.02,
            transformOrigin: 'bottom center',
            bottom: '50%',
            animation: `flib-spin ${duration * 12}s linear infinite`,
          }
        ]
      }

    case 'gear':
      return {
        container: {
          ...baseContainer,
          fontSize: size * 0.8,
          color: color,
          animation: `flib-spin ${duration * 2}s linear infinite`,
        }
      }

    case 'flower':
      return {
        container: {
          ...baseContainer,
          animation: `flib-spin ${duration * 3}s linear infinite`,
        },
        elements: Array(8).fill(0).map((_, i) => ({
          position: 'absolute' as const,
          width: size * 0.2,
          height: size * 0.35,
          backgroundColor: color,
          borderRadius: '50%',
          transform: `rotate(${i * 45}deg) translateY(${-size * 0.2}px)`,
          opacity: 0.7 + (i * 0.03),
        }))
      }

    case 'spiral':
      return {
        container: {
          ...baseContainer,
          animation: `flib-spin ${duration}s linear infinite`,
        },
        elements: Array(6).fill(0).map((_, i) => ({
          position: 'absolute' as const,
          width: size * (0.1 + i * 0.03),
          height: size * (0.1 + i * 0.03),
          backgroundColor: color,
          borderRadius: '50%',
          transform: `rotate(${i * 60}deg) translateX(${size * 0.15 * (i + 1)}px)`,
          opacity: 0.3 + (i * 0.12),
        }))
      }

    case 'windmill':
      return {
        container: {
          ...baseContainer,
          animation: `flib-spin ${duration * 1.5}s linear infinite`,
        },
        elements: Array(4).fill(0).map((_, i) => ({
          position: 'absolute' as const,
          width: size * 0.15,
          height: size * 0.4,
          backgroundColor: color,
          borderRadius: `${size * 0.08}px ${size * 0.08}px 0 0`,
          transformOrigin: 'bottom center',
          transform: `rotate(${i * 90}deg)`,
        }))
      }

    case 'seesaw':
      return {
        container: baseContainer,
        elements: [{
          width: size * 0.8,
          height: size * 0.1,
          backgroundColor: color,
          borderRadius: size * 0.05,
          animation: `flib-spin ${duration}s ease-in-out infinite alternate`,
          transformOrigin: 'center center',
        }]
      }

    // PROGRESS SPINNERS
    case 'progress-bar':
      return {
        container: {
          ...baseContainer,
          width: size * 2,
          height: size * 0.15,
          backgroundColor: `${color}30`,
          borderRadius: size * 0.1,
          overflow: 'hidden',
        },
        elements: [{
          position: 'absolute' as const,
          height: '100%',
          width: '35%',
          backgroundColor: color,
          borderRadius: size * 0.1,
          animation: `flib-progress ${duration * 2}s ease-in-out infinite`,
        }]
      }

    case 'progress-orbit':
      return {
        container: {
          ...baseContainer,
          border: `${size * 0.05}px solid ${color}30`,
          borderRadius: '50%',
        },
        elements: [{
          position: 'absolute' as const,
          width: size * 0.15,
          height: size * 0.15,
          backgroundColor: color,
          borderRadius: '50%',
          animation: `flib-orbit ${duration}s linear infinite`,
          transformOrigin: `${size * 0.5}px center`,
        }]
      }

    case 'meter':
      return {
        container: {
          ...baseContainer,
          width: size * 1.5,
          height: size * 0.2,
          backgroundColor: `${color}30`,
          borderRadius: size * 0.1,
          overflow: 'hidden',
        },
        elements: [{
          position: 'absolute' as const,
          left: 0,
          height: '100%',
          backgroundColor: color,
          borderRadius: size * 0.1,
          animation: `flib-line-scale ${duration * 1.5}s ease-in-out infinite`,
          transformOrigin: 'left center',
          width: '100%',
        }]
      }

    default:
      // Default to circle
      return {
        container: {
          ...baseContainer,
          border: `${size * 0.1}px solid ${color}20`,
          borderTopColor: color,
          borderRadius: '50%',
          animation: `flib-spin ${duration * 0.75}s linear infinite`,
        }
      }
  }
}

/**
 * Get special content for spinners that use text/emoji
 */
export function getSpinnerContent(type: SpinnerType): string | null {
  switch (type) {
    case 'heart-beat':
      return '❤️'
    case 'hourglass':
      return '⏳'
    case 'gear':
      return '⚙️'
    default:
      return null
  }
}
