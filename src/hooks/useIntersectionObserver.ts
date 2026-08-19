import { useEffect, useRef } from 'react'

interface Options extends IntersectionObserverInit {
  freezeOnceVisible?: boolean
}

/**
 * Returns a ref to attach to a DOM element and a boolean `isVisible`.
 * Once visible (and freezeOnceVisible=true), it stays visible.
 */
export function useIntersectionObserver<T extends Element>(
  options: Options = {}
): [React.RefObject<T | null>, boolean] {
  const { threshold = 0.15, root = null, rootMargin = '0px', freezeOnceVisible = true } = options
  const ref = useRef<T | null>(null)
  const visibleRef = useRef(false)

  // We need a state-like mechanism without re-renders for the class mutation approach.
  // Instead we directly toggle the class on the element (same as original).
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            visibleRef.current = true
            if (freezeOnceVisible) observer.unobserve(entry.target)
          }
        })
      },
      { threshold, root, rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, root, rootMargin, freezeOnceVisible])

  return [ref, visibleRef.current]
}
