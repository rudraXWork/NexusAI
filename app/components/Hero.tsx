'use client'

import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'

const NeuralBackground = dynamic(() => import('./NeuralBackground'), { ssr: false })

const TRUST = ['No credit card required', '14-day free trial', 'Cancel anytime']
const WORDS = ['data', 'pipelines', 'signals', 'workflows', 'insights']

export default function Hero() {
  const itemRefs = useRef<(HTMLElement | null)[]>([])
  const wordRef = useRef<HTMLSpanElement>(null)
  const wordIdx = useRef(0)

  useEffect(() => {
    const delays = [0, 60, 120, 180, 240, 300]
    itemRefs.current.forEach((el, i) => {
      if (!el) return
      el.animate(
        [
          { opacity: '0', transform: 'translateY(16px)' },
          { opacity: '1', transform: 'translateY(0)' },
        ],
        { duration: 220, delay: delays[i] ?? 0, easing: 'ease-out', fill: 'forwards' }
      )
    })

    // Cycle words via ref — no useState, no re-render
    const tick = () => {
      const el = wordRef.current
      if (!el) return
      el.animate([{ opacity: 1, transform: 'translateY(0)' }, { opacity: 0, transform: 'translateY(-10px)' }], { duration: 200, easing: 'ease-in', fill: 'forwards' })
        .finished.then(() => {
          wordIdx.current = (wordIdx.current + 1) % WORDS.length
          el.textContent = WORDS[wordIdx.current]
          el.animate([{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 220, easing: 'ease-out', fill: 'forwards' })
        })
    }
    const id = setInterval(tick, 2200)
    return () => clearInterval(id)
  }, [])

  const ref = (i: number) => (el: HTMLElement | null) => { itemRefs.current[i] = el }

  return (
    <section
      aria-label="Hero — AI Data Automation"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        overflow: 'hidden',
        background: 'var(--noir)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <NeuralBackground />

      {/* Content — z-index 10 ensures it's above canvas */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: 740,
          padding: '120px 24px 80px',
          width: '100%',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Badge pill */}
        <div
          ref={ref(0)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(17,76,90,0.7)',
            border: '1px solid rgba(255,200,1,0.3)',
            borderRadius: 9999,
            padding: '6px 14px',
            marginBottom: 20,
          }}
        >
          <span aria-hidden="true" style={{ color: 'var(--forsythia)', fontSize: 13, lineHeight: 1 }}>✦</span>
          <span
            style={{
              fontFamily: 'var(--font-jetbrains)',
              fontSize: 11,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--forsythia)',
            }}
          >
            AI-Powered Automation
          </span>
        </div>

        {/* Eyebrow */}
        <span
          ref={ref(1)}
          className="eyebrow"
          style={{ marginBottom: 20, display: 'block' }}
        >
          /// AI DATA AUTOMATION
        </span>

        {/* H1 */}
        <h1
          ref={ref(2)}
          style={{
            fontFamily: 'var(--font-jetbrains)',
            fontWeight: 700,
            fontSize: 'clamp(2.4rem, 5.5vw, 5.2rem)',
            color: 'var(--arctic)',
            lineHeight: 1.1,
            maxWidth: 680,
            marginBottom: 24,
          }}
        >
          Automate the{' '}
          <span ref={wordRef} style={{ color: 'var(--forsythia)', display: 'inline-block' }}>data</span>
          {' '}that runs your world.
        </h1>

        {/* Subtext */}
        <p
          ref={ref(3)}
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: 'clamp(15px, 2vw, 17px)',
            color: 'var(--mint)',
            lineHeight: 1.6,
            maxWidth: 480,
            marginBottom: 40,
          }}
        >
          Connect every pipeline, source, and workflow into one intelligent layer.
          NexusAI turns your raw data into decisions — at any scale.
        </p>

        {/* CTA row */}
        <div
          ref={ref(4)}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}
        >
          <PrimaryButton />
          <SecondaryButton />
        </div>

        {/* Trust signals */}
        <ul
          ref={ref(5)}
          aria-label="Trust signals"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '10px 24px',
            listStyle: 'none',
            marginTop: 28,
          }}
        >
          {TRUST.map((t) => (
            <li
              key={t}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontFamily: 'var(--font-inter)',
                fontSize: 13,
                color: 'var(--mint)',
                opacity: 0.7,
              }}
            >
              <span aria-hidden="true" style={{ color: 'var(--forsythia)', fontSize: 14 }}>✓</span>
              {t}
            </li>
          ))}
        </ul>

        {/* Trust line */}
        <p
          style={{
            marginTop: 40,
            fontFamily: 'var(--font-inter)',
            fontSize: 13,
            color: 'var(--mint)',
            opacity: 0.5,
            fontStyle: 'italic',
          }}
        >
          · Trusted by teams processing over 10M pipelines monthly
        </p>
      </div>

      {/* Scroll hint */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
          opacity: 0.4,
          zIndex: 10,
          animation: 'fadeIn 600ms ease-out 500ms both',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-jetbrains)',
            fontSize: 10,
            letterSpacing: '0.2em',
            color: 'var(--mint)',
            textTransform: 'uppercase',
          }}
        >
          Scroll
        </span>
        <Image
          src="/chevron-down.svg"
          alt="Scroll down"
          width={14}
          height={14}
          style={{ filter: 'brightness(0) invert(1)', opacity: 0.6 }}
        />
      </div>
    </section>
  )
}

function PrimaryButton() {
  return (
    <a
      href="#features"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        background: 'var(--forsythia)',
        color: 'var(--noir)',
        fontFamily: 'var(--font-inter)',
        fontSize: 15,
        fontWeight: 600,
        padding: '14px 28px',
        borderRadius: 6,
        textDecoration: 'none',
        transition: 'background 150ms ease-out, transform 150ms ease-out, box-shadow 150ms ease-out',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'var(--saffron)'
        e.currentTarget.style.transform = 'translateY(-1px)'
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(255,200,1,0.25)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'var(--forsythia)'
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <Image src="/arrow-trending-up.svg" alt="" width={20} height={20} style={{ filter: 'brightness(0)' }} />
      Start Automating
    </a>
  )
}

function SecondaryButton() {
  return (
    <a
      href="#features"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        background: 'transparent',
        color: 'var(--mint)',
        fontFamily: 'var(--font-inter)',
        fontSize: 15,
        padding: '14px 24px',
        borderRadius: 6,
        border: '1px solid rgba(241,246,244,0.2)',
        textDecoration: 'none',
        transition: 'color 150ms ease-out, border-color 150ms ease-out',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = 'var(--arctic)'
        e.currentTarget.style.borderColor = 'rgba(241,246,244,0.5)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = 'var(--mint)'
        e.currentTarget.style.borderColor = 'rgba(241,246,244,0.2)'
      }}
    >
      Explore Features →
    </a>
  )
}
