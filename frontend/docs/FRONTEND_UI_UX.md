# FoodFighter Frontend UI/UX Rules — Visual System V2

> **Canonical source of truth** for visual tone, mobile-first standards, interaction state contracts, asset decision workflows, accessibility, and area emotional character.

---

## 1. Core Visual Direction: Warm Social Food Game (Visual System V2)

FoodFighter is designed to be **warm, food-forward, social, tactile, and energetic**.

### Desired Emotional Qualities:
- **Warmth & Appetite**: Earthy, appetizing food palettes anchored by Rice Canvas (`#F4EEE3`) and Brand Chili (`#D84A32`).
- **Tactility & Dimensionality**: Physical, layered cards with downward-biased elevation, responsive hover lift, and physical active compression.
- **Social Modernity**: Strategic Liquid Glass chrome and floating menus that elevate the feeling of a premium social app.

### Emotional Character by Product Area:

| Area | Route | Emotional Character & Tone | Surface Strategy |
|---|---|---|---|
| **Landing & Auth** | `/`, `/login`, `/register` | Clean, welcoming, warm, confident. | Solid Tactile Card with Level 1/3 depth. |
| **Home Hub** | `/` (Authenticated) | Warm brand hub, social activity cards, inspiration. | Hero Atmosphere + Solid Cards + Glass Nav. |
| **Room Lobby** | `/room/[id]` | Social anticipation, participant readiness, invite sharing. | Feature Atmosphere + Solid Member Cards. |
| **Create Room** | `/room/create` | Task-focused utility, location precision, settings clarity. | Feature Atmosphere + Solid Tactile Form Cards. |
| **Food Profile** | `/food-profile/*` | Unified 3-step dietary journey, safe, clear, validated. | Solid Tactile Cards (`Herb` confirmed states). |
| **Meal Preference** | `/food-fight/[id]/preferences` | Tactile, food-forward category chips, dietary ease. | Solid Category Grid + Level 2 Selectable Cards. |
| **Recommendations** | `/food-fight/[id]/recommendations` | Hero food moment, appetizing imagery, clear AI explanation. | Feature Hero Card + Appetizing Imagery. |
| **Voting** | `/food-fight/[id]/voting` | Friendly competitive energy, responsive OK/Pass actions. | Level 3 Voting Arena Hero Card. |
| **Final Result / Winner** | `/food-fight/[id]/result` | Celebration, payoff, menu announcement, restaurant discovery. | Hero Spotlight + Confetti / Celebration Layer. |
| **Bills & Splitting** | `/bill/[id]` | Utility, precision, transparency, trust first. | Solid Tactile Data Cards (No glass distortion). |
| **Profile** | `/profile` | Personal food identity, dietary profile settings. | Solid Tactile Preference Panels. |
| **Admin Console** | `/admin/*` | Professional, restrained version of warm design system. | Solid Tactile Management Tables. |

---

## 2. Mobile-First Standards & Viewports

- **Primary Reference Width**: `390px` (iPhone standard reference baseline).
- **Core Viewport Breakpoints**:
  - `360px` — Compact Android (Ensure zero horizontal overflow)
  - `375px` — Small iOS (iPhone SE)
  - `390px / 393px` — Baseline standard iOS/Android
  - `430px` — Large mobile (Pro Max / Plus)
  - `768px` — Tablet / Split layouts
  - `1440px` — Desktop (Max-width bounded containers)
- **Viewport Height**: Always use `min-h-dvh` instead of `100vh` to prevent mobile browser URL bar clipping.
- **Touch Target Minimum**: Minimum interactive touch area must be at least `44x44px`.

---

## 3. Interaction State Contract

Every user action **MUST** produce clear, immediate, and unambiguous visual feedback.

### Required State Specifications:
1. **DEFAULT**: Resting elevation, clear warm-neutral border (`border-border`), and high text contrast.
2. **HOVER**: Small physical lift (`-translate-y-0.5`), elevated drop shadow (`--shadow-md`), and luminous surface tint (`bg-surface` or `bg-surface-subtle`).
3. **PRESSED / ACTIVE**: Physical downward return (`translate-y-0` or `active:scale-[0.98]`) with reduced contact shadow (`--shadow-xs`).
4. **FOCUS / FOCUS-VISIBLE**: Crisp, high-contrast outline (`focus-visible:outline-2 focus-visible:outline-focus-ring outline-offset-2`).
5. **SELECTED / CHECKED**: Persistent state signaled via **multiple redundant cues**:
   - Background tint (e.g. Herb/green tint `bg-status-success-bg/35` for preferences).
   - Border/Rim accent (e.g. `border-accent-fresh`).
   - Visual indicator (solid green circle/squircle).
   - Icon (crisp white checkmark).
   - Typography (bold text primary).
   *(Never rely on color alone).*
6. **SUBMITTED / CONFIRMED**: Persistent confirmed highlight and momentary tactile pulse.
7. **LOADING**: `aria-busy="true"`, loading spinner or skeleton pulse, disabled interaction triggers.
8. **DISABLED**: `disabled:opacity-50 disabled:pointer-events-none disabled:shadow-none disabled:transform-none`.
9. **ERROR**: `border-status-danger-icon`, error alert banner, `aria-invalid="true"`, and associated form error message.

---

## 4. Semantic Color Split & Roles

- **Brand Chili (`#D84A32` / `#D0432B`)**: Primary CTA buttons (`Next`, `Save`, `Create Room`), active step progress, and active journey highlights.
- **Herb Fresh (`#68784D` / `accent-fresh`)**: Selected preference cards, verified tags, room ready checkmarks, confirmed success states.
- **Saffron Energy (`#F2AF32`)**: Informational notice alerts, secondary energy accents, and warm highlights.
- **Rice Canvas (`#F4EEE3`)**: Global warm page canvas.
- **Surface White (`#FFFFFF`)**: Primary solid tactile elevated cards and form containers.
- **Deep Ink (`#211D19`)**: Primary text headings, body reading copy, and high-contrast boundaries.

---

## 5. Mandatory Asset Decision Workflow

To maintain visual quality and prevent generic stock dilution, all custom imagery follows a strict project workflow:

```text
┌────────────────────────────────────────────────────────────────────────┐
│                     ASSET DECISION GATEWAY WORKFLOW                    │
├────────────────────────────────────────────────────────────────────────┤
│ 1. Evaluate Page/Section Need:                                         │
│    • ASSET_NEEDED                                                      │
│    • ASSET_OPTIONAL                                                    │
│    • ASSET_NOT_NEEDED                                                  │
├────────────────────────────────────────────────────────────────────────┤
│ 2. If ASSET_NEEDED:                                                    │
│    • STOP implementation.                                              │
│    • Define specification WITH THE OWNER:                              │
│      - Subject matter, purpose, exact DOM placement                    │
│      - Aspect ratio (e.g. 1:1, 16:9, 4:3), safe-area margins           │
│      - Style (Warm FoodFighter vector / hand-drawn food art)           │
│      - Transparency vs textured background                             │
│      - Mobile crop vs desktop display                                  │
│    • Generate asset WITH OWNER.                                        │
│    • Owner reviews & grants EXPLICIT APPROVAL.                         │
│    • Integrate approved asset into codebase and resume implementation. │
├────────────────────────────────────────────────────────────────────────┤
│ 3. PROHIBITED:                                                         │
│    ❌ NO silent generic stock image placeholders.                      │
│    ❌ NO random unsplash/internet image substitution.                  │
└────────────────────────────────────────────────────────────────────────┘
```

### Surface Asset Guidance:
- **Asset-Heavy Surfaces**: Authenticated Home (Mood Carousel, Create/Join hero cards), Meal Recommendations, Winner Payoff Announcement.
- **Optionally Accented**: Room Lobby, Create Room decorative spices/illustrations.
- **Image-Light / Utility**: Food Profile 3-Step, Bills & Itemized Splitting, Admin Management Tables, Form Inputs.

---

## 6. Global Architecture vs. Feature-Local Boundaries

```text
┌───────────────────────────────────┬────────────────────────────────────┐
│      GLOBAL RESPONSIBILITY        │     FEATURE-LOCAL RESPONSIBILITY   │
├───────────────────────────────────┼────────────────────────────────────┤
│ • Canonical color palette         │ • Page-specific content hierarchy  │
│ • Surface hierarchy & tokens      │ • Layout arrangement & column span │
│ • Liquid Glass material specs     │ • Domain state to semantic mapping │
│ • Elevation & shadow geometry     │ • Purpose-built food illustrations │
│ • Illuminated rim specifications  │ • Map & location picker controls   │
│ • Motion timings & reveal easing  │ • Winner presentation celebration  │
│ • Shared navigation capsules      │ • Restaurant detail presentation   │
└───────────────────────────────────┴────────────────────────────────────┘
```

> **Core Principle**: "GLOBAL VISUAL VOCABULARY DOES NOT MEAN IDENTICAL PAGE DESIGN." Every feature adapts the shared design system to its domain needs without breaking global consistency.

---

## 7. Accessibility & Performance Guardrails

- **Contrast**: Maintain minimum WCAG AA (`4.5:1`) for normal text and AAA (`7:1`+) for body copy against Rice/White.
- **Focus Indicators**: Never suppress `focus-visible`. Interactive controls must have clear focus rings.
- **Screen Reader Support**: All visual icons require `aria-hidden="true"` or paired `aria-label` screen reader copy.
- **Performance Guardrails**:
  - Max 1-2 simultaneous glass layers (strictly NO nested backdrop-filters).
  - Atmospheric backgrounds use CSS gradients, never large unoptimized blurred raster images.
  - Reduced Motion fallback disables all spatial scaling and delivers instant transitions.
