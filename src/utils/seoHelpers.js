export const getSEOContent = (language) => {
  const seoContent = {
    en: {
      title: 'SecurePulses - Cybersecurity Expert & Penetration Testing Services',
      description: 'Professional cybersecurity services including penetration testing, security audits, and vulnerability assessments. Protect your business from cyber threats with SecurePulses.',
      keywords: 'cybersecurity, penetration testing, security audit, vulnerability assessment, ethical hacking, web security, API security, OWASP, NIST, ISO 27001',
      ogTitle: 'SecurePulses - Professional Cybersecurity Services',
      ogDescription: 'Expert cybersecurity consultant providing penetration testing, security audits, and vulnerability assessments. Protect your business from cyber threats.',
    },
    es: {
      title: 'SecurePulses - Experto en Ciberseguridad y Servicios de Pruebas de Penetración',
      description: 'Servicios profesionales de ciberseguridad incluyendo pruebas de penetración, auditorías de seguridad y evaluación de vulnerabilidades. Protege tu negocio de amenazas cibernéticas con SecurePulses.',
      keywords: 'ciberseguridad, pruebas de penetración, auditoría de seguridad, evaluación de vulnerabilidades, hacking ético, seguridad web, seguridad API, OWASP, NIST, ISO 27001',
      ogTitle: 'SecurePulses - Servicios Profesionales de Ciberseguridad',
      ogDescription: 'Consultor experto en ciberseguridad que ofrece pruebas de penetración, auditorías de seguridad y evaluación de vulnerabilidades. Protege tu negocio de amenazas cibernéticas.',
    }
  };

  return seoContent[language] || seoContent.en;
};

export const getHrefLangs = (currentPath) => {
  return [
    { hrefLang: 'en', href: `https://securepulses.com${currentPath}?lang=en` },
    { hrefLang: 'es', href: `https://securepulses.com${currentPath}?lang=es` },
    { hrefLang: 'x-default', href: `https://securepulses.com${currentPath}` }
  ];
};
