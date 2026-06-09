# Implementation Plan: Sri Ganesh Enterprises Website

## Overview

Incremental implementation of the single-page React + Vite + Tailwind CSS + Framer Motion website. Each task builds directly on the previous step. Code is wired together as each section is completed — no orphaned components. All section components below the fold are lazy-loaded. Testing sub-tasks are optional and marked with `*`.

---

## Tasks

- [x] 1. Project scaffolding and design system setup
  - Initialize project with `npm create vite@latest . -- --template react`
  - Install production dependencies: `react-router-dom`, `framer-motion`, `lucide-react`
  - Install and configure Tailwind CSS v3 with PostCSS: `tailwindcss`, `autoprefixer`
  - Create `tailwind.config.js` extending the default theme with the full brand color palette (primary `#0F172A`, secondary `#1E40AF`, accent `#2563EB`, success `#16A34A`, highlight `#F59E0B`, background `#FFFFFF`, section `#F8FAFC`, dark `#0B1220`, text-primary `#111827`, text-secondary `#64748B`, border `#E2E8F0`)
  - Add custom font-size tokens for fluid typography (`text-hero`, `text-heading`, `text-subheading`) using `clamp()` values
  - Add Google Fonts link for Inter (weights 400, 500, 600) and Poppins (weights 600, 700, 800) in `index.html`
  - Set `font-family` base in `index.css` using Tailwind `@layer base`
  - Add `scroll-behavior: smooth` to `html` element in `index.css`
  - Add `overflow-x: hidden` to `body` in `index.css`
  - Create folder structure: `src/components/`, `src/components/ui/`, `src/sections/`, `src/hooks/`, `src/data/`, `src/assets/`, `src/lib/`
  - Add `<title>Sri Ganesh Enterprises – Wholesale Electronics Distributor Chennai</title>` and `<meta name="description">` in `index.html`
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 15.7_

  - [ ]* 1.1 Smoke test: verify `npm run build` completes without errors
    - Run build and confirm zero errors and zero warnings
    - _Requirements: 1.6_

- [x] 2. Data layer — static content files
  - Create `src/data/navLinks.js` with all six navigation links (Home, About, Products, Brands, Why Us, Contact) and their `href` anchor IDs
  - Create `src/data/whyChooseUs.js` with six card objects: id, title, icon name, description for (Genuine Products, Bulk Pricing, Fast Delivery, Trusted Suppliers, Customer Support, Wide Product Range)
  - Create `src/data/categories.js` with six ProductCategory objects (Electronics, Computers & IT, Mobiles, Home Appliances, Networking, Security Systems), each with sub-product lists, icon names, and illustration paths
  - Create `src/data/products.js` with six FeaturedProduct objects (Dell Latitude Laptop, Samsung Smart TV, LG Refrigerator, HP Printer, Lenovo ThinkPad, CCTV Camera System), each with brand, category, categoryColor
  - Create `src/data/brands.js` with array of twelve brand names: Samsung, LG, Dell, HP, Lenovo, Asus, Acer, Sony, Apple, Xiaomi, Vivo, Realme
  - Create `src/data/stats.js` with four Stat objects: `{ target: 5000, suffix: '+', label: 'Products', icon: 'Package' }`, Clients (1000+), Brands (100+), Years Experience (10+)
  - Create `src/data/testimonials.js` with a minimum of four Testimonial objects (clientName, company, avatarInitials, rating, review)
  - _Requirements: 4.3, 5.1, 6.1, 7.1, 8.1, 9.1, 10.1_

- [x] 3. Animation system and shared hooks
  - Create `src/lib/animations.js` with all five reusable Framer Motion variant objects: `fadeUp`, `fadeIn`, `slideLeft`, `slideRight`, `scaleIn` (each with `hidden` and `visible` keys), plus `staggerContainer` and `floatAnimation`
  - Implement `makeVariants(variants, reducedMotion)` helper that returns opacity-only variants when `reducedMotion` is true
  - Create `src/hooks/useReducedMotion.js` using `window.matchMedia('(prefers-reduced-motion: reduce)')` with a `change` event listener
  - Create `src/hooks/useScrollPosition.js` using a `scroll` event listener that returns current `window.scrollY`
  - Create `src/hooks/useActiveSection.js` using `IntersectionObserver` on the section IDs array; returns the id of the currently most-visible section
  - Create `src/hooks/useCounterAnimation.js` using `requestAnimationFrame` to interpolate from 0 to `target` over `duration` ms; returns current display value; triggered by an `isVisible` boolean prop
  - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5, 13.6_

  - [ ]* 3.1 Write property test for animation variants structure
    - **Property 1: Animation variants have correct structure** — for each of the five named exports, assert `hidden` and `visible` keys exist and their values differ
    - **Property 2: Reduced-motion disables transforms** — for any variant passed to `makeVariants(v, true)`, assert returned `visible` state has no `x`, `y`, or `scale` keys
    - Use fast-check to generate arbitrary variant objects and verify `makeVariants` contract
    - _Requirements: 13.3, 13.6_

  - [ ]* 3.2 Write unit test for useCounterAnimation
    - Use fake timers (Vitest `vi.useFakeTimers`) to advance time
    - Assert counter starts at 0 and equals `target` after `duration` ms elapses
    - **Property 9: Counter animation starts at zero and reaches target**
    - _Requirements: 9.3_

- [x] 4. Shared UI components
  - Create `src/components/ui/Button.jsx` with variants `primaryAccent` (bg-accent, white text), `outline` (transparent, white border), `ghost`; sizes `sm`, `md`, `lg`; renders `<a>` when `href` is provided, `<button>` otherwise; all instances have `min-h-[44px] min-w-[44px]`; visible `:focus-visible` outline ring
  - Create `src/components/ui/SectionHeader.jsx` with `title`, `subtitle`, `align` props; renders `<h2>` using `text-heading` class and optional `<p>` in `text-subheading`
  - Create `src/components/ui/Badge.jsx` for brand/category chips; accepts `label`, `color` (Tailwind bg class); renders a small rounded pill
  - Create `src/components/ui/Card.jsx` wrapping `motion.div`; `hoverLift` prop enables `whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}`
  - _Requirements: 4.5, 5.4, 14.4, 15.6_

- [x] 5. Navbar component
  - Create `src/components/Navbar.jsx` with `position: fixed`, `top-0`, `w-full`, `z-50`
  - Use `useScrollPosition` to apply `bg-transparent` when scroll is 0 and `bg-primary/90 backdrop-blur-md shadow-lg transition-all duration-300` when scroll > 50
  - Render brand logo (SVG icon + "Sri Ganesh Enterprises" text) on the left
  - Render centered nav links from `navLinks.js` data; each is `<a href="#...">` smooth-scroll anchor
  - Use `useActiveSection` to apply active link styling: `border-b-2 border-accent text-accent` on matching link
  - Render "Get Quote" `<Button variant="primaryAccent">` on the right
  - At `< md` breakpoint, hide center links and CTA; show hamburger `<Menu>` Lucide icon button
  - Implement `mobileOpen` state toggle; render mobile drawer as `motion.div` sliding in from top or right using `fadeUp` variant
  - Each mobile link click: call `element.scrollIntoView({ behavior: 'smooth' })` then set `mobileOpen(false)`
  - Mobile drawer backdrop div closes drawer on click
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 2.10_

  - [ ]* 5.1 Write unit tests for Navbar
    - Assert navbar renders brand name and all six nav links
    - Assert `bg-primary/90` class is absent at scroll 0 and present at scroll 60 (mock `useScrollPosition`)
    - Assert hamburger button is visible at 375px viewport width (use `jsdom` resize)
    - Assert mobile drawer opens on hamburger click and closes on link click
    - _Requirements: 2.1, 2.2, 2.3, 2.8, 2.9, 2.10_

- [x] 6. Hero section
  - Create `src/sections/Hero.jsx` with `min-h-screen` and `bg-gradient-to-br from-primary to-secondary`
  - Left column: headline `<h1>` "YOUR TRUSTED WHOLESALE ELECTRONICS PARTNER" using `text-hero` class; subheadline listing product categories; two `<Button>` CTAs (primaryAccent "Explore Products", outline "Contact Us" pointing to `#contact`)
  - Below CTAs: trust pill row — two small dark-glass `<span>` chips: "5000+ Products", "1000+ Clients"
  - Right column: `<motion.div animate={floatAnimation}>` wrapping hero SVG illustration or styled placeholder electronics showcase panel
  - Wrap headline, subheadline, buttons in `motion.div` with `fadeUp` variants and `staggerContainer` parent for 150ms stagger
  - Use `useReducedMotion` and `makeVariants` to disable transforms when motion is reduced
  - Add abstract SVG background shapes (e.g. blurred circles) as `absolute` positioned decorative elements
  - All responsive: stack to single column on mobile, side-by-side on `lg:`
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9_

  - [ ]* 6.1 Write unit tests for Hero
    - Assert headline text is present in DOM
    - Assert both CTA buttons render with correct text
    - Assert trust pills render "5000+ Products" and "1000+ Clients"
    - Assert hero illustration element is present
    - _Requirements: 3.2, 3.3, 3.4, 3.9_

- [x] 7. About section
  - Create `src/sections/About.jsx`
  - Render `<SectionHeader title="About Sri Ganesh Enterprises" />`
  - Render multi-paragraph description covering company history, Tamil Nadu + South India geography, product breadth, B2B specialization
  - Render four feature cards using `<Card hoverLift>` from `whyChooseUs` data or a dedicated `aboutFeatures` array: Wholesale Electronics (Truck icon), Bulk Orders (Package icon), Genuine Products (ShieldCheck icon), Competitive Pricing (BadgeDollarSign icon)
  - Wrap cards in `motion.div` with `staggerContainer` + `whileInView={{ once: true }}`; each card has `fadeUp` variant
  - Assign `id="about"` to the section element
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

  - [ ]* 7.1 Write property test for About section card completeness
    - **Property 3: All feature cards rendered** — render About section and assert all four labels are present in document
    - _Requirements: 4.3_

- [x] 8. Why Choose Us section
  - Create `src/sections/WhyChooseUs.jsx`
  - Render `<SectionHeader title="Why Choose Us" />` centered
  - Map over `whyChooseUs.js` data to render six `<Card hoverLift>` cards, each containing: Lucide icon, `<h3>` title, `<p>` description
  - Grid: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`
  - Wrap grid in `staggerContainer` `motion.div` with `whileInView={{ once: true }}`; each card has `scaleIn` variant
  - Hover state: `whileHover` adds blue accent left-border or gradient via Tailwind `group-hover:` utilities
  - Assign `id="why-us"` to the section element
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

  - [ ]* 8.1 Write property test for Why Choose Us completeness
    - **Property 4: Why Choose Us completeness** — render section and assert all six titles present; assert each rendered card contains an icon element, title text, and description text
    - Use fast-check to generate shuffled subsets of the card data and verify the component still renders all six when given full data
    - _Requirements: 5.1, 5.2_

- [x] 9. Product Categories section
  - Create `src/sections/ProductCategories.jsx`
  - Render `<SectionHeader title="Our Product Categories" />` centered
  - Map over `categories.js` data to render six category cards, each with: `<img>` (illustration with non-empty `alt`), Lucide icon, `<h3>` category name, `<p>` sub-products description, `<Button variant="primaryAccent">View Products</Button>`
  - Grid: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`
  - Image hover: `group-hover:scale-105 transition-transform duration-300` on image
  - Button hover: color deepens via `hover:bg-blue-700`
  - `onError` on each `<img>` swaps src to inline SVG placeholder
  - Wrap in `staggerContainer` + `whileInView={{ once: true }}`; each card `fadeUp`
  - Assign `id="categories"` to section element
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 15.3_

  - [ ]* 9.1 Write property test for Product Categories completeness
    - **Property 5: Product Categories completeness** — render section, assert all six category names present; assert each card has an img with non-empty alt, an icon, a description, and a "View Products" button
    - _Requirements: 6.1, 6.2, 15.3_

- [x] 10. Featured Products section
  - Create `src/sections/FeaturedProducts.jsx`
  - Render `<SectionHeader title="Featured Products" />` centered
  - Map over `products.js` data to render six product cards, each with: `<img>` product image (non-empty `alt`), `<Badge>` category tag, `<h3>` product name, `<p>` brand name, `<Button variant="primaryAccent">Enquire Now</Button>`
  - Grid: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`
  - Hover: `whileHover={{ y: -6 }}` on card; Enquire Now button transitions to brighter accent on card hover via `group-hover:` utility
  - Wrap in `staggerContainer` + `whileInView={{ once: true }}`; each card `fadeUp`
  - Assign `id="products"` to section element
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 15.3_

  - [ ]* 10.1 Write property test for Featured Products completeness
    - **Property 6: Featured Products completeness** — render section, assert all six product names present; assert each card has img with non-empty alt, brand name, an "Enquire Now" button, and a badge/tag element
    - _Requirements: 7.1, 7.2, 7.4, 15.3_

- [x] 11. Checkpoint — verify sections 5–10
  - Ensure all tests pass, ask the user if questions arise.
  - Confirm no horizontal scroll at 320px and 1280px viewport widths in browser

- [x] 12. Brands Marquee section
  - Create `src/sections/BrandsMarquee.jsx`
  - Render two identical `<ul>` lists of brand chips side-by-side in a flex container with CSS `@keyframes marquee` running `translateX(-50%)` infinitely at a speed of ~30s
  - Inject `animation-play-state: paused` into inline style on `onMouseEnter`; restore `running` on `onMouseLeave`
  - Each brand chip: `<li>` with brand name text (or styled text chip); default `filter: grayscale(100%)`, `hover:filter-none transition-all duration-300`
  - Container: `overflow-hidden` to prevent horizontal overflow
  - Assign `id="brands"` to section element
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6_

  - [ ]* 12.1 Write property test for Brands Marquee completeness
    - **Property 7: Brands Marquee completeness** — render BrandsMarquee, assert all twelve brand names are present in the rendered output (account for duplication in the two lists)
    - Assert container element has `overflow-hidden` class
    - _Requirements: 8.1, 8.6_

- [x] 13. Stats Counter section
  - Create `src/sections/StatsCounter.jsx`
  - Section background: `bg-dark text-white`
  - Grid: `grid grid-cols-2 lg:grid-cols-4 gap-8 text-center`
  - For each stat in `stats.js`: render a `motion.div` with `whileInView={{ once: true }}` trigger that calls `useCounterAnimation(target, 2000)` and displays `{displayValue}{suffix}` as a large bold number, plus `<p>` label below
  - Lucide icon rendered above the number for each stat
  - Assign `id="stats"` to section element
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

  - [ ]* 13.1 Write unit test for StatsCounter rendering
    - **Property 8: Stats Counter completeness** — render StatsCounter, assert all four stat labels present and all have numeric value and suffix elements
    - _Requirements: 9.1, 9.2_

- [x] 14. Testimonials section
  - Create `src/sections/Testimonials.jsx`
  - State: `activeIndex: number` (0), `isPaused: boolean` (false)
  - Render testimonials as a sliding carousel using `motion.div` with `AnimatePresence` for slide transition on index change
  - Show 1 card on mobile, 2–3 on `lg:` via visible window + CSS
  - Render previous `<ChevronLeft>` and next `<ChevronRight>` Lucide icon buttons (min 44×44px tap targets)
  - Arrow click: decrement / increment `activeIndex` with wraparound
  - `useEffect` auto-advance: `setInterval` every 5000ms when `!isPaused`; clear on cleanup
  - `onMouseEnter` sets `isPaused(true)`; `onMouseLeave` sets `isPaused(false)`
  - Each testimonial card: avatar circle with initials, `<h4>` name, `<p>` company, star rating (filled `<Star>` icons), review text
  - Assign `id="testimonials"` to section element
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6_

  - [ ]* 14.1 Write unit tests for Testimonials carousel
    - **Property 10: Testimonials completeness** — render section, for each testimonial card assert clientName, company, rating stars, and review text are present
    - Assert clicking next arrow increments activeIndex (mock testimonials data with 4 items)
    - Assert auto-advance with `vi.useFakeTimers` — advance 5000ms and assert index changed
    - Assert mouseEnter pauses auto-advance
    - _Requirements: 10.1, 10.4, 10.5, 10.6_

- [x] 15. Contact section
  - Create `src/sections/ContactSection.jsx`
  - Left card (slide-in-left animation): company name, contact person "K. Ganesh Rao", phone "+91 91503 10876", full address, business hours text
  - Three CTA buttons: `<a href="tel:+919150310876">Call Now</a>`, `<a href="https://wa.me/919150310876">WhatsApp Us</a>`, `<a href="https://maps.google.com/?q=...">Get Directions</a>` — all using `<Button>` component
  - Right card (slide-in-right animation): contact form with four fields — Name (`<input>`), Company Name (`<input>`), Phone Number (`<input type="tel">`), Product Inquiry (`<textarea>`), all with visible `<label>` elements for accessibility
  - Submit button: `<Button variant="primaryAccent">Send Inquiry</Button>`
  - `handleSubmit`: validate all four fields non-empty and phone matches `/^(\+91|0)?[6-9]\d{9}$/`; if invalid set `errors` state and display `<p className="text-red-500 text-sm">` beneath each failing field; if valid clear errors (no network request in this implementation)
  - All inputs have `:focus-visible` ring and `min-h-[44px]`
  - Wrap left card in `slideLeft` variant, right card in `slideRight` variant with `whileInView={{ once: true }}`
  - Assign `id="contact"` to section element
  - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5, 11.6, 14.4, 15.6_

  - [ ]* 15.1 Write property test for contact form validation
    - **Property 12: Contact form validation rejects incomplete submissions** — use fast-check to generate arbitrary combinations of empty/whitespace/valid field values; assert that when any required field is empty or whitespace-only, submission sets at least one error and does not call submit handler
    - _Requirements: 11.4_

  - [ ]* 15.2 Write unit test for Contact section CTA hrefs
    - **Property 11: Contact CTA button hrefs are correct** — render ContactSection, assert `href` values on all three CTA buttons match the exact expected values
    - _Requirements: 11.2_

- [x] 16. Footer component
  - Create `src/components/Footer.jsx` with `bg-dark text-white`
  - Four-column grid: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8`
  - Column 1 "Company": brand name + short description + social icons (WhatsApp, Facebook, Instagram, LinkedIn) as `<a>` links; each social icon `hover:text-[platformColor] transition-colors duration-300`
  - Column 2 "Quick Links": list of anchor links matching nav (Home, About, Products, Brands, Why Us, Contact)
  - Column 3 "Categories": list of six category names (Electronics, Computers & IT, Mobiles, Home Appliances, Networking, Security)
  - Column 4 "Contact": address, phone "+91 91503 10876", email placeholder
  - Bottom border row: "© 2024 Sri Ganesh Enterprises. All rights reserved."
  - All links and icon buttons: `min-h-[44px]` tap targets, visible focus ring
  - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 12.6, 14.4, 15.6_

  - [ ]* 16.1 Write property test for Footer completeness
    - **Property 13: Footer columns completeness** — render Footer, assert all four column headings present, assert all six Quick Links present, assert all six Category links present, assert copyright text present
    - _Requirements: 12.2, 12.5_

- [x] 17. App.jsx wiring — integrate all sections with lazy loading
  - In `src/App.jsx`: eagerly import `Navbar` and `Footer`; eagerly render `Hero`
  - Use `React.lazy` to import all nine section components: `About`, `WhyChooseUs`, `ProductCategories`, `FeaturedProducts`, `BrandsMarquee`, `StatsCounter`, `Testimonials`, `ContactSection`
  - Wrap lazy sections in a single `<Suspense fallback={<div className="h-32 animate-pulse bg-section" />}>` block
  - Render all sections in order inside `<main>` with `<section id="...">` wrappers
  - Apply `<header>` to Navbar wrapper and `<footer>` to Footer wrapper for semantic HTML
  - Confirm `<html lang="en">` is set in `index.html`
  - _Requirements: 1.5, 15.1, 15.4_

  - [ ]* 17.1 Write unit test for App integration
    - Render `<App />` with all lazy sections resolved (use `vi.mock` for lazy imports or `waitFor` with Suspense)
    - Assert all section `id` attributes are present in document (`#home`, `#about`, `#why-us`, `#categories`, `#products`, `#brands`, `#stats`, `#testimonials`, `#contact`)
    - Assert `<header>`, `<main>`, `<footer>` semantic elements are present
    - _Requirements: 1.5, 15.4_

- [x] 18. Checkpoint — full integration pass
  - Ensure all tests pass, ask the user if questions arise.
  - Visual check: open site at 320px, 768px, 1280px; confirm no horizontal scrollbar, all sections render

- [x] 19. Accessibility and responsiveness polish
  - Audit all `<img>` elements and confirm non-empty `alt` text — fix any missing `alt` attributes
  - Audit all interactive elements (buttons, links, form inputs) for visible `:focus-visible` outline ring
  - Add `aria-label` to icon-only buttons (hamburger, carousel arrows, social icons)
  - Add `aria-expanded` and `aria-controls` to Navbar hamburger button
  - Add `role="region"` and `aria-label` to each `<section>` element
  - Add `aria-live="polite"` to Testimonials carousel container for screen-reader announcements
  - Verify color contrast: primary text (`#111827`) on `#FFFFFF` ≥ 4.5:1; white text on `#0F172A` ≥ 4.5:1
  - Test keyboard navigation: Tab through entire page, confirm all interactive elements are reachable
  - Test at 320px width and confirm no overflow, tap targets ≥ 44px
  - _Requirements: 14.1, 14.3, 14.4, 15.3, 15.4, 15.5, 15.6_

  - [ ]* 19.1 Write property test for img alt text coverage
    - **Property 14: All img elements have non-empty alt text** — render each section component individually; use `document.querySelectorAll('img')` and assert every element has `.alt` that is non-empty string
    - _Requirements: 15.3_

  - [ ]* 19.2 Write property test for no horizontal overflow
    - **Property 15: No horizontal overflow at any viewport width** — for each defined viewport width (320, 375, 768, 1024, 1280), set `document.documentElement.style.width` and assert `document.body.scrollWidth <= viewportWidth`
    - _Requirements: 14.3_

  - [ ]* 19.3 Write property test for mobile tap targets
    - **Property 16: Mobile tap targets meet minimum size** — at 375px viewport, query all `button` and `a` elements, assert each has `offsetHeight >= 44` and `offsetWidth >= 44`
    - _Requirements: 14.4_

- [x] 20. Performance optimizations
  - Add `loading="lazy"` attribute to all `<img>` elements below the fold (all outside Hero)
  - Add `fetchpriority="high"` to Hero illustration image
  - Add `rel="preconnect"` and `rel="preload"` for Google Fonts in `index.html`
  - Review bundle size with `npx vite-bundle-visualizer` (or equivalent); ensure no duplicate large packages
  - Confirm all section components are code-split (lazy-loaded) and do not appear in the initial bundle
  - _Requirements: 15.1, 15.2_

- [x] 21. Final checkpoint — production-ready verification
  - Ensure all tests pass, ask the user if questions arise.
  - Run `npm run build` and confirm zero errors
  - Confirm `dist/` folder contains hashed JS chunks for each lazy-loaded section
  - Open production build (`npx vite preview`) and verify full page loads correctly at desktop and mobile widths

---

## Task Dependency Graph

```json
{
  "waves": [
    { "wave": 1, "tasks": ["1. Project scaffolding and design system setup"] },
    { "wave": 2, "tasks": ["2. Data layer — static content files", "3. Animation system and shared hooks"] },
    { "wave": 3, "tasks": ["4. Shared UI components"] },
    { "wave": 4, "tasks": ["5. Navbar component", "6. Hero section"] },
    { "wave": 5, "tasks": ["7. About section"] },
    { "wave": 6, "tasks": ["8. Why Choose Us section"] },
    { "wave": 7, "tasks": ["9. Product Categories section"] },
    { "wave": 8, "tasks": ["10. Featured Products section"] },
    { "wave": 9, "tasks": ["11. Checkpoint — verify sections 5–10"] },
    { "wave": 10, "tasks": ["12. Brands Marquee section", "13. Stats Counter section"] },
    { "wave": 11, "tasks": ["14. Testimonials section"] },
    { "wave": 12, "tasks": ["15. Contact section", "16. Footer component"] },
    { "wave": 13, "tasks": ["17. App.jsx wiring — integrate all sections with lazy loading"] },
    { "wave": 14, "tasks": ["18. Checkpoint — full integration pass"] },
    { "wave": 15, "tasks": ["19. Accessibility and responsiveness polish"] },
    { "wave": 16, "tasks": ["20. Performance optimizations"] },
    { "wave": 17, "tasks": ["21. Final checkpoint — production-ready verification"] }
  ]
}
```

---

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP build — core functionality is complete without them
- All tasks assume the previous task's output is available (incremental dependency chain)
- Property tests use **fast-check** (`npm install -D fast-check`) and **Vitest** + **React Testing Library**
- Each correctness property in tasks references its number from the design document
- Checkpoints at tasks 11, 18, and 21 serve as integration validation gates
- No network requests are made by the contact form in this implementation — the Submit button validates only; actual form submission (EmailJS, Formspree, etc.) is a future enhancement
