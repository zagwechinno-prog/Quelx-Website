# Quelx Website

A single-page marketing site for **Quelx**, an AI systems studio. Self-contained
HTML with inline CSS/JS — no build step, no framework, no external runtime
dependencies besides Google Fonts.

## Structure

```
index.html                    Entire site: header, hero, problem statement,
                               3-step roadmap ("Identify / Develop / Adopt"),
                               testimonials, stats, case studies, team,
                               FAQ, final CTA — plus three in-page "routes"
                               (Terms, Privacy, Work With Us) toggled via
                               location.hash, no page reload
assets/favicon.png             Quelx "Q" mark favicon
assets/img/quelx-logo.png      Quelx logo (header + footer brand mark)
assets/img/zagwe-chinno.jpg    Team photo, Zagwe Chinno (CEO & Co-Founder)
robots.txt / sitemap.xml       Basic SEO scaffolding
```

## Design system

- **Palette**: warm bone/paper background (`#F5F2EA` / `#FFFFFF`), ink text
  (`#15160F`), moss green accent (`#2C5F44` / `#3E8760`), clay highlight
  (`#B5713A`). Full dark-mode palette via `prefers-color-scheme` /
  `data-theme`.
- **Type**: Bricolage Grotesque (headings/display), Public Sans (body/UI),
  IBM Plex Mono (labels, eyebrows, stats).
- **Interactions**: sticky header that blurs on scroll, mobile slide-down
  menu, scroll-reveal via IntersectionObserver, animated stat count-up, a
  3-step roadmap stepper with a progress line, FAQ accordion, drag-and-drop
  team photo upload (persisted to `localStorage`), and a lead-gen form on
  the Work With Us route that opens a pre-filled `mailto:` to
  `hello@quelxcore.com`.

## Running locally

No build step required — serve the directory statically, e.g.:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.
