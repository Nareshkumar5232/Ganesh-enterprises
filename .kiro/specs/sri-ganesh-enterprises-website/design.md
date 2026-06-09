# Design Document: Sri Ganesh Enterprises Website

## Overview

Sri Ganesh Enterprises is a premium B2B wholesale electronics distributor in Chennai, India. The website is a single-page React application built on Vite that communicates enterprise-scale trust to wholesale buyers across Tamil Nadu and South India. Every design decision — typography, color, animation, layout — is calibrated to feel like a ₹100+ crore operation and to convert qualified B2B leads.

**Tech stack**: React 18 + Vite, Tailwind CSS 3, Framer Motion 11, Lucide React, React Router DOM (hash-based single-page navigation).

**Design philosophy**: Premium dark-accent palette, crisp Inter/Poppins typography, scroll-triggered motion, mobile-first responsive grid.

---

## Architecture

The application is a single-page application (SPA) with no route changes — all content lives on one scrollable page. React Router DOM is used only for smooth in-page anchor navigation helpers. All major section components below the fold are code-split via `React.lazy` + `Suspense` for performance.

```
App.jsx
 ├── <Navbar />                   (always rendered, sticky)
 ├── <main>
 │    ├── <Hero />                (above fold, eager loaded)
 │    ├── <Suspense fallback=...>
 │         ├── <About />
 │         ├── <WhyChooseUs />
 │         ├── <ProductCategories />
 │         ├── <FeaturedProducts />
 │         ├── <BrandsMarquee />
 │         ├── <StatsCounter />
 │         ├── <Testimonials />
 │         └── <ContactSection />
 └── <Footer />                   (always rendered, eager)
```

### Component loading strategy

| Component | Loading | Reason |
|---|---|---|
| `Navbar` | Eager | Must be visible immediately |
| `Hero` | Eager | Above-the-fold critical path |
| `Footer` | Eager | Small, needed for layout stability |
| All section components | `React.lazy` | Below-fold, lazy-loaded for performance |

---

## Components and Interfaces

### Folder Structure

```
src/
├── App.jsx
├── main.jsx
├── index.css                   # Tailwind directives + global resets
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── ui/
│   │   ├── Button.jsx          # Reusable CTA button variants
│   │   ├── SectionHeader.jsx   # Standardized section title + subtitle block
│   │   ├── Card.jsx            # Generic card wrapper with hover animation
│   │   └── Badge.jsx           # Brand/category tag chip
├── sections/
│   ├── Hero.jsx
│   ├── About.jsx
│   ├── WhyChooseUs.jsx
│   ├── ProductCategories.jsx
│   ├── FeaturedProducts.jsx
│   ├── BrandsMarquee.jsx
│   ├── StatsCounter.jsx
│   ├── Testimonials.jsx
│   └── ContactSection.jsx
├── hooks/
│   ├── useScrollPosition.js    # Returns current scroll Y offset
│   ├── useActiveSection.js     # Uses IntersectionObserver to track visible section
│   ├── useCounterAnimation.js  # Animates a number from 0 to target over duration
│   └── useReducedMotion.js     # Returns true if prefers-reduced-motion is set
├── data/
│   ├── navLinks.js             # Navigation link definitions
│   ├── categories.js           # Product category data
│   ├── products.js             # Featured product data
│   ├── brands.js               # Brand list
│   ├── stats.js                # Business statistics
│   ├── testimonials.js         # Client testimonial records
│   └── whyChooseUs.js          # Why Choose Us card data
├── assets/
│   ├── logo.svg
│   ├── hero-illustration.svg
│   └── category-illustrations/ # Per-category SVG placeholders
└── lib/
    └── animations.js           # Framer Motion variant presets
```

### Component Interface Contracts

#### `<Navbar />`
Props: none  
State: `scrolled: boolean`, `mobileOpen: boolean`, `activeSection: string`  
Hooks: `useScrollPosition`, `useActiveSection`

#### `<Button variant primaryAccent|outline|ghost size sm|md|lg />`
Props: `variant`, `size`, `href?`, `onClick?`, `children`, `className?`  
Renders an `<a>` for external links, a `<button>` for actions.

#### `<SectionHeader title subtitle align? />`
Props: `title: string`, `subtitle?: string`, `align?: 'left' | 'center'`  
Renders an `<h2>` with optional `<p>` subtitle, using heading typography styles.

#### `<Card hoverLift? className? />`
Props: `hoverLift?: boolean`, `className?`, `children`  
Wraps content in a Framer Motion `motion.div` with `whileHover` lift preset when `hoverLift` is true.

#### `<StatsCounter target suffix label />`
Props: `target: number`, `suffix?: string`, `label: string`  
Uses `useCounterAnimation` internally with `whileInView` trigger.

#### `<Testimonials />`
Internal state: `activeIndex: number`, `isPaused: boolean`  
Auto-advances via `setInterval`; paused on hover/focus.

#### `<ContactSection />`
Internal state: `formData: { name, company, phone, inquiry }`, `errors: Record<string, string>`  
Validates required fields on submit before dispatching.

---

## Data Models

### NavLink
```typescript
interface NavLink {
  label: string;          // Display text, e.g. "Products"
  href: string;           // Anchor id, e.g. "#products"
}
```

### ProductCategory
```typescript
interface ProductCategory {
  id: string;             // kebab-case slug, e.g. "computers-it"
  name: string;           // Display name
  icon: LucideIconName;   // Lucide icon component name
  description: string;    // One-liner for card
  subProducts: string[];  // Sub-product list for card body
  illustration: string;   // Path to SVG illustration
}
```

### FeaturedProduct
```typescript
interface FeaturedProduct {
  id: string;
  name: string;
  brand: string;
  category: string;       // Refers to ProductCategory.id
  image: string;          // Path to image or SVG placeholder
  categoryColor: string;  // Tailwind color class for category badge
}
```

### Stat
```typescript
interface Stat {
  target: number;         // Final counter value
  suffix: string;         // e.g. "+" or "%"
  label: string;          // e.g. "Products"
  icon: LucideIconName;
}
```

### Testimonial
```typescript
interface Testimonial {
  id: string;
  clientName: string;
  company: string;
  avatarInitials: string; // e.g. "RK"
  rating: number;         // 4 or 5
  review: string;
}
```

### WhyChooseUsCard
```typescript
interface WhyChooseUsCard {
  id: string;
  title: string;
  icon: LucideIconName;
  description: string;
}
```

### ContactFormData
```typescript
interface ContactFormData {
  name: string;
  company: string;
  phone: string;
  inquiry: string;
}

interface ContactFormErrors {
  name?: string;
  company?: string;
  phone?: string;
  inquiry?: string;
}
```

---

## Animation Variants

All animation variants live in `src/lib/animations.js` and are imported by section components. They are built for Framer Motion's `variants` API.

```javascript
// src/lib/animations.js

export const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } },
};

export const slideLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export const slideRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
};

// Container variant for staggered children
export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

// Floating animation for Hero showcase (keyframes via animate prop)
export const floatAnimation = {
  y: [0, -10, 0],
  transition: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' },
};

// Reduced-motion safe wrapper — returns static variants when motion is reduced
export const makeVariants = (variants, reducedMotion) => {
  if (reducedMotion) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0 } },
    };
  }
  return variants;
};
```

### Usage pattern in section components

```jsx
import { motion } from 'framer-motion';
import { staggerContainer, fadeUp, makeVariants } from '../lib/animations';
import { useReducedMotion } from '../hooks/useReducedMotion';

function WhyChooseUs() {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {cards.map(card => (
        <motion.div key={card.id} variants={makeVariants(fadeUp, prefersReduced)}>
          {/* card content */}
        </motion.div>
      ))}
    </motion.div>
  );
}
```

---

## Routing and Navigation

React Router DOM is configured in hash mode. All navigation links use `href="#section-id"` anchor format. The Navbar uses `useActiveSection` (IntersectionObserver) to highlight the currently visible section.

```javascript
// Section IDs (must match id props on section elements)
const SECTION_IDS = ['home', 'about', 'why-us', 'products', 'categories', 'brands', 'stats', 'testimonials', 'contact'];
```

Smooth scrolling is handled via native CSS `scroll-behavior: smooth` on `<html>` and JavaScript `element.scrollIntoView({ behavior: 'smooth' })` for programmatic navigation (mobile menu).

---

## Design System (Tailwind Extension)

### Color Palette

```javascript
// tailwind.config.js theme extension
colors: {
  primary:    '#0F172A',   // Deep navy — primary dark
  secondary:  '#1E40AF',   // Royal blue
  accent:     '#2563EB',   // Brand blue — CTAs, links
  success:    '#16A34A',   // Green — positive signals
  highlight:  '#F59E0B',   // Amber — badge accents
  background: '#FFFFFF',
  section:    '#F8FAFC',   // Off-white section bg
  dark:       '#0B1220',   // Darkest navy — Stats bg, Footer
  'text-primary':   '#111827',
  'text-secondary': '#64748B',
  border:     '#E2E8F0',
}
```

### Typography Scale

| Token | Font | Size | Weight | Usage |
|---|---|---|---|---|
| `text-hero` | Poppins | clamp(28px, 5vw, 56px) | 800 | Hero headline |
| `text-heading` | Poppins | clamp(22px, 3vw, 36px) | 700 | Section titles |
| `text-subheading` | Inter | clamp(16px, 2vw, 20px) | 500 | Section subtitles |
| `text-body` | Inter | 16px | 400 | Body copy |
| `text-small` | Inter | 14px | 400 | Labels, badges |
| `text-xs` | Inter | 12px | 400 | Fine print |

Fluid sizing achieved via Tailwind's `clamp`-based custom font size tokens in `tailwind.config.js`.

### Spacing and Layout

- Max content width: `max-w-7xl` (1280px) centered with `mx-auto px-4 sm:px-6 lg:px-8`
- Section vertical padding: `py-16 lg:py-24`
- Card border radius: `rounded-2xl`
- Card shadow: `shadow-md hover:shadow-xl`

### Grid Patterns

| Section | Mobile | Tablet | Desktop |
|---|---|---|---|
| Why Choose Us | `grid-cols-1` | `grid-cols-2` | `grid-cols-3` |
| Product Categories | `grid-cols-1` | `grid-cols-2` | `grid-cols-3` |
| Featured Products | `grid-cols-1` | `grid-cols-2` | `grid-cols-3` |
| Stats Counter | `grid-cols-2` | `grid-cols-2` | `grid-cols-4` |
| Footer | `grid-cols-1` | `grid-cols-2` | `grid-cols-4` |

---

## Component-Level Design Notes

### Navbar

- `position: fixed; top: 0; width: 100%; z-index: 50`
- Transparent when `scrollY === 0`, transitions to `bg-primary/90 backdrop-blur-md` when `scrollY > 50`
- Active link: accent-colored underline via `border-b-2 border-accent`
- Mobile drawer: slides in from right or drops down, overlay backdrop closes on outside tap
- "Get Quote" button: `bg-accent hover:bg-blue-700 text-white rounded-lg px-4 py-2`

### Hero

- Full-screen `min-h-screen` with `bg-gradient-to-br from-primary to-secondary`
- Two-column layout on desktop (text left, illustration right), stacked on mobile
- CTA buttons: primary `bg-accent` and outline `border border-white text-white`
- Trust pills: small dark-glass chips with count + label, rendered below CTAs
- Floating illustration: `motion.div` with `animate={floatAnimation}` continuous loop

### Brands Marquee

- Two identical lists rendered side-by-side (`flex` row), CSS `@keyframes marquee` animation at `translateX(-50%)`
- `animation-play-state: paused` applied on `onMouseEnter` / `onMouseLeave`
- Brand chips: `filter: grayscale(100%)` default, `hover:filter-none transition-all duration-300`
- `overflow: hidden` on container prevents horizontal overflow

### Stats Counter (`useCounterAnimation`)

```javascript
// src/hooks/useCounterAnimation.js
// Uses requestAnimationFrame to increment from 0 to target over duration ms
// Triggered when element enters viewport via IntersectionObserver
// Returns current display value
```

### Contact Form Validation

All four fields (`name`, `company`, `phone`, `inquiry`) are required. Validation runs on submit (`handleSubmit`). Error messages display as `<p className="text-red-500 text-sm mt-1">` directly beneath each field. Phone validation: must be a valid Indian mobile number (10 digits, optionally prefixed with +91 or 0).

### Testimonials Auto-Advance

```javascript
useEffect(() => {
  if (isPaused) return;
  const timer = setInterval(() => {
    setActiveIndex(i => (i + 1) % testimonials.length);
  }, 5000);
  return () => clearInterval(timer);
}, [isPaused, testimonials.length]);
```

---

## Responsive Strategy

Mobile-first: base classes target mobile, responsive prefixes (`sm:`, `md:`, `lg:`, `xl:`) add tablet/desktop overrides.

Key breakpoints:
- `< 640px` — single column, hamburger nav, stacked hero
- `640px – 1024px` — two-column grids, tablet spacing
- `> 1024px` — three/four-column grids, full nav, side-by-side hero

Tap target enforcement: all `<button>` and `<a>` elements receive `min-h-[44px] min-w-[44px]` on mobile via base component defaults.

No fixed pixel widths on inner content — all use `w-full max-w-*` patterns. `overflow-x: hidden` on `<body>` prevents rogue overflow.

---

## Error Handling

| Scenario | Handling |
|---|---|
| Lazy-loaded component fails | `<Suspense>` fallback renders a minimal skeleton loader |
| Contact form validation fails | Inline error messages per field, no network request fired |
| Image fails to load | `onError` handler replaces with a styled SVG placeholder |
| Reduced motion preference | `useReducedMotion` disables all transform animations globally |

---

## Testing Strategy

### Unit Tests (Vitest + React Testing Library)

Focused on specific component behavior, DOM content, and interaction:

- Navbar: transparent vs. frosted state, hamburger toggle, mobile menu close on link click
- ContactSection: form validation — empty submit shows errors, valid data does not
- Testimonials: arrow click advances index, auto-advance with fake timers, pause on hover
- StatsCounter: `useCounterAnimation` hook — increments from 0 to target
- Animation variants: `animations.js` exports correct shape (initial/animate keys)
- Footer: all four columns render with required content
- All img elements have non-empty `alt` attributes

### Property-Based Tests (fast-check, minimum 100 iterations each)

See Correctness Properties section below for the universally-quantified properties that guide these tests.

### Integration / Smoke Tests

- `npm run build` completes without error (CI smoke)
- App renders without console errors at 320px, 768px, 1280px viewport widths
- Lazy imports resolve (no dynamic import failures)

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

The following properties are derived from the prework analysis of all acceptance criteria. Property-based tests use **fast-check** (JavaScript PBT library) with a minimum of 100 iterations per property.

---

### Property 1: Animation variants have correct structure

*For any* animation variant exported from `animations.js` (fadeUp, fadeIn, slideLeft, slideRight, scaleIn), the variant object must contain both a `hidden` key and a `visible` key, and the `visible` state must differ from the `hidden` state.

**Validates: Requirements 13.3**

---

### Property 2: Reduced-motion disables transforms

*For any* animation variant passed through `makeVariants(variant, true)`, the returned variant's `visible` state must contain no `x`, `y`, or `scale` transform properties — only opacity is permitted to change.

**Validates: Requirements 13.6**

---

### Property 3: All feature cards rendered

*For any* render of the About section, all four required feature card labels ("Wholesale Electronics", "Bulk Orders", "Genuine Products", "Competitive Pricing") must be present in the rendered output.

**Validates: Requirements 4.3**

---

### Property 4: Why Choose Us completeness

*For any* render of the WhyChooseUs section, all six required card titles ("Genuine Products", "Bulk Pricing", "Fast Delivery", "Trusted Suppliers", "Customer Support", "Wide Product Range") must be present, and each card must contain an icon element, a title, and a description.

**Validates: Requirements 5.1, 5.2**

---

### Property 5: Product Categories completeness

*For any* render of the ProductCategories section, all six required category names ("Electronics", "Computers & IT", "Mobiles", "Home Appliances", "Networking", "Security Systems") must be present, and each card must contain an image/illustration element, an icon, the category name, a description, and a "View Products" button.

**Validates: Requirements 6.1, 6.2**

---

### Property 6: Featured Products completeness

*For any* render of the FeaturedProducts section, all six required product names ("Dell Latitude Laptop", "Samsung Smart TV", "LG Refrigerator", "HP Printer", "Lenovo ThinkPad", "CCTV Camera System") must be present, each product card must contain an image, brand name, category label, and an "Enquire Now" button, and each card must have a brand badge or category tag element.

**Validates: Requirements 7.1, 7.2, 7.4**

---

### Property 7: Brands Marquee completeness

*For any* render of the BrandsMarquee section, all twelve required brand names ("Samsung", "LG", "Dell", "HP", "Lenovo", "Asus", "Acer", "Sony", "Apple", "Xiaomi", "Vivo", "Realme") must appear in the rendered output.

**Validates: Requirements 8.1**

---

### Property 8: Stats Counter completeness

*For any* render of the StatsCounter section, all four statistics ("Products", "Clients", "Brands", "Years Experience") must be present as labels, each with a numeric target value and a suffix element.

**Validates: Requirements 9.1, 9.2**

---

### Property 9: Counter animation starts at zero and reaches target

*For any* target number N > 0 passed to `useCounterAnimation(N, duration)`, when the animation is triggered, the counter must start at or near 0 and eventually reach exactly N by the end of the duration.

**Validates: Requirements 9.3**

---

### Property 10: Testimonials completeness

*For any* render of the Testimonials section, every testimonial card must contain a client name, a company name, a star rating element, and review text — none of these fields may be empty or missing.

**Validates: Requirements 10.1**

---

### Property 11: Contact CTA button hrefs are correct

*For any* render of the ContactSection, the "Call Now" button's `href` must match `tel:+919150310876`, the "WhatsApp Us" button's `href` must match `https://wa.me/919150310876`, and the "Get Directions" button's `href` must contain a Google Maps URL referencing the company address.

**Validates: Requirements 11.2**

---

### Property 12: Contact form validation rejects incomplete submissions

*For any* contact form submission where one or more required fields (name, company, phone, inquiry) are empty or contain only whitespace, the form must not submit and must display at least one inline validation error message.

**Validates: Requirements 11.4**

---

### Property 13: Footer columns completeness

*For any* render of the Footer, all four columns ("Company", "Quick Links", "Categories", "Contact") must be present with their required content items, and the copyright notice must be visible.

**Validates: Requirements 12.2, 12.5**

---

### Property 14: All img elements have non-empty alt text

*For any* render of any component in the Website, every `<img>` element present in the DOM must have a non-empty `alt` attribute string.

**Validates: Requirements 15.3**

---

### Property 15: No horizontal overflow at any viewport width

*For any* defined viewport width (320, 375, 768, 1024, 1280, 1920), the rendered document body width must not exceed the viewport width, ensuring no horizontal scrollbar appears.

**Validates: Requirements 14.3**

---

### Property 16: Mobile tap targets meet minimum size

*For any* interactive element (button, anchor) rendered at a mobile viewport (< 640px), the element's rendered height and width must each be at least 44px.

**Validates: Requirements 14.4**
