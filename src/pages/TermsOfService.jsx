import React from 'react';
import { Analytics } from "@vercel/analytics/react"
import { Helmet } from 'react-helmet-async';
import { Shield, AlertTriangle, Scale, Globe, FileText, Lock } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const TermsOfService = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service - Luai Cybersecurity Services</title>
        <meta name="description" content="Comprehensive Terms of Service for Luai cybersecurity consulting services. GDPR compliant, Israeli Privacy Law compliant, and US privacy regulations compliant." />
        <meta name="keywords" content="terms of service, cybersecurity, privacy policy, GDPR, Israeli privacy law, legal terms, penetration testing" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://luai.io/terms-of-service" />
      </Helmet>

      <Header />

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden pt-16">
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
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-blue-500/20 border border-blue-500/30 rounded-full px-6 py-3 mb-6">
              <Scale className="w-6 h-6 text-blue-400 mr-2" />
              <span className="text-blue-300 font-semibold">Legal Framework</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-6">
              Terms of Service
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Professional cybersecurity consulting services governed by international legal standards
            </p>
            
            <div className="mt-6 text-gray-400">
              <p><strong>Last Updated:</strong> December 2024</p>
              <p><strong>Effective Date:</strong> December 2024</p>
            </div>
          </div>

          {/* Content */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
            
            {/* 1. Introduction */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <FileText className="w-6 h-6 text-blue-400 mr-3" />
                <h2 className="text-2xl font-bold text-white">1. Introduction and Acceptance</h2>
              </div>
              
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  These Terms of Service ("Terms") constitute a legally binding agreement between you ("Client," "Customer," or "you") and Luai, a cybersecurity consulting firm established under Israeli law ("Company," "we," "us," or "our"). These Terms govern your access to and use of our cybersecurity consulting services, penetration testing, security assessments, and related professional services (collectively, the "Services").
                </p>
                
                <p>
                  By engaging our Services, accessing our website, or entering into any service agreement with Luai, you acknowledge that you have read, understood, and agree to be bound by these Terms, along with our Privacy Policy, which is incorporated herein by reference. If you do not agree to these Terms, you must not use our Services.
                </p>
                
                <p>
                  These Terms are designed to comply with applicable laws and regulations, including but not limited to the European Union General Data Protection Regulation (GDPR), Israeli Privacy Protection Law (התשמ"א-1981), California Consumer Privacy Act (CCPA), and other relevant data protection and cybersecurity regulations across jurisdictions where our Services are provided.
                </p>
              </div>
            </section>

            {/* 2. Definitions */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <Globe className="w-6 h-6 text-purple-400 mr-3" />
                <h2 className="text-2xl font-bold text-white">2. Definitions</h2>
              </div>
              
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>For the purposes of these Terms:</p>
                
                <div className="grid gap-4 pl-6">
                  <div>
                    <strong className="text-blue-400">"Authorized Personnel"</strong> means employees, contractors, or agents of the Company who are specifically authorized to perform Services under these Terms.
                  </div>
                  
                  <div>
                    <strong className="text-blue-400">"Confidential Information"</strong> means any non-public, proprietary, or confidential information disclosed by either party, including but not limited to technical data, security vulnerabilities, business processes, and personal data.
                  </div>
                  
                  <div>
                    <strong className="text-blue-400">"Penetration Testing"</strong> means authorized simulated cyber attacks performed to evaluate the security of IT infrastructure, applications, or systems.
                  </div>
                  
                  <div>
                    <strong className="text-blue-400">"Personal Data"</strong> has the same meaning as defined in applicable data protection laws, including GDPR Article 4(1) and Israeli Privacy Protection Law Section 1.
                  </div>
                  
                  <div>
                    <strong className="text-blue-400">"Scope of Work"</strong> means the specific cybersecurity services to be performed as detailed in the applicable Statement of Work or service agreement.
                  </div>
                  
                  <div>
                    <strong className="text-blue-400">"Vulnerability"</strong> means any weakness in an information system, system security procedures, internal controls, or implementation that could be exploited by a threat source.
                  </div>
                </div>
              </div>
            </section>

            {/* 3. Services Description */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <Shield className="w-6 h-6 text-green-400 mr-3" />
                <h2 className="text-2xl font-bold text-white">3. Services Description</h2>
              </div>
              
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Luai provides professional cybersecurity consulting services, including but not limited to:
                </p>
                
                <div className="grid gap-3 pl-6">
                  <div>• <strong>Penetration Testing:</strong> Comprehensive security assessments following industry standards including OWASP, NIST 800-115, PTES, and MITRE ATT&CK frameworks</div>
                  <div>• <strong>Vulnerability Assessments:</strong> Systematic evaluation of security weaknesses in networks, applications, and systems</div>
                  <div>• <strong>Security Audits:</strong> Compliance assessments against standards such as ISO 27001, PCI DSS, SOC 2, and regulatory requirements</div>
                  <div>• <strong>Red Team Operations:</strong> Advanced persistent threat simulations and security posture evaluations</div>
                  <div>• <strong>Security Consulting:</strong> Strategic cybersecurity advisory services and risk management consultation</div>
                  <div>• <strong>Incident Response:</strong> Emergency cybersecurity incident investigation and remediation support</div>
                  <div>• <strong>Security Training:</strong> Cybersecurity awareness and technical training programs</div>
                </div>
                
                <p>
                  All Services are performed by certified cybersecurity professionals with expertise in ethical hacking, security frameworks, and compliance requirements. Our methodologies adhere to internationally recognized standards and best practices.
                </p>
              </div>
            </section>

            {/* 4. Client Responsibilities and Authorization */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <AlertTriangle className="w-6 h-6 text-yellow-400 mr-3" />
                <h2 className="text-2xl font-bold text-white">4. Client Responsibilities and Authorization</h2>
              </div>
              
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  <strong className="text-yellow-400">4.1 Legal Authorization:</strong> Client represents and warrants that they have full legal authority to authorize the Company to perform all Services on the systems, networks, and applications specified in the Scope of Work. Client acknowledges that unauthorized penetration testing or security assessments may violate applicable laws.
                </p>
                
                <p>
                  <strong className="text-yellow-400">4.2 Written Consent:</strong> Prior to commencement of any Services, Client must provide written authorization explicitly permitting the Company to perform the agreed-upon testing activities. This authorization must be signed by an individual with appropriate authority within Client's organization.
                </p>
                
                <p>
                  <strong className="text-yellow-400">4.3 Scope Compliance:</strong> Client agrees not to request or authorize any activities outside the agreed Scope of Work. Any modifications to the scope must be documented in writing and signed by both parties.
                </p>
                
                <p>
                  <strong className="text-yellow-400">4.4 Third-Party Systems:</strong> If the Scope of Work includes third-party systems or services, Client warrants that they have obtained all necessary permissions and authorizations from such third parties before Services commence.
                </p>
                
                <p>
                  <strong className="text-yellow-400">4.5 Information Accuracy:</strong> Client is responsible for providing accurate, complete, and current information regarding their systems, infrastructure, and security requirements. Any material changes must be communicated immediately to the Company.
                </p>
              </div>
            </section>

            {/* 5. Confidentiality and Data Protection */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <Lock className="w-6 h-6 text-red-400 mr-3" />
                <h2 className="text-2xl font-bold text-white">5. Confidentiality and Data Protection</h2>
              </div>
              
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  <strong className="text-red-400">5.1 Mutual Confidentiality:</strong> Both parties acknowledge that they may receive Confidential Information during the performance of Services. Each party agrees to maintain the confidentiality of such information and not to disclose it to any third party without prior written consent, except as required by law or court order.
                </p>
                
                <p>
                  <strong className="text-red-400">5.2 Data Protection Compliance:</strong> The Company processes Personal Data in accordance with applicable data protection laws, including GDPR, Israeli Privacy Protection Law, and relevant US state privacy laws. Our detailed data processing practices are outlined in our Privacy Policy.
                </p>
                
                <p>
                  <strong className="text-red-400">5.3 Data Minimization:</strong> The Company will only collect and process Personal Data that is necessary for the performance of Services. Data retention periods are limited to what is legally required or operationally necessary.
                </p>
                
                <p>
                  <strong className="text-red-400">5.4 Security Measures:</strong> The Company implements appropriate technical and organizational measures to protect Confidential Information and Personal Data, including encryption, access controls, and secure data transmission protocols.
                </p>
                
                <p>
                  <strong className="text-red-400">5.5 Data Subject Rights:</strong> Where applicable under GDPR or other privacy laws, individuals have the right to access, rectify, erase, restrict processing, data portability, and object to processing of their Personal Data. Requests should be directed to our Data Protection Officer at privacy@Luai.io.
                </p>
              </div>
            </section>

            {/* 6. Limitation of Liability */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <Scale className="w-6 h-6 text-orange-400 mr-3" />
                <h2 className="text-2xl font-bold text-white">6. Limitation of Liability</h2>
              </div>
              
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  <strong className="text-orange-400">6.1 Service Limitations:</strong> Client acknowledges that cybersecurity services cannot guarantee complete security or prevent all potential threats. Our Services provide assessments based on the testing performed during the engagement period and cannot account for all possible vulnerabilities or future threats.
                </p>
                
                <p>
                  <strong className="text-orange-400">6.2 Liability Cap:</strong> To the maximum extent permitted by law, the Company's total liability for any claims arising from or relating to these Terms or the Services shall not exceed the total fees paid by Client for the specific Services giving rise to the claim in the twelve (12) months preceding the claim.
                </p>
                
                <p>
                  <strong className="text-orange-400">6.3 Excluded Damages:</strong> Neither party shall be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or business opportunities, regardless of the theory of liability and whether or not advised of the possibility of such damages.
                </p>
                
                <p>
                  <strong className="text-orange-400">6.4 System Availability:</strong> While the Company uses reasonable care during testing, Client acknowledges that penetration testing and security assessments may potentially impact system performance or availability. The Company is not liable for any service interruptions that may occur during authorized testing.
                </p>
              </div>
            </section>

            {/* 7. Governing Law and Disputes */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <Globe className="w-6 h-6 text-cyan-400 mr-3" />
                <h2 className="text-2xl font-bold text-white">7. Governing Law and Dispute Resolution</h2>
              </div>
              
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  <strong className="text-cyan-400">7.1 Governing Law:</strong> These Terms shall be governed by and construed in accordance with the laws of Israel, without regard to its conflict of law principles. Where Services are provided to clients in the European Union, applicable EU law and GDPR provisions shall also apply.
                </p>
                
                <p>
                  <strong className="text-cyan-400">7.2 Jurisdiction:</strong> Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the competent courts in Tel Aviv, Israel. For EU-based clients, this clause does not prejudice any mandatory consumer protection laws or jurisdiction rules under EU regulations.
                </p>
                
                <p>
                  <strong className="text-cyan-400">7.3 Alternative Dispute Resolution:</strong> Prior to initiating formal legal proceedings, the parties agree to attempt resolution through good faith negotiations. If unsuccessful, disputes may be resolved through mediation or arbitration under the rules of the Tel Aviv Chamber of Commerce.
                </p>
                
                <p>
                  <strong className="text-cyan-400">7.4 Cross-Border Compliance:</strong> For international clients, these Terms comply with applicable international conventions and bilateral agreements for the recognition and enforcement of arbitral awards and judgments.
                </p>
              </div>
            </section>

            {/* 8. Contact Information */}
            <section className="mb-8">
              <div className="flex items-center mb-6">
                <FileText className="w-6 h-6 text-blue-400 mr-3" />
                <h2 className="text-2xl font-bold text-white">8. Contact Information</h2>
              </div>
              
              <div className="bg-slate-700/50 rounded-xl p-6 border border-slate-600/50">
                <div className="space-y-3 text-gray-300">
                  <p><strong>Luai Ltd.</strong></p>
                  <p>Email: legal@Luai.io</p>
                  <p>Privacy Officer: privacy@Luai.io</p>
                  <p>Phone: +54 9 (11) 24828429</p>
                  <p>For legal notices and formal communications, please use certified mail or email with delivery confirmation.</p>
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

export default TermsOfService;
