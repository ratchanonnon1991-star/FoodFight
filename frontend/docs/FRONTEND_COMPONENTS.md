# FoodFighter Components Guide

> Read this file when creating, splitting, reusing, or refactoring UI components.

## 1. Component principle

Create a component when it represents a **real responsibility**.

Do not create a component merely to reduce line count.

A useful component normally has at least one of these:

- meaningful reusable UI responsibility,
- meaningful behavior/state,
- repeated use,
- independent reason to change,
- clear domain or layout concept.

---

## 2. Simple fields stay in the form

Keep ordinary fields explicit.

Example:

```tsx
<Controller
  control={control}
  name="email"
  render={({ field, fieldState }) => (
    <FormField invalid={fieldState.invalid}>
      <FormLabel htmlFor={field.name}>Email</FormLabel>
      <Input id={field.name} type="email" {...field} />
      <FormError error={fieldState.error} />
    </FormField>
  )}
/>
```

Do not automatically create:

```text
EmailField.tsx
PasswordField.tsx
FirstNameField.tsx
```

for normal one-off fields.

This explicit style makes form logic easier to learn and trace.

---

## 3. Extract complex/cohesive behavior

Good extraction examples:

```text
VerificationCodeInput
SocialAuthButtons
TermsConsent
ResendCodeControl
DatePickerInput
RoomMemberList
InviteSheet
MenuRecommendationCard
RestaurantMap
```

Reasons:

- interaction behavior,
- focused responsibility,
- reuse,
- independent accessibility/state concerns.

---

## 4. Avoid micro-components

Usually do not create:

```text
RegisterHeading
RegisterSubtitle
EmailLabel
PasswordLabel
SubmitButtonText
OtpDigit1
```

A small block of plain JSX can stay inline.

---

## 5. Common component library

FoodFighter maintains a **small central UI library**.

Current baseline:

```text
Button
IconButton
Input
PasswordInput
Label
Checkbox
Card
Badge
Alert
Spinner
Separator
FormField
```

These are generic primitives.

Do not recreate them inside features.

---

## 6. Button

Button is an action primitive.

Prefer semantic variants such as:

```text
primary
secondary
outline
ghost
destructive
```

and a small size system:

```text
sm
md
lg
icon
```

Relevant states:

- default
- hover
- focus-visible
- active
- disabled
- loading

Do not create `LoginButton`, `RegisterButton`, or `CreateRoomButton` just to change style.

Compose `Button`.

---

## 7. Input and PasswordInput

`Input` handles generic text input.

`PasswordInput` may add:

- visibility toggle,
- accessible toggle label,
- password-safe behavior.

Feature validation still belongs to the feature schema/form.

---

## 8. FormField

Use shared form composition for consistent:

```text
label
control
description
error
```

Do not manually invent a different error/label layout for every feature.

---

## 9. Card

`Card` is a generic surface/container.

Feature UI composes it.

Good:

```tsx
<Card>
  {/* room-specific UI */}
</Card>
```

Do not add generic Card variants such as:

```text
ready-member
restaurant-result
recommendation
final-vote
```

Those meanings belong to feature components.

---

## 10. Badge

Generic semantic statuses may be:

```text
neutral
info
success
warning
danger
```

Feature code maps domain state to a generic Badge.

Example:

```text
Ready member
→ success Badge
```

Do not teach the generic Badge what "Ready" means.

---

## 11. Alert

Use Alert for scoped, meaningful information/error state.

Do not turn every field error into a global Alert.

---

## 12. Spinner / loading

For form submit buttons, prefer Button loading state when possible.

Use standalone Spinner only for section/page loading that truly needs it.

---

## 13. Add components on demand

Potential future generic components:

```text
Textarea
Select
RadioGroup
Switch
Avatar
Dialog
Sheet
Toast
Skeleton
Tabs
Progress
```

Do not scaffold all of them now.

Once a generic component is introduced, reuse it rather than creating feature-local clones.

---

## 14. Layout components

Current/expected reusable layout pieces:

```text
PageContainer
AuthLayout
PublicHeader
PublicFooter
```

Likely future:

```text
AppShell
AppHeader
BottomNavigation
PageHeader
```

Do not create a layout abstraction for a wrapper used only once.

---

## 15. Feature component map

This is a planning map, not a command to create everything now.

### Auth

```text
RegisterForm
LoginForm
VerifyEmailForm
ChangeEmailForm
VerificationSuccess
VerificationCodeInput
SocialAuthButtons
TermsConsent
ResendCodeControl
AuthSessionFallback
```

### Food Profile

Likely:

```text
FoodProfileForm
FoodProfileStepper
AllergyStep
RestrictionStep
FoodProfileDetailsStep
```

Only create step components when the UI/behavior is substantial enough.

### Room / Lobby

Likely:

```text
RoomSummary
RoomMemberList
RoomMemberItem
InviteSheet
ReadyAction
StartFoodFightAction
```

### Meal Preference

Likely:

```text
MealPreferenceForm
```

Keep simple choices inline until extraction is justified.

### Recommendation

Likely:

```text
RecommendationState
MenuRecommendationCard
RecommendationActions
```

### Voting

Likely:

```text
VotingPanel
VoteOption
VoteProgress
FinalVotePanel
TieBreakAction
```

### Restaurants

Likely:

```text
RestaurantList
RestaurantCard
RestaurantMap
```

### History

Likely:

```text
HistoryList
HistoryItem
```

---

## 16. Component split checklist

Before extracting:

```text
[ ] clear responsibility/name
[ ] independent behavior/state
[ ] reused or likely independently changed
[ ] parent becomes easier to read
[ ] not created only to satisfy line count
```

If most answers are no, keep it inline.

---

## 17. File-size review

Suggested review signals:

```text
route page/layout       ~120 lines
generic UI              ~180 lines
feature form/component  ~220 lines
```

When near a threshold:

- inspect responsibilities,
- extract only a real responsibility,
- keep cohesive code together.

A clean 230-line explicit form may be better than five tiny files that hide the flow.
