# FoodFighter — Frontend Auth Start Prompt

You are continuing FoodFighter frontend work as the Senior Frontend Authentication Engineer.

Working root:

```text
C:\devnest 101\FoodFight\frontend
```

## Hard boundary

You may modify:

```text
frontend/**
```

You must never modify:

```text
backend/**
NestJS
Prisma
database/migrations
backend auth
backend env/config
```

If an API/backend capability is missing, report it as a dependency.

## Step 1 — Audit before implementation

Run:

```powershell
git branch --show-current
git status --short
git diff --stat
```

Read:

```text
AGENTS.md
docs/Srs-Footfight.md
docs/FRONTEND_AUDIT_2026-08-17_AUTH_UIUX.md
docs/FRONTEND_UI_UX_REFERENCE.md
docs/FRONTEND_MOBILE_FIRST.md
docs/FRONTEND_CODING_STANDARDS.md
docs/FRONTEND_AUTH.md
docs/FRONTEND_FILE_MAP.md
docs/FRONTEND_PLAN_CHECKLIST.md
agents/frontend-auth-agent.md
skills/foodfighter-frontend-auth/SKILL.md
```

Inspect:
- current `/design-system`,
- shared UI primitives,
- `globals.css`,
- tokens/typography,
- existing auth routes/features,
- `package.json`,
- actual backend auth contract read-only if available.

Return a short audit + implementation plan before writing code.

## Step 2 — Mobile-first target

Design from 390px first.

Verify:
- 360,
- 390/393,
- 430,
- desktop.

No horizontal overflow.
Touch targets >=44px.
Inputs and primary actions are full-width on mobile.

## Step 3 — Required current Auth UI

Implement only against actual available backend contracts.

### Register

Reference requirements:
- Name required,
- Email required + email format,
- duplicate email error mapping,
- Password required,
- password policy: min 8 + lowercase + uppercase + number,
- Confirm Password required + match,
- show/hide password,
- Terms/Privacy required,
- Create Account,
- loading/duplicate-submit prevention,
- Google,
- LINE,
- Login link.

### Verify Email

- 6-digit OTP,
- masked email,
- Change Email,
- expiry presentation,
- Verify,
- invalid code,
- expired code,
- resend cooldown/available,
- loading,
- success state.

Backend remains validity/expiry source of truth.

### Change Email

- New email,
- validation,
- explanation/security notice,
- Send Code,
- Cancel,
- loading.

### Verification Success

- clear success state,
- short redirect/progress treatment.

Do not hard-code an arbitrary long redirect delay.

### Login

- Email,
- Password,
- show/hide,
- Forgot Password control,
- Login,
- Google,
- LINE,
- Sign up,
- loading,
- invalid credentials.

Do not add Remember Me.

## Step 4 — Critical architecture rules

Use shared design-system primitives.

Keep domain code under:

```text
src/features/auth/
```

Keep route files thin.

Centralize:
- auth routes,
- password/OTP policy,
- validation,
- service/API mapping.

Do not hard-code backend URLs in components.

Do not create a giant form/page file.

Review:
- route >120 lines,
- normal component >180,
- feature form >220.

Split only when responsibilities are actually mixed.

## Step 5 — Do not conflate flows

Registration email verification OTP is NOT automatically login 2FA.

Implement the detailed email verification reference.

If separate 2FA UI/contract does not exist, report it as a separate open requirement.

## Step 6 — Post-auth boundary

Do not implement Food Profile inside Auth.

After successful auth, use existing application/backend state to decide:
- profile incomplete → onboarding,
- profile complete → Home.

If the contract is missing, report it.

## Step 7 — Verification

Run applicable:

```powershell
pnpm exec tsc --noEmit
pnpm lint
pnpm build
```

Run tests if present.

Manual:
- Register 360/390/430,
- Verify Email 360/390/430,
- Change Email,
- Login 360/390/430,
- keyboard/focus,
- loading/error,
- reduced motion.

Then:

```powershell
git status --short
git diff --stat
git diff
```

Confirm:

```text
backend mutations: NONE
```

## Final report

```text
STATUS:
BRANCH:

AUDIT:
PLAN_EXECUTED:

FILES_CREATED:
FILES_MODIFIED:

REGISTER:
VERIFY_EMAIL:
CHANGE_EMAIL:
VERIFICATION_SUCCESS:
LOGIN:
SOCIAL_AUTH:
AUTH_STATE:

HARDCODE_REVIEW:
FILE_SIZE_REVIEW:

MOBILE:
- 360:
- 390:
- 430:
- desktop:

BACKEND_MUTATIONS:
NONE

BACKEND_DEPENDENCIES_FOUND:

VERIFICATION:
- typecheck:
- lint:
- build:
- tests:
- manual:
- git diff:

FINAL_GIT_STATE:
COMMIT_SHA:

NEXT_BOUNDED_TASK:
```
