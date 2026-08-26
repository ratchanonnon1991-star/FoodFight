# FoodFighter Design System V4

V4 is an isolated production-front-end component library and showroom. It is
available at `/design-system` and is intentionally scoped by
`[data-ff-design-system]` so existing product routes keep their current visual
system until migration is explicitly approved.

## Structure

- `tokens.ts` — theme metadata, type scale, spacing, and media guidance.
- `provider.tsx` — `DesignSystemProvider` and the isolation boundary.
- `primitives.tsx` — typed actions, fields, selection controls, feedback,
  overlays, navigation primitives, cards, avatars, and progress.
- `media.tsx` — image-ready `Media`, `MediaFrame`, and `MediaPlaceholder` with
  16:9, 4:3, 1:1, and 3:4 contracts.
- `patterns.tsx` — food, restaurant, room, history, bill continuation,
  profile, hero, form, and action patterns.
- `showroom.tsx` — interactive owner-review showroom.
- `styles.css` — semantic tokens and scoped component styles.

Import later with:

```tsx
import { Button, FoodCard, MediaFrame, RestaurantCard } from "@/design-system";
```

The current seed direction is `Ember Kitchen` / `Fire & Flavor`. The showroom
also exposes the preserved legacy reference, Street Food Night, and Modern
Bistro as token-compatible explorations. No product page imports these
components yet.
