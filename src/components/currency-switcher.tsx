"use client";

import { useState } from "react";
import { DollarSign, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCurrency, currencies, type CurrencyCode } from "@/components/providers/currency-provider";

const currencyList = Object.entries(currencies).map(([code, info]) => ({
  code: code as CurrencyCode,
  ...info,
}));

export function CurrencySwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const { currency, setCurrency } = useCurrency();

  const handleCurrencyChange = (code: CurrencyCode) => {
    setCurrency(code);
    setIsOpen(false);
  };

  const currentCurrency = currencies[currency];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-neutral-100 transition-colors"
        aria-label="Change currency"
      >
        <DollarSign className="w-4 h-4 text-neutral-700" />
        <span className="text-xs font-semibold text-neutral-700">
          {currentCurrency.code}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-full mt-2 w-52 bg-white rounded-lg shadow-lg border border-neutral-200 overflow-hidden z-50"
            >
              {currencyList.map((curr) => (
                <button
                  key={curr.code}
                  onClick={() => handleCurrencyChange(curr.code)}
                  className={`w-full flex items-center justify-between px-4 py-3 hover:bg-neutral-50 transition-colors ${
                    currency === curr.code ? "bg-neutral-50" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-semibold text-neutral-700 w-6">
                      {curr.symbol}
                    </span>
                    <div className="text-left">
                      <div className="text-sm font-semibold text-neutral-900">
                        {curr.code}
                      </div>
                      <div className="text-xs text-neutral-600">
                        {curr.name}
                      </div>
                    </div>
                  </div>
                  {currency === curr.code && (
                    <Check className="w-4 h-4 text-[rgb(var(--color-gold))]" />
                  )}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
