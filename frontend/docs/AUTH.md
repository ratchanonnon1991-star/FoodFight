# FoodFighter Frontend Authentication Specification

> Canonical source for **frontend authentication flows, route specifications, session boundaries, and integration state**.

## 1. Scope & Architecture Boundary

- **Scope**: Frontend authentication UI, validation schemas, auth context, token storage, and typed service boundaries.
- **Feature Location**: `src/features/auth/`
- **Route Location**: `src/app/(auth)/`
- **Canonical Routes**:
  - `/login` — Login screen
  - `/register` — Registration screen
  - `/verify-email` — 6-digit OTP verification screen
  - `/change-email` — Email update challenge screen

---

## 2. Authentication Flows & Requirements

### 1. Register (`/register`)
- **Fields**:
  - `Name`: Required, non-empty.
  - `Email`: Required, valid email format regex, server duplicate email error representation.
  - `Password`: Required, show/hide toggle, policy: minimum 8 characters, lowercase letter, uppercase letter, number.
  - `Confirm Password`: Required, show/hide toggle, must match Password exactly.
  - `Terms & Privacy Consent`: Checkbox consent required before registration submission.
- **Actions**:
  - `Create Account`: Submits form with loading state; transitions to `/verify-email` on success.
  - `Social OAuth`: "Continue with Google" and "Continue with LINE" buttons.
  - `Login Link`: Navigation to `/login`.

### 2. Verify Email OTP (`/verify-email`)
- **UI & Behavior**:
  - 6-digit OTP entry cells with auto-focus / backspace keyboard navigation.
  - Masked destination email (e.g. `u***@example.com`) with "Change email" action.
  - Expiry countdown timer (presentation only; backend is authoritative).
  - `Verify OTP` button with loading state.
  - Resend OTP countdown cooldown (60s) and resend action.
  - Transitions to verification success and redirects to onboarding or login.
- **Important Distinction**: Registration email verification is strictly email ownership verification, **NOT** login Two-Factor Authentication (2FA).

### 3. Change Email (`/change-email`)
- `New Email` input with format validation.
- `Send Code` button (triggers new OTP request).
- `Cancel` button (returns to `/verify-email`).

### 4. Login (`/login`)
- **Fields**: `Email` & `Password` with show/hide toggle.
- **Actions**:
  - `Forgot Password`: Accessible link control.
  - `Login`: Submits credentials, stores JWT access token in `localStorage`, updates user profile, redirects to home (`/`).
  - `Social OAuth`: "Continue with Google" and "Continue with LINE".
  - `Sign Up Link`: Navigation to `/register`.

---

## 3. Session & RBAC Integration

- **Token Storage**: JWT `accessToken` is stored in browser `localStorage`.
- **Bearer Authentication**: API calls attach `Authorization: Bearer <accessToken>`.
- **Profile Verification**: The application verifies active session via `GET /auth/me`.
- **Role System**:
  - `Role.USER`: Standard authenticated member access.
  - `Role.ADMIN`: Grants access to the `/admin/*` portal protected by `AdminRouteGuard`.
  - Non-admins attempting to access `/admin/*` are redirected to `/`.

---

## 4. Current Status & Gap Ledger

| Capability | Status | Notes |
|---|---|---|
| **Registration Flow** | `IMPLEMENTED` | UI, schema, and API service wired |
| **Email OTP Verification** | `IMPLEMENTED` | 6-box input, timer, resend cooldown |
| **Change Email Flow** | `IMPLEMENTED` | Scoped email update screen |
| **Login Flow** | `IMPLEMENTED` | Email/password login and token storage |
| **Social OAuth (Google/LINE)** | `PARTIAL` | Frontend buttons wired to OAuth redirect endpoints |
| **RBAC / Admin Protection** | `IMPLEMENTED` | `AdminRouteGuard` enforces `Role.ADMIN` |
| **Forgot Password Flow** | `REFERENCE_GAP` | Affordance rendered; detailed reset workflow deferred |
| **Terms & Privacy Pages** | `ROUTE_GAP` | Rendered inline; dedicated standalone legal pages deferred |
| **Login 2FA** | `NOT_IMPLEMENTED` | Future requirement (distinct from registration OTP) |
