# FoodFighter — Frontend Design System V1 Start Prompt

You are the FoodFighter Senior Frontend Design-System Engineer.

Work directory:

```text
C:\devnest 101\FoodFight\frontend
```

Target branch:

```text
feature/frontend-design-system
```

## Objective

Audit and implement FoodFighter Frontend Design System V1 as a maintainable foundation for the upcoming `frontend-auth` task.

Do not jump directly into code.

## Required reading first

Read exactly in this order:

```text
AGENTS.md
docs/Srs-Footfight.md
docs/FRONTEND.md
docs/FRONTEND_FILE_MAP.md
docs/FRONTEND_DESIGN_SYSTEM_MASTER.md
docs/COLOR_SYSTEM.md
docs/MOTION_SYSTEM.md
docs/COMPONENT_CATALOG.md
docs/FRONTEND_SKILLS.md
agents/frontend-design-system-agent.md
skills/foodfighter-frontend-design-system/SKILL.md
```

Treat SRS and explicit owner decisions as higher priority than external skills.

## Git preflight

Run:

```powershell
cd "C:\devnest 101\FoodFight\frontend"
git branch --show-current
git status --short
git branch --list feature/frontend-design-system
git diff --stat
```

If the target branch does not exist:

```powershell
git switch -c feature/frontend-design-system
```

If it already exists:

```powershell
git switch feature/frontend-design-system
```

Never reset/delete unrelated work.

## Audit before implementation

Inspect:
- `package.json`,
- `pnpm-lock.yaml`,
- `pnpm-workspace.yaml`,
- root workspace relationship where relevant,
- `src/`,
- `src/app/globals.css`,
- `src/app/layout.tsx`,
- `postcss.config.*`,
- Tailwind config if present,
- existing UI components,
- existing styles/tokens,
- current dependencies,
- current tests/scripts.

Determine actual versions of:
- Next.js,
- React,
- TypeScript,
- Tailwind CSS.

Do not assume Tailwind v4.

## Approved brand palette

Use these exact source colors:

```text
Pastel Petal      #FFC6D9
Soft Apricot      #FFE1C6
Vanilla Custard   #FFF7AE
Blackberry Cream  #48284A
Dusty Mauve       #916C80
```

Required semantic direction:

```text
brand-primary   -> Blackberry Cream
brand-secondary -> Dusty Mauve
accent-petal    -> Pastel Petal
accent-apricot  -> Soft Apricot
accent-custard  -> Vanilla Custard
text-primary    -> Blackberry Cream
```

Do not scatter raw hex values into feature code.

Do not invent a replacement brand palette.

If extra neutral/status colors are required, keep them in a separate documented technical semantic layer and verify contrast.

## Approved frontend design-system dependencies

Audit before install.

If missing and actually needed:

```powershell
pnpm add motion class-variance-authority clsx tailwind-merge lucide-react
```

Do not install duplicates.

Do not introduce a large UI framework in this task.

## Skills.sh guidance

Read `docs/FRONTEND_SKILLS.md`.

If the environment supports Skills CLI and the needed skills are not already installed, selectively use the external skills listed there.

Do not install every available skill automatically.

The FoodFighter-local operating skill is:

```text
skills/foodfighter-frontend-design-system/SKILL.md
```

External skills are advisory. FoodFighter rules win on conflict.

## Required Design System V1 paths

Create only when an equivalent does not already exist.

```text
src/app/globals.css

src/styles/tokens.css
src/styles/utilities.css          # only if needed

src/lib/utils/cn.ts

src/lib/motion/transitions.ts
src/lib/motion/variants.ts
src/lib/motion/index.ts

src/components/providers/motion-provider/

src/components/ui/button/
src/components/ui/icon-button/
src/components/ui/input/
src/components/ui/password-input/
src/components/ui/label/
src/components/ui/checkbox/
src/components/ui/card/
src/components/ui/badge/
src/components/ui/alert/
src/components/ui/spinner/
src/components/ui/separator/
src/components/ui/form-field/

src/components/layout/page-container/
src/components/layout/auth-layout/
```

Every reusable UI primitive uses its own folder.

Do not create empty folders for future features.

## globals.css is mandatory

Audit the existing file first.

It should own only:
- Tailwind/global imports,
- base/reset,
- html/body defaults,
- typography inheritance,
- global background/text,
- focus-visible baseline,
- reduced-motion CSS fallback,
- token/theme wiring.

Do not add feature-specific selectors.

## Component rules

Generic UI belongs in:

```text
src/components/ui
```

FoodFighter feature components belong in:

```text
src/features/<feature>
```

Do not place LoginForm, ReadyMemberCard, MenuRecommendationCard, VoteOption, or RestaurantCard inside the generic design system.

Prefer variants/composition over boolean-prop proliferation.

## Motion rules

Use `motion`.

Centralize timing/variants.

Use motion only for:
- state,
- continuity,
- feedback,
- hierarchy,
- appearance/disappearance,
- meaningful progress.

Use CSS transitions for simple color/border/focus changes.

Respect `prefers-reduced-motion`.

Avoid decorative over-animation.

## V1 component scope

Required:
- Button
- IconButton
- Input
- PasswordInput
- Label
- Checkbox
- Card
- Badge
- Alert
- Spinner
- Separator
- FormField system
- PageContainer
- AuthLayout
- MotionProvider
- token foundation
- globals.css foundation

Defer unless already needed:
- Dialog
- Drawer
- Tooltip
- Tabs
- Select
- Toast
- Skeleton

Out of scope:
- actual auth forms/logic,
- Food Profile,
- Room/Lobby,
- AI recommendations,
- voting,
- restaurants/map,
- admin,
- OCR,
- Split Bill.

## Verification

Before claiming completion, run actual applicable commands, including project equivalents of:

```powershell
pnpm exec tsc --noEmit
pnpm lint
pnpm build
```

Run tests if present.

Manually verify relevant states:
- default,
- hover,
- focus-visible,
- active,
- disabled,
- loading,
- invalid,
- mobile,
- desktop,
- reduced motion.

Then inspect:

```powershell
git status --short
git diff --stat
git diff
```

Do not claim PASS for anything not executed.

## Commit

Only after verification succeeds and the diff contains only task-owned work:

```text
feat(frontend): establish design system foundation
```

One atomic commit.

## Final report

Return:

```text
STATUS:
BRANCH:
STARTING_GIT_STATE:

AUDIT_FINDINGS:
NEXT_VERSION:
REACT_VERSION:
TAILWIND_VERSION:

DEPENDENCIES_EXISTING:
DEPENDENCIES_ADDED:

FILES_CREATED:
FILES_MODIFIED:

GLOBALS_CSS:
COLOR_SYSTEM:
COMPONENTS:
MOTION_SYSTEM:
ACCESSIBILITY:
RESPONSIVE:

VERIFICATION:
- typecheck
- lint
- build
- tests
- manual UI
- git diff

RISKS_OPEN_ITEMS:

FINAL_GIT_STATE:
COMMIT_SHA:

NEXT_TASK:
frontend-auth
```

Begin with read-only audit and planning. Do not implement until the audit is complete.
