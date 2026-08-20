import { apiFetch } from "@/lib/api/client";
import type { AvailableRoom, BillDetail, PaymentQr } from "../types/bill-types";

export interface ReceiptItemInput {
  name: string;
  quantity: number;
  unitPrice: number;
}

export interface CalculateSummaryInput {
  serviceCharge?: number;
  tax?: number;
  discount?: number;
}

export const billService = {
  listAvailableRooms: () => apiFetch<AvailableRoom[]>("/bills/rooms/available"),

  createBill: (roomId: string) =>
    apiFetch<BillDetail>("/bills", {
      method: "POST",
      body: JSON.stringify({ roomId }),
    }),

  getBill: (billId: string) => apiFetch<BillDetail>(`/bills/${billId}`),

  uploadReceipt: (billId: string, file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    return apiFetch<BillDetail>(`/bills/${billId}/receipt`, {
      method: "POST",
      body: formData,
    });
  },

  addItem: (billId: string, input: ReceiptItemInput) =>
    apiFetch<BillDetail>(`/bills/${billId}/items`, {
      method: "POST",
      body: JSON.stringify(input),
    }),

  updateItem: (billId: string, itemId: string, input: ReceiptItemInput) =>
    apiFetch<BillDetail>(`/bills/${billId}/items/${itemId}`, {
      method: "PATCH",
      body: JSON.stringify(input),
    }),

  deleteItem: (billId: string, itemId: string) =>
    apiFetch<BillDetail>(`/bills/${billId}/items/${itemId}`, {
      method: "DELETE",
    }),

  assignItem: (billId: string, itemId: string, userIds: string[]) =>
    apiFetch<BillDetail>(`/bills/${billId}/items/${itemId}/assign`, {
      method: "PUT",
      body: JSON.stringify({ userIds }),
    }),

  splitEvenly: (billId: string, userIds?: string[]) =>
    apiFetch<BillDetail>(`/bills/${billId}/split-evenly`, {
      method: "POST",
      body: JSON.stringify({ userIds }),
    }),

  calculateSummary: (billId: string, input: CalculateSummaryInput) =>
    apiFetch<BillDetail>(`/bills/${billId}/summary`, {
      method: "POST",
      body: JSON.stringify(input),
    }),

  confirmBill: (billId: string) =>
    apiFetch<BillDetail>(`/bills/${billId}/confirm`, { method: "POST" }),

  getPaymentQr: (billId: string, userId: string) =>
    apiFetch<PaymentQr>(`/bills/${billId}/payments/${userId}/qr`),

  uploadSlip: (billId: string, userId: string, file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    return apiFetch<BillDetail>(`/bills/${billId}/payments/${userId}/slip`, {
      method: "POST",
      body: formData,
    });
  },

  setPaymentStatus: (billId: string, userId: string, status: "PAID" | "UNPAID") =>
    apiFetch<BillDetail>(`/bills/${billId}/payments/${userId}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),

  closeBill: (billId: string) =>
    apiFetch<BillDetail>(`/bills/${billId}/close`, { method: "POST" }),
};
