import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield, ChevronDown } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);
  };

  const scrollToSection = (sectionId) => {
    window.location.href = `/#${sectionId}`;
    handleLinkClick();
  };

  const navigationItems = [
    {
      name: 'Home',
      action: () => scrollToSection('home'),
      isSection: true
    },
    {
      name: 'Services',
      action: () => scrollToSection('services'),
      isSection: true,
      hasDropdown: true,
      dropdownItems: [
        { name: 'Penetration Testing', action: () => { window.location.href = '/services/penetration-testing'; handleLinkClick(); } },
        { name: 'Security Audits', action: () => { window.location.href = '/services/security-audits'; handleLinkClick(); } },
        { name: 'Vulnerability Assessments', action: () => { window.location.href = '/services/vulnerability-assessments'; handleLinkClick(); } },
        { name: 'Red Team Operations', action: () => { window.location.href = '/services/red-team-operations'; handleLinkClick(); } },
        { name: 'Compliance Consulting', action: () => { window.location.href = '/services/compliance-consulting'; handleLinkClick(); } },
        { name: 'Incident Response', action: () => { window.location.href = '/services/incident-response'; handleLinkClick(); } },
        { name: 'Security Training', action: () => { window.location.href = '/services/security-training'; handleLinkClick(); } }
      ]
    },
    {
      name: 'About',
      action: () => scrollToSection('about'),
      isSection: true
    },
    {
      name: 'Contact',
      action: () => scrollToSection('contact'),
      isSection: true
    }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50 shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-1 sm:px-1 lg:px-0">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center group -ml-18"
            onClick={handleLinkClick}
          >
            <div className="relative group-hover:scale-105 transition-transform duration-300">
              <img 
                src="/assets/securepulses-logo.png" 
                alt="SecurePulses Logo" 
                className="h-16 w-auto object-contain max-w-[250px]"
                style={{ filter: 'brightness(1.1)' }}
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-0">
            {navigationItems.map((item, index) => (
              <div key={index} className="relative group">
                {item.hasDropdown ? (
                  <div 
                    className="relative"
                    onMouseEnter={() => setIsServicesOpen(true)}
                    onMouseLeave={() => setIsServicesOpen(false)}
                  >
                    <button
                      onClick={item.action}
                      className="flex items-center space-x-1 text-gray-300 hover:text-blue-400 transition-colors duration-300 font-medium px-1 py-2"
                    >
                      <span>{item.name}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {/* Dropdown Menu */}
                    <div className={`absolute top-full left-0 mt-2 w-56 bg-slate-800/95 backdrop-blur-md border border-slate-700/50 rounded-xl shadow-xl transition-all duration-300 ${
                      isServicesOpen ? 'opacity-100 visible transform translate-y-0' : 'opacity-0 invisible transform -translate-y-2'
                    }`}>
                      <div className="py-2">
                        {item.dropdownItems.map((dropdownItem, dropdownIndex) => (
                          <button
                            key={dropdownIndex}
                            onClick={dropdownItem.action}
                            className="w-full text-left px-4 py-2 text-gray-300 hover:text-blue-400 hover:bg-slate-700/50 transition-colors duration-300"
                          >
                            {dropdownItem.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={item.action}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-300 font-medium px-1 py-2"
                  >
                    {item.name}
                  </button>
                )}
              </div>
            ))}

            {/* CTA Button */}
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ml-4 mr-4"
            >
              Get Started
            </button>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-300 hover:text-white transition-colors duration-300"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-4 space-y-2 bg-slate-800/95 backdrop-blur-md rounded-xl mt-2 border border-slate-700/50">
            {navigationItems.map((item, index) => (
              <button
                key={index}
                onClick={item.action}
                className="block w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-slate-700/50 transition-colors duration-300"
              >
                {item.name}
              </button>
            ))}
            
            <hr className="border-slate-700/50 mx-4" />
            
            <Link
              to="/terms-of-service"
              className="block px-4 py-2 text-gray-400 hover:text-gray-300 transition-colors duration-300 text-sm"
              onClick={handleLinkClick}
            >
              Terms of Service
            </Link>
            <Link
              to="/privacy-policy"
              className="block px-4 py-2 text-gray-400 hover:text-gray-300 transition-colors duration-300 text-sm"
              onClick={handleLinkClick}
            >
              Privacy Policy
            </Link>
            
            <div className="px-4 py-2">
              <button
                onClick={() => scrollToSection('contact')}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;


