// NotFound.jsx
import React from 'react';
import { Analytics } from "@vercel/analytics/react"
import { Helmet } from 'react-helmet-async';
import { Shield, AlertTriangle, Home, Search, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const NotFound = () => {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  const handleContactUs = () => {
    window.location.href = '/#contact';
  };

  return (
    <>
      <Helmet>
        <title>Page Not Found - Luai Cybersecurity</title>
        <meta name="description" content="The page you're looking for doesn't exist. Get back to Luai cybersecurity services and protect your business from cyber threats." />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://luai.io/404" />
      </Helmet>

      <Header />

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 relative overflow-hidden pt-16">
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
        
        <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex items-center justify-center min-h-screen">
          
          <div className="text-center max-w-4xl mx-auto">
            {/* 404 Visual */}
            <div className="mb-8">
              <div className="inline-flex items-center bg-red-500/20 border border-red-500/30 rounded-full px-6 py-3 mb-6">
                <AlertTriangle className="w-6 h-6 text-red-400 mr-2" />
                <span className="text-red-300 font-semibold">Security Alert: Page Not Found</span>
              </div>
              
              <div className="text-8xl sm:text-9xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent mb-6">
                404
              </div>
              
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                This Page Has Been Compromised
              </h1>
              
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
                <strong className="text-red-400">Just kidding!</strong> But seriously - the page you're looking for doesn't exist. 
                <br />
                It might have been moved, deleted, or you may have typed the wrong URL.
                <br /><br />
                <strong className="text-blue-400">Don't worry, your business security is more important than a missing page.</strong>
              </p>
            </div>

            {/* Content Section */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 shadow-2xl mb-8">
              
              {/* Security Humor Section */}
              <div className="bg-gradient-to-r from-blue-500/15 to-purple-500/15 rounded-2xl p-8 mb-8 border border-blue-500/30">
                <h2 className="text-2xl font-bold text-white mb-4">🔍 What We Found Instead</h2>
                <div className="grid md:grid-cols-3 gap-6 text-left">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      <p className="text-gray-200 font-semibold">✅ Your Security Awareness</p>
                    </div>
                    <p className="text-gray-300 text-sm">You're on a cybersecurity site, which shows you care about protection</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                      <p className="text-gray-200 font-semibold">🛡️ Our Services</p>
                    </div>
                    <p className="text-gray-300 text-sm">Professional cybersecurity services that actually work</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                      <p className="text-gray-200 font-semibold">🎯 Your Next Step</p>
                    </div>
                    <p className="text-gray-300 text-sm">Getting your business properly protected</p>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-6">Where Did You Want to Go?</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600/50">
                    <h4 className="text-lg font-semibold text-blue-400 mb-4">🏠 Main Pages</h4>
                    <div className="space-y-2">
                      <Link to="/" className="block text-gray-300 hover:text-blue-400 transition-colors">
                        → Home Page
                      </Link>
                      <Link to="/#services" className="block text-gray-300 hover:text-blue-400 transition-colors">
                        → Our Services
                      </Link>
                      <Link to="/#about" className="block text-gray-300 hover:text-blue-400 transition-colors">
                        → About Us
                      </Link>
                      <Link to="/#contact" className="block text-gray-300 hover:text-blue-400 transition-colors">
                        → Contact Us
                      </Link>
                    </div>
                  </div>

                  <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600/50">
                    <h4 className="text-lg font-semibold text-green-400 mb-4">🛡️ Security Services</h4>
                    <div className="space-y-2">
                      <Link to="/services/penetration-testing" className="block text-gray-300 hover:text-green-400 transition-colors">
                        → Penetration Testing
                      </Link>
                      <Link to="/services/vulnerability-assessments" className="block text-gray-300 hover:text-green-400 transition-colors">
                        → Vulnerability Assessments
                      </Link>
                      <Link to="/services/incident-response" className="block text-gray-300 hover:text-green-400 transition-colors">
                        → Incident Response
                      </Link>
                      <Link to="/services/security-training" className="block text-gray-300 hover:text-green-400 transition-colors">
                        → Security Training
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleGoHome}
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <Home className="w-5 h-5 mr-2" />
                  Take Me Home
                </button>
                <button
                  onClick={handleContactUs}
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-blue-400 border border-blue-400/30 rounded-xl shadow-lg hover:shadow-xl hover:bg-blue-400/10 transform hover:scale-105 transition-all duration-300"
                >
                  <Shield className="w-5 h-5 mr-2" />
                  Get Security Help
                </button>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-gradient-to-r from-red-500/15 to-orange-500/15 rounded-2xl p-6 border border-red-500/30">
              <h3 className="text-xl font-bold text-white mb-4">🚨 Security Emergency?</h3>
              <p className="text-gray-300 mb-4">
                If you're here because you're under attack and need immediate help, 
                <strong className="text-red-400"> don't waste time looking for pages.</strong>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="tel:+5491124828429"
                  className="inline-flex items-center justify-center px-6 py-3 text-lg font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors"
                >
                  📞 Call Emergency Line
                </a>
                <a 
                  href="mailto:info@Luai.io"
                  className="inline-flex items-center justify-center px-6 py-3 text-lg font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-xl transition-colors"
                >
                  📧 Email Immediately
                </a>
              </div>
            </div>

            {/* Fun Security Fact */}
            <div className="mt-8 text-center">
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 inline-block">
                <p className="text-blue-300 text-sm">
                  <strong>Security Tip:</strong> A proper 404 page can actually improve your website's security 
                  by preventing attackers from easily discovering your site structure. 
                  <br />
                  <span className="text-gray-400">Just like how we help secure everything else about your business! 😉</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default NotFound;
