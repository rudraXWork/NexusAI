'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const CASES = [
  {
    client: 'Meridian Health',
    date: '// 2026',
    title: 'Real-Time Claims Pipeline',
    desc: 'Reduced claims processing time from',
    highlight: '4 days → 23 min',
    descEnd: 'using NexusAI\'s automated triage pipeline and ML-assisted document parsing.',
  },
  {
    client: 'Atlas Financial',
    date: '// 2026',
    title: 'Market Data Orchestration',
    desc: 'Replaced 6 manual ETL scripts with a single NexusAI workflow, cutting infrastructure costs by',
    highlight: '68%',
    descEnd: 'in the first quarter.',
  },
  {
    client: 'Vertex Logistics',
    date: '// 2026',
    title: 'Supply Chain Intelligence',
    desc: 'Deployed real-time inventory anomaly detection across 400 warehouses, achieving',
    highlight: '99.2% stock accuracy',
    descEnd: '.',
  },
]

const LOGOS = [
  'Snowflake', 'BigQuery', 'Kafka', 'dbt',
  'Airflow', 'Postgres', 'Redshift', 'S3',
  'Databricks', 'Fivetran', 'Looker', 'Spark',
  'Airbyte', 'Tableau', 'Amplitude', 'Segment',
]

export default function SocialProof() {
  const [activeIdx, setActiveIdx] = useState(0)
  const sectionRef   = useRef<HTMLElement>(null)
  const caseRefs     = useRef<(HTMLLIElement | null)[]>([])
  const clientRefs   = useRef<(HTMLDivElement | null)[]>([])
  const headerRef    = useRef<HTMLDivElement>(null)
  const btnRef       = useRef<HTMLAnchorElement>(null)
  const logosRef     = useRef<HTMLUListElement>(null)
  const indicatorRef = useRef<HTMLSpanElement>(null)

  // Scroll-reveal via IntersectionObserver
  useEffect(() => {
    const HIDDEN: Keyframe[] = [{ opacity: 0, transform: 'translateY(24px)' }]
    const VISIBLE: Keyframe[] = [{ opacity: 1, transform: 'translateY(0)' }]
    const LEFT_IN: Keyframe[] = [{ opacity: 0, transform: 'translateX(-20px)' }]

    const opts: KeyframeAnimationOptions = {
      duration: 400,
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
      fill: 'forwards',
    }

    const targets: { el: Element; delay: number; from?: Keyframe[] }[] = [
      ...(headerRef.current ? [{ el: headerRef.current, delay: 0 }] : []),
      ...clientRefs.current.flatMap((el, i) =>
        el ? [{ el, delay: i * 80, from: LEFT_IN }] : []
      ),
      ...caseRefs.current.flatMap((el, i) =>
        el ? [{ el, delay: i * 100 }] : []
      ),
      ...(btnRef.current ? [{ el: btnRef.current, delay: 300 }] : []),
    ]

    // set everything invisible initially
    targets.forEach(({ el }) => {
      ;(el as HTMLElement).style.opacity = '0'
    })

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const found = targets.find((t) => t.el === entry.target)
          if (!found) return
          const from = found.from ?? HIDDEN
          entry.target.animate([...from, ...VISIBLE], {
            ...opts,
            delay: found.delay,
          })
          io.unobserve(entry.target)
        })
      },
      { threshold: 0.15 }
    )

    targets.forEach(({ el }) => io.observe(el))

    return () => io.disconnect()
  }, [])

  // Logo grid stagger on scroll
  useEffect(() => {
    if (!logosRef.current) return
    const items = Array.from(logosRef.current.children) as HTMLElement[]
    items.forEach((el) => { el.style.opacity = '0' })

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          items.forEach((el, i) => {
            el.animate(
              [{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 0.6, transform: 'translateY(0)' }],
              { duration: 300, delay: i * 40, easing: 'ease-out', fill: 'forwards' }
            )
          })
          io.unobserve(entry.target)
        })
      },
      { threshold: 0.2 }
    )
    io.observe(logosRef.current)
    return () => io.disconnect()
  }, [])

  // Slide indicator using translateY only (GPU composited — no top/height animation)
  useEffect(() => {
    const activeClient = clientRefs.current[activeIdx]
    const indicator    = indicatorRef.current
    if (!activeClient || !indicator) return
    indicator.style.transform = `translateY(${activeClient.offsetTop}px)`
  }, [activeIdx])

  return (
    <>
      {/* Light section */}
      <section
        ref={sectionRef}
        id="social-proof"
        aria-label="Client outcomes"
        style={{ background: 'var(--arctic)', padding: '100px 0', overflow: 'hidden' }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>

          {/* Header */}
          <div ref={headerRef} style={{ marginBottom: 56 }}>
            <span
              className="eyebrow"
              style={{ color: 'var(--nocturnal)', marginBottom: 8 }}
            >
              /// CLIENT OUTCOMES
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-jetbrains)',
                fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
                fontWeight: 700,
                color: 'var(--noir)',
                marginTop: 10,
              }}
            >
              Real teams. Real results.
            </h2>
          </div>

          <div
            style={{ display: 'grid', gridTemplateColumns: '40fr 60fr', gap: 64 }}
            className="cases-grid"
          >
            {/* Left — client names with sliding indicator */}
            <div style={{ position: 'relative' }}>
              {/* animated indicator bar */}
              <span
                ref={indicatorRef}
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  left: 0,
                  width: 3,
                  background: 'var(--nocturnal)',
                  borderRadius: 2,
                  transition: 'transform 300ms cubic-bezier(0.16,1,0.3,1)',
                  top: 0,
                  height: 72,
                }}
              />

              {CASES.map((c, i) => (
                <div
                  key={c.client}
                  ref={(el) => { clientRefs.current[i] = el }}
                  onClick={() => setActiveIdx(i)}
                  style={{
                    padding: '24px 16px 24px 24px',
                    borderBottom: '1px solid rgba(23,43,54,0.1)',
                    background: activeIdx === i ? 'rgba(17,76,90,0.06)' : 'transparent',
                    transition: 'background 250ms ease-out',
                    cursor: 'pointer',
                    borderRadius: activeIdx === i ? 4 : 0,
                    userSelect: 'none',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-jetbrains)',
                      fontSize: 20,
                      fontWeight: 600,
                      color: activeIdx === i ? 'var(--nocturnal)' : 'rgba(23,43,54,0.45)',
                      transition: 'color 250ms ease-out',
                    }}
                  >
                    {c.client}
                  </span>
                  {/* mini progress bar under active */}
                  <div
                    style={{
                      height: 2,
                      background: 'var(--nocturnal)',
                      borderRadius: 1,
                      marginTop: 10,
                      transformOrigin: 'left',
                      transform: activeIdx === i ? 'scaleX(1)' : 'scaleX(0)',
                      transition: 'transform 400ms cubic-bezier(0.16,1,0.3,1)',
                      opacity: 0.3,
                      maxWidth: 120,
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Right — case entries */}
            <ul style={{ listStyle: 'none' }}>
              {CASES.map((c, i) => (
                <li
                  key={c.title}
                  ref={(el) => { caseRefs.current[i] = el }}
                  style={{
                    padding: '24px 0',
                    borderBottom: '1px solid rgba(23,43,54,0.12)',
                    opacity: activeIdx === i ? 1 : 0.45,
                    transition: 'opacity 250ms ease-out',
                  }}
                  onMouseEnter={() => setActiveIdx(i)}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-jetbrains)',
                      fontSize: 12,
                      color: 'var(--nocturnal)',
                      opacity: 0.5,
                      display: 'block',
                      marginBottom: 8,
                    }}
                  >
                    {c.date}
                  </span>

                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                    <div>
                      <h3
                        style={{
                          fontFamily: 'var(--font-jetbrains)',
                          fontSize: 18,
                          fontWeight: 600,
                          color: 'var(--noir)',
                          marginBottom: 10,
                        }}
                      >
                        {c.title}
                      </h3>
                      <p
                        style={{
                          fontFamily: 'var(--font-inter)',
                          fontSize: 14,
                          color: 'rgba(23,43,54,0.65)',
                          lineHeight: 1.6,
                        }}
                      >
                        {c.desc}{' '}
                        <strong
                          style={{
                            color: 'var(--nocturnal)',
                            fontWeight: 700,
                            fontFamily: 'var(--font-jetbrains)',
                            fontSize: 13,
                            background: 'rgba(17,76,90,0.08)',
                            padding: '1px 6px',
                            borderRadius: 3,
                          }}
                        >
                          {c.highlight}
                        </strong>
                        {' '}{c.descEnd}
                      </p>
                    </div>

                    {/* >> arrow */}
                    <span
                      aria-hidden="true"
                      style={{
                        fontFamily: 'var(--font-jetbrains)',
                        fontSize: 14,
                        color: 'var(--nocturnal)',
                        opacity: activeIdx === i ? 1 : 0,
                        transform: activeIdx === i ? 'translateX(0)' : 'translateX(-6px)',
                        transition: 'opacity 200ms ease-out, transform 200ms ease-out',
                        flexShrink: 0,
                        marginTop: 4,
                        fontWeight: 700,
                      }}
                    >
                      {`>>`}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* More Case Studies */}
          <a
            ref={btnRef}
            href="#"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              marginTop: 40,
              border: '1.5px solid var(--nocturnal)',
              color: 'var(--nocturnal)',
              background: 'transparent',
              fontFamily: 'var(--font-inter)',
              fontSize: 14,
              padding: '10px 22px',
              borderRadius: 6,
              textDecoration: 'none',
              transition: 'background 150ms ease-out, color 150ms ease-out',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--nocturnal)'
              e.currentTarget.style.color = 'var(--arctic)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = 'var(--nocturnal)'
            }}
          >
            <Image
              src="/arrow-path.svg"
              alt=""
              width={16}
              height={16}
              style={{ filter: 'invert(1) sepia(1) saturate(2) hue-rotate(155deg)' }}
            />
            More Case Studies
          </a>
        </div>
      </section>

      {/* Dark integrations grid */}
      <section
        aria-label="Integrations logo grid"
        style={{ background: 'var(--noir)', padding: '80px 0' }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <span className="eyebrow">/// INTEGRATIONS</span>
            <Image
              src="/link-solid.svg"
              alt=""
              width={14}
              height={14}
              style={{ filter: 'invert(1) sepia(1) saturate(3) hue-rotate(5deg)', opacity: 0.8 }}
            />
          </div>
          <h3
            style={{
              fontFamily: 'var(--font-jetbrains)',
              fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)',
              fontWeight: 700,
              color: 'var(--arctic)',
              marginBottom: 12,
            }}
          >
            Connect with your entire stack.
          </h3>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: 16, color: 'var(--mint)', marginBottom: 48 }}>
            200+ native connectors. More added weekly.
          </p>

          <ul
            ref={logosRef}
            aria-label="Supported integrations"
            style={{
              listStyle: 'none',
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '20px 0',
            }}
            className="logo-grid"
          >
            {LOGOS.map((name) => (
              <li key={name}>
                <span
                  style={{
                    fontFamily: 'var(--font-jetbrains)',
                    fontSize: 15,
                    color: 'var(--mint)',
                    cursor: 'default',
                    transition: 'opacity 150ms ease-out, color 150ms ease-out',
                    display: 'inline-block',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '1'
                    e.currentTarget.style.color = 'var(--arctic)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '0.6'
                    e.currentTarget.style.color = 'var(--mint)'
                  }}
                >
                  {name}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <style>{`
          @media (max-width: 767px) {
            .cases-grid { grid-template-columns: 1fr !important; gap: 0 !important; }
            .logo-grid  { grid-template-columns: repeat(2, 1fr) !important; }
          }
        `}</style>
      </section>
    </>
  )
}
