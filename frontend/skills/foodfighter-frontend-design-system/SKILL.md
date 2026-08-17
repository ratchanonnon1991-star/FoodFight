---
name: foodfighter-frontend-design-system
description: Build or review FoodFighter's Next.js/Tailwind design-system foundation using the approved brand palette, semantic tokens, per-component folders, globals.css governance, restrained Motion, accessible component states, and evidence-based verification.
---

# FoodFighter Frontend Design System Skill

## Use this skill when

- creating or reviewing FoodFighter design-system primitives,
- editing `globals.css`,
- defining tokens,
- implementing shared Button/Input/Card/Form components,
- establishing Motion presets/providers,
- reviewing component ownership,
- preparing the frontend-auth foundation.

Do not use this skill to implement feature business logic.

## Project root

```text
C:\devnest 101\FoodFight\frontend
```

## Canonical context

Read:

```text
AGENTS.md
docs/Srs-Footfight.md
docs/FRONTEND.md
docs/FRONTEND_FILE_MAP.md
docs/FRONTEND_DESIGN_SYSTEM_MASTER.md
docs/COLOR_SYSTEM.md
docs/MOTION_SYSTEM.md
docs/COMPONENT_CATALOG.md
```

## Branch gate

Expected branch:

```text
feature/frontend-design-system
```

Check before creating:

```powershell
git branch --show-current
git status --short
git branch --list feature/frontend-design-system
```

Use `git switch -c` only when the branch is absent.

## Workflow

### 1. Audit

Inspect:
- package.json,
- pnpm workspace/lock ownership,
- Next version,
- React version,
- Tailwind version,
- PostCSS configuration,
- existing `globals.css`,
- existing components,
- existing CSS variables/tokens,
- existing icon library,
- existing Motion dependency,
- current Git diff.

### 2. Plan

State:
- objective,
- why,
- scope,
- exclusions,
- risks,
- file paths to change,
- verification.

### 3. Preserve source palette

Canonical colors:

```text
Pastel Petal      #FFC6D9
Soft Apricot      #FFE1C6
Vanilla Custard   #FFF7AE
Blackberry Cream  #48284A
Dusty Mauve       #916C80
```

Map source colors into semantic tokens.

Never scatter raw hex values through feature components.

### 4. globals.css

Required:

```text
src/app/globals.css
```

Keep only:
- Tailwind/base imports,
- reset/base rules,
- html/body,
- typography inheritance,
- global color defaults,
- focus baseline,
- reduced motion,
- token/theme wiring.

No feature selectors.

### 5. Component ownership

Generic primitive:

```text
src/components/ui/<component>/
```

Layout:

```text
src/components/layout/<component>/
```

Provider:

```text
src/components/providers/<provider>/
```

Domain UI:

```text
src/features/<feature>/components/
```

### 6. Component API

Prefer explicit variants.

Avoid boolean-prop proliferation.

Use composition where it makes the interface simpler, not more abstract.

### 7. Motion

Use `motion` only where justified.

Centralize:
- transitions,
- variants,
- provider/configuration.

Respect reduced motion.

Frequent actions receive little/no motion.

### 8. Accessibility

Check:
- semantic HTML,
- focus-visible,
- keyboard access,
- labels,
- invalid/error relationship,
- accessible names,
- contrast,
- disabled/loading,
- status not only color,
- reduced motion.

### 9. Performance

Avoid:
- unnecessary `"use client"`,
- turning all primitives into Motion components,
- heavy animation,
- duplicate icon libraries,
- large new UI frameworks,
- premature abstractions.

### 10. Verify before completion

Run applicable repository checks.

Minimum expected equivalents:

```powershell
pnpm exec tsc --noEmit
pnpm lint
pnpm build
```

Run tests when available.

Then:

```powershell
git status --short
git diff --stat
git diff
```

Do not claim PASS without command output.

## Skill influences

This FoodFighter-local skill adapts selected ideas from:
- frontend-design,
- tailwind-design-system,
- web-design-guidelines,
- vercel-composition-patterns,
- vercel-react-best-practices,
- next-best-practices,
- review-animations,
- find-animation-opportunities.

FoodFighter requirements and owner-approved decisions take precedence over those external skills.
