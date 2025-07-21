import React from 'react';
import { Helmet } from 'react-helmet-async';
import { GraduationCap, Users, Target, Brain, Code, Shield, CheckCircle } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const SecurityTraining = () => {
  const handleGetEvaluation = () => {
    window.location.href = '/#contact';
  };

  return (
    <>
      <Helmet>
        <title>Cybersecurity Training & Security Awareness Programs | SecurePulses</title>
        <meta name="description" content="Professional cybersecurity training programs. Security awareness training, technical workshops, phishing simulations. Expert-led training for all skill levels." />
        <meta name="keywords" content="cybersecurity training, security awareness, phishing simulation, security workshops, cyber training, security education" />
        <link rel="canonical" href="https://securepulses.com/services/security-training" />
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
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-blue-500/20 border border-blue-500/30 rounded-full px-6 py-3 mb-6">
              <GraduationCap className="w-6 h-6 text-blue-400 mr-2" />
              <span className="text-blue-300 font-semibold">Elite Security Education</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-6">
              Cybersecurity Training & Education
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              <strong className="text-red-400">Your employees are your biggest security risk - or your strongest defense.</strong> 
              The choice is yours. Make them security-aware before attackers make them victims.
            </p>
          </div>

          {/* Content */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
            
            {/* The Reality Check */}
            <section className="mb-12">
              <div className="bg-gradient-to-r from-red-500/15 to-orange-500/15 rounded-2xl p-8 mb-8 border border-red-500/30">
                <h2 className="text-2xl font-bold text-white mb-4">👥 The Human Factor</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  <strong className="text-red-400">95% of successful cyber attacks start with human error.</strong> 
                  A single click on a malicious link, one weak password, or one social engineering trick 
                  can give attackers everything they need to destroy your business.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  But here's the thing: <strong className="text-blue-400">humans can also be your best defense.</strong> 
                  Properly trained employees catch threats that technology misses, report suspicious activity, 
                  and become a human firewall protecting your organization.
                </p>
              </div>
            </section>

            {/* What We Do */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
                <Users className="w-8 h-8 text-blue-400 mr-3" />
                Real-World Security Training That Works
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-blue-400 mb-4">Beyond Generic Awareness</h3>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Forget boring online modules and generic presentations. Our training is based on real attacks 
                    I've seen and techniques I've used. Your team learns to recognize and respond to actual threats, 
                    not theoretical scenarios.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">Interactive threat simulation exercises</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">Real-world attack case studies</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">Hands-on phishing detection training</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">Industry-specific threat education</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-purple-400 mb-4">Technical Team Deep Dives</h3>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Your developers and IT staff need advanced training. I teach the same techniques 
                    I learned in military cybersecurity programs - how to think like an attacker, 
                    find vulnerabilities, and build secure systems.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">Secure coding practices workshop</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">Penetration testing methodology</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">Incident response procedures</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">Advanced threat hunting techniques</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Training Programs */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-8">Comprehensive Training Programs</h2>
              
              <div className="grid gap-6">
                <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600/50">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-4">1</div>
                    <h3 className="text-xl font-semibold text-blue-400">Executive & Leadership Training</h3>
                  </div>
                  <p className="text-gray-300 mb-3">
                    Strategic cybersecurity awareness for decision-makers. Understanding business risks, 
                    regulatory requirements, and how to build a security-first culture.
                  </p>
                  <div className="text-sm text-gray-400">
                    ✓ Risk assessment and business impact ✓ Compliance requirements ✓ Investment priorities ✓ Crisis communication
                  </div>
                </div>

                <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600/50">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-4">2</div>
                    <h3 className="text-xl font-semibold text-purple-400">Employee Security Awareness</h3>
                  </div>
                  <p className="text-gray-300 mb-3">
                    Practical security training for all staff. Learn to recognize threats, respond appropriately, 
                    and protect company assets in daily work activities.
                  </p>
                  <div className="text-sm text-gray-400">
                    ✓ Phishing recognition ✓ Password security ✓ Social engineering defense ✓ Safe browsing practices
                  </div>
                </div>

                <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600/50">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold mr-4">3</div>
                    <h3 className="text-xl font-semibold text-green-400">Developer Security Training</h3>
                  </div>
                  <p className="text-gray-300 mb-3">
                    Advanced secure coding practices and vulnerability prevention for development teams. 
                    Learn to build security into applications from the ground up.
                  </p>
                  <div className="text-sm text-gray-400">
                    ✓ OWASP Top 10 prevention ✓ Secure API development ✓ Code review techniques ✓ Security testing integration
                  </div>
                </div>

                <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600/50">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold mr-4">4</div>
                    <h3 className="text-xl font-semibold text-red-400">IT & Security Team Advanced Training</h3>
                  </div>
                  <p className="text-gray-300 mb-3">
                    Elite-level training for technical security professionals. Learn advanced techniques 
                    used by military cybersecurity units and elite red teams.
                  </p>
                  <div className="text-sm text-gray-400">
                    ✓ Advanced persistent threat hunting ✓ Forensic analysis ✓ Incident response leadership ✓ Threat intelligence
                  </div>
                </div>
              </div>
            </section>

            {/* Training Formats */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-8">Flexible Training Delivery</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-blue-500/30">
                  <h3 className="text-xl font-semibold text-white mb-4">🎯 Live Workshops</h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Interactive in-person sessions</li>
                    <li>• Real-time Q&A and discussion</li>
                    <li>• Hands-on practical exercises</li>
                    <li>• Team-building security challenges</li>
                    <li>• Customized for your industry</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-green-500/10 to-teal-500/10 rounded-xl p-6 border border-green-500/30">
                  <h3 className="text-xl font-semibold text-white mb-4">💻 Virtual Training</h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Remote team training sessions</li>
                    <li>• Interactive online workshops</li>
                    <li>• Self-paced learning modules</li>
                    <li>• Virtual lab environments</li>
                    <li>• Global team accessibility</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-xl p-6 border border-orange-500/30">
                  <h3 className="text-xl font-semibold text-white mb-4">🎓 Ongoing Programs</h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Monthly security briefings</li>
                    <li>• Simulated phishing campaigns</li>
                    <li>• Quarterly skills assessments</li>
                    <li>• Continuous awareness updates</li>
                    <li>• Progress tracking and reporting</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* ROI Section */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-8">The ROI of Security Training</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl p-6 border border-green-500/30 text-center">
                  <div className="text-3xl font-bold text-green-400 mb-3">70%</div>
                  <h3 className="text-lg font-semibold text-white mb-2">Reduction in Successful Phishing</h3>
                  <p className="text-gray-300 text-sm">Companies with regular security training see dramatic decreases in successful social engineering attacks</p>
                </div>

                <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl p-6 border border-blue-500/30 text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-3">$3.2M</div>
                  <h3 className="text-lg font-semibold text-white mb-2">Average Savings per Prevented Breach</h3>
                  <p className="text-gray-300 text-sm">Well-trained employees catch threats early, preventing costly incidents and data breaches</p>
                </div>

                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/30 text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-3">85%</div>
                  <h3 className="text-lg font-semibold text-white mb-2">Faster Incident Response</h3>
                  <p className="text-gray-300 text-sm">Trained teams identify and respond to security incidents significantly faster than untrained staff</p>
                </div>
              </div>
            </section>

            {/* Urgency CTA */}
            <section className="text-center">
              <div className="bg-gradient-to-r from-blue-500/15 to-purple-500/15 rounded-2xl p-8 border border-blue-500/30">
                <h2 className="text-3xl font-bold text-white mb-4">Your Team Is Either Part of the Problem or Part of the Solution</h2>
                <p className="text-xl text-gray-300 mb-6">
                  <strong className="text-red-400">Attackers are training their techniques every day.</strong> 
                  Is your team keeping up? One untrained employee can undo millions in security investments.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-red-500/20 p-6 rounded-xl border border-red-500/40">
                    <div className="text-3xl font-bold text-red-400 mb-2">91%</div>
                    <p className="text-gray-300">Of cyber attacks start with a spear phishing email targeting employees</p>
                  </div>
                  <div className="bg-orange-500/20 p-6 rounded-xl border border-orange-500/40">
                    <div className="text-3xl font-bold text-orange-400 mb-2">12 Minutes</div>
                    <p className="text-gray-300">Average time it takes for an employee to click on a phishing link</p>
                  </div>
                  <div className="bg-green-500/20 p-6 rounded-xl border border-green-500/40">
                    <div className="text-3xl font-bold text-green-400 mb-2">5x</div>
                    <p className="text-gray-300">Better threat detection rate for companies with regular security training</p>
                  </div>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6 mb-8">
                  <h3 className="text-xl font-bold text-blue-400 mb-3">🎓 Investment in Your Team's Security Skills</h3>
                  <p className="text-gray-300">
                    Security training isn't an expense - it's an investment. <strong className="text-white">Every dollar spent on training 
                    saves an average of $7 in prevented incidents.</strong> Plus, your team becomes more confident, 
                    more aware, and more valuable to your organization.
                  </p>
                </div>

                <button
                  onClick={handleGetEvaluation}
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  Start Security Training Program
                </button>
                <p className="text-gray-400 text-sm mt-4">Custom curriculum • Expert instruction • Measurable results</p>
              </div>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default SecurityTraining;
