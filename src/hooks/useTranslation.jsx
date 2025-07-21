import { useLanguage } from '../contexts/LanguageContext';

export const useTranslation = () => {
  const { translate, currentLanguage, setLanguage } = useLanguage();

  return {
    t: translate,
    currentLanguage,
    changeLanguage: setLanguage,
    isRTL: false
  };
};
