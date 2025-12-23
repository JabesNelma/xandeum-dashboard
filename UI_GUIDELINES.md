# UI Guidelines — Xandeum Dashboard

## Design System (compact)
- Font: Inter (suggested), fallback system sans; headings bold (600–800), body regular (300–400). Use `tabular-nums` for metrics.
- Color tokens:
  - Base: slate/neutral (slate-50, slate-100, slate-200, slate-500)
  - Accent: cyan (`#06B6D4`) — single accent for charts/CTA
  - Status: active `emerald-500`, inactive `red-500`, syncing `amber-500`
- Spacing: use generous spacing: card padding `p-4`/`p-6`, gap `gap-6`/`gap-8`, metric height `h-32` (desktop)
- Cards: small radius (`rounded-md`), subtle border (`border-slate-200`), soft shadow (`shadow-sm`)
- Table: readable monospace for identifiers, small uppercase header, subtle row hover

## Accessibility & UX
- Use `title` attributes on truncated identifiers to allow copy/paste full value
- Use `aria-label` on charts and non-textual indicators
- Provide skeletons for hydration and empty states

---

# Bounty Readiness Checklist — UI polish
- [x] Typography system defined (font choices, numeric treatment)
- [x] Color tokens defined (accent + status colors)
- [x] Metric cards: dominant number, small label, skeleton states
- [x] Charts: reduced visual noise, single accent color
- [x] Table: monospace identifiers, truncated with hover/title, subtle status dot
- [x] Loading states and professional empty state
- [x] Minor accessibility additions: `title` on truncated values, `aria-label` on charts
- [ ] Optional: visual regression snapshots (recommended)

