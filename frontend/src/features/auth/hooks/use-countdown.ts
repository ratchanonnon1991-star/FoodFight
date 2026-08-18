"use client";

import * as React from "react";

export interface UseCountdownReturn {
  remainingSeconds: number;
  isExpired: boolean;
  formattedTime: string;
}

export function useCountdown(targetTimestamp: number | null | undefined): UseCountdownReturn {
  const [now, setNow] = React.useState(() => Date.now());

  React.useEffect(() => {
    if (!targetTimestamp) return;

    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTimestamp]);

  const remainingSeconds = React.useMemo(() => {
    if (!targetTimestamp) return 0;
    const diff = Math.ceil((targetTimestamp - now) / 1000);
    return Math.max(0, diff);
  }, [targetTimestamp, now]);

  const isExpired = remainingSeconds <= 0;
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return {
    remainingSeconds,
    isExpired,
    formattedTime,
  };
}
