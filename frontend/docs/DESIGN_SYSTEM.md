# FoodFighter Design System — Visual System V2

> **Canonical source of truth** for brand palette, typography, two-surface architecture (Solid Tactile + Liquid Glass), elevation hierarchy, illuminated rims, atmospheric gradients, UI primitives, and motion foundations.

---

## 1. Visual North Star: Warm Social Food Game (Visual System V2)

FoodFighter is an energetic, social meal decision platform designed around group gathering, friendly competition, and appetizing culinary discovery.

```text
FOODFIGHTER VISUAL SYSTEM V2
  = ORIGINAL FOODFIGHTER BRAND PALETTE
  + WARM ATMOSPHERIC COLOR FIELDS
  + SOLID TACTILE SURFACES
  + STRATEGIC LIQUID GLASS
  + ILLUMINATED / REFLECTIVE RIMS
  + CLEAR PERSISTENT INTERACTION STATES
  + PURPOSEFUL PHYSICAL MOTION
  + PURPOSE-BUILT FOOD / SOCIAL IMAGERY
```

### Core Desired Qualities:
- **Warm & Appetizing**: Natural, food-forward warmth grounded in our Rice canvas and Chili accents.
- **Tactile & Dimensional**: Physical, layered surfaces with downward-biased depth and responsive lift/compression.
- **Social & Dynamic**: Liquid Glass navigation chrome and floating menus that feel modern and seamless.
- **Crisp & Trustworthy**: Clear contrast, transparent bill splitting, accessible typography, and rock-solid form inputs.

### Explicitly Prohibited Aesthetic Patterns:
- ❌ **NO PURPLE / NO VIOLET / NO GENERIC AI GRADIENTS**: The brand palette is frozen. Never introduce purple tints or cyberpunk glows.
- ❌ **NO GLASS EVERYWHERE**: Liquid Glass is strategic and reserved for chrome and floating overlays; it must never replace normal solid content cards.
- ❌ **NO SHADOW SOUP**: Do not apply drop shadows to arbitrary layout wrappers or nested containers.
- ❌ **NO HEAVY NEUMORPHISM / KAWAII**: Surfaces must remain clean, modern, and accessible.

---

## 2. Approved Brand Palette (Frozen Foundation)

The canonical FoodFighter palette is strictly frozen and defined in `frontend/src/styles/tokens.css` and `frontend/src/app/globals.css`:

| Token Name | Hex Code | Semantic Role | Contrast / WCAG Compliance |
|---|---|---|---|
| **Ink** | `#211D19` | Primary text, deep headings, dark boundaries | ~14.8:1 on Rice background (AAA) |
| **Brand Chili** | `#D84A32` | Primary brand accent, progress bars, active journey | Brand identity |
| **Accessible Primary** | `#D0432B` | Interactive buttons, active links, primary CTA | AA compliant (4.5:1+) on white/rice |
| **Interactive Hover** | `#B93A28` | Hover state for primary buttons and interactive controls | Darker contrast shift |
| **Interactive Active** | `#9F2F20` | Pressed / active state for interactive controls | Deep active feedback |
| **Saffron / Energy** | `#F2AF32` | Energy, highlights, informational notices, warm alerts | Warm highlight |
| **Herb / Fresh** | `#68784D` | Selected preferences, checked states, verified tags | Fresh confirmed balance |
| **Rice / Canvas** | `#F4EEE3` | Global page background canvas | Warm neutral backdrop |
| **Surface White** | `#FFFFFF` | Primary card surfaces, elevated containers, inputs | Crisp readable ground |
| **Surface Subtle** | `#FAF6EE` | Light warm highlight surface (avoids muddy invert) | Elevated sub-surface |
| **Surface Muted** | `#EBE1D2` | Inset container wells, recessed display panels | Recessed container |
| **Border Neutral** | `#C8BAA8` | Standard card borders, separators, input borders | Warm neutral definition (~1.7:1) |
| **Border Subtle** | `#DDD2C2` | Secondary dividers, card sub-lines | Subtle definition |
| **Border Strong** | `#9E8C77` | Unselected indicators, focused neutral boundaries | Crisp indicator boundary |

> **Hard Rule**: No arbitrary brand colors, purple gradients, or blue-gray enterprise tones. All atmospheric gradients and glass tints MUST derive strictly from this canonical palette.

### Status Semantic Tokens:
- **Success / Confirmed**: bg `#E8F5E9`, border `#A5D6A7`, text `#1B5E20`, icon `#2E7D32`
- **Warning**: bg `#FFF8E1`, border `#FFE082`, text `#7F4E00`, icon `#B26A00`
- **Danger / Destructive**: bg `#FFEBEE`, border `#EF9A9A`, text `#8E1F1F`, icon `#B83226`
- **Info (Warm Saffron-Ember)**: bg `#F7EFE1`, border `#E0CFA9`, text `#5A3E1B`, icon `#BC6C25`

---

## 3. Two-Surface Architecture

FoodFighter intentionally employs **two complementary surface families**. Each serves a distinct visual and structural purpose:

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        FOODFIGHTER SURFACE ARCHITECTURE                │
├───────────────────────────────────┬────────────────────────────────────┤
│         A. SOLID TACTILE          │          B. LIQUID GLASS           │
├───────────────────────────────────┼────────────────────────────────────┤
│ • Form sections & input fields    │ • Desktop top navigation capsule   │
│ • Content & detail cards          │ • Mobile bottom navigation bar     │
│ • Bill splitting & financial data │ • Profile & account dropdown menus │
│ • Settings & summary lists        │ • Floating map action clusters     │
│ • Dense utility tables            │ • Atmospheric floating controls    │
├───────────────────────────────────┼────────────────────────────────────┤
│ Surface: Pure White (#FFFFFF)     │ Surface: Translucent White/Rice    │
│ Depth: Downward-biased shadow     │ Effect: Backdrop blur + rim light  │
│ Border: Warm Neutral (#C8BAA8)    │ Border: White translucent rim      │
│ Motion: Lift on hover (if button) │ Motion: Liquid Reveal unfolding    │
└───────────────────────────────────┴────────────────────────────────────┘
```

> **Critical Rule**: Global glass vocabulary does NOT mean glass everywhere. Never render standard form cards, data tables, or financial bills in translucent glass.

---

## 4. Semantic Elevation Hierarchy

Surfaces participate in a strict 3-tier elevation model:

### Level 1 — Static / Utility (`--shadow-xs`)
- **Token**: `0 2px 4px rgba(33, 29, 25, 0.06), 0 1px 2px rgba(33, 29, 25, 0.04)`
- **Role**: Normal content cards, form sections, summary panels, setting groups.
- **Behavior**: Static depth; does **NOT** animate or move on hover.

### Level 2 — Tactile / Interactive (`--shadow-sm` → `--shadow-md` → `--shadow-xs`)
- **Tokens**:
  - Resting: `0 4px 8px -1px rgba(33, 29, 25, 0.08), 0 2px 4px -1px rgba(33, 29, 25, 0.04)`
  - Hover: `0 8px 16px -2px rgba(33, 29, 25, 0.10), 0 3px 6px -2px rgba(33, 29, 25, 0.05)`
  - Active: `0 2px 4px rgba(33, 29, 25, 0.06), 0 1px 2px rgba(33, 29, 25, 0.04)`
- **Role**: Primary/secondary buttons, icon buttons, selectable cards, floating navigation capsules.
- **Behavior**: Hover lifts (`-translate-y-0.5` + shadow increase); press compresses (`active:scale-[0.98]` or `active:scale-[0.99]` + shadow reduction).

### Level 3 — Feature / Hero (`--shadow-md` → `--shadow-lg`)
- **Token**: `0 8px 16px -2px rgba(33, 29, 25, 0.10), 0 3px 6px -2px rgba(33, 29, 25, 0.05)`
- **Role**: Finalized Winner Spotlight, Active Voting Arena, Auth card container, Bill Total hero.
- **Behavior**: Strongest dimensional card depth; static unless explicitly wrapped by an interactive control.

### Overlay Level (`--shadow-xl`)
- **Token**: `0 20px 30px -5px rgba(33, 29, 25, 0.14), 0 8px 10px -6px rgba(33, 29, 25, 0.06)`
- **Role**: Dropdown menus, modal dialogs, bottom sheets, popovers.

### Inset / Recessed (`No drop shadow`)
- **Role**: Counter wells, secondary code display boxes, sub-card wells (`bg-surface-muted border border-border`).

---

## 5. Liquid Glass Material Contract *(Approved Design Specification)*

Liquid Glass is specified as a 3-tier material system derived strictly from the canonical palette:

```text
┌───────────────────┬───────────────────────────────┬──────────────────────────────────────────┐
│ Glass Tier        │ Recipe / Visual Treatment     │ Intended Surface Role                    │
├───────────────────┼───────────────────────────────┼──────────────────────────────────────────┤
│ Glass Soft        │ bg-surface/75 backdrop-blur-sm│ Passive badge overlays, tag chips,       │
│                   │ border border-white/60        │ category overlays on carousel cards      │
├───────────────────┼───────────────────────────────┼──────────────────────────────────────────┤
│ Glass Interactive │ bg-surface/85 backdrop-blur-md│ Desktop top nav capsule, mobile bottom   │
│                   │ border border-white/80        │ nav bar, floating map controls           │
├───────────────────┼───────────────────────────────┼──────────────────────────────────────────┤
│ Glass Floating    │ bg-surface/92 backdrop-blur-xl│ AccountDropdown menu, popovers,          │
│                   │ border border-white/90        │ floating modal sheets, language popover  │
└───────────────────┴───────────────────────────────┴──────────────────────────────────────────┘
```

### Critical Glass Guardrails:
1. **NO NESTED GLASS**: Never place a glass button inside a glass capsule inside a glass header. Use solid or inset controls inside glass containers.
2. **NO FULL-PAGE BLUR**: Never apply backdrop-blur across entire viewports or page layouts.
3. **GRACEFUL FALLBACK**: If `backdrop-filter` is unsupported, render solid white `bg-surface border-border shadow-md` with 100% feature parity.

---

## 6. Illuminated Rim Lighting Contract

Important floating glass chrome and hero cards feature subtle top/edge illumination:

- **Neutral Rim (Default)**:
  `box-shadow: inset 0 1px 1.5px 0 rgba(255, 255, 255, 0.85), 0 4px 8px -1px rgba(33, 29, 25, 0.08);`
- **Confirmed / Selected Rim (Herb)**:
  `box-shadow: inset 0 1px 2px 0 rgba(104, 120, 77, 0.35), 0 4px 8px -1px rgba(33, 29, 25, 0.08);`
- **Action / Primary Rim (Chili)**:
  `box-shadow: inset 0 1px 2px 0 rgba(216, 74, 50, 0.30), 0 4px 8px -1px rgba(33, 29, 25, 0.08);`
- **Info Rim (Saffron)**:
  `box-shadow: inset 0 1px 2px 0 rgba(242, 175, 50, 0.30), 0 4px 8px -1px rgba(33, 29, 25, 0.08);`

> **Note**: Rims must remain subtle, material-focused reflections. Cyberpunk neon outlines or heavy blooms are strictly forbidden.

---

## 7. Warm Atmospheric Gradient Contract

Atmospheric gradients provide emotional brand warmth behind top headers and fade organically into the Rice canvas:

```text
Chili (#D84A32, 12% alpha) + Saffron (#F2AF32, 15% alpha) + Herb (#68784D, 6% alpha)
                  ↓ Smooth Organic Blend ↓
            Rice Canvas Background (#F4EEE3)
```

### Atmosphere Intensity Tiers:
- **Hero / Home (`HERO`)**: Strongest warmth (~450px vertical spread) behind greeting and mood discovery.
- **Feature (`FEATURE` - Room Create / Lobby / Game)**: Moderate warmth (~250px vertical spread) behind page headers.
- **Utility (`UTILITY` - Food Profile / Admin / Bills Detail)**: Subtle or pure Rice canvas (`0-5%` hint) for maximum focus.

---

## 8. Motion & Liquid Reveal Contract

Motion must remain **short, responsive, physical, and restrained**:

- **Timing Scales**:
  - Fast: `150ms` (hover, active compression, micro-interactions)
  - Normal: `250ms` (dropdowns, dialog enters, tab switches)
  - Slow: `400ms` (winner reveals, large layout shifts)
- **Easings**:
  - `--ease-standard`: `cubic-bezier(0.2, 0, 0, 1)`
  - `--ease-enter`: `cubic-bezier(0, 0, 0.2, 1)`
  - `--ease-exit`: `cubic-bezier(0.4, 0, 1, 1)`
- **Liquid Reveal (Floating Menus & Popovers)**:
  - Material unfolds from trigger: `transform-origin: top right`, `scale: 0.95 → 1.0`, `translateY: -4px → 0px`, `opacity: 0 → 1` over `180ms`.
  - **No spring physics libraries**: Pure GPU-accelerated CSS transitions.
  - **Reduced Motion**: Automatically disables spatial transforms and delivers immediate opacity transitions.

---

## 9. Implementation Roadmap & Status Tracking

```text
┌────────────────────────────────────────────────────────────────────────┐
│               VISUAL SYSTEM V2 IMPLEMENTATION ROADMAP                  │
├───────┬──────────────────────────────────────────┬─────────────────────┤
│ Step  │ Package / Milestone                      │ Status              │
├───────┼──────────────────────────────────────────┼─────────────────────┤
│ 1     │ Foundation Docs Contract Sync            │ ✅ IN PROGRESS (001)│
│ 2     │ Package A: Global Tokens & Atmosphere    │ ⏳ APPROVED SPEC    │
│ 3     │ Package B: GlassSurface & Atmosphere UI  │ ⏳ APPROVED SPEC    │
│ 4     │ Package C: Navigation & Liquid Reveal    │ ⏳ APPROVED SPEC    │
│ 5     │ Global Runtime Regression Checkpoint     │ ⏳ UPCOMING         │
│ 6     │ As-Built Docs Sync                       │ ⏳ UPCOMING         │
│ 7     │ Home: Asset Planning & Generation        │ ⏳ UPCOMING         │
│ 8     │ Create Room: Feature-Local Polish        │ ⏳ UPCOMING         │
└───────┴──────────────────────────────────────────┴─────────────────────┘
```

> **As-Spec vs As-Built Rule**: This document represents the **Approved Design Contract**. Features in Steps 2–8 are scheduled for bounded implementation in subsequent packages. Do NOT claim components exist in application code until implemented and verified.
