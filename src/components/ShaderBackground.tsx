import { useRef } from 'react'
import { useShaderCanvas } from '../hooks/useShaderCanvas'

/**
 * Renders the full-screen WebGL GLSL shader background.
 * Positioned absolute to fill its parent container.
 */
export default function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useShaderCanvas(canvasRef)

  return (
    <canvas
      ref={canvasRef}
      id="shader-canvas-hero"
      aria-hidden="true"
      style={{ display: 'block', width: '100%', height: '100%' }}
    />
  )
}
