import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../i18n/translations';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('selectedLanguage') || 'en';
      // Validate that the saved language exists in translations
      return translations[savedLang] ? savedLang : 'en';
    }
    return 'en';
  });

  const changeLanguage = (lang) => {
    // Validate language exists before setting
    if (translations[lang]) {
      setCurrentLanguage(lang);
      if (typeof window !== 'undefined') {
        localStorage.setItem('selectedLanguage', lang);
      }
    }
  };

  const translate = (key) => {
    return translations[currentLanguage]?.[key] || key;
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = currentLanguage;
    }
  }, [currentLanguage]);

  const value = {
    currentLanguage,
    changeLanguage,
    translate,
    isSpanish: currentLanguage === 'es',
    availableLanguages: Object.keys(translations || {})
  };

  // This Provider makes 'value' available to all child components
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};