# FoodFighter Frontend Specification

> Frontend reference for the FoodFighter project.  
> This document follows the UI and flow decisions currently agreed by the team.

---

## 1. Project Overview

FoodFighter is a group food-decision application.

Main user flow:

```text
Authentication
→ Food Profile Setup
→ Home
→ Create Room / Join Room
→ Room Lobby
→ Meal Preferences
→ AI Recommendations
→ Voting / Final Selection
→ Restaurant
→ History / Profile
(Optional / Future: Split Bill / Bills)
```

---

## 2. Frontend Scope

Frontend is responsible for:

- UI rendering
- Form validation
- Client-side interaction
- API integration
- Authentication state
- Loading / error / success states
- Routing
- Responsive layout
- Session-aware navigation
- Room interaction
- OTP countdown
- QR image upload
- Social login buttons
- Food preference forms
- Voting interaction
- Bill interaction
- Profile editing

Frontend must **not** duplicate backend business logic.

---

## 3. Current Design Direction

Current UI work is **Lo-fi / monochrome-oriented**.

Guidelines:

- Clean white background
- Black / gray text
- Rounded cards
- Minimal visual noise
- Mobile-first layout
- Consistent spacing
- Clear primary CTA
- Bottom navigation on main authenticated screens

Main bottom navigation:

```text
Home
History
Bills
Profile
```

---

# 4. Main Routes

Suggested routes:

```text
/login
/register

/verify-email
/change-email

/forgot-password
/reset-password

/food-profile/step-1
/food-profile/step-2
/food-profile/step-3

/home

/rooms/create
/rooms/join
/rooms/:roomId
/rooms/:roomId/preferences

/foodfight/:sessionId/recommendations
/foodfight/:sessionId/vote
/foodfight/:sessionId/result

/restaurants/:sessionId

/history
/history/:sessionId

/bills
/bills/:billId

/profile
```

Route naming may be adjusted to the actual frontend framework structure.

---

# 5. Authentication Flow

## 5.1 Login

### UI fields

```text
Email
Password
Forgot Password
Login button

Continue with Google
Continue with LINE

Sign up
```

### Frontend validation

- Email required
- Valid email format
- Password required

### Login API

```http
POST /auth/login
```

Example request:

```json
{
  "email": "pure@example.com",
  "password": "password123"
}
```

### Login states

Frontend should handle:

```text
Loading
Invalid credentials
Email not verified
Server error
Login success
```

If backend returns:

```text
EMAIL_NOT_VERIFIED
```

redirect user to email verification flow.

### Successful login

After login:

```text
Check Food Profile
├── Not completed → Food Profile Setup
└── Completed → Home
```

---

# 6. Register

## 6.1 Register UI

Register page contains:

```text
Name
Email
Password
Confirm Password
Agree to Terms of Service + Privacy Policy

Create Account

Continue with Google
Continue with LINE

Log in
```

## 6.2 Frontend form model

```ts
{
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}
```

## 6.3 Frontend-only validation

Frontend must validate:

```text
password === confirmPassword
acceptTerms === true
```

`confirmPassword` is not stored in DB.

For MVP, `acceptTerms` is also frontend validation only unless backend consent storage is added later.

## 6.4 Register API request

Frontend sends only:

```json
{
  "displayName": "Pure",
  "email": "pure@example.com",
  "password": "password123"
}
```

API:

```http
POST /auth/register
```

## 6.5 Register success flow

```text
Register
→ Backend creates user
→ Backend sends OTP
→ Frontend redirects to Verify Email
```

---

# 7. Email OTP Verification

OTP is sent to user's email.

Current agreed rules:

```text
OTP length: 6 digits
OTP expiration: 5 minutes
Resend cooldown: 60 seconds
```

## 7.1 Verify Email UI

Contains:

```text
Verify your email
Email destination
6-digit OTP input
Countdown
Verify button
Resend OTP
Change Email
```

## 7.2 OTP input

Recommended UI:

```text
[1] [2] [3] [4] [5] [6]
```

Behavior:

- Auto focus next input
- Backspace moves backward
- Support paste
- Numeric only
- Max 6 digits

## 7.3 Verify API

```http
POST /auth/verify-email
```

Example:

```json
{
  "email": "pure@example.com",
  "otp": "123456"
}
```

## 7.4 OTP error states

Frontend should support:

```text
INVALID_OTP
OTP_EXPIRED
VERIFICATION_NOT_FOUND
```

Examples:

```text
Incorrect code. Please try again.
Code expired. Request a new code.
```

## 7.5 Resend OTP

```http
POST /auth/resend-otp
```

Frontend behavior:

```text
Resend Code
→ disabled during cooldown
→ countdown 60 sec
→ enabled again
```

New OTP invalidates previous OTP.

## 7.6 Verify success

Verify success is **not a separate page**.

Use modal / popup:

```text
✓ Email verified!

Your email has been verified successfully.

Redirecting to Login...
```

Then redirect to:

```text
/login
```

---

# 8. Change Email

Available from email verification page.

UI:

```text
Change Email
New Email
Send Code
Cancel
```

Flow:

```text
Enter new email
→ Send Code
→ backend changes pending email
→ new OTP sent
→ return to Verify Email screen
```

API:

```http
PATCH /auth/change-email
```

---

# 9. Forgot Password

Login page includes:

```text
Forgot password?
```

Suggested flow:

```text
Forgot Password
→ Enter Email
→ Send reset instructions
→ Reset Password
→ Login
```

APIs:

```http
POST /auth/forgot-password
POST /auth/reset-password
```

Frontend should not reveal whether an email exists.

Use generic success message:

```text
If an account exists for this email,
we've sent password reset instructions.
```

---

# 10. Social Login

Buttons:

```text
Continue with Google
Continue with LINE
```

Frontend responsibility:

- Trigger provider flow
- Handle redirect/callback
- Show loading
- Handle auth failure
- Continue to Food Profile or Home after success

Social login first use may create the user automatically.

Frontend does not implement provider OAuth logic itself.

---

# 11. Food Profile Setup

Food Profile Setup currently has **3 steps**.

```text
Step 1 — Allergies
Step 2 — Dietary / Religious Restrictions
Step 3 — Additional Notes
```

---

## 11.1 Step 1 — Allergies

Examples:

```text
Seafood
Peanut
Dairy
Egg
Soy
Wheat / Gluten
Sesame
No allergies
```

Rules:

- Multiple selection allowed
- `No allergies` should clear conflicting selections
- Can Skip

---

## 11.2 Step 2 — Restrictions

Examples:

```text
Vegetarian
Vegan
Pescatarian
Halal Only
No Pork
No Beef
No restrictions
```

Rules:

- Multiple selection where appropriate
- `No restrictions` conflicts with other selections
- Can Skip

---

## 11.3 Step 3 — Additional Notes

No quick tags in final agreed direction.

Use free-text field:

```text
Additional Notes (Optional)

Tell AI anything else it should know.

Example:
- ไม่กินของดิบ
- ไม่ชอบเครื่องใน
- ไม่ทานผักชี
```

Action:

```text
Save & Continue
```

Then go to Home.

---

# 12. Home

Home currently includes:

```text
Greeting

Create Room
Join Room

Current FoodFight
Recent FoodFights

Bottom Navigation
```

Suggested structure:

```text
Hi, Pure
Ready to fight for the best meal?

[ Create Room ] [ Join Room ]

Current FoodFight
[ Active room card ]
[ Continue ]

Recent FoodFights
[ Recent card ]
[ Recent card ]

Home | History | Bills | Profile
```

## 12.1 Recent FoodFights

Recent items are clickable.

```text
Home
→ Recent FoodFight card
→ Session Detail
```

No need for duplicate detail pages.

History provides all sessions.

---

# 13. Create Room

Current agreed Create Room fields:

```text
Room Name
Max Members
Location
Search Radius
Date
Time
```

## 13.1 Room Name

Example:

```text
มื้อเย็นวันเสาร์
```

## 13.2 Max Members

Current rule:

```text
Minimum: 2
Maximum: 15
Default suggestion: 4
```

UI:

```text
[-] 4 [+]
```

## 13.3 Location

Options:

```text
Select location
Use current location
```

## 13.4 Search Radius

Options:

```text
1 km
3 km
5 km
10 km
```

## 13.5 Date & Time

```text
Select Date
Select Time
```

## 13.6 Create action

```text
Create Room
→ Room created
→ Room Lobby
```

Room Code / QR / Invite Link are generated after room creation.

---

# 14. Join Room

QR behavior decision:

A user can scan the host QR using the **phone's normal camera outside the app**.

QR opens an invite link and goes into FoodFighter.

Therefore an in-app camera scanner is not required for MVP.

Join Room page should focus on Room Code.

## 14.1 Enter Room Code UI

Current preferred simple screen:

```text
Enter Room Code

[ F ][ 8 ][ K ][ 2 ][ Q ][ 9 ]

[ Join Room ]
```

Room code:

```text
6 characters
letters or numbers
```

## 14.2 Optional QR image upload

The app may support:

```text
Upload QR Code Image
```

for QR screenshots saved from LINE / Messenger / Gallery.

This is optional and separate from physical camera scanning.

---

# 15. Room Preview

After entering a valid code or opening an invite link:

```text
Room Found

Room Name
Host
Members
Location
Search Radius
Date
Time

Join This Room
Cancel
```

Purpose:

- Confirm user is joining the correct room
- Avoid accidental joins

---

# 16. Room Lobby

Room Lobby is used by Host and Members.

Main sections:

```text
Room information
Invite Friends
Members
Ready status
How it works
Start FoodFight
```

## 16.1 Room information

Display:

```text
Room Name
Host
Date
Time
Location
Search Radius
Members: 4 / 15
```

No separate `View details` button is needed because the information is already shown.

## 16.2 Room menu

Header uses:

```text
⋮
```

Do not show both settings icon and three-dot menu.

Host menu can contain:

```text
Edit Room
Leave Room
End / Delete Room
```

Member menu:

```text
Leave Room
```

## 16.3 Invite Friends

Keep Lobby clean.

Use one action:

```text
Invite Friends
```

Pressing it opens a Bottom Sheet.

### Invite Bottom Sheet

Contains:

```text
QR Code

Save QR
Share QR

Room Code
Copy

Invite Link
Copy
Share
```

This is a state of Room Lobby, not a separate page.

## 16.4 Members

Example:

```text
Pure (You)        Host      Ready
Max                         Ready
Fern                        Not Ready
Beam                        Not Ready
```

## 16.5 Start FoodFight

Host-only primary action:

```text
Start FoodFight
```

Current direction:

```text
All required members must be ready
```

Button is disabled until conditions are met.

---

# 17. Meal Preferences

After FoodFight starts, users enter preferences for **this meal/session**.

Do not confuse this with the persistent Food Profile.

Session-specific preferences may include:

```text
Current cravings
Budget
Meal-specific notes
Optional preference changes
```

Persistent allergy/restriction information should already come from Food Profile.

---

# 18. AI Recommendation Flow

Agreed high-level flow:

```text
Host starts FoodFight
→ Members provide session preferences
→ AI considers group preferences
→ AI suggests menus
→ Members vote
→ Final result
```

AI recommendation count discussed previously:

```text
3 menu suggestions
```

---

# 19. Voting

Current conceptual flow:

```text
AI suggests menus
→ group reviews options
→ vote / OK-Pass
→ if rejection threshold reached, reroll
→ final choice
```

Previously discussed rule:

```text
If at least 50% reject,
reroll may occur.
```

Tie handling can proceed to a final selection vote.

Exact voting UI still needs final design.

---

# 20. Final Menu

Final result page should show:

```text
Winning Menu
Why AI recommended it
Group match summary

Find Restaurant
```

Potential actions:

```text
View Restaurants
Open Map
Start Bill later
```

---

# 21. Restaurant / Map

Room has:

```text
Location
Search Radius
```

Restaurant suggestions should respect these values.

Potential UI:

```text
Map
Restaurant cards
Distance
Opening status
Restaurant details
```

Exact restaurant integration is still to be finalized.

---

# 22. History

Bottom navigation:

```text
History
```

History page shows **all completed FoodFight sessions**.

Example:

```text
Korean Night
Korean BBQ
12 Aug 2026
4 members

Pizza Party
Pizza
8 Aug 2026
5 members
```

Home only shows recent items.

## 22.1 Session Detail

Both routes should reuse the same detail page:

```text
Home → Recent item → Session Detail

History → item → Session Detail
```

Session Detail can display:

```text
Room / session name
Date
Members
AI recommendations
Final menu
Restaurant
Bill link if available
```

---

# 23. Bills (Optional / Future Extension per SRS)

> Note: Per the FoodFighter SRS (Section: Receipt OCR Optional), Split Bill and Receipt OCR are optional/future extensions for post-MVP. They are NOT part of the core flow or Design System V1.

Bills are separate from FoodFight History.

Bottom nav:

```text
Bills
```

Suggested flow:

```text
Final Menu
→ Eat
→ Split Bill
→ Upload Receipt
→ OCR optional
→ Review items
→ Assign members
→ Calculate shares
→ Bill Summary
```

Potential bill screens:

```text
Bills List
Receipt Upload
Bill Split
Bill Summary / Detail
```

---

# 24. Profile

Profile must support:

```text
Profile Picture
Display Name
Email
Food Profile
Account Settings
Logout
```

## 24.1 Edit Profile

Can use Modal / Bottom Sheet instead of a separate page.

Editable:

```text
Profile Picture
Display Name
```

Email change should use verification flow rather than simple profile edit.

---

# 25. Main API Areas Frontend Will Use

## Authentication

```http
POST   /auth/register
POST   /auth/login
GET    /auth/me
POST   /auth/logout

POST   /auth/verify-email
POST   /auth/resend-otp
PATCH  /auth/change-email

POST   /auth/forgot-password
POST   /auth/reset-password

GET    /auth/google
GET    /auth/google/callback

GET    /auth/line
GET    /auth/line/callback
```

Room / FoodFight / Bill APIs are still to be finalized with backend.

---

# 26. Shared Frontend States

Every API-based screen should consider:

```text
Idle
Loading
Success
Validation Error
Backend Error
Empty State
Disabled State
```

Examples:

```text
Login button disabled while loading
Join Room disabled until 6-character code entered
Start FoodFight disabled until ready conditions are met
Resend OTP disabled during cooldown
```

---

# 27. Form Validation Guidelines

Recommended frontend stack:

```text
React Hook Form
Zod
@hookform/resolvers
```

Validation should be duplicated only where useful for UX.

Backend remains the source of truth for security/business validation.

---

# 28. Responsive Direction

Current design direction is **mobile-first**.

Recommended approach:

```text
Design mobile first
→ Tablet
→ Desktop
```

On desktop:

- center mobile-like content where appropriate
- expand complex pages such as map, bill, history
- keep consistent max-width
- do not simply stretch mobile cards across full screen

---

# 29. Navigation Rules

Unauthenticated:

```text
Login
Register
Verify Email
Forgot Password
Reset Password
```

Authenticated:

```text
Home
History
Bills
Profile
Room flows
FoodFight flows
```

If user is not authenticated and opens an invite/deep link:

```text
Invite Link
→ Login
→ return to intended Room Preview
```

---

# 30. Suggested Frontend Folder Structure

Example for Next.js App Router:

```text
src/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   ├── register/
│   │   ├── verify-email/
│   │   ├── forgot-password/
│   │   └── reset-password/
│   │
│   ├── (main)/
│   │   ├── home/
│   │   ├── history/
│   │   ├── bills/
│   │   ├── profile/
│   │   └── rooms/
│   │
│   └── layout.tsx
│
├── components/
│   ├── auth/
│   ├── room/
│   ├── foodfight/
│   ├── bill/
│   ├── profile/
│   └── ui/
│
├── lib/
│   ├── api/
│   ├── auth/
│   ├── validation/
│   └── utils/
│
├── hooks/
├── stores/
├── types/
└── constants/
```

Adjust according to actual project structure.

---

# 31. Suggested Implementation Order

Frontend should be developed in this order:

```text
1. Login
2. Register
3. Verify OTP
4. Change Email
5. Forgot / Reset Password
6. Food Profile Step 1
7. Food Profile Step 2
8. Food Profile Step 3
9. Home
10. Create Room
11. Join Room
12. Room Preview
13. Room Lobby
14. Meal Preferences
15. AI Recommendation
16. Voting
17. Final Result
18. Restaurant / Map
19. History
20. Session Detail
21. Bills
22. Bill Detail
23. Profile
24. Edit Profile
```

---

# 32. Current UI Status

Already designed / discussed:

```text
Login
Register
Verify OTP
Change Email

Food Profile Step 1
Food Profile Step 2
Food Profile Step 3

Home

Create Room

Room Lobby
Invite Friends Bottom Sheet concept

Join Room
Enter Room Code
QR image upload concept
```

Still needs final UI work:

```text
Room Preview
Meal Preferences
AI Recommendation
Voting
Final Menu
Restaurant / Map
History
Session Detail
Bills
Bill Split
Bill Summary
Profile
Edit Profile
Forgot Password
Reset Password
```

---

# 33. Team Rule

When implementing frontend:

1. Follow existing UI decisions.
2. Do not invent fields without checking the agreed flow.
3. Do not change API field names independently.
4. Reuse shared components.
5. Keep main navigation consistent.
6. Do not commit `.env`.
7. Use feature branches.
8. Test mobile layout first.
9. Handle loading and error states.
10. Keep backend and frontend contracts documented.

---

# 34. Source of Truth

For current implementation decisions, use this priority:

```text
1. Agreed UI / User Flow
2. API Contract agreed with Backend
3. Prisma / Backend data model
4. Implementation details
```

If UI and backend contract conflict, stop and confirm with the team before adding or removing fields.

---

## End

This file should evolve with the project.

Recommended filename:

```text
FRONTEND.md
```
