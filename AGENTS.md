# AGENTS.md
## Stack & Commands
- Vite + React + TypeScript + Tailwind CSS + Lucide React
- Build check: `npm run build` (must pass with zero TypeScript errors)

## Oclave Design & Template Rules
- Dark-mode minimalist aesthetic: deep slate/zinc surfaces (`#09090B` / `#111113`), subtle 1px borders (`border-white/10`), glassmorphism headers/cards, clean `Inter` + `Montserrat` typography.
- Buyer-friendly architecture: keep all editable copy, pricing tiers, navigation links, and FAQs inside `src/data/siteData.ts` so Gumroad buyers customize one file.
- Strict TypeScript: zero `any` types, zero unused imports, mobile-first responsive layouts.