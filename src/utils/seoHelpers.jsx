export const getSEOContent = (language) => {
  const seoContent = {
    en: {
      title: 'Luai - Cybersecurity Expert & Penetration Testing Services',
      description: 'Professional cybersecurity services including penetration testing, security audits, and vulnerability assessments. Protect your business from cyber threats with Luai.',
      keywords: 'cybersecurity, penetration testing, security audit, vulnerability assessment, ethical hacking, web security, API security, OWASP, NIST, ISO 27001',
      ogTitle: 'Luai - Professional Cybersecurity Services',
      ogDescription: 'Expert cybersecurity consultant providing penetration testing, security audits, and vulnerability assessments. Protect your business from cyber threats.',
    },
    es: {
      title: 'Luai - Experto en Ciberseguridad y Servicios de Pruebas de Penetración',
      description: 'Servicios profesionales de ciberseguridad incluyendo pruebas de penetración, auditorías de seguridad y evaluación de vulnerabilidades. Protege tu negocio de amenazas cibernéticas con Luai.',
      keywords: 'ciberseguridad, pruebas de penetración, auditoría de seguridad, evaluación de vulnerabilidades, hacking ético, seguridad web, seguridad API, OWASP, NIST, ISO 27001',
      ogTitle: 'Luai - Servicios Profesionales de Ciberseguridad',
      ogDescription: 'Consultor experto en ciberseguridad que ofrece pruebas de penetración, auditorías de seguridad y evaluación de vulnerabilidades. Protege tu negocio de amenazas cibernéticas.',
    }
  };

  return seoContent[language] || seoContent.en;
};

export const getHrefLangs = (currentPath) => {
  return [
    { hrefLang: 'en', href: `https://Luai.luai.io${currentPath}?lang=en` },
    { hrefLang: 'es', href: `https://Luai.luai.io${currentPath}?lang=es` },
    { hrefLang: 'x-default', href: `https://Luai.luai.io${currentPath}` }
  ];
};

export const generateMetaTags = (data) => {
  const {
    title = 'Luai - Cybersecurity Expert Services',
    description = 'Professional cybersecurity services including penetration testing, security audits, and vulnerability assessments.',
    keywords = 'cybersecurity, penetration testing, security audit, vulnerability assessment',
    url = 'https://Luai.luai.io',
    image = 'https://Luai.luai.io/og-image.jpg'
  } = data;

  return {
    title,
    description,
    keywords,
    canonical: url,
    openGraph: {
      title,
      description,
      url,
      image,
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      image
    }
  };
};

export const generateStructuredData = (type = 'Organization') => {
  const baseData = {
    '@context': 'https://schema.org',
    '@type': type,
    name: 'Luai',
    url: 'https://Luai.luai.io',
    description: 'Professional cybersecurity consulting services'
  };

  if (type === 'Organization') {
    return {
      ...baseData,
      founder: {
        '@type': 'Person',
        name: 'Eliran Loai Deeb'
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+54-9-11-24828429',
        email: 'info@Luai.com'
      }
    };
  }

  return baseData;
};
