import CryptoJS from 'crypto-js'

class SecurityManager {
  constructor() {
    this.sessionKey = this.generateSecureKey()
    this.initializeSecurityMeasures()
  }

  // Generate cryptographically secure random key
  generateSecureKey() {
    return CryptoJS.lib.WordArray.random(32).toString()
  }

  // Initialize security measures on application start
  initializeSecurityMeasures() {
    this.setupCSPReporting()
    this.setupIntegrityChecking()
    this.setupAntiTampering()
    this.setupConsoleWarning()
  }

  // Content Security Policy violation reporting
  setupCSPReporting() {
    if (typeof window !== 'undefined') {
      window.addEventListener('securitypolicyviolation', (e) => {
        console.warn('CSP Violation:', {
          blockedURI: e.blockedURI,
          violatedDirective: e.violatedDirective,
          originalPolicy: e.originalPolicy,
          timestamp: new Date().toISOString()
        })
        
        // Report to security monitoring service
        this.reportSecurityIncident('csp_violation', {
          blocked_uri: e.blockedURI,
          directive: e.violatedDirective,
          timestamp: Date.now()
        })
      })
    }
  }

  // Runtime integrity checking
  setupIntegrityChecking() {
    if (typeof window !== 'undefined') {
      // Check for script injection attempts
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList') {
            mutation.addedNodes.forEach((node) => {
              if (node.nodeType === 1 && node.tagName === 'SCRIPT') {
                if (!node.hasAttribute('data-secure') && 
                    !node.src.includes('securepulses.com') &&
                    !node.src.includes('emailjs.com') &&
                    !node.src.includes('googletagmanager.com')) {
                  console.warn('Unauthorized script detected:', node)
                  node.remove()
                  this.reportSecurityIncident('script_injection', {
                    src: node.src,
                    content: node.textContent?.substring(0, 100)
                  })
                }
              }
            })
          }
        })
      })

      observer.observe(document.body, {
        childList: true,
        subtree: true
      })
    }
  }

  // Anti-tampering measures
  setupAntiTampering() {
    if (typeof window !== 'undefined') {
      // Detect DevTools opening (basic detection)
      let devtools = { open: false, timestamp: null }
      
      setInterval(() => {
        if (window.outerHeight - window.innerHeight > 200 || 
            window.outerWidth - window.innerWidth > 200) {
          if (!devtools.open) {
            devtools.open = true
            devtools.timestamp = Date.now()
            console.warn('Developer tools detected - monitoring enabled')
          }
        } else {
          devtools.open = false
        }
      }, 1000)

      // Disable common debugging shortcuts
      document.addEventListener('keydown', (e) => {
        // Disable F12, Ctrl+Shift+I, Ctrl+U, Ctrl+Shift+J, Ctrl+Shift+C
        if (e.key === 'F12' || 
            (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key)) ||
            (e.ctrlKey && e.key === 'U')) {
          e.preventDefault()
          this.showSecurityWarning()
          return false
        }
      })

      // Disable right-click context menu
      document.addEventListener('contextmenu', (e) => {
        e.preventDefault()
        this.showSecurityWarning()
        return false
      })
    }
  }

  // Console warning for unauthorized access attempts
  setupConsoleWarning() {
    if (typeof window !== 'undefined' && typeof console !== 'undefined') {
      const warning = `
██████╗ ███████╗ █████╗ ██████╗     ████████╗██╗  ██╗██╗███████╗
██╔══██╗██╔════╝██╔══██╗██╔══██╗    ╚══██╔══╝██║  ██║██║██╔════╝
██████╔╝█████╗  ███████║██║  ██║       ██║   ███████║██║███████╗
██╔══██╗██╔══╝  ██╔══██║██║  ██║       ██║   ██╔══██║██║╚════██║
██║  ██║███████╗██║  ██║██████╔╝       ██║   ██║  ██║██║███████║
╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═════╝        ╚═╝   ╚═╝  ╚═╝╚═╝╚══════╝

⚠️  SECURITY WARNING: UNAUTHORIZED ACCESS DETECTED  ⚠️

This is a proprietary system protected by advanced security measures.
Unauthorized access, reverse engineering, or tampering is strictly prohibited
and may result in legal action.

All activities are logged and monitored.
If you're here legitimately, please contact: security@securepulses.com
      `
      
      console.log('%c' + warning, 'color: #ff4444; font-family: monospace; font-weight: bold;')
      
      // Override console methods to detect usage
      const originalConsole = { ...console }
      ;['log', 'warn', 'error', 'info', 'debug'].forEach(method => {
        console[method] = (...args) => {
          // Log suspicious console usage
          if (args.length > 0 && typeof args[0] === 'string') {
            const message = args[0].toLowerCase()
            const suspiciousKeywords = ['password', 'token', 'secret', 'key', 'api', 'admin']
            
            if (suspiciousKeywords.some(keyword => message.includes(keyword))) {
              this.reportSecurityIncident('suspicious_console_usage', {
                method,
                message: args[0].substring(0, 100),
                timestamp: Date.now()
              })
            }
          }
          
          return originalConsole[method](...args)
        }
      })
    }
  }

  // Input sanitization with multiple layers
  sanitizeInput(input, options = {}) {
    if (typeof input !== 'string') return ''
    
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
      /\/\*[\s\S]*?\*\//g, // CSS comments
      /<!--[\s\S]*?-->/g, // HTML comments
    ]

    dangerousPatterns.forEach(pattern => {
      sanitized = sanitized.replace(pattern, '')
    })

    // Remove HTML entities
    sanitized = sanitized.replace(/&[#\w]+;/g, '')

    // Normalize whitespace
    sanitized = sanitized.replace(/\s+/g, ' ').trim()

    // Apply length limits
    if (options.maxLength) {
      sanitized = sanitized.substring(0, options.maxLength)
    }

    // Additional encoding for special contexts
    if (options.encodeHTML) {
      sanitized = this.encodeHTML(sanitized)
    }

    return sanitized
  }

  // HTML encoding
  encodeHTML(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;')
  }

  // Advanced form validation
  validateFormData(data, schema) {
    const errors = {}
    const sanitizedData = {}

    for (const [field, rules] of Object.entries(schema)) {
      const value = data[field]
      
      // Required field validation
      if (rules.required && (!value || value.trim() === '')) {
        errors[field] = `${field} is required`
        continue
      }

      if (!value && !rules.required) {
        sanitizedData[field] = ''
        continue
      }

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
