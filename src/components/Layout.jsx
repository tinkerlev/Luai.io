import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Menu, X } from 'lucide-react';
import { Link, useLocation, Outlet } from 'react-router-dom';


const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const navigationLinks = [
    { path: '/#home', label: 'Home' },
    { path: '/#services', label: 'Services' },
    { path: '/#about', label: 'About Us' },
    { path: '/#contact', label: 'Contact Us' },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900">
      {/* Matrix-style background animation */}
      <div className="fixed inset-0 opacity-10 w-full">
        <motion.div
          initial={{ backgroundPosition: '0% 0%' }}
          animate={{ backgroundPosition: '100% 100%' }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          className="w-full h-full"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="120" height="120" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%239C92AC" fill-opacity="0.4" fill-rule="evenodd"%3E%3Cpath d="M0 40L40 0H20L0 20M40 40V20L20 40"/%3E%3C/g%3E%3C/svg%3E")',
          }}
        />
      </div>

      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-sm border-b border-slate-800/50">
        <div className="w-full px-2 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <img 
                src="/assets/whiteBgColor.png" 
                alt="Luai Logo" 
                className="object-contain"
                style={{ width: '290px', height: '290px' }}
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigationLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-base font-medium text-slate-300 hover:text-blue-400 transition-colors duration-300"
                  onClick={(e) => {
                    if (link.path.includes('#')) {
                      e.preventDefault();
                      const id = link.path.split('#')[1];
                      const element = document.getElementById(id);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={{ height: isMenuOpen ? 'auto' : 0 }}
          className="md:hidden overflow-hidden bg-slate-800 w-full"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {navigationLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block py-2 text-sm text-slate-300 hover:text-blue-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>
      </header>

      {/* Main Content */}
      <main className="pt-16 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <Outlet />
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-slate-900/80 backdrop-blur-sm border-t border-slate-800/50 py-6 z-20">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-400">
          <p>© {new Date().getFullYear()} Luai. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;