# FoodFighter Frontend Logic Placement

> Read this file for forms, validation, state, API calls, authentication, realtime behavior, and hooks.

## 1. Main rule

Presentation should not own every layer of logic.

Preferred flow:

```text
UI
  ↓
feature service/action
  ↓
shared API/realtime transport
  ↓
backend
```

Validation:

```text
Form
  ↓
Schema
```

---

## 2. Form responsibility

A form may own:

- form state,
- field composition,
- submit orchestration,
- local loading state,
- user-facing field/form errors.

A form should not own:

- hard-coded backend URL,
- large response DTO conversion,
- token storage,
- backend business-rule duplication,
- Socket.IO connection infrastructure.

---

## 3. Validation schema

Put reusable form validation in a schema file.

Examples:

```text
auth.schema.ts
food-profile.schema.ts
room.schema.ts
```

Schema may own:

- required fields,
- email format,
- password client policy,
- cross-field checks,
- input normalization appropriate for client validation.

Backend remains authoritative for server-side truth.

---

## 4. API/service layer

Feature components should call a clear operation boundary.

Example:

```ts
const result = await authService.login(values);
```

Do not put this inside UI:

```ts
fetch("http://localhost:3001/auth/login", ...)
```

Shared transport belongs in `src/lib/api/`.

Feature-specific mapping belongs near the feature service/API adapter.

---

## 5. Backend DTO mapping

Backend response/request shapes should not spread through presentation code.

Preferred:

```text
backend DTO
  ↓
feature API/service mapper
  ↓
frontend domain/result
  ↓
UI
```

Do not make every component understand HTTP status codes and backend field names.

---

## 6. Error placement

Use the smallest correct scope.

### Field error

Near the field.

### Form/server error

Inside the form.

### Page error

Route/page error state.

### Realtime connectivity problem

Inside the affected realtime feature.

Do not use a global toast for every failure.

---

## 7. Local state

Keep state local when only one component needs it.

Examples:

- password visibility,
- modal open/closed,
- temporary selection.

Do not promote simple local state into context/store without need.

---

## 8. Shared feature state

Use context/store only if multiple components/routes genuinely need the same state.

A context should have a clear feature responsibility.

Do not turn one context into a global bucket for unrelated state.

---

## 9. Server state

Backend is source of truth for persisted and multi-user state.

Examples:

- room membership,
- readiness,
- active member status,
- vote counts,
- winner,
- profile completion.

Frontend may display or optimistically interact where appropriate, but must not independently redefine backend truth.

---

## 10. Realtime

Keep connection infrastructure separate from feature interpretation.

Preferred:

```text
lib/realtime/socket-client.ts
        ↓
room feature hook/service
        ↓
Room/Lobby components
```

Do not register duplicate Socket.IO listeners in every nested component.

Do not put domain meaning such as Head/Ready inside generic realtime infrastructure.

---

## 11. Hooks

Create a hook when it isolates real React behavior.

Good:

```text
useCountdown
useRoomConnection
useDebouncedValue
```

Usually unnecessary:

```text
useRegisterTitle
useSubmitText
useSingleBooleanUsedOnce
```

Keep trivial local behavior local.

---

## 12. Authentication

Registration email verification is separate from future login 2FA.

Do not store:

- raw password,
- OTP,
- access token,
- refresh token

in generic client state unless the real architecture explicitly requires it and the security model supports it.

A temporary mock boolean is not a production security boundary.

---

## 13. Food Profile vs Meal Preference

Food Profile:

- long-lived user food information,
- allergy/diet/restriction profile.

Meal Preference:

- current session preference.

Keep their models and UI responsibilities distinct.

---

## 14. Room/Lobby logic

Room feature may interpret:

- room data,
- Head,
- member list,
- Ready state,
- Active Member presentation,
- invite/start interactions.

Do not move these concepts into generic UI components.

Backend/session contract remains authoritative.

---

## 15. Voting logic

Voting feature may own:

- OK/Pass interaction,
- vote progress presentation,
- Recommend Again action,
- Final Vote UI,
- tie-break presentation.

Do not silently duplicate backend winner/threshold rules inside visual components.

---

## 16. Client/Server boundary

Use `"use client"` only when required.

Client components are appropriate for:

- form hooks,
- interaction handlers,
- browser APIs,
- client state.

Keep route/page components server-compatible when practical.

---

## 17. Avoid magic abstractions

Do not introduce by default:

- generic form generators,
- command buses,
- global action registries,
- complicated repository patterns in the browser,
- custom frontend event frameworks.

Use an abstraction only after a real repeated problem exists.

Explicit code is preferred.
