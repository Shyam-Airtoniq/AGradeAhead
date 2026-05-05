# A Grade Ahead — Website Redesign

## Project context

Redesigning the entire **agradeahead.com** website, page by page. For each page, the user provides:
- The old URL (e.g. `https://agradeahead.com/mathwizard/`)
- A screenshot of the existing live page

I rebuild that page using the established design language defined on the homepage ([home.html](home.html) + [css/styles.css](css/styles.css)), keeping the content from the original page intact (or close to it) and modernizing the structure/styling.

**The homepage is the design source of truth.** Every other page should feel like it belongs to the same site.

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
- Headings: Playfair Display (serif), weights 400–700
- Body: Inter (sans), weights 300–700
- Eyebrows: 0.75rem, uppercase, letter-spacing 3px, green-primary
- `<em>` inside headings → italic, green-dark — used for emphasis (e.g. "*at a fraction of the cost*")

**Layout**
- `.container` is 1200px max, 24px padding
- Header + hero use a wider container with `clamp(24px, 4vw, 64px)` padding so the logo and hero copy share the same left gutter
- Sections use `padding: 120px 0` (`80px` mobile)

## Components (already built, reuse these)

| Component | Purpose |
|---|---|
| `.header` + `.utility-bar` + `.header__nav` + `.modal-menu` | Fixed header — white-on-dark by default, white-on-light when scrolled. Hamburger appears below 900px. |
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

## JS behavior (auto-wired in [js/main.js](js/main.js))

- Header `scrolled` class toggles when `window.scrollY > 80`
- Hamburger toggles modal menu
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
     <link rel="preconnect" href="https://fonts.googleapis.com">
     <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
     <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
     <link rel="stylesheet" href="css/styles.css">
     <!-- Copy the inline hero-video preload <script> from home.html if the page uses .page-hero with video bg -->
   </head>
   <body>
     <!-- Copy <header> + <div class="modal-menu"> from home.html -->
     <!-- Page-specific sections -->
     <!-- Copy <footer> from home.html -->
     <script src="js/main.js" defer></script>
   </body>
   </html>
   ```
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

## Conventions

- Internal links: relative paths (e.g. `home.html#zip` for the homepage ZIP finder)
- Phone number: `866.628.4628` (with periods as in the original site)
- Use `&mdash;` for em-dashes in HTML, not literal `—` (matches existing copy style)
- Footer copyright year: 2026 (current site year)
- Don't introduce new colors or font weights — extend the system, don't replace it
