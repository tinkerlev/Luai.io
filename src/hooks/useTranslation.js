import { useLanguage } from '../contexts/LanguageContext';

export const useTranslation = () => {
  const { translate, currentLanguage, isSpanish } = useLanguage();

  return {
    t: translate,
    currentLanguage,
    isSpanish,
    isRTL: false // For future RTL languages support
  };
};
