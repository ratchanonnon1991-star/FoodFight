# FoodFighter Frontend Architecture

> Canonical source for **how frontend code is structured, where files belong, layer boundaries, and shared systems**.

## 1. Architectural Philosophy

FoodFighter uses:

**Feature-Oriented + Layered + Explicit Next.js (App Router)**

### Core Tenet
> **PAGE COMPOSES · FEATURE OWNS · SHARED REUSES · TOKENS STYLE**

```text
app/ (Route composition & layouts)
  ↓
features/<feature>/ (Domain logic, schemas, feature components, services)
  ↓
components/ (Generic UI primitives, layout shells, shared widgets)
  ↓
i18n/ & lib/ (Global language provider, API clients, realtime transport, motion)
  ↓
config/ & styles/ (Canonical routes, API base, semantic tokens)
```

---

## 2. Canonical Directory Structure

The actual production structure of `frontend/src/`:

```text
src/
├─ app/                         # Next.js App Router (Routes & Layouts)
│  ├─ (admin)/admin/            # Admin portal sub-tree (Protected by AdminRouteGuard)
│  │  ├─ analytics/
│  │  ├─ bills/[billId]/
│  │  ├─ rooms/[roomId]/
│  │  ├─ users/[userId]/
│  │  ├─ layout.tsx
│  │  └─ page.tsx
│  ├─ (auth)/                   # Authentication flows
│  │  ├─ login/
│  │  ├─ register/
│  │  ├─ verify-email/
│  │  ├─ change-email/
│  │  └─ layout.tsx
│  ├─ design-system/            # Internal component showcase
│  ├─ globals.css               # Global theme & typography
│  ├─ layout.tsx                # Root layout (LanguageProvider, MotionProvider)
│  └─ page.tsx                  # Home / Landing page (Visual Benchmark)
│
├─ features/                    # Feature domain modules
│  ├─ admin/                    # Admin dashboard, analytics, users, rooms, bills
│  ├─ auth/                     # Registration, login, OTP verification
│  ├─ bill/                     # Bill itemization, split calculation, payment status
│  ├─ design-system/            # Showcase components
│  ├─ food-fight/               # Preferences, recommendations, OK/Pass voting, winner
│  ├─ food-profile/             # Dietary restrictions, allergies, profile stepper
│  ├─ history/                  # Past meal decisions and billing history
│  ├─ home/                     # Home hero, quick actions, active session cards
│  ├─ payment-account/          # PromptPay and bank account management
│  ├─ profile/                  # User settings and personal food identity
│  └─ room/                     # Room lobby, QR code, member list, ready status
│
├─ components/                  # Reusable presentation layer
│  ├─ layout/                   # PageContainer, AuthLayout, Shells, Navigation
│  ├─ shared/                   # Generic widgets (BrandMark, LanguageSwitcher)
│  └─ ui/                       # Design system primitives (Button, Input, Card, Badge, etc.)
│
├─ i18n/                        # Global lightweight localization system
│  ├─ config.ts                 # Supported locales ("th" | "en") & storage keys
│  ├─ LanguageProvider.tsx      # Single source of truth React context & useLanguage hook
│  ├─ LanguageSwitcher.tsx      # Shared visual language toggle
│  └─ translations.ts           # Core & landing translations dictionary
│
├─ lib/                         # Shared infrastructure & utilities
│  ├─ api/                      # Base fetch wrapper, error handling, auth headers
│  ├─ motion/                   # Framer motion variants, transitions, provider
│  ├─ realtime/                 # Socket.IO client singleton and connection lifecycle
│  └─ utils/                    # Pure formatters (currency, dates, timers, cn helper)
│
├─ config/                      # Application configuration
│  ├─ api.ts                    # API base URL resolution
│  └─ routes.ts                 # Canonical typed route constants (ROUTES)
│
└─ styles/                      # Design tokens
   └─ tokens.css                # CSS custom properties for palette, radii, and shadows
```

---

## 3. Global / Shared Architecture Policy

Anything genuinely shared across features must have **exactly ONE source of truth**:

1. **Global Tokens & Primitives**:
   - Palette, typography scales, radii, shadows, borders, and focus rings live in `src/styles/tokens.css` and `src/components/ui/`.
   - Never create feature-local copies of `Button`, `Input`, `Card`, `Badge`, `Alert`, or `Spinner`.

2. **Global Shared UI**:
   - `BrandMark`: Single source for official logo variants.
   - `LanguageSwitcher`: Single shared component for language switching.
   - Layout primitives: `PageContainer`, `AuthLayout`.

3. **Domain Logic Stays Feature-Owned**:
   - Realtime room sync stays in `features/room/`.
   - Voting and tie-break rules stay in `features/food-fight/`.
   - Bill calculation stays in `features/bill/`.
   - Admin metrics stay in `features/admin/`.

---

## 4. Global TH/EN Localization Architecture

FoodFighter implements a **lightweight, typed, zero-package-overhead** localization system:

- **Supported Locales**: `"th"` and `"en"` (Default / fallback: `"en"`).
- **Single Source of Truth**: `LanguageProvider` wrapping the root application in `src/app/layout.tsx`.
- **Hook**: `useLanguage()` returns `{ locale, setLocale }`.
- **Persistence**: Single localStorage key: `foodfighter_language`.
- **Pre-Auth Accessibility**: Language switcher is available immediately on Landing before login.
- **Typed Feature Dictionaries**: Each feature owns a typed dictionary matching the global `Locale` type:
  - `homeTranslations` (`src/features/home/`)
  - `roomTranslations` (`src/features/room/`)
  - `foodFightTranslations` (`src/features/food-fight/`)
  - `billTranslations` (`src/features/bill/`)
  - `adminTranslations` (`src/features/admin/`)
- **No Third-Party Overhead**: Avoid `next-intl`, `react-i18next`, or `i18next`.

---

## 5. Admin Architecture & Scope (Required Scope)

Admin is a **required first-class product subsystem**:

- **Route Group**: `src/app/(admin)/admin/`
- **Route Protection**: `AdminRouteGuard` enforces authenticated `Role.ADMIN` session; non-admins and unauthenticated users are redirected.
- **Backend Protection**: Guarded by `@UseGuards(RolesGuard)` and `@Roles(Role.ADMIN)`.
- **Admin Scope**:
  1. `/admin` — System Overview Dashboard
  2. `/admin/analytics` — Platform Analytics, trends, and automated insights
  3. `/admin/users` & `/admin/users/[userId]` — User Directory & User Detail
  4. `/admin/rooms` & `/admin/rooms/[roomId]` — Rooms Directory & Session Detail
  5. `/admin/bills` & `/admin/bills/[billId]` — Bills & Payments Directory / Settlement Detail
- **Backend Registration**: `AdminModule` is imported and registered in `backend/src/app.module.ts`.

---

## 6. Canonical Routes (`src/config/routes.ts`)

All internal links and redirects must consume `ROUTES` from `src/config/routes.ts`:

```ts
export const ROUTES = {
  HOME: "/",
  AUTHENTICATED_HOME: "/",
  AUTH: {
    LOGIN: "/login",
    REGISTER: "/register",
    VERIFY_EMAIL: "/verify-email",
    CHANGE_EMAIL: "/change-email",
  },
  ROOM: {
    CREATE: "/room/create",
    DETAIL: (id: string) => `/room/${id}`,
  },
  FOOD_FIGHT: {
    PREFERENCES: (id: string) => `/food-fight/${id}/preferences`,
    RECOMMENDATIONS: (id: string) => `/food-fight/${id}/recommendations`,
    VOTING: (id: string) => `/food-fight/${id}/voting`,
    RESULT: (id: string) => `/food-fight/${id}/result`,
  },
  BILL: {
    DETAIL: (id: string) => `/bill/${id}`,
  },
  ADMIN: "/admin",
  ADMIN_ANALYTICS: "/admin/analytics",
  ADMIN_USERS: "/admin/users",
  ADMIN_USER_DETAIL: (id: string) => `/admin/users/${id}`,
  ADMIN_ROOMS: "/admin/rooms",
  ADMIN_ROOM_DETAIL: (id: string) => `/admin/rooms/${id}`,
  ADMIN_BILLS: "/admin/bills",
  ADMIN_BILL_DETAIL: (id: string) => `/admin/bills/${id}`,
} as const;
```
