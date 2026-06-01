# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Dev-Server starten (http://localhost:3000)
npm run build    # Produktion bauen
npm run lint     # ESLint ausführen
```

## Architecture

Multi-step form application built with Next.js App Router. Each step is a separate route under `/app/rechner/`.

**State management** — `store/formular-store.ts` uses Zustand with `persist` middleware. All form data survives page reloads via localStorage. Pre-filling across steps works automatically because every step form uses `defaultValues: daten.<schritt>` from the store.

**Step flow** — `unternehmen → umsatz → mitarbeiter → kontakt → ergebnis`. Navigation is done by pushing to the next route and calling `setzeSchritt()` on the store simultaneously to keep the progress bar in sync.

**Types** — `types/index.ts` defines all form data interfaces and the `SCHRITTE` constant that drives the progress bar.

**UI components** — `components/ui/` has `FormFeld`, `AuswahlFeld`, `NavButtons` (reusable across all steps). `components/layout/` has `RechnerLayout` (wraps every step with header + progress bar) and `Fortschrittsanzeige` (the step indicator).

**Calculation logic** — not yet implemented. The result page at `/rechner/ergebnis/page.tsx` is the integration point. Add calculation in `lib/` and call it from the results page.
