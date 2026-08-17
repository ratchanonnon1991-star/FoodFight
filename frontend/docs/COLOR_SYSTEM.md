# FoodFighter Color System

## 1. Approved source palette

The owner supplied this palette and these exact values are canonical source colors for FoodFighter:

| Token name | Hex | Role direction |
|---|---:|---|
| Pastel Petal | `#FFC6D9` | soft accent / selected-light surface |
| Soft Apricot | `#FFE1C6` | warm supporting surface |
| Vanilla Custard | `#FFF7AE` | highlight / attention-light surface |
| Blackberry Cream | `#48284A` | primary dark brand / primary text / strong action |
| Dusty Mauve | `#916C80` | secondary brand / secondary action / focus-support |

Do not replace this palette with generic AI purple/blue gradients.

## 2. Semantic mapping

Raw palette names are not the component API.

Recommended semantic direction:

```text
brand-primary          -> Blackberry Cream
brand-secondary        -> Dusty Mauve

accent-petal           -> Pastel Petal
accent-apricot         -> Soft Apricot
accent-custard         -> Vanilla Custard

text-primary           -> Blackberry Cream
focus-ring             -> Dusty Mauve or a verified derivative
```

Light palette colors should normally carry dark Blackberry Cream text.

## 3. Contrast notes

Measured contrast guidance:

```text
Blackberry Cream #48284A on white               ~12.5:1
Blackberry Cream #48284A on Pastel Petal        ~8.5:1
Blackberry Cream #48284A on Soft Apricot        ~10.0:1
Blackberry Cream #48284A on Vanilla Custard     ~11.4:1
white on Dusty Mauve #916C80                    ~4.5:1
```

Therefore:
- Blackberry Cream is a strong text/action color on the light palette.
- Do not use white text on Pastel Petal, Soft Apricot, or Vanilla Custard.
- White on Dusty Mauve is near the normal-text AA threshold; verify final size/weight/state colors.
- Do not use Dusty Mauve text on Blackberry Cream; contrast is insufficient for normal text.

## 4. Brand palette vs semantic status palette

Do not misuse the brand palette for all status meanings.

Examples:
- Pastel Petal is not automatically an error color.
- Vanilla Custard is not automatically a warning color.
- Dusty Mauve is not automatically disabled.

If the existing project already defines accessible `success`, `danger`, `warning`, or `info` colors, preserve them.

If it does not, add the minimum required support colors as a separate semantic-status layer and document them as technical/accessibility colors, not owner-supplied brand colors.

All new status colors require contrast verification.

## 5. Token hierarchy

Use three levels:

```text
SOURCE PALETTE
    ↓
SEMANTIC TOKENS
    ↓
COMPONENT TOKENS / VARIANTS
```

Example:

```text
#48284A
  ↓
brand-primary
  ↓
button-primary-background
```

Components should consume semantic tokens, not source palette hex codes.

## 6. CSS token direction

Exact syntax depends on the installed Tailwind version.

Conceptual source layer:

```css
:root {
  --palette-pastel-petal: #FFC6D9;
  --palette-soft-apricot: #FFE1C6;
  --palette-vanilla-custard: #FFF7AE;
  --palette-blackberry-cream: #48284A;
  --palette-dusty-mauve: #916C80;

  --color-brand-primary: var(--palette-blackberry-cream);
  --color-brand-secondary: var(--palette-dusty-mauve);
  --color-accent-petal: var(--palette-pastel-petal);
  --color-accent-apricot: var(--palette-soft-apricot);
  --color-accent-custard: var(--palette-vanilla-custard);
  --color-text-primary: var(--palette-blackberry-cream);
}
```

Do not copy this blindly if the repository already uses a different token syntax.

## 7. Neutral surfaces

The five approved colors are the brand palette, not a complete neutral system.

Use existing neutral/background tokens if the project has them.

If neutral tokens do not exist:
- introduce a minimal neutral surface/text/border layer,
- keep it subordinate to the approved brand palette,
- document exact values,
- verify contrast,
- do not invent a second competing brand palette.

## 8. State behavior

Every interactive color system must cover relevant states:

```text
default
hover
focus-visible
active/pressed
selected
disabled
loading
invalid/error
```

Do not encode state using color alone.

## 9. No gradient by default

Do not create generic purple/pink gradients merely because the source palette contains pink and purple.

Gradients require an explicit design reason and must preserve text contrast.

## 10. Approval rule

Any change to the five source palette values is a design decision that requires owner approval.
