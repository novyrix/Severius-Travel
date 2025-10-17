'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import enMessages from '../../../messages/en.json'
import esMessages from '../../../messages/es.json'
import frMessages from '../../../messages/fr.json'

type Messages = typeof enMessages
type Locale = 'en' | 'es' | 'fr'

interface I18nContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
  messages: Messages
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

const messageMap: Record<Locale, Messages> = {
  en: enMessages,
  es: esMessages,
  fr: frMessages,
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en')
  const [messages, setMessages] = useState<Messages>(enMessages)

  useEffect(() => {
    // Load locale from localStorage or browser
    const savedLocale = localStorage.getItem('locale') as Locale
    const browserLocale = navigator.language.split('-')[0] as Locale
    const initialLocale = savedLocale || (messageMap[browserLocale] ? browserLocale : 'en')
    
    setLocaleState(initialLocale)
    setMessages(messageMap[initialLocale])
  }, [])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    setMessages(messageMap[newLocale])
    localStorage.setItem('locale', newLocale)
  }

  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = messages
    
    for (const k of keys) {
      value = value?.[k]
    }
    
    return value || key
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, messages }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider')
  }
  return context
}
