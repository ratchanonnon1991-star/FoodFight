# FoodFighter Design System

> Canonical source for **brand palette, typography, visual tokens, UI primitives, and design foundations**.

## 1. Design Direction: Warm Social Food Game

FoodFighter is a **social meal decision platform** designed around friendly competition, social gathering, and appetizing food presentation.

**Core Brand Pillars**:
- **Food & Flavor**: Appetizing, warm, tactile, food-forward.
- **Social Gathering**: Welcoming, energetic, friendly, engaging.
- **Game & Payoff**: Exciting vote reveals, winner celebrations, playful yet clear.
- **Trust & Clarity**: Transparent bill splitting, clear navigation, accessible contrast.

**Avoid**:
- Cold generic dashboards (grey/blue tech enterprise feel).
- Pale pastel washes or overly cute/kawaii aesthetics.
- Dating-app card stacks or dark-mode cyber themes.
- Generic AI purple gradients.

---

## 2. Approved Brand Palette

The production palette is **stable** and defined via semantic tokens in `src/styles/tokens.css` and `globals.css`:

| Token | Hex | Role | Contrast / Notes |
|---|---|---|---|
| **Ink** | `#211D19` | Primary text, deep headings, high-contrast borders | ~14.8:1 on Rice background |
| **Brand Chili** | `#D84A32` | Primary brand accent, hero badges, vibrant highlights | Brand identification |
| **Accessible Primary** | `#D0432B` | Interactive buttons, active links, primary CTA | AA compliant (4.5:1+) on white/rice |
| **Interactive Hover** | `#B93A28` | Hover state for primary buttons and interactive controls | Darker contrast shift |
| **Interactive Active** | `#9F2F20` | Pressed / active state for interactive controls | Deep active feedback |
| **Saffron / Energy** | `#F2AF32` | Warm secondary accent, highlights, festive callouts | Warm energy |
| **Herb / Fresh** | `#68784D` | Fresh accent, verified badges, supportive nature tone | Fresh balance |
| **Rice / Canvas** | `#F4EEE3` | Page background, warm canvas | Softer than pure white |
| **Surface White** | `#FFFFFF` | Primary card surfaces, elevated containers, inputs | Crisp readable background |
| **Surface Subtle** | `#FAF7F2` | Secondary cards, table headers, inactive tabs | Warm tinted neutral |
| **Border Neutral** | `#E6DEC8` | Standard card borders, separators, input borders | Warm neutral definition |
| **Warm Earth** | `#BC6C25` | Supporting earth tone (compatibility / accents) | Secondary warm support |

> **Legacy Alias Notice**: Historical tokens (`Pastel Petal`, `Soft Apricot`, `Vanilla Custard`, `Blackberry Cream`, `Dusty Mauve`) exist only as legacy CSS aliases for backwards compatibility. All new production components must strictly use the current semantic tokens above.

### Semantic Token Mapping (`src/styles/tokens.css`):
- `var(--color-brand-primary)`: `#D84A32` (Interactive: `#D0432B`, Hover: `#B93A28`, Active: `#9F2F20`)
- `var(--color-brand-secondary)`: `#68784D`
- `var(--color-accent-saffron)`: `#F2AF32`
- `var(--color-accent-herb)`: `#68784D`
- `var(--color-background)`: `#F4EEE3`
- `var(--color-surface)`: `#FFFFFF`
- `var(--color-surface-subtle)`: `#FAF7F2`
- `var(--color-text-primary)`: `#211D19`
- `var(--color-text-secondary)`: `#5C554E`
- `var(--color-text-muted)`: `#8C827A`
- `var(--color-border-default)`: `#E6DEC8`
- `var(--color-border-subtle)`: `#EFE9DC`
- `var(--color-focus-ring)`: `#D84A32`

### Status Tokens (WCAG AA/AAA Verified):
- **Success**: bg `#E8F5E9`, border `#A5D6A7`, text `#1B5E20`, icon `#2E7D32`
- **Warning**: bg `#FFF8E1`, border `#FFE082`, text `#7F4E00`, icon `#B26A00`
- **Danger**: bg `#FFEBEE`, border `#EF9A9A`, text `#8E1F1F`, icon `#C62828`
- **Info**: bg `#E3F2FD`, border `#90CAF9`, text `#0D47A1`, icon `#1565C0`

---

## 3. Typography System

- **Primary Latin/UI Font**: `Poppins` (Weights: `400`, `500`, `600`, `700`) via `next/font/google`
- **Thai Glyph Font**: `Noto Sans Thai` (Weights: `400`, `500`, `600`, `700`) via `next/font/google`
- **Combined Variable**: `--font-sans` configured in `globals.css` `@theme`.

| Scale | Class / Size | Weight | Role |
|---|---|---|---|
| **Display** | `text-3xl sm:text-4xl` | Bold (`700`) | Hero titles, room code displays |
| **Heading 1** | `text-2xl sm:text-3xl` | Bold (`700`) | Screen main headings, section heroes |
| **Heading 2** | `text-xl sm:text-2xl` | Semibold (`600`) | Card titles, major step headers |
| **Heading 3** | `text-lg sm:text-xl` | Semibold (`600`) | Group labels, dialog titles |
| **Body** | `text-base` | Regular (`400`) | Primary reading copy, list items |
| **Body Small** | `text-sm` | Regular (`400`) | Secondary descriptions, helper text |
| **Label** | `text-xs uppercase tracking-wider` | Medium (`500`) / Semibold (`600`) | Form labels, table headings, tags |
| **Caption** | `text-xs` | Regular (`400`) | Timestamps, metadata, fine print |

---

## 4. Radii, Shadows & Borders

- **Border Radii**:
  - `radius-xs` (`4px`): Micro badges, tags.
  - `radius-sm` (`6px`): Small buttons, inline badges.
  - `radius-md` (`8px`): Standard buttons, input fields, dropdowns.
  - `radius-lg` (`12px`): Cards, modal dialogs, sheets.
  - `radius-xl` (`16px`): Hero containers, floating action panels.
  - `radius-full` (`9999px`): Avatars, pill badges, icon buttons.
- **Shadows** (Warm brand-tinted):
  - `shadow-xs`: `0 1px 2px rgba(33, 29, 25, 0.04)`
  - `shadow-sm`: `0 2px 4px rgba(33, 29, 25, 0.06)`
  - `shadow-md`: `0 4px 12px rgba(33, 29, 25, 0.08)`
  - `shadow-lg`: `0 8px 24px rgba(33, 29, 25, 0.12)`

---

## 5. Component Catalog (Generic UI Primitives)

Generic UI primitives reside under `src/components/ui/`:

| Component | Location | Variants / Capabilities |
|---|---|---|
| **Button** | `src/components/ui/Button.tsx` | `primary`, `secondary`, `outline`, `ghost`, `destructive` · `sm`, `md`, `lg`, `icon` · loading, disabled, left/right icons |
| **IconButton** | `src/components/ui/IconButton.tsx` | Required `aria-label`, minimum 44px touch target, loading spinner |
| **Input** | `src/components/ui/Input.tsx` | default, hover, focus, filled, disabled, invalid (`aria-invalid`) · left/right adornments · `sm`, `md`, `lg` |
| **PasswordInput** | `src/components/ui/PasswordInput.tsx` | Show/hide visibility toggle with Lucide Eye/EyeOff, accessible labels |
| **Label** | `src/components/ui/Label.tsx` | Associated `htmlFor`, required indicator, disabled styling |
| **Checkbox** | `src/components/ui/Checkbox.tsx` | Accessible SVG check, label & description, keyboard focus ring |
| **Card** | `src/components/ui/Card.tsx` | `default`, `subtle`, `elevated`, `outline` · Compound: CardHeader, CardTitle, CardDescription, CardContent, CardFooter |
| **Badge** | `src/components/ui/Badge.tsx` | `neutral`, `brand`, `brand-secondary`, `saffron`, `herb`, `success`, `warning`, `danger`, `info` · status dot |
| **Alert** | `src/components/ui/Alert.tsx` | `info`, `success`, `warning`, `error` · `role="alert"`, AlertTitle, AlertDescription |
| **Spinner** | `src/components/ui/Spinner.tsx` | `role="status"`, `sm`, `md`, `lg`, `xl` sizes, primary/secondary variants |
| **Separator** | `src/components/ui/Separator.tsx` | horizontal / vertical with optional center label |
| **FormField** | `src/components/ui/form-field/` | Compound module connecting FormLabel, FormDescription, FormError with `aria-describedby` and `aria-live="polite"` |

---

## 6. Motion System

Centralized under `src/lib/motion/`:
- `transitions.ts`: Standard durations (`durationFast: 150ms`, `durationNormal: 250ms`, `durationSlow: 350ms`), easings, and soft spring presets.
- `variants.ts`: `fadeIn`, `fadeUp`, `fadeDown`, `scaleIn`, `staggerContainer`, `staggerItem`.
- `MotionProvider`: Wraps root layout with `MotionConfig` using `reducedMotion="user"`.
- `globals.css`: Full `@media (prefers-reduced-motion: reduce)` fallback disabling non-essential transitions.

---

## 7. Brand Assets & Visual Identity

- **Official Brand Mark Abstraction**: Shared `BrandMark` component supporting variants:
  - `primary`: Full horizontal logo with icon and wordmark.
  - `stacked`: Vertical layout for splash and hero headers.
  - `icon`: Compact chili icon for navigation and mobile bars.
  - `app-icon`: Squircle framed icon for PWA / app launchers.
- **Favicon Status**: `src/app/favicon.ico` is currently preserved as a tracked asset pending final brand asset export.

---

## 8. Design Version Policy

1. **Foundations are Stable**: Core palette, typography, brand marks, and UI primitives are stable.
2. **Home is the Visual Benchmark**: The Landing/Home experience is **APPROVED / FROZEN** as the standard for visual tone.
3. **UX/UI Refinement Policy**: Remaining pages (Room, Food Fight, Bill, History, Admin) will be completed and refined by inheriting these global foundations without inventing separate design systems.
