import React, { useState, useRef, useEffect } from 'react';
import { Shield, Send, AlertTriangle, CheckCircle } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  honeypot: string; // Hidden field for bot detection
}

interface FormMetadata {
  submitTime: number;
  formLoadTime: number;
  userAgent: string;
  screenResolution: string;
  timezone: string;
}

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

  // Rate limiting state
  const [submitCount, setSubmitCount] = useState(0);
  const [lastSubmitTime, setLastSubmitTime] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
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
    return timeSpent > 5000; // Minimum 5 seconds to fill form
  };

  const checkRateLimit = (): boolean => {
    const now = Date.now();
    const timeSinceLastSubmit = now - lastSubmitTime;
    
    // Reset counter if more than 1 hour passed
    if (timeSinceLastSubmit > 3600000) {
      setSubmitCount(0);
      return true;
    }

    // Allow max 3 submissions per hour
    if (submitCount >= 3) {
      return false;
    }

    // Minimum 60 seconds between submissions
    if (timeSinceLastSubmit < 60000) {
      return false;
    }

    return true;
  };

  const detectSpamPatterns = (data: FormData): boolean => {
    const spamKeywords = [
      'casino', 'poker', 'viagra', 'cialis', 'loan', 'credit',
      'SEO', 'marketing', 'promotion', 'offer', 'deal'
    ];

    const suspiciousPatterns = [
      /http[s]?:\/\//gi, // URLs
      /\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/g, // Credit card patterns
      /(.)\1{4,}/g, // Repeated characters
      /[A-Z]{5,}/g, // Too many uppercase
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

    // Basic validation
    if (!formData.name.trim()) return 'שם מלא נדרש';
    if (!formData.email.trim()) return 'כתובת מייל נדרשת';
    if (!formData.message.trim()) return 'הודעה נדרשת';

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return 'כתובת מייל לא תקינה';
    }

    // Phone validation (if provided)
    if (formData.phone.trim()) {
      const phoneRegex = /^[0-9+\-\s()]{10,15}$/;
      if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
        return 'מספר טלפון לא תקין';
      }
    }

    return null;
  };

  const collectMetadata = (): FormMetadata => {
    return {
      submitTime: Date.now(),
      formLoadTime,
      userAgent: navigator.userAgent,
      screenResolution: `${screen.width}x${screen.height}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
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
        message: sanitizeInput(formData.message)
      };

      const metadata = collectMetadata();

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...sanitizedData,
          metadata
        }),
      });

      if (!response.ok) {
        throw new Error('שגיאה בשליחת הטופס');
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
      setErrorMessage('אירעה שגיאה בשליחת הטופס. אנא נסה שוב');
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="הזן את שמך המלא"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="your.email@company.com"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="050-123-4567"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="שם החברה שלך"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-vertical"
              placeholder="ספר לנו על האתגרים שלך באבטחת מידע..."
            />
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
            disabled={isSubmitting}
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

          <p className="text-sm text-gray-500 text-center">
            * שדות חובה. המידע שלך מוגן ולא יועבר לצדדים שלישיים
          </p>
        </form>
      </div>
    </section>
  );
}
