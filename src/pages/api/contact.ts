import { NextApiRequest, NextApiResponse } from 'next';
import rateLimit from 'express-rate-limit';
import slowDown from 'express-slow-down';
import crypto from 'crypto';
import helmet from 'helmet';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3,
  message: { error: 'Too many requests. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    const forwarded = req.headers['x-forwarded-for'];
    const ip = forwarded ? forwarded.toString().split(',')[0] : req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'] || 'unknown';
    return crypto.createHash('sha256').update(`${ip}-${userAgent}`).digest('hex');
  },
  skipSuccessfulRequests: false,
  skipFailedRequests: false,
});

const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000,
  delayAfter: 1,
  delayMs: 1000,
  maxDelayMs: 30000,
});

const ALLOWED_IPS = process.env.NODE_ENV === 'development' 
  ? ['127.0.0.1', '::1'] 
  : [];

const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
  'Cross-Origin-Embedder-Policy': 'require-corp',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Resource-Policy': 'same-origin',
};

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  timestamp: number;
  token?: string;
  metadata: {
    submitTime: number;
    formLoadTime: number;
    userAgent: string;
    screenResolution: string;
    timezone: string;
    fingerprint?: string;
  };
}

class AdvancedSecurityValidator {
  private static readonly MAX_STRING_LENGTH = {
    name: 100,
    email: 254,
    phone: 20,
    company: 200,
    message: 2000,
  };

  private static readonly spamKeywords = [
    'casino', 'poker', 'viagra', 'cialis', 'loan', 'credit',
    'SEO', 'marketing', 'promotion', 'offer', 'deal', 'bitcoin',
    'crypto', 'investment', 'trading', 'money', 'profit',
    'hack', 'crack', 'exploit', 'ddos', 'botnet', 'malware',
    'phishing', 'ransomware', 'keylogger', 'backdoor'
  ];

  private static readonly suspiciousPatterns = [
    /http[s]?:\/\//gi,
    /\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/g,
    /(.)\1{4,}/g,
    /[A-Z]{6,}/g,
    /\b\w*\d+\w*@\w*\d+\w*\.\w+/g,
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:/gi,
    /data:text\/html/gi,
    /vbscript:/gi,
    /onload|onerror|onclick/gi,
  ];

  static sanitizeInput(input: string, maxLength: number): string {
    if (typeof input !== 'string') return '';
    
    return input
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<[^>]*>/g, '')
      .replace(/javascript:/gi, '')
      .replace(/vbscript:/gi, '')
      .replace(/on\w+=/gi, '')
      .replace(/data:/gi, '')
      .replace(/&#x?[0-9a-f]+;/gi, '')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, maxLength);
  }

  static validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    
    if (!emailRegex.test(email) || email.length > 254) return false;
    const suspiciousEmailPatterns = [
      /\d{10,}/,
      /[.]{2,}/,
      /@.*@/,
      /^[.]|[.]$/,
    ];
    
    return !suspiciousEmailPatterns.some(pattern => pattern.test(email));
  }

  static validatePhone(phone: string): boolean {
    if (!phone) return true;
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const cleaned = phone.replace(/[\s\-\(\)]/g, '');
    return phoneRegex.test(cleaned) && cleaned.length >= 7 && cleaned.length <= 16;
  }

  static detectAdvancedThreats(data: ContactFormData, clientIP: string): string | null {
    const allText = `${data.name} ${data.email} ${data.message} ${data.company || ''}`.toLowerCase();

    const sqlPatterns = [
      /union\s+select/i,
      /drop\s+table/i,
      /insert\s+into/i,
      /delete\s+from/i,
      /update\s+set/i,
      /exec\s*\(/i,
      /script\s*>/i,
    ];

    if (sqlPatterns.some(pattern => pattern.test(allText))) {
      return 'SQL injection attempt detected';
    }

    const xssPatterns = [
      /<script/i,
      /javascript:/i,
      /onload=/i,
      /onerror=/i,
      /eval\s*\(/i,
      /expression\s*\(/i,
    ];

    if (xssPatterns.some(pattern => pattern.test(allText))) {
      return 'XSS attempt detected';
    }

    const cmdPatterns = [
      /;\s*(rm|del|format|shutdown)/i,
      /\|\s*(cat|type|dir|ls)/i,
      /`[^`]*`/,
      /\$\([^)]*\)/,
    ];

    if (cmdPatterns.some(pattern => pattern.test(allText))) {
      return 'Command injection attempt detected';
    }

    const knownMaliciousIPs: string[] = [
    ];

    if (knownMaliciousIPs.includes(clientIP)) {
      return 'Request from known malicious IP';
    }

    return null;
  }

  static detectSpam(data: ContactFormData): boolean {
    const allText = `${data.name} ${data.email} ${data.message} ${data.company || ''}`.toLowerCase();

    const hasSpamKeywords = this.spamKeywords.some(keyword => 
      allText.includes(keyword.toLowerCase())
    );

    const hasSuspiciousPatterns = this.suspiciousPatterns.some(pattern => 
      pattern.test(allText)
    );

    const { metadata } = data;
    const timeDiff = metadata.submitTime - metadata.formLoadTime;
    
    if (timeDiff < 5000 || timeDiff > 1800000) return true;  
    const suspiciousAgents = [
      'bot', 'crawler', 'spider', 'scraper', 'curl', 'wget', 
      'python', 'php', 'java', 'node', 'axios'
    ];
    
    if (suspiciousAgents.some(agent => 
      metadata.userAgent.toLowerCase().includes(agent.toLowerCase())
    )) {
      return true;
    }

    if (/(.)\1{10,}/.test(allText)) return true;
    const words = data.message.split(/\s+/).filter(word => word.length > 2);
    const uniqueWords = new Set(words.map(w => w.toLowerCase()));
    if (words.length > 10 && uniqueWords.size / words.length < 0.3) {
      return true;
    }

    return hasSpamKeywords || hasSuspiciousPatterns;
  }

  static validateCSRFToken(token: string, session: string): boolean {
    if (!token || !session) return false;
    
    try {
      const expected = crypto
        .createHmac('sha256', process.env.CSRF_SECRET || 'default-secret')
        .update(session)
        .digest('hex');
      
      return crypto.timingSafeEqual(
        Buffer.from(token, 'hex'),
        Buffer.from(expected, 'hex')
      );
    } catch {
      return false;
    }
  }

  static validateFormIntegrity(data: ContactFormData, clientIP: string): string | null {
    if (!data.name?.trim()) return 'Name is required';
    if (!data.email?.trim()) return 'Email is required';
    if (!data.message?.trim()) return 'Message is required';
    if (data.name.length > this.MAX_STRING_LENGTH.name) return 'Name too long';
    if (data.email.length > this.MAX_STRING_LENGTH.email) return 'Email too long';
    if (data.phone && data.phone.length > this.MAX_STRING_LENGTH.phone) return 'Phone too long';
    if (data.company && data.company.length > this.MAX_STRING_LENGTH.company) return 'Company name too long';
    if (data.message.length > this.MAX_STRING_LENGTH.message) return 'Message too long';

    if (!this.validateEmail(data.email)) {
      return 'Invalid email format';
    }

    if (!this.validatePhone(data.phone || '')) {
      return 'Invalid phone format';
    }

    const threatDetection = this.detectAdvancedThreats(data, clientIP);
    if (threatDetection) {
      return threatDetection;
    }

    if (this.detectSpam(data)) {
      return 'Content flagged as spam';
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

function getClientIP(req: NextApiRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  const real = req.headers['x-real-ip'];
  const cfConnecting = req.headers['cf-connecting-ip'];
  
  if (cfConnecting && typeof cfConnecting === 'string') {
    return cfConnecting.split(',')[0].trim();
  }
  
  if (forwarded && typeof forwarded === 'string') {
    return forwarded.split(',')[0].trim();
  }
  
  if (real && typeof real === 'string') {
    return real;
  }
  
  return req.connection.remoteAddress || req.socket.remoteAddress || 'unknown';
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  Object.entries(securityHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const clientIP = getClientIP(req);
  
  try {
    if (!ALLOWED_IPS.includes(clientIP)) {
      await runMiddleware(req, res, limiter);
      await runMiddleware(req, res, speedLimiter);
    }

    if (!req.headers['content-type']?.includes('application/json')) {
      return res.status(400).json({ error: 'Invalid content type' });
    }
    const bodySize = JSON.stringify(req.body).length;
    if (bodySize > 10000) {
      return res.status(413).json({ error: 'Request too large' });
    }

    const rawData = req.body as ContactFormData;
    const now = Date.now();
    if (!rawData.timestamp || Math.abs(now - rawData.timestamp) > 300000) {
      return res.status(400).json({ error: 'Invalid or expired timestamp' });
    }

    const sanitizedData: ContactFormData = {
      name: AdvancedSecurityValidator.sanitizeInput(rawData.name, AdvancedSecurityValidator['MAX_STRING_LENGTH'].name),
      email: AdvancedSecurityValidator.sanitizeInput(rawData.email, AdvancedSecurityValidator['MAX_STRING_LENGTH'].email),
      phone: rawData.phone ? AdvancedSecurityValidator.sanitizeInput(rawData.phone, AdvancedSecurityValidator['MAX_STRING_LENGTH'].phone) : undefined,
      company: rawData.company ? AdvancedSecurityValidator.sanitizeInput(rawData.company, AdvancedSecurityValidator['MAX_STRING_LENGTH'].company) : undefined,
      message: AdvancedSecurityValidator.sanitizeInput(rawData.message, AdvancedSecurityValidator['MAX_STRING_LENGTH'].message),
      timestamp: rawData.timestamp,
      token: rawData.token,
      metadata: {
        ...rawData.metadata,
        userAgent: AdvancedSecurityValidator.sanitizeInput(rawData.metadata.userAgent, 500),
        screenResolution: AdvancedSecurityValidator.sanitizeInput(rawData.metadata.screenResolution, 50),
        timezone: AdvancedSecurityValidator.sanitizeInput(rawData.metadata.timezone, 100),
      }
    };

    const validationError = AdvancedSecurityValidator.validateFormIntegrity(sanitizedData, clientIP);
    if (validationError) {
      console.warn('Security validation failed:', {
        ip: clientIP,
        error: validationError,
        timestamp: new Date().toISOString(),
        userAgent: sanitizedData.metadata.userAgent,
        data: {
          name: sanitizedData.name,
          email: sanitizedData.email,
          company: sanitizedData.company
        }
      });
      
      return res.status(400).json({ error: 'Invalid request data' });
    }

    console.log('Secure contact form submission:', {
      ip: clientIP,
      userAgent: sanitizedData.metadata.userAgent,
      timestamp: new Date().toISOString(),
      formData: {
        name: sanitizedData.name,
        email: sanitizedData.email,
        company: sanitizedData.company,
        messageLength: sanitizedData.message.length
      },
      metadata: sanitizedData.metadata
    });

    await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));

    res.status(200).json({ 
      success: true, 
      message: 'Message sent successfully',
      timestamp: now
    });

  } catch (error) {
    console.error('Contact form error:', {
      error: error.message,
      ip: clientIP,
      timestamp: new Date().toISOString(),
      stack: error.stack
    });
    
    if (error.message?.includes('Too many requests')) {
      return res.status(429).json({ 
        error: 'Too many requests. Please wait before sending again',
        retryAfter: 900
      });
    }

    res.status(500).json({ 
      error: 'Internal server error. Please try again later'
    });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10kb',
    },
  },
};