# Requirements Document

## Introduction

Sri Ganesh Enterprises is a premier B2B wholesale distributor of Electronics, Computers, Mobiles, IT Products, Networking Equipment, Security Systems, and Home Appliances based in Chennai, India. The company serves retailers, dealers, resellers, institutions, offices, and bulk buyers across Tamil Nadu and South India.

This document specifies the requirements for a premium enterprise-grade marketing website built with React + Vite + Tailwind CSS + Framer Motion. The website must communicate trust, scale, reliability, professionalism, and wholesale strength. It must feel like a ₹100+ crore enterprise and generate qualified B2B leads.

---

## Glossary

- **Website**: The Sri Ganesh Enterprises React web application, hereinafter "the Website"
- **Navbar**: The sticky top navigation component
- **Hero**: The full-screen landing section at the top of the homepage
- **Product_Categories**: The section displaying the six major product groupings
- **Featured_Products**: The section showcasing six individual product catalogue items
- **Brands_Marquee**: The auto-scrolling brand logo strip
- **Stats_Counter**: The animated business statistics section
- **Testimonials_Carousel**: The horizontal client testimonial slider
- **Contact_Section**: The section with company contact details and CTA buttons
- **Footer**: The multi-column dark footer at the bottom of the page
- **Animation_System**: The Framer Motion powered animation layer
- **Design_System**: The Tailwind CSS design tokens (colors, typography, spacing)
- **CTA**: Call-to-action button
- **B2B**: Business-to-business
- **Viewport**: The visible browser window area
- **Breakpoint**: Responsive layout threshold (mobile: <640px, tablet: 640–1024px, desktop: >1024px)
- **Counter_Animation**: JavaScript-driven numeric increment animation triggered on scroll
- **Scroll_Reveal**: Framer Motion animation triggered when an element enters the viewport

---

## Requirements

### Requirement 1: Project Foundation and Tech Stack

**User Story:** As a developer, I want a well-structured React + Vite project with all required dependencies configured, so that the Website can be built, developed, and deployed reliably.

#### Acceptance Criteria

1. THE Website SHALL be initialized as a Vite + React project with the following production dependencies: `react`, `react-dom`, `react-router-dom`, `framer-motion`, `lucide-react`, and `tailwindcss`.
2. THE Website SHALL include a `tailwind.config.js` that extends the default theme with the brand color palette: primary `#0F172A`, secondary `#1E40AF`, accent `#2563EB`, success `#16A34A`, highlight `#F59E0B`, background `#FFFFFF`, section `#F8FAFC`, dark `#0B1220`, text-primary `#111827`, text-secondary `#64748B`, and border `#E2E8F0`.
3. THE Website SHALL use Inter as the primary font and Poppins as the secondary font, loaded via Google Fonts or a self-hosted equivalent.
4. THE Website SHALL follow a production-ready folder structure with separate directories for `components`, `sections`, `assets`, `hooks`, and `data`.
5. THE Website SHALL export a single-page application from `App.jsx` where all sections render sequentially on one scrollable page.
6. WHEN the application builds via `npm run build`, THE Website SHALL produce a production-ready bundle without errors or warnings.

---

### Requirement 2: Navbar Component

**User Story:** As a site visitor, I want a sticky, professional navigation bar, so that I can access any section of the Website from anywhere on the page.

#### Acceptance Criteria

1. THE Navbar SHALL be sticky (fixed to the top of the viewport) at all times during scrolling.
2. WHEN the page scroll position is 0px, THE Navbar SHALL render with a fully transparent background.
3. WHEN the page scroll position exceeds 50px, THE Navbar SHALL transition to a frosted-glass effect background using `backdrop-filter: blur` and a semi-transparent `#0F172A` overlay with a smooth CSS transition of 300ms or less.
4. THE Navbar SHALL display the brand name "Sri Ganesh Enterprises" on the left with a logo icon, and center-aligned navigation links: Home, About, Products, Brands, Why Us, and Contact.
5. THE Navbar SHALL display a "Get Quote" CTA button on the right, styled with the accent color `#2563EB` and hover state.
6. WHEN a navigation link is clicked, THE Navbar SHALL smooth-scroll the page to the corresponding section.
7. WHEN a navigation link corresponds to the currently visible section, THE Navbar SHALL apply active link styling (accent underline or highlight).
8. WHEN the Viewport width is below 768px, THE Navbar SHALL hide center navigation links and the CTA button, and display a hamburger menu icon instead.
9. WHEN the hamburger icon is tapped on mobile, THE Navbar SHALL open a full-width dropdown or slide-in drawer containing all navigation links and the CTA button.
10. WHEN a link in the mobile menu is tapped, THE Navbar SHALL close the mobile menu and scroll to the target section.

---

### Requirement 3: Hero Section

**User Story:** As a B2B buyer visiting the Website, I want to immediately understand Sri Ganesh Enterprises' core value proposition, so that I feel confident I am in the right place to source wholesale electronics.

#### Acceptance Criteria

1. THE Hero SHALL occupy 100% of the initial viewport height (`100vh`) with a soft blue gradient background transitioning from `#0F172A` to `#1E40AF`.
2. THE Hero SHALL display the primary headline "YOUR TRUSTED WHOLESALE ELECTRONICS PARTNER" in bold Inter/Poppins typography at a minimum of 48px on desktop and 28px on mobile.
3. THE Hero SHALL display a subheadline listing key product categories: Smart TVs, Laptops, Mobiles, Home Appliances, Networking, and Security Systems.
4. THE Hero SHALL display two CTA buttons: "Explore Products" (primary accent style) and "Contact Us" (outline style), with hover lift animations.
5. THE Hero SHALL display decorative abstract technology shapes or SVG patterns as background elements.
6. THE Hero SHALL display a right-side electronics showcase panel featuring visual representations of premium electronics (SVG illustrations or high-quality placeholder images).
7. WHEN the Hero renders, THE Animation_System SHALL apply a floating animation (gentle vertical oscillation) to the electronics showcase panel.
8. WHEN the Hero first enters the Viewport, THE Animation_System SHALL fade-up animate the headline, subheadline, and buttons with staggered delays of 150ms between each element.
9. THE Hero SHALL display trust badges or short stat pills (e.g., "5000+ Products", "1000+ Clients") below the CTA buttons.

---

### Requirement 4: About Section

**User Story:** As a potential wholesale buyer, I want to learn about Sri Ganesh Enterprises' background and capabilities, so that I can assess whether they are a credible large-scale supplier.

#### Acceptance Criteria

1. THE About Section SHALL display the section title "About Sri Ganesh Enterprises" using the heading typography style.
2. THE About Section SHALL display a professional multi-paragraph description covering the company's history, geographic coverage (Tamil Nadu and South India), product breadth, and B2B specialization.
3. THE About Section SHALL display four animated feature cards with the following labels and appropriate Lucide React icons: "Wholesale Electronics", "Bulk Orders", "Genuine Products", and "Competitive Pricing".
4. WHEN the About Section's feature cards enter the Viewport, THE Animation_System SHALL apply a staggered fade-up Scroll_Reveal animation with 100ms delay between each card.
5. WHEN a feature card is hovered, THE Animation_System SHALL apply a lift effect (translateY of -4px to -8px) with a box-shadow transition.

---

### Requirement 5: Why Choose Us Section

**User Story:** As a retailer evaluating wholesale suppliers, I want to see Sri Ganesh Enterprises' key differentiators clearly presented, so that I can decide whether to place a bulk order.

#### Acceptance Criteria

1. THE Why_Choose_Us Section SHALL display six premium cards with the following titles: "Genuine Products", "Bulk Pricing", "Fast Delivery", "Trusted Suppliers", "Customer Support", and "Wide Product Range".
2. EACH card SHALL display a relevant Lucide React icon, a card title, and a two-to-three sentence description.
3. THE Why_Choose_Us Section SHALL use a grid layout of 3 columns on desktop, 2 columns on tablet, and 1 column on mobile.
4. WHEN a card is hovered on desktop, THE Animation_System SHALL apply a hover lift effect and a blue accent border or gradient highlight transition.
5. WHEN the Why_Choose_Us Section enters the Viewport, THE Animation_System SHALL apply staggered Scroll_Reveal animations to each card.

---

### Requirement 6: Product Categories Section

**User Story:** As a wholesale buyer, I want to browse Sri Ganesh Enterprises' product categories visually, so that I can quickly identify the categories relevant to my business.

#### Acceptance Criteria

1. THE Product_Categories Section SHALL display six category cards: "Electronics" (Smart TVs, LED TVs, Audio Systems), "Computers & IT" (Laptops, Desktops, Monitors, Printers), "Mobiles" (Smartphones, Tablets, Accessories), "Home Appliances" (Refrigerators, Washing Machines, Air Conditioners), "Networking" (Routers, Switches, Modems), and "Security Systems" (CCTV, DVR Systems, Access Control).
2. EACH category card SHALL display a representative image or SVG illustration, a Lucide React icon, the category name, a brief description listing the sub-products, and a "View Products" CTA button.
3. THE Product_Categories Section SHALL use a grid layout of 3 columns on desktop, 2 columns on tablet, and 1 column on mobile.
4. WHEN a category card is hovered, THE Animation_System SHALL apply a scale-up effect on the card image and a color transition on the "View Products" button.
5. WHEN the Product_Categories Section enters the Viewport, THE Animation_System SHALL apply a staggered Scroll_Reveal animation to each card.

---

### Requirement 7: Featured Products Section

**User Story:** As a dealer or reseller, I want to see a professional product catalogue of specific items, so that I can understand the quality and brand range available from Sri Ganesh Enterprises.

#### Acceptance Criteria

1. THE Featured_Products Section SHALL display six product cards: Dell Latitude Laptop, Samsung Smart TV, LG Refrigerator, HP Printer, Lenovo ThinkPad, and CCTV Camera System.
2. EACH product card SHALL display a product image (placeholder or SVG), the product name, the category label, the brand name, and an "Enquire Now" CTA button.
3. THE Featured_Products Section SHALL use a catalogue-style grid of 3 columns on desktop, 2 on tablet, and 1 on mobile.
4. EACH product card SHALL display a brand badge or color-coded category tag for visual hierarchy.
5. WHEN a product card is hovered, THE Animation_System SHALL apply a lift animation and highlight the "Enquire Now" button with the accent color.
6. WHEN the Featured_Products Section enters the Viewport, THE Animation_System SHALL apply staggered Scroll_Reveal animations to each product card.

---

### Requirement 8: Brands Marquee Section

**User Story:** As a potential client, I want to see which brands Sri Ganesh Enterprises distributes, so that I can confirm they carry the brands I need.

#### Acceptance Criteria

1. THE Brands_Marquee SHALL display logos or styled name chips for the following brands: Samsung, LG, Dell, HP, Lenovo, Asus, Acer, Sony, Apple, Xiaomi, Vivo, and Realme.
2. THE Brands_Marquee SHALL continuously auto-scroll the brand list horizontally in a loop with no visible gap at the seam.
3. WHEN a user hovers over the Brands_Marquee, THE Brands_Marquee SHALL pause the scrolling animation.
4. THE Brands_Marquee SHALL apply a monochrome (grayscale) filter to each brand item by default.
5. WHEN a brand item is hovered, THE Brands_Marquee SHALL transition the brand item from grayscale to full color with a CSS transition of 300ms or less.
6. THE Brands_Marquee SHALL render correctly on all Breakpoints without horizontal page overflow.

---

### Requirement 9: Business Statistics Section

**User Story:** As a prospective bulk buyer, I want to see Sri Ganesh Enterprises' scale expressed in concrete numbers, so that I trust them as an established enterprise.

#### Acceptance Criteria

1. THE Stats_Counter Section SHALL display four statistics: "5000+ Products", "1000+ Clients", "100+ Brands", and "10+ Years Experience".
2. EACH statistic SHALL display a large bold numeric value, a "+" suffix where applicable, and a descriptive label below.
3. WHEN the Stats_Counter Section enters the Viewport for the first time, THE Animation_System SHALL trigger a Counter_Animation that increments each number from 0 to its final value over a duration of 1500ms to 2500ms.
4. THE Stats_Counter Section SHALL use a horizontal 4-column layout on desktop and a 2-column grid on mobile.
5. THE Stats_Counter Section SHALL use a dark section background (`#0B1220`) with white text to visually contrast with adjacent sections.

---

### Requirement 10: Testimonials Section

**User Story:** As a first-time visitor evaluating Sri Ganesh Enterprises, I want to read reviews from existing clients, so that I can build confidence before contacting them.

#### Acceptance Criteria

1. THE Testimonials_Carousel SHALL display a minimum of four client testimonials, each containing a client photo placeholder (avatar initials or icon), the client's name, the client's company name, a star rating (4 or 5 stars), and the review text.
2. THE Testimonials_Carousel SHALL be horizontally scrollable, showing one testimonial card at a time on mobile and two to three on desktop.
3. THE Testimonials_Carousel SHALL provide previous and next navigation arrow buttons.
4. WHEN the previous or next arrow is clicked, THE Testimonials_Carousel SHALL animate to the adjacent card with a slide animation.
5. THE Testimonials_Carousel SHALL auto-advance to the next card every 5 seconds when no user interaction is occurring.
6. WHEN a user interacts with the Testimonials_Carousel (hover or click), THE Testimonials_Carousel SHALL pause auto-advance for the duration of the interaction.

---

### Requirement 11: Contact Section

**User Story:** As a B2B buyer ready to place a wholesale inquiry, I want to find Sri Ganesh Enterprises' contact details and direct contact methods easily, so that I can initiate business without friction.

#### Acceptance Criteria

1. THE Contact_Section SHALL display the following company information: Company name "Sri Ganesh Enterprises", Contact person "K. Ganesh Rao", Phone "+91 91503 10876", and Address "No.18/19 Meeran Sahib Street, 1st Floor, UNO Arcade Complex, Shop No F49, Chennai - 600002".
2. THE Contact_Section SHALL display three CTA buttons: "Call Now" (opens `tel:+919150310876`), "WhatsApp Us" (opens `https://wa.me/919150310876`), and "Get Directions" (opens a Google Maps link for the address).
3. THE Contact_Section SHALL display a contact form with fields for Name, Company Name, Phone Number, Product Inquiry (text area), and a Submit button.
4. WHEN the Submit button is clicked with any required field empty, THE Contact_Section SHALL display inline validation error messages for each empty required field without submitting the form.
5. THE Contact_Section SHALL display business hours or availability text alongside the contact card.
6. WHEN the Contact_Section enters the Viewport, THE Animation_System SHALL apply a slide-in-left animation to the contact card and a slide-in-right animation to the contact form.

---

### Requirement 12: Footer Component

**User Story:** As a site visitor at the bottom of the page, I want a comprehensive footer with navigation and contact options, so that I can navigate or find information without scrolling back to the top.

#### Acceptance Criteria

1. THE Footer SHALL use the dark background color `#0B1220` with white and muted text.
2. THE Footer SHALL display four columns: "Company" (brand name, short description, social icons), "Quick Links" (Home, About, Products, Brands, Why Us, Contact), "Categories" (Electronics, Computers & IT, Mobiles, Home Appliances, Networking, Security), and "Contact" (address, phone, email).
3. THE Footer SHALL display social media icon links for WhatsApp, Facebook, Instagram, and LinkedIn using Lucide React icons or SVG equivalents.
4. WHEN a social icon is hovered, THE Footer SHALL apply a color transition to the icon matching the respective platform's brand color.
5. THE Footer SHALL display a copyright notice: "© 2024 Sri Ganesh Enterprises. All rights reserved." at the bottom.
6. THE Footer SHALL collapse to a single-column stacked layout on mobile Breakpoints.

---

### Requirement 13: Animation System

**User Story:** As a site visitor, I want the Website to feel premium and polished through smooth animations, so that Sri Ganesh Enterprises' professionalism is communicated visually.

#### Acceptance Criteria

1. THE Animation_System SHALL use Framer Motion as the sole animation library.
2. THE Animation_System SHALL implement Scroll_Reveal animations using Framer Motion's `whileInView` prop with `once: true` to prevent re-triggering on scroll-up.
3. THE Animation_System SHALL implement the following animation presets as reusable variants: `fadeUp` (opacity 0→1, y 30→0), `fadeIn` (opacity 0→1), `slideLeft` (opacity 0→1, x -50→0), `slideRight` (opacity 0→1, x 50→0), and `scaleIn` (opacity 0→1, scale 0.9→1).
4. THE Animation_System SHALL apply staggered children animations using Framer Motion's `staggerChildren` with a delay of 0.1s to 0.15s between items.
5. THE Animation_System SHALL implement a floating animation (continuous vertical oscillation of ±10px, period of 3–4s) for the Hero electronics showcase element.
6. ALL animations SHALL respect the user's `prefers-reduced-motion` media query by disabling motion when the preference is set to `reduce`.

---

### Requirement 14: Responsiveness

**User Story:** As a visitor using any device, I want the Website to render correctly and be usable on my screen size, so that I can browse and inquire from any device.

#### Acceptance Criteria

1. THE Website SHALL be fully functional and visually correct at the following Viewport widths: 320px (small mobile), 375px (iPhone), 768px (tablet), 1024px (laptop), 1280px (desktop), and 1920px (ultra-wide).
2. THE Website SHALL use Tailwind CSS responsive prefixes (`sm:`, `md:`, `lg:`, `xl:`, `2xl:`) exclusively for responsive layout rules.
3. THE Website SHALL not produce any horizontal scroll at any of the defined Viewport widths.
4. WHEN rendered on mobile Breakpoints, THE Website SHALL increase tap target sizes for all interactive elements to a minimum of 44×44px.
5. THE Website SHALL use fluid typography (clamp or responsive text classes) so that font sizes scale proportionally between Breakpoints without abrupt jumps.

---

### Requirement 15: Performance and Accessibility

**User Story:** As a visitor and as a search engine crawler, I want the Website to load quickly and be accessible, so that it ranks well and is usable by all potential clients.

#### Acceptance Criteria

1. THE Website SHALL lazy-load all section components below the fold using React's `lazy` and `Suspense`.
2. THE Website SHALL achieve a Lighthouse Performance score of 80 or above on a standard desktop audit.
3. THE Website SHALL include `alt` text on all `<img>` elements describing the image content.
4. THE Website SHALL use semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<article>`) for document structure.
5. THE Website SHALL maintain a color contrast ratio of at least 4.5:1 for all body text against its background, per WCAG 2.1 AA guidelines.
6. ALL interactive elements (buttons, links, form inputs) SHALL be keyboard-navigable and display a visible focus indicator.
7. THE Website SHALL include a `<title>` tag and `<meta name="description">` tag with relevant business keywords for basic SEO.
