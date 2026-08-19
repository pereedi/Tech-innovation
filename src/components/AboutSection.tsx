import { useRef, useEffect } from 'react'

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  // Fade-in on scroll
  useEffect(() => {
    const el = sectionRef.current
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
  }, [])

  return (
    <section id="about" className="py-24 bg-surface-container-lowest">
      <div className="container mx-auto px-margin-mobile md:px-margin-desktop max-w-container-max">
        <div
          ref={sectionRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center fade-in-section"
        >
          {/* Left — heading + accent bar */}
          <div>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg mb-6 tracking-tight text-on-surface">
              Technology With Purpose.
            </h2>
            <div className="h-1 w-24 bg-primary mb-8 rounded-full" />
          </div>

          {/* Right — body copy */}
          <div>
            <p className="font-body-md text-body-md text-on-surface-variant mb-6">
              We believe that technology should be an enabler, not a barrier. Our philosophy is
              rooted in solving complex problems through elegant, scalable systems.
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Every line of code we write and every interface we design is aimed at building a
              better, more connected future. We don&apos;t just build apps; we engineer
              experiences that matter.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
