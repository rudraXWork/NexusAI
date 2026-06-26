'use client'

import Image from 'next/image'

const ITEMS = [
  'Snowflake', 'dbt', 'BigQuery', 'Kafka', 'Airflow', 'Postgres', 'Redshift',
  'Databricks', 'S3', 'Fivetran', 'Airbyte', 'Looker', 'Tableau', 'Spark',
]

function TickerItem({ name }: { name: string }) {
  return (
    <>
      <span
        style={{
          fontFamily: 'var(--font-jetbrains)',
          fontSize: 13,
          color: 'var(--mint)',
          opacity: 0.7,
          whiteSpace: 'nowrap',
        }}
      >
        {name}
      </span>
      <span style={{ color: 'var(--forsythia)', margin: '0 14px', opacity: 0.8 }}>·</span>
    </>
  )
}

export default function IntegrationsBar() {
  const allItems = [...ITEMS, ...ITEMS] // duplicate for seamless loop

  return (
    <div
      id="integrations"
      aria-label="Integrations ticker"
      style={{
        background: 'var(--nocturnal)',
        padding: '16px 0',
        overflow: 'hidden',
        borderTop: '1px solid rgba(241,246,244,0.05)',
        borderBottom: '1px solid rgba(241,246,244,0.05)',
      }}
    >
      <div
        style={{
          display: 'flex',
          width: 'fit-content',
          alignItems: 'center',
          animation: 'ticker-scroll 30s linear infinite',
          willChange: 'transform',
        }}
      >
        {/* link.svg at start */}
        <Image
          src="/link.svg"
          alt="Integrations"
          width={16}
          height={16}
          style={{
            filter: 'brightness(0) invert(1)',
            opacity: 0.5,
            marginRight: 14,
            flexShrink: 0,
          }}
        />
        {allItems.map((name, i) => (
          <TickerItem key={`${name}-${i}`} name={name} />
        ))}
      </div>
    </div>
  )
}
