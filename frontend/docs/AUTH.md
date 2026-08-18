# FoodFighter Frontend Authentication Specification

## 1. Scope & Architecture Boundary

- **Scope**: Frontend authentication UI, validation, auth state integration, and typed service boundaries.
- **Strict Boundary**: Frontend only. Never create or edit backend files (`backend/**`). Missing backend endpoints/capabilities must be documented as dependencies.
- **Feature Location**: `src/features/auth/`
- **Route Location**: `src/app/(auth)/`

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
  - `Create Account`: Validates all fields, shows loading spinner on submission, prevents duplicate submissions. On success, transitions to `/verify-email`.
  - `Social OAuth`: "Continue with Google" and "Continue with LINE" buttons.
  - `Login Link`: "Already have an account? Log in".

### 2. Verify Email OTP (`/verify-email`)
- **UI & Behavior**:
  - 6-digit OTP entry cells with auto-focus / backspace support.
  - Masked destination email (e.g. `p***@example.com`) with a "Change email" action.
  - Expiry countdown timer (presentation only).
  - `Verify OTP` button with loading state.
  - Resend OTP countdown cooldown (e.g. 60s) and resend action.
  - Invalid code and expired code error feedback.
  - Transitions to verification success on server approval.
- **Source of Truth**: The backend is the sole source of truth for OTP expiration and validity. The frontend timer is strictly presentational.

### 3. Change Email (`/change-email`)
- **UI & Behavior**:
  - `New Email` input with format validation.
  - Security / explanatory notice.
  - `Send Code` button (initiates new OTP request).
  - `Cancel` button (returns to `/verify-email`).

### 4. Verification Success
- Clear success icon, "Email Verified!", brief confirmation message, and immediate/short progress transition to onboarding or login.

### 5. Login (`/login`)
- **Fields**:
  - `Email`: Required, valid format.
  - `Password`: Required, show/hide toggle.
- **Actions**:
  - `Forgot Password`: Accessible link control.
  - `Login`: Validates fields, loading state, invalid credentials error presentation.
  - `Social OAuth`: "Continue with Google" and "Continue with LINE".
  - `Sign Up Link`: "Don't have an account? Sign up".
- **Note**: Remember Me is explicitly NOT required per the UI reference.

---

## 3. Important Distinctions & Gaps

### Registration Email Verification vs 2FA
- Registration email verification OTP is **NOT** login 2FA.
- Component names must use `EmailVerificationForm` / `VerifyEmail`, **not** `TwoFactorForm`.
- If login 2FA is needed in the future, it will be designed as a separate flow.

### Forgot Password Reference Gap
- `REFERENCE_GAP: Forgot Password detailed workflow not provided in UI reference PDF`.
- Safe implementation: Render the accessible "Forgot password?" link on `/login`. Do not invent backend reset workflows without contract approval.

### Post-Auth Onboarding Boundary
- First-time users navigate to Food Profile onboarding (`/onboarding`), while users with completed profiles navigate to Home (`/`).
- Auth does not implement Food Profile UI; it only handles navigation routing based on the user's profile status.

---

## 4. Feature Folder Structure & Service Architecture

- **Mock Adapter**: Frontend Auth uses a temporary `MockAuthService` (`src/features/auth/mocks/`) while backend APIs are unavailable.
- **Frontend Only**: Mock behavior is strictly frontend-only; production backend remains the source of truth.
- **Runtime Selector & Fail-Closed Safety**: `src/features/auth/services/auth-runtime.ts` resolves `NEXT_PUBLIC_AUTH_MODE`. In production (`NODE_ENV === "production"`), missing `NEXT_PUBLIC_AUTH_MODE` strictly fails closed and never silently defaults to mock. API mode fails closed until the backend adapter is integrated. Development mode (`NODE_ENV !== "production"`) falls back to `"mock"` for local developer convenience.
- **Auth Flow Context**: `src/features/auth/context/auth-flow-context.tsx` manages scoped verification challenge state (`EmailVerificationChallenge`) and transient mock authentication completion (`isAuthenticated`) across auth route transitions. This is temporary mock flow state only and does NOT represent a real backend session, JWT, or authenticated security boundary.

```text
src/features/auth/
├── components/
│   ├── AuthSessionFallback.tsx
│   ├── ChangeEmailForm.tsx
│   ├── LoginForm.tsx
│   ├── RegisterForm.tsx
│   ├── ResendCodeControl.tsx
│   ├── SocialAuthButtons.tsx
│   ├── TermsConsent.tsx
│   ├── VerificationCodeInput.tsx
│   ├── VerificationSecurityNotice.tsx
│   ├── VerificationSuccess.tsx
│   └── VerifyEmailForm.tsx
├── constants/
│   └── auth-policy.ts
├── context/
│   └── auth-flow-context.tsx
├── hooks/
│   └── use-countdown.ts
├── mocks/
│   ├── mock-auth-scenarios.ts
│   └── mock-auth-service.ts
├── schemas/
│   ├── change-email-schema.ts
│   ├── login-schema.ts
│   ├── register-schema.ts
│   └── verify-email-schema.ts
├── services/
│   ├── auth-runtime.ts
│   └── auth-service.ts
└── types/
    └── auth-types.ts
```

---

## 5. Mobile-First Standard for Auth

- Single-column layout on mobile viewports.
- All form inputs, social buttons, and primary CTAs are 100% width on phone screens (`360px`–`430px`).
- Interactive touch targets >= `44x44px`.
- Desktop presentation centers bounded auth card (`max-w-md`) within `AuthLayout`.

---

## 6. Gap Ledger & Mock Flow Status

- **FRONTEND_AUTH_MOCK_STATUS**: `COMPLETE` (All 5 reference auth screens, social actions, mock service adapter, and recoverable fallbacks verified).
- **PRODUCTION_AUTH_STATUS**: `NOT_COMPLETE` (Real backend API adapter and session persistence pending).
- **FORGOT_PASSWORD**: `REFERENCE_GAP / BACKEND_CONTRACT_GAP` (Accessible affordance rendered; reset flow deferred until design reference is supplied).
- **TERMS & PRIVACY**: `ROUTE_GAP` (Rendered inline with semantic styling; dedicated legal pages deferred).
- **2FA**: `NOT_IMPLEMENTED` (Registration OTP is strictly email verification, not login 2FA).
- **BACKEND_INTEGRATION_GAPS**: Register, OTP, Change Email, Login, Google OAuth, LINE OAuth, JWT session, and post-auth Food Profile onboarding routing.
