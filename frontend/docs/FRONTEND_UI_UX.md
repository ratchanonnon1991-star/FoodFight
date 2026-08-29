# FoodFighter Frontend UI/UX Rules

> Canonical source for **visual tone, mobile-first standards, responsive breakpoints, accessibility, and area emotional character**.

## 1. Core Visual Direction: Warm Social Food Game

FoodFighter is designed to be **warm, food-forward, social, and energetic**.

### Emotional Character by Product Area

| Area | Route | Emotional Character & Tone |
|---|---|---|
| **Landing & Auth** | `/`, `/login`, `/register` | Clean, welcoming, warm, confident. |
| **Home Hub** | `/` (Authenticated) | **APPROVED / FROZEN Benchmark**. Warm brand hub, social activity cards. |
| **Room Lobby** | `/room/[id]` | Social anticipation, participant readiness, invite sharing. |
| **Meal Preference** | `/food-fight/[id]/preferences` | Tactile, food-forward category chips, dietary ease. |
| **Recommendations** | `/food-fight/[id]/recommendations` | Hero food moment, appetizing imagery, clear AI explanation. |
| **Voting** | `/food-fight/[id]/voting` | Friendly competitive energy, responsive OK/Pass actions. |
| **Final Result / Winner** | `/food-fight/[id]/result` | Celebration, payoff, menu announcement, restaurant discovery. |
| **Restaurant & Map** | `/food-fight/[id]/result` | Practical discovery, open hours, contact info, route navigation. |
| **History** | `/history` | Calm personal memory log, past dining sessions. |
| **Bills & Splitting** | `/bill/[id]` | Utility, precision, transparency, trust first. |
| **Profile** | `/profile` | Personal food identity, dietary profile settings. |
| **Admin Console** | `/admin/*` | Professional and restrained version of the same warm design system. |

---

## 2. Mobile-First Standards

- **Primary Reference Width**: `390px` (iPhone standard reference).
- **Core Viewport Breakpoints**:
  - `360px` — Compact Android (Ensure zero horizontal overflow)
  - `375px` — Small iOS (iPhone SE)
  - `390px / 393px` — Baseline standard iOS/Android
  - `430px` — Large mobile (Pro Max / Plus)
  - `768px` — Tablet / Split layouts
  - `1440px` — Desktop (Max-width bounded containers)
- **Viewport Height**: Always use `min-h-dvh` instead of `100vh` to prevent mobile browser URL bar clipping.
- **Touch Target Minimum**: Minimum interactive touch area must be at least `44x44px`.

---

## 3. Approved Production Palette & Semantic Usage

Components must style strictly using semantic CSS variables:

- **Ink**: `#211D19` (`var(--color-text-primary)`)
- **Brand Chili**: `#D84A32` (`var(--color-brand-primary)`)
- **Accessible Interactive Primary**: `#D0432B` (`var(--color-brand-primary-interactive)`)
- **Saffron / Energy**: `#F2AF32` (`var(--color-accent-saffron)`)
- **Herb / Fresh**: `#68784D` (`var(--color-accent-herb)`)
- **Rice / Canvas**: `#F4EEE3` (`var(--color-background)`)
- **Surface White**: `#FFFFFF` (`var(--color-surface)`)
- **Neutral Border**: `#E6DEC8` (`var(--color-border-default)`)

> **Prohibited**: Hardcoded hex color codes in feature JSX/Tailwind classes (e.g. `bg-[#D84A32]`). Use semantic classes (`bg-brand-primary`, `bg-background`, `text-text-primary`).

---

## 4. Accessibility & Interaction Standards

- **Semantic Elements**: Use native `<button>`, `<input>`, `<nav>`, `<header>`, `<main>`, and `<h1>`–`<h3>`.
- **Visible Focus Rings**: Ensure accessible focus ring (`focus-visible:ring-2 focus-visible:ring-brand-primary`) on all interactive controls.
- **Form Association**: Every form input must have a linked `<Label htmlFor="...">` or `aria-label`.
- **Dual Locale Testing**: Test both Thai and English copy to ensure natural wrapping without layout breaking.
- **Reduced Motion**: All animated transitions must respect `@media (prefers-reduced-motion: reduce)`.
