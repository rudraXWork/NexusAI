'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

const STATS = [
  { target: 12,   suffix: 'ms', decimals: 0, label: 'Average latency for real-time data inference' },
  { target: 10,   suffix: '×',  decimals: 0, label: 'Faster than manual pipeline configuration' },
  { target: 99.9, suffix: '%',  decimals: 1, label: 'Uptime SLA for production deployments' },
]

const DURATION = 1800

function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const spanRefs = useRef<(HTMLSpanElement | null)[]>([])
  const fired = useRef(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || fired.current) return
      fired.current = true
      io.disconnect()

      const start = performance.now()

      function tick(now: number) {
        const elapsed = now - start
        const t = Math.min(elapsed / DURATION, 1)
        const eased = easeOut(t)

        STATS.forEach((s, i) => {
          const el = spanRefs.current[i]
          if (!el) return
          const val = s.target * eased
          el.textContent = val.toFixed(s.decimals) + s.suffix
        })

        if (t < 1) requestAnimationFrame(tick)
      }

      requestAnimationFrame(tick)
    }, { threshold: 0.3 })

    io.observe(section)
    return () => io.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      aria-label="Platform statistics"
      style={{ background: 'var(--noir)', padding: '100px 0' }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 24px',
          display: 'grid',
          gridTemplateColumns: '45fr 55fr',
          gap: 64,
          alignItems: 'center',
        }}
        className="stats-grid"
      >
        {/* Left */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <span className="eyebrow">/// BY THE NUMBERS</span>
            <Image
              src="/chart-pie.svg"
              alt=""
              width={16}
              height={16}
              style={{ filter: 'invert(1) sepia(1) saturate(3) hue-rotate(5deg)', flexShrink: 0 }}
            />
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-jetbrains)',
              fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
              fontWeight: 700,
              color: 'var(--arctic)',
              lineHeight: 1.15,
              marginBottom: 20,
            }}
          >
            Quantifiable impact at every scale.
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: 16,
              color: 'var(--mint)',
              lineHeight: 1.7,
              marginBottom: 32,
            }}
          >
            We measure success by pipeline velocity, data fidelity, and the
            time your team gets back.
          </p>
          <ReportButton />
        </div>

        {/* Right — stat cards */}
        <div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}
          className="stat-cards"
        >
          {STATS.map((s, i) => (
            <article
              key={s.suffix}
              className="bracket-card"
              style={{
                background: 'rgba(17,76,90,0.3)',
                border: '1px solid rgba(241,246,244,0.07)',
                borderRadius: 12,
                padding: '32px 24px',
              }}
            >
              <span
                ref={el => { spanRefs.current[i] = el }}
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-jetbrains)',
                  fontSize: 'clamp(2.4rem, 4vw, 3.2rem)',
                  fontWeight: 700,
                  color: 'var(--forsythia)',
                  lineHeight: 1,
                }}
              >
                0{s.suffix}
              </span>
              <p
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: 13,
                  color: 'var(--mint)',
                  lineHeight: 1.5,
                  marginTop: 8,
                }}
              >
                {s.label}
              </p>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .stats-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .stat-cards { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

function ReportButton() {
  return (
    <a
      href="#"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        border: '1.5px solid rgba(241,246,244,0.2)',
        color: 'var(--arctic)',
        background: 'transparent',
        fontFamily: 'var(--font-inter)',
        fontSize: 14,
        padding: '10px 22px',
        borderRadius: 6,
        textDecoration: 'none',
        transition: 'border-color 150ms ease-out, color 150ms ease-out',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--forsythia)'
        e.currentTarget.style.color = 'var(--forsythia)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(241,246,244,0.2)'
        e.currentTarget.style.color = 'var(--arctic)'
      }}
    >
      <Image src="/arrow-trending-up.svg" alt="" width={16} height={16}
        style={{ filter: 'brightness(0) invert(1)' }} />
      View Full Report
    </a>
  )
}
