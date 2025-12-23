# Bounty Submission Checklist — Visual / UX polish

Follow this checklist before submitting for bounty review:

- [x] Typography: headings bold, body light, numeric tabular-nums used for metrics.
- [x] Color system: single accent (`#06b6d4`), muted status colors configured.
- [x] Layout: consistent grid, spacing increased, cards `rounded-md` with `shadow-sm`.
- [x] Metrics: created reusable `MetricCard` and `MetricCards` client wrapper (hydration skeletons).
- [x] Charts: simplified Recharts styles, accessible aria, single accent bar color.
- [x] Table: monospace for PubKey/IP, small status dot, better empty state, hover subtlety.
- [x] Loading UX: skeletons for metrics and table during hydration.
- [x] No data logic changed; all changes purely presentational.
- [x] No new dependencies added.
- [ ] Optional: Add end-to-end visual tests / Percy snapshots (if project supports it).

Notes for reviewer:
- See `src/app/page.tsx` for overall layout and `DESIGN_NOTES.md` for the design decisions.
