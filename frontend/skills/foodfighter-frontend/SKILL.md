---
name: foodfighter-frontend
description: Implement, review, or refactor FoodFighter frontend features using the approved modular frontend documentation, mobile-first design system, reusable primitives, centralized validation/constants, typed service boundaries, and strict frontend-only boundaries.
---

# FoodFighter Frontend Skill

## Workflow

1. Read `AGENTS.md` for task routing and branch preflight.
2. Read the task-specific canonical documentation:
   - Architecture & structure: `docs/FRONTEND_ARCHITECTURE.md`
   - Components & extraction: `docs/FRONTEND_COMPONENTS.md`
   - Logic, forms, state & API: `docs/FRONTEND_LOGIC.md`
   - Styling, tokens, responsive & a11y: `docs/FRONTEND_UI_UX.md`
   - Testing & verification: `docs/FRONTEND_TESTING.md`
   - Refactor, quality & completion gate: `docs/FRONTEND_QUALITY.md`
   - Feature truth: `docs/Srs-Footfight.md`, `docs/AUTH.md`, `docs/DESIGN_SYSTEM.md`
3. Inspect existing code before adding files.
4. Implement bounded changes (`BACKEND_MUTATIONS: NONE`).
5. Run resource-light verification (`tsc --noEmit`, focused tests when applicable).
6. Review diff before commit.
