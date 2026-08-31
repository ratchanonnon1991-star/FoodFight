# FoodFighter Frontend Quality & AI Coding Guard

> Canonical source for **code quality, maintainability gates, resource-light verification, artifact hygiene, and Git safety**.

## 1. Quality Philosophy

Clean code means:
- Every file has a single, identifiable responsibility.
- Imports explicitly reveal real file ownership (avoid broad barrel re-exports).
- Generic UI primitives are reused without feature-local duplication.
- Domain rules remain inside feature boundaries.
- Clean code does **NOT** mean excessive micro-file fragmentation or unnecessary abstraction.

---

## 2. Component Review Signals & Thresholds

Use these signals to maintain readability without splitting cohesive code:

| Component Type | Expected Range | Mandatory Review Trigger |
|---|---|---|
| **Route / Page / Layout** | ~120–180 lines | >200 lines |
| **Generic UI Primitive** | ~180–220 lines | >250 lines |
| **Feature Component / Form** | ~250–350 lines | >400 lines |

---

## 3. Resource-Light Verification Policy

FoodFighter avoids heavy and unnecessary build/test loops after minor changes.

### Verification Tiers
1. **Small / Incremental Changes (Typography, single component, i18n, simple bugfix)**:
   - Run: `pnpm exec tsc --noEmit`
   - Visual inspection on relevant viewport if UI was altered.
   - Do NOT run full test suites or production builds.
2. **Feature Completion / Major Logic Integration**:
   - Run: `pnpm exec tsc --noEmit`
   - Run focused feature tests (e.g. `Vitest` / `Jest` for the modified feature).
3. **Major Milestone / Release Gate**:
   - Run: TypeScript, focused unit/component tests, responsive QA, and core Playwright E2E once.
   - Run production build (`pnpm build`) **only** when validating deployment readiness.

---

## 4. Test Artifact & Build Output Hygiene

### Test Source vs Generated Artifacts
- **Preserve Legitimate Test Source**: `*.test.ts`, `*.test.tsx`, `*.spec.ts`, `*.spec.tsx` are permanent source files. Never delete test files merely to clean up.
- **Clean Disposable Generated Output**:
  - `playwright-report/**`
  - `test-results/**`
  - `coverage/**`
  - Temporary screenshots, videos, and trace archives.
  - Temporary test logs.
- **Never Commit Generated Artifacts**: Temporary test outputs must never be staged or committed to Git.

### Cache Policy
- **Preserve Useful Incremental Caches**:
  - `frontend/.next/**` (Next.js compilation cache)
  - `node_modules/**`
  - `pnpm` global store / cache
- **Never delete caches routinely**: Deleting caches forces excessive CPU and disk churn on subsequent runs. Clear caches only when corruption or version mismatch occurs.

### Backend Dist Policy
- `backend/dist/**` is generated Nest/TypeScript build output.
- It is intentionally **gitignored** and untracked.
- Do NOT commit `backend/dist/**` and do NOT repeatedly delete it when running development tasks.

---

## 5. Long-Running Process Policy

- Temporary dev servers, test watchers, or Playwright processes started during a task must be gracefully terminated when the task completes.
- Never leave background watchers running unintentionally.
- Never kill unrelated user-owned background processes.

---

## 6. Pre-Commit Verification Gate

Before completing any coding task:

```text
[ ] Correct Git branch verified (NOT on dev)
[ ] Only task-owned files modified
[ ] No backend source modified unless explicitly authorized
[ ] Global semantic tokens used (no hardcoded HEX in JSX)
[ ] Shared UI primitives reused (no duplicate buttons/cards/inputs)
[ ] Both Thai and English locales supported where copy exists
[ ] TypeScript typecheck passes: pnpm exec tsc --noEmit (0 errors)
[ ] Disposable test artifacts removed
[ ] Full git diff reviewed before reporting completion
```
