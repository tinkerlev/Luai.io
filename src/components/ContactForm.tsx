import React, { useState, useRef, useEffect } from 'react';
import { Shield, Send, AlertTriangle, CheckCircle } from 'lucide-react';

// Add device memory API type definition
interface NavigatorWithDeviceMemory extends Navigator {
  deviceMemory?: number;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  honeypot: string;
}

interface FormMetadata {
  submitTime: number;
  formLoadTime: number;
  userAgent: string;
  screenResolution: string;
  timezone: string;
  fingerprint?: string;
}

// Enhanced fingerprinting for security
const generateFingerprint = (): string => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const fingerprint = [
      navigator.userAgent,
      navigator.language,
      screen.width + 'x' + screen.height,
      new Date().getTimezoneOffset(),
      navigator.hardwareConcurrency || 0,
      (navigator as NavigatorWithDeviceMemory).deviceMemory || 0,
      canvas.toDataURL()
    ].join('|');    
    let hash = 0;
    for (let i = 0; i < fingerprint.length; i++) {
      const char = fingerprint.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    
    return Math.abs(hash).toString(36);
  }
  
  // Fallback fingerprint when canvas context is not available
  return 'fallback-' + Math.random().toString(36).substring(2);
};

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    honeypot: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [formLoadTime] = useState(Date.now());
  const formRef = useRef<HTMLFormElement>(null);
  const [fingerprint] = useState<string>(generateFingerprint());

  // Rate limiting state
  const [submitCount, setSubmitCount] = useState(0);
  const [lastSubmitTime, setLastSubmitTime] = useState(0);

  // Enhanced input validation
  const validateInput = (name: string, value: string): string | null => {
    switch (name) {
      case 'name':
        if (value.length < 2) return 'שם חייב להיות באורך של לפחות 2 תווים';
        if (value.length > 100) return 'שם קצר מדי';
        if (!/^[a-zA-Z\u0590-\u05FF\s'-]+$/.test(value)) return 'שם מכיל תווים לא חוקיים';
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'פורמט כתובת המייל אינו תקין';
        if (value.length > 254) return 'המייל ארוך מדי';
        break;
      case 'phone':
        if (value && !/^[\+]?[1-9][\d\s\-\(\)]{6,15}$/.test(value)) {
          return 'פורמט מספר הטלפון אינו תקין';
        }
        break;
      case 'message':
        if (value.length < 10) return 'ההודעה חייבת להיות באורך של לפחות 10 תווים';
        if (value.length > 2000) return 'ההודעה ארוכה מדי';
        break;
    }
    return null;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Real-time validation
    const error = validateInput(name, value);
    if (error) {
      setErrorMessage(error);
    } else {
      setErrorMessage('');
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const sanitizeInput = (input: string): string => {
    return input
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<[^>]*>/g, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+=/gi, '')
      .trim();
  };

  const validateFormSpeed = (loadTime: number, submitTime: number): boolean => {
    const timeSpent = submitTime - loadTime;
    return timeSpent > 5000 && timeSpent < 1800000; // 5 seconds to 30 minutes
  };

  const checkRateLimit = (): boolean => {
    const now = Date.now();
    const timeSinceLastSubmit = now - lastSubmitTime;
    
    // Reset counter if more than 1 hour passed
    if (timeSinceLastSubmit > 3600000) {
      setSubmitCount(0);
      return true;
    }

    // Allow max 2 submissions per hour
    if (submitCount >= 2) {
      return false;
    }

    // Minimum 2 minutes between submissions
    if (timeSinceLastSubmit < 120000) {
      return false;
    }

    return true;
  };

  const detectSpamPatterns = (data: FormData): boolean => {
    const spamKeywords = [
      'casino', 'poker', 'viagra', 'cialis', 'loan', 'credit',
      'SEO', 'marketing', 'promotion', 'offer', 'deal', 'bitcoin',
      'crypto', 'investment', 'trading', 'money', 'profit', 'hack',
      'crack', 'exploit', 'ddos', 'malware'
    ];

    const suspiciousPatterns = [
      /http[s]?:\/\//gi, // URLs
      /\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/g, // Credit card patterns
      /(.)\1{5,}/g, // Repeated characters
      /[A-Z]{8,}/g, // Too many uppercase
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, // Script tags
      /javascript:/gi, // JavaScript protocol
      /data:text\/html/gi, // Data URLs
    ];

    const allText = `${data.name} ${data.email} ${data.message} ${data.company}`.toLowerCase();

    // Check for spam keywords
    const hasSpamKeywords = spamKeywords.some(keyword => 
      allText.includes(keyword.toLowerCase())
    );

    // Check for suspicious patterns
    const hasSuspiciousPatterns = suspiciousPatterns.some(pattern => 
      pattern.test(allText)
    );

    // Check message quality
    const words = data.message.split(/\s+/).filter(word => word.length > 2);
    const uniqueWords = new Set(words.map(w => w.toLowerCase()));
    
    // Too many repeated words
    if (words.length > 10 && uniqueWords.size / words.length < 0.4) {
      return true;
    }

    return hasSpamKeywords || hasSuspiciousPatterns;
  };

  const validateForm = (): string | null => {
    // Honeypot check
    if (formData.honeypot) {
      return 'בקשה נדחתה - זוהתה פעילות חשודה';
    }

    // Rate limiting check
    if (!checkRateLimit()) {
      return 'יותר מדי בקשות. אנא המתן לפני שליחה חוזרת';
    }

    // Speed validation
    if (!validateFormSpeed(formLoadTime, Date.now())) {
      return 'הטופס נשלח מהר מדי. אנא מלא את הטופס בזהירות';
    }

    // Spam detection
    if (detectSpamPatterns(formData)) {
      return 'התוכן שנשלח זוהה כחשוד. אנא בדוק את הפרטים ונסה שוב';
    }

    // Enhanced validation for each field
    for (const [key, value] of Object.entries(formData)) {
      if (key === 'honeypot') continue;
      if (key === 'phone' && !value) continue; // Optional field
      if (key === 'company' && !value) continue; // Optional field
      
      const error = validateInput(key, value);
      if (error) return error;
    }

    return null;
  };

  const collectMetadata = (): FormMetadata => {
    return {
      submitTime: Date.now(),
      formLoadTime,
      userAgent: navigator.userAgent,
      screenResolution: `${screen.width}x${screen.height}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      fingerprint
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // Sanitize all inputs
      const sanitizedData = {
        name: sanitizeInput(formData.name),
        email: sanitizeInput(formData.email),
        phone: sanitizeInput(formData.phone),
        company: sanitizeInput(formData.company),
        message: sanitizeInput(formData.message),
        timestamp: Date.now(),
        metadata: collectMetadata()
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify(sanitizedData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'שגיאה בשליחת הטופס');
      }

      // Update rate limiting
      setSubmitCount(prev => prev + 1);
      setLastSubmitTime(Date.now());

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
        honeypot: ''
      });

    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'אירעה שגיאה. אנא נסה שוב');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            צור קשר
          </h2>
          <p className="text-xl text-gray-600">
            מוכנים לחזק את האבטחה הדיגיטלית שלכם? בואו נתחיל
          </p>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          {/* Honeypot field - hidden from users */}
          <input
            type="text"
            name="honeypot"
            value={formData.honeypot}
            onChange={handleInputChange}
            style={{ display: 'none' }}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                שם מלא *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                maxLength={100}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="הזן את שמך המלא"
                autoComplete="name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                כתובת מייל *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                maxLength={254}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="your.email@company.com"
                autoComplete="email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                טלפון
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                maxLength={20}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="+1-555-123-4567"
                autoComplete="tel"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                חברה/ארגון
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                maxLength={200}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="שם החברה שלך"
                autoComplete="organization"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              הודעה *
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows={6}
              minLength={10}
              maxLength={2000}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-vertical"
              placeholder="ספר לנו על האתגרים שלך באבטחת מידע..."
            />
            <div className="text-right text-sm text-gray-500 mt-1">
              {formData.message.length}/2000 characters
            </div>
          </div>

          {submitStatus === 'error' && (
            <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0" />
              <span className="text-red-700">{errorMessage}</span>
            </div>
          )}

          {submitStatus === 'success' && (
            <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
              <span className="text-green-700">
                תודה! ההודעה נשלחה בהצלחה. נחזור אליך בהקדם
              </span>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting || !!errorMessage}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                שולח הודעה...
              </>
            ) : (
              <>
                <Send className="h-5 w-5" />
                שלח הודעה
              </>
            )}
          </button>

          <div className="text-center">
            <p className="text-sm text-gray-500">
              * שדות חובה. המידע שלך מוגן ולא יועבר לצדדים שלישיים.
            </p>
            <p className="text-xs text-gray-400 mt-2">
              מוגן על ידי אמצעי אבטחה מתקדמים כולל זיהוי ספאם ומגבלת קצב.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
