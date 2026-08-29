# FoodFighter Frontend Logic Placement

> Canonical source for **forms, validation schemas, state management, API service boundaries, realtime subscriptions, and business logic isolation**.

## 1. Logic Separation Principles

Presentation components must remain focused on rendering and user interaction:

```text
UI Component (JSX + user event triggers)
  ↓
Feature Service / Hook (Operation boundary, parameter normalization)
  ↓
Shared Transport (lib/api fetch wrapper, lib/realtime Socket.IO client)
  ↓
Backend API / WebSocket Server
```

---

## 2. Form & Validation Logic

- **Validation Schemas**: Defined using `Zod` and placed in `src/features/<feature>/schemas/` (e.g. `login-schema.ts`, `room-schema.ts`).
- **Form Orchestration**: Implemented using `react-hook-form` + `@hookform/resolvers/zod`.
- **Form Component Role**: Owns input binding, submit state, and field error presentation.
- **Service Boundary**: Form submission immediately delegates values to the feature service (`authService.login(values)`, `roomService.create(values)`).
- **Backend Authority**: Client validation provides immediate user feedback, but the backend remains the final source of truth for validation and security.

---

## 3. State Management Tiers

FoodFighter uses the minimum necessary state scope:

1. **Local State (`useState`, `useReducer`)**:
   - Component-specific UI state: modal visibility, tab selection, input toggles.
2. **Feature State (`Context` / Custom Hooks)**:
   - Scoped feature workflows: multi-step meal preference selection, active room member list, billing step progression.
3. **Global State (`LanguageProvider`)**:
   - Strictly reserved for application-wide primitives: Global TH/EN locale (`useLanguage()`).
   - Avoid bloated monolithic global stores (e.g. Redux / global Zustand).

---

## 4. API & Transport Layer (`src/lib/api/`)

- **Base URL Resolution**: Centralized in `src/config/api.ts` reading `NEXT_PUBLIC_API_URL`.
- **Authentication Headers**: API calls attach `Authorization: Bearer <token>` from localStorage.
- **DTO Transformation**: Feature services map raw backend responses into clean typed frontend models before passing data to UI components.
- **Fail-Closed Safety**: In production mode (`NODE_ENV === "production"`), missing credentials or unconfigured endpoints fail closed gracefully.

---

## 5. Realtime Transport (`src/lib/realtime/`)

- **Socket.IO Singleton**: Centralized WebSocket connection lifecycle in `src/lib/realtime/socket-client.ts`.
- **Feature Subscriptions**: Feature hooks (`useRoomRealtime`, `useFoodFightRealtime`) manage room join events, member status updates, and vote progression.
- **Connection Recovery**: Automatic reconnection with exponential backoff and localized error state presentation.

---

## 6. Team & Product Logic Freeze Policy ("เปลี่ยนหน้าตาได้ แต่ห้ามเปลี่ยนกติกา")

During all visual design, layout refactoring, and UI/UX modernization tasks, **team product logic is strictly frozen**.

### Strict Rules:
- **No State Machine Changes**: Do not modify game stage progressions, room readiness transitions, or vote calculation states.
- **No Payload or API Contract Changes**: Never alter request/response schemas, DTO structures, or endpoint paths.
- **No Permission or Authorization Alterations**: Host vs. Member privileges, admin route guards, and bill owner capabilities must remain exactly as designed.
- **No Validation or Selection Semantics Alterations**: Multi-select limits, "no allergies" exclusivity, custom entry logic, and form schema rules must remain untouched.
- **No Navigation Routing Alterations**: Routes, query parameters, redirect callbacks, and step navigation sequences are locked.
