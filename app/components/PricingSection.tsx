'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

const MATRIX = {
  tiers: ['Starter', 'Pro', 'Enterprise'] as const,
  base: { Starter: 29, Pro: 79, Enterprise: 199 },
  annualMultiplier: 0.8,
  currencies: {
    USD: { symbol: '$', rate: 1,     locale: 'en-US' },
    INR: { symbol: '₹', rate: 83.5, locale: 'en-IN' },
    EUR: { symbol: '€', rate: 0.92, locale: 'de-DE' },
  },
  features: {
    Starter:    ['5 active pipelines', '10GB data transfer/mo', 'Email support', 'Basic analytics'],
    Pro:        ['Unlimited pipelines', '500GB data transfer/mo', 'Priority support', 'Advanced analytics'],
    Enterprise: ['Everything in Pro', 'Unlimited data transfer', 'Dedicated SRE', 'Custom SLA'],
  },
  popular: 'Pro',
} as const

type Tier     = typeof MATRIX.tiers[number]
type Currency = keyof typeof MATRIX.currencies
type Billing  = 'monthly' | 'annual'

function computePrice(tier: Tier, currency: Currency, billing: Billing): string {
  const base = MATRIX.base[tier]
  const multiplier = billing === 'annual' ? MATRIX.annualMultiplier : 1
  const { rate, symbol } = MATRIX.currencies[currency]
  const price = Math.round(base * multiplier * rate)
  return `${symbol}${price.toLocaleString()}`
}

export default function PricingSection() {
  const billingRef  = useRef<Billing>('monthly')
  const currencyRef = useRef<Currency>('USD')
  const pricingWrapperRef = useRef<HTMLDivElement>(null)

  // one ref per tier price span
  const priceRefs = useRef<Record<Tier, HTMLSpanElement | null>>({
    Starter: null, Pro: null, Enterprise: null,
  })

  // billing toggle button refs
  const btnMonthlyRef = useRef<HTMLButtonElement>(null)
  const btnAnnualRef  = useRef<HTMLButtonElement>(null)
  // currency button refs
  const btnCurrencyRefs = useRef<Record<Currency, HTMLButtonElement | null>>({
    USD: null, INR: null, EUR: null,
  })

  function updateAllPrices() {
    const billing  = billingRef.current
    const currency = currencyRef.current

    MATRIX.tiers.forEach((tier) => {
      const span = priceRefs.current[tier]
      if (!span) return
      span.style.opacity = '0'
      span.style.transform = 'translateY(4px)'
      setTimeout(() => {
        span.textContent = computePrice(tier, currency, billing)
        span.style.opacity = '1'
        span.style.transform = 'translateY(0)'
      }, 80)
    })
  }

  function setBilling(val: Billing) {
    billingRef.current = val
    // update toggle button styles
    if (btnMonthlyRef.current && btnAnnualRef.current) {
      const active:   React.CSSProperties = { background: 'var(--forsythia)', color: 'var(--noir)', fontWeight: 600 }
      const inactive: React.CSSProperties = { background: 'transparent', color: 'var(--mint)', fontWeight: 400 }
      if (val === 'monthly') {
        Object.assign(btnMonthlyRef.current.style, active)
        Object.assign(btnAnnualRef.current.style,  inactive)
      } else {
        Object.assign(btnAnnualRef.current.style,  active)
        Object.assign(btnMonthlyRef.current.style, inactive)
      }
    }
    updateAllPrices()
  }

  function setCurrency(val: Currency) {
    currencyRef.current = val
    ;(Object.keys(MATRIX.currencies) as Currency[]).forEach((c) => {
      const btn = btnCurrencyRefs.current[c]
      if (!btn) return
      if (c === val) {
        btn.style.background = 'var(--nocturnal)'
        btn.style.borderColor = 'var(--forsythia)'
        btn.style.color = 'var(--arctic)'
        btn.style.opacity = '1'
      } else {
        btn.style.background = 'transparent'
        btn.style.borderColor = 'transparent'
        btn.style.color = 'var(--mint)'
        btn.style.opacity = '0.6'
      }
    })
    updateAllPrices()
  }

  // Dev isolation proof
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return
    if (!pricingWrapperRef.current) return
    const mo = new MutationObserver(() =>
      console.warn('PRICING PARENT MUTATED')
    )
    mo.observe(pricingWrapperRef.current, { childList: true, subtree: false })
    return () => mo.disconnect()
  }, [])

  const pillBase: React.CSSProperties = {
    fontFamily: 'var(--font-jetbrains)',
    fontSize: 13,
    padding: '6px 16px',
    borderRadius: 9999,
    border: 'none',
    cursor: 'pointer',
    transition: 'background 150ms ease-out, color 150ms ease-out',
  }

  return (
    <section
      id="pricing"
      aria-label="Pricing plans"
      style={{ background: 'var(--noir)', padding: '100px 0' }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <span className="eyebrow">/// PRICING</span>
            <Image
              src="/search.svg"
              alt=""
              width={14}
              height={14}
              style={{ filter: 'invert(1) sepia(1) saturate(3) hue-rotate(5deg)', opacity: 0.7 }}
            />
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-jetbrains)',
              fontSize: 'clamp(2rem, 3.5vw, 3rem)',
              fontWeight: 700,
              color: 'var(--arctic)',
              marginBottom: 12,
            }}
          >
            Simple, transparent pricing.
          </h2>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: 16, color: 'var(--mint)' }}>
            Start free. Scale when ready. No hidden fees.
          </p>
        </div>

        {/* Controls */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 16,
            marginBottom: 48,
          }}
        >
          {/* Billing toggle */}
          <div
            style={{
              display: 'inline-flex',
              background: 'rgba(17,76,90,0.5)',
              border: '1px solid rgba(241,246,244,0.1)',
              borderRadius: 9999,
              padding: 4,
              gap: 2,
              alignItems: 'center',
            }}
          >
            <button
              ref={btnMonthlyRef}
              onClick={() => setBilling('monthly')}
              style={{ ...pillBase, background: 'var(--forsythia)', color: 'var(--noir)', fontWeight: 600 }}
            >
              Monthly
            </button>
            <button
              ref={btnAnnualRef}
              onClick={() => setBilling('annual')}
              style={{ ...pillBase, background: 'transparent', color: 'var(--mint)', display: 'inline-flex', alignItems: 'center', gap: 6 }}
            >
              Annual
              <span
                style={{
                  fontFamily: 'var(--font-jetbrains)',
                  fontSize: 10,
                  color: 'inherit',
                  background: 'transparent',
                  border: '1px solid currentColor',
                  padding: '1px 6px',
                  borderRadius: 9999,
                  letterSpacing: '0.05em',
                  lineHeight: 1.6,
                  opacity: 0.8,
                }}
              >
                -20%
              </span>
            </button>
          </div>

          {/* Currency switcher */}
          <div style={{ display: 'inline-flex', gap: 6 }}>
            {(Object.keys(MATRIX.currencies) as Currency[]).map((c, i) => (
              <button
                key={c}
                ref={(el) => { btnCurrencyRefs.current[c] = el }}
                onClick={() => setCurrency(c)}
                style={{
                  fontFamily: 'var(--font-jetbrains)',
                  fontSize: 12,
                  padding: '5px 12px',
                  borderRadius: 6,
                  border: '1px solid',
                  cursor: 'pointer',
                  transition: 'all 150ms ease-out',
                  background: i === 0 ? 'var(--nocturnal)' : 'transparent',
                  borderColor: i === 0 ? 'var(--forsythia)' : 'transparent',
                  color: i === 0 ? 'var(--arctic)' : 'var(--mint)',
                  opacity: i === 0 ? 1 : 0.6,
                }}
              >
                {MATRIX.currencies[c].symbol} {c}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div
          ref={pricingWrapperRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 24,
          }}
          className="pricing-grid"
        >
          {MATRIX.tiers.map((tier) => {
            const isPopular = tier === MATRIX.popular
            const initialPrice = computePrice(tier, 'USD', 'monthly')
            return (
              <article
                key={tier}
                className={`pricing-card${isPopular ? ' popular' : ''}`}
                style={{
                  background: 'var(--nocturnal)',
                  border: isPopular ? '1.5px solid var(--forsythia)' : '1px solid rgba(241,246,244,0.08)',
                  borderRadius: 16,
                  padding: '32px 28px',
                  position: 'relative',
                  boxShadow: isPopular ? '0 0 40px rgba(255,200,1,0.1)' : 'none',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {isPopular && (
                  <div
                    aria-label="Most popular plan"
                    style={{
                      position: 'absolute',
                      top: -14,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'var(--forsythia)',
                      color: 'var(--noir)',
                      fontFamily: 'var(--font-jetbrains)',
                      fontSize: 11,
                      fontWeight: 700,
                      padding: '4px 14px',
                      borderRadius: 999,
                      letterSpacing: '0.1em',
                      whiteSpace: 'nowrap',
                      textTransform: 'uppercase',
                    }}
                  >
                    Most Popular
                  </div>
                )}

                <header>
                  <span
                    style={{
                      fontFamily: 'var(--font-jetbrains)',
                      fontSize: 13,
                      color: 'var(--forsythia)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.15em',
                    }}
                  >
                    {tier}
                  </span>
                </header>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    gap: 4,
                    marginTop: 16,
                    marginBottom: 4,
                  }}
                >
                  <span
                    ref={(el) => { priceRefs.current[tier] = el }}
                    className="price-value"
                    style={{
                      fontFamily: 'var(--font-jetbrains)',
                      fontSize: 'clamp(2.2rem, 4vw, 3rem)',
                      fontWeight: 700,
                      color: 'var(--arctic)',
                      lineHeight: 1,
                    }}
                  >
                    {initialPrice}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-inter)',
                      fontSize: 14,
                      color: 'var(--mint)',
                      paddingBottom: 8,
                    }}
                  >
                    /mo
                  </span>
                </div>

                <ul
                  aria-label={`${tier} plan features`}
                  style={{
                    listStyle: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12,
                    marginTop: 24,
                    flex: 1,
                  }}
                >
                  {MATRIX.features[tier].map((feat) => (
                    <li
                      key={feat}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        fontFamily: 'var(--font-inter)',
                        fontSize: 14,
                        color: 'var(--mint)',
                      }}
                    >
                      <span
                        aria-hidden="true"
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          background: 'var(--forsythia)',
                          flexShrink: 0,
                        }}
                      />
                      {feat}
                    </li>
                  ))}
                </ul>

                <CtaButton tier={tier} isPopular={isPopular} />
              </article>
            )
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .pricing-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .pricing-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  )
}

function CtaButton({ tier, isPopular }: { tier: Tier; isPopular: boolean }) {
  const isEnterprise = tier === 'Enterprise'

  const base: React.CSSProperties = {
    display: 'block',
    width: '100%',
    padding: '12px',
    borderRadius: 8,
    textAlign: 'center',
    textDecoration: 'none',
    fontFamily: 'var(--font-inter)',
    fontSize: 14,
    fontWeight: isPopular ? 600 : 400,
    marginTop: 28,
    transition: 'all 150ms ease-out',
    cursor: 'pointer',
    border: 'none',
  }

  if (isPopular) {
    return (
      <a
        href="#"
        style={{ ...base, background: 'var(--forsythia)', color: 'var(--noir)' }}
        onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--saffron)')}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--forsythia)')}
      >
        Get Started
      </a>
    )
  }
  if (isEnterprise) {
    return (
      <a
        href="#"
        style={{
          ...base,
          background: 'transparent',
          color: 'var(--forsythia)',
          border: '1px solid rgba(255,200,1,0.4)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255,200,1,0.08)'
          e.currentTarget.style.borderColor = 'var(--forsythia)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent'
          e.currentTarget.style.borderColor = 'rgba(255,200,1,0.4)'
        }}
      >
        Contact Sales
      </a>
    )
  }
  return (
    <a
      href="#"
      style={{
        ...base,
        background: 'transparent',
        color: 'var(--arctic)',
        border: '1px solid rgba(241,246,244,0.2)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(241,246,244,0.05)'
        e.currentTarget.style.borderColor = 'rgba(241,246,244,0.4)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'transparent'
        e.currentTarget.style.borderColor = 'rgba(241,246,244,0.2)'
      }}
    >
      Get Started
    </a>
  )
}
