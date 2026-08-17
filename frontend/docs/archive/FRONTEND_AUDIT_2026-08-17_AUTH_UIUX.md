# FoodFighter Frontend Audit — Auth + UI/UX Reference

## Verdict

**PASS TO CONTINUE WITH REPAIRS.**

The project has enough product and UI reference material to continue frontend Auth, but the frontend governance must be tightened before implementation expands.

This audit is frontend-only.

## Evidence from the latest FoodFighter reference PDF

### Registration

Pages 1-3 define/register:
- Name,
- Email,
- Password,
- Confirm Password,
- Terms + Privacy consent,
- Create Account,
- Google,
- LINE,
- Login link,
- validation/error states.

The PDF explicitly states:
- email is required and validated,
- duplicate email must be handled,
- email is used for OTP,
- password is required,
- password policy is at least 8 characters and includes lowercase, uppercase, and a number,
- password confirmation must match,
- Terms/Privacy consent is required before registration,
- Create Account sends OTP and moves to Verify Email,
- loading prevents duplicate submission.

### Registration email verification

Pages 4-9 define:
- 6-digit OTP,
- masked destination email,
- change-email action,
- expiry countdown,
- resend countdown,
- invalid-code state,
- expired-code state,
- Change Email page,
- success confirmation + redirect.

This is **email verification**, not automatically the same thing as login 2FA.

### Login

Pages 10-11 define:
- brand/logo,
- Email,
- Password,
- show/hide password,
- Forgot Password,
- Login,
- Google,
- LINE,
- Register link,
- loading/duplicate-submit prevention,
- invalid email/password error,
- no Remember Me requirement.

### Post-auth onboarding

Pages 12-17 show a 3-step Food Profile onboarding:
1. Allergies,
2. Restrictions,
3. Details.

Auth should route toward onboarding based on account/application state, but the onboarding implementation is a separate frontend feature.

### Mobile UI direction

Pages 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25-27 consistently use a portrait-phone layout:
- single primary content column,
- compact top navigation/back action,
- large full-width form controls and CTAs,
- vertically stacked content,
- strong bottom actions/navigation on product screens,
- restrained card/surface grouping,
- simple icons,
- clear heading hierarchy.

This supports a mobile-first implementation strategy.

## Important conflicts / gaps

### 1. Color reference conflict

The approved owner palette is:

```text
#FFC6D9
#FFE1C6
#FFF7AE
#48284A
#916C80
```

The latest PDF wireframes are mostly monochrome, while pages 25-27 introduce green actions/status accents.

Therefore:
- treat PDF layout/UX as authoritative reference,
- preserve the owner-approved palette as color authority,
- do not introduce green into the production theme unless the owner explicitly promotes it.

### 2. Email verification vs 2FA

The SRS says the system supports 2FA.
The latest detailed Auth PDF specifies email OTP verification after registration.

Do not merge these into one flow by assumption.

Current bounded Auth task should implement the detailed registration email-verification UI.
A separate login-2FA flow requires an explicit contract/design if it is still required.

### 3. Forgot Password

The latest PDF says Forgot Password is Must Have on Login, but no detailed Forgot Password screens are provided.

For current Auth:
- show the link/control when required,
- do not invent a full reset workflow without product/API contract,
- report the missing detailed flow.

### 4. Backend/API contract

The PDF Day 1 split assigns backend work to other team members:
- Register/Login API,
- hash/session,
- `/auth/me`,
- logout,
- OTP send/resend/expire,
- Google/LINE OAuth.

Frontend may integrate with available contracts, but must not create or modify backend implementation.

## Main frontend architecture risks

- large route files mixing data, copy, validation, state, and layout,
- duplicated hard-coded routes/colors/validation rules,
- Auth-specific UI leaking into generic `components/ui`,
- desktop-first layouts,
- confusing email verification OTP with 2FA,
- creating backend code when an endpoint is missing,
- overlong files that become difficult for humans/AI to review.

## Repair recommendation

Proceed in this order:

1. update frontend governance docs,
2. verify `/design-system` is separate and mobile-first,
3. confirm semantic typography/contrast,
4. freeze Auth file map,
5. implement frontend Auth UI/state,
6. integrate only against existing backend contracts,
7. report backend gaps instead of filling them.
