# Oclave — AI Automation & Design Agency Template

A Gumroad-ready, single-page agency site built with Vite, React, TypeScript, Tailwind CSS, and Lucide. Dark, restrained, and designed around one interactive centerpiece: the hero operations preview.

## Quick start

```bash
npm install
npm run dev
npm run build
npm run preview
```

The production build runs `tsc` first, so TypeScript errors fail the build.

## Customize everything in one file

All copy, links, pricing tiers, FAQs, metrics, and calculator defaults live in:

```text
src/data/siteData.ts
```

Edit that file and the UI updates. The shape is enforced by `SiteConfig` from `src/types/site.ts`.

Common edits:

| What | Where in `siteData` |
| --- | --- |
| Brand name, logo wordmark | `name`, `footer.brand` |
| Navigation and header CTA | `nav`, `primaryCta` |
| Audit modal copy, fields, success state | `booking` |
| Audit success message tokens | `booking.success.description` supports `{name}` and `{email}` |
| Hero headline, CTAs, metrics | `hero` |
| Interactive before/after preview | `hero.preview` |
| Bento capabilities | `capabilities` |
| Case study and ROI defaults | `caseStudy` |
| Pricing tiers and toggle labels | `pricing` |
| FAQ accordion | `faq` |
| Footer columns and social links | `footer` |

## Project structure

```text
src/
  types/           TypeScript interfaces, one domain per file
  data/            siteData.ts — the only content file buyers need
  lib/             cn() class merge helper and number/currency formatters
  hooks/           Pricing toggle, ROI calculator, accordion state
  components/
    booking/       BookingProvider, BookingButton, BookingModal
    ui/            Button, Container, GlassCard, SectionHeading,
                   Toggle, Accordion, NumberInput
    layout/        Sticky glass Navbar, Footer
    sections/      Hero, MetricPreview, Capabilities, CaseStudy,
                   Pricing, FAQ
```

## Design tokens

Defined in `tailwind.config.ts`:

- `void` `#09090B` — page background
- `graphite` `#111113` — surfaces
- `line` `#1F1F23` — elevated borders
- `bone` `#F4F4F5` — primary text
- `ash` `#A1A1AA` — secondary text
- `signal` `#F5C542` — the single accent

Typography is Montserrat for display and metrics, Inter for body copy, loaded from Google Fonts in `index.html`.

## Notes

- Below-fold sections are lazy-loaded and wrapped in Suspense.
- The ROI calculator derives all results during render; there are no effects.
- Primary booking CTAs open a shared audit modal with Escape/backdrop close, focus trapping, and a copy-email fallback.
- The audit form is front-end only by default. Wire `handleSubmit` in `src/components/booking/BookingModal.tsx` to your form endpoint, CRM, or serverless function.
- Reduced motion is respected globally in `src/index.css`.
- Replace `public/og-image.png` and `public/favicon.svg` with your own brand assets before publishing. The editable OG source is `public/og-image.svg`.
- Update `index.html` meta tags and `siteData.url` before deploying.

## Deploy

Any static host works. For Vercel, import the repo and keep the default Vite settings:

- Build command: `npm run build`
- Output directory: `dist`
