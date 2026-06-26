# NexusAI — Next-Generation AI Data Automation Platform

NexusAI is a high-fidelity, high-performance landing page demonstrating modern web design practices. The platform showcases interactive visualizers, real-time data orchestration pipelines, and advanced UI/UX components built with performance as a primary constraint.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + custom CSS utilities (`globals.css`)
- **Runtime**: Node.js, optimized for Vercel deployment
- **Design Philosophy**: High-performance micro-interactions, zero layout thrashing, and native web API integrations without heavy animation libraries.

---

## ⚡ Key Interactive Features

### 1. High-Performance Pricing Matrix (`PricingSection.tsx`)
- **Zero-Rerender Controls**: Implemented using React `useRef` rather than state hooks. Currency translations (USD, INR, EUR) and billing cycle changes (Monthly vs. Annual with 20% savings) write directly to the DOM via element text content.
- **Zero Layout Thrash**: Updates avoid component tree reflows, verified in development via a `MutationObserver` on the pricing grid.
- **Dynamic Transition**: Features a subtle translation and opacity shift during value updates.

### 2. Responsive Bento / Accordion Grid (`FeaturesSection.tsx`)
- **Unified State**: Shares a single active feature index between the desktop and mobile layouts.
- **Desktop Bento**: Implements a CSS grid layout where hover interactions highlight the active block and trigger continuous shimmer effects on nested visual elements.
- **Mobile Accordion**: Smoothly expands and collapses panels using native `grid-template-rows` transitions.
- **ResizeObserver Sync**: Monitors viewport width using a ResizeObserver sentinel, ensuring active state transitions flawlessly when crossing the mobile/desktop breakpoint.

### 3. Live Pipeline Visualizer (`PipelineSection.tsx`)
- **Real-Time Simulation**: Models data streams moving through three major phases: *Ingest* (Ingestion), *Transform* (Processing), and *Deliver* (Analytics).
- **Dashed Tracking**: Connectors render animated, color-cycling data packets moving along responsive tracks.
- **GPU-Composited Fills**: Simulates live throughput using CSS keyframe-animated progress bars with overlay shimmers.

### 4. Neural Particle Background (`NeuralBackground.tsx`)
- **Interactive Particle Field**: Renders a dynamic particle network using HTML5 Canvas 2D.
- **Physics Simulation**: Features velocity damping, boundary collisions, and a mouse attraction field that pulls nearby nodes based on distance vectors.
- **Fluid Animation**: Powered by `requestAnimationFrame` with low alpha trails to create a clean, high-performance visual depth.

### 5. Scroll-Driven reveals & Testimonials (`SocialProof.tsx`)
- **IntersectionObserver Reveals**: Elements transition smoothly on scroll (opacity and translation) as they enter the viewport.
- **Sliding Client Indicator**: A vertical marker translates along the client log using GPU-composited transforms, aligning with the active testimonial.
- **Logo Grid**: Staggers integration partners as the grid becomes visible.

---

## 🎨 Color Palette & Typography

The design system uses a dark, high-contrast palette defined in `globals.css`:

| Token | Hex Value | Purpose |
| :--- | :--- | :--- |
| **Arctic Powder** | `#F1F6F4` | Primary typography |
| **Mystic Mint** | `#D9E8E2` | Supporting text, descriptions |
| **Forsythia** | `#FFC801` | Primary accent color, CTAs |
| **Deep Saffron** | `#FF9932` | Secondary accent, gradients |
| **Nocturnal Expedition** | `#114C5A` | Interactive card backgrounds |
| **Oceanic Noir** | `#172B36` | Main layout background |

### Typography
- **Inter**: Primary sans-serif face for interface text and body copy.
- **JetBrains Mono**: Monospace face for numeric data, labels, code badges, and technical eyebrows.

---

## 📁 Directory Structure

```
ai-platform/
├── app/
│   ├── components/
│   │   ├── FeaturesSection.tsx     — Bento grid / accordion list
│   │   ├── Footer.tsx              — Clean structured page footer
│   │   ├── Hero.tsx                — Hero banner & text cycler
│   │   ├── IntegrationsBar.tsx     — Infinite scroll logo ticker
│   │   ├── Navbar.tsx              — Sticky nav & grid-template mobile menu
│   │   ├── NeuralBackground.tsx    — Interactive particle canvas
│   │   ├── PipelineSection.tsx     — Real-time data stream visualizer
│   │   ├── PricingSection.tsx      — Zero-rerender pricing controller
│   │   ├── SocialProof.tsx         — Testimonials and integrations grid
│   │   └── StatsSection.tsx        — Key performance metrics
│   ├── globals.css                 — Animations, utility classes, design tokens
│   ├── layout.tsx                  — Font loading, metadata, and JSON-LD schema
│   └── page.tsx                    — Page layout assembler
├── public/                         — Standard vector icons (.svg)
├── package.json                    — Dependencies and scripts
└── tsconfig.json                   — TypeScript config
```

---

## 🚀 Getting Started

### Prerequisites
Ensure you have **Node.js** (v18 or higher) installed.

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev -- --port 3001
```
Open [http://localhost:3001](http://localhost:3001) in your browser to view the application.

### 3. Build for Production
```bash
npm run build
```
Verify that the production output is compiled and optimized.
