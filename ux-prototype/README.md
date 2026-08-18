# FoodFighter — High-Fidelity Interactive UX/UI Prototype

This directory contains the standalone, high-fidelity interactive prototype for **FoodFighter**, the group food decision and dining platform.

---

## 🎯 Purpose & Scope

- **UX / UI Exploration & Validation**: Validates user journeys, screen hierarchies, mobile touch targets, and interaction models.
- **Design System Reference**: Implements FoodFighter brand tokens (Petal, Apricot, Custard, Mauve, Plum), typography (Poppins & Noto Sans Thai), accessible button states, and form controls.
- **Zero Framework / Zero Build Step**: 100% standard HTML, CSS, and Vanilla JavaScript compatible with the `file://` protocol.
- **Prototype Status**: **38 of 38 screens fully implemented (0 future shells remaining)**.

> **Disclaimer**: This is a deterministic visual prototype for UX validation. It does **not** connect to real authentication servers, backend databases, camera devices, OCR engines, map tile services, or payment gateways.

---

## 🚀 How to Launch

1. **Direct Browser Launch (`file://`)**:
   Double-click `index.html` or open `C:\devnest 101\FoodFight\ux-prototype\index.html` in any modern web browser (Chrome, Edge, Safari, Firefox).
   *No local web server, node_modules, or build commands required.*

2. **Optional Local Static Server**:
   ```bash
   npx serve "C:\devnest 101\FoodFight\ux-prototype"
   ```

---

## 🔑 Demo Credentials & Test Values

- **Demo Account Email**: `user@example.com`
- **Demo Password**: `Password123`
- **Verification OTP**: `123456`
- **Demo Room Code**: `FF-4827`

---

## 📱 Implemented Product Journeys (38 Total Screens)

1. **Authentication Flow (4 Screens)**:
   - Log In (`#/login`)
   - Register (`#/register`)
   - Verify Email / OTP (`#/verify-email`)
   - Forgot Password (`#/forgot-password`)

2. **Food Profile Onboarding (3 Screens)**:
   - Allergies (`#/food-profile/allergies`)
   - Restrictions (`#/food-profile/restrictions`)
   - Additional Notes (`#/food-profile/details`)

3. **Home Dashboard (1 Screen)**:
   - Home (`#/home`)

4. **Room & Lobby Journey (8 Screens)**:
   - Create Room (`#/room/create`)
   - Host Lobby (`#/room/lobby-host`)
   - Join Room Hub (`#/room/join`)
   - Scan QR Viewfinder (`#/room/scan-qr`)
   - Enter Room Code (`#/room/code`)
   - Invite Modal (`#/room/invite`)
   - Room Preview (`#/room/preview`)
   - Member Lobby (`#/room/lobby-member`)

5. **FoodFight Preparation & Session (3 Screens)**:
   - Meal Preferences (`#/foodfight/preferences`)
   - Waiting for Members (`#/foodfight/waiting`)
   - AI Generating Recommendations (`#/foodfight/generating`)

6. **Recommendations & Voting Journey (6 Screens)**:
   - Recommended Menus Round 1 (`#/recommendations`)
   - OK / PASS Voting (`#/recommendations/vote`)
   - Voting Result (`#/vote-result`)
   - Round 2 / Recommend Again (`#/recommendations/round-2`)
   - Final Vote (4 Dishes) & Host Tie Break (`#/final-vote`)
   - Final Menu Winner Celebration (`#/final-menu`)

7. **Restaurant Discovery & Location (3 Screens)**:
   - Recommended Restaurants List ↔ Fake Map (`#/restaurants`)
   - Restaurant Detail & Mini Route (`#/restaurants/detail`)
   - Restaurant Destination Confirmed (`#/restaurants/selected`)

8. **Split Bill & Payment Flow (6 Screens)**:
   - Split Bill Overview (`#/bill`)
   - Simulated Receipt Scanner (`#/bill/receipt`)
   - Review & Edit Receipt Items (`#/bill/items`)
   - Select Who Ate What Assignment (`#/bill/assign`)
   - Bill Summary Breakdown (`#/bill/summary`)
   - Real-Time Payment Status Tracker (`#/bill/payment`)

9. **History & Profile Flow (4 Screens)**:
   - FoodFight History Feed & Modal (`#/history`)
   - Bill History Receipts & Modal (`#/bill-history`)
   - User Profile Summary (`#/profile`)
   - Edit Food Profile (`#/profile/food`)

---

## 🛠️ Developer Prototype Navigator

Click the floating **"Screens"** button in the bottom-right corner to open the Developer Drawer:
- **Direct Navigation**: Jump instantly to any of the 38 registered screens.
- **Simulation Controls**:
  - Switch Role: Host ↔ Member
  - Switch View: List ↔ Map
  - Set Final Menu: Wagyu Krapow (A) / Tonkotsu Ramen (B) / Kurobuta Shabu (C) / Tom Yum (D)
  - Simulate Round 1 Win / No-Winner (25% OK) / Final Vote 2-2 Tie Break
  - Assign All Receipt Items to Everyone
  - Mark All Members as Paid
  - Reset Flow slices or complete prototype state
