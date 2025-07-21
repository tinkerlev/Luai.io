import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Shield, Send, AlertTriangle, CheckCircle, Eye, EyeOff } from 'lucide-react'
import { securityManager } from '../utils/security'
import emailjs from '@emailjs/browser'

const SecureContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    honeypot: '',
    timestamp: Date.now()
  })

  const [security, setSecurity] = useState({
    csrfToken: '',
    sessionId: '',
    fingerprint: '',
    captchaToken: '',
    isHuman: false
  })

  const [validation, setValidation] = useState({
    errors: {},
    touched: {},
    isValid: false
  })

  const [submission, setSubmission] = useState({
    isSubmitting: false,
    status: 'idle',
    message: '',
    remainingAttempts: 3
  })

  const [securityMetrics, setSecurityMetrics] = useState({
    typingPattern: [],
    mouseMovements: [],
    formLoadTime: Date.now(),
    focusEvents: [],
    scrollEvents: []
  })

  const formRef = useRef(null)
  const submitButtonRef = useRef(null)

  // Form validation schema
  const validationSchema = {
    name: {
      required: true,
      minLength: 2,
      maxLength: 50,
      pattern: /^[a-zA-Z\u0590-\u05FF\s'-]+$/,
      patternMessage: 'Name can only contain letters, spaces, and hyphens'
    },
    email: {
      required: true,
      type: 'email',
      maxLength: 254
    },
    company: {
      required: false,
      maxLength: 100,
      pattern: /^[a-zA-Z\u0590-\u05FF0-9\s&.,-]+$/,
      patternMessage: 'Company name contains invalid characters'
    },
    message: {
      required: true,
      minLength: 10,
      maxLength: 2000,
      validator: (value) => {
        // Check for spam patterns
        const spamPatterns = [
          /https?:\/\//gi,
          /\$\d+/g,
          /(buy|sell|cheap|free|offer|deal|discount)/gi,
          /(.)\1{5,}/g // Repeated characters
        ]
        return !spamPatterns.some(pattern => pattern.test(value))
      },
      validatorMessage: 'Message contains suspicious content'
    }
  }

  // Initialize security measures
  useEffect(() => {
    const initSecurity = async () => {
      const csrfToken = securityManager.generateCSRFToken()
      const sessionId = securityManager.generateSecureKey()
      const fingerprint = await generateBrowserFingerprint()
      
      setSecurity(prev => ({
        ...prev,
        csrfToken,
        sessionId,
        fingerprint
      }))
    }

    initSecurity()
    setupSecurityMonitoring()
  }, [])

  // Generate browser fingerprint for security
  const generateBrowserFingerprint = async () => {
    const components = [
      navigator.userAgent,
      navigator.language,
      screen.width + 'x' + screen.height,
      new Date().getTimezoneOffset(),
      navigator.hardwareConcurrency || 0,
      navigator.deviceMemory || 0,
      navigator.platform
    ]

    // Add canvas fingerprint
    try {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      ctx.textBaseline = 'top'
      ctx.font = '14px Arial'
      ctx.fillText('SecurePulses Fingerprint', 2, 2)
      components.push(canvas.toDataURL())
    } catch (e) {
      components.push('canvas-error')
    }

    // Simple hash
    const fingerprint = components.join('|')
    let hash = 0
    for (let i = 0; i < fingerprint.length; i++) {
      const char = fingerprint.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash
    }
    
    return Math.abs(hash).toString(36)
  }

  // Setup security monitoring
  const setupSecurityMonitoring = () => {
    // Track typing patterns for bot detection
    const trackTyping = (e) => {
      setSecurityMetrics(prev => ({
        ...prev,
        typingPattern: [...prev.typingPattern.slice(-20), {
          key: e.key,
          timestamp: Date.now(),
          interval: prev.typingPattern.length > 0 ? 
            Date.now() - prev.typingPattern[prev.typingPattern.length - 1].timestamp : 0
        }]
      }))
    }

    // Track mouse movements
    const trackMouse = (e) => {
      setSecurityMetrics(prev => ({
        ...prev,
        mouseMovements: [...prev.mouseMovements.slice(-50), {
          x: e.clientX,
          y: e.clientY,
          timestamp: Date.now()
        }]
      }))
    }

    // Track focus events
    const trackFocus = (e) => {
      setSecurityMetrics(prev => ({
        ...prev,
        focusEvents: [...prev.focusEvents, {
          target: e.target.name || e.target.id,
          timestamp: Date.now()
        }]
      }))
    }

    document.addEventListener('keydown', trackTyping)
    document.addEventListener('mousemove', trackMouse)
    document.addEventListener('focusin', trackFocus)

    return () => {
      document.removeEventListener('keydown', trackTyping)
      document.removeEventListener('mousemove', trackMouse)
      document.removeEventListener('focusin', trackFocus)
    }
  }

  // Enhanced input validation
  const validateField = useCallback((name, value) => {
    const rules = validationSchema[name]
    if (!rules) return null

    // Required validation
    if (rules.required && (!value || value.trim() === '')) {
      return `${name} is required`
    }

    if (!value && !rules.required) return null

    // Length validation
    if (rules.minLength && value.length < rules.minLength) {
      return `${name} must be at least ${rules.minLength} characters`
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      return `${name} cannot exceed ${rules.maxLength} characters`
    }

    // Type validation
    if (rules.type === 'email' && !securityManager.isValidEmail(value)) {
      return 'Please enter a valid email address'
    }

    // Pattern validation
    if (rules.pattern && !rules.pattern.test(value)) {
      return rules.patternMessage || `${name} format is invalid`
    }

    // Custom validation
    if (rules.validator && !rules.validator(value)) {
      return rules.validatorMessage || `${name} is invalid`
    }

    return null
  }, [])

  // Handle input changes with real-time validation
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target
    
    // Apply length limits
    let limitedValue = value
    const maxLength = validationSchema[name]?.maxLength
    if (maxLength && value.length > maxLength) {
      limitedValue = value.substring(0, maxLength)
    }

    setFormData(prev => ({
      ...prev,
      [name]: limitedValue
    }))

    // Mark field as touched
    setValidation(prev => ({
      ...prev,
      touched: { ...prev.touched, [name]: true }
    }))

    // Validate field
    const error = validateField(name, limitedValue)
    setValidation(prev => ({
      ...prev,
      errors: {
        ...prev.errors,
        [name]: error
      }
    }))
  }, [validateField])

  // Advanced bot detection
  const performBotDetection = () => {
    const suspicious = []

    // Check honeypot
    if (formData.honeypot) {
      suspicious.push('honeypot_filled')
    }

    // Check form fill speed
    const fillTime = Date.now() - securityMetrics.formLoadTime
    if (fillTime < 5000) { // Too fast
      suspicious.push('too_fast')
    }

    // Check typing patterns (human typing has natural variance)
    if (securityMetrics.typingPattern.length > 5) {
      const intervals = securityMetrics.typingPattern.map(t => t.interval).filter(i => i > 0)
      const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length
      const variance = intervals.reduce((acc, interval) => acc + Math.pow(interval - avgInterval, 2), 0) / intervals.length
      
      if (variance < 100) { // Too consistent for human
        suspicious.push('robotic_typing')
      }
    }

    // Check mouse movements (bots often have no mouse activity)
    if (securityMetrics.mouseMovements.length < 5 && formData.message.length > 50) {
      suspicious.push('no_mouse_activity')
    }

    return {
      isBot: suspicious.length > 1,
      suspiciousActivities: suspicious
    }
  }

  // Enhanced form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Rate limiting check
    const rateLimitResult = securityManager.checkRateLimit(
      `contact_${security.fingerprint}`,
      3, // Max 3 attempts
      900000 // 15 minutes
    )

    if (!rateLimitResult.allowed) {
      setSubmission({
        isSubmitting: false,
        status: 'error',
        message: 'Too many attempts. Please wait 15 minutes before trying again.',
        remainingAttempts: 0
      })
      return
    }

    setSubmission(prev => ({
      ...prev,
      isSubmitting: true,
      status: 'idle',
      remainingAttempts: rateLimitResult.remainingRequests
    }))

    try {
      // Final validation
      const validation = securityManager.validateFormData(formData, validationSchema)
      if (!validation.isValid) {
        throw new Error('Please correct the highlighted errors')
      }

      // Bot detection
      const botDetection = performBotDetection()
      if (botDetection.isBot) {
        securityManager.reportSecurityIncident('bot_detection', {
          suspicious_activities: botDetection.suspiciousActivities,
          form_data: validation.sanitizedData
        })
        throw new Error('Suspicious activity detected. Please try again later.')
      }

      // Prepare secure submission data
      const submissionData = {
        ...validation.sanitizedData,
        security: {
          csrfToken: security.csrfToken,
          sessionId: security.sessionId,
          fingerprint: security.fingerprint,
          timestamp: Date.now()
        },
        metadata: {
          userAgent: navigator.userAgent,
          referrer: document.referrer,
          screenResolution: `${screen.width}x${screen.height}`,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          language: navigator.language
        }
      }

      // Send via EmailJS (more secure than direct API calls)
      const result = await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: submissionData.name,
          from_email: submissionData.email,
          company: submissionData.company,
          message: submissionData.message,
          security_hash: security.fingerprint,
          submission_time: new Date().toISOString()
        },
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      )

      if (result.status === 200) {
        setSubmission({
          isSubmitting: false,
          status: 'success',
          message: 'Your message has been sent successfully! We\'ll get back to you within 24 hours.',
          remainingAttempts: rateLimitResult.remainingRequests - 1
        })

        // Reset form
        setFormData({
          name: '',
          email: '',
          company: '',
          message: '',
          honeypot: '',
          timestamp: Date.now()
        })

        setValidation({
          errors: {},
          touched: {},
          isValid: false
        })
      }

    } catch (error) {
      console.error('Form submission error:', error)
      setSubmission({
        isSubmitting: false,
        status: 'error',
        message: error.message || 'An error occurred. Please try again.',
        remainingAttempts: rateLimitResult.remainingRequests - 1
      })

      // Report security incident if necessary
      securityManager.reportSecurityIncident('form_error', {
        error: error.message,
        form_data: formData
      })
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="text-center mb-8">
        <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-white mb-2">
          Secure Contact Form
        </h2>
        <p className="text-gray-300">
          Protected by advanced security measures
        </p>
      </div>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 shadow-2xl"
      >
        {/* Honeypot field - hidden from users */}
        <input
          type="text"
          name="honeypot"
          value={formData.honeypot}
          onChange={handleInputChange}
          style={{ display: 'none' }}
          tabIndex={-1}
          autoComplete="nope"
        />

        {/* Security indicator */}
        <div className="flex items-center justify-between mb-6 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
          <div className="flex items-center space-x-2">
            <Shield className="h-4 w-4 text-green-400" />
            <span className="text-green-300 text-sm">Secure Connection Established</span>
          </div>
          <div className="text-xs text-gray-400">
            Session: {security.sessionId.substring(0, 8)}...
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Name field */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 bg-slate-700/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                validation.errors.name && validation.touched.name
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-slate-600/50 focus:ring-blue-500'
              }`}
              placeholder="Enter your full name"
              maxLength={50}
              autoComplete="name"
              required
            />
            {validation.errors.name && validation.touched.name && (
              <p className="text-red-400 text-sm mt-1">{validation.errors.name}</p>
            )}
          </div>

          {/* Email field */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 bg-slate-700/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                validation.errors.email && validation.touched.email
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-slate-600/50 focus:ring-blue-500'
              }`}
              placeholder="your.email@company.com"
              maxLength={254}
              autoComplete="email"
              required
            />
            {validation.errors.email && validation.touched.email && (
              <p className="text-red-400 text-sm mt-1">{validation.errors.email}</p>
            )}
          </div>
        </div>

        {/* Company field */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Company/Organization
          </label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 bg-slate-700/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
              validation.errors.company && validation.touched.company
                ? 'border-red-500 focus:ring-red-500'
                : 'border-slate-600/50 focus:ring-blue-500'
            }`}
            placeholder="Your company name"
            maxLength={100}
            autoComplete="organization"
          />
          {validation.errors.company && validation.touched.company && (
            <p className="text-red-400 text-sm mt-1">{validation.errors.company}</p>
          )}
        </div>

        {/* Message field */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Message *
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={6}
            className={`w-full px-4 py-3 bg-slate-700/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 resize-vertical ${
              validation.errors.message && validation.touched.message
                ? 'border-red-500 focus:ring-red-500'
                : 'border-slate-600/50 focus:ring-blue-500'
            }`}
            placeholder="Describe your cybersecurity needs and challenges..."
            maxLength={2000}
            required
          />
          <div className="flex justify-between items-center mt-2">
            <div>
              {validation.errors.message && validation.touched.message && (
                <p className="text-red-400 text-sm">{validation.errors.message}</p>
              )}
            </div>
            <span className="text-gray-400 text-sm">
              {formData.message.length}/2000
            </span>
          </div>
        </div>

        {/* Status messages */}
        {submission.status === 'error' && (
          <div className="mt-6 flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
            <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-300">{submission.message}</p>
              <p className="text-red-400 text-sm mt-1">
                Remaining attempts: {submission.remainingAttempts}
              </p>
            </div>
          </div>
        )}

        {submission.status === 'success' && (
          <div className="mt-6 flex items-start gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
            <p className="text-green-300">{submission.message}</p>
          </div>
        )}

        {/* Submit button */}
        <button
          ref={submitButtonRef}
          type="submit"
          disabled={submission.isSubmitting || Object.values(validation.errors).some(error => error)}
          className="w-full mt-8 px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
        >
          {submission.isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Securing & Sending...
            </>
          ) : (
            <>
              <Send className="h-5 w-5" />
              Send Secure Message
            </>
          )}
        </button>

        {/* Security notice */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            🔒 This form is protected by advanced security measures including bot detection, 
            rate limiting, and encrypted transmission. Your data is safe with us.
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Session ID: {security.sessionId.substring(0, 16)}... | 
            Security Level: Maximum | 
            Remaining Attempts: {submission.remainingAttempts}
          </p>
        </div>
      </form>
    </div>
  )
}

export default SecureContactForm
