# FoodFighter UX Prototype — Assets Specification & Directory Guide

This directory is designated for high-fidelity visual assets used by the FoodFighter UX Prototype.

---

## 1. Asset Categories & Guidelines

### A. Food & Dish Photography (`/assets/food/`)
- **Purpose**: High-quality imagery for AI Menu Recommendations, voting rounds, and meal preference tags.
- **Specifications**:
  - Aspect Ratio: `4:3` or `1:1`
  - Dimensions: `800×600` or `600×600`
  - Format: WebP or compressed JPG
  - Style: Warm lighting, top-down or 45-degree angle, appetizing, authentic Thai & International dishes.

### B. Restaurant Imagery (`/assets/restaurants/`)
- **Purpose**: Storefront, ambient interior, and signature dish photos for the Restaurant Recommendation & Map screens.
- **Specifications**:
  - Aspect Ratio: `16:9`
  - Dimensions: `1200×675` or `800×450`
  - Format: WebP / JPG

### C. Member Avatars & Profiles (`/assets/avatars/`)
- **Purpose**: Visual identification for Room Lobby, active voting status, and Split Bill participant cards.
- **Specifications**:
  - Dimensions: `120×120` (Rendered at `32px` to `56px`)
  - Style: Friendly, distinct background colors matching FoodFighter brand tokens (Petal, Apricot, Custard, Mauve).

### D. Receipt & Bill Mocks (`/assets/receipts/`)
- **Purpose**: Exploratory UX for Receipt OCR, Item Selection, and Split Bill workflows.
- **Specifications**:
  - Realistic paper receipt layouts, Thai & English itemized bill examples with simulated tax and service charge.

### E. Interactive Map Assets (`/assets/maps/`)
- **Purpose**: Map pin markers, restaurant category pins, user location pulsing dots, and route lines.
- **Format**: Clean SVG vector format.

### F. Brand Illustrations & Empty States (`/assets/illustrations/`)
- **Purpose**: Onboarding graphics, empty state illustrations (No rooms found, waiting for members, AI generating animation).
- **Style**: Soft rounded geometric vectors utilizing canonical brand colors (`#FFC6D9`, `#FFE1C6`, `#FFF7AE`, `#48284A`, `#916C80`).

---

## 2. V1 Prototype Asset Handling
In V1 Foundation, all icons, badges, avatars, and visual placeholders are constructed using inline semantic SVGs and CSS tokens. No external binary files or unvetted third-party images are required, ensuring zero broken asset links and immediate `file://` compatibility.
