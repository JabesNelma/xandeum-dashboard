# Design Notes — Xandeum pNode Dashboard

## Typography
- Primary font: Inter (system fallback). Headings: 600-800; Body: 400.
- Code identifiers (pubkeys, IPs): `font-mono` (monospace).
- Use `tabular-nums` for metric numbers to align digits.

## Colors
- Base: slate / zinc neutrals
  - text: `text-slate-700` (primary)
  - muted: `text-slate-500/600`
- Accent: cyan `#06b6d4` (`cyan-500`) — single accent for charts and primary data highlights.
- Status:
  - Active → `text-emerald-500` / `bg-emerald-400` (muted green)
  - Inactive → `text-red-400` / `bg-red-400`
  - Syncing → `text-amber-500` / `bg-amber-400`

## Spacing & Layout
- Container: `container mx-auto py-12` for comfortable whitespace.
- Grid: metrics use `grid-cols-4` on large, charts use `grid-cols-2`.
- Cards: `rounded-md` (not too rounded), `shadow-sm`, `border`.

## Components
- Metric cards: small label (uppercase) + large numeric value. Clean, no heavy decorations.
- Charts: minimal axes, single accent color, tooltip on hover.
- Table: explorer style: monospace for identifiers, small status dot + label, subtle hover.

## UX
- Hydration skeletons for metrics and table rows.
- Professional empty state (small helper text).
- Minimal hover (`transition-colors`), no heavy animations.

## Accessibility
- Chart `role="img"` with `aria-label`.
- Good color contrast (use muted colors not saturated backgrounds over white).

---

These notes reflect the changes implemented in code and can be used as a small design spec for reviewers.