import React from 'react';
import { Analytics } from "@vercel/analytics/react"
import { Helmet } from 'react-helmet-async';
import { Shield, AlertTriangle, CheckCircle, Clock, Crosshair, Skull } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const RedTeamOperations = () => {
  const handleGetEvaluation = () => {
    window.location.href = '/#contact';
  };

  return (
    <>
      <Helmet>
        <title>Red Team Operations - Advanced Adversary Simulation | Luai</title>
        <meta name="description" content="Professional Red Team operations and advanced persistent threat simulation. Real-world attack scenarios to test your defenses. Military-grade adversary simulation services." />
        <meta name="keywords" content="red team operations, adversary simulation, APT simulation, advanced persistent threat, red team exercise, purple team" />
        <link rel="canonical" href="https://Luai.luai.io/services/red-team-operations" />
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
              <Crosshair className="w-6 h-6 text-red-400 mr-2" />
              <span className="text-red-300 font-semibold">Elite Adversary Simulation</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent mb-6">
              Red Team Operations
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              <strong className="text-red-400">Think your security team is ready for a real attack?</strong> 
              Let's find out. We simulate advanced nation-state adversaries to test if your defenses can stop the real thing.
            </p>
          </div>

          {/* Content */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
            
            {/* The Reality Check */}
            <section className="mb-12">
              <div className="bg-gradient-to-r from-red-500/15 to-orange-500/15 rounded-2xl p-8 mb-8 border border-red-500/30">
                <h2 className="text-2xl font-bold text-white mb-4">💀 The Advanced Threat Reality</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  <strong className="text-red-400">Your traditional security tests aren't enough anymore.</strong> 
                  Modern attackers don't just exploit single vulnerabilities - they chain multiple weaknesses together, 
                  persist for months, and move laterally through your network like ghosts.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Nation-state actors, organized crime groups, and sophisticated hackers use <strong className="text-blue-400">advanced persistent threat (APT) techniques</strong> 
                  that your standard penetration tests never touch. <strong className="text-yellow-400">Are you ready for them?</strong>
                </p>
              </div>
            </section>

            {/* What We Do */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
                <Skull className="w-8 h-8 text-red-400 mr-3" />
                Real Adversary Simulation
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-red-400 mb-4">Multi-Stage Campaign Simulation</h3>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    We don't just hack in and leave. We simulate real adversary behavior - reconnaissance, 
                    initial compromise, privilege escalation, lateral movement, persistence, and data exfiltration. 
                    Just like a real advanced persistent threat.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">Long-term persistence simulation</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">Advanced evasion techniques</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">Social engineering campaigns</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">Physical security testing</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-orange-400 mb-4">Defense Team Training</h3>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    This isn't just about finding vulnerabilities. We test your incident response capabilities, 
                    your security team's detection skills, and your organization's ability to respond to a coordinated attack.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">SOC team capability assessment</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">Incident response testing</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">Detection tool validation</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">Executive crisis management</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Attack Phases */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-8">Advanced Persistent Threat Simulation</h2>
              
              <div className="grid gap-6">
                <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600/50">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold mr-4">1</div>
                    <h3 className="text-xl font-semibold text-red-400">Reconnaissance & Target Intelligence</h3>
                  </div>
                  <p className="text-gray-300">
                    Just like real attackers, we start by gathering intelligence about your organization. 
                    OSINT collection, employee profiling, technology mapping, and identifying potential attack vectors.
                  </p>
                </div>

                <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600/50">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold mr-4">2</div>
                    <h3 className="text-xl font-semibold text-orange-400">Initial Compromise & Foothold</h3>
                  </div>
                  <p className="text-gray-300">
                    Spear-phishing campaigns, watering hole attacks, or physical infiltration - we use whatever method 
                    a real adversary would choose to get that critical first foothold in your environment.
                  </p>
                </div>

                <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600/50">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold mr-4">3</div>
                    <h3 className="text-xl font-semibold text-yellow-400">Persistence & Privilege Escalation</h3>
                  </div>
                  <p className="text-gray-300">
                    We establish multiple persistence mechanisms and escalate privileges just like APT groups do. 
                    The goal is to maintain access even if initial entry points are discovered.
                  </p>
                </div>

                <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600/50">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-4">4</div>
                    <h3 className="text-xl font-semibold text-purple-400">Lateral Movement & Data Discovery</h3>
                  </div>
                  <p className="text-gray-300">
                    We move through your network laterally, mapping internal systems, compromising additional hosts, 
                    and identifying your most valuable data assets - just like a real advanced persistent threat.
                  </p>
                </div>

                <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600/50">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold mr-4">5</div>
                    <h3 className="text-xl font-semibold text-green-400">Objective Achievement & Exfiltration</h3>
                  </div>
                  <p className="text-gray-300">
                    The final phase: achieving the adversary's objectives. Whether it's data theft, system disruption, 
                    or maintaining long-term access for future operations.
                  </p>
                </div>
              </div>
            </section>

            {/* Threat Models */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-8">Adversary Profiles We Simulate</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-xl p-6 border border-red-500/30">
                  <h3 className="text-xl font-semibold text-white mb-4">Nation-State APT</h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Long-term persistence campaigns</li>
                    <li>• Advanced zero-day exploitation</li>
                    <li>• Supply chain compromise simulation</li>
                    <li>• Intelligence gathering operations</li>
                    <li>• Critical infrastructure targeting</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/30">
                  <h3 className="text-xl font-semibold text-white mb-4">Organized Cybercrime</h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Ransomware deployment campaigns</li>
                    <li>• Financial fraud operations</li>
                    <li>• Data theft for monetization</li>
                    <li>• Business disruption attacks</li>
                    <li>• Cryptocurrency mining implants</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl p-6 border border-blue-500/30">
                  <h3 className="text-xl font-semibold text-white mb-4">Insider Threats</h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Malicious employee simulation</li>
                    <li>• Compromised credential abuse</li>
                    <li>• Data exfiltration scenarios</li>
                    <li>• Privilege abuse testing</li>
                    <li>• Corporate espionage simulation</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Urgency CTA */}
            <section className="text-center">
              <div className="bg-gradient-to-r from-red-500/15 to-black/15 rounded-2xl p-8 border border-red-500/30">
                <h2 className="text-3xl font-bold text-white mb-4">Your Enemies Aren't Waiting</h2>
                <p className="text-xl text-gray-300 mb-6">
                  <strong className="text-red-400">Advanced persistent threats are operating in networks right now.</strong> 
                  They're patient, sophisticated, and relentless. The question is: are you ready for them?
                </p>
                
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-red-500/20 p-6 rounded-xl border border-red-500/40">
                    <div className="text-3xl font-bold text-red-400 mb-2">200+ Days</div>
                    <p className="text-gray-300">Average time APT groups remain undetected in corporate networks</p>
                  </div>
                  <div className="bg-orange-500/20 p-6 rounded-xl border border-orange-500/40">
                    <div className="text-3xl font-bold text-orange-400">90%</div>
                    <p className="text-gray-300">Of organizations fail to detect sophisticated attack campaigns</p>
                  </div>
                  <div className="bg-yellow-500/20 p-6 rounded-xl border border-yellow-500/40">
                    <div className="text-3xl font-bold text-yellow-400">$4.45M</div>
                    <p className="text-gray-300">Average cost of advanced persistent threat incidents</p>
                  </div>
                </div>

                <div className="bg-black/30 border border-red-500/40 rounded-xl p-6 mb-8">
                  <h3 className="text-xl font-bold text-red-400 mb-3">⚔️ Elite Service Alert</h3>
                  <p className="text-gray-300">
                    Red Team operations require <strong className="text-white">extensive planning and specialized expertise.</strong> 
                    We only conduct 2-3 operations per quarter to ensure maximum effectiveness.
                  </p>
                </div>

                <button
                  onClick={handleGetEvaluation}
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-red-600 to-black rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  ⚔️ Request Red Team Assessment
                </button>
                <p className="text-gray-400 text-sm mt-4">Elite-tier engagement • Comprehensive adversary simulation • Executive briefing included</p>
              </div>
            </section>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default RedTeamOperations;
