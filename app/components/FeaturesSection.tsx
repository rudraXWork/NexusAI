'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const FEATURES = [
  { id: 0, icon: 'cog-8-tooth.svg',      title: 'Intelligent Pipelines',  desc: 'Automate multi-step data flows with conditional branching, retries, and zero manual intervention.' },
  { id: 1, icon: 'chart-pie.svg',         title: 'Live Analytics',         desc: 'Monitor data streams in real-time with sub-second latency dashboards and anomaly alerting.' },
  { id: 2, icon: 'link-solid.svg',        title: 'One-Click Integrations', desc: 'Connect 200+ sources and destinations with OAuth in seconds. No custom connectors needed.' },
  { id: 3, icon: 'arrow-trending-up.svg', title: 'Trend Intelligence',     desc: 'Spot patterns and anomalies before they cascade. ML-powered signal detection on every stream.' },
  { id: 4, icon: 'arrow-path.svg',        title: 'Orchestration Engine',   desc: 'Schedule, version, and retry every pipeline run. Full audit trail and dependency graph included.' },
  { id: 5, icon: 'cube-16-solid.svg',     title: 'Modular Blocks',         desc: 'Compose complex workflows from reusable atomic components. Build once, deploy everywhere.' },
]

// bento grid areas: [col-start, col-end, row]
const BENTO = [
  { colStart: 1, colEnd: 3, row: 1 }, // large card
  { colStart: 3, colEnd: 4, row: 1 },
  { colStart: 1, colEnd: 2, row: 2 },
  { colStart: 2, colEnd: 3, row: 2 },
  { colStart: 3, colEnd: 4, row: 2 },
  { colStart: 1, colEnd: 4, row: 3 }, // full-width last
]

export default function FeaturesSection() {
  const [activeIdx, setActiveIdx] = useState(0)
  const hoverRef = useRef(0)
  const wasDesktopRef = useRef(true)
  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sentinelRef.current) return
    const ro = new ResizeObserver((entries) => {
      const w = entries[0].contentRect.width
      const isNowMobile = w < 768
      const wasDesktop = wasDesktopRef.current
      if (wasDesktop && isNowMobile) {
        setActiveIdx(hoverRef.current)
      }
      wasDesktopRef.current = !isNowMobile
    })
    ro.observe(sentinelRef.current)
    return () => ro.disconnect()
  }, [])

  return (
    <section
      id="features"
      aria-label="Core features"
      className="dot-grid"
      style={{
        background: 'var(--noir)',
        padding: '100px 0',
      }}
    >
      {/* sentinel for ResizeObserver */}
      <div
        ref={sentinelRef}
        aria-hidden="true"
        style={{ position: 'absolute', width: '100%', height: 1, pointerEvents: 'none' }}
      />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        {/* Section header */}
        <div style={{ marginBottom: 56 }}>
          <span className="eyebrow" style={{ marginBottom: 16 }}>/// CORE FEATURES</span>
          <h2
            style={{
              fontFamily: 'var(--font-jetbrains)',
              fontSize: 'clamp(2rem, 3.5vw, 3rem)',
              fontWeight: 700,
              color: 'var(--arctic)',
              marginBottom: 12,
            }}
          >
            Everything your data pipeline needs.
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: 16,
              color: 'var(--mint)',
            }}
          >
            Six capabilities. One unified platform.
          </p>
        </div>

        {/* Desktop bento grid */}
        <div className="features-bento">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 16,
            }}
          >
            {FEATURES.map((f, i) => {
              const isLarge = i === 0
              const isActive = activeIdx === f.id
              return (
                <article
                  key={f.id}
                  className="bracket-card"
                  onMouseEnter={() => {
                    hoverRef.current = f.id
                    setActiveIdx(f.id)
                  }}
                  style={{
                    gridColumn: `${BENTO[i].colStart} / ${BENTO[i].colEnd}`,
                    gridRow: BENTO[i].row,
                    background: 'var(--nocturnal)',
                    border: isActive
                      ? '1px solid rgba(255,200,1,0.45)'
                      : '1px solid rgba(241,246,244,0.07)',
                    borderRadius: 14,
                    padding: 28,
                    cursor: 'pointer',
                    transition: 'border-color 150ms ease-out, box-shadow 150ms ease-out, transform 150ms ease-out',
                    boxShadow: isActive
                      ? '0 0 0 1px rgba(255,200,1,0.15), 0 8px 32px rgba(255,200,1,0.08)'
                      : 'none',
                    transform: isActive ? 'translateY(-2px)' : 'none',
                    overflow: 'hidden',
                  }}
                  aria-selected={isActive}
                >
                  <Image
                    src={`/${f.icon}`}
                    alt={f.title}
                    width={28}
                    height={28}
                    style={{
                      filter: 'brightness(0) invert(1)',
                      marginBottom: 20,
                      animation: isActive ? 'pulseGlow 1s ease-in-out infinite' : 'none',
                    }}
                  />
                  <h3
                    style={{
                      fontFamily: 'var(--font-jetbrains)',
                      fontSize: isLarge ? 24 : 18,
                      fontWeight: 600,
                      color: 'var(--arctic)',
                    }}
                  >
                    {f.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-inter)',
                      fontSize: 14,
                      color: 'var(--mint)',
                      lineHeight: 1.6,
                      marginTop: 10,
                    }}
                  >
                    {f.desc}
                  </p>

                  {/* Large card pipeline bars */}
                  {isLarge && (
                    <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {[
                        { width: '80%', delay: '0s' },
                        { width: '55%', delay: '0.4s' },
                        { width: '70%', delay: '0.8s' },
                      ].map((bar, bi) => (
                        <div
                          key={bi}
                          style={{
                            height: 4,
                            width: bar.width,
                            borderRadius: 2,
                            background: isActive
                              ? `linear-gradient(90deg, var(--forsythia), var(--saffron), var(--forsythia))`
                              : `linear-gradient(90deg, rgba(255,200,1,0.2), rgba(255,200,1,0.2))`,
                            backgroundSize: '200% auto',
                            animation: isActive
                              ? `shimmer 2s linear ${bar.delay} infinite`
                              : 'none',
                          }}
                        />
                      ))}
                    </div>
                  )}
                </article>
              )
            })}
          </div>
        </div>

        {/* Mobile accordion */}
        <div className="features-accordion">
          {FEATURES.map((f) => {
            const isOpen = activeIdx === f.id
            return (
              <div key={f.id} style={{ borderBottom: '1px solid rgba(241,246,244,0.08)' }}>
                <button
                  aria-expanded={isOpen}
                  onClick={() => setActiveIdx(isOpen ? -1 : f.id)}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    padding: '18px 0',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Image
                      src={`/${f.icon}`}
                      alt=""
                      width={20}
                      height={20}
                      style={{ filter: 'brightness(0) invert(1)', flexShrink: 0 }}
                    />
                    <span
                      style={{
                        fontFamily: 'var(--font-jetbrains)',
                        fontSize: 16,
                        color: 'var(--arctic)',
                      }}
                    >
                      {f.title}
                    </span>
                  </span>
                  <Image
                    src="/chevron-down.svg"
                    alt=""
                    width={16}
                    height={16}
                    style={{
                      filter: 'brightness(0) invert(1)',
                      flexShrink: 0,
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 200ms ease-out',
                    }}
                  />
                </button>

                {/* Accordion body — grid-template-rows */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateRows: isOpen ? '1fr' : '0fr',
                    transition: 'grid-template-rows 350ms ease-in-out',
                  }}
                >
                  <div style={{ overflow: 'hidden', minHeight: 0 }}>
                    <p
                      style={{
                        fontFamily: 'var(--font-inter)',
                        fontSize: 14,
                        color: 'var(--mint)',
                        lineHeight: 1.6,
                        padding: '0 0 20px 32px',
                      }}
                    >
                      {f.desc}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .features-accordion { display: none !important; }
        }
        @media (max-width: 767px) {
          .features-bento { display: none !important; }
        }
      `}</style>
    </section>
  )
}
