# FoodFighter Frontend Quality & AI Coding Guard

> Read this file before refactors, cleanup, commits, or when a task touches many files.

## 1. Quality goal

Clean code means:

- each file has a reason to exist,
- responsibility is easy to identify,
- imports reveal the implementation path,
- simple logic remains visible,
- shared UI is reused,
- features do not leak into generic layers.

Clean code does **not** mean maximum abstraction or maximum file splitting.

---

## 2. Responsibility review

Before adding substantial logic to an existing component ask:

1. What responsibility does this file currently own?
2. Is the new logic part of that same responsibility?
3. Is there a cohesive block that should be extracted?
4. Would extraction improve understanding?
5. Would extraction only create navigation noise?

Responsibility is the primary criterion.

---

## 3. File-size signals

Suggested review thresholds:

```text
route/page/layout        ~120 lines
generic UI               ~180 lines
feature form/component   ~220 lines
service/schema/config    ~180 lines
```

These are review signals, not compiler limits.

Do not split a cohesive file just to satisfy a number.

Do not ignore a 170-line file that mixes six unrelated responsibilities.

---

## 4. Avoid over-engineering

AI agents must not create architecture merely because it sounds sophisticated.

Avoid by default:

- one folder per component,
- `index.ts` for every component,
- generic form renderer,
- configuration-driven JSX for ordinary forms,
- huge global stores,
- custom action/event frameworks,
- wrapper around wrapper around primitive,
- speculative folders for future features.

---

## 5. Avoid under-structuring

Also avoid:

- API calls scattered through pages,
- duplicate route strings,
- duplicate generic UI primitives,
- domain logic inside `components/ui`,
- 500-line mega components,
- one giant `utils.ts` with unrelated helpers,
- duplicate Socket.IO subscriptions throughout children.

Use the minimum useful structure.

---

## 6. Direct import review

Prefer imports that make ownership obvious.

Good:

```ts
import { LoginForm } from "@/features/auth/components/LoginForm";
```

Avoid hiding everything behind broad barrels.

Delete unnecessary `index.ts` only in a dedicated, verified cleanup/refactor task.

Do not perform mass path rewrites casually during feature work.

---

## 7. Branch preflight

Before mutation:

```bash
git branch --show-current
git status --short
```

Switch/create the correct task branch before file changes.

Before commit, verify the branch again.

Do not use destructive Git commands on unrelated work.

---

## 8. Coding sequence

AI agents should work in this order:

```text
READ
→ AUDIT
→ PLAN
→ IMPLEMENT
→ VERIFY
→ REVIEW DIFF
→ COMMIT
```

Do not start by generating a large architecture rewrite.

---

## 9. New component gate

Before creating a component:

```text
[ ] existing shared component checked
[ ] ownership category known
[ ] clear responsibility/name
[ ] extraction improves readability
[ ] not created only for line count
[ ] client/server boundary considered
[ ] accessibility considered
[ ] semantic token usage considered
```

---

## 10. Feature completion gate

Before finishing:

```text
[ ] page.tsx remains route/composition focused
[ ] feature UI is feature-owned
[ ] simple fields remain explicit
[ ] complex behavior extracted only when justified
[ ] schema/validation outside large JSX
[ ] transport detail outside UI
[ ] no backend source imports
[ ] no duplicate generic UI
[ ] centralized routes reused
[ ] no raw design values scattered in JSX
[ ] loading/error/disabled states handled
[ ] mobile widths checked
[ ] keyboard/focus checked
[ ] responsibility/line-count review done
[ ] typecheck passes
[ ] lint passes
[ ] build passes
[ ] full diff reviewed
```

---

## 11. Tailwind/editor guard

For styling work:

1. detect installed Tailwind version,
2. use canonical syntax for that version,
3. inspect Tailwind/VS Code diagnostics,
4. do not introduce avoidable legacy syntax,
5. do not disable warnings globally just to remove orange diagnostics.

---

## 12. Documentation guard

Do not create a new Markdown file for every task.

Create/update documentation only when the decision is:

- durable,
- cross-task,
- product-contract relevant,
- necessary for future agents.

Do not keep historical prompts as active canonical docs.

One instruction should have one canonical home.

---

## 13. Model/skill/agent files

Model-specific files should be thin pointers, not duplicated rulebooks.

If present:

```text
CLAUDE.md
agents/**
skills/**
```

they should normally point to `AGENTS.md` and task-specific canonical docs rather than repeating hundreds of lines.

If tooling does not require them, remove/archive them in a dedicated cleanup task.

---

## 14. Verification

Minimum frontend verification:

```bash
pnpm exec tsc --noEmit
pnpm lint
pnpm build
```

Also review:

```bash
git diff --stat
git diff
git status --short
```

For visual changes, manually check relevant widths/routes.

---

## 15. Backend boundary check

Unless backend mutation is explicitly authorized:

```text
BACKEND_MUTATIONS: NONE
```

Do not stage generated backend artifacts accidentally.

---

## 16. Refactor rule

A cleanup/refactor should preserve behavior unless the task explicitly changes behavior.

For architecture simplification:

- flatten only where navigation improves,
- remove only unnecessary barrels,
- move files only to clearer ownership,
- update imports carefully,
- verify all routes,
- use one bounded commit per coherent refactor.

Do not combine a large architecture rewrite with a new feature.
