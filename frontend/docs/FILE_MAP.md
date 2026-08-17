# FoodFighter Frontend File Map

> Purpose: Tell humans and AI agents exactly where each kind of frontend file belongs.

Frontend root: `C:\devnest 101\FoodFight\frontend`

## 1. Canonical Governance & Documentation

```text
AGENTS.md                 → Canonical AI developer instructions
CLAUDE.md                 → Claude entry point adapter
docs/Srs-Footfight.md     → Product SRS (source of truth)
docs/FRONTEND.md          → Core frontend architecture & mobile-first standard
docs/DESIGN_SYSTEM.md     → Design tokens, palette, typography & UI primitives catalog
docs/AUTH.md              → Authentication flow specification & boundaries
docs/FILE_MAP.md          → Path and ownership map
agents/frontend-agent.md  → Unified frontend agent playbook
skills/foodfighter-frontend/SKILL.md → Local frontend skill
```

## 2. Shared Frontend Foundation

```text
src/app/globals.css                   → Global resets, Tailwind v4 @theme, tokens, reduced motion
src/app/layout.tsx                    → Root layout (MotionProvider, Fonts)

src/styles/tokens.css                 → 3-tier CSS design tokens (palette, surfaces, borders, status)

src/lib/utils/cn.ts                   → Class merge utility (clsx + tailwind-merge)
src/lib/motion/                       → Centralized transitions, variants, springs

src/components/ui/<primitive>/        → Generic UI primitives (button, input, card, badge, alert, etc.)
src/components/layout/<layout>/       → Layout primitives (page-container, auth-layout)
src/components/providers/<provider>/  → Global providers (motion-provider)
```

## 3. Design System Reference (Internal Dev Only)

```text
src/app/design-system/page.tsx        → Internal reference route (/design-system)
src/features/design-system/components/→ Showcase components (color, typography, button, form, etc.)
```

## 4. Feature Modules

```text
src/features/auth/                    → Auth domain (components, services, schemas, constants, types)
src/features/food-profile/            → Food profile onboarding & preferences
src/features/room/                    → Room creation, joining, lobby
src/features/recommendations/         → AI menu recommendations
src/features/voting/                  → OK / Pass voting & tie-break
src/features/restaurants/             → Restaurant discovery & map
```

## 5. App Router Routes

```text
src/app/page.tsx                      → Product root entry placeholder
src/app/design-system/page.tsx        → Developer Design System reference

src/app/(auth)/register/page.tsx      → Registration screen
src/app/(auth)/verify-email/page.tsx  → Email OTP verification screen
src/app/(auth)/change-email/page.tsx  → Change email screen
src/app/(auth)/verification-success/page.tsx → Verification success screen
src/app/(auth)/login/page.tsx         → Login screen
src/app/(auth)/layout.tsx             → Auth route group layout (AuthFlowProvider)
```

## 6. Shared Config

```text
src/config/routes.ts                  → Centralized route constants
src/config/site-config.ts             → Application metadata
```

## 7. Forbidden Boundaries

```text
Feature components  -> src/components/ui/ (Must be under src/features/<feature>/)
Hardcoded backend URLs -> UI components (Must be under feature services)
Backend mutations   -> backend/** (Strictly prohibited in frontend tasks)
```
