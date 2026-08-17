# FoodFighter Frontend Architecture & Specification

## 1. Product Flow & Scope

FoodFighter is an AI-powered group meal decision platform designed to help friend groups quickly resolve "what should we eat?" through preference filtering, AI recommendations, and interactive voting.

### Core User Journey:
1. **Authentication**: Register (with email verification OTP) or Login (Email/Password or Social OAuth: Google/LINE).
2. **Food Profile Onboarding**: 3-step profile (Allergies, Dietary Restrictions, Details).
3. **Session / Room Creation & Joining**: Host creates room with location radius/meal type; members join via 5-character Room Code.
4. **Lobby & Ready Confirmation**: Real-time member list and ready status indicators.
5. **AI Menu Recommendation**: AI analyzes all members' combined food profiles to suggest 2 safe, tailored menu options.
6. **OK / Pass Voting & Tie-Break**: Real-time group voting with automatic tie-break resolution.
7. **Restaurant Discovery & Map**: Display nearby restaurants matching the winning menu with distance, hours, and map pins.
8. **Optional / Future Extensions (per SRS)**: Split Bill and Receipt OCR are documented in SRS as optional future features, not core V1 flows.

---

## 2. UI/UX Reference Authority

- **Authority Hierarchy**: SRS (`docs/Srs-Footfight.md`) is the product truth. The latest owner-approved UI/UX reference PDF is the visual and interaction flow reference.
- **Wireframe vs Brand Authority**: The approved 5-color brand palette (`#FFC6D9`, `#FFE1C6`, `#FFF7AE`, `#48284A`, `#916C80`) is the production color truth. Green tints shown in wireframes are visual-reference artifacts.
- **Brand Personality**: Friendly, warm, food-oriented, clean, mobile-native, and easy to scan without visual noise or excessive decorative effects.

---

## 3. Mobile-First Mandatory Standard

- **Primary Reference Canvas**: 390px portrait.
- **Required Verification Viewports**:
  - `360px` (small Android / compact phones — no horizontal overflow)
  - `375px` (iPhone SE)
  - `390px / 393px` (iPhone standard reference)
  - `430px` (iPhone Pro Max / large Android)
  - `768px` (Tablet / iPad portrait)
  - `Desktop` (Progressive enhancement with bounded container max-width)

### Mobile Layout Baseline:
- Single-column flow on mobile viewports.
- Control heights >= 44px (48–52px preferred for primary form inputs and action buttons).
- Touch target minimum: 44x44px.
- Full-width inputs and primary CTAs on mobile.
- Natural page scrolling; use `min-h-dvh` instead of fixed `100vh` to avoid mobile browser chrome clipping.

---

## 4. Frontend Architecture

### Architecture Layers:
1. **App Router (`src/app/`)**: Route pages and layouts. Routes stay thin (<= 120 lines) and compose feature components.
2. **Feature Modules (`src/features/<feature>/`)**: Domain-specific UI, validation schemas, services, types, and constants.
3. **Generic UI Primitives (`src/components/ui/`)**: Reusable, accessible UI components (Button, Input, Card, Badge, Alert, etc.) with 0 business logic.
4. **Layout Primitives (`src/components/layout/`)**: Structural layouts (`PageContainer`, `AuthLayout`).
5. **Providers (`src/components/providers/`)**: Global application providers (`MotionProvider`).
6. **Technical Infrastructure (`src/lib/`)**: Utility functions (`cn.ts`), motion presets (`transitions.ts`, `variants.ts`).

### Strict Import Direction:
```text
app -> features -> components/ui
app -> components/layout
app -> components/providers
features -> lib
features -> components/ui
```
Generic UI must never import feature code.

---

## 5. Coding Standards & Cleanliness

### Review Thresholds:
- Route page / layout: `<= 120 lines`
- Generic UI component: `<= 180 lines`
- Feature form / component: `<= 220 lines`
- Service / schema / config: `<= 180 lines`

### No-Hardcode Policy:
- Centralize shared constants: routes (`src/config/routes.ts`), brand tokens (`src/styles/tokens.css`), validation rules (`src/features/<feature>/constants/`), API mappings (`src/features/<feature>/services/`).
- Do not hardcode API URLs or backend paths in UI components.
- Single-use presentational copy may remain local.

### TypeScript & Typing:
- Strict TypeScript (`noImplicitAny`, exact types).
- Discriminated unions for multi-state UI flows (loading, error, success, idle).

---

## 6. Bilingual Thai & English Typography

- Primary font loaded via `next/font/google` (Geist Sans) with robust fallbacks to system fonts and `Noto Sans Thai`.
- Ensure comfortable line-height (`leading-relaxed`) to prevent Thai vowel and tone mark clipping.
- Clear semantic hierarchy: Display, Heading 1, Heading 2, Heading 3, Body, Body Small, Label, Caption.
