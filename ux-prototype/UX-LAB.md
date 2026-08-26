# FoodFighter UX Lab

The default prototype route is `#/ux-lab`. It is a standalone, local-only
reference surface for FoodFighter visual and interaction decisions.

## Controls

- Viewport presets: 360, 375, 390, 430, 768, 1024, 1280, 1440
- Language: TH / EN for the core candidate recipes
- Global state: normal, loading, empty, error, disabled, success
- Motion: Motion ON / Reduced Motion
- Scenarios: New User, Existing User, Host, Member, plus room/history/bill
  scenario controls in the preserved screen inventory

## Boundary

The lab uses static labels and CSS/inline visual placeholders only. It makes no
network, backend, authentication, database, websocket, upload, or payment
calls. Existing hash-routed product screens remain available and unchanged.

Candidate screen recipes are explicitly marked `DESIGN CANDIDATE` or
`PROTOTYPE ONLY` and should be reviewed before any production migration.

## Structure

- `js/ux-lab-data.js` - local specimen data and metadata
- `js/ux-lab-components.js` - small local render helpers
- `js/ux-lab.js` - route view, interactions, and local state
- `styles/ux-lab.css` - scoped visual language and responsive rules
