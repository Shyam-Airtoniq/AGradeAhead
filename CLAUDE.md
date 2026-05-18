# A Grade Ahead — Website Redesign

## Project context

Redesigning the entire **agradeahead.com** website, page by page. For each page, the user provides:
- The old URL (e.g. `https://agradeahead.com/mathwizard/`)
- A screenshot of the existing live page

I rebuild that page using the established design language defined on the homepage ([home.html](home.html) + [css/styles.css](css/styles.css)), keeping the content from the original page intact (or close to it) and modernizing the structure/styling.

**The homepage is the design source of truth.** Every other page should feel like it belongs to the same site.

## Built for WordPress conversion

Every page in this repo is a static HTML stand-in that will later be converted to a **custom WordPress theme** by a WP developer. Build with that handoff in mind — the rules below exist because the dev gave specific feedback. Don't relax them without checking first.

1. **No inline `<style>` or `<script>` blocks in any site page.** All CSS lives in [css/styles.css](css/styles.css); all JS lives in [js/main.js](js/main.js). One stylesheet, one script — site-wide.
2. **No inline `style=""` attributes on elements.** If you need a one-off style, add a small utility class to [css/styles.css](css/styles.css) under a `/* ===== NAME ===== */` header and use it. See `.section__cta`, `.section__note`, `.section--compact`, `.welcome__subheading` for examples — each was created to replace a one-off inline style.
3. **Hero video is native HTML5** (`<video><source></video>` with a `poster` attribute), not JS-injected. The WP dev swaps `src` and `poster` per-page via ACF fields. See the markup example below in the page-creation workflow.
4. **Semantic HTML throughout.** `<ul>/<li>` for nav and utility-bar links (NOT divs with `<a>` siblings — the dev specifically pushed back on that). `<dl>/<dt>/<dd>` for glossaries. `<details>/<summary>` for accordions (zero JS). `<nav>`, `<main>`, `<section>`, `<header>`, `<footer>`.
5. **BEM naming** for every CSS class (`block__element--modifier`). Stay consistent so the WP dev can scope, override, or theme cleanly.
6. **Reuse components before adding new ones.** Check the component table below first. New CSS only when no existing pattern fits — and when you add it, document it both with a `/* ===== NAME ===== */` header in styles.css AND a row in the component table here.
7. **Element-existence guards in [js/main.js](js/main.js).** Every block starts with `if (!el) return;` so the script is safe to drop into any page, including ones that don't use a given feature. The WP dev enqueues the same `main.js` on every template.
8. **No external font requests.** System fonts only (Arial Narrow → Arial fallback). No Google Fonts. Keeps page weight low and sidesteps GDPR/cookie-consent surface area.
9. **`index.html` is the lone exception** — it's a dev-only dashboard that will NOT be converted to WordPress, so its inline `<style>` block is intentional. Don't "fix" it by extracting to styles.css; keep it self-contained. Same exception does NOT apply to any other page.

## File structure

```
d:\AGradeAhead\
├── agradeahead-assets/      # logos, hero video, transparent kid PNGs
├── css/
│   └── styles.css           # ALL site styles (shared across pages)
├── js/
│   └── main.js              # ALL site behavior (shared, has element-existence guards)
├── index.html               # PAGE INDEX / spawn point — lists all pages, opens each in a new tab
├── home.html                # the actual A Grade Ahead homepage
├── formerly-mathwizard.html # rebrand-history page
├── online-math-tutorials.html
├── README.md                # repo readme (for GitHub / Vercel)
└── CLAUDE.md                # this file
```

**Note on `index.html` vs `home.html`:** for staging on Vercel we use `index.html` as a development dashboard so we can navigate between pages easily. The real homepage lives at `/home.html`. When the site is ready for production we'll either swap them or set up Vercel rewrites.

## Design system

Defined in `:root` of [css/styles.css](css/styles.css). Use these tokens — don't hardcode hex.

**Colors**
- Purple: `--purple-deep #2D1A6E`, `--purple-mid #312783`, `--purple-light #4A3A9F`, `--navy #1B1547`
- Green: `--green-primary #7AB648`, `--green-dark #5E9A2F`, `--green-light #8EC95E`
- Neutral: `--off-white #F8F7F4`, `--warm-grey #F2F0EB`, `--white`
- Text: `--text-dark #2C2C2C`, `--text-mid #5A5A5A`, `--text-light #8A8A8A`

**Typography**
- Brand font: **Arial Narrow**, with Arial as fallback (`'Arial Narrow', Arial, sans-serif`). Used for both headings and body per brand spec.
- Arial Narrow is a Windows system font and isn't installed on most Macs/iOS/Android — those devices fall back to Arial (wider). This is an intentional brand-purity trade-off, not a bug.
- No Google Fonts loaded — the site uses system fonts only, no external font requests.
- Available weights in Arial Narrow: Regular (400) and Bold (700). Light/300 declarations will visually render as Regular; 500/600 declarations will render as Bold.
- Eyebrows: 0.75rem, uppercase, letter-spacing 3px, green-primary
- `<em>` inside headings → italic, green-dark — used for emphasis (e.g. "*at a fraction of the cost*")

**Layout**
- `.container` is 1200px max, 24px padding
- Header + hero use a wider container with `clamp(24px, 4vw, 64px)` padding so the logo and hero copy share the same left gutter
- Sections use `padding: 120px 0` (`80px` mobile)

## Components (already built, reuse these)

| Component | Purpose |
|---|---|
| `.header` + `.utility-bar` + `.header__nav` (`.header__nav-list` / `__nav-item` / `__nav-link`) + `.header__toggle` | Fixed header — white-on-dark by default, white-on-light when scrolled. Single `<ul>` for desktop AND mobile (Bootstrap-style). Hamburger collapses the same nav into a slide-down panel below 900px. |
| `.hero` | Full-viewport (100vh) homepage hero with video background, left-aligned copy. Uses `padding: 200px 0 90px` to clear fixed header. |
| `.page-hero` | Shorter inner-page hero (~55vh). Same video bg, centered copy + breadcrumb. Use this on all non-homepage pages. |
| `.section` / `.section--grey` | Standard content section wrapper |
| `.section__eyebrow` / `.section__title` / `.section__subtitle` / `.section__header` | Section heading group |
| `.welcome` | Centered narrow text block — good for short manifesto-style sections |
| `.split-grid` | Two-column section: copy on one side, image/illustration on the other |
| `.cta-card` | Purple gradient card with heading + body + CTA buttons (used mid-page) |
| `.contact-callout` | Compact phone/email callout with icon |
| `.tip-list` + `.tip-list__item` + `.tip-list__check` | 2-col grid of tip cards with green checkmark icon. Used on tutorial pages for navigation tips. |
| `.video-grid` + `.video-card` + `.video-card__title` + `.video-card__embed` | Responsive grid of 16:9 YouTube embeds with title above each. Add `.video-grid--single` for one centered video. |
| `.image-break` | Full-width purple parallax band with italic quote — great for testimonials/quotes |
| `.final-cta` | Closing purple gradient section with title + buttons |
| `.footer` | Site footer (4 cols on desktop, navy bg) |
| `.btn-primary` / `.btn-secondary` / `.btn-white` / `.btn-ghost-white` | Pill buttons |
| `.drift-container` | Add to a section to get floating kid PNGs sweeping across as the user scrolls (desktop only). Don't overuse — 2-3 per page max. |
| `.animate-on-scroll` (+ `animate-delay-1..4`) | Fade-up on intersect |
| `.section--compact` / `.section__cta` / `.section__note` / `.image-break__cite` (+ `--tight`) / `.welcome__subheading` | WP-prep utility classes — replace previously inline `style=""` attributes (compact-padded section, centered CTA wrap below a section, centered italic note paragraph, image-break attribution line, subheading inside `.welcome__inner`). |
| `.numbered-steps` + `__item` + `__number` + `__body` | Vertical numbered list with green-circle numbers — for "How It Works"-style 5-step flows. Distinct from `.step-card` (homepage horizontal 3-step photo journey). |
| `.components-list` + `__item` + `__icon` + `__title` + `__text` | Icon + title + multi-paragraph description rows. Used for "Blended Learning Components"-style feature lists. |
| `.faq` + `.faq__item` (`<details>`) + `.faq__q` (`<summary>`) + `.faq__a` | Zero-JS accordion using native `<details>`/`<summary>`. Green circular chevron rotates on open. |
| `.glossary` + `.glossary__item` + `.glossary__term` + `.glossary__def` | Definition-list (`<dl>`) glossary with green pill-style terms and multi-paragraph definitions. |
| `.screens-grid` + `.screens-grid__item` | 2×2 (1-col mobile) grid for product/activity screenshots with subtle hover lift. |
| `.grade-pills` + `.grade-pills__item` | Horizontal wrapping list of grade-level pills (warm-grey bg, purple text). |
| `.testimonial-speech` + `__bubble` + `__mark` (`--open` / `--close`) + `__text` + `__author` | Single centered testimonial in a speech-bubble card with large purple opening/closing quotation marks. No carousel JS. |
| `.feature-panel` + `__bg` + `__card` + `__title` + `__subtitle` + `__grid` + `__item` + `__icon` | Full-width image band with semi-transparent purple feature card overlaid on the left. 3-col icon grid inside the card (2-col below 600px). |
| `.process-grid` + `.process-card` + `__number` + `__title` + `__text` | 2-col grid of numbered process steps (e.g. 6-step "Assess→Excel" flow). Purple number circle on the left, green title + body on the right. |
| `.curriculum-list` + `__item` + `__check` | 2-col list of bullet points with green checkmark icons. Simpler than `.tip-list` (no card backgrounds). Collapses to 1-col on mobile. |
| `.subject-circles` + `.subject-circle` + `__head` + `__title` + `__grade` + `__body` + `__list` | 3-card subject grid where each card has a purple circle header overlapping a white body card containing bulleted offerings. |
| `.form-card` + `__header` + `__title` + `.form-field` + `__label` + `__control` + `__helper` | Generic lead-capture form layout — warm-grey card wrapper with centered heading and stacked label/control rows. Reusable for any future contact/sample/enrollment form. |
| `.form-grades` + `.form-grades__item` | Checkbox-as-pill grade picker. Hidden native checkbox, label as the clickable target; checked state turns green. Used for "select up to N grades" pickers. |
| `.form-agree` + `__label` + `__note` | Agreement-checkbox + privacy-note row that goes above the submit button. |
| `.form-captcha` + `__box` + `__label` + `__brand` | Static visual placeholder for the Google reCAPTCHA widget — WP dev wires up the real widget. |
| `.form-submit` | Centered wrapper for the form's submit button (button uses `.btn-primary`). |
| `.growth-path` + `__step` + `__num` + `__label` | Horizontal 4-step progression with green number circles and uppercase pill labels, connected by a subtle gradient line. Replaces the our-programs page's original mountain-pyramid illustration. Stacks 2-col below 768px, 1-col below 480px. |
| `.program-circles` + `.program-circle` + `__title` + `__grade` | Flex-wrap row of solid purple subject circles (Math, English, Pre-K, Camps, Science). Distinct from `.subject-circles` — these are bare/clickable, no body card underneath. Each is an `<a>` so it's a navigable program entry point. |

## JS behavior (auto-wired in [js/main.js](js/main.js))

- Header `scrolled` class toggles when `window.scrollY > 80`
- Hamburger (`#navToggle`) toggles `nav-open` class on the header — same `<ul>` collapses into a slide-down panel below 900px (Bootstrap-style, single nav for all viewports)
- `.animate-on-scroll` reveals via IntersectionObserver
- `.image-break__img` parallax on scroll
- `.drift-container` gets PNG illustrations injected and animated (desktop > 768px only)

All blocks are guarded with `if (!el) return;` so the script is safe to drop into any page.

## Page-creation workflow

1. Start from this skeleton:
   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>... | A Grade Ahead</title>
     <meta name="description" content="...">
     <link rel="preload" as="image" href="agradeahead-assets/hero-fallback.jpg" fetchpriority="high">
     <link rel="preload" as="video" href="agradeahead-assets/hero-video.mp4" type="video/mp4">
     <link rel="stylesheet" href="css/styles.css">
   </head>
   <body>
     <!-- Copy <header> from home.html (single <ul> nav, no separate mobile menu) -->

     <main id="primary" class="site-main">
       <!-- Page-specific sections go here -->
     </main>

     <!-- Copy <footer> from home.html -->
     <script src="js/main.js" defer></script>
   </body>
   </html>
   ```

   **No inline `<script>` or `<style>` in any page** — kept clean for WordPress conversion.

   **Hero video is rendered natively in HTML** (not injected via JS) so the WordPress dev can swap the src/poster per page from a PHP template / ACF field. The markup looks like:

   ```html
   <div id="hero-video-bg">
     <video class="hero-bg-video" autoplay muted playsinline loop aria-hidden="true"
            poster="agradeahead-assets/hero-fallback.jpg">
       <source src="agradeahead-assets/hero-video.mp4" type="video/mp4">
     </video>
   </div>
   ```

   For dynamic per-page video in WordPress (e.g., with ACF):

   ```php
   <div id="hero-video-bg">
     <video class="hero-bg-video" autoplay muted playsinline loop aria-hidden="true"
            poster="<?php echo esc_url( get_field('hero_poster') ?: get_template_directory_uri() . '/assets/hero-fallback.jpg' ); ?>">
       <source src="<?php echo esc_url( get_field('hero_video') ?: get_template_directory_uri() . '/assets/hero-video.mp4' ); ?>" type="video/mp4">
     </video>
   </div>
   ```

   The `poster` attribute is native HTML5 — the browser shows it until the video can play, no JS swap needed.
2. Build sections using existing components first. Only add new CSS when a pattern truly doesn't exist yet — append to [css/styles.css](css/styles.css) under a `/* ===== NAME ===== */` comment.
3. Update header nav links so the current page is reflected (you may add `aria-current="page"` later if needed).
4. Update the table below.

## Pages

| Page | Old URL | New file | Status |
|---|---|---|---|
| Homepage | `/` | [home.html](home.html) | ✅ Done |
| Formerly MathWizard | `/mathwizard/` | [formerly-mathwizard.html](formerly-mathwizard.html) | ✅ Done |
| Math Video Tutorials | `/online-math-tutorials/` | [online-math-tutorials.html](online-math-tutorials.html) | ✅ Done (YouTube IDs are placeholders — `YOUTUBE_ID_1` / `YOUTUBE_ID_2` — user to swap in real values) |
| English Video Tutorials | `/online-english-tutorials/` | [online-english-tutorials.html](online-english-tutorials.html) | ✅ Done (YouTube IDs are placeholders) |
| Numericals Video Tutorials | `/online-numericals-tutorials/` | [online-numericals-tutorials.html](online-numericals-tutorials.html) | ✅ Done (single video; YouTube ID is a placeholder) |
| A Grade Ahead Online (Blended Learning) | `/online/` | [online.html](online.html) | ✅ Done |
| Enrichment Academies | `academy.agradeahead.com/` (subdomain) | [enrichment-academies.html](enrichment-academies.html) | ✅ Done |
| Curriculum Samples | `academy.agradeahead.com/curriculum-samples/` (subdomain) | [curriculum-samples.html](curriculum-samples.html) | ✅ Done (form body is a static markup mock — WP dev to swap for Gravity Forms / WPForms shortcode and wire up real reCAPTCHA) |
| Our Programs | `academy.agradeahead.com/our-programs/` (subdomain) | [our-programs.html](our-programs.html) | ✅ Done (original mountain-pyramid illustration replaced with `.growth-path` 4-step component; sample form duplicated from curriculum-samples — WP dev to factor out as shared template part / shortcode) |

**Subdomain pages:** the old site puts the academies page on `academy.agradeahead.com` (its own subdomain with its own header/nav). In the new unified site, all subdomain pages get rolled into the main `agradeahead.com` domain and use the shared site shell (same header, footer, design language). The dev `index.html` keeps them in a separate **Subdomain Pages** group so it's clear which ones came from where.

## Conventions

- Internal links: relative paths (e.g. `home.html#zip` for the homepage ZIP finder)
- Phone number: `866.628.4628` (with periods as in the original site)
- Use `&mdash;` for em-dashes in HTML, not literal `—` (matches existing copy style)
- Footer copyright year: 2026 (current site year)
- Don't introduce new colors or font weights — extend the system, don't replace it
