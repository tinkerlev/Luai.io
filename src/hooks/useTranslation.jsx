import { useLanguage } from '../contexts/LanguageContext';

export const useTranslation = () => {
  const { translate, currentLanguage } = useLanguage();

  return {
    t: translate,
    currentLanguage,
    isRTL: false
  };
};
