import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './LanguageSwitcher.css';

const LanguageSwitcher = ({ className = '' }) => {
  const { currentLanguage, changeLanguage } = useLanguage();

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸', shortName: 'EN' },
    { code: 'es', name: 'Español', flag: '🇪🇸', shortName: 'ES' }
  ];

  return (
    <div className={`language-switcher ${className}`}>
      <div className="language-toggle">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={`language-btn ${currentLanguage === lang.code ? 'active' : ''}`}
            title={lang.name}
          >
            <span className="flag">{lang.flag}</span>
            <span className="lang-code">{lang.shortName}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;
