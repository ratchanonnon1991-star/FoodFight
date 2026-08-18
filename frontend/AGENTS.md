# FoodFighter — AI Entry Point

> **Read this file first. Do not read every project document on every task.**
>
> This file is the routing/index document for AI agents working on FoodFighter.

## 1. Default workflow

Before coding:

1. Confirm the correct Git branch.
2. Inspect `git status --short`.
3. Read this file.
4. Read **only** the task-specific documents listed below.
5. Inspect the existing source before creating new files.
6. Implement the smallest coherent change.
7. Run verification.
8. Review the full diff before commit.

Do not load every Markdown file by default. Use selective reading to reduce context/token cost and keep execution fast.

---

## 2. Canonical frontend style

FoodFighter uses:

**Feature-oriented + Layered + Explicit Next.js style**

Meaning:

- organize code around real product features,
- keep clear layers for routes, feature UI, shared UI, logic, and transport,
- keep simple code explicit and readable,
- avoid hiding ordinary logic behind unnecessary abstractions,
- split files by real responsibility, not just line count.

If you are doing frontend work, the primary architecture document is:

`docs/FRONTEND_ARCHITECTURE.md`

---

## 3. Task → required reading

| Task type | Required reading |
|---|---|
| Any frontend coding | `AGENTS.md` + `docs/FRONTEND_ARCHITECTURE.md` |
| Create/change reusable UI component | + `docs/FRONTEND_COMPONENTS.md` |
| Form / validation / state / API / realtime | + `docs/FRONTEND_LOGIC.md` |
| Styling / responsive / accessibility / UI polish | + `docs/FRONTEND_UI_UX.md` |
| Test task / behavioral feature | + `docs/FRONTEND_TESTING.md` |
| Before commit / refactor / cleanup | + `docs/FRONTEND_QUALITY.md` |
| Auth feature | + existing `docs/AUTH.md` |
| Product behavior / business rule | + `docs/Srs-Footfight.md` |
| Design-system-only task | + existing `docs/DESIGN_SYSTEM.md` if present |
| New feature not documented yet | Read SRS first, then create/update only the feature-specific doc if truly needed |

Do not read documents that are unrelated to the active task.

---

## 4. Source-of-truth order

When documents disagree, prefer:

1. Current owner-approved product/UI reference
2. `docs/Srs-Footfight.md`
3. Task-specific feature document
4. `docs/FRONTEND_UI_UX.md`
5. `docs/FRONTEND_ARCHITECTURE.md`
6. Existing implementation, when it does not conflict with newer decisions

Do not invent missing product behavior.

---

## 5. Git branch rule

Every bounded task must verify the branch **before mutation**.

Minimum preflight:

```bash
git branch --show-current
git status --short
```

Use the correct feature/task branch before changing files.

Do not:

- commit onto the wrong branch,
- use destructive reset/clean commands on unrelated work,
- mix multiple unrelated features in one commit.

---

## 6. Frontend / backend boundary

Frontend may communicate with backend through HTTP/WebSocket contracts.

Frontend must not import backend source code.

Unless a task explicitly authorizes backend work:

`BACKEND_MUTATIONS: NONE`

Frontend components must not contain backend implementation logic.

---

## 7. Core code-placement rule

Use this mental model:

```text
Route
  ↓
Feature component
  ↓
Cohesive subcomponents
  ↓
Schema / hook / service
  ↓
Shared API / realtime infrastructure
  ↓
Backend
```

Avoid:

```text
Route
  ↓
500-line mega component
```

Also avoid:

```text
Route
  ↓
40 tiny components
  ↓
15 index.ts files
  ↓
multiple unnecessary abstraction layers
```

---

## 8. Component creation rule

Before creating a new component, ask:

- Is this a real reusable or independently understandable responsibility?
- Does an existing shared component already solve it?
- Is extraction improving readability?
- Am I creating it only to reduce line count?

Simple form fields normally stay explicit in the form.

Complex/cohesive behavior may be extracted.

Examples worth extracting:

- `VerificationCodeInput`
- `SocialAuthButtons`
- `TermsConsent`
- `RoomMemberList`
- `InviteSheet`
- `MenuRecommendationCard`

Examples usually not worth extracting:

- `EmailLabel`
- `PasswordLabel`
- `SubmitText`
- `OtpDigit1`

---

## 9. Import/export rule

Prefer direct imports that reveal the real file location.

Good:

```ts
import { RegisterForm } from "@/features/auth/components/RegisterForm";
```

Avoid broad barrels that hide ownership:

```ts
import { RegisterForm } from "@/features";
```

Do not create `index.ts` for every component by default.

---

## 10. Shared component rule

Generic reusable UI belongs in:

`src/components/ui/`

Reusable layout/shell pieces belong in:

`src/components/layout/`

Reusable non-domain widgets belong in:

`src/components/shared/`

FoodFighter-specific UI belongs in:

`src/features/<feature>/`

Do not put Room/Auth/Voting business concepts into generic UI primitives.

---

## 11. Documentation rule

Keep documentation minimal.

One rule should have one canonical home.

Do not duplicate the same coding rule across:

- `AGENTS.md`
- feature docs
- skill docs
- model-specific docs
- extra audit docs

If a model-specific file merely repeats these rules, consolidate it.

---

## 12. Completion rule

Before reporting completion:

```text
[ ] correct branch
[ ] task-owned files only
[ ] responsibilities still clear
[ ] no unnecessary abstraction
[ ] no duplicate shared UI
[ ] typecheck passes
[ ] lint passes
[ ] build passes
[ ] affected responsive UI checked
[ ] full diff reviewed
[ ] backend untouched unless explicitly authorized
```

If a task needs more detail, read only the relevant document from Section 3.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
