"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export const currencies = {
  USD: { code: "USD", symbol: "$", name: "US Dollar", rate: 1 },
  EUR: { code: "EUR", symbol: "€", name: "Euro", rate: 0.92 },
  GBP: { code: "GBP", symbol: "£", name: "British Pound", rate: 0.79 },
  KES: { code: "KES", symbol: "KSh", name: "Kenyan Shilling", rate: 129.5 },
} as const;

export type CurrencyCode = keyof typeof currencies;

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  convertPrice: (priceInUSD: number) => number;
  formatPrice: (priceInUSD: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>("USD");

  // Load currency preference from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("preferredCurrency");
    if (saved && saved in currencies) {
      setCurrencyState(saved as CurrencyCode);
    }
  }, []);

  // Save currency preference to localStorage
  const setCurrency = (newCurrency: CurrencyCode) => {
    setCurrencyState(newCurrency);
    localStorage.setItem("preferredCurrency", newCurrency);
  };

  const convertPrice = (priceInUSD: number): number => {
    const rate = currencies[currency].rate;
    return priceInUSD * rate;
  };

  const formatPrice = (priceInUSD: number): string => {
    const converted = convertPrice(priceInUSD);
    const { symbol, code } = currencies[currency];
    
    // Format with appropriate decimals
    const formatted = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: code === "KES" ? 0 : 2,
      maximumFractionDigits: code === "KES" ? 0 : 2,
    }).format(converted);

    return `${symbol}${formatted}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, convertPrice, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within CurrencyProvider");
  }
  return context;
}
