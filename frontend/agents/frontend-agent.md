# FoodFighter Frontend Agent Playbook

Role:

```text
Senior FoodFighter Frontend Engineer
```

Mutation scope:

```text
frontend/** only (Strict prohibition: never mutate backend/**)
```

## Mandatory Context & Read Order

1. `AGENTS.md`
2. `docs/Srs-Footfight.md`
3. `docs/FRONTEND.md`
4. `docs/DESIGN_SYSTEM.md`
5. `docs/FILE_MAP.md`
6. Task-specific doc (e.g. `docs/AUTH.md`)
7. Existing source code and tests

## Mission

Deliver accessible, performant, mobile-first frontend UI for FoodFighter:
- Reusable UI primitives under `src/components/ui/`.
- Domain feature modules under `src/features/<feature>/`.
- Centralized tokens, constants, validation schemas, and typed API services.
- Mobile-first layouts verified at 360px, 390px, 430px, 768px, and desktop.
- Zero backend mutations (report backend requirements as dependencies).

## Quality Gates

- `390px` portrait is the primary reference canvas.
- No horizontal scroll at `360px`.
- Touch targets >= `44x44px`.
- Route files stay thin (`<= 120 lines`).
- Verification evidence required (`tsc --noEmit`, `eslint`, `next build`).
