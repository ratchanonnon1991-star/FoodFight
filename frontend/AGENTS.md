<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# FoodFighter Frontend — Canonical Agent Instructions

> Canonical AI instruction entry point for all frontend work.
> Repository area: `C:\devnest 101\FoodFight\frontend`

## 1. Source-of-truth order

Read before coding:

1. `docs/Srs-Footfight.md`
2. `docs/FRONTEND.md`
3. `docs/FRONTEND_FILE_MAP.md`
4. `docs/FRONTEND_DESIGN_SYSTEM_MASTER.md`
5. `docs/COLOR_SYSTEM.md`
6. `docs/MOTION_SYSTEM.md`
7. `docs/COMPONENT_CATALOG.md`
8. `docs/FRONTEND_SKILLS.md`
9. Task-specific feature docs
10. Existing source code and tests

If documents conflict, do not silently reconcile them.

Priority:
- SRS product requirement
- explicitly approved owner decision
- architecture/design-system governance
- implementation convention
- agent preference

## 2. Current design-system task

Target branch:

```text
feature/frontend-design-system
```

Before creating it:

```powershell
git branch --show-current
git status --short
git branch --list feature/frontend-design-system
```

Create only if absent:

```powershell
git switch -c feature/frontend-design-system
```

Otherwise:

```powershell
git switch feature/frontend-design-system
```

Do not overwrite, reset, delete, or reformat unrelated work.

## 3. Required operating sequence

Every design-system task follows:

```text
READ
→ AUDIT
→ PLAN
→ IMPLEMENT
→ VERIFY
→ REVIEW DIFF
→ DOCUMENT
→ COMMIT
```

Do not jump directly into implementation.

Before changes, state:
- objective,
- why it matters,
- in-scope,
- out-of-scope,
- risks,
- verification plan.

## 4. Design-system ownership

### Generic UI primitives

Target:

```text
src/components/ui/<component>/
```

Examples:
- button
- icon-button
- input
- password-input
- label
- checkbox
- card
- badge
- alert
- spinner
- separator
- form-field

Each reusable UI primitive uses its own folder.

### Layout

Target:

```text
src/components/layout/<component>/
```

Examples:
- page-container
- auth-layout

### Providers

Target:

```text
src/components/providers/<provider>/
```

Example:
- motion-provider

### Feature/domain components

Target:

```text
src/features/<feature>/components/
```

Examples:
- LoginForm
- ReadyMemberCard
- MenuRecommendationCard
- VoteOption
- RestaurantCard

Do not place FoodFighter business concepts in `components/ui`.

## 5. Import direction

Allowed:

```text
app -> features -> components/ui
app -> components/layout
app -> components/providers
features -> lib
features -> components/ui
```

Forbidden:

```text
components/ui -> features
components/ui -> app
frontend -> backend source files
feature A -> feature B internals without an intentional contract
```

Frontend talks to backend through API/WebSocket contracts only.

## 6. Owner-approved brand palette

These exact source colors are approved:

```text
Pastel Petal      #FFC6D9
Soft Apricot      #FFE1C6
Vanilla Custard   #FFF7AE
Blackberry Cream  #48284A
Dusty Mauve       #916C80
```

Never scatter these raw hex values through feature code.

Map them through semantic tokens defined in `docs/COLOR_SYSTEM.md`.

Do not invent a conflicting brand palette.

## 7. globals.css rule

`src/app/globals.css` is a required Design System V1 deliverable.

It owns only:
- Tailwind/global imports,
- reset/base rules,
- html/body defaults,
- global typography inheritance,
- global background/text defaults,
- focus-visible baseline,
- reduced-motion CSS fallback,
- design token/theme wiring.

It must not become a feature stylesheet.

Forbidden examples:

```css
.login-button {}
.ready-member {}
.restaurant-card {}
.vote-card {}
```

## 8. Motion rule

Motion is approved.

Preferred package:

```text
motion
```

Centralize motion under:

```text
src/lib/motion/
src/components/providers/motion-provider/
```

Rules:
- motion must explain state, hierarchy, continuity, feedback, or appearance/disappearance;
- default to restraint;
- frequent actions should use little or no motion;
- simple color/border changes should normally use CSS transitions;
- respect `prefers-reduced-motion`;
- never scatter arbitrary durations/easing values across features;
- animations must not block interaction or hide state changes.

## 9. Component API rule

Prefer explicit variants and composition.

Avoid boolean-prop explosions such as:

```tsx
<Button primary destructive compact rounded loading outlined />
```

Prefer:

```tsx
<Button variant="primary" size="md" loading={isSubmitting} />
```

Use compound composition only when it genuinely improves the API.

## 10. Styling rule

Use:
- semantic tokens,
- Tailwind utilities appropriate to the installed version,
- centralized variants,
- `cn()` for safe class composition when approved dependencies are present.

Avoid:
- random hex colors,
- random pixel values,
- arbitrary shadows/radii in every component,
- duplicated component styles,
- inline style objects for routine design-system styling.

## 11. Accessibility baseline

Every interactive component must consider:
- semantic HTML,
- keyboard access,
- visible focus,
- accessible name,
- label association,
- error association,
- disabled semantics,
- loading semantics,
- sufficient contrast,
- status not represented only by color,
- reduced motion.

## 12. Responsive baseline

Design mobile-first and verify mobile + desktop.

Check:
- touch target size,
- wrapping,
- overflow,
- Thai and English text,
- mobile keyboard behavior,
- safe action placement.

## 13. Skills guidance

Read `docs/FRONTEND_SKILLS.md`.

The local FoodFighter skill is:

```text
skills/foodfighter-frontend-design-system/SKILL.md
```

It adapts principles from selected skills.sh entries but project requirements always take precedence.

Do not blindly install external skills or dependencies. Audit first.

## 14. Verification gate

Never claim PASS without evidence.

Inspect available scripts, then run the project equivalents of:

```powershell
pnpm exec tsc --noEmit
pnpm lint
pnpm build
pnpm test
```

Run only scripts/commands that actually apply to the repository.

Before completion:

```powershell
git status --short
git diff --stat
git diff
```

Also manually verify relevant UI states.

## 15. Git hygiene

- one bounded task,
- one focused commit,
- no unrelated files,
- no secrets,
- no `node_modules`,
- no generated build artifacts,
- no formatting unrelated files.

Suggested design-system commit only after verification:

```text
feat(frontend): establish design system foundation
```

## 16. Required handoff

Every agent report must contain:

1. STATUS
2. objective
3. files changed
4. exact file locations
5. requirements/design decisions used
6. dependencies added/removed
7. commands actually run
8. results
9. risks/open items
10. final Git status
11. commit SHA if committed
12. next bounded task
