import { apiFetch } from "@/lib/api/client";
import type { PaymentAccount } from "../types/bill-types";

export interface UpsertPaymentAccountInput {
  accountName: string;
  promptPayId: string;
}

export const paymentAccountService = {
  getMine: () => apiFetch<PaymentAccount | null>("/payment-account"),

  upsert: (input: UpsertPaymentAccountInput) =>
    apiFetch<PaymentAccount>("/payment-account", {
      method: "PUT",
      body: JSON.stringify({ type: "PROMPTPAY", ...input }),
    }),

  uploadQr: (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    return apiFetch<PaymentAccount>("/payment-account/qr", {
      method: "POST",
      body: formData,
    });
  },

  removeQr: () =>
    apiFetch<PaymentAccount>("/payment-account/qr", { method: "DELETE" }),
};
