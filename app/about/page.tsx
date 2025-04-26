'use client';

import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

export default function AboutPage() {
  const teamMembers = [
    {
      name: 'Dr. Ada Lovelace',
      role: 'Founder & CEO',
      image: '/team/placeholder.png',
      bio: 'Pioneering researcher in neural network architecture with over 15 years of experience in AI systems.',
    },
    {
      name: 'Dr. Alan Turing',
      role: 'Chief Technology Officer',
      image: '/team/placeholder.png',
      bio: 'Former lead architect at DeepMind with expertise in distributed systems and cryptography.',
    },
    {
      name: 'Grace Hopper',
      role: 'VP of Engineering',
      image: '/team/placeholder.png',
      bio: 'Blockchain specialist with background in peer-to-peer networks and decentralized protocols.',
    },
    {
      name: 'John von Neumann',
      role: 'Chief Research Officer',
      image: '/team/placeholder.png',
      bio: 'PhD in Computational Neuroscience with focus on neural partitioning systems.',
    },
  ];

  const milestones = [
    {
      year: '2021',
      title: 'CoreNet Research Founded',
      description: 'Initial research team assembled to explore decentralized AI infrastructure.',
    },
    {
      year: '2022',
      title: 'NeuroSplit Whitepaper',
      description: 'Publication of groundbreaking research on neural network partitioning across distributed nodes.',
    },
    {
      year: '2022',
      title: 'Seed Funding',
      description: '$12M raised to develop prototype of the CoreNet.AI platform.',
    },
    {
      year: '2023',
      title: 'Alpha Launch',
      description: 'First private testnet with core utilities deployed to select partners.',
    },
    {
      year: '2023',
      title: 'MCP Token Introduction',
      description: 'Launch of the Master Control Protocol token to power the network economy.',
    },
    {
      year: '2024',
      title: 'Public Beta',
      description: 'Opening of the platform to public developers and node operators.',
    },
    {
      year: '2024',
      title: 'Full Platform Launch',
      description: 'Complete suite of utilities made available with production-ready stability.',
    },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge 
            status="online" 
            label="Our Mission" 
            className="mb-4" 
          />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="gradient-text">CoreNet.AI</span>
          </h1>
          <p className="text-gray-300 max-w-3xl mx-auto text-lg">
            Building the future of decentralized AI infrastructure to empower a new generation of
            intelligent applications that are resilient, private, and censorship-resistant.
          </p>
        </motion.div>

        {/* Vision Section */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
              <p className="text-gray-300 mb-4">
                CoreNet.AI was founded on the belief that artificial intelligence should not be controlled by a handful of centralized entities. We envision a world where AI infrastructure is decentralized, democratized, and accessible to everyone.
              </p>
              <p className="text-gray-300 mb-4">
                Our platform represents a paradigm shift in how AI systems are built and deployed. By partitioning neural networks across distributed nodes, we're creating an ecosystem that is more resilient, more efficient, and more equitable than traditional centralized approaches.
              </p>
              <p className="text-gray-300">
                We're committed to pushing the boundaries of what's possible with decentralized AI, creating technologies that empower developers, protect user privacy, and enable new applications that weren't possible before.
              </p>
            </div>
            <div className="relative">
              <Card className="p-8">
                <h3 className="text-xl font-bold mb-4 neon-text-blue">Core Principles</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="text-neon-blue mr-3 mt-1">●</div>
                    <div>
                      <p className="font-medium text-white">Decentralization</p>
                      <p className="text-gray-400 text-sm">No single point of failure or control</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="text-neon-blue mr-3 mt-1">●</div>
                    <div>
                      <p className="font-medium text-white">Privacy by Design</p>
                      <p className="text-gray-400 text-sm">User data protection built into the architecture</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="text-neon-blue mr-3 mt-1">●</div>
                    <div>
                      <p className="font-medium text-white">Open Innovation</p>
                      <p className="text-gray-400 text-sm">Collaborative development with the community</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="text-neon-blue mr-3 mt-1">●</div>
                    <div>
                      <p className="font-medium text-white">Equitable Access</p>
                      <p className="text-gray-400 text-sm">AI capabilities available to all developers</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="text-neon-blue mr-3 mt-1">●</div>
                    <div>
                      <p className="font-medium text-white">Sustainable Growth</p>
                      <p className="text-gray-400 text-sm">Balancing innovation with environmental responsibility</p>
                    </div>
                  </li>
                </ul>
              </Card>
              <div className="absolute -z-10 w-full h-full bg-neon-blue/30 blur-[100px] top-0 right-0"></div>
            </div>
          </div>
        </motion.div>

        {/* Milestones */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-3xl font-bold mb-10 text-center">Our Journey</h2>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-neon-blue/30"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div 
                  key={index}
                  className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8`}
                  custom={index}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="bg-neon-blue/10 border border-neon-blue/30 rounded-lg p-6">
                      <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                      <p className="text-gray-300">{milestone.description}</p>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-neon-blue/20 border-2 border-neon-blue flex items-center justify-center text-sm font-bold">
                      {milestone.year}
                    </div>
                  </div>
                  
                  <div className="md:w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold mb-10 text-center">Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Card className="p-6 h-full" hoverEffect>
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 border border-neon-blue/30 flex items-center justify-center">
                    <span className="text-2xl font-bold text-neon-blue">{member.name.charAt(0)}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-1">{member.name}</h3>
                  <p className="text-neon-blue text-sm text-center mb-4">{member.role}</p>
                  <p className="text-gray-400 text-sm text-center">{member.bio}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="p-8 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Join the CoreNet.AI Ecosystem</h2>
            <p className="text-gray-300 mb-6">
              Whether you're a developer, researcher, or enthusiast, there are many ways to get involved with CoreNet.AI and help shape the future of decentralized AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/docs">
                Read Documentation
              </Button>
              <Button href="/contact" variant="outline">
                Contact Us
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
} 