# FoodFighter UX Lab

The internal reference route is `#/ux-lab`. The default prototype route is
`#/landing`, which opens the local FoodFighter product simulation. UX Lab is
available from the prototype utility menu and remains a standalone, local-only
reference surface for visual and interaction decisions.

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
- `js/prototype-wave1-state.js` - local onboarding and room-flow state
- `js/prototype-wave1-components.js` - product prototype render helpers
- `js/screens-wave1.js` - clickable Wave 01 product screens
- `styles/prototype-wave1.css` - isolated Wave 01 product shell styles
