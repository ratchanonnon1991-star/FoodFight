---
name: foodfighter-frontend
description: Implement, review, or refactor FoodFighter frontend features using the approved mobile-first design system, reusable primitives, centralized validation/constants, typed service boundaries, and strict frontend-only boundaries.
---

# FoodFighter Frontend Skill

## Scope

Covers all FoodFighter frontend work:
- Design System primitives (`src/components/ui/`, `src/styles/tokens.css`)
- Layout & navigation (`src/components/layout/`, App Router)
- Authentication flows (`src/features/auth/`)
- Food Profile onboarding (`src/features/food-profile/`)
- Room & Lobby (`src/features/room/`)
- AI Recommendations & Voting (`src/features/recommendations/`, `src/features/voting/`)
- Restaurant Discovery (`src/features/restaurants/`)

## Canonical Documentation Order

1. `AGENTS.md`
2. `docs/Srs-Footfight.md`
3. `docs/FRONTEND.md`
4. `docs/DESIGN_SYSTEM.md`
5. `docs/FILE_MAP.md`
6. Task-specific doc (e.g. `docs/AUTH.md`)

## Core Rules

- **Strict Frontend Boundary**: Never edit `backend/**`. Report missing endpoints as dependencies.
- **Mobile-First**: Primary reference is 390px. Verify 360px (no overflow), 375px, 390px, 430px, and desktop.
- **No Hardcoding**: Centralize routes, brand tokens, validation schemas, and API service calls.
- **Clean Architecture**: Route pages <= 120 lines, UI components <= 180 lines, feature forms <= 220 lines.
- **Verification Gate**: Evidence from `pnpm exec tsc --noEmit`, `pnpm lint`, and `pnpm build`.
