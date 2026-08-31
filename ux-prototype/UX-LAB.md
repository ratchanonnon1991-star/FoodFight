# FoodFighter UX Prototype Reference

The standalone prototype opens at `#/landing`. It is the clickable local
reference for the approved FoodFighter visual language and Wave 01–04 flows.
Open `ux-prototype/index.html` directly or serve `ux-prototype/` with any
static file server. No backend is required.

## Canonical route inventory

| Route | Classification | Purpose |
| --- | --- | --- |
| `#/landing` | PRODUCTION-CONTRACT-ALIGNED | Public entry and auth choices |
| `#/login`, `#/register` | PRODUCTION-CONTRACT-ALIGNED | Local auth form prototypes |
| `#/verify-email` | PRODUCTION-CONTRACT-ALIGNED | Local OTP verification |
| `#/forgot-password`, `#/reset-password` | PRODUCTION-CONTRACT-ALIGNED | Local password recovery flow |
| `#/food-profile` | PRODUCTION-CONTRACT-ALIGNED | Onboarding food profile |
| `#/home` | PRODUCTION-CONTRACT-ALIGNED | Authenticated home shell and local room context |
| `#/room/create`, `#/room/join` | PRODUCTION-CONTRACT-ALIGNED | Local room setup and join forms |
| `#/room/preview`, `#/room/lobby` | PRODUCTION-CONTRACT-ALIGNED | Local room review and readiness |
| `#/meal-preference` | DESIGN-CANDIDATE | Session-only food preferences |
| `#/recommendation-loading`, `#/food-picks`, `#/vote` | DESIGN-CANDIDATE | Local gameplay presentation |
| `#/winner`, `#/restaurant`, `#/restaurant/detail` | DESIGN-CANDIDATE | Local result and restaurant presentation |
| `#/bills`, `#/bills/receipt`, `#/bills/items`, `#/bills/split` | DESIGN-CANDIDATE | Local bill, receipt, item, and split presentation |
| `#/bills/detail`, `#/payment`, `#/payment/status` | DESIGN-CANDIDATE | Local share and payment-record presentation |
| `#/bill-complete`, `#/history`, `#/history/detail` | DESIGN-CANDIDATE | Local completion and history presentation |
| `#/profile`, `#/profile/edit`, `#/profile/food` | PRODUCTION-CONTRACT-ALIGNED / local candidate editing | Account identity and persistent Food Profile revisit |
| `#/ux-lab` | PROTOTYPE-UTILITY | Foundations, states, and visual reference gallery |

Older V1–V6 hashes remain only as `LEGACY_COMPATIBILITY` routes where the
existing prototype still exposes them. They are not the canonical Wave 01–04
product path and should not be used for frontend migration planning.

## Complete local demo flow

`Landing → Register → Verify Email (123456) → Food Profile → Home → Create
Room → Preview → Lobby → Meal Preference → Picks → Winner → Restaurant →
Bills → Receipt → Items → Split → Bill Detail → Payment → Payment Status →
Completion → History → Home`

The Join path uses the deterministic local room code `FF-4827`. Account review
is available from the authenticated avatar menu: `Profile → Edit profile /
Food Profile → Save → Log out`. Gameplay, restaurant, bill, payment, and
history screens are explicitly `DESIGN CANDIDATE` / `PROTOTYPE ONLY`; they do
not claim to implement the team-owned runtime.

## Prototype utilities

The compact utility menu is available from the product shell and auth/landing
headers. It provides:

- New User, Existing User, Host, and Member local scenarios
- Language: TH / EN
- Motion ON / Reduced Motion
- `Reset demo`, which clears the active room, gameplay, bill/payment progress,
  generated local history, overlays, and returns to `#/landing`
- A link to `#/ux-lab`

Logout ends the local authenticated/session state and returns to Landing while
keeping the local user Food Profile and history available for a later demo
login. This is prototype behavior, not production auth persistence.

## Image slot requirements

All imagery is a local placeholder. Owner assets can replace the following
slots without changing layout contracts:

| Slot | Ratio | Recommended source |
| --- | --- | --- |
| LANDING HERO | 16:9 | 1600 × 900 |
| HOME HERO | 16:9 | 1600 × 900 |
| ROOM / LOBBY | 4:3 | 1200 × 900 |
| SOCIAL / JOIN | 4:3 | 1200 × 900 |
| MEAL PICK | 1:1 or 4:3 | 800 × 800 / 960 × 720 |
| RESTAURANT | 4:3 | 1200 × 900 |
| RECEIPT | 3:4 | 900 × 1200 |
| RECENT FOODFIGHT | 4:3 | 960 × 720 |
| AVATAR | 1:1 | 320 × 320 |

## Responsive review widths

Review the same hash-routed screen at `360`, `375`, `390`, `430`, `768`,
`1024`, `1280`, and `1440` px. Mobile uses the floating bottom navigation;
desktop uses the top application navigation. Functional pages should use
available desktop width rather than a centered phone-width column.

## Architecture and boundary

- `js/prototype-wave1-state.js` is the shared local state/router utility for
  the clickable product prototype.
- `js/prototype-wave1-components.js` and `styles/prototype-wave1.css` are the
  approved product shell/component foundation.
- `js/screens-wave1.js`, `screens-wave2.js`, and `screens-wave3.js` contain
  the earlier bounded waves.
- `js/screens-wave4.js` and `styles/prototype-wave4.css` contain only the
  profile/account closure layer and reuse the shared foundation.
- `js/ux-lab.js` and `styles/ux-lab.css` remain the internal visual lab.

The prototype uses deterministic in-memory state and static local fixtures.
There are no `fetch`, Axios, XHR, WebSocket, database, payment, AI, map, or
image-download calls. Production `frontend/**`, `backend/**`, Prisma, and
database code are outside this prototype's write boundary.
