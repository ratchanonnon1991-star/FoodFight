# FoodFighter Frontend Testing Guide

> Canonical source for **test strategy, tool stack, resource-light execution, test conventions, and artifact hygiene**.

## 1. Test Philosophy

Test **behavior, risk, and user-visible outcomes**, not implementation details.

- High-value tests cover validation schemas, complex calculations, form state transitions, and critical multi-page user journeys.
- Do not write repetitive tests for declarative static markup.
- Execute testing in a **resource-light manner**, reserving heavy suites for meaningful milestones.

---

## 2. Active Tool Stack

| Test Tier | Tool | Role | Execution Frequency |
|---|---|---|---|
| **Unit & Component** | `Vitest` + `React Testing Library` | Schema validation, pure calculation helpers, form submit states | Feature completion |
| **End-to-End (E2E)** | `Playwright` (Chromium) | Critical user journeys across real browser routes | Milestone completion |
| **Responsive QA** | `Playwright` Viewports (360/390/430/768/1440) | Multi-viewport layout integrity & horizontal overflow check | Milestone completion |
| **Backend Integration Tests** | `Jest` (in `backend/`) | RBAC guards, controller routing, Prisma services | Feature integration |

---

## 3. Resource-Light Testing Commands

- `pnpm test` / `pnpm exec vitest run <path>`: Run focused unit/component tests.
- `pnpm exec tsc --noEmit`: Typecheck without code emission (primary lightweight sanity check).
- `pnpm test:e2e:smoke`: Run core Playwright smoke suite (E2E milestone check).
- `pnpm test:e2e`: Full Playwright suite (pre-release validation only).

> **Rule**: Do NOT run full E2E or production builds after every minor frontend edit.

---

## 4. Test Source vs Generated Artifact Hygiene

- **Permanent Test Source**: All `*.test.ts`, `*.test.tsx`, `*.spec.ts`, `*.spec.tsx` files are tracked source code.
- **Disposable Output**:
  - Delete temporary test output after inspection: `test-results/`, `playwright-report/`, `coverage/`, traces, and screenshots.
  - Never stage or commit generated test directories to Git.

---

## 5. Mocking Boundaries

- **Unit Tests**: Zero mocks needed for pure schemas and calculations.
- **Component Tests**: Mock at the service / API boundary (`authService`, `socketClient`).
- **E2E Tests**: Use real mock server adapters or sandboxed backend endpoints. Never mock internal React hooks.
