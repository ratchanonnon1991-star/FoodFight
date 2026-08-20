export type BillStatus =
  | "DRAFT"
  | "SPLITTING"
  | "COMPLETED"
  | "CLOSED"
  | "CANCELLED";
export type PaymentStatus = "UNPAID" | "PAID";
export type OcrStatus = "NOT_USED" | "PROCESSING" | "COMPLETED" | "FAILED";

export interface AvailableRoomMember {
  userId: string;
  displayName: string;
  avatarUrl: string | null;
}

export interface AvailableRoom {
  roomId: string;
  name: string;
  scheduledAt: string;
  restaurantName: string | null;
  members: AvailableRoomMember[];
  billId: string | null;
  billStatus: BillStatus | null;
}

export interface BillMember {
  userId: string;
  displayName: string;
  avatarUrl: string | null;
  role: "HOST" | "MEMBER";
}

export interface BillItemShare {
  userId: string;
  displayName: string;
  avatarUrl: string | null;
  amount: number;
}

export interface BillItem {
  id: string;
  name: string;
  imageUrl: string | null;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  assignedUserIds: string[];
  shares: BillItemShare[];
}

export interface BillPayment {
  userId: string;
  displayName: string;
  avatarUrl: string | null;
  amount: number;
  status: PaymentStatus;
  paidAt: string | null;
  slipImageUrl: string | null;
}

export interface BillPaymentAccountSummary {
  accountName: string;
  promptPayId: string;
  qrImageUrl: string | null;
}

export interface BillDetail {
  id: string;
  status: BillStatus;
  closedAt: string | null;
  summaryCalculated: boolean;
  isCreator: boolean;
  createdBy: { id: string; displayName: string; avatarUrl: string | null };
  meal: { name: string; restaurantName: string | null };
  members: BillMember[];
  receipt: {
    id: string;
    imageUrl: string;
    ocrStatus: OcrStatus;
    uploadedAt: string;
  } | null;
  items: BillItem[];
  subtotal: number;
  serviceCharge: number;
  tax: number;
  discount: number;
  totalAmount: number;
  paymentAccount: BillPaymentAccountSummary | null;
  payments: BillPayment[];
  progress: {
    paidCount: number;
    totalCount: number;
    collected: number;
    remaining: number;
  };
}

export interface PaymentAccount {
  id: string;
  paymentType: "PROMPTPAY";
  accountName: string;
  promptPayNumber: string;
  qrCodeUrl: string | null;
  updatedAt: string;
}

export interface PaymentQr {
  qrDataUrl: string;
  amount: number;
  accountName: string;
}
