# Quelx Website

A static, dependency-free marketing site for **Quelx** — an AI systems architecture
studio. Built with semantic HTML, modern CSS, and vanilla JavaScript (no build step,
no framework, no external runtime dependencies).

## Structure

```
index.html              Single-page site: header, hero, services, process,
                         stats, work, principles, FAQ, contact, footer
assets/css/style.css     Design tokens + all layout/component styles
assets/js/main.js        Sticky header, mobile menu, scroll reveal, stat
                         count-up, FAQ accordion, principles carousel,
                         contact form handling
assets/img/              SVG illustrations (hero, capability cards, OG image)
assets/favicon.svg       Quelx "Q" mark favicon
robots.txt / sitemap.xml Basic SEO scaffolding
```

## Design system

Colors, typography, and iconography follow the Quelx brand guidelines:

- **Void Black** `#0A0A0A`, **Graphite** `#1A1A1A`, **Steel** `#5A5A5A`,
  **Silver** `#CFCFCF`, **Pure White** `#FFFFFF`, accent **Quelx Blue** `#2563EB`
  (used sparingly for links, icons, and highlights).
- Primary typeface **Space Grotesk** (headings, UI), secondary **Inter** (body copy).
- Line-icon iconography (strategy, architecture, automation, data, integration, security).

## Running locally

No build step required — serve the directory statically, e.g.:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.
