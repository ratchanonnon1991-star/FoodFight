![alt text](image.png)
เขียนโค้ดโดยใช้วิธีแบบง่ายๆสามารถไปดูได้จากไฟล์เก่า D/fakebug โดยให้ทำทั้ง frontend และ backend

- เพิ่ม schema ที่ใช้เก็บ บัญชีรับเงินของคนสร้างบิล เลย เช่น เลขพร้อมเพย์ (เบอร์โทร/เลขบัตร ปชช.), ชื่อบัญชี
- frontend ให้ใส่ค่าต่างๆตาม folder ที่มี
- backend ให้ทำใน folder bill ที่สร้างไว้ โดยยึดวิธีคิดจากรูปที่ชื่อ bill.png และข้อมูลที่ส่งไปให้ โดยรูปอาหารต่างๆให้เว้นไว้ก่อน ร่างแค่กรอบ ค่อยไปต่อกับข้อมูลรูปภาพทีหลัง
  Split Bill
  ↓
  Upload / Scan Receipt
  ↓
  Review Receipt Items
  ↓
  Select Who Ate What
  ↓
  Bill Summary
  ↓
  สร้าง QR ที่ใช้ได้จริง (สแกนแล้วโอนเงินเข้าบัญชีจริง)
  ↓
  Payment Status
  เพิ่มฟังชั้นสำหรับอัพโหลดรูปภาพสลิปที่จ่ายเงิน และให้กดยืนยัน

---

## สรุปการทำงานที่ทำไปแล้ว (Implementation Summary)

### Backend

- **Prisma schema** (`backend/prisma/schema.prisma`)
  - เพิ่ม model `PaymentAccount` (1:1 กับ `User`) — เก็บ `type` (PROMPTPAY), `accountName`, `promptPayId`, `qrImageUrl`
  - เพิ่ม `ReceiptItem.imageUrl` (เผื่อรูปอาหารที่จะทำทีหลัง) และ `UserPayment.slipImageUrl`
  - push เข้า DB ด้วย `prisma db push` แล้ว (โปรเจกต์นี้ไม่มี migration history เดิม)

- **โมดูลใหม่**
  - `backend/src/bill/` — create-bill, receipt (+ OCR), split, payment, bill-detail, bill-access + controller
  - `backend/src/payment-account/` — CRUD บัญชีรับเงิน PromptPay ของ user
  - `backend/src/infrastructure/promptpay/` — สร้าง PromptPay QR **จริง** ด้วย `promptpay-qr` (EMV QR ตามมาตรฐานไทย) + `qrcode` (render เป็นรูป)
  - `backend/src/infrastructure/storage/` — เก็บไฟล์อัปโหลด (ใบเสร็จ/สลิป/QR) ไว้ที่ `backend/uploads/` เสิร์ฟผ่าน `/uploads/...`
  - `backend/src/infrastructure/ocr/receipt-ocr.service.ts` — **อ่านรายการ+ราคาจากรูปใบเสร็จจริง** ด้วย Google Gemini Vision (`gemini-2.0-flash`, JSON mode) ตั้งค่าคีย์ที่ `GOOGLE_AI_API_KEY` ใน `backend/.env`
    - ทำงานเฉพาะตอน scan ครั้งแรกที่บิลยังไม่มีรายการ (กัน rescan ทับของที่แก้เองแล้ว)
    - ถ้าไม่ได้ตั้งค่าคีย์ หรือ OCR ล้มเหลว/timeout (25s) → ไม่ block ผู้ใช้ ยังกรอกรายการเองได้เสมอ (`ocrStatus` จะเป็น NOT_USED/FAILED)

- **Flow**: Select Meal (จาก Room ที่มีอยู่) → Upload/Scan Receipt (OCR auto-fill รายการ) → Review Items (แก้ไข/เพิ่ม/ลบเองได้) → Select Who Ate What → Bill Summary (คำนวณ service charge/tax/discount แบบสัดส่วน) → Confirm → Payment Status (QR จริงต่อคน + อัปโหลดสลิป + mark paid)

- ผูก Bill เข้ากับ `Room` โดยตรง (auto สร้าง `FoodFightSession` ให้) เพราะระบบ voting/restaurant-selection (ข้อ 6 ในสเปกที่ละเอียดกว่า) ยังไม่มีใน backend เลย

### Frontend

- `frontend/src/features/bill/` — ทุกหน้าตาม flow ด้านบน + payment account (setup/edit PromptPay + อัปโหลด QR สำรอง)
- Route: `frontend/src/app/(bill)/bills/...` (แยก route group ออกจาก `(main)` ตามที่คุยกัน)
- แก้ `BottomNavigation` ให้ตรวจ active tab จาก URL เอง + เปิดแท็บ "Bills"

### ยังไม่ได้ทำ (นอกขอบเขต bill.md เดิม แต่มีในสเปกละเอียดที่ให้มาทีหลัง)

- Split Method "หารเท่ากัน" แบบเร็ว (ตอนนี้มีแต่ "หารตามรายการ")
- ปุ่มแยก 3 ทาง (ถ่ายรูป/เลือกรูป/พิมพ์เอง) — ตอนนี้รวมเป็นปุ่มเดียว + form กรอกเอง
- Guest ที่ไม่มีบัญชีในระบบ
- หน้ารวมแท็บ Bills (ค้างอยู่/เคลียร์แล้ว)
- Restaurant matching/voting (ข้อ 6 ทั้งหมด)
- Audit log ตอนแก้บิลหลังมีคนจ่ายแล้ว, remind rate-limit
