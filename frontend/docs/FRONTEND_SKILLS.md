# FoodFighter Frontend — Skills Strategy

## 1. Purpose

Use external agent skills as reference/augmentation, not as a replacement for FoodFighter requirements.

Priority remains:

```text
SRS
→ owner-approved decisions
→ AGENTS.md
→ FoodFighter local skill
→ external skills
```

## 2. Selected skills.sh references

The project-local skill adapts ideas from the following public skills.

### A. frontend-design — anthropics/skills

Use for:
- intentional aesthetic direction,
- typography hierarchy,
- CSS-variable color theming,
- deliberate motion,
- avoiding generic AI-generated visual defaults.

Install command:

```powershell
npx skills add https://github.com/anthropics/skills --skill frontend-design
```

FoodFighter adaptation:
- aesthetic direction is constrained by the owner-approved palette;
- do not invent a new palette;
- motion must also follow `docs/MOTION_SYSTEM.md`.

### B. tailwind-design-system — wshobson/agents

Use for:
- token hierarchy,
- Tailwind component variants,
- responsive/accessibility patterns,
- CSS-first design-system concepts when Tailwind v4 is actually installed.

Install command:

```powershell
npx skills add https://github.com/wshobson/agents --skill tailwind-design-system
```

FoodFighter adaptation:
- audit Tailwind version first;
- no Tailwind major migration in this task;
- use source → semantic → component token hierarchy.

### C. web-design-guidelines — vercel-labs/agent-skills

Use for:
- UI/accessibility review,
- spacing/interaction review,
- terse audit findings.

Install command:

```powershell
npx skills add https://github.com/vercel-labs/agent-skills --skill web-design-guidelines
```

FoodFighter adaptation:
- use as a review gate after implementation;
- external rules do not override SRS/product behavior.

### D. vercel-composition-patterns — vercel-labs/agent-skills

Use for:
- reusable component APIs,
- avoiding boolean prop proliferation,
- compound component/context patterns when justified.

Install command:

```powershell
npx skills add https://github.com/vercel-labs/agent-skills --skill vercel-composition-patterns
```

FoodFighter adaptation:
- keep primitives small;
- prefer explicit `variant`/`size` APIs;
- do not over-engineer compound components.

### E. vercel-react-best-practices — vercel-labs/agent-skills

Use for:
- React/Next.js performance review,
- bundle and rendering concerns,
- client/server performance discipline.

Install command:

```powershell
npx skills add https://github.com/vercel-labs/agent-skills --skill vercel-react-best-practices
```

FoodFighter adaptation:
- especially useful for Motion/client-component boundaries;
- performance optimization must not make the design-system API harder to maintain without evidence.

### F. next-best-practices — vercel-labs/openreview

Use for:
- App Router file conventions,
- React Server Component boundaries,
- Next.js-specific implementation review.

Install command:

```powershell
npx skills add https://github.com/vercel-labs/openreview --skill next-best-practices
```

FoodFighter adaptation:
- do not add `"use client"` by habit;
- routes compose features; route files should stay thin.

### G. review-animations — emilkowalski/skills

Use for:
- reviewing Motion implementation,
- justification/frequency/performance/a11y of animations.

Install command:

```powershell
npx skills add https://github.com/emilkowalski/skills --skill review-animations
```

FoodFighter adaptation:
- use after motion code exists;
- default to restraint;
- repeated interactions should be faster/quieter than rare celebratory transitions.

### H. find-animation-opportunities — emilkowalski/skills

Use selectively for:
- identifying a small number of high-value motion opportunities.

Install command:

```powershell
npx skills add https://github.com/emilkowalski/skills --skill find-animation-opportunities
```

FoodFighter adaptation:
- reporting only; do not let it expand task scope;
- cap suggestions and implement only approved, meaningful motion.

## 3. Do not install everything blindly

External skills are third-party procedural instructions.

Before installing:
1. inspect the skill source/repository,
2. confirm it is needed for the current task,
3. avoid installing overlapping skills that fight each other,
4. keep FoodFighter's local rules canonical.

For the current Design System V1, the smallest high-value set is:

```text
frontend-design
tailwind-design-system
vercel-composition-patterns
web-design-guidelines
review-animations
```

Add `next-best-practices` and `vercel-react-best-practices` when the implementation touches meaningful Next/React architecture/performance decisions.

## 4. Local skill

Canonical FoodFighter skill source:

```text
skills/foodfighter-frontend-design-system/SKILL.md
```

This local skill merges the useful principles into one FoodFighter-specific workflow so every agent does not need to interpret seven external skills independently.

## 5. Skill usage by phase

```text
AUDIT
  next-best-practices
  tailwind-design-system

PLAN
  frontend-design
  vercel-composition-patterns

IMPLEMENT
  FoodFighter local skill
  tailwind-design-system
  vercel-react-best-practices as needed

MOTION REVIEW
  review-animations

FINAL UI REVIEW
  web-design-guidelines

VERIFY
  repository typecheck/lint/build/tests + Git diff evidence
```

## 6. External source registry

The selected skills came from `skills.sh` and their upstream repositories.
Keep installation commands here instead of copying their full skill text into FoodFighter.

The local skill is an adaptation, not a verbatim copy.
