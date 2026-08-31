# FoodFighter Design System V4.1

V4.1 is an isolated production-front-end component library and showroom. It is
available at `/design-system` and is intentionally scoped by
`[data-ff-design-system]` so existing product routes keep their current visual
system until migration is explicitly approved.

## Structure

- `tokens.ts` — theme metadata, type scale, spacing, and media guidance.
- `reference.ts` — the audited `ui-ux-examples` influence map, reference-derived
  palette, layout/density rules, state language, and financial display guidance.
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

The current seed direction is `Ember Kitchen` / `Fire & Flavor`, refined with
Food Market appetite and Olive Fire freshness. The showroom also exposes the
preserved Legacy Soft Editorial, Street Food Night, and Modern Bistro themes
as token-compatible explorations. No product page imports these components yet.

## Reference assimilation

The local `ui-ux-examples` folder was reviewed as a visual reference set. The
showroom records what was used, adapted, kept as inspiration, or rejected.
Useful translations include:

- Food Market and Olive Fire appetite/freshness roles in semantic tokens.
- Custard Pop interaction states and tactile action feedback.
- Apricot Air breathing room for forms and onboarding.
- Mauve Editorial compact metadata for members and bills.
- Modular Grid composition rules for media, content, metadata, and action.

Raw reference HTML, global styles, static fixtures, emoji icons, and one-off
device frames are not copied into production code.

## Usage contract

- Use semantic tokens rather than raw color values in component implementation.
- Keep media frames reserved when an image is missing; choose `16:9`, `4:3`,
  `1:1`, or `3:4` according to content purpose.
- Build product cards from `Media`, `CardContent`, metadata, and an explicit
  action instead of a mega-component bound to an API response.
- Keep functional states (`success`, `warning`, `danger`, `info`) separate from
  brand color roles.
- Check the same composition at 390, 768, and 1440px and provide a visible
  focus path, labels, status text, and reduced-motion behavior.

The scope boundary is deliberate: V4.1 is ready for owner visual review, but
production page migration remains a later bounded task.
