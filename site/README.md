# Hameediyah site (Phase 3)

Vite + React + TypeScript + Tailwind CSS v4 + GSAP (ScrollTrigger) + Lenis + React Router. No backend.

| Script | What it does |
|---|---|
| `npm run dev` | Dev server (needs `../docs/design/tokens.css`, so run from inside the repo) |
| `npm run build` | Type-check, then production build to `dist/` |
| `npm run preview` | Serve `dist/` locally |
| `npm run lint` | ESLint on `src/` |
| `npm run gen:assets` | Regenerate `src/data/assets.ts` from `../tasks/reference/assets.json` |

## Folder contract
- `src/components/layout/`: Nav, MobileBar, ProgressPole, Cursor, MotionRoot, Footer (HAM-15)
- `src/components/ui/`: Button, ButtonLink, Chip, HeatMarks, Img, VideoEmbed (HAM-15)
- `src/sections/H0 … H10/`: one folder per section; stubs now. HAM-16 (H0–H3), HAM-17 (H4, H6), HAM-18 (H5, H7–H10)
- `src/pages/Home.tsx` composes sections; `Menu.tsx` is HAM-19's
- `src/data/assets.ts`: generated, typed asset IDs. Do not hand-edit
- `src/lib/motion.ts`: `useReducedMotion`, Lenis + ScrollTrigger setup, `scrollToTarget`, roast-heat

## Rules for section tasks
- Colours, fonts, spacing and motion come from `tokens.css` variables. No new hex values.
- Images by ID: `<Img id="IMG-01" />`. Videos: `<VideoEmbed id="VID-01" />`.
- Wrap GSAP in `gsap.context(..., ref)` and `ctx.revert()` on cleanup; skip decorative tweens when `useReducedMotion()` is true.
- Keep each section's `id` (`story`, `legacy`, `visit`, …): the nav links to them.
- Images are local copies in `public/img/` (from `wireframes/assets/img/`).
