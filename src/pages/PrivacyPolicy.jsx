import React from 'react';
import { Analytics } from "@vercel/analytics/react"
import { Helmet } from 'react-helmet-async';
import { Shield, Eye, Lock, Globe, Users, Database, FileText, AlertCircle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - Luai GDPR & Multi-Jurisdictional Compliance</title>
        <meta name="description" content="Comprehensive Privacy Policy for Luai. Full GDPR compliance, Israeli Privacy Law compliance, CCPA compliance, and international data protection standards." />
        <meta name="keywords" content="privacy policy, GDPR compliance, data protection, Israeli privacy law, CCPA, cybersecurity privacy, data processing" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://Luai.luai.io/privacy-policy" />
      </Helmet>

      <Header />

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden pt-16">
        {/* Background Video */}
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
            <div className="inline-flex items-center bg-purple-500/20 border border-purple-500/30 rounded-full px-6 py-3 mb-6">
              <Eye className="w-6 h-6 text-purple-400 mr-2" />
              <span className="text-purple-300 font-semibold">Privacy Protection</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-6">
              Privacy Policy
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Multi-jurisdictional privacy protection compliant with GDPR, Israeli law, and international standards
            </p>
            
            <div className="mt-6 text-gray-400 space-y-1">
              <p><strong>Last Updated:</strong> December 2024</p>
              <p><strong>Effective Date:</strong> December 2027</p>
              <p><strong>Data Controller:</strong> Luai Ltd</p>
            </div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <FileText className="w-6 h-6 text-purple-400 mr-3" />
                <h2 className="text-2xl font-bold text-white">1. Introduction and Scope</h2>
              </div>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Luai Ltd. ("Company," "we," "us," or "our") is committed to protecting the privacy and security of personal information. This Privacy Policy describes how we collect, use, process, store, and protect personal data in connection with our cybersecurity consulting services.
                </p>
                <p>
                  This Privacy Policy applies to all personal data processed by Luai, whether collected through our website, during service delivery, or through other business interactions. We process personal data in compliance with:
                </p>
                <div className="grid gap-2 pl-6">
                  <div>• European Union General Data Protection Regulation (GDPR) 2016/679</div>
                  <div>• Israeli Privacy Protection Law (התשמ"א-1981) and amendments</div>
                  <div>• California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA)</div>
                  <div>• Virginia Consumer Data Protection Act (VCDPA)</div>
                  <div>• Colorado Privacy Act (CPA)</div>
                  <div>• Other applicable national and state privacy laws</div>
                </div>
                <p>
                  By using our services or providing personal information to us, you acknowledge that you have read and understood this Privacy Policy.
                </p>
              </div>
            </section>
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <Users className="w-6 h-6 text-blue-400 mr-3" />
                <h2 className="text-2xl font-bold text-white">2. Data Controller Information</h2>
              </div>
              <div className="bg-slate-700/50 rounded-xl p-6 border border-slate-600/50">
                <div className="space-y-3 text-gray-300">
                  <p><strong className="text-blue-400">Data Controller:</strong> Luai Ltd.</p>
                  <p><strong className="text-blue-400">Business Registration:</strong> Israeli Company Registry</p>
                  <p><strong className="text-blue-400">Primary Contact:</strong> privacy@Luai.io</p>
                  <p><strong className="text-blue-400">Data Protection Officer:</strong> Eliran Loai Deeb</p>
                  <p><strong className="text-blue-400">Physical Address:</strong> Available upon request for data subject rights</p>
                  <p><strong className="text-blue-400">EU Representative:</strong> Contact privacy@Luai.io for EU representation details</p>
                </div>
              </div>
            </section>
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <Database className="w-6 h-6 text-green-400 mr-3" />
                <h2 className="text-2xl font-bold text-white">3. Categories of Personal Data Collected</h2>
              </div>
              <div className="space-y-6 text-gray-300 leading-relaxed">
                <div>
                  <h3 className="text-lg font-semibold text-green-400 mb-3">3.1 Client Contact Information:</h3>
                  <div className="pl-6 space-y-2">
                    <div>• Full name and professional title</div>
                    <div>• Business email address and phone numbers</div>
                    <div>• Company name and business address</div>
                    <div>• Professional credentials and certifications</div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-400 mb-3">3.2 Technical and Security Data:</h3>
                  <div className="pl-6 space-y-2">
                    <div>• Network infrastructure information</div>
                    <div>• System logs and security event data</div>
                    <div>• Vulnerability assessment results</div>
                    <div>• IP addresses and domain information</div>
                    <div>• Security configuration details</div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-400 mb-3">3.3 Website and Communication Data:</h3>
                  <div className="pl-6 space-y-2">
                    <div>• Website usage analytics and cookies</div>
                    <div>• Communication records and correspondence</div>
                    <div>• Marketing preferences and consent records</div>
                    <div>• Device information and browser data</div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-400 mb-3">3.4 Financial and Contractual Information:</h3>
                  <div className="pl-6 space-y-2">
                    <div>• Billing and payment information</div>
                    <div>• Contract terms and service agreements</div>
                    <div>• Purchase orders and invoicing data</div>
                  </div>
                </div>
              </div>
            </section>
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <Shield className="w-6 h-6 text-yellow-400 mr-3" />
                <h2 className="text-2xl font-bold text-white">4. Legal Bases for Processing (GDPR Article 6)</h2>
              </div>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <div>
                  <strong className="text-yellow-400">4.1 Contractual Necessity (Article 6(1)(b)):</strong> Processing necessary for the performance of cybersecurity services, contract execution, and service delivery obligations.
                </div>
                <div>
                  <strong className="text-yellow-400">4.2 Legitimate Interests (Article 6(1)(f)):</strong> Processing for business operations, security incident response, fraud prevention, and improvement of services, provided such interests do not override data subject rights.
                </div>
                <div>
                  <strong className="text-yellow-400">4.3 Legal Compliance (Article 6(1)(c)):</strong> Processing required to comply with legal obligations, regulatory requirements, and court orders.
                </div>
                <div>
                  <strong className="text-yellow-400">4.4 Consent (Article 6(1)(a)):</strong> Processing based on explicit, informed consent for marketing communications, optional services, or when required by law.
                </div>
                <div>
                  <strong className="text-yellow-400">4.5 Vital Interests (Article 6(1)(d)):</strong> Processing necessary to protect vital interests in emergency cybersecurity incident response situations.
                </div>
              </div>
            </section>
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <Users className="w-6 h-6 text-cyan-400 mr-3" />
                <h2 className="text-2xl font-bold text-white">5. Data Subject Rights</h2>
              </div>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>Under GDPR, Israeli Privacy Law, and other applicable regulations, you have the following rights:</p>
                <div className="grid gap-4">
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <strong className="text-cyan-400">Right of Access (GDPR Art. 15):</strong> Request information about personal data processing and obtain a copy of your data.
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <strong className="text-cyan-400">Right to Rectification (GDPR Art. 16):</strong> Request correction of inaccurate or incomplete personal data.
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <strong className="text-cyan-400">Right to Erasure (GDPR Art. 17):</strong> Request deletion of personal data under specific circumstances.
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <strong className="text-cyan-400">Right to Restrict Processing (GDPR Art. 18):</strong> Request limitation of data processing in certain situations.
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <strong className="text-cyan-400">Right to Data Portability (GDPR Art. 20):</strong> Receive personal data in a structured, machine-readable format.
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <strong className="text-cyan-400">Right to Object (GDPR Art. 21):</strong> Object to processing based on legitimate interests or for direct marketing.
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <strong className="text-cyan-400">Right to Withdraw Consent:</strong> Withdraw consent at any time for consent-based processing.
                  </div>
                </div>
                <p>
                  <strong>To exercise your rights:</strong> Contact our Data Protection Officer at privacy@Luai.io. We will respond within one month (or two months for complex requests) as required by law.
                </p>
              </div>
            </section>
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <Globe className="w-6 h-6 text-orange-400 mr-3" />
                <h2 className="text-2xl font-bold text-white">6. International Data Transfers</h2>
              </div>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  <strong className="text-orange-400">6.1 Transfer Safeguards:</strong> When transferring personal data outside the EU/EEA, we ensure appropriate safeguards through:
                </p>
                <div className="pl-6 space-y-2">
                  <div>• European Commission adequacy decisions where applicable</div>
                  <div>• Standard Contractual Clauses (SCCs) approved by the European Commission</div>
                  <div>• Binding Corporate Rules for intra-group transfers</div>
                  <div>• Certification schemes and codes of conduct</div>
                </div>
                <p>
                  <strong className="text-orange-400">6.2 Israeli Adequacy:</strong> Israel is recognized by the European Commission as providing adequate protection for personal data transfers from the EU.
                </p>
                <p>
                  <strong className="text-orange-400">6.3 US Transfers:</strong> For data transfers to the United States, we rely on appropriate safeguards and ensure compliance with state privacy laws including CCPA and VCDPA.
                </p>
              </div>
            </section>
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <Lock className="w-6 h-6 text-red-400 mr-3" />
                <h2 className="text-2xl font-bold text-white">7. Data Security Measures</h2>
              </div>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  We implement state-of-the-art technical and organizational measures to protect personal data:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-red-400 mb-3">Technical Measures:</h3>
                    <div className="space-y-2 pl-4">
                      <div>• End-to-end encryption (AES-256)</div>
                      <div>• Multi-factor authentication</div>
                      <div>• Regular security assessments</div>
                      <div>• Secure data transmission (TLS 1.3)</div>
                      <div>• Access logging and monitoring</div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-red-400 mb-3">Organizational Measures:</h3>
                    <div className="space-y-2 pl-4">
                      <div>• Data protection by design and default</div>
                      <div>• Employee training and confidentiality agreements</div>
                      <div>• Data breach response procedures</div>
                      <div>• Regular compliance audits</div>
                      <div>• Vendor security assessments</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <AlertCircle className="w-6 h-6 text-purple-400 mr-3" />
                <h2 className="text-2xl font-bold text-white">8. Data Retention Periods</h2>
              </div>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <div className="grid gap-4">
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <strong className="text-purple-400">Client Contract Data:</strong> Retained for 7 years after contract termination for legal and tax compliance
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <strong className="text-purple-400">Security Assessment Data:</strong> Retained for 3-5 years or as required by industry standards and client agreements
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <strong className="text-purple-400">Marketing Communications:</strong> Retained until consent is withdrawn or purpose fulfilled
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <strong className="text-purple-400">Website Analytics:</strong> Retained for 26 months in accordance with data protection guidelines
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <strong className="text-purple-400">Incident Response Data:</strong> Retained as required by law or regulation, typically 1-3 years
                  </div>
                </div>
                <p>
                  Data is securely deleted or anonymized when retention periods expire, unless longer retention is required by law or ongoing legal proceedings.
                </p>
              </div>
            </section>
            <section className="mb-8">
              <div className="flex items-center mb-6">
                <FileText className="w-6 h-6 text-blue-400 mr-3" />
                <h2 className="text-2xl font-bold text-white">9. Contact Information and Complaints</h2>
              </div>
              <div className="bg-slate-700/50 rounded-xl p-6 border border-slate-600/50 space-y-4">
                <div className="text-gray-300">
                  <h3 className="text-lg font-semibold text-blue-400 mb-3">Contact Us:</h3>
                  <div className="space-y-2">
                    <p><strong>Data Protection Officer:</strong> privacy@Luai.io</p>
                    <p><strong>General Privacy Inquiries:</strong> info@Luai.io</p>
                    <p><strong>Phone:</strong> +54 9 (11) 24828429</p>
                  </div>
                </div>
                <div className="text-gray-300">
                  <h3 className="text-lg font-semibold text-blue-400 mb-3">Supervisory Authorities:</h3>
                  <div className="space-y-2">
                    <p><strong>EU/EEA Residents:</strong> Your local Data Protection Authority</p>
                    <p><strong>Israeli Residents:</strong> Israeli Privacy Protection Authority</p>
                    <p><strong>California Residents:</strong> California Privacy Protection Agency</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    <Footer />
    </>
  );
};

export default PrivacyPolicy;
