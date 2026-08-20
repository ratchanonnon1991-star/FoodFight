"use client";

import * as React from "react";
import { ApiError } from "@/lib/api/client";
import { billService } from "../services/bill-service";
import type { BillDetail } from "../types/bill-types";

export function useBill(billId: string) {
  const [bill, setBill] = React.useState<BillDetail | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const refresh = React.useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await billService.getBill(billId);
      setBill(data);
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "Unable to load this bill.",
      );
    } finally {
      setIsLoading(false);
    }
  }, [billId]);

  React.useEffect(() => {
    void refresh();
  }, [refresh]);

  return { bill, isLoading, error, refresh, setBill };
}
