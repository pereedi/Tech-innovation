import { useEffect } from 'react'

const VERTEX_SHADER = `
attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`

const FRAGMENT_SHADER = `
precision highp float;
varying vec2 v_texCoord;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
}

void main() {
    vec2 uv = v_texCoord;
    vec2 mouse = u_mouse / u_resolution;
    
    // Background base — deep navy
    vec3 color = vec3(0.02, 0.02, 0.05);
    
    // Animated blue/purple flows
    float flow  = sin(uv.x * 2.0 + u_time * 0.5) * 0.5 + 0.5;
    float flow2 = cos(uv.y * 3.0 - u_time * 0.3) * 0.5 + 0.5;
    
    vec3 accent1 = vec3(0.18, 0.35, 1.0); // Electric Blue
    vec3 accent2 = vec3(0.44, 0.0,  1.0); // Deep Purple
    
    color += accent1 * pow(flow  * (1.0 - uv.y), 3.0) * 0.4;
    color += accent2 * pow(flow2 * uv.y, 3.0) * 0.3;
    
    // Cyan grid lines
    vec2 grid  = fract(uv * 20.0);
    float lines = step(0.98, grid.x) + step(0.98, grid.y);
    color += vec3(0.0, 0.95, 1.0) * lines * 0.05;
    
    // Mouse glow
    float dist = distance(uv, mouse);
    float glow = smoothstep(0.3, 0.0, dist);
    color += accent1 * glow * 0.2;
    
    // Subtle noise
    color += (hash(uv + u_time) - 0.5) * 0.02;

    gl_FragColor = vec4(color, 1.0);
}
`

function createShader(gl: WebGLRenderingContext, type: number, src: string): WebGLShader {
  const s = gl.createShader(type)!
  gl.shaderSource(s, src)
  gl.compileShader(s)
  return s
}

/**
 * Attaches a full-screen WebGL shader to the given canvas ref.
 * Returns a cleanup function (cancels RAF + observer).
 */
export function useShaderCanvas(canvasRef: React.RefObject<HTMLCanvasElement | null>): void {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // ── Sync canvas drawing buffer to CSS layout size ──────────────────
    function syncSize() {
      if (!canvas) return
      const w = canvas.clientWidth || 1280
      const h = canvas.clientHeight || 720
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
      }
    }

    let ro: ResizeObserver | null = null
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(syncSize)
      ro.observe(canvas)
    }
    syncSize()

    // ── WebGL setup ──────────────────────────────────────────────────
    const gl = (canvas.getContext('webgl') ?? canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null
    if (!gl) return

    const prog = gl.createProgram()!
    gl.attachShader(prog, createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER))
    gl.attachShader(prog, createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER))
    gl.linkProgram(prog)
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)

    const pos = gl.getAttribLocation(prog, 'a_position')
    gl.enableVertexAttribArray(pos)
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0)

    const uTime  = gl.getUniformLocation(prog, 'u_time')
    const uRes   = gl.getUniformLocation(prog, 'u_resolution')
    const uMouse = gl.getUniformLocation(prog, 'u_mouse')

    // ── Mouse tracking ────────────────────────────────────────────────
    const mouse = { x: canvas.width / 2, y: canvas.height / 2 }

    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect()
      if (rect.width && rect.height) {
        const nx = (e.clientX - rect.left) / rect.width
        const ny = 1.0 - (e.clientY - rect.top) / rect.height
        mouse.x = nx * canvas!.width
        mouse.y = ny * canvas!.height
      }
    }
    window.addEventListener('mousemove', onMouseMove)

    // ── Render loop ───────────────────────────────────────────────────
    let rafId = 0
    function render(t: number) {
      if (typeof ResizeObserver === 'undefined') syncSize()
      gl!.viewport(0, 0, canvas!.width, canvas!.height)
      if (uTime)  gl!.uniform1f(uTime, t * 0.001)
      if (uRes)   gl!.uniform2f(uRes, canvas!.width, canvas!.height)
      if (uMouse) gl!.uniform2f(uMouse, mouse.x, mouse.y)
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4)
      rafId = requestAnimationFrame(render)
    }
    rafId = requestAnimationFrame(render)

    // ── Cleanup ───────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMouseMove)
      ro?.disconnect()
    }
  }, [canvasRef])
}
