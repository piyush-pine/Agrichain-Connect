
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';

// Define the shape of the translation object
type Translations = { [key: string]: string | Translations };

// Define the context type
interface LanguageContextType {
  locale: string;
  setLocale: (locale: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Define the provider component
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState('en');
  const [translations, setTranslations] = useState<Translations>({});

  useEffect(() => {
    const savedLocale = localStorage.getItem('locale') || 'en';
    setLocaleState(savedLocale);
  }, []);
  
  useEffect(() => {
    async function loadTranslations() {
      try {
        const module = await import(`@/locales/${locale}.json`);
        setTranslations(module.default);
      } catch (error) {
        console.error(`Could not load translations for locale: ${locale}`, error);
        // Fallback to English if the selected locale fails
        const fallback = await import(`@/locales/en.json`);
        setTranslations(fallback.default);
      }
    }
    loadTranslations();
  }, [locale]);

  const setLocale = (newLocale: string) => {
    localStorage.setItem('locale', newLocale);
    setLocaleState(newLocale);
  };

  const t = useCallback((key: string): string => {
    const keys = key.split('.');
    let result: string | Translations | undefined = translations;
    for (const k of keys) {
      if (typeof result === 'object' && result !== null && k in result) {
        result = result[k];
      } else {
        return key; // Return the key itself if not found
      }
    }
    return typeof result === 'string' ? result : key;
  }, [translations]);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Define the custom hook to use the context
export function useTranslation() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
}
