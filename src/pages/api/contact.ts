import { NextApiRequest, NextApiResponse } from 'next';
import rateLimit from 'express-rate-limit';
import slowDown from 'express-slow-down';

// Rate limiting configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'I dont like it',
  standardHeaders: true,
  legacyHeaders: false,
});

const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000,
  delayAfter: 2,
  delayMs: 500,
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
    /http[s]?:\/\//gi,
    /\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/g,
    /(.)\1{5,}/g,
    /[A-Z]{8,}/g,
    /\b\w*\d+\w*@\w*\d+\w*\.\w+/g,
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
      .slice(0, 1000);
  }

  static validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email) && email.length <= 100;
  }

  static validatePhone(phone: string): boolean {
    if (!phone) return true;
    const phoneRegex = /^[0-9+\-\s()]{10,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  }

  static detectSpam(data: ContactFormData): boolean {
    const allText = `${data.name} ${data.email} ${data.message} ${data.company}`.toLowerCase();

    const hasSpamKeywords = this.spamKeywords.some(keyword => 
      allText.includes(keyword.toLowerCase())
    );

    const hasSuspiciousPatterns = this.suspiciousPatterns.some(pattern => 
      pattern.test(allText)
    );

    const { metadata } = data;
    const timeDiff = metadata.submitTime - metadata.formLoadTime;
    
    if (timeDiff < 3000) return true;
    
    if (metadata.userAgent.includes('bot') || 
        metadata.userAgent.includes('crawler') ||
        metadata.userAgent.includes('spider')) {
      return true;
    }

    return hasSpamKeywords || hasSuspiciousPatterns;
  }

  static validateFormIntegrity(data: ContactFormData): string | null {
    if (!data.name?.trim()) return 'Full name is required';
    if (!data.email?.trim()) return 'Email address is required';
    if (!data.message?.trim()) return 'Message is required';

    if (!this.validateEmail(data.email)) {
      return 'Invalid email address';
    }

    if (!this.validatePhone(data.phone)) {
      return 'Invalid phone number';
    }

    if (data.name.length > 100) return 'Name is too long';
    if (data.email.length > 100) return 'Email address is too long';
    if (data.company.length > 200) return 'Company name is too long';
    if (data.message.length > 2000) return 'Message is too long';

    if (this.detectSpam(data)) {
      return 'Content detected as suspicious';
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

    await new Promise(resolve => setTimeout(resolve, 1000));

    res.status(200).json({ 
      success: true, 
      message: 'Message sent successfully' 
    });

  } catch (error) {
    console.error('Contact form error:', error);
    
    if (error instanceof Error && error.message.includes('Too many requests')) {
      return res.status(429).json({ 
        error: 'Too many requests. Please wait before sending again' 
      });
    }

    res.status(500).json({ 
      error: 'Internal server error. Please try again later' 
    });
  }
}