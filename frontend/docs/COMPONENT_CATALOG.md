# FoodFighter Design System V1 — Component Catalog

## 1. Objective

Design System V1 must be sufficient for the upcoming frontend authentication work without trying to implement every FoodFighter feature today.

## 2. Required foundation

### Global/style foundation

```text
src/app/globals.css
src/styles/tokens.css
src/styles/utilities.css        # only if useful
src/lib/utils/cn.ts
```

### Motion foundation

```text
src/lib/motion/transitions.ts
src/lib/motion/variants.ts
src/lib/motion/index.ts
src/components/providers/motion-provider/
```

## 3. Required generic UI primitives

### Button

Path:

```text
src/components/ui/button/
```

Variants:

```text
primary
secondary
outline
ghost
destructive
```

Sizes:

```text
sm
md
lg
icon (if used)
```

States:

```text
default
hover
focus-visible
active
disabled
loading
```

### IconButton

```text
src/components/ui/icon-button/
```

Requirements:
- accessible label,
- keyboard focus,
- disabled state,
- optional loading only if a real use exists.

### Input

```text
src/components/ui/input/
```

States:
- default,
- focus,
- filled,
- disabled,
- invalid.

### PasswordInput

```text
src/components/ui/password-input/
```

Adds:
- show/hide control,
- accessible toggle name,
- no credential logging.

### Label

```text
src/components/ui/label/
```

Must associate with the field.

### Checkbox

```text
src/components/ui/checkbox/
```

States:
- unchecked,
- checked,
- focus-visible,
- disabled,
- invalid when needed.

### Card

```text
src/components/ui/card/
```

May expose:
- Card
- CardHeader
- CardTitle
- CardDescription
- CardContent
- CardFooter

Keep domain-neutral.

### Badge

```text
src/components/ui/badge/
```

Semantic variants:
- neutral,
- info,
- success,
- warning,
- danger.

Do not add `ready` or `head` to generic Badge.

### Alert

```text
src/components/ui/alert/
```

Variants:
- info,
- success,
- warning,
- error.

### Spinner

```text
src/components/ui/spinner/
```

Must have accessible loading semantics when used standalone.

### Separator

```text
src/components/ui/separator/
```

Useful for auth social-login separation.

### FormField

```text
src/components/ui/form-field/
├── form-field.tsx
├── form-label.tsx
├── form-description.tsx
├── form-error.tsx
└── index.ts
```

## 4. Required layout components

### PageContainer

```text
src/components/layout/page-container/
```

Owns:
- max-width policy,
- mobile/desktop page gutters,
- consistent content width.

### AuthLayout

```text
src/components/layout/auth-layout/
```

Reusable later by:
- `/login`
- `/register`
- `/verify-2fa`

Do not build the auth forms in this design-system branch.

## 5. Optional/defer in V1

Only add when actual usage exists:

- Dialog
- Drawer/Sheet
- Tooltip
- Tabs
- Select
- Radio
- Toast system
- Skeleton

Do not create a catalog of unused components just to look complete.

## 6. Not design-system components

These belong to features:

```text
LoginForm
RegisterForm
SocialLoginButtons
TwoFactorForm

FoodProfileForm
ReadyMemberCard
RoomCodeCard
MealPreferenceForm
MenuRecommendationCard
VoteOption
FinalMenuHero
RestaurantCard
```

## 7. API design

Prefer semantic variants instead of many booleans.

Good:

```tsx
<Button variant="primary" size="md" loading={isSubmitting}>
  Sign in
</Button>
```

Avoid:

```tsx
<Button primary large rounded animated loading fullWidth />
```

Composition should scale without boolean-prop proliferation.

## 8. Component definition of done

A primitive is not done until relevant states are verified:
- keyboard focus,
- hover,
- active,
- disabled,
- loading,
- invalid,
- mobile,
- desktop,
- Thai/English text wrapping.
