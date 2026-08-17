# FoodFighter Frontend Design System — Master Specification

## 1. Objective

Build a reusable, accessible, responsive, motion-aware Design System V1 for FoodFighter.

It must become the foundation for:
- frontend-auth,
- Food Profile,
- Room/Lobby,
- Meal Preference,
- AI Recommendations,
- Voting,
- Restaurant discovery,
- History.

It must not contain those features' business logic.

## 2. Product source

Product behavior comes from:

```text
docs/Srs-Footfight.md
```

This document is an implementation/design-system contract, not a replacement for the SRS.

## 3. Technology baseline

SRS baseline:
- Next.js
- TypeScript
- Tailwind CSS

Approved Design System V1 dependencies, only if missing after audit:

```text
motion
class-variance-authority
clsx
tailwind-merge
lucide-react
```

Do not reinstall or change versions without inspecting `package.json`.

Do not add a UI framework merely for convenience.

## 4. Brand palette

Canonical palette source:

```text
#FFC6D9 Pastel Petal
#FFE1C6 Soft Apricot
#FFF7AE Vanilla Custard
#48284A Blackberry Cream
#916C80 Dusty Mauve
```

Detailed mapping:
- `docs/COLOR_SYSTEM.md`

## 5. globals.css

Required file:

```text
src/app/globals.css
```

Responsibilities:
- Tailwind/global import wiring,
- reset/base rules,
- html/body defaults,
- typography inheritance,
- global background/text,
- focus-visible baseline,
- reduced-motion CSS fallback,
- semantic token/theme wiring.

Feature selectors are forbidden.

## 6. Token architecture

Use:

```text
source palette
→ semantic tokens
→ component variants
```

Token categories:
- color,
- typography,
- spacing,
- radius,
- shadow,
- border,
- motion,
- z-index where required,
- responsive conventions.

## 7. Typography

Define semantic roles:

```text
display
heading-1
heading-2
heading-3
body
body-small
label
caption
```

Do not invent a new font family if the repository already has an approved one.

If no font is approved, preserve the current frontend font for this task and record typography-family selection as a future design decision.

Typography must render Thai and English comfortably.

## 8. Component architecture

Detailed catalog:
- `docs/COMPONENT_CATALOG.md`

Folder rule:

```text
src/components/ui/<component>/
```

Every primitive gets its own folder.

## 9. Motion

Detailed rules:
- `docs/MOTION_SYSTEM.md`

Approved package:
- `motion`

Central locations:

```text
src/lib/motion/
src/components/providers/motion-provider/
```

Motion must be purposeful and reduced-motion aware.

## 10. Icons

Preferred default:
- `lucide-react`

Do not mix multiple icon libraries unless there is an established existing system that should be preserved.

## 11. Class composition

Preferred helper location:

```text
src/lib/utils/cn.ts
```

If `clsx` + `tailwind-merge` are approved/present, use them to create one consistent helper.

## 12. Tailwind version safety

Do not assume Tailwind v4.

Audit:
- `package.json`,
- `postcss.config.*`,
- current `globals.css`,
- Tailwind config if present.

If v4:
- CSS-first patterns may be appropriate.

If v3:
- preserve v3-compatible configuration.

Do not perform a Tailwind major-version migration inside this task.

## 13. Next.js boundary safety

Do not add `"use client"` automatically.

Client components are justified by:
- browser APIs,
- state/effects,
- event handlers,
- Motion/client-only behavior.

Keep server-compatible composition server-side when possible.

## 14. Design quality

FoodFighter should feel intentional, not like generic AI-generated UI.

Use the approved palette, clear type hierarchy, controlled spacing, and restrained motion.

Do not default to:
- generic purple gradients,
- excessive glassmorphism,
- card-everything layouts,
- huge rounded rectangles everywhere,
- decorative motion with no state meaning.

## 15. Accessibility

Must verify:
- semantic controls,
- labels,
- keyboard access,
- focus-visible,
- contrast,
- reduced motion,
- disabled/loading states,
- error presentation,
- status beyond color alone.

## 16. Responsive behavior

Mobile-first interaction quality.

Verify:
- small-screen forms,
- tap targets,
- no horizontal overflow,
- Thai/English wrapping,
- desktop content width.

## 17. Scope

In this branch implement only Design System V1.

Do not implement:
- LoginForm,
- backend auth integration,
- Room,
- Lobby,
- AI Recommendation UI,
- Voting,
- Map,
- Restaurant results,
- OCR,
- Split Bill.

## 18. Verification

Before completion:
- run available typecheck,
- lint,
- build,
- relevant tests,
- manually inspect states,
- review Git diff.

Never report PASS from assumptions.
