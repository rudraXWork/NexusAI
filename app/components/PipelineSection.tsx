'use client'

import Image from 'next/image'

const NODES = [
  {
    icon: 'arrow-path.svg',
    label: 'Ingest',
    sublabel: 'Raw Sources',
    iconStyle: { animation: 'spin 4s linear infinite' },
    dotColor: '#4ade80',
    dotGlow: '#4ade80',
    dotAnim: 'none',
    active: false,
  },
  {
    icon: 'cog-8-tooth.svg',
    label: 'Transform',
    sublabel: 'Processing',
    iconStyle: { animation: 'pulseGlow 2s ease-in-out infinite' },
    dotColor: 'var(--forsythia)',
    dotGlow: 'var(--forsythia)',
    dotAnim: 'blink 1s ease-in-out infinite',
    active: true,
  },
  {
    icon: 'chart-pie.svg',
    label: 'Deliver',
    sublabel: 'Analytics',
    iconStyle: {},
    dotColor: 'var(--mint)',
    dotGlow: 'none',
    dotAnim: 'none',
    active: false,
  },
]

const BARS = [
  { label: 'Customer Pipeline', anim: 'bar-fill-1 3.2s ease-in-out 0s infinite alternate', value: '94.2%' },
  { label: 'Anomaly Detection', anim: 'bar-fill-2 4.1s ease-in-out 0.8s infinite alternate', value: '78.8%' },
  { label: 'Data Sync Engine',  anim: 'bar-fill-3 2.8s ease-in-out 1.4s infinite alternate', value: '99.1%' },
]

const CHIPS = [
  { dot: 'green',  dotAnim: 'blink 1.4s ease-in-out infinite', text: '1,284 events / sec', icon: null },
  { dot: 'yellow', dotAnim: 'none',                             text: '0 pipeline errors',  icon: null },
  { dot: null,     dotAnim: 'none',                             text: '99.9% uptime',        icon: 'arrow-trending-up.svg' },
]

export default function PipelineSection() {
  return (
    <section
      aria-label="Platform in action — live pipeline visualizer"
      style={{ background: 'var(--nocturnal)', padding: '100px 0', overflow: 'hidden' }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>

        {/* ── Header ── */}
        <div style={{ textAlign: 'center', marginBottom: 0 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 16 }}>
            <span className="eyebrow">/// PLATFORM IN ACTION</span>
            <Image
              src="/cube-16-solid.svg"
              alt=""
              width={13}
              height={13}
              style={{ filter: 'invert(1) sepia(1) saturate(3) hue-rotate(5deg)', opacity: 0.7 }}
            />
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-jetbrains)',
              fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
              fontWeight: 700,
              color: 'var(--arctic)',
              lineHeight: 1.2,
            }}
          >
            Your data. Always moving. Always intelligent.
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: 15,
              color: 'var(--mint)',
              marginTop: 12,
            }}
          >
            Watch a live NexusAI pipeline process, transform, and deliver in real time.
          </p>
        </div>

        {/* ── Part A: Node diagram ── */}
        <div
          style={{
            maxWidth: 860,
            margin: '56px auto 0',
            display: 'flex',
            alignItems: 'center',
          }}
          className="pipeline-nodes"
        >
          {NODES.flatMap((node, i) => {
            const card = (
              <article
                key={node.label}
                style={{
                  background: 'rgba(23,43,54,0.7)',
                  border: node.active
                    ? '1px solid rgba(255,200,1,0.4)'
                    : '1px solid rgba(241,246,244,0.1)',
                  boxShadow: node.active ? '0 0 32px rgba(255,200,1,0.1)' : 'none',
                  borderRadius: 14,
                  padding: '28px 24px',
                  textAlign: 'center',
                  minWidth: 180,
                  flex: '0 0 auto',
                  position: 'relative',
                }}
              >
                {/* Status dot */}
                <span
                  aria-label={`Node status: ${node.label}`}
                  style={{
                    position: 'absolute',
                    top: 14,
                    right: 14,
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: node.dotColor,
                    boxShadow: node.dotGlow !== 'none' ? `0 0 8px ${node.dotGlow}` : 'none',
                    animation: node.dotAnim,
                    display: 'block',
                  }}
                />
                <Image
                  src={`/${node.icon}`}
                  alt={node.label}
                  width={32}
                  height={32}
                  style={{
                    filter: 'invert(1) sepia(1) saturate(3) hue-rotate(5deg)',
                    ...node.iconStyle,
                  }}
                />
                <p
                  style={{
                    fontFamily: 'var(--font-jetbrains)',
                    fontSize: 13,
                    color: 'var(--forsythia)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    marginTop: 14,
                    fontWeight: 600,
                  }}
                >
                  {node.label}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: 12,
                    color: node.active ? 'var(--forsythia)' : 'var(--mint)',
                    opacity: node.active ? 0.9 : 0.7,
                    marginTop: 4,
                  }}
                >
                  {node.sublabel}
                </p>
              </article>
            )

            if (i >= NODES.length - 1) return [card]

            // 4 packets per connector, evenly staggered — each travels 2s,
            // delays at 0, 0.5, 1, 1.5s so they're always evenly spaced.
            // Connector 2 shifts everything by 0.25s so the two connectors feel independent.
            const baseDelay = i === 1 ? 0.25 : 0
            const connector = (
              <div
                key={`connector-${i}`}
                className="pipeline-connector"
                style={{
                  flex: 1,
                  height: 2,
                  // animated dashed track
                  background: 'repeating-linear-gradient(90deg, rgba(255,200,1,0.2) 0px, rgba(255,200,1,0.2) 8px, transparent 8px, transparent 20px)',
                  backgroundSize: '28px 2px',
                  animation: 'dash-move 0.8s linear infinite',
                  position: 'relative',
                  alignSelf: 'center',
                }}
              >
                {/* link.svg centred on track */}
                <Image
                  src="/link.svg"
                  alt=""
                  width={12}
                  height={12}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    filter: 'brightness(0) invert(1)',
                    opacity: 0.15,
                    zIndex: 1,
                  }}
                />

                {/* 4 colour-cycling packets — transform-based travel, no left positioning */}
                {[0, 0.5, 1, 1.5].map((offset) => (
                  <span
                    key={offset}
                    aria-hidden="true"
                    className="pipeline-packet"
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: 0,
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      animation: [
                        `packet-travel 2s ease-in-out ${baseDelay + offset}s infinite`,
                        `dot-color 1.5s ease-in-out ${offset * 0.4}s infinite`,
                      ].join(', '),
                    }}
                  />
                ))}
              </div>
            )

            return [card, connector]
          })}
        </div>

        {/* ── Part B: Progress bars ── */}
        <div style={{ maxWidth: 860, margin: '48px auto 0' }}>
          {BARS.map((bar, i) => (
            <div
              key={bar.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                marginBottom: i < BARS.length - 1 ? 16 : 0,
              }}
            >
              {/* Label */}
              <span
                style={{
                  fontFamily: 'var(--font-jetbrains)',
                  fontSize: 12,
                  color: 'var(--mint)',
                  opacity: 0.8,
                  width: 160,
                  flexShrink: 0,
                }}
              >
                {bar.label}
              </span>

              {/* Track */}
              <div
                style={{
                  flex: 1,
                  height: 6,
                  background: 'rgba(241,246,244,0.08)',
                  borderRadius: 99,
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                {/* Fill */}
                <div
                  className={`bar-fill bar-fill-${i + 1}`}
                  style={{
                    height: '100%',
                    width: '100%',
                    borderRadius: 99,
                    background: 'linear-gradient(90deg, var(--forsythia), var(--saffron))',
                    animation: bar.anim,
                    transformOrigin: 'left',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Shimmer */}
                  <span
                    aria-hidden="true"
                    className="bar-shimmer"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
                      backgroundSize: '200% 100%',
                      animation: 'shimmer 1.5s linear infinite',
                    }}
                  />
                </div>
              </div>

              {/* Counter */}
              <span
                style={{
                  fontFamily: 'var(--font-jetbrains)',
                  fontSize: 12,
                  color: 'var(--forsythia)',
                  width: 48,
                  textAlign: 'right',
                  flexShrink: 0,
                }}
              >
                {bar.value}
              </span>
            </div>
          ))}
        </div>

        {/* ── Part C: Live stat chips ── */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 12,
            marginTop: 40,
          }}
        >
          {CHIPS.map((chip, i) => (
            <div
              key={i}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                background: 'rgba(23,43,54,0.5)',
                border: '1px solid rgba(241,246,244,0.08)',
                borderRadius: 999,
                padding: '10px 24px',
              }}
            >
              {/* Dot or icon */}
              {chip.icon ? (
                <Image
                  src={`/${chip.icon}`}
                  alt=""
                  width={14}
                  height={14}
                  style={{ filter: 'invert(1) sepia(1) saturate(3) hue-rotate(5deg)' }}
                />
              ) : (
                <span
                  aria-hidden="true"
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: chip.dot === 'green' ? '#4ade80' : 'var(--forsythia)',
                    boxShadow: chip.dot === 'green'
                      ? '0 0 8px #4ade80'
                      : '0 0 8px var(--forsythia)',
                    animation: chip.dotAnim,
                    flexShrink: 0,
                    display: 'block',
                  }}
                />
              )}

              <span
                style={{
                  fontFamily: 'var(--font-jetbrains)',
                  fontSize: 13,
                  color: 'var(--arctic)',
                }}
              >
                {chip.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .pipeline-nodes {
            flex-direction: column !important;
            align-items: center !important;
          }
          .pipeline-nodes article {
            min-width: unset !important;
            width: 100% !important;
            max-width: 320px !important;
          }
          .pipeline-connector {
            width: 2px !important;
            height: 40px !important;
            flex: unset !important;
            align-self: auto !important;
          }
          .pipeline-packet {
            display: none !important;
          }
        }
      `}</style>
    </section>
  )
}
