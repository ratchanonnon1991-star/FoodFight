# FoodFighter Motion System

## 1. Approved technology

Use the `motion` React package for intentional UI motion.

Keep motion centralized under:

```text
src/lib/motion/
src/components/providers/motion-provider/
```

Do not scatter timing/easing objects through feature components.

## 2. Motion purpose

Animation must serve one or more of:

- state change,
- spatial continuity,
- interaction feedback,
- hierarchy,
- appearance/disappearance,
- progress,
- preventing a jarring transition.

"It looks cool" is not enough for a frequently used interaction.

## 3. Restraint rule

FoodFighter is an interaction-heavy product.

Frequently repeated actions should feel fast.

Examples:
- typing,
- form correction,
- common button use,
- repeated voting interactions.

These need little or no decorative motion.

Rare or meaningful events may use stronger motion:
- first AI recommendations,
- final menu reveal,
- important room transition.

## 4. Motion presets

Create shared conceptual presets:

```text
duration-fast
duration-normal
duration-slow

ease-standard
ease-enter
ease-exit

spring-soft
spring-snappy
```

Exact values must be set once and documented.

Do not create arbitrary per-component timing values unless there is a documented exception.

## 5. Reusable variants

Suggested reusable variants:

```text
fade-in
fade-up
fade-down
scale-in
stagger-container
stagger-item
```

Only implement variants that active components actually use.

## 6. Motion vs CSS transitions

Prefer CSS transition for:
- color,
- border color,
- focus ring,
- small shadow changes.

Prefer Motion for:
- mount/unmount,
- coordinated appearance,
- layout continuity,
- state transitions with spatial meaning,
- staggered content where justified.

## 7. Motion provider

Target:

```text
src/components/providers/motion-provider/
├── motion-provider.tsx
└── index.ts
```

Consider centralized configuration using Motion APIs appropriate to the installed version.

Keep provider responsibilities small:
- common configuration,
- reduced-motion behavior,
- optional lazy feature loading if it provides real bundle benefit.

## 8. Reduced motion

Must respect OS/user reduced-motion preference.

CSS fallback belongs in:

```text
src/app/globals.css
```

React-side motion must also reduce/remove transforms and layout motion when appropriate.

Reduced motion does not mean removing all feedback; opacity/color feedback may remain when accessible.

## 9. Performance rules

- prefer `transform` and `opacity` for animated properties;
- avoid layout thrashing;
- do not animate expensive effects continuously;
- do not add ambient infinite animation to core task UI;
- do not force every primitive to become a Motion component;
- inspect client-component boundaries and bundle cost.

## 10. Motion review gate

Before completion ask:

1. Why does this animate?
2. How often will the user see it?
3. Does it delay the task?
4. Is the origin/direction spatially sensible?
5. Does reduced-motion mode remain understandable?
6. Is a CSS transition sufficient?
7. Does it remain smooth on normal hardware?
