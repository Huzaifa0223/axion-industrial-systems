# Axion Industrial Systems — Next.js 15 Platform

A modern multi-page B2B industrial engineering, automation, and system integration platform built with Next.js 15 App Router, TypeScript, Tailwind CSS v4, Motion, GSAP, and React Three Fiber.

## 🚀 Key Features

- **Strict Content-Driven Architecture**: Every heading, body paragraph, navigation link, specification, and form field is driven directly by JSON in `content/*.json`. No hardcoded copy.
- **Static Site Generation (SSG)**: Statically exported (`output: "export"`) into pure HTML/CSS/JS for instant load times, bulletproof security, and universal CDN deployment.
- **Interactive 3D Particle Network**: Interactive WebGL node-and-link network with pointer parallax built on Three.js and `@react-three/fiber`, paired with an ambient CSS gradient fallback.
- **Accessibility & Reduced Motion**: Automatically detects `prefers-reduced-motion` and disables smooth scrolling (Lenis), marquees, 3D WebGL canvases, and cursor physics while keeping full content readability.
- **High-Performance Motion**:
  - Lenis smooth scrolling driving GSAP ScrollTrigger
  - Pinned horizontal scrolling on desktop for `/solutions`
  - 3D card tilt on pointer devices
  - Infinite auto-loop marquees for partners and clients with edge gradient masks
  - Glassmorphic header with scroll reveal/hide physics
  - Once-per-session SVG stroke-drawing preloader (under 1.4s)
- **Dynamic Form Engine**: Generates accessible forms with real-time validation, honeypot spam protection, and build-time dynamic options lookup directly from `forms.json`.

---

## 🎨 Rebranding Guide

To rebrand this demo platform for another manufacturer, distributor, or systems integrator:

1. **Brand Identity & SEO**:
   Update `content/site.json`:
   - Change `brand.name`, `brand.legalName`, and `brand.tagline`.
   - Update `seo.defaultTitle` and `seo.description`.
   - Update `contact` address, phone, email, and coordinates.

2. **Logos & Visual Assets**:
   Replace assets in `public/brand/`:
   - `public/brand/mark.svg` (Square icon/mark)
   - `public/brand/favicon.svg` (Favicon)
   - `public/brand/logo-light.svg` (Horizontal logo for light mode)
   - `public/brand/logo-dark.svg` (Horizontal logo for dark mode)

3. **Color Palette & Design Tokens**:
   Modify `content/theme.json`:
   - Adjust `colors.light` and `colors.dark` hex codes for `primary`, `accent`, and surfaces.
   - Run `pnpm build` to compile the new CSS custom properties.

4. **Product Lineup & Solutions**:
   - Add/edit hardware categories in `content/products.json`.
   - Update integration capabilities in `content/solutions.json`.
   - Add case studies and metrics in `content/projects.json`.

---

## 🛠️ Development & Build Commands

```bash
# Install exact dependencies
pnpm install

# Start development server
pnpm dev

# Run unit tests (Vitest)
pnpm test

# Type-check TypeScript codebase
pnpm typecheck

# Build static HTML export (output: "export")
pnpm build
```

---

## 🧪 Testing

- **Unit Tests**:
  `pnpm test` validates all Zod schemas, content loaders, 404 lookups, form options resolution, and counter animations.
- **E2E Tests**:
  `pnpm test:e2e` tests navigation, keyboard accessibility, mega menu interactions, form submissions, reduced motion guards, and mobile 375px responsive views.

---

## 📜 License & Compliance

MIT License. Designed and engineered for Axion Industrial Systems demonstration.
