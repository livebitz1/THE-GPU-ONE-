'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import TerminalOutput from '@/components/ui/TerminalOutput';
import Badge from '@/components/ui/Badge';
import { useStatus } from '@/context/StatusContext';
import { getUtilitiesWithStatus } from '@/lib/data/mockData';
import type { Utility } from '@/types';

export default function Home() {
  const { systemStatus, systemHealth } = useStatus();
  const [utilities, setUtilities] = useState<Utility[]>([]);
  const [showNetworkAnimation, setShowNetworkAnimation] = useState(false);
  
  useEffect(() => {
    // Simulate API call to get utilities
    setTimeout(() => {
      setUtilities(getUtilitiesWithStatus());
    }, 1000);
    
    // Show network animation after a delay
    const timer = setTimeout(() => {
      setShowNetworkAnimation(true);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const fadeIn = {
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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background to-background-secondary"></div>
          
          {/* Animated grid */}
          <div className="absolute inset-0 opacity-30 bg-[linear-gradient(to_right,#24243e15_1px,transparent_1px),linear-gradient(to_bottom,#24243e15_1px,transparent_1px)] bg-[size:40px_40px]"></div>
          
          {/* GPU Image with glow effect as background */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center opacity-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ duration: 2 }}
          >
            <div className="relative w-full max-w-4xl h-full max-h-[500px]">
          
            </div>
          </motion.div>
          
          {/* Glowing orbs */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-neon-purple/20 filter blur-xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full bg-neon-blue/20 filter blur-xl"></div>
          
          {/* Network Lines Animation */}
          {showNetworkAnimation && (
            <div className="absolute inset-0 opacity-30">
              {Array.from({ length: 6 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 h-px"
                  style={{
                    top: `${20 + i * 12}%`,
                    left: 0,
                    right: 0,
                  }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 0.5 }}
                  transition={{
                    duration: 2,
                    delay: i * 0.2,
                    ease: 'easeInOut',
                    repeat: Infinity,
                    repeatType: 'reverse',
                    repeatDelay: 5,
                  }}
                />
              ))}
              
              {Array.from({ length: 6 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute bg-gradient-to-b from-neon-blue/20 to-neon-purple/20 w-px"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: 0,
                    bottom: 0,
                  }}
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ scaleY: 1, opacity: 0.5 }}
                  transition={{
                    duration: 2,
                    delay: i * 0.2 + 1,
                    ease: 'easeInOut',
                    repeat: Infinity,
                    repeatType: 'reverse',
                    repeatDelay: 4,
                  }}
                />
              ))}
            </div>
          )}
        </div>
        
        <div className="container mx-auto px-4 z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Hero Content */}
            <motion.div 
              className="lg:w-1/2 text-center lg:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge 
                status="online" 
                label="Decentralized AI Infrastructure" 
                className="mb-6" 
              />
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="block">The Future of</span>
                <span className="gradient-text">AI + Web3 Infrastructure</span>
              </h1>
              
              <p className="text-gray-300 text-lg mb-8 max-w-lg">
                CoreNet.AI provides cutting-edge decentralized AI infrastructure with neural network partitioning, 
                model synchronization, and edge-cached inference for next-generation applications.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button href="/utilities" size="lg">
                  Explore Utilities
                </Button>
                <Button href="/docs" variant="outline" size="lg">
                  View Documentation
                </Button>
              </div>
              
              {/* System Status */}
              <div className="mt-8 flex items-center justify-center lg:justify-start">
                <div className={`w-2 h-2 rounded-full mr-2 ${
                  systemStatus.status === 'online' ? 'bg-green-500 animate-pulse' : 
                  systemStatus.status === 'degraded' ? 'bg-yellow-500 animate-pulse' : 'bg-red-500 animate-pulse'
                }`} />
                <span className="text-sm text-gray-400">
                  {systemStatus.status === 'online' ? 'All Systems Operational' : 
                   systemStatus.status === 'degraded' ? 'Performance Degraded' : 'System Alert'}
                </span>
              </div>
            </motion.div>
            
            {/* Terminal Card */}
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="p-4 bg-black/50 border border-neon-blue/30">
                <div className="flex items-center justify-between mb-3 px-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  </div>
                  <div className="text-xs text-gray-400">core-terminal-1.4.2</div>
                </div>
                
                <div className="h-64 overflow-auto">
                  <TerminalOutput
                    lines={[
                      '> initializing CoreNet.AI platform',
                      'Loading core modules...',
                      'Establishing secure connections...',
                      'Verifying node integrity...',
                      'Synchronizing with decentralized network...',
                      'Loading neural network partitions...',
                      'Initializing GPU acceleration...',
                      'Setting up encrypted channels...',
                      'AI infrastructure online. Welcome to CoreNet.AI',
                      '> status --components',
                      'NeuroSplit: Operational',
                      'CerebralSync: Operational',
                      'ShardMind: Operational',
                      'GPUFlow: Operational',
                      'AutoTrainX: Operational',
                      'All systems ready.',
                      '> _'
                    ]}
                  />
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
        
        {/* Scroll Down Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-gray-400"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-sm mb-2">Scroll Down</span>
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 0V20M8 20L1 13M8 20L15 13" stroke="currentColor" strokeWidth="2" />
          </svg>
        </motion.div>
      </section>
      
      {/* Utilities Section */}
    
      
      {/* GPU Showcase Section */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-b from-background to-background-secondary">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/3 left-1/3 w-64 h-64 rounded-full bg-neon-blue/10 filter blur-[80px]"></div>
          <div className="absolute bottom-1/3 right-1/3 w-80 h-80 rounded-full bg-neon-purple/10 filter blur-[100px]"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Badge status="online" label="High Performance" className="mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powered by Advanced <span className="gradient-text">GPU Architecture</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              CoreNet.AI leverages cutting-edge GPU technology to enable lightning-fast 
              neural network processing and real-time AI inference at scale.
            </p>
          </motion.div>
          
          {/* GPU Showcase Carousel */}
          <div className="relative mt-20">
            <div className="flex flex-col lg:flex-row items-center">
              {/* Left content */}
              <motion.div
                className="lg:w-1/2 mb-10 lg:mb-0"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <Card className="p-8 backdrop-blur-md bg-black/30">
                  <h3 className="text-2xl font-bold mb-4 gradient-text">Neural Processing Hardware</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="text-neon-blue mr-3 mt-1">●</div>
                      <div>
                        <p className="font-medium text-white">Multi-core Architecture</p>
                        <p className="text-gray-400 text-sm">Parallel processing capabilities for distributed neural networks</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="text-neon-blue mr-3 mt-1">●</div>
                      <div>
                        <p className="font-medium text-white">Quantum-Ready Interfaces</p>
                        <p className="text-gray-400 text-sm">Hardware designed to bridge classical and quantum computing paradigms</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="text-neon-blue mr-3 mt-1">●</div>
                      <div>
                        <p className="font-medium text-white">Dedicated Neural Cores</p>
                        <p className="text-gray-400 text-sm">Specialized processing units optimized for AI workloads</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="text-neon-blue mr-3 mt-1">●</div>
                      <div>
                        <p className="font-medium text-white">Advanced Cooling System</p>
                        <p className="text-gray-400 text-sm">Thermal design for sustained high-performance computing</p>
                      </div>
                    </li>
                  </ul>
                  <div className="mt-6">
                    <Button href="/docs/hardware" variant="secondary">
                      Hardware Specifications
                    </Button>
                  </div>
                </Card>
              </motion.div>
              
              {/* Right GPU Images with 3D effect */}
              <motion.div
                className="lg:w-1/2 relative"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <div className="relative h-[400px] w-full">
                  {/* Main GPU image */}
                  <motion.div 
                    className="absolute inset-0 z-20"
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity, 
                      repeatType: 'reverse', 
                      ease: 'easeInOut' 
                    }}
                  >
                    <Image
                      src="/images/gpu/nvidia-gigabyte-rtx-2070-graphics-video-card-3d-model-obj-3ds-fbx-c4d-orbx (1).jpg"
                      alt="High Performance GPU"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{ objectFit: 'contain' }}
                      priority
                    />
                  </motion.div>
                  
                  {/* Wireframe GPU overlay with different animation timing */}
                  <motion.div 
                    className="absolute inset-0 z-10 opacity-30"
                    initial={{ y: 0 }}
                    animate={{ y: 10 }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      repeatType: 'reverse', 
                      ease: 'easeInOut',
                      delay: 0.5
                    }}
                  >
                  
                  </motion.div>
                  
                  {/* GPU detail with yet another animation timing */}
                  <motion.div 
                    className="absolute inset-0 z-30 opacity-0"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: [0, 0.4, 0] }}
                    transition={{ 
                      duration: 5, 
                      repeat: Infinity,
                      times: [0, 0.5, 1],
                      ease: 'easeInOut' 
                    }}
                  >
                  
                  </motion.div>
                  
                  {/* Glowing effect behind GPU */}
                  <div className="absolute inset-0 -z-10 bg-neon-blue/5 w-full h-full rounded-full filter blur-[80px]"></div>
                </div>
              </motion.div>
            </div>
            
            {/* GPU Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
              {[
                { label: 'Neural Cores', value: '16,384', icon: '🧠' },
                { label: 'Memory Bandwidth', value: '2.4 TB/s', icon: '⚡' },
                { label: 'Model Capacity', value: '1.2T params', icon: '📊' },
                { label: 'Inference Speed', value: '0.5ms', icon: '⏱️' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  custom={index}
                  variants={fadeIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <Card className="p-4 bg-black/20">
                    <div className="text-2xl mb-2">{stat.icon}</div>
                    <div className="text-2xl font-bold text-neon-blue">{stat.value}</div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* System Health Section */}
      <section className="py-20 bg-background-secondary relative">
        <div className="absolute inset-0 opacity-30 bg-[linear-gradient(to_right,#24243e15_1px,transparent_1px),linear-gradient(to_bottom,#24243e15_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Badge status="online" label="Realtime Monitoring" className="mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              System <span className="gradient-text">Health Metrics</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Monitor the performance and health of the CoreNet.AI infrastructure in real-time.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(systemHealth).map(([key, value], index) => (
              <motion.div
                key={key}
                custom={index}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Card className="p-6">
                  <div className="text-gray-400 text-sm mb-2 capitalize">
                    {key} Usage
                  </div>
                  <div className="text-2xl font-semibold mb-4 flex items-baseline">
                    <span className={value > 75 ? 'text-red-400' : value > 50 ? 'text-yellow-400' : 'text-green-400'}>
                      {Math.round(value)}%
                    </span>
                    <span className="text-xs text-gray-500 ml-2">
                      {value > 75 ? 'High' : value > 50 ? 'Moderate' : 'Normal'}
                    </span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${
                        value > 75 ? 'bg-red-500' : value > 50 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${value}%` }}
                    ></div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button href="/status" variant="secondary">
              View Detailed Status
            </Button>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-48 h-48 rounded-full bg-neon-purple/30 filter blur-xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-neon-blue/30 filter blur-xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Badge status="online" label="Get Started Today" className="mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Build on <span className="gradient-text">CoreNet.AI</span>?
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Join the next generation of AI developers building on decentralized infrastructure.
              Get access to cutting-edge tools, documentation, and support.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/docs" size="lg">
                Read Documentation
              </Button>
              <Button href="/contact" variant="outline" size="lg">
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
