import { NextApiRequest, NextApiResponse } from 'next';
import rateLimit from 'express-rate-limit';
import slowDown from 'express-slow-down';

// Rate limiting configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'יותר מדי בקשות מכתובת IP זו, נסה שוב מאוחר יותר',
  standardHeaders: true,
  legacyHeaders: false,
});

// Speed limiting configuration
const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000, // 15 minutes
  delayAfter: 2, // allow 2 requests per 15 minutes at full speed
  delayMs: 500, // slow down subsequent requests by 500ms per request
});

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  metadata: {
    submitTime: number;
    formLoadTime: number;
    userAgent: string;
    screenResolution: string;
    timezone: string;
  };
}

class SecurityValidator {
  private static spamKeywords = [
    'casino', 'poker', 'viagra', 'cialis', 'loan', 'credit',
    'SEO', 'marketing', 'promotion', 'offer', 'deal', 'bitcoin',
    'crypto', 'investment', 'trading', 'money', 'profit'
  ];

  private static suspiciousPatterns = [
    /http[s]?:\/\//gi, // URLs
    /\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/g, // Credit card patterns
    /(.)\1{5,}/g, // Repeated characters (6 or more)
    /[A-Z]{8,}/g, // Too many consecutive uppercase
    /\b\w*\d+\w*@\w*\d+\w*\.\w+/g, // Suspicious email patterns
  ];

  static sanitizeInput(input: string): string {
    if (typeof input !== 'string') return '';
    
    return input
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<[^>]*>/g, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+=/gi, '')
      .replace(/data:/gi, '')
      .trim()
      .slice(0, 1000); // Limit length
  }

  static validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email) && email.length <= 100;
  }

  static validatePhone(phone: string): boolean {
    if (!phone) return true; // Phone is optional
    const phoneRegex = /^[0-9+\-\s()]{10,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  }

  static detectSpam(data: ContactFormData): boolean {
    const allText = `${data.name} ${data.email} ${data.message} ${data.company}`.toLowerCase();

    // Check for spam keywords
    const hasSpamKeywords = this.spamKeywords.some(keyword => 
      allText.includes(keyword.toLowerCase())
    );

    // Check for suspicious patterns
    const hasSuspiciousPatterns = this.suspiciousPatterns.some(pattern => 
      pattern.test(allText)
    );

    // Check for suspicious metadata
    const { metadata } = data;
    const timeDiff = metadata.submitTime - metadata.formLoadTime;
    
    // Too fast submission (less than 3 seconds)
    if (timeDiff < 3000) return true;
    
    // Check for bot-like behavior
    if (metadata.userAgent.includes('bot') || 
        metadata.userAgent.includes('crawler') ||
        metadata.userAgent.includes('spider')) {
      return true;
    }

    return hasSpamKeywords || hasSuspiciousPatterns;
  }

  static validateFormIntegrity(data: ContactFormData): string | null {
    // Basic field validation
    if (!data.name?.trim()) return 'שם מלא נדרש';
    if (!data.email?.trim()) return 'כתובת מייל נדרשת';
    if (!data.message?.trim()) return 'הודעה נדרשת';

    // Email validation
    if (!this.validateEmail(data.email)) {
      return 'כתובת מייל לא תקינה';
    }

    // Phone validation
    if (!this.validatePhone(data.phone)) {
      return 'מספר טלפון לא תקין';
    }

    // Length validation
    if (data.name.length > 100) return 'שם ארוך מדי';
    if (data.email.length > 100) return 'כתובת מייל ארוכה מדי';
    if (data.company.length > 200) return 'שם חברה ארוך מדי';
    if (data.message.length > 2000) return 'הודעה ארוכה מדי';

    // Spam detection
    if (this.detectSpam(data)) {
      return 'התוכן זוהה כחשוד';
    }

    return null;
  }
}

async function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Apply rate limiting
    await runMiddleware(req, res, limiter);
    await runMiddleware(req, res, speedLimiter);

    const rawData = req.body as ContactFormData;

    // Sanitize inputs
    const sanitizedData: ContactFormData = {
      name: SecurityValidator.sanitizeInput(rawData.name),
      email: SecurityValidator.sanitizeInput(rawData.email),
      phone: SecurityValidator.sanitizeInput(rawData.phone),
      company: SecurityValidator.sanitizeInput(rawData.company),
      message: SecurityValidator.sanitizeInput(rawData.message),
      metadata: rawData.metadata
    };

    // Validate form integrity
    const validationError = SecurityValidator.validateFormIntegrity(sanitizedData);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    // Additional security checks
    const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'] || '';

    // Log security event (in production, log to security monitoring system)
    console.log('Contact form submission:', {
      ip: clientIP,
      userAgent,
      timestamp: new Date().toISOString(),
      formData: {
        name: sanitizedData.name,
        email: sanitizedData.email,
        company: sanitizedData.company
      },
      metadata: sanitizedData.metadata
    });

    // Here you would typically:
    // 1. Save to database
    // 2. Send email notification
    // 3. Log the submission
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    res.status(200).json({ 
      success: true, 
      message: 'הודעה נשלחה בהצלחה' 
    });

  } catch (error) {
    console.error('Contact form error:', error);
    
    // Rate limiting error
    if (error instanceof Error && error.message.includes('Too many requests')) {
      return res.status(429).json({ 
        error: 'יותר מדי בקשות. אנא המתן לפני שליחה חוזרת' 
      });
    }

    res.status(500).json({ 
      error: 'שגיאת שרת פנימית. אנא נסה שוב מאוחר יותר' 
    });
  }
}
