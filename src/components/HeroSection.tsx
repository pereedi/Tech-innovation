import { useRef, useEffect } from 'react'
import ShaderBackground from './ShaderBackground'
import ThreeScene from './ThreeScene'

// ── Helper: attach an IntersectionObserver to a ref directly ─────────────
function useFadeIn(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref])
}

export default function HeroSection() {
  const heroLeftRef  = useRef<HTMLDivElement>(null)
  const heroRightRef = useRef<HTMLDivElement>(null)

  useFadeIn(heroLeftRef)
  useFadeIn(heroRightRef)

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      {/* ── WebGL Shader Background ───────────────────────────── */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <ShaderBackground />
      </div>

      {/* ── Content Grid ──────────────────────────────────────── */}
      <div className="container mx-auto px-margin-mobile md:px-margin-desktop max-w-container-max relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Left column — copy */}
        <div ref={heroLeftRef} className="fade-in-section">
          <h1 className="font-headline-xl text-headline-xl mb-6 text-on-surface tracking-tighter">
            Building What&apos;s{' '}
            <span className="gradient-text">Next.</span>
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-xl">
            We transform ideas into innovative digital solutions that connect technology, creativity, and real-world impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              id="hero-explore-btn"
              className="btn-primary px-8 py-4 rounded-full font-label-md text-label-md text-on-primary font-bold tracking-wide"
            >
              Explore Our Solutions
            </button>
            <button
              id="hero-build-btn"
              className="btn-ghost px-8 py-4 rounded-full font-label-md text-label-md text-on-surface font-medium hover:text-primary transition-colors"
            >
              Contact Us 
            </button>
          </div>
        </div>

        {/* Right column — Three.js scene (desktop only) */}
        <div
          ref={heroRightRef}
          className="relative h-[400px] lg:h-[600px] hidden md:block fade-in-section"
          style={{ transitionDelay: '200ms' }}
          aria-hidden="true"
        >
          <div className="absolute inset-0 w-full h-full">
            <ThreeScene />
          </div>
        </div>
      </div>
    </section>
  )
}
