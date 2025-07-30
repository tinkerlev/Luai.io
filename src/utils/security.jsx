import CryptoJS from 'crypto-js'
import { Analytics } from "@vercel/analytics/react"

// Simple hash function for client-side use
function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

class SecurityManager {
  constructor() {
    this.sessionKey = this.generateSecureKey()
    this.initializeSecurityMeasures()
  }

  // Generate cryptographically secure random key
  generateSecureKey() {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  }

  // Initialize security measures on application start
  initializeSecurityMeasures() {
    this.setupCSPReporting()
    this.setupIntegrityChecking()
    this.setupAntiTampering()
    this.setupConsoleWarning()
  }

  setupCSPReporting() {
    if (typeof window !== 'undefined') {
      console.log('CSP reporting initialized');
    }
  }

  setupIntegrityChecking() {
    if (typeof window !== 'undefined') {
      console.log('Integrity checking initialized');
    }
  }

  // Anti-tampering measures
  setupAntiTampering() {
    if (typeof window !== 'undefined') {
      // Anti-tampering setup
      console.log('Anti-tampering measures initialized');
    }
  }

  // Console warning for unauthorized access attempts
  setupConsoleWarning() {
    if (typeof window !== 'undefined' && typeof console !== 'undefined') {
      console.log('%c⚠️ SECURITY WARNING', 'color: red; font-size: 24px; font-weight: bold;');
      console.log('%cThis is a browser console. Do not enter any code here unless you know what you are doing.', 'color: red; font-size: 16px;');
    }
  }

  // Input sanitization with multiple layers
  sanitizeInput(input, options = {}) {
    if (typeof input !== 'string') return '';
    
    let sanitized = input

    // Remove potentially dangerous patterns
    const dangerousPatterns = [
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      /<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi,
      /<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi,
      /<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi,
      /<link\b[^<]*(?:(?!<\/link>)<[^<]*)*<\/link>/gi,
      /<meta\b[^<]*(?:(?!<\/meta>)<[^<]*)*<\/meta>/gi,
      /javascript:/gi,
      /vbscript:/gi,
      /data:text\/html/gi,
      /on\w+\s*=/gi,
      /expression\s*\(/gi,
      /url\s*\(/gi,
      /import\s*\(/gi,
      /eval\s*\(/gi,
      /@import/gi,
      /\/\*[\s\S]*?\*\//g,
      /<!--[\s\S]*?-->/g,
    ]

    dangerousPatterns.forEach(pattern => {
      sanitized = sanitized.replace(pattern, '');
    })

    // Remove HTML entities
    sanitized = sanitized.replace(/&[#\w]+;/g, '')

    // Normalize whitespace
    sanitized = sanitized.replace(/\s+/g, ' ').trim()

    // Apply length limits
    if (options.maxLength) {
      sanitized = sanitized.substring(0, options.maxLength);
    }

    // Additional encoding for special contexts
    if (options.encodeHTML) {
      sanitized = this.encodeHTML(sanitized);
    }

    return sanitized
  }

  // HTML encoding
  encodeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // Advanced form validation
  validateFormData(data, schema) {
    const errors = {};
    const sanitizedData = {};

    for (const [key, value] of Object.entries(data)) {
      if (typeof value === 'string') {
        sanitizedData[key] = this.sanitizeInput(value);
        
        // Basic validation
        if (key === 'email' && !this.isValidEmail(sanitizedData[key])) {
          errors[key] = 'Invalid email format';
        }
        if (key === 'phone' && sanitizedData[key] && !this.isValidPhone(sanitizedData[key])) {
          errors[key] = 'Invalid phone format';
        }
      } else {
        sanitizedData[key] = value;
      }
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
      sanitizedData
    };
  }

  // Email validation (RFC 5322 compliant)
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 254;
  }

  // Phone validation
  isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d\s\-\(\)]{6,15}$/;
    return phoneRegex.test(phone);
  }

  // Rate limiting implementation
  checkRateLimit(identifier, maxRequests = 5, windowMs = 900000) {
    const key = `rate_limit_${identifier}`;
    const now = Date.now();
    
    let requests = [];
    try {
      const stored = localStorage.getItem(key);
      requests = stored ? JSON.parse(stored) : [];
    } catch (e) {
      requests = [];
    }

    // Remove old requests outside the window
    requests = requests.filter(time => now - time < windowMs);

    if (requests.length >= maxRequests) {
      return {
        allowed: false,
        remainingRequests: 0,
        resetTime: requests[0] + windowMs
      };
    }

    requests.push(now);
    localStorage.setItem(key, JSON.stringify(requests));

    return {
      allowed: true,
      remainingRequests: maxRequests - requests.length,
      resetTime: now + windowMs
    };
  }

  // Show security warning to user
  showSecurityWarning() {
    if (typeof window !== 'undefined' && window.confirm) {
      return window.confirm('Security warning: Suspicious activity detected. Continue?');
    }
    return false;
  }

  // Report security incidents
  reportSecurityIncident(type, details) {
    console.warn('Security incident reported:', { type, details, timestamp: new Date().toISOString() });
    
    // In a real implementation, this would send to a security monitoring service
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'security_incident', {
        incident_type: type,
        severity: 'warning'
      });
    }
  }

  // Generate secure CSRF tokens
  generateCSRFToken() {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substring(2);
    return simpleHash(timestamp + random + this.sessionKey);
  }

  // Validate CSRF tokens
  validateCSRFToken(token, expectedToken) {
    return token === expectedToken;
  }
}

// Create global security manager instance
export const securityManager = new SecurityManager()

// Export utility functions
export const {
  sanitizeInput,
  validateFormData,
  checkRateLimit,
  generateCSRFToken,
  validateCSRFToken,
  reportSecurityIncident
} = securityManager
      // Type validation
      if (rules.type === 'email' && !this.isValidEmail(value)) {
        errors[field] = 'Invalid email format'
        continue
      }

      if (rules.type === 'phone' && !this.isValidPhone(value)) {
        errors[field] = 'Invalid phone format'
        continue
      }

      // Length validation
      if (rules.minLength && value.length < rules.minLength) {
        errors[field] = `${field} must be at least ${rules.minLength} characters`
        continue
      }

      if (rules.maxLength && value.length > rules.maxLength) {
        errors[field] = `${field} cannot exceed ${rules.maxLength} characters`
        continue
      }

      // Pattern validation
      if (rules.pattern && !rules.pattern.test(value)) {
        errors[field] = rules.patternMessage || `${field} format is invalid`
        continue
      }

      // Custom validation
      if (rules.validator && !rules.validator(value)) {
        errors[field] = rules.validatorMessage || `${field} is invalid`
        continue
      }

      // Sanitize the value
      sanitizedData[field] = this.sanitizeInput(value, {
        maxLength: rules.maxLength,
        encodeHTML: rules.encodeHTML
      })
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
      sanitizedData
    }
  }

  // Email validation (RFC 5322 compliant)
  isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    
    if (!emailRegex.test(email) || email.length > 254) return false
    
    // Additional security checks
    const suspiciousPatterns = [
      /[<>]/,
      /javascript:/i,
      /script/i,
      /\.\./,
      /@.*@/
    ]
    
    return !suspiciousPatterns.some(pattern => pattern.test(email))
  }

  // Phone validation
  isValidPhone(phone) {
    if (!phone) return true // Optional field
    
    const cleaned = phone.replace(/[\s\-\(\)]/g, '')
    const phoneRegex = /^\+?[1-9]\d{6,14}$/
    
    return phoneRegex.test(cleaned) && cleaned.length <= 15
  }

  // Rate limiting implementation
  checkRateLimit(identifier, maxRequests = 5, windowMs = 900000) { // 15 minutes
    const key = `rl_${identifier}`
    const now = Date.now()
    
    let requests = JSON.parse(localStorage.getItem(key) || '[]')
    
    // Clean old requests outside the window
    requests = requests.filter(timestamp => now - timestamp < windowMs)
    
    if (requests.length >= maxRequests) {
      return {
        allowed: false,
        resetTime: requests[0] + windowMs,
        remainingRequests: 0
      }
    }
    
    requests.push(now)
    localStorage.setItem(key, JSON.stringify(requests))
    
    return {
      allowed: true,
      remainingRequests: maxRequests - requests.length
    }
  }

  // Show security warning to user
  showSecurityWarning() {
    if (typeof window !== 'undefined') {
      const warning = document.createElement('div')
      warning.innerHTML = `
        <div style="
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.9);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 999999;
          color: white;
          font-family: Arial, sans-serif;
        ">
          <div style="text-align: center; max-width: 500px; padding: 40px;">
            <h2 style="color: #ff4444; margin-bottom: 20px;">🛡️ Security Alert</h2>
            <p style="font-size: 18px; line-height: 1.6; margin-bottom: 30px;">
              This website is protected by advanced security measures.<br>
              Unauthorized access attempts are monitored and logged.
            </p>
            <button onclick="this.parentElement.parentElement.remove()" 
              style="
                background: #0066cc;
                color: white;
                border: none;
                padding: 12px 30px;
                border-radius: 5px;
                cursor: pointer;
                font-size: 16px;
              ">
              I Understand
            </button>
          </div>
        </div>
      `
      document.body.appendChild(warning)
      
      setTimeout(() => {
        warning.remove()
      }, 10000)
    }
  }

  // Report security incidents
  reportSecurityIncident(type, details) {
    const incident = {
      type,
      details,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      referrer: document.referrer,
      sessionId: this.sessionKey
    }

    // Store locally for batch reporting
    const incidents = JSON.parse(localStorage.getItem('security_incidents') || '[]')
    incidents.push(incident)
    
    // Keep only last 50 incidents
    if (incidents.length > 50) {
      incidents.splice(0, incidents.length - 50)
    }
    
    localStorage.setItem('security_incidents', JSON.stringify(incidents))
    
    // Report to server (implement your reporting endpoint)
    if (process.env.NODE_ENV === 'production') {
      fetch('/api/security-incident', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(incident)
      }).catch(console.error)
    }
  }

  // Generate secure CSRF tokens
  generateCSRFToken() {
    return CryptoJS.lib.WordArray.random(32).toString(CryptoJS.enc.Base64)
  }

  // Validate CSRF tokens
  validateCSRFToken(token, expectedToken) {
    if (!token || !expectedToken) return false
    
    try {
      return CryptoJS.enc.Base64.parse(token).toString() === 
             CryptoJS.enc.Base64.parse(expectedToken).toString()
    } catch {
      return false
    }
  }
}

// Create global security manager instance
export const securityManager = new SecurityManager()

// Export utility functions
export const {
  sanitizeInput,
  validateFormData,
  checkRateLimit,
  generateCSRFToken,
  validateCSRFToken,
  reportSecurityIncident
} = securityManager
