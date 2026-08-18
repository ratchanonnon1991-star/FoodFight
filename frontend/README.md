# FoodFighter Frontend

AI-powered group meal decision platform frontend built with Next.js (App Router), React, TypeScript, and Tailwind CSS.

## Getting Started

### Prerequisites
- Node.js (v20+)
- pnpm

### Installation & Development
```bash
# Install dependencies
pnpm install

# Start local dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

- **Developer Design System Showcase**: [http://localhost:3000/design-system](http://localhost:3000/design-system)

### Verification Commands
```bash
# Typecheck
pnpm exec tsc --noEmit

# Lint
pnpm lint

# Production build
pnpm build
```

## Documentation & Contribution

All AI agents and developers must start with:

👉 **[`AGENTS.md`](./AGENTS.md)**

`AGENTS.md` routes to task-specific modular documentation under `docs/`:

- [`docs/FRONTEND_ARCHITECTURE.md`](./docs/FRONTEND_ARCHITECTURE.md) — Code structure, routes, and layer boundaries
- [`docs/FRONTEND_COMPONENTS.md`](./docs/FRONTEND_COMPONENTS.md) — Component responsibilities, primitives, and extraction rules
- [`docs/FRONTEND_LOGIC.md`](./docs/FRONTEND_LOGIC.md) — Forms, validation schemas, state, and API services
- [`docs/FRONTEND_UI_UX.md`](./docs/FRONTEND_UI_UX.md) — Mobile-first standard, design tokens, typography, and a11y
- [`docs/FRONTEND_TESTING.md`](./docs/FRONTEND_TESTING.md) — Testing strategy, unit/integration/E2E, and mocking
- [`docs/FRONTEND_QUALITY.md`](./docs/FRONTEND_QUALITY.md) — Clean code checklist, line-count signals, and preflight rules
- [`docs/Srs-Footfight.md`](./docs/Srs-Footfight.md) — Product requirements and business rules
- [`docs/DESIGN_SYSTEM.md`](./docs/DESIGN_SYSTEM.md) — Approved palette tokens, component catalog, and motion specs
- [`docs/AUTH.md`](./docs/AUTH.md) — Authentication flow specification and backend gaps

> **Rule**: Read only the documents relevant to your active task.
