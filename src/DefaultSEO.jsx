import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
const SITE_URL = 'https://luai.io';
const DEFAULT_TITLE = 'Luai - Cybersecurity Expert & Penetration Testing Services';
const DEFAULT_DESC = 'Professional cybersecurity services including penetration testing, security audits, and vulnerability assessments.';
const DEFAULT_OG = `${SITE_URL}/assets/og-image.jpg`;
const TWITTER_HANDLE = '@Luai_io';
export default function DefaultSEO() {
  const { pathname, search } = useLocation();
  const currentUrl = `${SITE_URL}${pathname}${search ?? ''}`;
  
  return (
    <Helmet prioritizeSeoTags>
      <html lang="en" />
      <title>{DEFAULT_TITLE}</title>
      <meta name="description" content={DEFAULT_DESC} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={currentUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Luai.io" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={DEFAULT_TITLE} />
      <meta property="og:description" content={DEFAULT_DESC} />
      <meta property="og:image" content={DEFAULT_OG} />
      <meta property="og:image:secure_url" content={DEFAULT_OG} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Luai.io – Cybersecurity Services" />
      <meta property="og:locale" content="en_US" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={DEFAULT_TITLE} />
      <meta name="twitter:description" content={DEFAULT_DESC} />
      <meta name="twitter:image" content={DEFAULT_OG} />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": ["Organization", "ProfessionalService"],
          "name": "Luai",
          "url": SITE_URL,
          "logo": `${SITE_URL}/assets/og-image.jpg`,
          "description": "Professional cybersecurity services including penetration testing, security audits, and vulnerability assessments.",
          "founder": {
          "@type": "Person",
          "name": "Eliran Loai Deeb"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+54-9-11-24828429",
            "contactType": "Customer Service",
            "email": "info@luai.io"
          },
          "sameAs": [
            "https://www.linkedin.com/company/luai-io",
            "https://twitter.com/Luai_io",
            "https://www.instagram.com/luai.io/"
          ],
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Tucumán",
            "addressCountry": "AR",
            "postalCode": "4000",
            "streetAddress": "Av. Mitre 500"
          },
          "serviceType": [
            "Penetration Testing",
            "Vulnerability Assessment", 
            "Security Audit",
            "Incident Response",
            "Red Team Operations",
            "Compliance Consulting",
            "Security Training"
          ]
        })}
      </script>
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    </Helmet>
  );
}