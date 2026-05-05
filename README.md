# AGradeAhead

Website redesign for [agradeahead.com](https://agradeahead.com) — being rebuilt page by page with a refreshed design system. Static HTML + CSS, deployed on Vercel.

## Live preview

The repo's root [`index.html`](index.html) is a **page index / dashboard** that lists every page in the redesign. Each entry opens in a new tab so you can preview pages side-by-side. The actual A Grade Ahead homepage is at [`home.html`](home.html) — when production is ready we'll swap them or set up a Vercel rewrite.

## Structure

```
.
├── agradeahead-assets/         # logos, hero video, transparent kid PNGs
├── css/styles.css              # all shared site styles
├── js/main.js                  # all shared site behavior (with element-existence guards)
├── index.html                  # dev dashboard / page index (Vercel root)
├── home.html                   # the actual homepage
├── formerly-mathwizard.html    # /mathwizard/ rebrand-history page
├── online-math-tutorials.html  # /online-math-tutorials/
├── CLAUDE.md                   # project context for Claude Code
└── README.md                   # this file
```

## Pages

| Page | Source URL | File | Status |
|---|---|---|---|
| Homepage | `agradeahead.com/` | `home.html` | ✅ Done |
| Formerly MathWizard | `agradeahead.com/mathwizard/` | `formerly-mathwizard.html` | ✅ Done |
| Math Video Tutorials | `agradeahead.com/online-math-tutorials/` | `online-math-tutorials.html` | ✅ Done (YouTube IDs are placeholders) |
| English Video Tutorials | `agradeahead.com/online-english-tutorials/` | `online-english-tutorials.html` | ⏳ Pending |
| Numericals Video Tutorials | `agradeahead.com/online-numericals-tutorials/` | `online-numericals-tutorials.html` | ⏳ Pending |

## Design system

Defined in `:root` of [`css/styles.css`](css/styles.css). See [`CLAUDE.md`](CLAUDE.md) for the full component inventory.

- **Type:** Playfair Display (headings) + Inter (body)
- **Palette:** Deep purple `#2D1A6E` paired with green `#7AB648`
- **Components:** `.header`, `.hero`, `.page-hero`, `.section`, `.split-grid`, `.cta-card`, `.contact-callout`, `.tip-list`, `.video-grid`, `.image-break`, `.final-cta`, `.footer`

## Deployment (Vercel)

This is a static-site repo — no build step. Vercel serves files as-is from the project root. Push to `main` and Vercel deploys automatically.

## Local preview

Open `index.html` directly in a browser, or run any static server:

```bash
# Python
python -m http.server 8000

# Node
npx serve .
```

Then visit `http://localhost:8000`.
