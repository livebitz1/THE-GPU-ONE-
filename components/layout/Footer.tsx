'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Platform',
      links: [
        { name: 'Utilities', href: '/utilities' },
        { name: 'Assistant', href: '/assistant' },
        { name: 'Tokens', href: '/tokens' },
        { name: 'Status', href: '/status' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Documentation', href: '/docs' },
        { name: 'API Reference', href: '/docs/api' },
        { name: 'Tutorials', href: '/docs/tutorials' },
        { name: 'Roadmap', href: '/roadmap' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
        { name: 'Careers', href: '/careers' },
        { name: 'Blog', href: '/blog' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Cookie Policy', href: '/cookies' },
      ],
    },
  ];

  return (
    <footer className="bg-black relative">
      {/* Decorative glow line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-neon-blue to-transparent opacity-50"></div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Logo Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="block mb-4">
              <span className="text-3xl font-bold gradient-text">CoreNet.AI</span>
            </Link>
            <p className="text-gray-400 text-sm mb-6">
              Advanced Decentralized AI Infrastructure for the next generation of applications
            </p>
            <div className="flex space-x-4">
              {['twitter', 'github', 'discord', 'linkedin'].map((social) => (
                <motion.a
                  key={social}
                  href={`https://${social}.com/corenetai`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-neon-blue transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="sr-only">{social}</span>
                  <div className="w-6 h-6 flex items-center justify-center">
                    {social}
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-neon-blue text-sm font-semibold uppercase mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-gray-400 hover:text-white text-sm transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              &copy; {currentYear} CoreNet Labs. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <span className="text-xs text-gray-600">
                Powered by advanced AI infrastructure
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 