# FoodFighter Frontend Plan Checklist — Design-System Repair → Auth

## Phase A — Read-only audit

- [ ] Confirm working directory is `frontend`.
- [ ] Confirm current branch and Git status.
- [ ] Confirm no backend files are modified.
- [ ] Read latest SRS.
- [ ] Read latest UI/UX reference PDF.
- [ ] Inspect current `/design-system`.
- [ ] Inspect current `/`.
- [ ] Inspect `globals.css`.
- [ ] Inspect tokens and typography.
- [ ] Inspect existing UI primitives.
- [ ] Inspect Next/Tailwind versions.
- [ ] Inspect package scripts.
- [ ] Inspect current Auth code if any.
- [ ] Inspect actual backend API contract only as read-only dependency information.

## Phase B — Governance/document repair

- [ ] Merge/update `AGENTS.md`.
- [ ] Add/update `FRONTEND_UI_UX_REFERENCE.md`.
- [ ] Add/update `FRONTEND_MOBILE_FIRST.md`.
- [ ] Add/update `FRONTEND_CODING_STANDARDS.md`.
- [ ] Update `FRONTEND_AUTH.md`.
- [ ] Update `FRONTEND_FILE_MAP.md`.
- [ ] Record email-verification OTP vs 2FA distinction.
- [ ] Record frontend-only mutation boundary.
- [ ] Record file-size thresholds.
- [ ] Record no-hardcode policy.

## Phase C — Design-system readiness

- [ ] `/design-system` remains separate from `/`.
- [ ] Design-system page is mobile-first.
- [ ] 360px has no horizontal overflow.
- [ ] Primary reference at 390px is usable.
- [ ] Text contrast is readable.
- [ ] Thai text is not clipped.
- [ ] typography hierarchy exists.
- [ ] semantic colors/tokens are centralized.
- [ ] Motion/reduced-motion is correct.
- [ ] Auth-required primitives exist:
  - [ ] Button
  - [ ] Input
  - [ ] PasswordInput
  - [ ] Checkbox
  - [ ] Label
  - [ ] Alert
  - [ ] Spinner
  - [ ] Separator
  - [ ] FormField
  - [ ] AuthLayout

## Phase D — Auth architecture

- [ ] Create/confirm `(auth)` route group.
- [ ] Create/confirm `features/auth`.
- [ ] Centralize auth policy.
- [ ] Centralize validation.
- [ ] Centralize auth service boundary.
- [ ] Centralize route constants if needed.
- [ ] No component contains hard-coded backend URL.
- [ ] No frontend code mutates backend.

## Phase E — Register

- [ ] Name.
- [ ] Email.
- [ ] Password.
- [ ] Confirm Password.
- [ ] Terms/Privacy consent.
- [ ] password policy hints.
- [ ] show/hide password.
- [ ] client validation.
- [ ] duplicate-email error mapping.
- [ ] loading/duplicate-submit prevention.
- [ ] Google.
- [ ] LINE.
- [ ] Login navigation.
- [ ] 360/390/430 mobile verification.

## Phase F — Verify Email

- [ ] 6-digit input.
- [ ] masked email.
- [ ] Change Email action.
- [ ] countdown presentation.
- [ ] Verify action.
- [ ] invalid-code state.
- [ ] expired-code state.
- [ ] resend cooldown.
- [ ] resend available.
- [ ] loading state.
- [ ] success state.
- [ ] backend remains validity source of truth.

## Phase G — Change Email

- [ ] new email field.
- [ ] validation.
- [ ] important/security notice.
- [ ] Send Code.
- [ ] Cancel.
- [ ] loading.
- [ ] returned verification state uses new email.

## Phase H — Login

- [ ] Email.
- [ ] Password.
- [ ] show/hide.
- [ ] Forgot Password control.
- [ ] Login.
- [ ] Google.
- [ ] LINE.
- [ ] Sign up.
- [ ] invalid credentials.
- [ ] loading/duplicate-submit prevention.
- [ ] no Remember Me.
- [ ] 360/390/430 mobile verification.

## Phase I — Post-auth boundary

- [ ] Auth success can route using profile-completion state.
- [ ] Food Profile UI is not implemented inside Auth.
- [ ] incomplete profile → onboarding contract.
- [ ] complete profile → Home contract.
- [ ] no local-only guess if server/application truth exists.

## Phase J — Verification

- [ ] typecheck.
- [ ] lint.
- [ ] build.
- [ ] relevant tests.
- [ ] keyboard.
- [ ] reduced motion.
- [ ] mobile screenshots/manual checks.
- [ ] Git diff.
- [ ] confirm `backend/**` untouched.
- [ ] atomic frontend commit.
