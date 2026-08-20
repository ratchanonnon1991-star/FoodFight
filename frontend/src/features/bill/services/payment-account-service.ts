import { apiFetch } from "@/lib/api/client";
import type { PaymentAccount } from "../types/bill-types";

export interface UpsertPaymentAccountInput {
  accountName: string;
  promptPayNumber: string;
  qrCodeUrl: string | null;
}

export const paymentAccountService = {
  getMine: () => apiFetch<PaymentAccount | null>("/payment-account/me"),

  upsert: (input: UpsertPaymentAccountInput) =>
    apiFetch<PaymentAccount>("/payment-account/me", {
      method: "PUT",
      body: JSON.stringify({ paymentType: "PROMPTPAY", ...input }),
    }),
};
