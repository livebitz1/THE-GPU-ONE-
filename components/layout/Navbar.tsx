'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useStatus } from '@/context/StatusContext';

const Navbar = () => {
  const pathname = usePathname();
  const { systemStatus } = useStatus();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Utilities', path: '/utilities' },
    { name: 'Assistant', path: '/assistant' },
    { name: 'Tokens', path: '/tokens' },
    { name: 'Docs', path: '/docs' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close mobile menu when path changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/80 backdrop-blur-md' : 'bg-transparent'
      }`}
      style={{ height: 'var(--header-height)' }}
    >
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <Link 
          href="/" 
          className="flex items-center gap-2 transition-transform hover:scale-105"
        >
          <span className="text-2xl font-bold gradient-text">CoreNet.AI</span>
        </Link>

        {/* System Status Indicator */}
        <div className="hidden md:flex items-center gap-2 absolute left-1/2 transform -translate-x-1/2">
          <div 
            className={`w-2 h-2 rounded-full ${
              systemStatus.status === 'online' ? 'bg-green-500 animate-pulse' : 
              systemStatus.status === 'degraded' ? 'bg-yellow-500 animate-pulse' : 'bg-red-500 animate-pulse'
            }`}
          />
          <span className="text-xs text-gray-300">
            {systemStatus.status === 'online' ? 'All Systems Operational' : 
             systemStatus.status === 'degraded' ? 'Performance Degraded' : 'System Alert'}
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`text-sm transition-all hover:text-neon-blue ${
                pathname === link.path ? 'neon-text-blue' : 'text-gray-300'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            href="/login" 
            className="px-4 py-2 rounded-md bg-gradient-to-r from-neon-blue to-neon-purple text-white text-sm font-medium transition-transform hover:scale-105"
          >
            Login
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMenu}
          className="flex md:hidden text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-neon-blue transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-neon-blue my-1 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-neon-blue transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black/90 backdrop-blur-lg overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={`text-sm py-2 transition-all ${
                      pathname === link.path ? 'neon-text-blue' : 'text-gray-300'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <Link 
                  href="/login" 
                  className="py-2 text-center rounded-md bg-gradient-to-r from-neon-blue to-neon-purple text-white text-sm font-medium"
                >
                  Login
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar; 