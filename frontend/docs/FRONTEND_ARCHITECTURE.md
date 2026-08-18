# FoodFighter Frontend Architecture

> Canonical source for **how frontend code is structured and where files belong**.

## 1. Style

FoodFighter uses:

**Feature-oriented + Layered + Explicit Next.js**

The goal is not maximum abstraction.

The goal is to make code easy to trace:

```text
page.tsx
  ↓
feature component
  ↓
subcomponents / schema / hook / service
  ↓
shared infrastructure
```

A developer should be able to open a page and follow imports to understand the feature.

---

## 2. Canonical source structure

Use this as the target shape, but do not create empty folders in advance.

```text
src/
├─ app/
│  ├─ (auth)/
│  ├─ (main)/
│  ├─ design-system/
│  ├─ globals.css
│  └─ layout.tsx
│
├─ features/
│  ├─ auth/
│  ├─ home/
│  ├─ food-profile/
│  ├─ room/
│  ├─ meal-preference/
│  ├─ recommendations/
│  ├─ voting/
│  ├─ restaurants/
│  └─ history/
│
├─ components/
│  ├─ ui/
│  ├─ layout/
│  ├─ shared/
│  └─ providers/
│
├─ lib/
│  ├─ api/
│  ├─ realtime/
│  ├─ motion/
│  ├─ env/
│  └─ utils/
│
├─ config/
│  └─ routes.ts
│
└─ styles/
   └─ tokens.css
```

---

## 3. `src/app/`

`app/` owns Next.js routing and route composition.

Typical responsibilities:

- `page.tsx`
- `layout.tsx`
- metadata
- route groups
- route-level loading/error boundaries
- high-level page composition

A route file should usually stay thin.

Good:

```tsx
import type { Metadata } from "next";
import { LoginForm } from "@/features/auth/components/LoginForm";

export const metadata: Metadata = {
  title: "Login | FoodFighter",
};

export default function LoginPage() {
  return <LoginForm />;
}
```

A page may also own small page-level composition such as a back action, brand mark, and feature component.

Do not put large forms, fetch wrappers, DTO parsing, or complex reusable UI implementations in `page.tsx`.

---

## 4. Route groups

Use route groups to separate major shells without changing URLs.

Example:

```text
app/
├─ (auth)/
│  ├─ layout.tsx
│  ├─ register/
│  └─ login/
│
└─ (main)/
   ├─ layout.tsx
   ├─ room/
   └─ history/
```

Use `(auth)` for authentication screens.

Use `(main)` when the main application shares navigation/shell structure.

---

## 5. `src/features/<feature>/`

Feature code owns FoodFighter-specific behavior and UI.

Examples:

- Auth
- Food Profile
- Room
- Meal Preference
- Recommendations
- Voting
- Restaurants
- History

Feature code may understand business words such as:

- Head
- Ready
- Active Member
- OK / Pass
- Final Vote

Generic UI must not.

### Start small

For a small or early feature:

```text
features/<feature>/
├─ components/
│  ├─ FeatureForm.tsx
│  └─ FeatureCard.tsx
├─ <feature>.schema.ts
├─ <feature>.types.ts
└─ <feature>.service.ts
```

Only add `hooks/`, `services/`, `schemas/`, or other subfolders when the number of files actually benefits from grouping (as structured in `src/features/auth/`).

Do not create speculative empty architecture.

---

## 6. `src/components/ui/`

Generic design-system primitives.

Examples:

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

These components must not know FoodFighter business rules.

Wrong:

```text
ReadyMemberCard
VoteOption
RestaurantCard
```

Those belong to feature folders.

---

## 7. `src/components/layout/`

Reusable application structure.

Examples:

```text
PageContainer
AuthLayout
PublicHeader
PublicFooter
AppShell
AppHeader
BottomNavigation
```

A layout component may understand page structure but not feature business logic.

---

## 8. `src/components/shared/`

Use only for reusable non-domain widgets more complex than basic primitives.

Examples:

- generic date picker,
- generic empty state,
- generic pagination control.

Do not use `shared/` as a miscellaneous dump.

If the component contains FoodFighter-specific vocabulary, it probably belongs to a feature.

---

## 9. `src/lib/`

Shared infrastructure.

### `lib/api/`

- API base configuration
- shared request wrapper
- credentials policy
- generic transport errors

### `lib/realtime/`

- Socket.IO/WebSocket connection setup
- reconnection
- generic transport lifecycle

### `lib/motion/`

- reusable motion presets
- reduced-motion helpers

### `lib/utils/`

Only genuinely reusable utilities.

Avoid giant `helpers.ts`, `common.ts`, or `misc.ts`.

---

## 10. `src/config/`

Stable application configuration.

Example:

```ts
export const ROUTES = {
  AUTH: {
    LOGIN: "/login",
    REGISTER: "/register",
  },
};
```

Do not repeat route literals throughout components.

---

## 11. Dependency direction

Allowed:

```text
app → features
app → components/layout
app → components/ui

features → components/ui
features → components/shared
features → lib

components/ui → small shared utilities
```

Avoid:

```text
components/ui → features
components/ui → app
frontend → backend source
feature A → feature B internals without an intentional boundary
```

Circular imports are architecture defects.

---

## 12. Server vs Client components

Do not add `"use client"` automatically.

Keep a Server Component when the file only needs:

- metadata,
- static composition,
- server-compatible rendering.

Use a Client Component when it requires:

- React state/effects/transitions,
- React Hook Form,
- browser APIs,
- event handlers,
- client-only libraries.

Preferred shape:

```text
Server route/page
    ↓
Client interactive feature component
```

Do not make the whole tree client-side because one nested control is interactive.

---

## 13. Flat files over folder noise

Prefer:

```text
features/auth/components/
├─ RegisterForm.tsx
├─ LoginForm.tsx
├─ SocialAuthButtons.tsx
└─ TermsConsent.tsx
```

over:

```text
register-form/
├─ register-form.tsx
└─ index.ts

login-form/
├─ login-form.tsx
└─ index.ts
```

unless a component genuinely owns multiple files such as:

- tests,
- styles,
- specialized helpers,
- internal child components.

Navigation cost matters.

---

## 14. `index.ts` / barrel files

Do not create barrels by default.

Prefer direct imports:

```ts
import { LoginForm } from "@/features/auth/components/LoginForm";
```

Use `index.ts` only when it creates a meaningful module boundary.

Avoid broad barrels that hide implementation ownership.

---

## 15. Naming

Use clear names derived from responsibilities and domain concepts.

Good:

```text
RegisterForm
VerificationCodeInput
RoomMemberList
InviteSheet
MenuRecommendationCard
VoteProgress
RestaurantCard
```

Avoid vague names:

```text
Manager
Thing
Common
MainStuff
DataComponent
HelperComponent
```

---

## 16. Feature boundaries specific to FoodFighter

### Food Profile ≠ Meal Preference

Food Profile is long-lived user preference/allergy/diet information.

Meal Preference is session-specific intent.

Do not merge them into one generic "preferences" module.

### Email verification ≠ login 2FA

Registration email verification must remain distinct from future login 2FA.

### Room/Lobby ≠ Voting

Room/Lobby owns membership, Head, Ready, invite, and start controls.

Voting owns OK/Pass, vote progress, Recommend Again, Final Vote, and tie-break presentation.

Do not create one giant "session" component that owns everything.

---

## 17. Clean architecture rule for this project

FoodFighter does **not** require enterprise-style layers such as:

```text
domain/
use-cases/
repositories/
adapters/
infrastructure/
```

for ordinary frontend features.

Add abstraction only when the project demonstrates a real need.

The preferred default is explicit, feature-oriented code.
