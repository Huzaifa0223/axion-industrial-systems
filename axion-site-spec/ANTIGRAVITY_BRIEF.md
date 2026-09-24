# Execution Brief — Axion Industrial Systems (demo site)

Paste this whole file into Antigravity along with the `content/` folder. The agent should run it
start to finish.

## 0. What you are building

A multi-page B2B engineering/automation company website. The information architecture is modelled
on a scanned reference site (industrial automation distributor). The visuals are a big upgrade:
a WebGL particle-network hero, scroll-driven animation, glassmorphic header, mega menus, and
marquees. **All content comes from `content/*.json`. Hard-coded copy in components is not allowed.**

Brand is a placeholder ("Axion"). Swap `content/site.json` + `/public/brand/*` to rebrand.

## 1. Stack (fixed — do not substitute)

| Concern | Choice | Why |
|---|---|---|
| Framework | **Next.js 15 App Router, TypeScript strict, `output: "export"`** | Marketing site needs SSG HTML for SEO; static export deploys to any host. Vite SPA would ship empty HTML to crawlers. |
| Styling | Tailwind CSS v4, CSS variables generated from `theme.json` | Tokens stay in one place; dark mode via `data-theme`. |
| Motion | `motion` (Framer Motion) for component/UI transitions; **GSAP + ScrollTrigger** for pinned/scrubbed scroll scenes; **Lenis** smooth scroll | Each library does what it is best at; don't overlap them on the same element. |
| 3D | `three` + `@react-three/fiber` + `@react-three/drei` (hero only, lazy-loaded) | |
| Carousel | `embla-carousel-react` + autoplay plugin | Lightweight, drag physics. |
| Icons | `lucide-react` (icon names in JSON are lucide names) | |
| Forms | `react-hook-form` + `zod` (schemas generated from `forms.json`) | |
| Validation | `zod` schemas for every JSON file, checked at build time | Bad content fails the build, not production. |
| Tests | Vitest + Testing Library (unit), Playwright (e2e + reduced-motion run) | |
| Lint | ESLint (next config) + Prettier, `tsc --noEmit` in CI | |

Pin exact versions in `package.json` (no `^`). Package manager: pnpm.

## 2. Phase 1 — Audit (read before you design)

1. Read every file in `content/`. Print a table: file → top-level keys → which route/component uses it.
2. List every image path referenced in the JSON. Create a `public/` placeholder for each (use
   solid-gradient SVGs or royalty-free Unsplash images, with credits in `public/CREDITS.md`).
3. Flag any JSON key that no component consumes, and any component that needs data not in JSON.
   Propose JSON additions; don't hard-code.

## 3. Phase 2 — Architecture spec (print this before writing any code)

### Routes
```
/                              home.json
/about                         about.json#about
/about/firmware                about.json#firmware
/about/structure               about.json#structure
/products                      products.json (category grid)
/products/[slug]               products.json#categories[slug]   (generateStaticParams)
/solutions                     solutions.json (pinned horizontal scroll on desktop)
/solutions/[slug]              solutions.json#items[slug]       (generateStaticParams)
/projects                      projects.json (filterable by ?sector=)
/projects/[slug]               projects.json#items[slug]
/careers                       careers.json
/contact                       site.json#contact + forms.json#enquiry
```

### Folder layout
```
src/
  app/(site)/layout.tsx           Header, Footer, SmoothScroll, Cursor, PageTransition
  app/(site)/page.tsx             Home
  app/(site)/.../page.tsx         one per route above
  content/                        ← copy of the provided JSON (single source of truth)
  lib/content.ts                  typed loaders: getSite(), getSolutions(), getSolution(slug)...
  lib/schemas/*.ts                zod schema per JSON file
  lib/theme.ts                    theme.json → CSS variables
  lib/motion.ts                   animations.json → easings/durations constants
  components/layout/              Header, MegaMenu, MobileNav, Footer, Preloader
  components/hero/                HeroSlider, ParticleNetwork (R3F), SlideText, HeroPagination
  components/sections/            Commitment, Stats, SolutionsCarousel, LogoMarquee, ContactBand
  components/cards/               SolutionCard (tilt), ProjectCard, ProductCard
  components/ui/                  Button (magnetic), Chip, SectionHeading, SplitText, Counter
  components/forms/               DynamicForm (renders from forms.json)
  hooks/                          useReducedMotion, useLenis, useMagnetic, useInView
```

### Data rules
- Loaders parse JSON through zod at build time; a schema failure throws with the file + path.
- `optionsFrom: "solutions.json#items[].title"` in `forms.json` resolves at build time.
- `{year}` in the footer copyright is replaced at render time.
- `home.json.stats.note` and `projects.json.note` say the figures are demo data. Show a small "Demo
  data" badge while `NEXT_PUBLIC_DEMO=true`.

### Motion rules (source: `animations.json`)
- One `MotionConfig` at the root with `reducedMotion="user"`.
- If `prefers-reduced-motion` is set: no Lenis, no R3F canvas, no marquee, no parallax, no custom
  cursor. Content stays fully readable. Playwright runs a reduced-motion pass to check this.
- GSAP ScrollTrigger only in client components, cleaned up with `gsap.context().revert()` on unmount.
- Lenis drives ScrollTrigger (`lenis.on('scroll', ScrollTrigger.update)`).
- The R3F hero uses `next/dynamic` with `ssr:false` and renders a gradient fallback first. It pauses
  (`frameloop="demand"`) when the hero is off-screen.

### Forms
- Static export means no server. Put `/api/*` endpoints behind an env var
  `NEXT_PUBLIC_FORM_ENDPOINT` (Formspree / Web3Forms / your own FastAPI). Default is a mock
  that resolves after 800 ms.
- Honeypot field + client-side rate-limit hint. Real rate limiting belongs to the backend.

## 4. Staged commits (each must build and pass tests on its own)

1. `chore(init): scaffold next 15 + ts strict + tailwind + lint + vitest + playwright`
2. `feat(content): zod schemas + typed loaders for all content JSON` — tests: every file parses; a broken fixture fails
3. `feat(theme): tokens from theme.json, light/dark, fonts`
4. `feat(layout): header (glass on scroll, hide/reveal), mega menu, mobile nav, footer`
5. `feat(hero): slider with split-text transitions + pagination progress` (no 3D yet)
6. `feat(hero): R3F particle network, lazy + fallback + reduced-motion guard`
7. `feat(home): commitment, stats counter, solutions carousel, marquees, contact band`
8. `feat(pages): products, solutions (pinned scroll), projects (filter), about, careers, contact`
9. `feat(forms): dynamic form renderer + zod + mock endpoint`
10. `feat(motion): lenis, page transitions, preloader, magnetic buttons, cursor`
11. `perf: image optimisation, font subsetting, bundle check against budget`
12. `test(e2e): playwright nav, forms, reduced-motion, mobile viewport`
13. `docs: README with rebrand guide + screenshots`

If a later stage fails, earlier stages stay committed and working.

## 5. Tests alongside features
- Unit: schema parse/reject, `content.ts` slug lookups (404 on unknown), `Counter` final value,
  `DynamicForm` renders the right fields and required errors per `forms.json`.
- E2E: every nav link resolves; mega menu opens by keyboard (Enter/Esc/Arrow); enquiry form
  submits against the mock; `/projects?sector=water` filters; hero has no canvas when
  reduced motion is set; no horizontal scroll at 375px.
- Lighthouse CI: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95 on `/`.

## 6. Accessibility
- Every animation is decorative. Content order and meaning never depend on it.
- Hero slider: `aria-roledescription="carousel"`, pause button, arrow-key support, autoplay stops on focus.
- Mega menus: disclosure pattern, focus trap on mobile nav, visible focus rings (accent colour).
- Text contrast ≥ 4.5:1 in both themes, including over the hero image (add a gradient scrim).

## 7. Manual smoke test
- [ ] Preloader shows once per session and never lasts more than 1.4 s
- [ ] Header turns to glass after 60 px, hides on scroll down, shows on scroll up
- [ ] All 5 hero slides animate in; progress bar matches autoplay; pause works
- [ ] Particle network reacts to the mouse; on mobile it has fewer nodes or falls back
- [ ] Stats count up once, when scrolled into view
- [ ] Solutions carousel drags with momentum; card tilt only on pointer devices
- [ ] Partner/customer marquees loop without gaps and pause on hover
- [ ] `/solutions` pins and scrolls sideways on desktop and stacks on mobile
- [ ] Project filter animates the layout and the URL updates `?sector=`
- [ ] Enquiry form: validation messages, honeypot, success state
- [ ] OS "reduce motion" on → site fully usable, no 3D, no smooth scroll
- [ ] Dark/light toggle keeps its choice across reloads
- [ ] Changing a title in `solutions.json` updates the nav, carousel, detail page and form dropdown

## 8. Out of scope for the demo
CMS, i18n/Arabic RTL (the `alternateLocales` key is reserved for it), analytics, a real mail backend.
