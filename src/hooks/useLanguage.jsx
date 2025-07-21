import { useState, useEffect } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext';

const translations = {
  en: {
    heroTitle: "Your Business Is Under Attack",
    heroSubtitle: "You Just Don't Know It Yet",
    heroDescription: "Every 11 seconds, a business gets hacked. While you're reading this, cybercriminals are already probing your defenses.",
    ctaPrimary: "🚨 Find My Vulnerabilities NOW",
    ctaSecondary: "See How Hackers Think",
    navHome: "Home",
    navServices: "Services",
    navAbout: "About",
    navContact: "Contact",    
    servicesTitle: "Your Business Deserves Real Protection",
    servicesPenTesting: "Penetration Testing",
    servicesAudits: "Security Audits",
    servicesVulnAssess: "Vulnerability Assessments",
    contactTitle: "Stop Waiting. Start Protecting.",
    contactName: "Full Name",
    contactEmail: "Email Address",
    contactCompany: "Company/Organization",
    contactMessage: "Message",
    contactSend: "🚀 Get My Free Security Assessment",
    footerDescription: "Professional cybersecurity consulting services. Protecting businesses with advanced penetration testing and security assessments.",
    footerRights: "All rights reserved",
    required: "Required",
    optional: "Optional",
    loading: "Loading...",
    success: "Success!",
    error: "Error occurred",
  },
  es: {
    heroTitle: "Tu Negocio Está Bajo Ataque",
    heroSubtitle: "Simplemente No Lo Sabes Aún",
    heroDescription: "Cada 11 segundos, hackean una empresa. Mientras lees esto, los cibercriminales ya están probando tus defensas.",
    ctaPrimary: "🚨 Encuentra Mis Vulnerabilidades AHORA",
    ctaSecondary: "Ve Cómo Piensan Los Hackers",
    navHome: "Inicio",
    navServices: "Servicios",
    navAbout: "Nosotros",
    navContact: "Contacto",
    servicesTitle: "Tu Negocio Merece Protección Real",
    servicesPenTesting: "Pruebas de Penetración",
    servicesAudits: "Auditorías de Seguridad",
    servicesVulnAssess: "Evaluación de Vulnerabilidades",
    contactTitle: "Deja de Esperar. Empieza a Proteger.",
    contactName: "Nombre Completo",
    contactEmail: "Correo Electrónico",
    contactCompany: "Empresa/Organización",
    contactMessage: "Mensaje",
    contactSend: "🚀 Obtén Mi Evaluación Gratuita",
    footerDescription: "Servicios profesionales de consultoría en ciberseguridad. Protegiendo empresas con pruebas de penetración y evaluaciones de seguridad avanzadas.",
    footerRights: "Todos los derechos reservados",
    required: "Requerido",
    optional: "Opcional",
    loading: "Cargando...",
    success: "¡Éxito!",
    error: "Ocurrió un error",
  }
};

export const useLanguage = () => {
  const [language, setLanguage] = useState(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    if (langParam && translations[langParam]) {
      return langParam;
    }

    const saved = localStorage.getItem('language');
    if (saved && translations[saved]) {
      return saved;
    }

    const browserLang = navigator.language.slice(0, 2);
    if (translations[browserLang]) {
      return browserLang;
    }
    return 'en';
  });

  const t = (key) => {
    return translations[language][key] || translations.en[key] || key;
  };

  const changeLanguage = (newLang) => {
    if (translations[newLang]) {
      setLanguage(newLang);
      localStorage.setItem('language', newLang);
      const url = new URL(window.location);
      url.searchParams.set('lang', newLang);
      window.history.replaceState({}, '', url);
    }
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return { language, t, changeLanguage, availableLanguages: Object.keys(translations) };
};
