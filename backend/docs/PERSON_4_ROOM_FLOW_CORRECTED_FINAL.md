# FoodFighter — Person 4
## Room Flow Final: Create Room + Join by Code + External QR/Invite Link → Room Preview

## 1. Scope

งานส่วนนี้รับผิดชอบเฉพาะ Flow ห้องตั้งแต่:

```text
CREATE FLOW

Create Room
   ↓
Room Lobby
   ↓
Invite Friends
   ↓
แชร์ QR / Room Code / Invite Link
```

และ:

```text
JOIN FLOW A — จากหน้า Home

กด JOIN ROOM
   ↓
Enter Room Code
   ↓
กรอก Code 6 ตัว
   ↓
กด Join Room
   ↓
Room Preview
   ↓
Join This Room
   ↓
END
```

รวมถึง:

```text
JOIN FLOW B — Scan QR จากกล้องมือถือภายนอกแอป

Camera
   ↓
Scan QR
   ↓
เปิด Invite Link
   ↓
Room Preview
   ↓
Join This Room
   ↓
END
```

และ:

```text
JOIN FLOW C — กด Invite Link

Invite Link
   ↓
Room Preview
   ↓
Join This Room
   ↓
END
```

> หน้า Join Room ที่เปิดจาก Home มี **Enter Room Code อย่างเดียว**

> ไม่มี QR Scanner ภายใน FoodFighter

> ไม่มี Upload QR Image

> งานนี้จบที่ `Room Preview → Join This Room`

---

# 2. Out of Scope

Person 4 ไม่ต้องทำ:

```text
Home implementation        ❌
QR Scanner ในแอป           ❌
Upload QR Image            ❌
Ready logic                ❌
Start FoodFight            ❌
Meal Preferences           ❌
AI Recommendation          ❌
Voting                     ❌
Restaurant Recommendation  ❌
Bill / Split Bill          ❌
History                    ❌
Profile                    ❌
```

Room Lobby ใน scope นี้ใช้เฉพาะส่วนที่จำเป็นสำหรับ Host ในการ Invite Friends ตาม UI เท่านั้น

---

# 3. Create Room

หน้า Create Room ตาม UI มี:

```text
Create Room

Room Name

Max Members

Location
- Select location
- Use current location

Search Radius
- 1 km
- 3 km
- 5 km
- 10 km

Date
Time

[ Create Room ]
```

## Room Name

- Required
- สูงสุด 30 characters ตาม UI

ตัวอย่าง:

```text
มื้อเย็นวันเสาร์
```

## Max Members

- Required
- 2–15 คน
- นับรวม Host

UI:

```text
[-] 4 [+]
```

## Location

รองรับ:

```text
Select location
```

และ:

```text
Use current location
```

Backend ควรได้ข้อมูล:

```text
locationName
latitude
longitude
```

## Search Radius

ค่าตาม UI:

```text
1 km
3 km
5 km
10 km
```

## Date & Time

Frontend แยก:

```text
Date
Time
```

Backend เก็บรวมเป็น:

```text
scheduledAt
```

---

# 4. Create Room API

```http
POST /rooms
```

Request concept:

```json
{
  "name": "มื้อเย็นวันเสาร์",
  "maxMembers": 4,
  "locationName": "Siam",
  "latitude": 13.7466,
  "longitude": 100.5347,
  "searchRadiusKm": 5,
  "scheduledAt": "2026-08-22T18:30:00"
}
```

Frontend ไม่ต้องส่ง:

```text
hostId
roomCode
inviteToken
```

Backend ใช้ authenticated user เป็น Host และ generate:

```text
roomCode
inviteToken
status = LOBBY
```

---

# 5. After Create Room

หลัง Create Room สำเร็จ:

```text
Create Room
   ↓
Room Lobby
```

Room Lobby ตาม UI แสดง:

```text
Room Name
Host
Date
Time
Location
Search Radius
Member Count
Invite Friends
Members
```

> ในงาน Person 4 ไม่ต้องทำ Ready logic และ Start FoodFight logic

---

# 6. Invite Friends

เมื่อ Host กด:

```text
Invite Friends
```

ให้เปิด Modal / Bottom Sheet ตาม UI

ข้อมูลที่แสดง:

```text
Invite Friends

QR Code

[ Save QR ]
[ Share QR ]

Room Code
FF8K7Z
[ Copy ]

Invite Link
foodfight.app/join/...
[ Copy ]

[ Share Link ]
```

## Important

QR Code มีไว้ให้ผู้รับ:

```text
ใช้กล้องมือถือปกติ Scan
```

ไม่ใช่ให้เข้า FoodFighter แล้วเปิด QR Scanner

---

# 7. QR Code Behavior

QR ไม่ต้องเก็บรูปใน Database

QR encode Invite Link เช่น:

```text
https://foodfight.app/join/{inviteToken}
```

Flow ฝั่ง Host:

```text
inviteToken
   ↓
Invite Link
   ↓
Generate QR Code
   ↓
Host Save / Share QR
```

Flow ฝั่งผู้รับ:

```text
Camera ของมือถือ
   ↓
Scan QR
   ↓
เปิด Invite Link
   ↓
FoodFighter Room Preview
```

---

# 8. Join Room จาก Home

หน้า Home มี Card:

```text
JOIN ROOM
Enter code or scan QR
```

แต่ behavior ที่ตกลงล่าสุดคือ:

> เมื่อกด JOIN ROOM จาก Home ให้เข้า **หน้า Enter Room Code เท่านั้น**

ไม่ต้องเปิด Scanner ในแอป

Flow:

```text
Home
 ↓
JOIN ROOM
 ↓
Enter Room Code
```

---

# 9. Enter Room Code

UI ตามภาพ:

```text
Enter Room Code

Enter the 6-character room code

[ F ][ 8 ][ K ][ 2 ][ Q ][ 9 ]

The room code is 6 letters or numbers.

[ Join Room ]
```

## Rules

- 6 characters
- letters or numbers
- สามารถ normalize uppercase ก่อนค้นหา
- ต้องกรอกครบ 6 ตัวก่อนกด Join

## Behavior

กด `Join Room` ในหน้านี้:

```text
Room Code
   ↓
Find Room
   ↓
Room Found
   ↓
Room Preview
```

**ยังไม่สร้าง RoomMember**

---

# 10. Find Room by Code API

```http
GET /rooms/code/:roomCode
```

ใช้สำหรับหา Room และสร้าง Room Preview

ตัวอย่าง:

```text
GET /rooms/code/F8K2Q9
```

ถ้าไม่พบ:

```text
Room not found.
Please check the code and try again.
```

---

# 11. Join ผ่าน Invite Link

Invite Link มาจาก Host ผ่าน Invite Friends

ตัวอย่าง:

```text
https://foodfight.app/join/{inviteToken}
```

Flow:

```text
User กด Invite Link
      ↓
เปิด FoodFighter
      ↓
Resolve inviteToken
      ↓
Room Preview
```

**ยังไม่สร้าง RoomMember**

---

# 12. Join ผ่าน QR

QR เป็น Invite Link ในรูปแบบ QR

Flow:

```text
กล้องมือถือภายนอกแอป
      ↓
Scan QR
      ↓
เปิด Invite Link
      ↓
Resolve inviteToken
      ↓
Room Preview
```

ไม่มี:

```text
FoodFighter QR Scanner ❌
Upload QR from Gallery ❌
```

---

# 13. Find Room by Invite Token API

```http
GET /rooms/invite/:inviteToken
```

ใช้สำหรับ:

```text
Invite Link
QR Code
```

ทั้งสองทางเข้ามา endpoint/logic เดียวกันได้

---

# 14. Authentication when Opening Link / QR

ถ้า User กด Link หรือ Scan QR แต่ยังไม่ได้ Login:

```text
Invite Link / QR
       ↓
เก็บ intended inviteToken
       ↓
Login
       ↓
Login สำเร็จ
       ↓
กลับ Room Preview ของห้องเดิม
```

ห้าม Login สำเร็จแล้วโยนกลับ Home จนทำ intent เดิมหาย

---

# 15. Room Preview

ทุกวิธีต้องมาบรรจบที่หน้าเดียวกัน:

```text
Room Code ───────┐
                 │
Invite Link ─────┼──→ Room Preview
                 │
QR Code ─────────┘
```

UI Final:

```text
Room Preview

Review the room details before joining.

Room Found!

Room Name
มื้อเย็นวันเสาร์

Hosted by
Pure

Members
3 / 4

Location
Siam
Within 5 km

Date
22 Aug 2026

Time
6:30 PM

[ Join This Room ]

[ Cancel ]
```

---

# 16. Room Preview — Removed Items

ตาม UI ล่าสุดให้ลบ:

```text
Note from host ❌
View details / More details ❌
```

ดังนั้นไม่ต้องเพิ่ม:

```text
room.note
```

ใน Prisma

---

# 17. Room Preview Response

Concept:

```json
{
  "id": "room-id",
  "name": "มื้อเย็นวันเสาร์",
  "host": {
    "displayName": "Pure",
    "avatarUrl": null
  },
  "memberCount": 3,
  "maxMembers": 4,
  "locationName": "Siam",
  "searchRadiusKm": 5,
  "scheduledAt": "2026-08-22T18:30:00"
}
```

ไม่ต้องมี:

```json
{
  "note": "..."
}
```

---

# 18. Join This Room

RoomMember ถูกสร้างเมื่อ User กด:

```text
Join This Room
```

เท่านั้น

Flow:

```text
Room Preview
     ↓
Join This Room
     ↓
Backend validate
     ↓
Create RoomMember
     ↓
Success
```

หลังจากนั้นทีมส่วนถัดไปจะพา User เข้า Room Lobby

---

# 19. Join Room API

```http
POST /rooms/:roomId/join
```

Frontend ไม่ต้องส่ง:

```text
userId
```

Backend ใช้ authenticated user

---

# 20. Cancel

หน้า Room Preview มี:

```text
Cancel
```

เมื่อกด:

- ไม่สร้าง RoomMember
- ออกจาก Preview
- กลับหน้าเดิมตาม entry point

ตัวอย่าง:

```text
มาจาก Enter Code
→ กลับ Enter Room Code
```

หรือ:

```text
มาจาก external link
→ ปิด/กลับตาม routing ที่ทีมกำหนด
```

---

# 21. Prisma Models ที่เกี่ยวข้อง

ใช้ schema ล่าสุดของทีมเป็น Source of Truth

Concept:

```prisma
model Room {
  id             String @id @default(uuid())
  hostId         String

  name           String
  roomCode       String @unique
  inviteToken    String @unique

  maxMembers     Int

  locationName   String
  latitude       Float?
  longitude      Float?
  searchRadiusKm Int

  scheduledAt    DateTime

  status         RoomStatus @default(LOBBY)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  host    User         @relation("RoomHost", fields: [hostId], references: [id])
  members RoomMember[]
}

model RoomMember {
  id     String @id @default(uuid())
  roomId String
  userId String

  isReady Boolean @default(false)

  joinedAt DateTime @default(now())
  leftAt   DateTime?

  room Room @relation(fields: [roomId], references: [id])
  user User @relation(fields: [userId], references: [id])

  @@unique([roomId, userId])
}
```

`isReady` ใช้โดย Room Lobby feature ภายหลัง

Person 4 ไม่ต้อง implement Ready logic

---

# 22. Backend Validation

## Create Room

ตรวจอย่างน้อย:

```text
Room Name required
Room Name <= 30 characters
Max Members 2–15
Location required
Search Radius valid
Date / Time valid
```

## Preview

ตรวจ:

```text
Room exists
Room อยู่ในสถานะที่ Preview / Join ได้
```

การ Preview ห้ามสร้าง RoomMember

## Join

ก่อนสร้าง RoomMember ตรวจ:

```text
Room exists
Room status = LOBBY
Room ยังไม่เต็ม
User ไม่ใช่ Host
User ยังไม่ได้ Join ห้อง
```

---

# 23. Capacity Rule

`maxMembers` นับรวม Host

ตัวอย่าง:

```text
maxMembers = 4

Host = 1
RoomMembers = 3

Room Full
```

Backend คำนวณ:

```text
1 + active RoomMember count
```

---

# 24. Error States

รองรับอย่างน้อย:

```text
Invalid room code
Room not found
Invalid invite link
Invalid QR / broken invite link
Room is full
Room is no longer available
Already joined
Failed to create room
Failed to join room
Location unavailable
Network / API error
```

ไม่มี Upload QR error เพราะไม่มี feature Upload QR

---

# 25. Suggested Routes

Route จริงปรับตาม Frontend ของทีมได้

```text
/rooms/create

/rooms/join/code

/rooms/preview/:roomId

/join/:inviteToken

/rooms/:roomId
```

ไม่มี route:

```text
/rooms/join/scan ❌
/rooms/join/upload ❌
```

เพราะ QR Scan ทำผ่านกล้องมือถือภายนอกแอป

---

# 26. Definition of Done

## Create Room

- [ ] Create Room UI
- [ ] Room Name
- [ ] Max Members 2–15
- [ ] Select Location
- [ ] Use Current Location
- [ ] Search Radius 1 / 3 / 5 / 10 km
- [ ] Date
- [ ] Time
- [ ] POST `/rooms`
- [ ] Backend generate Room Code
- [ ] Backend generate Invite Token
- [ ] Create สำเร็จ → Room Lobby

## Invite Friends

- [ ] Invite Friends UI
- [ ] QR Code
- [ ] Save QR
- [ ] Share QR
- [ ] Room Code
- [ ] Copy Room Code
- [ ] Invite Link
- [ ] Copy Invite Link
- [ ] Share Link

## Join from Home

- [ ] กด JOIN ROOM → Enter Room Code
- [ ] ไม่มี Scanner Page
- [ ] ไม่มี Upload QR
- [ ] Code 6 characters
- [ ] Join Room button
- [ ] Code สำเร็จ → Room Preview
- [ ] ยังไม่สร้าง RoomMember

## External QR

- [ ] QR encode Invite Link
- [ ] Scan ด้วย Camera ภายนอก FoodFighter
- [ ] เปิด Invite Link
- [ ] Invite Token resolve ได้
- [ ] ไป Room Preview
- [ ] ไม่มี QR scanner ภายใน app

## Invite Link

- [ ] เปิด Link ได้
- [ ] Resolve inviteToken
- [ ] ไป Room Preview
- [ ] ถ้ายังไม่ Login ให้กลับมาห้องเดิมหลัง Login

## Room Preview

- [ ] Room Name
- [ ] Hosted by
- [ ] Members
- [ ] Location
- [ ] Search Radius
- [ ] Date
- [ ] Time
- [ ] Join This Room
- [ ] Cancel
- [ ] ไม่มี Note from host
- [ ] ไม่มี View details / More details
- [ ] Preview ยังไม่สร้าง RoomMember
- [ ] Join This Room แล้วจึงสร้าง RoomMember

---

# 27. Final Flow — Source of Truth

```text
A) JOIN จาก Home

HOME
 ↓
JOIN ROOM
 ↓
ENTER ROOM CODE
 ↓
ROOM PREVIEW
 ↓
JOIN THIS ROOM
 ↓
END
```

```text
B) JOIN จาก QR

CAMERA มือถือ
 ↓
SCAN QR
 ↓
INVITE LINK
 ↓
ROOM PREVIEW
 ↓
JOIN THIS ROOM
 ↓
END
```

```text
C) JOIN จาก Link

INVITE LINK
 ↓
ROOM PREVIEW
 ↓
JOIN THIS ROOM
 ↓
END
```

```text
D) CREATE

CREATE ROOM
 ↓
ROOM LOBBY
 ↓
INVITE FRIENDS
 ↓
SHARE QR / CODE / LINK
 ↓
END ของ scope Invite
```

---

# 28. Team Rules

1. ยึด UI ล่าสุดเป็น Source of Truth
2. ห้ามเพิ่ม QR Scanner ใน App
3. ห้ามเพิ่ม Upload QR
4. Join จาก Home = Room Code only
5. QR / Invite Link = เข้า Room Preview โดยตรง
6. Preview ก่อน Join จริงเสมอ
7. RoomMember สร้างเมื่อกด Join This Room เท่านั้น
8. ไม่เพิ่ม Note ให้ Room
9. ไม่เพิ่ม View Details
10. ใช้ authenticated user จาก Backend
11. ห้าม commit `.env`
12. ถ้าแตะ Prisma ให้ `npx prisma format` และ `npx prisma validate` ผ่าน
