# FoodFighter Design System V1

## 1. Approved Brand Palette

The following exact source palette is approved for all FoodFighter frontend development:

| Token Name | Hex | Role | Contrast on Text |
|---|---|---|---|
| **Pastel Petal** | `#FFC6D9` | Selected state / Soft Accent | ~8.5:1 (AAA) with `#48284A` text |
| **Soft Apricot** | `#FFE1C6` | Warm Surface / Accent | ~10.0:1 (AAA) with `#48284A` text |
| **Vanilla Custard** | `#FFF7AE` | Highlight / Accent | ~11.4:1 (AAA) with `#48284A` text |
| **Blackberry Cream** | `#48284A` | Brand Primary / Primary Text | ~12.5:1 (AAA) with white text |
| **Dusty Mauve** | `#916C80` | Brand Secondary / Outline Focus | ~4.5:1 (AA) with white text |

### Semantic Token Mapping (`src/styles/tokens.css`):
- `var(--color-brand-primary)`: `#48284A` (Hover: `#3A1F3C`, Active: `#2D162E`)
- `var(--color-brand-secondary)`: `#916C80` (Hover: `#7E5B6E`, Active: `#6C4B5D`)
- `var(--color-accent-petal)`: `#FFC6D9`
- `var(--color-accent-apricot)`: `#FFE1C6`
- `var(--color-accent-custard)`: `#FFF7AE`
- `var(--color-background)`: `#FAF8F5`
- `var(--color-surface)`: `#FFFFFF`
- `var(--color-surface-subtle)`: `#F5F0EB`
- `var(--color-text-primary)`: `#48284A`
- `var(--color-text-secondary)`: `#7A6672`
- `var(--color-text-muted)`: `#9E8C96`
- `var(--color-focus-ring)`: `#916C80`

### Status Tokens (Verified AAA/AA Contrast):
- **Success**: bg `#D1F2D9`, border `#8CE0A2`, text `#1B5E20`, icon `#2E7D32`
- **Warning**: bg `#FFF4CC`, border `#FFE082`, text `#7F4E00`, icon `#B26A00`
- **Danger**: bg `#FCE4E4`, border `#F5A8A8`, text `#8E1F1F`, icon `#C62828`
- **Info**: bg `#E1F0FA`, border `#9FD0F5`, text `#0D47A1`, icon `#1565C0`

---

## 2. Typography System

- **Primary Latin/UI Font**: `Poppins` (Weights: `400`, `500`, `600`, `700`) via `next/font/google`
- **Thai Glyph Font**: `Noto Sans Thai` (Weights: `400`, `500`, `600`, `700`) via `next/font/google`
- **Reference Note**: The font selection is an implementation choice based on visual similarity to the owner-provided UI reference; the exact original reference typeface was not technically identifiable from the image alone.
- **Font Variables**: `--font-poppins`, `--font-noto-thai`, combined into `--font-sans` in `globals.css` `@theme`.

| Scale | Class / Size | Weight | Role |
|---|---|---|---|
| **Display** | `text-3xl sm:text-4xl` | Bold (`700`) | Hero headlines (`Create your account`) |
| **Heading 1** | `text-2xl sm:text-3xl` | Bold (`700`) | Screen titles (`Verify your email`) |
| **Heading 2** | `text-xl sm:text-2xl` | Semibold (`600`) | Section titles (`Welcome back`) |
| **Heading 3** | `text-lg sm:text-xl` | Semibold (`600`) | Card / Subtitles (`Enter 6-digit OTP`) |
| **Body** | `text-base` | Regular (`400`) | Primary readable content |
| **Body Small** | `text-sm` | Regular (`400`) | Helper text (`At least 8 characters`) |
| **Label** | `text-xs uppercase tracking-wider` | Medium (`500`) | Form field labels (`Email`, `Password`) |
| **Caption** | `text-xs` | Regular (`400`) | Timestamps, metadata |

---

## 3. Radii, Shadows & Borders

- **Border Radii**:
  - `radius-xs` (`4px`), `radius-sm` (`6px`), `radius-md` (`8px`), `radius-lg` (`12px`), `radius-xl` (`16px`).
- **Shadows** (Soft brand-tinted):
  - `shadow-xs`: `0 1px 2px rgba(72, 40, 74, 0.05)`
  - `shadow-sm`: `0 2px 4px rgba(72, 40, 74, 0.06)`
  - `shadow-md`: `0 4px 12px rgba(72, 40, 74, 0.08)`
  - `shadow-lg`: `0 8px 24px rgba(72, 40, 74, 0.12)`

---

## 4. Component Catalog (Generic UI Primitives)

Generic UI primitives live directly under `src/components/ui/` (with `form-field/` as a cohesive compound module):

| Component | Location | Variants / Capabilities |
|---|---|---|
| **Button** | `src/components/ui/Button.tsx` | primary, secondary, outline, ghost, destructive · sm, md, lg, icon · loading, disabled, left/right icons |
| **IconButton** | `src/components/ui/IconButton.tsx` | Required `aria-label`, accessible touch target, loading spinner, variants |
| **Input** | `src/components/ui/Input.tsx` | default, hover, focus, filled, disabled, invalid (`aria-invalid`) · left/right adornments · sm, md, lg |
| **PasswordInput** | `src/components/ui/PasswordInput.tsx` | Show/hide visibility toggle with Lucide Eye/EyeOff, accessible labels |
| **Label** | `src/components/ui/Label.tsx` | Associated `htmlFor`, required asterisk indicator, disabled styling |
| **Checkbox** | `src/components/ui/Checkbox.tsx` | Accessible SVG check, label & description, keyboard focus ring |
| **Card** | `src/components/ui/Card.tsx` | default, subtle, elevated, outline · Compound: CardHeader, CardTitle, CardDescription, CardContent, CardFooter |
| **Badge** | `src/components/ui/Badge.tsx` | neutral, brand, brand-secondary, petal, apricot, custard, success, warning, danger, info · status dot |
| **Alert** | `src/components/ui/Alert.tsx` | info, success, warning, error · `role="alert"`, AlertTitle, AlertDescription, semantic icons |
| **Spinner** | `src/components/ui/Spinner.tsx` | `role="status"`, sm, md, lg, xl sizes, primary/secondary variants |
| **Separator** | `src/components/ui/Separator.tsx` | horizontal / vertical with optional center text |
| **FormField** | `src/components/ui/form-field/` | FormField context connecting FormLabel, FormDescription, FormError with `aria-describedby` and `aria-live="polite"` |

---

## 5. Motion System

Centralized under `src/lib/motion/`:
- `transitions.ts`: Standard durations (`durationFast: 150ms`, `durationNormal: 250ms`, `durationSlow: 350ms`), easings, and soft spring configurations.
- `variants.ts`: `fadeIn`, `fadeUp`, `fadeDown`, `scaleIn`, `staggerContainer`, `staggerItem`.
- `MotionProvider`: Wraps root layout with `MotionConfig` using `reducedMotion="user"`.
- `globals.css`: Full `@media (prefers-reduced-motion: reduce)` fallback.

---

## 6. Internal Developer Reference Route

The Design System reference page lives at:

```text
http://localhost:3000/design-system
```

Implemented at `src/app/design-system/page.tsx` and composed of modular showcase components under `src/features/design-system/components/`.
It is an internal developer tool and is not part of the production user flow.
