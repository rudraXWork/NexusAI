'use client'

import { useRef } from 'react'
import Image from 'next/image'

const FOOTER_LINKS = {
  Product:  ['Features', 'Pricing', 'Integrations', 'Changelog', 'Status'],
  Company:  ['About', 'Blog', 'Careers', 'Press', 'Contact'],
  Legal:    ['Privacy Policy', 'Terms of Service', 'Security', 'Cookie Settings'],
}

function LightningBolt() {
  return (
    <svg width="20" height="24" viewBox="0 0 20 24" fill="none" aria-hidden="true">
      <path d="M11 2L3 13h7l-1 9 9-12h-7l2-8z" fill="var(--forsythia)" strokeLinejoin="round" />
    </svg>
  )
}

function FooterLink({ label }: { label: string }) {
  return (
    <a
      href="#"
      style={{
        display: 'block',
        fontFamily: 'var(--font-inter)',
        fontSize: 14,
        color: 'var(--mint)',
        textDecoration: 'none',
        padding: '6px 0',
        transition: 'color 150ms ease-out',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--arctic)')}
      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--mint)')}
    >
      {label}
    </a>
  )
}

export default function Footer() {
  const bannerRef = useRef<HTMLDivElement>(null)
  const emailRef  = useRef<HTMLInputElement>(null)

  function handleSubscribe() {
    const val = emailRef.current?.value?.trim()
    if (!val || !val.includes('@')) {
      if (emailRef.current) {
        emailRef.current.style.borderColor = 'var(--saffron)'
        setTimeout(() => {
          if (emailRef.current) emailRef.current.style.borderColor = 'rgba(241,246,244,0.15)'
        }, 1200)
      }
      return
    }
    if (emailRef.current) emailRef.current.value = ''
  }

  function dismissBanner() {
    if (bannerRef.current) bannerRef.current.style.display = 'none'
  }

  return (
    <footer id="docs" style={{ background: 'var(--noir)', borderTop: '1px solid rgba(241,246,244,0.07)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 24px 32px' }}>

        {/* Cookie banner */}
        <div
          ref={bannerRef}
          role="region"
          aria-label="Cookie notice"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'rgba(17,76,90,0.5)',
            borderRadius: 10,
            padding: '14px 20px',
            marginBottom: 32,
            gap: 16,
          }}
        >
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: 14, color: 'var(--mint)' }}>
            We use cookies to improve your experience.
          </p>
          <button
            aria-label="Dismiss cookie notice"
            onClick={dismissBanner}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, flexShrink: 0 }}
          >
            <Image
              src="/x-mark.svg"
              alt="Dismiss"
              width={20}
              height={20}
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </button>
        </div>

        {/* Newsletter CTA bar */}
        <div
          style={{
            background: 'var(--nocturnal)',
            borderRadius: 16,
            padding: 'clamp(32px, 4vw, 48px)',
            marginBottom: 64,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 40,
            alignItems: 'center',
          }}
          className="newsletter-grid"
        >
          <div>
            <span className="eyebrow" style={{ marginBottom: 12 }}>/// GET STARTED</span>
            <h3
              style={{
                fontFamily: 'var(--font-jetbrains)',
                fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
                fontWeight: 700,
                color: 'var(--arctic)',
                marginBottom: 12,
              }}
            >
              Get smarter about AI automation.
            </h3>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: 15, color: 'var(--mint)', lineHeight: 1.6 }}>
              Weekly insights on pipelines, AI workflows, and real builds.
              No noise. Just signal.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <input
              ref={emailRef}
              type="email"
              placeholder="you@company.com"
              aria-label="Email address for newsletter"
              style={{
                flex: 1,
                minWidth: 180,
                background: 'rgba(23,43,54,0.6)',
                border: '1px solid rgba(241,246,244,0.15)',
                borderRadius: 8,
                padding: '12px 16px',
                color: 'var(--arctic)',
                fontFamily: 'var(--font-inter)',
                fontSize: 14,
                outline: 'none',
                transition: 'border-color 150ms ease-out',
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--forsythia)')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(241,246,244,0.15)')}
            />
            <button
              onClick={handleSubscribe}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'var(--forsythia)',
                color: 'var(--noir)',
                fontFamily: 'var(--font-inter)',
                fontWeight: 600,
                fontSize: 14,
                padding: '12px 24px',
                borderRadius: 8,
                border: 'none',
                cursor: 'pointer',
                transition: 'background 150ms ease-out',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--saffron)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--forsythia)')}
            >
              <Image
                src="/arrow-path.svg"
                alt=""
                width={16}
                height={16}
                style={{ filter: 'brightness(0)' }}
              />
              Subscribe
            </button>
          </div>
        </div>

        {/* Bottom grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr',
            gap: 40,
          }}
          className="footer-grid"
        >
          {/* Brand col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <LightningBolt />
              <span
                style={{
                  fontFamily: 'var(--font-jetbrains)',
                  fontWeight: 700,
                  fontSize: 18,
                  color: 'var(--arctic)',
                }}
              >
                NexusAI
              </span>
            </div>
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 13,
                color: 'var(--mint)',
                marginTop: 12,
              }}
            >
              Automate everything. Miss nothing.
            </p>

            {/* Social links */}
            <nav aria-label="Social media links" style={{ marginTop: 24 }}>
              <ul style={{ listStyle: 'none', display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                {['X', 'LinkedIn', 'GitHub', 'YouTube'].map((s) => (
                  <li key={s}>
                    <a
                      href="#"
                      style={{
                        fontFamily: 'var(--font-inter)',
                        fontSize: 13,
                        color: 'var(--mint)',
                        textDecoration: 'none',
                        transition: 'color 150ms ease-out',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--arctic)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--mint)')}
                    >
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <p
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 12,
                color: 'var(--mint)',
                opacity: 0.5,
                marginTop: 32,
              }}
            >
              © 2026 NexusAI. All rights reserved.
            </p>
          </div>

          {/* Link columns */}
          {(Object.entries(FOOTER_LINKS) as [string, string[]][]).map(([heading, links]) => (
            <nav key={heading} aria-label={`${heading} links`}>
              <h4
                style={{
                  fontFamily: 'var(--font-jetbrains)',
                  fontSize: 11,
                  color: 'var(--forsythia)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  marginBottom: 16,
                }}
              >
                {heading.toUpperCase()}
              </h4>
              <ul style={{ listStyle: 'none' }}>
                {links.map((l) => (
                  <li key={l}>
                    <FooterLink label={l} />
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      {/* Chevron nav icons — using chevron-left / chevron-right as back/forward page decorations */}
      <div
        aria-hidden="true"
        style={{
          borderTop: '1px solid rgba(241,246,244,0.04)',
          display: 'flex',
          justifyContent: 'center',
          gap: 8,
          padding: '16px 0',
          opacity: 0.2,
        }}
      >
        <Image src="/chevron-left.svg"     alt="" width={14} height={14} style={{ filter: 'brightness(0) invert(1)' }} />
        <Image src="/chevron-up.svg"       alt="" width={14} height={14} style={{ filter: 'brightness(0) invert(1)' }} />
        <Image src="/chevron-up-solid.svg" alt="" width={14} height={14} style={{ filter: 'brightness(0) invert(1)' }} />
        <Image src="/chevron-right.svg"    alt="" width={14} height={14} style={{ filter: 'brightness(0) invert(1)' }} />
      </div>

      <style>{`
        @media (max-width: 767px) {
          .newsletter-grid { grid-template-columns: 1fr !important; }
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 479px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}
