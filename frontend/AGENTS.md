# FoodFighter — AI Entry Point & Agent Rules

> **Read this file first. Do not read every project document on every task.**
>
> This file is the primary routing and index document for AI agents working on FoodFighter.

## 1. Default Workflow

Before modifying any code:

1. **Verify Git Safety**: Confirm current branch is NOT `dev` via `git branch --show-current` and inspect `git status --short`.
2. **Consult Routing Matrix**: Read **only** the task-relevant documents in Section 3 below.
3. **Inspect Source First**: Inspect existing components/services before creating new files.
4. **Implement Smallest Change**: Keep changes focused, typed, and clean.
5. **Resource-Light Verification**: Run `pnpm exec tsc --noEmit` and focused tests when relevant. Do NOT run heavy full test suites or production builds for minor changes.
6. **Review Diff**: Check `git diff` carefully before completing tasks.

---

## 2. Canonical Frontend Style

FoodFighter uses:

**Feature-Oriented + Layered + Explicit Next.js (App Router)**

- **PAGE COMPOSES**: Route files (`src/app/`) stay thin and assemble feature modules.
- **FEATURE OWNS**: Domain rules, forms, schemas, and feature UI live in `src/features/<feature>/`.
- **SHARED REUSES**: Generic UI primitives live in `src/components/ui/`; shared widgets in `src/components/shared/`.
- **TOKENS STYLE**: Styling strictly uses semantic CSS variables from `src/styles/tokens.css`. Never hardcode hex values in JSX.

Primary Architecture Reference: `docs/FRONTEND_ARCHITECTURE.md`

---

## 3. Task → Required Reading Matrix

| Task Type | Required Reading |
|---|---|
| **Any frontend coding / routing** | `AGENTS.md` + `docs/FRONTEND_ARCHITECTURE.md` |
| **Design system / palette / typography** | + `docs/DESIGN_SYSTEM.md` |
| **Create / split / reuse UI components** | + `docs/FRONTEND_COMPONENTS.md` |
| **Forms / validation / state / API / realtime** | + `docs/FRONTEND_LOGIC.md` |
| **Visual design / responsive / accessibility / motion** | + `docs/FRONTEND_UI_UX.md` |
| **Testing / test cleanup / test policy** | + `docs/FRONTEND_TESTING.md` |
| **Quality guard / refactoring / pre-commit** | + `docs/FRONTEND_QUALITY.md` |
| **Authentication flow** | + `docs/AUTH.md` |
| **Product requirements / business rules** | + `docs/Srs-Footfight.md` |

---

## 4. Source-of-Truth Precedence

When requirements appear ambiguous or conflicting, follow this exact order:

1. Current Owner-Approved Decisions & Benchmarks (e.g. Home is FROZEN benchmark)
2. `docs/Srs-Footfight.md` (Product & System Requirements)
3. Task-Specific Feature Documents (`docs/AUTH.md`, `docs/DESIGN_SYSTEM.md`)
4. `docs/FRONTEND_UI_UX.md` & `docs/FRONTEND_ARCHITECTURE.md`
5. Existing Codebase Implementation

---

## 5. Global TH/EN Localization System

- **Supported Locales**: `"th"` and `"en"` (Default / fallback: `"en"`).
- **Single Source of Truth**: `LanguageProvider` (`src/i18n/LanguageProvider.tsx`) wrapping the root layout.
- **Hook**: `useLanguage()` returns `{ locale, setLocale }`.
- **Persistence**: Single localStorage key `foodfighter_language`.
- **Feature Dictionaries**: Colocated typed dictionaries in each feature (e.g. `roomTranslations`, `foodFightTranslations`, `billTranslations`, `adminTranslations`).
- **No Heavy Packages**: Do NOT introduce `next-intl` or `react-i18next`.

---

## 6. Admin Portal (Required Product Scope)

- **Route Group**: `src/app/(admin)/admin/` (Dashboard, Analytics, Users, Rooms, Bills)
- **Route Guard**: `AdminRouteGuard` enforces `Role.ADMIN` session.
- **Backend Guard**: Protected via NestJS `@UseGuards(RolesGuard)` and `@Roles(Role.ADMIN)`.
- **Backend Registration**: `AdminModule` is imported in `backend/src/app.module.ts`.
- **Promotion Tool**: `pnpm admin:promote --email <email>` via `backend/scripts/promote-admin.ts`.

---

## 7. Component Maintainability & Splitting Signals

- **Route / Page / Layout**: ~120–180 lines (review at >200 lines)
- **Generic UI Primitive**: ~180–220 lines (review at >250 lines)
- **Feature Component / Form**: ~250–350 lines (mandatory review at >400 lines)
- **Cohesion Rule**: A cohesive 300-line component should remain intact. Do NOT create meaningless micro-components (e.g. `EmailLabel`, `SubmitButtonText`).

---

## 8. Resource-Light Testing & Cache Hygiene

- **Verification Tiers**:
  - Small change: `pnpm exec tsc --noEmit`
  - Feature completion: Focused unit tests (`Vitest` / `Jest`)
  - Milestone: QA / Responsive / Playwright E2E once
  - Production build (`pnpm build`): Only for deployment validation
- **Cache Preservation**: Always preserve `frontend/.next/**`, `node_modules/**`, and `pnpm` store.
- **Artifact Cleaning**: Clean disposable output (`test-results/`, `coverage/`, Playwright traces/videos). Never commit test artifacts.
- **Backend Dist**: `backend/dist/**` is generated and gitignored. Do not commit or repeatedly delete.

---

## 9. 7-Phase Frontend Completion Plan

1. **Phase 1: Current Documentation Refresh** — *[COMPLETED]*
2. **Phase 2: Admin Integration Completion** — *[IMPLEMENTED + VERIFIED — CHECKPOINT PENDING]*
3. **Phase 3: Remaining Workspace Decisions** — *[NEXT: Favicon & asset cleanup]*
4. **Phase 4: Global Frontend Foundation Audit** *(Shared component reuse, token hardcode audit, layout cleanup)*
5. **Phase 5: Frontend Completion Inventory** *(Classify every route/page: Done / Partial / Missing / Blocked)*
6. **Phase 6: UX/UI Completion** *(Complete and refine remaining feature screens inheriting stable global foundations)*
7. **Phase 7: Final Frontend QA** *(TypeScript, unit tests, responsive check, E2E, accessibility, release build)*

---

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
