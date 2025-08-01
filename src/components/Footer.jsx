import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="w-full py-12 relative z-20 border-t border-slate-700/50 bg-black bg-opacity-60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
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
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Our Services</h3>
            <div className="space-y-2 text-gray-400">
              <Link to="/services/penetration-testing" className="block hover:text-blue-400 transition-colors cursor-pointer">Penetration Testing</Link>
              <Link to="/services/security-audits" className="block hover:text-blue-400 transition-colors cursor-pointer">Security Audits</Link>
              <Link to="/services/vulnerability-assessments" className="block hover:text-blue-400 transition-colors cursor-pointer">Vulnerability Assessments</Link>
              <Link to="/services/red-team-operations" className="block hover:text-blue-400 transition-colors cursor-pointer">Red Team Operations</Link>
              <Link to="/services/compliance-consulting" className="block hover:text-blue-400 transition-colors cursor-pointer">Compliance Consulting</Link>
              <Link to="/services/incident-response" className="block hover:text-blue-400 transition-colors cursor-pointer">Incident Response</Link>
              <Link to="/services/security-training" className="block hover:text-blue-400 transition-colors cursor-pointer">Security Training</Link>
            </div>
          </div>

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

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Legal & Resources</h3>
            <div className="space-y-2">
              <Link to="/terms-of-service" className="text-gray-400 hover:text-blue-400 transition-colors duration-300 block text-sm">
                📋 Terms of Service
              </Link>
              <Link to="/privacy-policy" className="text-gray-400 hover:text-blue-400 transition-colors duration-300 block text-sm">
                🔒 Privacy Policy
              </Link>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300 block text-sm text-left"
              >
                📞 Contact Us
              </button>
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

        <div className="border-t border-slate-700/50 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="text-center lg:text-left">
              <p className="text-gray-400 text-sm">
                © 2024 Luai Ltd. All rights reserved. 
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
  );
};

export default Footer;
