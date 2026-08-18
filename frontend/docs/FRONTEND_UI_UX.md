# FoodFighter Frontend UI/UX Rules

> Read this file for visual design, responsive work, accessibility, shared styling, and interaction states.

## 1. Product feel

FoodFighter should feel:

- friendly,
- warm,
- clear,
- lightweight,
- mobile-native,
- easy to scan.

Avoid:

- desktop dashboard density squeezed onto phone,
- tiny touch controls,
- excessive decoration,
- a Card around every piece of content,
- low-contrast helper text,
- motion without purpose.

---

## 2. Mobile first

Primary design/reference width:

`390px`

Verify important screens at:

```text
360
375
390 / 393
430
768
desktop
```

Check:

- horizontal overflow,
- touch targets,
- text wrapping,
- keyboard behavior,
- fixed/bottom actions,
- mobile viewport height (use `min-h-dvh` instead of `100vh` to avoid mobile browser chrome clipping),
- Thai and English copy.

Do not build desktop first and repair mobile later.

---

## 3. Typography

Use the current project-approved typography implementation.

Current semantic hierarchy:

```text
display
heading-1
heading-2
heading-3
body
body-small
label
caption
```

Do not invent arbitrary text sizes for every screen.

Thai and English must both remain readable.

---

## 4. Color/token rule

Components should style by semantic meaning.

Examples:

```text
background
surface
text-primary
text-secondary
text-muted
border-default
brand
success
warning
danger
info
focus-ring
disabled
```

Current approved source palette:

```text
Pastel Petal      #FFC6D9
Soft Apricot      #FFE1C6
Vanilla Custard   #FFF7AE
Blackberry Cream  #48284A
Dusty Mauve       #916C80
```

Raw palette values belong in centralized theme/tokens.

Do not scatter HEX values through feature JSX.

---

## 5. Reuse shared components

Before styling a new:

- button,
- input,
- card,
- badge,
- alert,
- spinner,
- form field,

check `src/components/ui/`.

Do not create feature-local clones of generic primitives.

---

## 6. Interactive states

Shared interactive UI should intentionally handle relevant states:

- default,
- hover,
- focus-visible,
- active/pressed,
- selected when relevant,
- disabled,
- loading,
- invalid/error when relevant.

Do not remove focus outline without an accessible replacement.

Do not communicate important state only through color.

---

## 7. Forms

Forms should use:

- visible labels,
- useful `autoComplete`,
- correct input types,
- appropriate `inputMode`,
- field-level errors near fields,
- clear submit loading/disabled state.

Placeholder is not a substitute for label.

---

## 8. Accessibility baseline

Every affected UI should consider:

- semantic HTML,
- heading hierarchy,
- keyboard navigation,
- visible focus,
- explicit labels,
- `aria-invalid`,
- error association,
- accessible icon-button names,
- disabled semantics,
- loading semantics,
- adequate contrast.

---

## 9. Layout

Prefer clear single-column mobile flows for primary tasks.

Use bounded content widths on tablet/desktop.

Avoid arbitrary nested containers when one page container is enough.

Headers, footers, bottom navigation, and application shells should be shared layout components only when they actually repeat.

---

## 10. Cards/surfaces

Use cards to group meaningful content.

Do not put every paragraph/action inside its own card.

Feature cards such as:

```text
MenuRecommendationCard
RestaurantCard
CurrentSessionCard
```

compose the generic `Card` primitive.

---

## 11. Motion

Use motion only when it improves feedback or continuity.

Prefer simple CSS transitions for:

- hover,
- color,
- border,
- focus.

Use centralized motion presets for larger appearance/state transitions.

Respect reduced motion.

Do not motion-wrap every component.

---

## 12. Tailwind rule

Use the Tailwind version actually installed in the project.

When syntax matters:

- inspect `package.json` / lockfile,
- use the current canonical syntax for that version,
- do not blindly copy old snippets from memory.

Do not silence editor warnings without understanding their source.

---

## 13. Current feature UI direction

Product-specific screens should follow the current owner-approved reference/SRS.

Typical patterns include:

- strong primary CTA,
- clear back/navigation affordance,
- grouped form sections,
- room/member status,
- bottom sheet for mobile secondary actions,
- recommendation cards,
- voting actions,
- restaurant list/map presentation.

Do not invent a new visual language per feature.

---

## 14. Design changes in the future

This document defines stable design principles, not a frozen visual screenshot.

If the owner later changes:

- exact radius,
- color mapping,
- typography,
- component appearance,

update the centralized design system/tokens first.

Feature components should inherit changes through shared primitives whenever possible.
