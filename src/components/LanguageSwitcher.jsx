import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Globe } from 'lucide-react';

const LanguageSwitcher = ({ className = '' }) => {
  const { currentLanguage, changeLanguage } = useLanguage();

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' }
  ];

  return (
    <div className={`relative inline-block ${className}`}>
      <div className="flex items-center space-x-2">
        <Globe className="w-4 h-4 text-gray-600 dark:text-gray-300" />
        <select
          value={currentLanguage}
          onChange={(e) => changeLanguage(e.target.value)}
          className="bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:border-blue-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 cursor-pointer min-w-[100px]"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code} className="bg-white dark:bg-gray-800">
              {lang.flag} {lang.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
