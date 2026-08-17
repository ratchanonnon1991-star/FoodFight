<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# FoodFighter Frontend — Canonical Agent Instructions

> Scope: `C:\devnest 101\FoodFight\frontend`
> Hard boundary: frontend work only. Never mutate `backend/**`.

## 1. Source-of-truth order

Read before coding:

1. `docs/Srs-Footfight.md` (SRS product truth)
2. Latest owner-approved UI/UX reference PDF
3. Explicit owner decisions
4. `AGENTS.md`
5. Canonical frontend docs (`docs/FRONTEND.md`, `docs/DESIGN_SYSTEM.md`, `docs/AUTH.md`, `docs/FILE_MAP.md`)
6. Project-local skill (`skills/foodfighter-frontend/SKILL.md`)
7. External skills (advisory)
8. Agent preference

Never silently reconcile conflicts. Report them.

## 2. Frontend-only mutation boundary

Allowed:

```text
frontend/**
```

Forbidden:

```text
backend/**
Prisma schema / database migrations
NestJS modules / controllers / services
backend environment / configuration
backend authentication implementation
```

If frontend work discovers a missing backend/API capability:
1. Do not implement backend code.
2. Record the missing contract/endpoint as a dependency.
3. Keep frontend behind a typed service/adapter boundary.
4. Report the dependency clearly.

## 3. Required workflow

```text
READ → AUDIT → PLAN → IMPLEMENT → VERIFY → REVIEW DIFF → DOCUMENT → COMMIT
```

Before implementation state:
- objective,
- why,
- in-scope,
- out-of-scope,
- risks,
- verification plan.

## 4. Mobile-first mandatory standard

Primary design target is phone portrait:

```text
Primary reference: 390px portrait
Required verification widths: 360, 375, 390/393, 430, 768, desktop
```

- Mobile is the starting design; desktop is progressive enhancement.
- No mandatory horizontal scrolling at 360px.
- Touch targets >= 44x44px.
- Primary actions and form controls are full-width on mobile.
- Thai and English text must render cleanly without clipping.

## 5. No hard-coded architecture drift

Centralize shared and policy-sensitive values:
- brand colors → semantic CSS tokens (`src/styles/tokens.css`)
- routes → route constants (`src/config/routes.ts`)
- site metadata → site config (`src/config/site-config.ts`)
- validation policy → feature schema/constants (`src/features/<feature>/constants/`)
- API endpoints → service layer (`src/features/<feature>/services/`)
- motion timings → motion presets (`src/lib/motion/`)

Single-use presentational copy may remain local to its component.

## 6. File-size review thresholds

Review thresholds (not arbitrary syntax laws):

```text
route page / layout:       ideally <= 120 lines
generic UI component:      ideally <= 180 lines
feature component / form:  ideally <= 220 lines
service / schema / config: ideally <= 180 lines
```

If a file exceeds the threshold, inspect whether responsibilities are mixed and split cleanly by real responsibility.

## 7. Component ownership

```text
src/components/ui/<component>/       → Generic UI primitives (Button, Input, Card, etc.)
src/components/layout/<component>/   → Layout framing (PageContainer, AuthLayout)
src/components/providers/<provider>/ → Providers (MotionProvider)
src/features/<feature>/              → Feature/domain code (components, services, schemas)
src/app/                             → App Router pages and route layouts
```

Generic UI primitives must never import feature/domain code.

## 8. globals.css boundary

`src/app/globals.css` is global-only.

Allowed:
- Tailwind v4 imports (`@import "tailwindcss";`, `@import "../styles/tokens.css";`)
- `@theme` mappings
- `@layer base` resets, html/body defaults, font inheritance
- focus-visible baseline
- selection styling
- `@media (prefers-reduced-motion: reduce)` fallback

Forbidden: Feature-specific rules (`.login-form`, `.register-card`, `.room-card`, etc.).

## 9. Motion & Accessibility

- Motion must explain state, hierarchy, continuity, or feedback.
- Centralize motion in `src/lib/motion/` and wrap root in `MotionProvider`.
- Respect `prefers-reduced-motion` at all times.
- Ensure keyboard access, visible focus rings, ARIA labels, semantic roles (`role="alert"`, `role="status"`), and AAA/AA contrast.

## 10. Verification gate & Git hygiene

Never claim PASS without evidence. Run applicable checks:

```powershell
pnpm exec tsc --noEmit
pnpm lint
pnpm build
```

Git hygiene:
- One bounded task per commit.
- No unrelated files, no secrets, no `.next`, no `node_modules`, no backend mutations.
- Inspect `git status --short`, `git diff --stat`, and `git diff` before reporting.
