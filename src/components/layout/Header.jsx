import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Shield } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import LanguageSwitcher from '../LanguageSwitcher';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();

  const services = [
    { key: 'penetrationTesting', path: '/services/penetration-testing' },
    { key: 'incidentResponse', path: '/services/incident-response' },
    { key: 'vulnerabilityAssessment', path: '/services/vulnerability-assessments' },
    { key: 'redTeamOperations', path: '/services/red-team-operations' },
    { key: 'securityAudits', path: '/services/security-audits' },
    { key: 'complianceConsulting', path: '/services/compliance-consulting' },
    { key: 'securityTraining', path: '/services/security-training' }
  ];

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-blue-600" />
            <span className="font-bold text-xl text-gray-900 dark:text-white">
              SecurePulses
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">
              {t('home')}
            </Link>
            
            <div className="relative group">
              <button className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">
                {t('services')}
              </button>
              <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="p-2">
                  {services.map((service) => (
                    <Link
                      key={service.key}
                      to={service.path}
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors"
                    >
                      {t(service.key)}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link to="/#about" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">
              {t('about')}
            </Link>
            
            <Link to="/#contact" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">
              {t('contact')}
            </Link>

            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="space-y-2">
              <Link to="/" className="block py-2 text-gray-700 dark:text-gray-300">
                {t('home')}
              </Link>
              <div className="py-2">
                <span className="text-gray-700 dark:text-gray-300 font-medium">{t('services')}</span>
                <div className="ml-4 mt-2 space-y-1">
                  {services.map((service) => (
                    <Link
                      key={service.key}
                      to={service.path}
                      className="block py-1 text-sm text-gray-600 dark:text-gray-400"
                    >
                      {t(service.key)}
                    </Link>
                  ))}
                </div>
              </div>
              <Link to="/#about" className="block py-2 text-gray-700 dark:text-gray-300">
                {t('about')}
              </Link>
              <Link to="/#contact" className="block py-2 text-gray-700 dark:text-gray-300">
                {t('contact')}
              </Link>
              <div className="py-2">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
