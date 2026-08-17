# FoodFighter Frontend — Claude Entry Point

Claude must treat `AGENTS.md` as the canonical frontend working agreement.

Canonical read order:

```text
1. AGENTS.md
2. docs/Srs-Footfight.md
3. docs/FRONTEND.md
4. docs/DESIGN_SYSTEM.md
5. docs/FILE_MAP.md
6. docs/AUTH.md (or task-specific doc)
7. relevant source/tests
```

Core principles:
- `frontend/**` mutation only; never touch `backend/**`.
- Mobile-first (390px reference, 360–430px checks).
- Reusable Design System primitives under `src/components/ui/`.
- Domain features under `src/features/<feature>/`.
- Centralized tokens, routes, validation schemas, and services (no hard-coding).
- Verified with typecheck, lint, and build before completing tasks.
