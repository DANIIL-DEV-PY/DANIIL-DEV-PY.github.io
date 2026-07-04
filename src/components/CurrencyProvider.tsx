"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { FALLBACK_USD_RUB_RATE, getUsdRubRate } from "@/lib/currency";

const CurrencyContext = createContext(FALLBACK_USD_RUB_RATE);

export function CurrencyProvider({
  children,
  enabled,
}: {
  children: ReactNode;
  enabled: boolean;
}) {
  const [rate, setRate] = useState(FALLBACK_USD_RUB_RATE);

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    getUsdRubRate().then((r) => {
      if (!cancelled) setRate(r);
    });
    return () => {
      cancelled = true;
    };
  }, [enabled]);

  return (
    <CurrencyContext.Provider value={rate}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useUsdRubRate() {
  return useContext(CurrencyContext);
}
