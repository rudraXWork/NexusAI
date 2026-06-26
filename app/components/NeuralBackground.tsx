'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  z: number
  vx: number
  vy: number
  vz: number
}

export default function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    const mouse = { x: -999, y: -999 }
    const PARTICLE_COUNT = 90
    const CONNECT_DIST = 150
    const MOUSE_ATTRACT = 100

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height,
      z:  Math.random() * 500,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      vz: (Math.random() - 0.5) * 0.4,
    }))

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    window.addEventListener('mousemove', onMouseMove)

    function animate() {
      animId = requestAnimationFrame(animate)

      // trail fade — use theme-aware bg color
      const isLight = document.documentElement.dataset.theme === 'light'
      ctx!.fillStyle = isLight ? 'rgba(241,246,244,0.18)' : 'rgba(23,43,54,0.18)'
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height)

      particles.forEach((p) => {
        // mouse attract
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < MOUSE_ATTRACT && dist > 0) {
          const force = (MOUSE_ATTRACT - dist) / MOUSE_ATTRACT
          p.vx += (dx / dist) * force * 0.08
          p.vy += (dy / dist) * force * 0.08
        }

        p.x += p.vx
        p.y += p.vy
        p.z += p.vz

        // bounce
        if (p.x < 0 || p.x > canvas!.width)  p.vx *= -1
        if (p.y < 0 || p.y > canvas!.height) p.vy *= -1
        if (p.z < 0 || p.z > 500)            p.vz *= -1

        // dampen
        p.vx *= 0.98
        p.vy *= 0.98
        p.vz *= 0.98
      })

      // connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i], p2 = particles[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const dz = p1.z - p2.z
          const d  = Math.sqrt(dx*dx + dy*dy + dz*dz)
          if (d < CONNECT_DIST) {
            const alpha = (1 - d / CONNECT_DIST) * 0.25
            ctx!.strokeStyle = `rgba(255,200,1,${alpha})`
            ctx!.lineWidth = 1
            ctx!.beginPath()
            ctx!.moveTo(p1.x, p1.y)
            ctx!.lineTo(p2.x, p2.y)
            ctx!.stroke()
          }
        }
      }

      // nodes
      particles.forEach((p) => {
        const scale   = 1 + p.z / 500
        const radius  = 1.5 * scale
        const alpha   = 0.4 + (p.z / 500) * 0.6
        ctx!.fillStyle = `rgba(255,200,1,${alpha})`
        ctx!.beginPath()
        ctx!.arc(p.x, p.y, radius, 0, Math.PI * 2)
        ctx!.fill()
      })
    }

    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}
