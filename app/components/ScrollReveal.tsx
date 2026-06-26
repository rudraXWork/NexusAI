'use client'

import { useEffect } from 'react'

// Observes all <section> and <footer> elements except the first (Hero).
// Hides them below the fold on mount, then fades+slides them in on enter.
export default function ScrollReveal() {
  useEffect(() => {
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>('main > section, footer')
    )

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const el = entry.target as HTMLElement
        el.animate(
          [
            { opacity: '0', transform: 'translateY(28px)' },
            { opacity: '1', transform: 'translateY(0)' },
          ],
          { duration: 560, easing: 'cubic-bezier(0.16,1,0.3,1)', fill: 'forwards' }
        )
        io.unobserve(el)
      })
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' })

    targets.forEach((el, i) => {
      if (i === 0) return // skip Hero — it has its own entry animation
      // Only hide if below the current viewport
      if (el.getBoundingClientRect().top > window.innerHeight * 0.9) {
        el.style.opacity = '0'
        el.style.transform = 'translateY(28px)'
      }
      io.observe(el)
    })

    return () => io.disconnect()
  }, [])

  return null
}
