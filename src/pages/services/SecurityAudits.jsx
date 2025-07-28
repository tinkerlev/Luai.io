import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Shield, CheckCircle, Search, FileText, Award, Lock } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const SecurityAudits = () => {
  const handleGetEvaluation = () => {
    window.location = '/#contact';
  };

  return (
    <>
      <Helmet>
        <title>Professional Security Audits & Compliance Assessment | Luai</title>
        <meta name="description" content="Comprehensive security audits and compliance assessments. ISO 27001, PCI DSS, SOC 2, HIPAA compliance auditing. Expert cybersecurity audit services." />
        <meta name="keywords" content="security audit, compliance assessment, ISO 27001, PCI DSS, SOC 2, HIPAA, cybersecurity audit, security compliance" />
        <link rel="canonical" href="https://Luai.luai.io/services/security-audits" />
      </Helmet>

      <Header />

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden pt-16">
        <video 
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-30"
          autoPlay 
          muted 
          loop 
          playsInline
        >
          <source src="/assets/0_Abstract_Design_Data_Visualization_3840x2160.mp4" type="video/mp4" />
        </video>
        
        <div className="absolute inset-0 bg-black bg-opacity-60 z-10"></div>
        
        <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-blue-500/20 border border-blue-500/30 rounded-full px-6 py-3 mb-6">
              <Search className="w-6 h-6 text-blue-400 mr-2" />
              <span className="text-blue-300 font-semibold">Comprehensive Security Assessment</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-6">
              Security Audits & Compliance
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              <strong className="text-blue-400">Your compliance is more than checkboxes.</strong> 
              We perform thorough security audits that ensure your business meets industry standards and actually protects your data.
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
            
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-8">Professional Security Audit Services</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-blue-500/30">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <FileText className="w-6 h-6 text-blue-400 mr-3" />
                    Compliance Audits
                  </h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• ISO 27001 Information Security Management</li>
                    <li>• PCI DSS Payment Card Industry Standards</li>
                    <li>• SOC 2 Service Organization Controls</li>
                    <li>• HIPAA Healthcare Information Protection</li>
                    <li>• GDPR Data Protection Compliance</li>
                    <li>• NIST Cybersecurity Framework</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-xl p-6 border border-green-500/30">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <Shield className="w-6 h-6 text-green-400 mr-3" />
                    Technical Security Audits
                  </h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Network security configuration review</li>
                    <li>• Access control and identity management</li>
                    <li>• Data encryption and protection audit</li>
                    <li>• Security policy and procedure review</li>
                    <li>• Incident response capability assessment</li>
                    <li>• Third-party vendor security evaluation</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="text-center">
              <div className="bg-gradient-to-r from-blue-500/15 to-purple-500/15 rounded-2xl p-8 border border-blue-500/30">
                <h2 className="text-3xl font-bold text-white mb-4">Ready for Your Security Audit?</h2>
                <p className="text-xl text-gray-300 mb-8">
                  <strong className="text-blue-400">Don't wait for compliance deadlines or security incidents.</strong> 
                  Get a professional security audit that protects your business and satisfies auditors.
                </p>
                
                <button
                  onClick={handleGetEvaluation}
                  className="inline-flex items-center justify-center px-10 py-4 text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  Schedule Your Security Audit
                </button>
                <p className="text-gray-400 text-sm mt-3">Professional audit services • Compliance expertise • Detailed reporting</p>
              </div>
            </section>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default SecurityAudits;