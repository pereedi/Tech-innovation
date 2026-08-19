import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// ─── Inner animated group ──────────────────────────────────────────────────

function InnovationCore() {
  const groupRef = useRef<THREE.Group>(null!)
  const partRef  = useRef<THREE.Points>(null!)

  // Particle positions — generated once, stable across renders
  const positions = useMemo(() => {
    const count = 500
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i++) {
      arr[i] = (Math.random() - 0.5) * 10
    }
    return arr
  }, [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()

    // Rotate wireframe group
    groupRef.current.rotation.y += 0.005
    groupRef.current.rotation.x += 0.002

    // Float up/down
    groupRef.current.position.y = Math.sin(t) * 0.1

    // Slowly drift particles
    partRef.current.rotation.y -= 0.001
  })

  return (
    <>
      {/* ── Lighting ─────────────────────────────────────── */}
      <ambientLight intensity={0.5} />
      <pointLight color={0x2e5bff} intensity={2} position={[5, 5, 5]} />

      {/* ── Wireframe icosahedron + inner sphere ─────────── */}
      <group ref={groupRef}>
        {/* Outer wireframe */}
        <mesh>
          <icosahedronGeometry args={[1.5, 2]} />
          <meshPhongMaterial
            color={0x00f2ff}
            wireframe
            transparent
            opacity={0.8}
          />
        </mesh>

        {/* Inner glowing sphere */}
        <mesh>
          <sphereGeometry args={[0.8, 32, 32]} />
          <meshPhongMaterial
            color={0x2e5bff}
            emissive={new THREE.Color(0x2e5bff)}
            emissiveIntensity={2}
            transparent
            opacity={0.6}
          />
        </mesh>
      </group>

      {/* ── Floating particles ────────────────────────────── */}
      <points ref={partRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.02}
          color={0xffffff}
          transparent
          opacity={0.8}
        />
      </points>
    </>
  )
}

// ─── Exported canvas wrapper ───────────────────────────────────────────────

export default function ThreeScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 75, near: 0.1, far: 1000 }}
      gl={{ alpha: true, antialias: true }}
      style={{ width: '100%', height: '100%' }}
      aria-hidden="true"
    >
      <InnovationCore />
    </Canvas>
  )
}
