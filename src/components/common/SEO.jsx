import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from '../../hooks/useTranslation';

const SEO = ({ 
  title, 
  description, 
  keywords,
  canonical,
  type = 'website',
  image 
}) => {
  const { t, currentLanguage } = useTranslation();

  const siteTitle = 'Luai';
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const metaDescription = description || t('metaDescription');

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <html lang={currentLanguage} />
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:locale" content={currentLanguage === 'es' ? 'es_ES' : 'en_US'} />
      {image && <meta property="og:image" content={image} />}

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={metaDescription} />
      {image && <meta property="twitter:image" content={image} />}

      {/* Alternate Language Links */}
      <link rel="alternate" hrefLang="en" href={`${window.location.origin}${window.location.pathname}`} />
      <link rel="alternate" hrefLang="es" href={`${window.location.origin}${window.location.pathname}`} />
      <link rel="alternate" hrefLang="x-default" href={`${window.location.origin}${window.location.pathname}`} />
    </Helmet>
  );
};

export default SEO;
