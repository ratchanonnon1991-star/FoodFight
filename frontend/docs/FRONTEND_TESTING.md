# FoodFighter Frontend Testing Guide

> Canonical source for **frontend testing philosophy, test levels, tool stack, and test conventions**.

## 1. Test Philosophy

Test **behavior and risk**, not implementation details.

- Focus tests on user-visible outcomes, critical business paths, and high-risk edge cases.
- Do not chase arbitrary test counts or 100% coverage metrics for simple, declarative UI.
- Tests should give high confidence that user journeys work and regression bugs do not reoccur.

---

## 2. Planned Tool Stack

| Test Level | Canonical Tool | Role |
|---|---|---|
| **Unit & Component** | `Vitest` + `React Testing Library` + `@testing-library/user-event` | Fast in-memory unit tests and component behavior verification |
| **End-to-End (E2E)** | `Playwright` | Real browser integration across full user journeys |
| **API Mocking (Optional)** | `MSW` (Mock Service Worker) | Request interception for integration testing when backend is unavailable |

> **Note**: Do **not** simultaneously configure or mix `Jest` with `Vitest`, or `Cypress` with `Playwright`. Vitest and Playwright are the single planned standard.

---

## 3. Unit Tests

Unit tests verify deterministic, isolated logic with no UI rendering or browser dependencies.

### Appropriate for:
- Validation schemas (e.g., Zod schemas for auth, room, preferences).
- Pure helper functions and calculation utilities.
- Backend DTO mappers and transformers.
- Formatters (e.g., currency, timestamps, countdown timers).
- Small deterministic business helpers (e.g., vote threshold calculations, tie-breaker logic).

### Test Placement:
Prefer colocated unit test files next to the source:

```text
src/features/auth/
├─ auth.schema.ts
└─ auth.schema.test.ts

src/lib/utils/
├─ format-timer.ts
└─ format-timer.test.ts
```

---

## 4. Component / Integration Tests

Component tests verify user interactions and rendering behavior from the user's perspective.

### Guidelines:
- Query elements by **role**, **accessible label**, and **visible text** (`getByRole`, `getByLabelText`, `getByText`).
- Avoid querying internal DOM details, component state, or CSS class names.
- Test user interactions via `@testing-library/user-event` rather than low-level `fireEvent`.
- Verify form validation error displays, loading states during submission, and action triggers.

Example target:

```tsx
// Good: tests user behavior and visible feedback
render(<LoginForm onSubmit={handleSubmit} />);
await userEvent.type(screen.getByLabelText(/email/i), "user@example.com");
await userEvent.type(screen.getByLabelText(/password/i), "Password123");
await userEvent.click(screen.getByRole("button", { name: /log in/i }));
expect(handleSubmit).toHaveBeenCalledWith(...);
```

---

## 5. End-to-End (E2E) Tests

E2E tests use **Playwright** to execute critical multi-page workflows in a real browser environment.

### Critical FoodFighter Journeys:
1. **Authentication**:
   - Register → Verify Email OTP → Login → Home
2. **Room / Lobby**:
   - Create Room → Join with Code → Toggle Ready → Start FoodFight
3. **Meal Decision Flow**:
   - Submit Meal Preference → AI Recommendations → OK / Pass Voting → Final Menu Result

### Test Placement:
All Playwright E2E tests live in the root E2E directory:

```text
tests/e2e/
├─ auth.spec.ts
├─ room-flow.spec.ts
└─ meal-decision.spec.ts
```

---

## 6. Visual Regression Testing

Selective visual screenshot comparison ensures layout stability on key screens across responsive viewports.

### Target Baseline Screens:
- `/design-system` (Developer reference catalog)
- `/` (Home Hero & public navigation)
- `/register` & `/login` (Auth forms)
- `/room/:id` (Lobby & member list)
- `/recommendations` (AI recommendation cards)
- `/voting` (OK / Pass voting interface)
- `/result` (Final Menu announcement & restaurant map)

> **Tip**: Snapshot only high-value stable screens. Do not capture every micro-interaction or fleeting intermediate state.

---

## 7. Accessibility (a11y) Testing

Test accessibility through queries and automated checks:

- Prefer `getByRole()`, `getByLabelText()`, and `getByPlaceholderText()` over brittle CSS selectors.
- Ensure form fields link correctly with labels (`htmlFor` / `id`) and error descriptions (`aria-describedby`).
- Verify keyboard navigation flow (Tab index, Enter, Space, Escape on dialogs/modals).
- Ensure focus rings remain visible and touch targets meet minimum sizes (`44x44px`).

---

## 8. Mocking Strategy

Mock strictly at deliberate system boundaries:

- **Unit Tests**: Pure functions require zero mocks.
- **Component Tests**: Mock external services/API clients at the service boundary (`authService`, `socketClient`).
- **E2E Tests**: Mock as little as reasonably possible. Prefer real mock adapters or sandboxed backend instances.
- Never mock internal React hooks or private implementation details.

---

## 9. Regression Testing Rule

Whenever a meaningful bug or edge-case defect is fixed:
1. Write a focused test that reproduces the bug before applying the fix (when practical).
2. Verify the test fails.
3. Apply the fix and verify the test passes.
4. Keep the regression test in the test suite to prevent recurrence.

---

## 10. Definition of Done (Testing)

A feature is complete when:
- [ ] Complex schemas and pure business helpers have colocated unit tests.
- [ ] Interactive feature forms have component tests covering valid submit, validation errors, and loading states.
- [ ] Critical user journeys are covered by Playwright E2E tests.
- [ ] All tests pass in CI without flakiness.
- [ ] No useless tests added purely for test count or coverage percentage.
