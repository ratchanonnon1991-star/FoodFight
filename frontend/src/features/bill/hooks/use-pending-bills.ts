"use client";

import * as React from "react";
import { ApiError } from "@/lib/api/client";
import { billService } from "../services/bill-service";
import type { PendingBill } from "../types/bill-types";

function getPendingBillsErrorMessage(err: unknown) {
  return err instanceof ApiError
    ? err.message
    : "Unable to load unfinished bills.";
}

export function usePendingBills() {
  const [bills, setBills] = React.useState<PendingBill[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const refresh = React.useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      setBills(await billService.listPendingBills());
    } catch (err) {
      setError(getPendingBillsErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    let isMounted = true;

    billService
      .listPendingBills()
      .then((data) => {
        if (isMounted) {
          setBills(data);
        }
      })
      .catch((err: unknown) => {
        if (isMounted) {
          setError(getPendingBillsErrorMessage(err));
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { bills, isLoading, error, refresh };
}
