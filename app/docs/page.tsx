'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { useStatus } from '@/context/StatusContext';
import { utilities } from '@/lib/data/mockData';

export default function DocsPage() {
  const { systemStatus } = useStatus();
  const [searchQuery, setSearchQuery] = useState('');

  // Documentation sections
  const docSections = [
    {
      title: 'Getting Started',
      icon: '🚀',
      links: [
        { title: 'Introduction to CoreNet.AI', href: '/docs/introduction' },
        { title: 'Platform Architecture', href: '/docs/architecture' },
        { title: 'Setting Up Your Environment', href: '/docs/setup' },
        { title: 'Authentication & Security', href: '/docs/security' },
        { title: 'Quick Start Guide', href: '/docs/quickstart' },
      ],
    },
    {
      title: 'Core Concepts',
      icon: '💡',
      links: [
        { title: 'Neural Network Partitioning', href: '/docs/neural-partitioning' },
        { title: 'Decentralized Infrastructure', href: '/docs/decentralized' },
        { title: 'Node-to-Node Communication', href: '/docs/node-communication' },
        { title: 'Token Economics', href: '/docs/tokens' },
        { title: 'Fault Tolerance & Recovery', href: '/docs/fault-tolerance' },
      ],
    },
    {
      title: 'Utilities',
      icon: '⚙️',
      links: utilities.map(util => ({ 
        title: util.name, 
        href: `/docs/${util.id}` 
      })),
    },
    {
      title: 'API Reference',
      icon: '📡',
      links: [
        { title: 'RESTful API', href: '/docs/api/rest' },
        { title: 'GraphQL API', href: '/docs/api/graphql' },
        { title: 'WebSocket API', href: '/docs/api/websocket' },
        { title: 'SDK & Libraries', href: '/docs/api/sdk' },
        { title: 'Rate Limits & Quotas', href: '/docs/api/limits' },
      ],
    },
    {
      title: 'Guides & Tutorials',
      icon: '📚',
      links: [
        { title: 'Deploying Your First Model', href: '/docs/tutorials/first-model' },
        { title: 'Scaling Distributed Training', href: '/docs/tutorials/scaling' },
        { title: 'Optimizing Performance', href: '/docs/tutorials/performance' },
        { title: 'Monitoring & Debugging', href: '/docs/tutorials/debugging' },
        { title: 'Advanced Partitioning', href: '/docs/tutorials/advanced-partitioning' },
      ],
    },
    {
      title: 'Resources',
      icon: '🔗',
      links: [
        { title: 'Whitepapers', href: '/docs/resources/whitepapers' },
        { title: 'Research Publications', href: '/docs/resources/research' },
        { title: 'Community Contributions', href: '/docs/resources/community' },
        { title: 'Roadmap', href: '/docs/resources/roadmap' },
        { title: 'Governance', href: '/docs/resources/governance' },
      ],
    },
  ];

  // Filter docs based on search query
  const filteredSections = searchQuery.trim() === '' 
    ? docSections 
    : docSections.map(section => ({
        ...section,
        links: section.links.filter(link => 
          link.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(section => section.links.length > 0);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge 
            status="online" 
            label="Documentation" 
            className="mb-4" 
          />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            CoreNet.AI <span className="gradient-text">Docs</span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Comprehensive documentation for the CoreNet.AI platform and all its utilities.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div 
          className="mb-10 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-3 px-5 rounded-full bg-background-secondary border border-neon-blue/30 text-white focus:outline-none focus:border-neon-blue/70 focus:ring-2 focus:ring-neon-blue/20"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              {/* Search icon */}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Documentation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            >
              <Card className="p-6 h-full">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <span className="mr-2 text-2xl" role="img" aria-label={section.title}>
                    {section.icon}
                  </span>
                  {section.title}
                </h2>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link 
                        href={link.href}
                        className="text-gray-300 hover:text-neon-blue transition-colors"
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredSections.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 mb-4">No documentation found matching '{searchQuery}'</p>
            <button 
              onClick={() => setSearchQuery('')}
              className="px-4 py-2 bg-background-secondary text-white rounded-md hover:bg-black/40 transition-colors"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Platform Status */}
        <motion.div 
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold mb-2">Platform Status</h3>
                <p className="text-gray-400 max-w-xl">
                  The CoreNet.AI documentation is updated in real-time to reflect the current status 
                  and capabilities of the platform.
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 ${
                  systemStatus.status === 'online' ? 'bg-green-500 animate-pulse' : 
                  systemStatus.status === 'degraded' ? 'bg-yellow-500 animate-pulse' : 'bg-red-500 animate-pulse'
                }`} />
                <span className="text-sm">
                  {systemStatus.status === 'online' ? 'All Documentation Systems Online' : 
                   systemStatus.status === 'degraded' ? 'Some Documentation May Be Affected' : 'Documentation System Maintenance'}
                </span>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
} 