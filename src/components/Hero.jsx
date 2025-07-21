import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>{t('heroTitle')}</h1>
        <p>{t('heroSubtitle')}</p>
        <p>{t('heroDescription')}</p>
        <button className="cta-button">{t('getStarted')}</button>
      </div>
    </section>
  );
};

export default Hero;
