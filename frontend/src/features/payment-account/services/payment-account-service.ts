import { API_BASE_URL } from "@/config/api";
import { apiFetch } from "@/config/api-client";

export interface PaymentAccount {
  id: string;
  userId: string;
  paymentType: "PROMPTPAY";
  accountName: string;
  promptPayNumber: string;
  qrCodeUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UpsertPaymentAccountInput {
  paymentType: "PROMPTPAY";
  accountName: string;
  promptPayNumber: string;
  qrCodeUrl: string | null;
}

async function readError(response: Response, fallback: string): Promise<string> {
  const data = (await response.json().catch(() => null)) as {
    message?: string | string[];
  } | null;

  if (Array.isArray(data?.message)) {
    return data.message.join(", ");
  }

  return data?.message ?? fallback;
}

export async function getMyPaymentAccount(
  token: string,
): Promise<PaymentAccount | null> {
  const response = await apiFetch(
    `${API_BASE_URL}/payment-account/me`,
    { headers: { Authorization: `Bearer ${token}` } },
    token,
  );

  if (!response.ok) {
    throw new Error(await readError(response, "Unable to load payment account."));
  }

  return (await response.json()) as PaymentAccount | null;
}

export async function saveMyPaymentAccount(
  token: string,
  input: UpsertPaymentAccountInput,
): Promise<PaymentAccount> {
  const response = await apiFetch(
    `${API_BASE_URL}/payment-account/me`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(input),
    },
    token,
  );

  if (!response.ok) {
    throw new Error(await readError(response, "Unable to save payment account."));
  }

  return (await response.json()) as PaymentAccount;
}
