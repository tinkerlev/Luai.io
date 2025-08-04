import React from 'react';
import { Analytics } from "@vercel/analytics/react"
import { Helmet } from 'react-helmet-async';
import { Shield, AlertTriangle, CheckCircle, Clock, FileCheck, Award } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const ComplianceConsulting = () => {
  const handleGetEvaluation = () => {
    window.location.href = '/#contact';
  };

  return (
    <>
      <Helmet>
        <title>Compliance Consulting Services - ISO 27001, SOC 2, PCI DSS | Luai</title>
        <meta name="description" content="Expert compliance consulting for ISO 27001, SOC 2, PCI DSS, GDPR, and HIPAA. Navigate complex regulations and pass audits with confidence." />
        <meta name="keywords" content="compliance consulting, ISO 27001, SOC 2, PCI DSS, GDPR compliance, HIPAA compliance, regulatory compliance" />
        <link rel="canonical" href="https://luai.io/services/compliance-consulting" />
      </Helmet>

      <Header />

      <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-900 to-orange-900 relative overflow-hidden pt-16">
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
            <div className="inline-flex items-center bg-green-500/20 border border-green-500/30 rounded-full px-6 py-3 mb-6">
              <Award className="w-6 h-6 text-green-400 mr-2" />
              <span className="text-green-300 font-semibold">Regulatory Excellence</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
              Compliance Consulting
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              <strong className="text-red-400">Compliance failures destroy businesses.</strong> 
              Lost contracts, massive fines, damaged reputation - don't let regulatory requirements become your biggest threat.
            </p>
          </div>

          {/* Content */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
            
            {/* The Reality Check */}
            <section className="mb-12">
              <div className="bg-gradient-to-r from-red-500/15 to-orange-500/15 rounded-2xl p-8 mb-8 border border-red-500/30">
                <h2 className="text-2xl font-bold text-white mb-4">⚖️ The Compliance Crisis</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  <strong className="text-red-400">Regulatory requirements are getting stricter every year.</strong> 
                  GDPR fines reached €1.6 billion in 2022 alone. SOC 2 failures cost companies millions in lost deals. 
                  ISO 27001 certification is now mandatory for major contracts.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  But here's the problem: <strong className="text-blue-400">most companies try to handle compliance internally</strong> 
                  and end up with gaps that cost them everything when audit time comes.
                </p>
              </div>
            </section>

            {/* What We Do */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
                <FileCheck className="w-8 h-8 text-green-400 mr-3" />
                Why Compliance Consulting Saves Your Business
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-green-400 mb-4">Expert Navigation of Complex Requirements</h3>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Regulations aren't just checklists - they're complex frameworks that require deep understanding. 
                    We don't just help you check boxes; we ensure your compliance program actually protects your business 
                    and creates competitive advantages.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">ISO 27001 certification guidance</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">SOC 2 Type I & II preparation</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">PCI DSS compliance roadmap</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">GDPR & CCPA privacy compliance</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-blue-400 mb-4">Business Value Creation</h3>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Smart compliance isn't just about avoiding penalties - it's about winning business. 
                    The right certifications open doors to enterprise contracts, reduce insurance costs, 
                    and give you a competitive edge in the market.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">Enterprise contract qualification</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">Insurance premium reductions</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">Customer trust & retention</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">Competitive differentiation</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Compliance Frameworks */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-8">Compliance Frameworks We Master</h2>
              
              <div className="grid gap-6">
                <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600/50">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-4">ISO</div>
                    <h3 className="text-xl font-semibold text-blue-400">ISO 27001 Information Security Management</h3>
                  </div>
                  <p className="text-gray-300 mb-3">
                    The gold standard for information security management. Essential for enterprise contracts and international business.
                  </p>
                  <div className="text-sm text-gray-400">
                    ✓ Gap analysis & implementation roadmap ✓ Documentation development ✓ Internal audit preparation ✓ Certification support
                  </div>
                </div>

                <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600/50">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-4">SOC</div>
                    <h3 className="text-xl font-semibold text-purple-400">SOC 2 Service Organization Controls</h3>
                  </div>
                  <p className="text-gray-300 mb-3">
                    Critical for SaaS and cloud service providers. Required by most enterprise customers for vendor assessment.
                  </p>
                  <div className="text-sm text-gray-400">
                    ✓ Type I & II readiness ✓ Control design & implementation ✓ Evidence collection ✓ Auditor selection & management
                  </div>
                </div>

                <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600/50">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold mr-4">PCI</div>
                    <h3 className="text-xl font-semibold text-green-400">PCI DSS Payment Card Industry</h3>
                  </div>
                  <p className="text-gray-300 mb-3">
                    Mandatory for any business processing credit card payments. Non-compliance means hefty fines and loss of payment processing.
                  </p>
                  <div className="text-sm text-gray-400">
                    ✓ Self-assessment questionnaires ✓ Network segmentation ✓ Vulnerability management ✓ Compliance validation
                  </div>
                </div>

                <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600/50">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold mr-4">GDPR</div>
                    <h3 className="text-xl font-semibold text-red-400">GDPR & Privacy Regulations</h3>
                  </div>
                  <p className="text-gray-300 mb-3">
                    European and global privacy laws with severe penalties. Essential for any business handling personal data.
                  </p>
                  <div className="text-sm text-gray-400">
                    ✓ Privacy impact assessments ✓ Data mapping & classification ✓ Consent management ✓ Breach response procedures
                  </div>
                </div>
              </div>
            </section>

            {/* Our Process */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-8">Our Proven Compliance Process</h2>
              
              <div className="grid md:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-blue-500/30 text-center">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-4">1</div>
                  <h3 className="text-lg font-semibold text-white mb-2">Assessment</h3>
                  <p className="text-gray-300 text-sm">Comprehensive gap analysis against target framework</p>
                </div>

                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/30 text-center">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-4">2</div>
                  <h3 className="text-lg font-semibold text-white mb-2">Planning</h3>
                  <p className="text-gray-300 text-sm">Detailed implementation roadmap with timelines</p>
                </div>

                <div className="bg-gradient-to-br from-green-500/10 to-teal-500/10 rounded-xl p-6 border border-green-500/30 text-center">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-4">3</div>
                  <h3 className="text-lg font-semibold text-white mb-2">Implementation</h3>
                  <p className="text-gray-300 text-sm">Hands-on support for controls and documentation</p>
                </div>

                <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-xl p-6 border border-yellow-500/30 text-center">
                  <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-4">4</div>
                  <h3 className="text-lg font-semibold text-white mb-2">Certification</h3>
                  <p className="text-gray-300 text-sm">Audit preparation and ongoing compliance support</p>
                </div>
              </div>
            </section>

            {/* ROI Section */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-8">The ROI of Smart Compliance</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl p-6 border border-green-500/30">
                  <h3 className="text-xl font-semibold text-white mb-4">💰 Revenue Opportunities</h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Access to enterprise contracts requiring certification</li>
                    <li>• Premium pricing for compliant services</li>
                    <li>• Faster sales cycles with compliance credentials</li>
                    <li>• International market expansion opportunities</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl p-6 border border-blue-500/30">
                  <h3 className="text-xl font-semibold text-white mb-4">🛡️ Risk Mitigation</h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Avoid regulatory fines (GDPR: up to €20M)</li>
                    <li>• Reduce cyber insurance premiums</li>
                    <li>• Prevent data breach costs</li>
                    <li>• Protect against reputational damage</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/30">
                  <h3 className="text-xl font-semibold text-white mb-4">🚀 Operational Benefits</h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Improved security posture and processes</li>
                    <li>• Better incident response capabilities</li>
                    <li>• Streamlined vendor assessments</li>
                    <li>• Enhanced customer trust and loyalty</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Urgency CTA */}
            <section className="text-center">
              <div className="bg-gradient-to-r from-green-500/15 to-blue-500/15 rounded-2xl p-8 border border-green-500/30">
                <h2 className="text-3xl font-bold text-white mb-4">Don't Let Compliance Kill Your Growth</h2>
                <p className="text-xl text-gray-300 mb-6">
                  <strong className="text-red-400">Every day without proper compliance is a lost opportunity.</strong> 
                  While you're figuring out requirements, your competitors are winning the contracts you could have had.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-red-500/20 p-6 rounded-xl border border-red-500/40">
                    <div className="text-3xl font-bold text-red-400 mb-2">67%</div>
                    <p className="text-gray-300">Of enterprise deals require compliance certifications</p>
                  </div>
                  <div className="bg-green-500/20 p-6 rounded-xl border border-green-500/40">
                    <div className="text-3xl font-bold text-green-400 mb-2">25%</div>
                    <p className="text-gray-300">Average premium companies charge with SOC 2 certification</p>
                  </div>
                  <div className="bg-blue-500/20 p-6 rounded-xl border border-blue-500/40">
                    <div className="text-3xl font-bold text-blue-400 mb-2">6-18 Months</div>
                    <p className="text-gray-300">Typical time to achieve major certifications</p>
                  </div>
                </div>

                <button
                  onClick={handleGetEvaluation}
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-green-600 to-blue-600 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  Start My Compliance Journey
                </button>
                <p className="text-gray-400 text-sm mt-4">Free compliance assessment • Custom roadmap • Expert guidance</p>
              </div>
            </section>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default ComplianceConsulting;
