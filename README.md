# Quelx Website

A marketing site for **Quelx**, an AI systems studio. Plain HTML/CSS/JS — no
build step, no framework, no external runtime dependencies besides Google
Fonts.

## Structure

```
index.html                     The main site: header, hero, problem statement,
                                3-step roadmap ("Identify / Develop / Adopt"),
                                testimonials, stats, case studies, team,
                                FAQ, final CTA — plus three in-page "routes"
                                (Terms, Privacy, Work With Us) toggled via
                                location.hash, no page reload
case-studies/
  modernizing-at-home-care.html  Standalone case study page (real URL, own
                                  meta/OG tags), linked from the homepage's
                                  "Home Care" case card
assets/css/site.css             Shared stylesheet for every page
assets/js/site.js               Shared behavior: sticky header, mobile menu,
                                 scroll-reveal, stat count-up, FAQ accordion
assets/js/home.js               Homepage-only behavior: roadmap stepper, team
                                 photo upload, Terms/Privacy/Work-With-Us
                                 hash-routing, the lead-gen form
assets/favicon.png              Quelx "Q" mark favicon
assets/img/quelx-logo.png       Quelx logo (header + footer brand mark)
assets/img/zagwe-chinno.jpg     Team photo, Zagwe Chinno (CEO & Co-Founder)
robots.txt / sitemap.xml        Basic SEO scaffolding
```

Adding another case study: copy `case-studies/modernizing-at-home-care.html`,
swap the content, and link it from a `case-card` on the homepage — it only
needs `site.css` and `site.js` (no `home.js`, since the roadmap/photo-upload/
routing logic there is homepage-specific).

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
