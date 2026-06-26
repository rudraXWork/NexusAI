'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const NAV_LINKS = ['Features', 'Pricing', 'Integrations', 'Docs']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const themeIconRef = useRef<HTMLSpanElement>(null)

  // Read saved theme on mount and set icon
  useEffect(() => {
    try {
      const saved = localStorage.getItem('nexusai-theme')
      if (themeIconRef.current) {
        themeIconRef.current.textContent = saved === 'light' ? '☀' : '🌙'
      }
    } catch (e) {}
  }, [])

  const toggleTheme = () => {
    const isLight = document.documentElement.dataset.theme === 'light'
    const next = isLight ? '' : 'light'
    document.documentElement.dataset.theme = next
    try { localStorage.setItem('nexusai-theme', next === 'light' ? 'light' : 'dark') } catch (e) {}
    if (themeIconRef.current) themeIconRef.current.textContent = next === 'light' ? '☀' : '🌙'
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <header
        ref={navRef}
        className={scrolled ? 'nav-scrolled-bg' : ''}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: 'background 300ms ease-in-out, backdrop-filter 300ms ease-in-out, border-color 300ms ease-in-out',
        }}
      >
        <nav
          aria-label="Main navigation"
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            padding: '0 24px',
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <a
            href="/"
            aria-label="NexusAI home"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              textDecoration: 'none',
            }}
          >
            <LightningBolt />
            <span
              style={{
                fontFamily: 'var(--font-jetbrains)',
                fontWeight: 700,
                fontSize: 18,
                color: 'var(--arctic)',
                letterSpacing: '-0.01em',
              }}
            >
              NexusAI
            </span>
          </a>

          {/* Desktop nav */}
          <ul
            style={{
              display: 'flex',
              gap: 32,
              listStyle: 'none',
              alignItems: 'center',
            }}
            className="desktop-nav"
          >
            {NAV_LINKS.map((link) => (
              <li key={link}>
                <a href={`#${link.toLowerCase()}`} style={{ textDecoration: 'none' }}>
                  <NavLink label={link} />
                </a>
              </li>
            ))}
          </ul>

          {/* Right CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {/* Theme toggle */}
            <button
              aria-label="Toggle light/dark mode"
              onClick={toggleTheme}
              style={{
                background: 'none',
                border: '1px solid rgba(255,200,1,0.3)',
                borderRadius: 6,
                cursor: 'pointer',
                padding: '6px 10px',
                lineHeight: 1,
                fontSize: 16,
                transition: 'border-color 150ms ease-out',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(255,200,1,0.7)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,200,1,0.3)')}
            >
              <span ref={themeIconRef} aria-hidden="true">🌙</span>
            </button>

            <a
              href="#pricing"
              className="nav-cta"
              style={{
                background: 'var(--forsythia)',
                color: 'var(--noir)',
                fontFamily: 'var(--font-inter)',
                fontSize: 14,
                fontWeight: 600,
                padding: '8px 20px',
                borderRadius: 6,
                textDecoration: 'none',
                transition: 'background 150ms ease-out',
                display: 'inline-block',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--saffron)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--forsythia)')}
            >
              Get Started
            </a>

            {/* Hamburger — mobile only */}
            <button
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}
              className="hamburger-btn"
              style={{
                display: 'none',
                flexDirection: 'column',
                gap: 5,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 4,
              }}
            >
              <span
                style={{
                  display: 'block',
                  width: 20,
                  height: 2,
                  background: 'var(--arctic)',
                  borderRadius: 1,
                  transition: 'transform 200ms ease-out, opacity 200ms ease-out',
                  transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none',
                }}
              />
              <span
                style={{
                  display: 'block',
                  width: 20,
                  height: 2,
                  background: 'var(--arctic)',
                  borderRadius: 1,
                  transition: 'opacity 200ms ease-out',
                  opacity: menuOpen ? 0 : 1,
                }}
              />
              <span
                style={{
                  display: 'block',
                  width: 20,
                  height: 2,
                  background: 'var(--arctic)',
                  borderRadius: 1,
                  transition: 'transform 200ms ease-out',
                  transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none',
                }}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 40,
          background: 'var(--noir)',
          display: 'grid',
          gridTemplateRows: menuOpen ? '1fr' : '0fr',
          transition: 'grid-template-rows 350ms ease-in-out, opacity 350ms ease-in-out',
          opacity: menuOpen ? 1 : 0,
          visibility: menuOpen ? 'visible' : 'hidden',
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
        className="mobile-menu-overlay"
      >
        <div style={{ overflow: 'hidden', minHeight: 0 }}>
          <div
            style={{
              height: '100dvh',
              display: 'flex',
              flexDirection: 'column',
              padding: '80px 32px 40px',
            }}
          >
            {/* Search icon decorative */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 48 }}>
              <Image
                src="/search.svg"
                alt="Search"
                width={18}
                height={18}
                style={{ filter: 'brightness(0) invert(1)', opacity: 0.4 }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-jetbrains)',
                  fontSize: 11,
                  letterSpacing: '0.2em',
                  color: 'var(--mint)',
                  opacity: 0.5,
                  textTransform: 'uppercase',
                }}
              >
                Search coming soon
              </span>
            </div>

            {/* Close button */}
            <button
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              style={{
                position: 'absolute',
                top: 20,
                right: 24,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 4,
              }}
            >
              <Image
                src="/x-mark.svg"
                alt="Close"
                width={24}
                height={24}
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </button>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {NAV_LINKS.map((link, i) => (
                <li
                  key={link}
                  style={{
                    animation: menuOpen
                      ? `menuItemIn 300ms ease-out ${i * 80}ms both`
                      : 'none',
                  }}
                >
                  <a
                    href={`#${link.toLowerCase()}`}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      fontFamily: 'var(--font-jetbrains)',
                      fontSize: 28,
                      color: 'var(--arctic)',
                      textDecoration: 'none',
                      display: 'block',
                      padding: '12px 0',
                      borderBottom: '1px solid rgba(241,246,244,0.06)',
                      transition: 'color 150ms ease-out',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--forsythia)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--arctic)')}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>

            <div style={{ marginTop: 'auto' }}>
              <a
                href="#pricing"
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'block',
                  background: 'var(--forsythia)',
                  color: 'var(--noir)',
                  fontFamily: 'var(--font-inter)',
                  fontWeight: 600,
                  fontSize: 16,
                  padding: '14px 28px',
                  borderRadius: 8,
                  textAlign: 'center',
                  textDecoration: 'none',
                  animation: menuOpen ? 'menuItemIn 300ms ease-out 240ms both' : 'none',
                }}
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
        @media (min-width: 768px) {
          .mobile-menu-overlay { display: none !important; }
        }
      `}</style>
    </>
  )
}

function NavLink({ label }: { label: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: 'var(--font-inter)',
        fontSize: 14,
        color: hovered ? 'var(--arctic)' : 'var(--mint)',
        transition: 'color 150ms ease-out',
        paddingBottom: 4,
        borderBottom: hovered ? '2px solid var(--forsythia)' : '2px solid transparent',
        cursor: 'pointer',
      }}
    >
      {label}
    </span>
  )
}

function LightningBolt() {
  return (
    <svg
      width="20"
      height="24"
      viewBox="0 0 20 24"
      fill="none"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <path
        d="M11 2L3 13h7l-1 9 9-12h-7l2-8z"
        fill="var(--forsythia)"
        strokeLinejoin="round"
      />
    </svg>
  )
}
