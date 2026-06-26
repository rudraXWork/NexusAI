'use client'

import { useEffect } from 'react'

// CSS in layout.tsx already hides these elements before paint (no jerk).
// This just adds .sr-visible when they enter the viewport.
export default function ScrollReveal() {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(
      'main > section:not(:first-child), main > div, footer'
    )

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('sr-visible')
        io.unobserve(entry.target)
      })
    }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' })

    targets.forEach((el) => io.observe(el))

    return () => io.disconnect()
  }, [])

  return null
}
