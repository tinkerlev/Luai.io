import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Shield, AlertTriangle, CheckCircle, Clock, Target, Lock } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const PenetrationTesting = () => {
  return (
    <>
      <Helmet>
        <title>Penetration Testing Services - Professional Ethical Hacking | Luai</title>
        <meta name="description" content="Professional penetration testing services by certified ethical hackers. Comprehensive security testing to find vulnerabilities before attackers do. OWASP, NIST compliant." />
        <meta name="keywords" content="penetration testing, ethical hacking, pentest, security testing, vulnerability testing, OWASP testing, web app security" />
        <link rel="canonical" href="https://Luai.luai.io/services/penetration-testing" />
      </Helmet>

      <Header />

      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-red-900 to-black relative overflow-hidden pt-16">
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
            <div className="inline-flex items-center bg-red-500/20 border border-red-500/30 rounded-full px-6 py-3 mb-6">
              <Target className="w-6 h-6 text-red-400 mr-2" />
              <span className="text-red-300 font-semibold">Professional Ethical Hacking</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-red-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-6">
              Penetration Testing Services
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Think like an attacker. Find vulnerabilities before they do. 
              Professional penetration testing that simulates real-world cyber attacks to identify and fix security weaknesses.
            </p>
          </div>

          {/* Content */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
            
            {/* The Reality Check */}
            <section className="mb-12">
              <div className="bg-gradient-to-r from-red-500/15 to-orange-500/15 rounded-2xl p-8 mb-8 border border-red-500/30">
                <h2 className="text-2xl font-bold text-white mb-4">🎯 The Hard Truth About "Secure" Systems</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  <strong className="text-red-400">95% of systems we test have critical vulnerabilities.</strong> 
                  These aren't theoretical risks - they're the exact same attack vectors that hackers use to steal millions every day.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Your developers are brilliant at building features. But are they trained to think like criminals? 
                  <strong className="text-blue-400"> That's where we come in.</strong>
                </p>
              </div>
            </section>

            {/* What We Do */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
                <Shield className="w-8 h-8 text-blue-400 mr-3" />
                What Is Penetration Testing?
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-blue-400 mb-4">Real Attack Simulation</h3>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    We don't just scan for vulnerabilities - we actively exploit them. Using the same tools, techniques, and methodologies that real attackers use, we attempt to breach your systems in a controlled, authorized manner.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">Web application penetration testing</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">Network infrastructure testing</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">API security assessment</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">Mobile application testing</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-purple-400 mb-4">Beyond Automated Scans</h3>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Anyone can run a vulnerability scanner. We do manual testing that uncovers the business logic flaws, authentication bypasses, and complex attack chains that automated tools miss completely.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">Manual testing by certified experts</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">Business logic vulnerability discovery</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">Custom exploit development</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">Detailed remediation guidance</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Testing Methodology */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-8">Our Testing Methodology</h2>
              
              <div className="grid gap-6">
                <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600/50">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-4">1</div>
                    <h3 className="text-xl font-semibold text-blue-400">Reconnaissance & Information Gathering</h3>
                  </div>
                  <p className="text-gray-300">
                    Just like real attackers, we start by gathering intelligence about your systems, technologies, and potential attack surfaces. This phase often reveals more than you'd expect.
                  </p>
                </div>

                <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600/50">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-4">2</div>
                    <h3 className="text-xl font-semibold text-purple-400">Vulnerability Discovery & Analysis</h3>
                  </div>
                  <p className="text-gray-300">
                    We identify security weaknesses using both automated tools and manual techniques, focusing on vulnerabilities that pose real business risk.
                  </p>
                </div>

                <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600/50">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold mr-4">3</div>
                    <h3 className="text-xl font-semibold text-red-400">Active Exploitation</h3>
                  </div>
                  <p className="text-gray-300">
                    This is where we prove the impact. We safely exploit vulnerabilities to demonstrate exactly what an attacker could achieve - data access, system control, or business disruption.
                  </p>
                </div>

                <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600/50">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold mr-4">4</div>
                    <h3 className="text-xl font-semibold text-green-400">Detailed Reporting & Remediation</h3>
                  </div>
                  <p className="text-gray-300">
                    You get a comprehensive report with executive summary, technical details, proof-of-concept exploits, and specific remediation steps your team can follow immediately.
                  </p>
                </div>
              </div>
            </section>

            {/* What You Get */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-8">What You Get</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-blue-500/30">
                  <Lock className="w-8 h-8 text-blue-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-4">Comprehensive Security Assessment</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Complete vulnerability inventory with risk ratings</li>
                    <li>• Proof-of-concept exploits demonstrating real impact</li>
                    <li>• Business risk analysis for each finding</li>
                    <li>• Prioritized remediation roadmap</li>
                    <li>• Executive summary for leadership</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-green-500/10 to-teal-500/10 rounded-xl p-6 border border-green-500/30">
                  <Clock className="w-8 h-8 text-green-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-4">Ongoing Support</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Post-assessment consultation calls</li>
                    <li>• Guidance on remediation implementation</li>
                    <li>• Re-testing of critical findings after fixes</li>
                    <li>• Annual testing recommendations</li>
                    <li>• Emergency incident response if needed</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Pricing CTA */}
            <section className="text-center">
              <div className="bg-gradient-to-r from-red-500/15 to-purple-500/15 rounded-2xl p-8 border border-red-500/30">
                <h2 className="text-3xl font-bold text-white mb-4">Ready to See Your Real Security Posture?</h2>
                <p className="text-xl text-gray-300 mb-8">
                  Stop guessing whether your systems are secure. Get a professional penetration test and know exactly where you stand.
                </p>
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">7-14 Days</div>
                    <div className="text-gray-300">Testing Duration</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">48 Hours</div>
                    <div className="text-gray-300">Initial Report Delivery</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">30 Days</div>
                    <div className="text-gray-300">Post-Test Support</div>
                  </div>
                </div>
                <button
                  onClick={() => window.location.href = '/#contact'}
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-red-600 to-purple-600 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  Get Your Penetration Test Quote
                </button>
                <p className="text-gray-400 text-sm mt-4">Free initial consultation • Custom scope • Competitive pricing</p>
              </div>
            </section>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default PenetrationTesting;
