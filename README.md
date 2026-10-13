# bpo

Homepage for a BPO / call-center business: nine full-screen sections with cinematic
vertical navigation, built with Next.js (App Router), TypeScript and Tailwind CSS.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Other scripts: `npm run build` (production build), `npm run start` (serve the build),
`npm run lint`.

## How it works

- One section is shown at a time. Mouse wheel, trackpad, keyboard (↑/↓, Page Up/Down,
  Space, Home/End), touch swipes and the fixed bottom arrows move between sections.
- `src/components/layout/SectionNavigation.tsx` handles input and transition locking.
- `src/components/layout/FitToScreen.tsx` scales a section down when its content is
  taller than the screen, so sections never scroll.
- Each section lives in `src/components/home/`.

## Editing content

All copy, contact details and office addresses are in `src/lib/content.ts`.
They are placeholders — replace them with real, verified information before launch.
