import React, { useState, useEffect } from 'react';
import { Analytics } from "@vercel/analytics/react"
import { Shield, AlertTriangle, TrendingUp } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import emailjs from '@emailjs/browser';
import {
  GradientHeading,
  PrimaryButton,
  SecondaryButton,
  GradientIconWrapper,
  SectionTitle,
  SectionSubtext,
  CardContainer,
  IconTitleText,
  TextInput,
  TextArea,
} from '../components/DesignSystem';
import '../index.css';

function sanitizeInput(value, fieldType) {
  const temp = String(value)
    .replace(/[<>]/g, '')
    .replace(/["']/g, '')
    .replace(/&/g, '&amp;')
    .replace(/\\/g, '');
  if (fieldType === 'email') {
    return temp.replace(/[^\w@.-]/g, '');
  } else if (fieldType === 'name' || fieldType === 'company') {
    return temp.replace(/[^a-zA-Z0-9 \-.,]/g, '');
  } else if (fieldType === 'message') {
    return temp.slice(0, 1000);
  }

  return temp;
}

const CountUp = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById(`count-${end}`);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [end, isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      if (suffix === '%') {
        setCount(Math.floor(progress * end));
      } else if (suffix === 'M') {
        setCount((progress * end).toFixed(1));
      } else if (suffix === ' days') {
        setCount(Math.floor(progress * end));
      }
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [isVisible, end, duration, suffix]);

  return (
    <span id={`count-${end}`} className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
      {count}{suffix}
    </span>
  );
};

const AnimatedWarningIcon = () => (
  <div className="animate-pulse">
    <AlertTriangle className="w-5 h-5 text-red-400" />
  </div>
);

const AnimatedGlobeIcon = () => (
  <div className="relative w-8 h-8 group">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-cyan-400 rounded-full shadow-xl shadow-blue-500/50 group-hover:shadow-2xl group-hover:shadow-blue-500/70 transition-all duration-300"></div>
    <div className="absolute inset-1 bg-gradient-to-br from-blue-300 via-purple-400 to-cyan-300 rounded-full flex items-center justify-center">
      <div className="relative w-4 h-4">
        <div className="absolute inset-0 border-2 border-white/70 rounded-full"></div>
        <div className="absolute top-1 left-1 w-2 h-2 border border-white/50 rounded-full animate-spin"></div>
        <div className="absolute bottom-1 right-1 w-1 h-1 bg-white/80 rounded-full animate-pulse"></div>
      </div>
    </div>
    <div className="absolute -inset-2 bg-gradient-to-br from-blue-400/10 to-purple-500/10 rounded-full group-hover:animate-ping"></div>
  </div>
);

const AnimatedServerIcon = () => (
  <div className="relative w-14 h-14 group">
    <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-400 rounded-lg shadow-xl shadow-emerald-500/50 group-hover:shadow-2xl group-hover:shadow-emerald-500/70 transition-all duration-300 group-hover:rotate-3"></div>
    <div className="absolute inset-1 bg-gradient-to-br from-emerald-300 via-teal-400 to-cyan-300 rounded-lg flex flex-col justify-center space-y-0.5 px-1">
      <div className="h-0.5 bg-white/80 rounded animate-pulse"></div>
      <div className="h-0.5 bg-white/60 rounded animate-pulse delay-100"></div>
      <div className="h-0.5 bg-white/80 rounded animate-pulse delay-200"></div>
    </div>
    <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-green-300 rounded-full animate-bounce"></div>
  </div>
);

const AnimatedCodeIcon = () => (
  <div className="relative w-10 h-10 group">
    <div className="absolute inset-0 bg-gradient-to-br from-violet-400 via-purple-500 to-indigo-400 rounded-xl shadow-xl shadow-violet-500/50 group-hover:shadow-2xl group-hover:shadow-violet-500/70 transition-all duration-300"></div>
    <div className="absolute inset-1 bg-gradient-to-br from-violet-300 via-purple-400 to-indigo-300 rounded-xl flex items-center justify-center">
      <div className="relative w-4 h-4 text-white font-mono text-xs flex items-center justify-center">
        <div className="absolute -left-1 transform group-hover:translate-x-0.5 transition-transform duration-300">&lt;</div>
        <div className="animate-pulse">/</div>
        <div className="absolute -right-1 transform group-hover:-translate-x-0.5 transition-transform duration-300">&gt;</div>
      </div>
    </div>
    <div className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full animate-ping"></div>
  </div>
);

const AnimatedShieldIcon = () => (
  <div className="relative w-14 h-14 group">
    <div className="absolute inset-0 bg-gradient-to-br from-amber-400 via-orange-500 to-red-400 rounded-2xl shadow-xl shadow-amber-500/50 group-hover:shadow-2xl group-hover:shadow-amber-500/70 transition-all duration-300 group-hover:scale-105"></div>
    <div className="absolute inset-1 bg-gradient-to-br from-amber-300 via-orange-400 to-red-300 rounded-xl flex items-center justify-center">
      <div className="relative w-3 h-4 bg-white/90 rounded-t-full rounded-b-sm">
        <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-amber-600 rounded-full animate-pulse"></div>
      </div>
    </div>
    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl group-hover:animate-pulse"></div>
  </div>
);

const AnimatedAwardIcon = () => (
  <div className="relative w-20 h-20 group">
    <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-400 rounded-full shadow-lg shadow-yellow-500/50 group-hover:shadow-xl group-hover:shadow-yellow-500/70 transition-all duration-300 animate-bounce"></div>
    <div className="absolute inset-1 bg-gradient-to-br from-yellow-300 via-amber-400 to-orange-300 rounded-full flex items-center justify-center">
      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
    </div>
    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-1 h-2 bg-gradient-to-b from-yellow-300 to-amber-400 rounded-t animate-pulse"></div>
  </div>
);

const AnimatedCheckIcon = () => (
  <div className="relative w-6 h-6 group">
    <div className="absolute inset-0 bg-gradient-to-br from-green-400 via-emerald-500 to-teal-400 rounded-full shadow-lg shadow-green-500/50 group-hover:shadow-xl group-hover:shadow-green-500/70 transition-all duration-300 group-hover:rotate-12"></div>
    <div className="absolute inset-1 bg-gradient-to-br from-green-300 via-emerald-400 to-teal-300 rounded-full flex items-center justify-center">
      <div className="w-2 h-1 border-b-2 border-r-2 border-white transform rotate-45 animate-pulse"></div>
    </div>
    <div className="absolute -inset-1 bg-gradient-to-br from-green-400/20 to-emerald-500/20 rounded-full group-hover:animate-ping"></div>
  </div>
);

const AnimatedMailIcon = () => (
  <div className="relative w-12 h-12 group">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-400 rounded-lg shadow-lg shadow-blue-500/50 group-hover:shadow-xl group-hover:shadow-blue-500/70 transition-all duration-300 group-hover:-translate-y-0.5"></div>
    <div className="absolute inset-1 bg-gradient-to-br from-blue-300 via-indigo-400 to-purple-300 rounded-lg flex items-center justify-center">
      <div className="relative w-8 h-6">
        <div className="absolute inset-0 bg-white/90 rounded-sm border border-white/70"></div>
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-6 h-4 bg-white/85 border border-white/70 rounded-t-sm origin-bottom rotate-12 shadow-sm"></div>
        <div className="absolute top-0.5 left-0.5 w-7 h-4 bg-blue-100/90 rounded-sm animate-pulse"></div>
        <div className="absolute top-1.5 left-1 w-5 h-0.5 bg-blue-400/70 rounded animate-pulse delay-100"></div>
        <div className="absolute top-2.5 left-1 w-4 h-0.5 bg-blue-400/50 rounded animate-pulse delay-200"></div>
        <div className="absolute top-3.5 left-1 w-3 h-0.5 bg-blue-400/40 rounded animate-pulse delay-300"></div>
        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-4 h-2 bg-blue-500/20 rounded-sm blur-sm"></div>
      </div>
    </div>
  </div>
);

const AnimatedPhoneIcon = () => (
  <div className="relative w-12 h-12 group">
    <div className="absolute inset-0 bg-gradient-to-br from-green-400 via-emerald-500 to-teal-400 rounded-2xl shadow-lg shadow-green-500/50 group-hover:shadow-xl group-hover:shadow-green-500/70 transition-all duration-300 group-hover:animate-bounce"></div>
    <div className="absolute inset-1 bg-gradient-to-br from-green-300 via-emerald-400 to-teal-300 rounded-2xl flex items-center justify-center">
      <div className="relative w-8 h-6">
        <div className="absolute inset-0 bg-white/95 rounded-2xl shadow-sm"></div>
        <div className="absolute -bottom-1 left-1 w-2 h-2 bg-white/95 transform rotate-45 rounded-br-sm"></div>
        <div className="absolute top-1.5 right-1 flex space-x-0.5">
          <div className="w-1 h-0.5 border-b border-r border-green-600 transform rotate-45 animate-pulse"></div>
          <div className="w-1 h-0.5 border-b border-r border-green-600 transform rotate-45 animate-pulse delay-100"></div>
        </div>
        <div className="absolute top-1 left-1 w-4 h-0.5 bg-green-500/60 rounded animate-pulse delay-200"></div>
        <div className="absolute top-2 left-1 w-3 h-0.5 bg-green-500/40 rounded animate-pulse delay-300"></div>
        <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
        <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
      </div>
    </div>

    <div className="absolute -inset-1 bg-green-400/20 rounded-2xl group-hover:animate-pulse"></div>
  </div>
);

const Landing = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', company: '', message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const validateName = (name) => {
    const nameRegex = /^[a-zA-Z\u0590-\u05FF\s]+$/;
    if (!name.trim()) return 'Name is required';
    if (!nameRegex.test(name)) return 'Name can only contain letters and spaces';
    if (name.length < 2) return 'Name must be at least 2 characters';
    if (name.length > 50) return 'Name cannot exceed 50 characters';
    const suspiciousPatterns = ['test', 'fake', 'spam', '123', 'aaa', 'xxx'];
    if (suspiciousPatterns.some(pattern => name.toLowerCase().includes(pattern))) {
      return 'Please enter a valid name';
    }
    return '';
  };
  
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.trim()) return 'Email is required';
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    if (email.length > 100) return 'Email cannot exceed 100 characters';
    return '';
  };

  const validateCompany = (company) => {
    const companyRegex = /^[a-zA-Z\u0590-\u05FF\s&.-]+$/;
    if (!company.trim()) return 'Company name is required';
    if (!companyRegex.test(company)) return 'Company name can only contain letters, spaces, &, ., and -';
    if (company.length > 15) return 'Company name cannot exceed 15 characters';
    const suspiciousPatterns = ['test', 'fake', 'spam', '123', 'aaa', 'xxx'];
    if (suspiciousPatterns.some(pattern => company.toLowerCase().includes(pattern))) {
      return 'Please enter a valid company name';
    }
    return '';
  };

  const validateMessage = (message) => {
    const messageRegex = /^[a-zA-Z0-9\u0590-\u05FF\s.,?!¿¡()-]+$/;
    if (!message.trim()) return 'Message is required';
    if (!messageRegex.test(message)) return 'Message can only contain letters, numbers, spaces, and basic punctuation (.,?!-)';
    if (message.length < 10) return 'Message must be at least 10 characters';
    if (message.length > 200) return 'Message cannot exceed 200 characters';
    return '';
  };

  const sanitizeInput = (input, type) => {
    let sanitized = input.trim();
    sanitized = sanitized.replace(/<[^>]*>/g, '');
    sanitized = sanitized.replace(/javascript:/gi, '');
    sanitized = sanitized.replace(/on\w+=/gi, '');
    
    switch (type) {
      case 'name':
        sanitized = sanitized.replace(/[^a-zA-Z\u0590-\u05FF\s]/g, '');
        break;
      case 'email':
        sanitized = sanitized.replace(/[^a-zA-Z0-9._%+-@]/g, '');
        break;
      case 'company':
        sanitized = sanitized.replace(/[^a-zA-Z\u0590-\u05FF\s&.-]/g, '');
        if (sanitized.length > 15) sanitized = sanitized.substring(0, 15);
        break;
      case 'message':
        sanitized = sanitized.replace(/[^a-zA-Z0-9\u0590-\u05FF\s.,?!()-]/g, '');
        if (sanitized.length > 200) sanitized = sanitized.substring(0, 200);
        break;
      default:
        break;
    }
    return sanitized;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log('Input changed:', name, value);

    let limitedValue = value;
    if (name === 'name' && value.length > 50) {
      limitedValue = value.substring(0, 50);
    }
    if (name === 'email' && value.length > 100) {
      limitedValue = value.substring(0, 100);
    }
    if (name === 'company' && value.length > 15) {
      limitedValue = value.substring(0, 15);
    }
    if (name === 'message' && value.length > 200) {
      limitedValue = value.substring(0, 200);
    }
    
    setFormData({ ...formData, [name]: limitedValue });   
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const sanitizedData = {
      name: sanitizeInput(formData.name, 'name'),
      reply_to: sanitizeInput(formData.email, 'email'),
      company: sanitizeInput(formData.company, 'company'),
      message: sanitizeInput(formData.message, 'message')
    };

    const newErrors = {
      name: validateName(sanitizedData.name),
      email: validateEmail(sanitizedData.reply_to),
      company: validateCompany(sanitizedData.company),
      message: validateMessage(sanitizedData.message)
    };

    const hasErrors = Object.values(newErrors).some(error => error !== '');
    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('');
    setErrors({});

    const templateParams = {
      name: sanitizedData.name,
      reply_to: sanitizedData.reply_to,
      company: sanitizedData.company,
      message: sanitizedData.message,
    };

    try {
    const mainServiceId = import.meta.env.VITE_EMAILJS_MAIN_SERVICE_ID;
    const noReplyServiceId = import.meta.env.VITE_EMAILJS_NOREPLY_SERVICE_ID;
    const notificationTemplateId = import.meta.env.VITE_EMAILJS_NOTIFICATION_TEMPLATE_ID;
    const autoReplyTemplateId = import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!mainServiceId || !noReplyServiceId || !notificationTemplateId || !autoReplyTemplateId || !publicKey) {
        throw new Error("EmailJS environment variables are not fully configured.");
    }
    console.log("2. All variables loaded. Proceeding with validation...");

    const notificationPromise = emailjs.send(mainServiceId, notificationTemplateId, templateParams, publicKey);
    const autoReplyPromise = emailjs.send(noReplyServiceId, autoReplyTemplateId, templateParams, publicKey);
    
    await Promise.all([notificationPromise, autoReplyPromise]);
    setSubmitStatus('success');
    setFormData({ name: '', email: '', company: '', message: '' });

    } catch (error) {
      console.error('FAILED to send message with EmailJS...', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGetEvaluation = () => {
    console.log('Get Evaluation clicked!');
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLearnMore = () => {
    console.log('Learn More clicked!');
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleEmailClick = async () => {
    const emailTemplate = ` info@Luai.io
  Security Evaluation Request
  Hello,

  I would like to request a security evaluation for my company.
  
  Best regards,`;
    try {
      await navigator.clipboard.writeText(emailTemplate);
      alert('Email template copied to clipboard! Paste it in your email client.');
    } catch (err) {
      const subject = encodeURIComponent('Security Evaluation Request');
      const body = encodeURIComponent('Hello,\n\nI would like to request a security evaluation for my company.\n\nBest regards');
      window.location.href = `mailto:info@Luai.io?subject=${subject}&body=${body}`;
    }
  };
  const handlePhoneClick = () => {
    console.log('Phone clicked!');
    window.open('https://wa.me/5491124828429', '_blank', 'noopener,noreferrer');
  };

  const services = [
    {
      icon: <AnimatedGlobeIcon />,
      title: "Your Website & Apps Are Your Front Door",
      description: "Every day, thousands of hackers scan websites looking for the easy targets. They don't care if you're a small business or a Fortune 500 - they just want in. We test your website and applications the same way attackers do, finding the holes before they do. Because losing customer data isn't just about money - it's about losing their trust forever."
    },
    {
      icon: <AnimatedServerIcon />,
      title: "Your Servers Hold Everything You've Built",
      description: "Your servers aren't just computers - they're the digital vault where your business lives. Customer information, financial records, years of work. When hackers get in, they don't just steal - they can shut you down completely. We secure your infrastructure so you can sleep knowing your life's work is protected."
    },
    {
      icon: <AnimatedCodeIcon />,
      title: "Your Code & APIs Power Your Business",
      description: "Behind every successful business today is code that makes it all work. But code written without security in mind is like leaving your safe open. We review how your systems talk to each other, making sure there are no secret backdoors that could cost you everything you've worked for."
    },
    {
      icon: <AnimatedShieldIcon />,
      title: "Real-World Attack Simulation",
      description: "Most security tests are just scans - we do what real hackers do. We think like them, act like them, and find what they would find. Then we show you exactly how to fix it. Because when a real attack comes (and it will), you'll be ready. Your customers' trust and your business's future depend on it."
    }
  ];

  const certifications = [
    {
      title: "founder of Luai",
      issuer: "Eliran Loai Deeb is a leading cybersecurity expert, ethical hacker, and international lecturer. Certified by Cisco, ISO/IEC security standards, and trained in Offensive Security through a specialized Israeli Ministry of Defense program. Eliran helps companies uncover hidden vulnerabilities before attackers do and teaches the same techniques in live workshops and training sessions for professionals, universities, and high tech teams ",
      image: "/assets/IMG_9710.jpg"
    }
  ];

  return (
    <>
      <Helmet>
        {/* Basic SEO Meta Tags */}
        <title>Luai - Cybersecurity Expert & Penetration Testing Services</title>
        <meta name="description" content="Professional cybersecurity services including penetration testing, security audits, and vulnerability assessments. Protect your business from cyber threats with Luai." />
        <meta name="keywords" content="cybersecurity, penetration testing, security audit, vulnerability assessment, ethical hacking, web security, API security, OWASP, NIST, ISO 27001" />
        <meta name="author" content="Eliran Loai Deeb - Luai" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="en" />
        <meta name="revisit-after" content="7 days" />
        
        {/* Open Graph Meta Tags for Social Media */}
        <meta property="og:title" content="Luai - Professional Cybersecurity Services" />
        <meta property="og:description" content="Expert cybersecurity consultant providing penetration testing, security audits, and vulnerability assessments. Protect your business from cyber threats." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://luai.io" />
        <meta property="og:image" content="https://luai.io/assets/Luai-logo.png" />
        <meta property="og:site_name" content="Luai" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Luai - Cybersecurity Expert Services" />
        <meta name="twitter:description" content="Professional penetration testing and security consulting services. Protect your business from cyber threats." />
        <meta name="twitter:image" content="https://luai.io/twitter-image.jpg" />
        <meta name="twitter:site" content="@luai" />
                
        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="YOUR_GOOGLE_SEARCH_CONSOLE_CODE" />
        
        {/* Structured Data for Search Engines */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Luai",
            "url": "https://luai.io",
            "logo": "https://luai.io/assets/Luai-logo.png",
            "description": "Professional cybersecurity services including penetration testing, security audits, and vulnerability assessments.",
            "founder": {
              "@type": "Person",
              "name": "Eliran Loai Deeb"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+54-9-11-24828429",
              "contactType": "Customer Service",
              "email": "info@Luai.io"
            },
            "sameAs": [
              "https://www.linkedin.com/company/Luai",
              "https://twitter.com/Luai"
            ]
          })}
        </script>
        
        {/* Additional SEO Meta Tags */}
        <meta name="geo.region" content="IL" />
        <meta name="geo.placename" content="Israel" />
        <meta name="geo.position" content="31.0461;34.8516" />
        <meta name="ICBM" content="31.0461, 34.8516" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://luai.io" />
        
        {/* Favicon */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      </Helmet>
      
      <Header />      
      <div className="w-full relative overflow-hidden">
        {/* HERO */}
        <section id="home" className="w-full py-20 relative z-20 pt-32">
          {/* Video Background for HERO section only */}
          <video 
            className="absolute inset-0 w-full h-full object-cover z-0"
            autoPlay 
            muted 
            loop 
            playsInline
            style={{
              objectPosition: 'center center'
            }}
          >
            <source src="/assets/0_Abstract_Design_Data_Visualization_3840x2160.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-black bg-opacity-60 z-10"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-20">
            
            {/* Urgent Warning Badge */}
            <div className="inline-flex items-center bg-red-500/20 border border-red-500/30 rounded-full px-6 py-3 mb-8 hover:bg-red-500/30 transition-all duration-300 backdrop-blur-sm">
              <AnimatedWarningIcon />
              <span className="text-red-300 ml-2 font-semibold">
                <strong>Did you know? </strong> Hackers don’t only go after big companies. they also scan small and local businesses because it’s easier to break in.
              </span>
            </div>

            {/* Main Headline - More Direct and Fear-Based */}
            <div className="mb-8">
              <GradientHeading>
                That means your business could be at risk
                <br /> 
                <span className="text-white">But here’s the good news: you can protect it</span>
              </GradientHeading>
            </div>

            {/* Subheadline with Hook */}
            <div className="mb-12">
              <SectionSubtext>
                <strong className="text-white">Every 11 seconds, a business is hacked worldwide </strong>
                <br />
                At <span className="text-red-400 font-semibold">Luai.io</span> we show you where the weak points are and how to fix them,
                <br />
                so you can focus on your business without stress
                <br /><br />
                <strong className="text-red-400">It’s not about fear. it’s about being prepared. <br />Stay safe! Stay focused. </strong>
              </SectionSubtext>
            </div>

            {/* Reality Check Section */}
            <div className="bg-gradient-to-r from-red-500/15 to-orange-500/15 rounded-2xl p-8 mb-12 border border-red-500/30 max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold text-white mb-6">Here's What's Happening Right Now</h2>
              <div className="grid md:grid-cols-3 gap-6 text-left">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <p className="text-gray-200 font-semibold">Every 14 Seconds</p>
                  </div>
                  <p className="text-gray-300">A small business gets ransomware</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                    <p className="text-gray-200 font-semibold">95% of Breaches</p>
                  </div>
                  <p className="text-gray-300">Are caused by human error or weak security</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                    <p className="text-gray-200 font-semibold">60% of Companies</p>
                  </div>
                  <p className="text-gray-300">Go out of business within 6 months of a cyber attack</p>
                </div>
              </div>
            </div>

            {/* The Hard Truth */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">The Hard Truth About Your "Security"</h2>
              <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto text-left">
                <div className="bg-red-500/10 p-6 rounded-xl border border-red-500/30">
                  <h3 className="text-xl font-bold text-red-400 mb-4">What You Think You Have</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• "Our IT guy handles security"</li>
                    <li>• "We have antivirus software"</li>
                    <li>• "We're too small to be targeted"</li>
                    <li>• "Our passwords are strong enough"</li>
                    <li>• "We backup our data sometimes"</li>
                  </ul>
                </div>
                <div className="bg-blue-500/10 p-6 rounded-xl border border-blue-500/30">
                  <h3 className="text-xl font-bold text-blue-400 mb-4">What Hackers Actually See</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Outdated systems with known vulnerabilities</li>
                    <li>• Unencrypted data transmission</li>
                    <li>• Easy social engineering targets</li>
                    <li>• Misconfigured security settings</li>
                    <li>• Zero real-time threat detection</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* CTA Buttons - More Urgent */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button
                onClick={handleGetEvaluation}
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-red-600 to-purple-600 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                🚨 Find My Vulnerabilities NOW
              </button>
              <button
                onClick={handleLearnMore}
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-blue-400 border border-blue-400/30 rounded-xl shadow-lg hover:shadow-xl hover:bg-blue-400/10 transform hover:scale-105 transition-all duration-300"
              >
                See How Hackers Think
              </button>
            </div>

            {/* Social Proof Before Stats */}
            <div className="mb-12">
              <p className="text-xl text-gray-300 mb-4">
                <strong className="text-white">"I thought our business was secure until Eliran showed me 47 vulnerabilities in our first meeting."</strong>
              </p>
              <p className="text-gray-400">— David Cohen, CEO TechFlow Solutions</p>
            </div>

            {/* Risk Stats - Enhanced */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-2xl blur-xl"></div>
              <div className="relative bg-slate-800/90 backdrop-blur-sm rounded-2xl p-8 max-w-5xl mx-auto border border-slate-700/50 shadow-2xl">
                <div className="flex items-center justify-center mb-8">
                  <AlertTriangle className="w-8 h-8 text-red-400 mr-3" />
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                    Your Business Is At Risk RIGHT NOW
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="group">
                    <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-xl p-6 border border-slate-600/30 hover:border-red-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-red-400/10">
                      <div className="mb-4">
                        <CountUp end={75} suffix="%" />
                      </div>
                      <p className="text-gray-300 text-lg leading-relaxed">
                        of companies like yours have <strong className="text-red-400">critical vulnerabilities</strong> right now
                      </p>
                      <div className="mt-4 w-full bg-slate-700 rounded-full h-2">
                        <div className="bg-gradient-to-r from-red-400 to-orange-500 h-2 rounded-full w-[75%] animate-pulse"></div>
                      </div>
                    </div>
                  </div>

                  <div className="group">
                    <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-xl p-6 border border-slate-600/30 hover:border-yellow-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/10">
                      <div className="mb-4">
                        <CountUp end={4.5} suffix="M" />
                        <span className="text-sm text-gray-400 ml-1">USD</span>
                      </div>
                      <p className="text-gray-300 text-lg leading-relaxed">
                        average cost when hackers <strong className="text-yellow-400">succeed</strong> (and they will)
                      </p>
                      <div className="mt-4 flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-red-400 animate-bounce" />
                      </div>
                    </div>
                  </div>

                  <div className="group">
                    <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-xl p-6 border border-slate-600/30 hover:border-red-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-red-400/10">
                      <div className="mb-4">
                        <CountUp end={280} suffix=" days" />
                      </div>
                      <p className="text-gray-300 text-lg leading-relaxed">
                        hackers stay in your systems <strong className="text-red-400">stealing everything</strong> before you notice
                      </p>
                      <div className="mt-4 w-full bg-slate-700 rounded-full h-2">
                        <div className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full w-full animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Final CTA in Stats Section */}
                <div className="mt-8 text-center">
                  <p className="text-xl text-white mb-4">
                    <strong>Don't become another statistic.</strong>
                  </p>
                  <button
                    onClick={handleGetEvaluation}
                    className="inline-flex items-center justify-center px-10 py-4 text-lg font-bold text-white bg-gradient-to-r from-red-600 to-purple-600 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                  >
                    Protect My Business Now
                  </button>
                  <p className="text-gray-400 text-sm mt-2">Free security assessment • Find vulnerabilities in 24 hours</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-60 z-10"></div>

          {/* SERVICES */}
          <section id="services" className="w-full py-20 relative z-20">
            <div className="max-w-7xl text-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <SectionTitle>Your Business Deserves Real Protection</SectionTitle>
              <SectionSubtext>
                You didn't build your business to hand it over to hackers. But that's exactly what happens to thousands of business owners every year - not because they didn't care, but because they didn't know how vulnerable they really were.
                <br /><br />
                <strong className="text-white">Here's the truth:</strong> Having IT people doesn't mean you have cybersecurity. 
                <br />
                Your developers are brilliant at building, but are they trained to think like hackers? 
                <br />
                <strong className="text-blue-400">That's where we come in.</strong>
              </SectionSubtext>
              
              {/* New emotional hook section */}
              <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-2xl p-8 mb-12 border border-red-500/20">
                <h3 className="text-2xl font-bold text-white mb-4">What Happens When You Get Hacked?</h3>
                <div className="grid md:grid-cols-2 gap-6 text-left">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-300">Your customers lose trust - and their business</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-300">Operations shut down while you scramble to fix everything</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-300">Legal fees, fines, and insurance claims pile up</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-300">Your reputation gets destroyed online</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-300">Competitors gain advantage while you're down</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-300">Years of hard work can disappear overnight</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h3 className="text-2xl font-bold text-white mb-6">But It Doesn't Have To Be This Way</h3>
                <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                  Every vulnerability we find and fix is an attack that can't hurt you. 
                  Every weak point we strengthen is another layer protecting everything you've built. 
                  <strong className="text-blue-400"> This isn't just about technology - it's about protecting your legacy.</strong>
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mt-10 max-w-6xl mx-auto">
                {services.map((service, index) => (
                  <div key={index} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 shadow-2xl text-left group hover:bg-slate-800/70 transition-all duration-300">
                    <div className="flex items-start space-x-4 mb-6">
                      <div className="flex-shrink-0">
                        {service.icon}
                      </div>
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">{service.title}</h3>
                    </div>
                    <p className="text-gray-300 leading-relaxed codefont2 text-base">{service.description}</p>
                  </div>
                ))}
              </div>

              {/* Call to action section */}
              <div className="mt-16 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-8 border border-blue-500/20">
                <h3 className="text-3xl font-bold text-white mb-4">Don't Wait for an Attack to Find Your Weaknesses</h3>
                <p className="text-xl text-gray-300 mb-8 max-w-4xl mx-auto">
                  Every day you wait is another day hackers have to find what we could have already fixed. 
                  Your business, your customers, and your peace of mind are worth more than the cost of protection.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={handleGetEvaluation}
                    className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    Get Your Free Security Assessment
                  </button>
                  <button
                    onClick={() => scrollToSection('about')}
                    className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-blue-400 border border-blue-400/30 rounded-xl shadow-lg hover:shadow-xl hover:bg-blue-400/10 transform hover:scale-105 transition-all duration-300"
                  >
                    See Why Business Owners Trust Us
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* ABOUT */}
          <section id='about' className="w-full py-20 relative z-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto text-center">
                <SectionTitle>Why Business Owners Trust Me</SectionTitle>
                <SectionSubtext>
                  <strong className="text-white">Here's what separates me from every other "cybersecurity consultant" out there:</strong>
                  <br /><br />
                  Most people in this industry learned cybersecurity from books and courses. 
                  <strong className="text-red-400"> I learned it in the Israeli Ministry of Defense.</strong>
                  <br />
                  While others were studying theory, I was training with the same techniques that elite military units use to break into the most secure systems in the world.
                  <br /><br />
                  <strong className="text-blue-400">I don't just find vulnerabilities - I think like the attackers who want to destroy your business.</strong>
                </SectionSubtext>

                {/* Professional credibility section */}
                <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-8 mb-12 border border-blue-500/20">
                  <h3 className="text-2xl font-bold text-white mb-6">The Difference Is Real</h3>
                  <div className="grid md:grid-cols-2 gap-8 text-left">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-300"><strong>Cisco Certified</strong> - Not just any certification, but the ones that prove I understand enterprise-level security</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-300"><strong>ISO/IEC Security Standards Expert</strong> - I help companies pass the audits that others fail</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-300"><strong>Ministry of Defense Training</strong> - Offensive Security techniques that aren't taught anywhere else</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-300"><strong>International Lecturer</strong> - Universities and corporations trust me to teach their teams</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-300"><strong>Live Workshop Leader</strong> - I don't just talk about security, I demonstrate it in real-time</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-300"><strong>High-Tech Team Trainer</strong> - If it's good enough for tech giants, it's good enough for your business</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Personal story and trust building */}
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-white mb-6">Here's What Really Matters</h3>
                  <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-6">
                    I've seen what happens when businesses get hit. I've watched companies lose everything because they thought their IT guy was enough. 
                    I've seen entrepreneurs' life work disappear overnight because they trusted the wrong people with their security.
                  </p>
                  <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-6">
                    <strong className="text-red-400">That's exactly why I do this work.</strong>
                  </p>
                  <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                    When I test your systems, I'm not just looking for technical flaws. I'm thinking: 
                    <strong className="text-blue-400">"If I wanted to steal this company's data, shut down their operations, or destroy their reputation - how would I do it?"</strong>
                    <br />
                    Then I show you exactly how to stop me.
                  </p>
                </div>

                {/* The founder profile with stronger messaging */}
                <div className="grid md:grid-cols-1 gap-12 mt-10 max-w-3xl mx-auto">
                  <div className="flex items-center gap-8 bg-slate-800/70 backdrop-blur-sm border border-slate-700/50 p-8 rounded-2xl shadow-2xl">
                    <img 
                      src="/assets/IMG_9710.jpg" 
                      alt="Eliran Loai Deeb - Founder of Luai" 
                      className="w-40 h-40 rounded-full object-cover border-4 border-blue-500 shadow-2xl flex-shrink-0"
                    />
                    <div className="text-left">
                      <h3 className="text-2xl font-bold text-white mb-3">Eliran Loai Deeb</h3>
                      <p className="text-blue-400 font-semibold mb-4">Founder & Lead Security Consultant</p>
                      <p className="text-gray-300 leading-relaxed text-lg">
                        "I don't work with companies that can afford to lose everything. I work with business owners who understand that 
                        <strong className="text-white"> their reputation, their customers' trust, and their life's work are worth protecting.</strong>
                        <br /><br />
                        If you're serious about protecting what you've built, we should talk."
                      </p>
                    </div>
                  </div>
                </div>

                {/* Urgency and scarcity section */}
                <div className="mt-16 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-2xl p-8 border border-red-500/20">
                  <h3 className="text-3xl font-bold text-white mb-4">You Have Two Choices</h3>
                  <div className="grid md:grid-cols-2 gap-8 text-left mb-8">
                    <div className="bg-red-500/10 p-6 rounded-xl border border-red-500/30">
                      <h4 className="text-xl font-bold text-red-400 mb-3">Choice 1: Wait and Hope</h4>
                      <ul className="space-y-2 text-gray-300">
                        <li>• Keep hoping your current setup is enough</li>
                        <li>• Trust that hackers won't find you</li>
                        <li>• Cross your fingers that nothing bad will happen</li>
                        <li>• Deal with the consequences when it's too late</li>
                      </ul>
                    </div>
                    <div className="bg-green-500/10 p-6 rounded-xl border border-green-500/30">
                      <h4 className="text-xl font-bold text-green-400 mb-3">Choice 2: Take Control</h4>
                      <ul className="space-y-2 text-gray-300">
                        <li>• Get a real security assessment from an expert</li>
                        <li>• Find and fix vulnerabilities before attackers do</li>
                        <li>• Sleep knowing your business is protected</li>
                        <li>• Focus on growing instead of worrying</li>
                      </ul>
                    </div>
                  </div>
                  <p className="text-xl text-white text-center mb-6">
                    <strong>The choice is yours. But remember - hackers have already made theirs.</strong>
                  </p>
                  <div className="text-center">
                    <button
                      onClick={handleGetEvaluation}
                      className="inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                    >
                      Get Your Security Assessment Now
                    </button>
                    <p className="text-gray-400 text-sm mt-3">Free consultation • No obligation • Immediate insights</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section id="partners" className="w-full py-20 relative z-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
              <SectionTitle>They Trusted Me With Their Security</SectionTitle>
              <SectionSubtext>
                <strong className="text-white">These companies made the smart choice.</strong>
                <br />
                They didn't wait for an attack. They didn't hope for the best. 
                <br />
                They called in an expert <strong className="text-blue-400">before it was too late.</strong>
                <br /><br />
                <strong className="text-red-400">Now they sleep peacefully knowing their business is protected.</strong>
              </SectionSubtext>
              <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-2xl p-6 mb-8 border border-green-500/20 max-w-4xl mx-auto">
                <h3 className="text-xl font-bold text-white mb-4">Real Results, Real Peace of Mind</h3>
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <p className="text-3xl font-bold text-green-400 mb-2">0</p>
                    <p className="text-gray-300">Successful attacks on our protected clients</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-blue-400 mb-2">100%</p>
                    <p className="text-gray-300">Client satisfaction rate</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-purple-400 mb-2">24hrs</p>
                    <p className="text-gray-300">Average response time for critical issues</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full overflow-hidden">
              <div className="flex animate-scroll-right space-x-20 items-center">
                <div className="flex-shrink-0 w-48 h-32 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg">
                  <img src="/assets/partners/Dazlogo-e1674934830878.png" alt="Partner 1" className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="flex-shrink-0 w-48 h-32 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg">
                  <img src="/assets/partners/Logo-Kavak-Deportes.svg" alt="Partner 2" className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="flex-shrink-0 w-48 h-32 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg">
                  <img src="/assets/partners/bugcrowd-logo-b90c52e691ace97f54db4d459c246639e26907e862b4c58b39173d2fac146fd0.svg" alt="Partner 3" className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="flex-shrink-0 w-48 h-32 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg">
                  <img src="/assets/partners/logo.svg" alt="Partner 4" className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="flex-shrink-0 w-48 h-32 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg">
                  <img src="/assets/partners/Dazlogo-e1674934830878.png" alt="Partner 1" className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="flex-shrink-0 w-48 h-32 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg">
                  <img src="/assets/partners/Logo-Kavak-Deportes.svg" alt="Partner 2" className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="flex-shrink-0 w-48 h-32 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg">
                  <img src="/assets/partners/bugcrowd-logo-b90c52e691ace97f54db4d459c246639e26907e862b4c58b39173d2fac146fd0.svg" alt="Partner 3" className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="flex-shrink-0 w-48 h-32 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg">
                  <img src="/assets/partners/logo.svg" alt="Partner 4" className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="flex-shrink-0 w-48 h-32 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg">
                  <img src="/assets/partners/Dazlogo-e1674934830878.png" alt="Partner 1" className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="flex-shrink-0 w-48 h-32 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg">
                  <img src="/assets/partners/Logo-Kavak-Deportes.svg" alt="Partner 2" className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="flex-shrink-0 w-48 h-32 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg">
                  <img src="/assets/partners/bugcrowd-logo-b90c52e691ace97f54db4d459c246639e26907e862b4c58b39173d2fac146fd0.svg" alt="Partner 3" className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="flex-shrink-0 w-48 h-32 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg">
                  <img src="/assets/partners/logo.svg" alt="Partner 4" className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                {/* Fourth Set for Continuous Loop Completion */}
                <div className="flex-shrink-0 w-48 h-32 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg">
                  <img src="/assets/partners/Dazlogo-e1674934830878.png" alt="Partner 1" className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="flex-shrink-0 w-48 h-32 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg">
                  <img src="/assets/partners/Logo-Kavak-Deportes.svg" alt="Partner 2" className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="flex-shrink-0 w-48 h-32 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg">
                  <img src="/assets/partners/bugcrowd-logo-b90c52e691ace97f54db4d459c246639e26907e862b4c58b39173d2fac146fd0.svg" alt="Partner 3" className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="flex-shrink-0 w-48 h-32 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg">
                  <img src="/assets/partners/logo.svg" alt="Partner 4" className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="flex-shrink-0 w-48 h-32 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg">
                  <img src="/assets/partners/Dazlogo-e1674934830878.png" alt="Partner 1" className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="flex-shrink-0 w-48 h-32 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg">
                  <img src="/assets/partners/Logo-Kavak-Deportes.svg" alt="Partner 2" className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="flex-shrink-0 w-48 h-32 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg">
                  <img src="/assets/partners/bugcrowd-logo-b90c52e691ace97f54db4d459c246639e26907e862b4c58b39173d2fac146fd0.svg" alt="Partner 3" className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="flex-shrink-0 w-48 h-32 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg">
                  <img src="/assets/partners/logo.svg" alt="Partner 4" className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                {/* Fourth Set for Continuous Loop Completion */}
                <div className="flex-shrink-0 w-48 h-32 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg">
                  <img src="/assets/partners/Dazlogo-e1674934830878.png" alt="Partner 1" className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="flex-shrink-0 w-48 h-32 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg">
                  <img src="/assets/partners/Logo-Kavak-Deportes.svg" alt="Partner 2" className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="flex-shrink-0 w-48 h-32 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg">
                  <img src="/assets/partners/bugcrowd-logo-b90c52e691ace97f54db4d459c246639e26907e862b4c58b39173d2fac146fd0.svg" alt="Partner 3" className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="flex-shrink-0 w-48 h-32 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg">
                  <img src="/assets/partners/logo.svg" alt="Partner 4" className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            </div>

            {/* Bottom testimonial */}
            <div className="max-w-4xl mx-auto mt-12 text-center">
              <p className="text-xl text-gray-300 mb-4">
                <strong className="text-white">"Other consultants found 3 vulnerabilities. Eliran found 23. That's when I realized how exposed we really were."</strong>
              </p>
              <p className="text-gray-400">— Sarah Martinez, CTO FinanceSecure</p>
            </div>
          </section>

          {/* CONTACT */}
          <section id="contact" className="w-full py-20 relative z-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto text-center">
                <SectionTitle>Stop Waiting. Start Protecting.</SectionTitle>
                <SectionSubtext>
                  <strong className="text-white">Every second you delay is another second hackers have to find your weaknesses.</strong>
                  <br />
                  Don't let your business become another statistic.
                  <br /><br />
                  <strong className="text-red-400">The call you make today could save everything you've worked for.</strong>
                </SectionSubtext>

                <div className="bg-gradient-to-r from-red-500/15 to-orange-500/15 rounded-2xl p-6 mb-12 border border-red-500/30">
                  <h3 className="text-2xl font-bold text-white mb-4">🚨 Limited Availability Alert</h3>
                  <p className="text-xl text-gray-300 mb-4">
                    I only take on <strong className="text-red-400">5 new clients per month</strong> to ensure each business gets the attention it deserves.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4 text-center">
                    <div className="bg-red-500/20 p-4 rounded-xl border border-red-500/40">
                      <p className="text-lg font-bold text-red-300">December 2024</p>
                      <p className="text-red-400">2 spots left</p>
                    </div>
                    <div className="bg-orange-500/20 p-4 rounded-xl border border-orange-500/40">
                      <p className="text-lg font-bold text-orange-300">January 2025</p>
                      <p className="text-orange-400">Taking bookings</p>
                    </div>
                    <div className="bg-yellow-500/20 p-4 rounded-xl border border-yellow-500/40">
                      <p className="text-lg font-bold text-yellow-300">February 2025</p>
                      <p className="text-yellow-400">Waitlist only</p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="flex justify-center">
                    <div className="w-full max-w-xs">
                      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 shadow-lg">
                        <h3 className="text-xl font-bold text-white mb-4 text-center">Get Immediate Response</h3>
                        <div className="space-y-4 text-center">
                          <div 
                            className="flex items-center justify-start space-x-4 group hover:scale-105 transition-transform duration-300 cursor-pointer w-full p-3 rounded-xl hover:bg-slate-700/30 border border-blue-500/30"
                            onClick={handleEmailClick}
                          >
                            <AnimatedMailIcon />
                            <div className="text-left">
                              <p className="text-lg font-semibold text-white">info@Luai.io</p>
                              <p className="text-sm text-gray-400">Response within 2 days</p>
                            </div>
                          </div>
                          <div 
                            className="flex items-center justify-start space-x-4 group hover:scale-105 transition-transform duration-300 cursor-pointer w-full p-3 rounded-xl hover:bg-slate-700/30 border border-green-500/30"
                            onClick={handlePhoneClick}
                          >
                            <AnimatedPhoneIcon />
                            <div className="text-left">
                              <p className="text-lg font-semibold text-white">+54 9 (11) 24828429</p>
                              <p className="text-sm text-gray-400">Emergency line available 24/7</p>
                            </div>
                          </div>
                        </div>
                        <div className="mt-6 p-4 bg-blue-500/10 rounded-xl border border-blue-500/30">
                          <p className="text-sm text-blue-300 text-center">
                            <strong>Security Emergency?</strong><br />
                            Call immediately for incident response
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="space-y-6 relative z-10">
                      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-4 border border-blue-500/30 mb-6">
                        <h3 className="text-lg font-bold text-white mb-2">Free Security Assessment Includes:</h3>
                        <ul className="space-y-1 text-gray-300 text-sm">
                          <li>• Initial vulnerability scan</li>
                          <li>• Risk priority assessment</li>
                          <li>• 30-minute consultation call</li>
                          <li>• Written security recommendations</li>
                        </ul>
                      </div>

                      {submitStatus === 'success' && (
                        <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4 text-center">
                          <p className="text-green-300">🎉 <strong>Message sent successfully!</strong> Expect my response within 2 hours. Check your email for confirmation.</p>
                        </div>
                      )}
                      
                      {submitStatus === 'error' && (
                        <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 text-center">
                          <p className="text-red-300">⚠️ <strong>Something went wrong.</strong> Please call directly for immediate assistance: +54 9 (11) 24828429</p>
                        </div>
                      )}

                      <div>
                        <input
                          type="text"
                          name="name" 
                          placeholder="Your Full Name" 
                          value={formData.name} 
                          onChange={handleInputChange}
                          maxLength={50}
                          disabled={isSubmitting}
                          className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 relative z-20 disabled:opacity-50 disabled:cursor-not-allowed"
                          style={{ zIndex: 9999, position: 'relative' }}
                        />
                        {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                      </div>
                      
                      <div>
                        <input
                          type="email"
                          name="email" 
                          placeholder="Business Email Address" 
                          value={formData.email} 
                          onChange={handleInputChange}
                          maxLength={100}
                          disabled={isSubmitting}
                          className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 relative z-20 disabled:opacity-50 disabled:cursor-not-allowed"
                          style={{ zIndex: 9999, position: 'relative' }}
                        />
                        {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                      </div>
                      
                      <div>
                        <input
                          type="text"
                          name="company" 
                          placeholder="Company Name" 
                          value={formData.company} 
                          onChange={handleInputChange}
                          maxLength={15}
                          disabled={isSubmitting}
                          className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 relative z-20 disabled:opacity-50 disabled:cursor-not-allowed"
                          style={{ zIndex: 9999, position: 'relative' }}
                        />
                        {errors.company && <p className="text-red-400 text-sm mt-1">{errors.company}</p>}
                      </div>
                      
                      <div>
                        <textarea
                          name="message" 
                          placeholder="Describe your biggest security concern..." 
                          value={formData.message} 
                          onChange={handleInputChange}
                          maxLength={200}
                          rows={4}
                          disabled={isSubmitting}
                          className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none relative z-20 disabled:opacity-50 disabled:cursor-not-allowed"
                          style={{ zIndex: 9999, position: 'relative' }}
                        />
                        <p className="text-gray-400 text-xs mt-1">{formData.message.length}/200 characters</p>
                        {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
                      </div>
                      
                      <button
                        type="submit"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="w-full px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-red-600 to-purple-600 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 relative z-20 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center justify-center space-x-2">
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span>Securing Your Spot...</span>
                          </div>
                        ) : (
                          '🚀 Get My Free Security Assessment'
                        )}
                      </button>
                      <p className="text-gray-400 text-xs text-center">
                        ⚡ Priority response • No spam • Your information stays confidential
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CERTIFICATIONS & STANDARDS */}
          <section id="certifications" className="w-full py-20 relative z-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
              <SectionTitle>Military-Grade Standards, Business-Focused Results</SectionTitle>
              <SectionSubtext>
                <strong className="text-white">I don't just meet industry standards - I exceed them.</strong>
                <br />
                These aren't just certificates on a wall. They're proof that when your business is on the line,
                <br />
                you're getting the same level of security expertise trusted by governments and Fortune 500 companies.
                <br /><br />
                <strong className="text-blue-400">Your business deserves nothing less than the absolute best.</strong>
              </SectionSubtext>

              {/* Credibility section */}
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-8 mb-12 border border-blue-500/20">
                <h3 className="text-2xl font-bold text-white mb-6">What These Standards Mean for Your Business</h3>
                <div className="grid md:grid-cols-2 gap-8 text-left">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-300"><strong>International Recognition:</strong> My work is accepted by auditors worldwide</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-300"><strong>Insurance Compliance:</strong> Meet requirements for cyber insurance discounts</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-300"><strong>Regulatory Alignment:</strong> GDPR, SOX, HIPAA, PCI-DSS compliant approaches</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-300"><strong>Client Confidence:</strong> Demonstrate security leadership to customers</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-300"><strong>Competitive Advantage:</strong> Win contracts that require security validation</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-300"><strong>Future-Proof:</strong> Stay ahead of evolving security requirements</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Scrolling Certifications Container - Full Width */}
            <div className="w-full overflow-hidden">
              <div className="flex animate-scroll-continuous space-x-20 items-center">
                {/* Certification Logos - First Set (6 logos) */}
                <div className="flex-shrink-0 w-48 h-32 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg">
                  <img src="/assets/certifications/blob.png" alt="Cisco Certification" className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="flex-shrink-0 w-48 h-32 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg">
                  <img src="/assets/certifications/NIST.svg" alt="NIST Framework" className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="flex-shrink-0 w-48 h-32 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg">
                  <img src="/assets/certifications/logo.svg" alt="TOP10" className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="flex-shrink-0 w-48 h-32 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg">
                  <img src="/assets/certifications/ATT&CK_red.png" alt="ATT&CK Standards" className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="flex-shrink-0 w-48 h-32 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg">
                  <img src="/assets/certifications/pci-logo-teal.svg" alt="PCI Certification" className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="flex-shrink-0 w-48 h-32 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg">
                  <img src="/assets/certifications/Common Criteria Logo.png" alt="Common Criteria" className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                {/* Certification Logos - Triple Set for Smooth Continuous Loop */}
                <div className="flex-shrink-0 w-48 h-32 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg">
                  <img src="/assets/certifications/blob.png" alt="Cisco Certification" className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="flex-shrink-0 w-48 h-32 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg">
                  <img src="/assets/certifications/NIST.svg" alt="NIST Framework" className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="flex-shrink-0 w-48 h-32 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg">
                  <img src="/assets/certifications/logo.svg" alt="TOP10" className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="flex-shrink-0 w-48 h-32 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg">
                  <img src="/assets/certifications/ATT&CK_red.png" alt="ATT&CK Standards" className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="flex-shrink-0 w-48 h-32 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg">
                  <img src="/assets/certifications/pci-logo-teal.svg" alt="PCI Certification" className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="flex-shrink-0 w-48 h-32 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg">
                  <img src="/assets/certifications/Common Criteria Logo.png" alt="Common Criteria" className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                {/* Third Set for Ultimate Smoothness */}
                <div className="flex-shrink-0 w-48 h-32 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg">
                  <img src="/assets/certifications/blob.png" alt="Cisco Certification" className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="flex-shrink-0 w-48 h-32 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg">
                  <img src="/assets/certifications/NIST.svg" alt="NIST Framework" className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="flex-shrink-0 w-48 h-32 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg">
                  <img src="/assets/certifications/logo.svg" alt="TOP10" className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="flex-shrink-0 w-48 h-32 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg">
                  <img src="/assets/certifications/ATT&CK_red.png" alt="ATT&CK Standards" className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="flex-shrink-0 w-48 h-32 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg">
                  <img src="/assets/certifications/pci-logo-teal.svg" alt="PCI Certification" className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="flex-shrink-0 w-48 h-32 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg">
                  <img src="/assets/certifications/Common Criteria Logo.png" alt="Common Criteria" className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                {/* Fourth Set for Continuous Loop Completion */}
                <div className="flex-shrink-0 w-48 h-32 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg">
                  <img src="/assets/certifications/blob.png" alt="Cisco Certification" className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="flex-shrink-0 w-48 h-32 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg">
                  <img src="/assets/certifications/NIST.svg" alt="NIST Framework" className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="flex-shrink-0 w-48 h-32 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg">
                  <img src="/assets/certifications/logo.svg" alt="TOP10" className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="flex-shrink-0 w-48 h-32 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg">
                  <img src="/assets/certifications/ATT&CK_red.png" alt="ATT&CK Standards" className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="flex-shrink-0 w-48 h-32 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg">
                  <img src="/assets/certifications/pci-logo-teal.svg" alt="PCI Certification" className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="flex-shrink-0 w-48 h-32 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg">
                  <img src="/assets/certifications/Common Criteria Logo.png" alt="Common Criteria" className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            </div>

            {/* Final credibility statement */}
            <div className="max-w-4xl mx-auto mt-12 text-center">
              <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-2xl p-6 border border-amber-500/30">
                <h3 className="text-xl font-bold text-white mb-4">🏆 The Bottom Line</h3>
                <p className="text-xl text-gray-300">
                  When global corporations and government agencies need someone they can trust with their most sensitive systems, 
                  <strong className="text-amber-400"> they call experts with these exact credentials.</strong>
                  <br />
                  <strong className="text-white">Your business deserves the same level of protection.</strong>
                </p>
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="w-full py-12 relative z-20 border-t border-slate-700/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-4 gap-8 mb-8">
                {/* Company Info */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Luai</h3>
                  <p className="text-gray-400 leading-relaxed mb-4">
                    Professional cybersecurity consulting services. Protecting businesses with advanced penetration testing and security assessments.
                  </p>
                  <div className="space-y-2 text-sm text-gray-400">
                    <p>📧 info@Luai.io</p>
                    <p>📱 +54 9 (11) 24828429</p>
                    <p>🌍 Serving clients globally</p>
                  </div>
                </div>
                
                {/* Services */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Our Services</h3>
                  <div className="space-y-2 text-gray-400">
                    <a href="/services/penetration-testing" className="block hover:text-blue-400 transition-colors cursor-pointer">Penetration Testing</a>
                    <a href="/services/security-audits" className="block hover:text-blue-400 transition-colors cursor-pointer">Security Audits</a>
                    <a href="/services/vulnerability-assessments" className="block hover:text-blue-400 transition-colors cursor-pointer">Vulnerability Assessments</a>
                    <a href="/services/red-team-operations" className="block hover:text-blue-400 transition-colors cursor-pointer">Red Team Operations</a>
                    <a href="/services/compliance-consulting" className="block hover:text-blue-400 transition-colors cursor-pointer">Compliance Consulting</a>
                    <a href="/services/incident-response" className="block hover:text-blue-400 transition-colors cursor-pointer">Incident Response</a>
                    <a href="/services/security-training" className="block hover:text-blue-400 transition-colors cursor-pointer">Security Training</a>
                  </div>
                </div>

                {/* Industries & Compliance */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Industries & Standards</h3>
                  <div className="space-y-2 text-gray-400 text-sm">
                    <div><strong className="text-blue-400">Industries:</strong></div>
                    <div>• Fintech & Banking</div>
                    <div>• Healthcare</div>
                    <div>• E-commerce</div>
                    <div>• SaaS & Technology</div>
                    <div>• Government Contractors</div>
                    
                    <div className="pt-2"><strong className="text-purple-400">Standards:</strong></div>
                    <div>• ISO 27001 • NIST</div>
                    <div>• PCI DSS • SOC 2</div>
                    <div>• OWASP • MITRE ATT&CK</div>
                  </div>
                </div>
                
                {/* Legal & Quick Links */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Legal & Resources</h3>
                  <div className="space-y-2">
                    <a href="/terms-of-service" className="text-gray-400 hover:text-blue-400 transition-colors duration-300 block text-sm">
                      📋 Terms of Service
                    </a>
                    <a href="/privacy-policy" className="text-gray-400 hover:text-blue-400 transition-colors duration-300 block text-sm">
                      🔒 Privacy Policy
                    </a>
                    <div className="text-gray-400 text-sm">✅ GDPR Compliant</div>
                    <div className="text-gray-400 text-sm">🛡️ ISO 27001 Aligned</div>
                    
                    <div className="pt-2">
                      <div className="text-sm text-gray-400 mb-1"><strong>Emergency Contact:</strong></div>
                      <div className="text-red-400 text-sm">🚨 24/7 Incident Response</div>
                      <div className="text-gray-400 text-xs">Call immediately for breaches</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Bottom section with certifications and legal */}
              <div className="border-t border-slate-700/50 pt-8">
                <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
                  <div className="text-center lg:text-left">
                    <p className="text-gray-400 text-sm">
                      © {new Date().getFullYear()} Luai Ltd. All rights reserved. 
                    </p>
                    <p className="text-gray-400 text-xs mt-1">
                      Registered cybersecurity consulting firm • Licensed penetration testing services
                    </p>
                  </div>
                  
                  <div className="text-center lg:text-right">
                    <p className="text-gray-400 text-xs mb-1">
                      <strong>Multi-jurisdictional compliance:</strong>
                    </p>
                    <p className="text-gray-400 text-xs">
                      🇪🇺 GDPR • 🇮🇱 Israeli Privacy Law • 🇺🇸 CCPA • 🌍 International Standards
                    </p>
                  </div>
                </div>
                
                {/* Certifications badges */}
                <div className="mt-6 text-center">
                  <p className="text-gray-500 text-xs mb-2">Certified by leading security organizations:</p>
                  <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
                    <span className="bg-slate-800/50 px-2 py-1 rounded">Cisco Certified</span>
                    <span className="bg-slate-800/50 px-2 py-1 rounded">ISO/IEC Expert</span>
                    <span className="bg-slate-800/50 px-2 py-1 rounded">Ministry of Defense Trained</span>
                    <span className="bg-slate-800/50 px-2 py-1 rounded">OWASP Member</span>
                    <span className="bg-slate-800/50 px-2 py-1 rounded">NIST Aligned</span>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Landing;
