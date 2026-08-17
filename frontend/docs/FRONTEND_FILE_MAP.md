# FoodFighter Frontend File Map

> Purpose: tell humans and AI agents exactly where each kind of frontend file belongs.

Repository root:

```text
C:\devnest 101\FoodFight
```

Frontend root:

```text
C:\devnest 101\FoodFight\frontend
```

## 1. Existing/canonical documentation

| Purpose | Repository path | Windows path |
|---|---|---|
| Canonical frontend AI rules | `AGENTS.md` | `C:\devnest 101\FoodFight\frontend\AGENTS.md` |
| Claude adapter | `CLAUDE.md` | `C:\devnest 101\FoodFight\frontend\CLAUDE.md` |
| Product SRS | `docs/Srs-Footfight.md` | `C:\devnest 101\FoodFight\frontend\docs\Srs-Footfight.md` |
| High-level frontend spec | `docs/FRONTEND.md` | `C:\devnest 101\FoodFight\frontend\docs\FRONTEND.md` |
| File ownership map | `docs/FRONTEND_FILE_MAP.md` | `C:\devnest 101\FoodFight\frontend\docs\FRONTEND_FILE_MAP.md` |
| Design-system master spec | `docs/FRONTEND_DESIGN_SYSTEM_MASTER.md` | `C:\devnest 101\FoodFight\frontend\docs\FRONTEND_DESIGN_SYSTEM_MASTER.md` |
| Color system | `docs/COLOR_SYSTEM.md` | `C:\devnest 101\FoodFight\frontend\docs\COLOR_SYSTEM.md` |
| Motion system | `docs/MOTION_SYSTEM.md` | `C:\devnest 101\FoodFight\frontend\docs\MOTION_SYSTEM.md` |
| Component catalog | `docs/COMPONENT_CATALOG.md` | `C:\devnest 101\FoodFight\frontend\docs\COMPONENT_CATALOG.md` |
| External/local skills guide | `docs/FRONTEND_SKILLS.md` | `C:\devnest 101\FoodFight\frontend\docs\FRONTEND_SKILLS.md` |
| Design-system agent playbook | `agents/frontend-design-system-agent.md` | `C:\devnest 101\FoodFight\frontend\agents\frontend-design-system-agent.md` |
| Project-local skill source | `skills/foodfighter-frontend-design-system/SKILL.md` | `C:\devnest 101\FoodFight\frontend\skills\foodfighter-frontend-design-system\SKILL.md` |

## 2. Runtime/style files

| Purpose | Target repository path |
|---|---|
| Global CSS entry point | `src/app/globals.css` |
| Root Next.js layout | `src/app/layout.tsx` |
| Design tokens | `src/styles/tokens.css` |
| Shared CSS utilities only if needed | `src/styles/utilities.css` |
| Class composition helper | `src/lib/utils/cn.ts` |
| Motion transition presets | `src/lib/motion/transitions.ts` |
| Motion reusable variants | `src/lib/motion/variants.ts` |
| Motion public exports | `src/lib/motion/index.ts` |
| Motion provider implementation | `src/components/providers/motion-provider/motion-provider.tsx` |
| Motion provider export | `src/components/providers/motion-provider/index.ts` |

Do not create files blindly. Inspect existing equivalents first and preserve established paths when they already satisfy the same responsibility.

## 3. Generic UI component locations

Each primitive gets its own folder:

```text
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
```

Preferred minimal folder shape:

```text
<component>/
├── <component>.tsx
└── index.ts
```

Add tests/types only when they add value:

```text
<component>/
├── <component>.tsx
├── <component>.test.tsx
├── <component>.types.ts
└── index.ts
```

## 4. Layout locations

```text
src/components/layout/page-container/
src/components/layout/auth-layout/
```

## 5. Feature locations

```text
src/features/auth/
src/features/food-profile/
src/features/room/
src/features/meal-preference/
src/features/recommendations/
src/features/voting/
src/features/restaurants/
src/features/history/
```

Create only the feature folders required by active work.

### Auth example

```text
src/features/auth/
├── components/
│  ├── login-form/
│  ├── register-form/
│  ├── social-login-buttons/
│  └── two-factor-form/
├── schemas/
├── services/
├── types/
└── hooks/
```

## 6. App Router locations

Expected auth routes when auth implementation begins:

```text
src/app/(auth)/login/page.tsx
src/app/(auth)/register/page.tsx
src/app/(auth)/verify-2fa/page.tsx
src/app/(auth)/layout.tsx
```

Route files should compose feature components rather than become large reusable component files.

## 7. What must not happen

Do not place:

```text
LoginForm -> components/ui
ReadyMemberCard -> components/ui
RestaurantCard -> components/ui
API client -> components
design tokens -> random feature files
global business CSS -> globals.css
```

## 8. File creation gate

Before creating any path from this map:

1. search for an equivalent existing file,
2. inspect import conventions,
3. inspect Tailwind/Next version,
4. avoid duplicate responsibility,
5. create only the minimum files needed for the active task.
