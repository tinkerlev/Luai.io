import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

const Services = () => {
  const { t } = useTranslation();

  const services = [
    {
      title: t('penetrationTesting'),
      description: t('penetrationTestingDesc')
    },
    {
      title: t('vulnerabilityAssessment'),
      description: t('vulnerabilityAssessmentDesc')
    },
    {
      title: t('securityConsulting'),
      description: t('securityConsultingDesc')
    }
  ];

  return (
    <section className="services">
      <h2>{t('servicesTitle')}</h2>
      <p>{t('servicesSubtitle')}</p>
      <div className="services-grid">
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <button>{t('learnMore')}</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
