# FoodFighter Frontend Components Guide

> Canonical source for **component creation, responsibility-driven splitting, reuse rules, and maintainability review thresholds**.

## 1. Core Component Principles

1. **Responsibility-Driven Creation**:
   - Create a component when it represents a **clear domain concept, distinct interaction behavior, or reusable UI block**.
   - Do NOT create components merely to satisfy arbitrary line-count limits.
2. **Page Composes · Feature Owns · Shared Reuses**:
   - `src/app/` pages compose feature modules with minimal wrapper markup.
   - `src/features/<feature>/` owns feature-specific orchestration and business cards.
   - `src/components/ui/` owns generic, domain-agnostic UI primitives.
   - `src/components/shared/` owns reusable cross-feature widgets (e.g. `BrandMark`, `LanguageSwitcher`).

---

## 2. Component Splitting & Maintainability Signals

To keep the codebase maintainable without creating micro-component noise, use these **review signals**:

| Component Category | Target Line Count | Review Trigger | Splitting Guidance |
|---|---|---|---|
| **Route / Page / Layout** | ~120–180 lines | >200 lines | Delegate forms, table logic, and data fetches to feature components. |
| **Generic UI Primitive** | ~180–220 lines | >250 lines | Split compound parts (e.g., `CardHeader`, `CardContent`, `FormField`). |
| **Feature Component / Form** | ~250–350 lines | >400 lines | **Mandatory review**: Extract cohesive sections (e.g., Step panels, member lists, trend charts). |

> **Crucial Rule**: A cohesive 300-line component that is easy to trace from top to bottom should **remain together**. Conversely, a 150-line file that mixes four unrelated responsibilities should be **split**.

### Good Extraction Examples
- `VerificationCodeInput` (Handles 6-box auto-focus, paste, backspace keyboard events)
- `SocialAuthButtons` (Groups Google and LINE OAuth triggers)
- `MealPreferenceCategorySection` (Autonomous multi-select category buttons)
- `RoomMemberList` & `RoomMemberItem` (Renders member readiness, host badge, kick action)
- `AdminTrendChart` (Reusable SVG/canvas trend visualizer)
- `StatCard` (Standard metric card with label, value, trend indicator)

### Micro-Components to Avoid
Do NOT create shallow JSX wrappers with zero independent logic:
- ❌ `EmailLabel`
- ❌ `PasswordLabel`
- ❌ `SubmitButtonText`
- ❌ `OtpDigit1`
- ❌ `PreferenceTitle`

---

## 3. Shared Primitives Catalog (`src/components/ui/`)

These generic primitives must be reused across all features. Do NOT create duplicate feature-local copies:

```text
src/components/ui/
├─ Alert.tsx            # role="alert" with title, description, and semantic status variants
├─ Badge.tsx            # Pill status indicators (brand, saffron, herb, neutral, success, danger, info)
├─ Button.tsx           # Primary CTA, secondary, outline, ghost, destructive with loading states
├─ Card.tsx             # Surface containers with CardHeader, CardTitle, CardContent, CardFooter
├─ Checkbox.tsx         # Accessible custom SVG checkbox with keyboard focus
├─ form-field/          # Compound FormField, FormLabel, FormDescription, FormError with ARIA links
├─ IconButton.tsx       # Touch-friendly icon button requiring accessible aria-label
├─ Input.tsx            # Standard text input with left/right adornments
├─ Label.tsx            # Accessible form label with htmlFor connection
├─ PasswordInput.tsx    # Password input with show/hide toggle
├─ Separator.tsx        # Horizontal/vertical rule with optional center text
└─ Spinner.tsx          # Accessible loading spinner (role="status")
```

---

## 4. Current Feature Component Map

### Auth (`src/features/auth/components/`)
- `LoginForm`, `RegisterForm`, `VerifyEmailForm`, `ChangeEmailForm`
- `VerificationCodeInput`, `SocialAuthButtons`, `TermsConsent`, `ResendCodeControl`

### Home (`src/features/home/components/`)
- `HomeHero`: Primary welcome banner and action hub (FROZEN benchmark)
- `QuickActions`: Create room, join with code, food profile shortcut
- `ActiveSessions`: Cards representing ongoing meal decision sessions

### Room & Lobby (`src/features/room/components/`)
- `RoomLobbyLayout`: Orchestrates room header, member grid, and action bar
- `RoomSummary`: Displays room name, code, host, and QR code modal trigger
- `RoomMemberList` & `RoomMemberItem`: Realtime participant status and host controls
- `InviteSheet`: Bottom sheet / modal for sharing invite link and QR code

### Food Fight (`src/features/food-fight/components/`)
- `MealPreferenceForm`: Category chips, budget slider, dietary notes
- `RestaurantResults`: Displays AI recommended menus, cards, and OK/Pass voting
- `VotingPanel` & `FinalVotePanel`: Realtime ballot casting and tie-break controls
- `WinnerPayoff`: Celebration banner and final selected menu reveal

### Bill & Split (`src/features/bill/components/`)
- `ReceiptStepScreen`: Receipt upload, OCR summary, and manual line-item entry
- `SplitStepScreen`: Item assignment per member, tax/service charge allocation
- `SummaryStepScreen`: Settlement summary, individual totals, PromptPay QR codes
- `BillDetailScreen`: Complete read-only billing overview and payment ledger

### Admin (`src/features/admin/components/`)
- `AdminShell`: Top navigation bar, admin profile, section navigation tabs
- `AdminDashboard`: Platform metrics (users, active rooms, completed sessions)
- `AdminAnalytics`: Period selector, automated insights, KPI cards, and trend charts
- `AdminTrendChart`: Visual line/bar chart for user growth, rooms, and billing volume
- `AdminUsersPage` & `AdminUserDetailPage`: User management and profile inspection
- `AdminRoomsPage` & `AdminRoomDetailPage`: Active/historical room directory
- `AdminBillsPage` & `AdminBillDetailPage`: Bill itemization and settlement tracking
- `StatCard`: Standardized metric card used across Dashboard and Analytics
