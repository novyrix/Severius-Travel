"use client";

import { useState, useEffect } from "react";
import { Check, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "./providers/i18n-provider";

const languages = [
  { code: "en", name: "English" },
  { code: "fr", name: "Français" },
  { code: "es", name: "Español" },
] as const;

export function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const { locale, setLocale } = useI18n();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLanguageChange = (langCode: 'en' | 'es' | 'fr') => {
    setIsOpen(false);
    setLocale(langCode);
  };

  const currentLanguage = languages.find((lang) => lang.code === locale) || languages[0];

  if (!mounted) {
    return (
      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200">
        <span className="text-sm font-medium text-neutral-700">
          {currentLanguage.code.toUpperCase()}
        </span>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-colors"
        aria-label="Change language"
      >
        <span className="text-sm font-medium text-neutral-700">
          {currentLanguage.code.toUpperCase()}
        </span>
        <ChevronDown 
          className={`w-3.5 h-3.5 text-neutral-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`} 
        />
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
              className="absolute right-0 top-full mt-2 w-44 bg-white rounded-lg shadow-lg border border-neutral-200 overflow-hidden z-50"
            >
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  className={`w-full flex items-center justify-between px-4 py-3 hover:bg-neutral-50 transition-colors ${
                    locale === language.code ? "bg-neutral-50" : ""
                  }`}
                >
                  <span className="text-sm font-medium text-neutral-900">
                    {language.name}
                  </span>
                  {locale === language.code && (
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
