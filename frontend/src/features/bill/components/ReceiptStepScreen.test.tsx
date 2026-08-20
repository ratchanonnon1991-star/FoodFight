import * as React from "react";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { ReceiptStepScreen } from "./ReceiptStepScreen";
import { billService } from "../services/bill-service";
import type { BillDetail } from "../types/bill-types";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), back: vi.fn() }),
}));

vi.mock("@/lib/utils/image", () => ({
  compressImage: async (file: File) => file,
}));

vi.mock("../services/bill-service", () => ({
  billService: {
    getBill: vi.fn(),
    uploadReceipt: vi.fn(),
    addItem: vi.fn(),
    updateItem: vi.fn(),
    deleteItem: vi.fn(),
  },
}));

const baseBill: BillDetail = {
  id: "bill-1",
  status: "DRAFT",
  summaryCalculated: false,
  isCreator: true,
  createdBy: { id: "u1", displayName: "Alice", avatarUrl: null },
  meal: { name: "Dinner", restaurantName: "Som Tam House" },
  members: [],
  receipt: null,
  items: [
    { id: "i1", name: "Pad Thai", imageUrl: null, quantity: 1, unitPrice: 60, totalPrice: 60, assignedUserIds: [], shares: [] },
  ],
  subtotal: 60,
  serviceCharge: 0,
  tax: 0,
  discount: 0,
  totalAmount: 60,
  paymentAccount: null,
  payments: [],
  progress: { paidCount: 0, totalCount: 0, collected: 0, remaining: 0 },
};

describe("ReceiptStepScreen", () => {
  beforeEach(() => {
    vi.mocked(billService.getBill).mockResolvedValue(baseBill);
  });

  it("shows a skeleton loader in the items panel while the receipt photo is processing", async () => {
    const user = userEvent.setup();

    let resolveUpload!: (value: BillDetail) => void;
    vi.mocked(billService.uploadReceipt).mockReturnValue(
      new Promise<BillDetail>((resolve) => {
        resolveUpload = resolve;
      }),
    );

    render(<ReceiptStepScreen billId="bill-1" />);

    await screen.findByText("Pad Thai");

    const fileInput = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    const file = new File(["fake-bytes"], "receipt.jpg", { type: "image/jpeg" });

    await user.upload(fileInput, file);

    const itemsHeading = await screen.findByText(/^Items \(1\)$/);
    const itemsCard = itemsHeading.closest("div")!.parentElement!
      .parentElement as HTMLElement;

    await waitFor(() => {
      const skeletons = within(itemsCard).getAllByRole("status", {
        name: "Loading",
      });
      expect(skeletons.length).toBeGreaterThan(0);
    });

    expect(within(itemsCard).queryByText("Pad Thai")).not.toBeInTheDocument();
    expect(within(itemsCard).queryByText("฿60.00")).not.toBeInTheDocument();

    const continueButton = screen.getByRole("button", {
      name: "Continue to Split",
    });
    expect(continueButton).toBeDisabled();

    resolveUpload({
      ...baseBill,
      items: [
        { id: "i1", name: "Pad Thai", imageUrl: null, quantity: 1, unitPrice: 60, totalPrice: 60, assignedUserIds: [], shares: [] },
        { id: "i2", name: "Tom Yum", imageUrl: null, quantity: 1, unitPrice: 90, totalPrice: 90, assignedUserIds: [], shares: [] },
      ],
      subtotal: 150,
      totalAmount: 150,
    });

    await screen.findByText("Tom Yum");
    expect(
      within(itemsCard).queryAllByRole("status", { name: "Loading" }),
    ).toHaveLength(0);
    expect(screen.getByText("฿150.00")).toBeInTheDocument();
    expect(continueButton).toBeEnabled();
  });
});
