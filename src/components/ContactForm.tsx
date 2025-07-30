import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Shield, AlertTriangle, CheckCircle, Send } from 'lucide-react';

// The data structure without the phone field
interface FormData {
  name: string;
  email: string;
  company: string;
  message: string;
  honeypot: string;
}

const ContactForm = () => {

  const [formData, setFormData] = useState<FormData>({
    name: '', email: '', company: '', message: '', honeypot: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  
  const [formLoadTime] = useState(Date.now());
  const [submitCount, setSubmitCount] = useState(0);
  const [lastSubmitTime, setLastSubmitTime] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  const sanitizeInput = (input: string): string => {
    const tempDiv = document.createElement('div');
    tempDiv.textContent = input;
    return tempDiv.innerHTML.replace(/<[^>]*>?/gm, '');
  };

  // Validation logic without the phone case
  const validateInput = (name: string, value: string): string | null => {
    switch (name) {
      case 'name':
        if (value.length < 2) return 'Name must be at least 2 characters long.';
        if (value.length > 100) return 'Name is too long.';
        if (!/^[a-zA-Z\s'-]+$/.test(value)) return 'Name contains invalid characters.';
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Invalid email address format.';
        if (value.length > 254) return 'Email is too long.';
        break;
      case 'message':
        if (value.length < 10) return 'Message must be at least 10 characters long.';
        if (value.length > 2000) return 'Message is too long.';
        break;
    }
    return null;
  };

  const validateFormSpeed = (loadTime: number, submitTime: number): boolean => {
    const timeSpent = submitTime - loadTime;
    return timeSpent > 3000;
  };

  const checkRateLimit = (): boolean => {
    const now = Date.now();
    if (now - lastSubmitTime > 3600000) {
      setSubmitCount(1);
      setLastSubmitTime(now);
      return true;
    }
    if (submitCount >= 3) return false;
    
    setSubmitCount(prev => prev + 1);
    setLastSubmitTime(now);
    return true;
  };

  // Full validation without checking for the phone field
  const runFullValidation = (): string | null => {
    if (formData.honeypot) return 'Request rejected due to suspicious activity.';
    if (!validateFormSpeed(formLoadTime, Date.now())) return 'Form submitted too quickly.';
    if (!checkRateLimit()) return 'You are submitting too frequently. Please wait.';

    for (const [key, value] of Object.entries(formData)) {
      if (['honeypot', 'company'].includes(key) && !value) continue; // company is optional
      const error = validateInput(key, value);
      if (error) return error;
    }
    return null;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('idle');

    const validationError = runFullValidation();
    if (validationError) {
      setErrorMessage(validationError);
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');
    
    // The parameters sent to EmailJS, without phone
    const templateParams = {
      from_name: sanitizeInput(formData.name),
      reply_to: sanitizeInput(formData.email),
      company: sanitizeInput(formData.company),
      message: sanitizeInput(formData.message),
    };

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error("EmailJS environment variables are not configured correctly.");
      }

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      setSubmitStatus('success');
      // Resetting the form state without phone
      setFormData({ name: '', email: '', company: '', message: '', honeypot: '' });
    } catch (error) {
        console.error('EmailJS send error:', error);
        setSubmitStatus('error');
        setErrorMessage('Something went wrong. Please try again later.');
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h2>
          <p className="text-xl text-gray-600">Ready to strengthen your digital security? Let's talk.</p>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} noValidate className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <input type="text" name="honeypot" value={formData.honeypot} onChange={handleInputChange} style={{ display: 'none' }} tabIndex={-1} autoComplete="off"/>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
              <input id="name" type="text" name="name" value={formData.name} onChange={handleInputChange} required maxLength={100} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors" placeholder="e.g., Jane Doe"/>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
              <input id="email" type="email" name="email" value={formData.email} onChange={handleInputChange} required maxLength={254} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors" placeholder="your.email@company.com"/>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">Company (Optional)</label>
              <input id="company" type="text" name="company" value={formData.company} onChange={handleInputChange} maxLength={100} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors" placeholder="Your Company Name"/>
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
            <textarea id="message" name="message" value={formData.message} onChange={handleInputChange} required rows={6} minLength={10} maxLength={2000} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-vertical" placeholder="Tell us about your project or challenges..."></textarea>
            <p className="text-right text-sm text-gray-500 mt-1">{formData.message.length}/2000</p>
          </div>

          {submitStatus === 'error' && (
            <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-red-600 shrink-0" />
              <span className="text-red-800">{errorMessage}</span>
            </div>
          )}

          {submitStatus === 'success' && (
            <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600 shrink-0" />
              <span className="text-green-800">Thank you! Your message has been sent successfully.</span>
            </div>
          )}

          <button type="submit" disabled={isSubmitting} className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Sending...
              </>
            ) : (
              <>
                <Send className="h-5 w-5" />
                Send Message
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;