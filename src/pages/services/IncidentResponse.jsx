import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Shield, AlertTriangle, CheckCircle, Clock, Zap, Phone } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const IncidentResponse = () => {
  const handleGetEvaluation = () => {
    // Navigate to home page with hash for contact section
    window.location.href = '/#contact';
    
    // Wait a bit for page load and then scroll to contact
    setTimeout(() => {
      const contactElement = document.getElementById('contact');
      if (contactElement) {
        contactElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 500);
  };

  const handleEmergencyCall = () => {
    window.open('tel:+5491124828429', '_self');
  };

  return (
    <>
      <Helmet>
        <title>24/7 Cybersecurity Incident Response Services | SecurePulses</title>
        <meta name="description" content="Emergency cybersecurity incident response services. 24/7 breach response, malware removal, ransomware recovery. Immediate expert assistance when you're under attack." />
        <meta name="keywords" content="incident response, cyber attack response, ransomware recovery, breach response, emergency cybersecurity, malware removal" />
        <link rel="canonical" href="https://securepulses.luai.io/services/incident-response" />
      </Helmet>

      <Header />

      <div className="min-h-screen bg-gradient-to-br from-black via-red-900 to-black relative overflow-hidden pt-16">
        <video 
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-30"
          autoPlay 
          muted 
          loop 
          playsInline
        >
          <source src="/assets/0_Abstract_Design_Data_Visualization_3840x2160.mp4" type="video/mp4" />
        </video>
        
        <div className="absolute inset-0 bg-black bg-opacity-70 z-10"></div>
        
        <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-red-500/20 border border-red-500/30 rounded-full px-6 py-3 mb-6">
              <Zap className="w-6 h-6 text-red-400 mr-2" />
              <span className="text-red-300 font-semibold">24/7 Emergency Response</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent mb-6">
              Cybersecurity Incident Response
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              <strong className="text-red-400">Under attack right now?</strong> 
              Every second counts when your business is being compromised. Get immediate expert response before it's too late.
            </p>
          </div>

          {/* Emergency CTA */}
          <div className="bg-red-500/20 border border-red-500/40 rounded-2xl p-6 mb-12 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">🚨 SECURITY EMERGENCY?</h2>
            <p className="text-xl text-gray-300 mb-6">
              <strong className="text-red-400">If you're currently under attack, call immediately.</strong> 
              Don't wait - every minute allows attackers to steal more data and cause more damage.
            </p>
            <button
              onClick={handleEmergencyCall}
              className="inline-flex items-center justify-center px-8 py-4 text-xl font-bold text-white bg-gradient-to-r from-red-600 to-red-800 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 animate-pulse"
            >
              <Phone className="w-6 h-6 mr-3" />
              🆘 EMERGENCY: +54 9 (11) 24828429
            </button>
            <p className="text-gray-400 text-sm mt-3">24/7 immediate response • Expert on-call • Rapid containment</p>
          </div>

          {/* Content */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
            
            {/* The Reality Check */}
            <section className="mb-12">
              <div className="bg-gradient-to-r from-red-500/15 to-orange-500/15 rounded-2xl p-8 mb-8 border border-red-500/30">
                <h2 className="text-2xl font-bold text-white mb-4">⏰ Time Is Your Enemy</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  <strong className="text-red-400">In a cybersecurity incident, every minute matters.</strong> 
                  While you're trying to figure out what's happening, attackers are actively stealing data, 
                  installing backdoors, and preparing for maximum damage.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  The average company takes <strong className="text-yellow-400">197 days to discover a breach</strong> 
                  and <strong className="text-blue-400">69 days to contain it.</strong> 
                  By then, the damage is done and your business may never recover.
                </p>
              </div>
            </section>

            {/* What We Do */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
                <Zap className="w-8 h-8 text-red-400 mr-3" />
                Immediate Expert Response
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-red-400 mb-4">Rapid Containment & Analysis</h3>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    When you call, you get immediate access to cybersecurity experts who have handled thousands of incidents. 
                    We don't just contain the attack - we analyze what happened, how they got in, and what they've accessed.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">Immediate threat containment</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">Forensic analysis and evidence collection</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">Attack vector identification</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">Data breach assessment</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-orange-400 mb-4">Recovery & Prevention</h3>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Stopping the attack is just the beginning. We help you recover safely, ensure the attackers can't return, 
                    and strengthen your defenses to prevent future incidents.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">Safe system recovery and restoration</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">Malware removal and system cleaning</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">Security hardening and prevention</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">Compliance and legal documentation</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Response Process */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-8">Our Emergency Response Process</h2>
              
              <div className="grid gap-6">
                <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600/50">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold mr-4">1</div>
                    <h3 className="text-xl font-semibold text-red-400">Immediate Triage (0-15 minutes)</h3>
                  </div>
                  <p className="text-gray-300">
                    Emergency assessment to understand the scope and severity of the incident. We guide you through immediate containment steps 
                    while our team mobilizes for rapid response.
                  </p>
                </div>

                <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600/50">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold mr-4">2</div>
                    <h3 className="text-xl font-semibold text-orange-400">Rapid Containment (15-60 minutes)</h3>
                  </div>
                  <p className="text-gray-300">
                    Immediate action to stop the attack from spreading. We isolate compromised systems, cut off attacker access, 
                    and prevent further data theft or system damage.
                  </p>
                </div>

                <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600/50">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold mr-4">3</div>
                    <h3 className="text-xl font-semibold text-yellow-400">Investigation & Evidence (1-24 hours)</h3>
                  </div>
                  <p className="text-gray-300">
                    Forensic analysis to understand exactly what happened, what data was accessed, and how the attackers gained entry. 
                    Critical for both recovery and legal requirements.
                  </p>
                </div>

                <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600/50">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold mr-4">4</div>
                    <h3 className="text-xl font-semibold text-green-400">Recovery & Hardening (24-72 hours)</h3>
                  </div>
                  <p className="text-gray-300">
                    Safe restoration of systems and data, ensuring no malware or backdoors remain. 
                    Implementation of enhanced security measures to prevent similar incidents.
                  </p>
                </div>
              </div>
            </section>

            {/* Incident Types */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-8">Incidents We Handle</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-xl p-6 border border-red-500/30">
                  <h3 className="text-xl font-semibold text-white mb-4">🔒 Ransomware Attacks</h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• File encryption and system lockouts</li>
                    <li>• Ransom negotiation (when appropriate)</li>
                    <li>• Data recovery without paying</li>
                    <li>• Prevention of re-infection</li>
                    <li>• Business continuity planning</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/30">
                  <h3 className="text-xl font-semibold text-white mb-4">🕵️ Data Breaches</h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Customer data compromise</li>
                    <li>• Financial information theft</li>
                    <li>• Intellectual property theft</li>
                    <li>• GDPR/compliance breach response</li>
                    <li>• Customer notification assistance</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl p-6 border border-blue-500/30">
                  <h3 className="text-xl font-semibold text-white mb-4">🦠 Malware Infections</h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Advanced persistent threats (APTs)</li>
                    <li>• Banking trojans and info stealers</li>
                    <li>• Cryptomining malware</li>
                    <li>• Botnet infections</li>
                    <li>• Complete system cleaning</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Urgency CTA */}
            <section className="text-center">
              <div className="bg-gradient-to-r from-red-500/15 to-black/15 rounded-2xl p-8 border border-red-500/30">
                <h2 className="text-3xl font-bold text-white mb-4">Don't Face This Alone</h2>
                <p className="text-xl text-gray-300 mb-6">
                  <strong className="text-red-400">Cybersecurity incidents are traumatic and overwhelming.</strong> 
                  You need experts who have been through this hundreds of times and know exactly what to do.
                </p>
                
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-red-500/20 p-6 rounded-xl border border-red-500/40">
                    <h3 className="text-xl font-bold text-red-400 mb-3">⚠️ If You're Under Attack NOW</h3>
                    <p className="text-gray-300 mb-4">Immediate emergency response required. Call our emergency line for instant expert assistance.</p>
                    <button
                      onClick={handleEmergencyCall}
                      className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors"
                    >
                      🆘 CALL EMERGENCY LINE
                    </button>
                  </div>
                  
                  <div className="bg-blue-500/20 p-6 rounded-xl border border-blue-500/40">
                    <h3 className="text-xl font-bold text-blue-400 mb-3">🛡️ Prevention & Preparedness</h3>
                    <p className="text-gray-300 mb-4">Get an incident response plan ready before you need it. Be prepared for when (not if) an attack happens.</p>
                    <button
                      onClick={handleGetEvaluation}
                      className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors"
                    >
                      Get Incident Response Plan
                    </button>
                  </div>
                </div>

                <div className="bg-black/30 border border-orange-500/40 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-orange-400 mb-3">⏰ The Cost of Delay</h3>
                  <div className="grid md:grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-red-400">$1M+</div>
                      <p className="text-gray-300 text-sm">Average cost per hour of downtime for major incidents</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-orange-400">72hrs</div>
                      <p className="text-gray-300 text-sm">Critical window for evidence collection and containment</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-yellow-400">90%</div>
                      <p className="text-gray-300 text-sm">Of companies without incident response plan fail to recover</p>
                    </div>
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

export default IncidentResponse;
