'use client';

import { useEffect, useState, useRef } from 'react';
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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const gpuContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Simulate API call to get utilities
    setTimeout(() => {
      setUtilities(getUtilitiesWithStatus());
    }, 1000);
    
    // Show network animation after a delay
    const timer = setTimeout(() => {
      setShowNetworkAnimation(true);
    }, 1500);
    
    // Track mouse position for 3D effect
    const handleMouseMove = (e: MouseEvent) => {
      if (gpuContainerRef.current) {
        const rect = gpuContainerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePosition({ x, y });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
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
            className="absolute inset-0 flex items-center justify-center opacity-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ duration: 2 }}
          >
            <div className="relative w-full max-w-5xl h-full max-h-[600px]">
              {/* 3D GPU chip circuit board pattern */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
                <g className="opacity-50">
                  {/* Circuit paths */}
                  <path 
                    d="M100,100 L700,100 L700,500 L100,500 Z" 
                    fill="none" 
                    stroke="rgba(0, 246, 255, 0.3)" 
                    strokeWidth="2"
                    className="circuit-animation"
                  />
                  <path 
                    d="M150,150 L650,150 L650,450 L150,450 Z" 
                    fill="none" 
                    stroke="rgba(112, 40, 228, 0.3)" 
                    strokeWidth="2"
                    className="circuit-animation"
                    style={{ animationDelay: '1s' }}
                  />
                  
                  {/* Horizontal circuit lines */}
                  {[200, 250, 300, 350, 400].map((y, i) => (
                    <path 
                      key={`h-${i}`}
                      d={`M100,${y} L700,${y}`}
                      fill="none" 
                      stroke="rgba(0, 246, 255, 0.5)" 
                      strokeWidth="1.5"
                      className="gpu-data-flow"
                      style={{ animationDelay: `${i * 0.3}s` }}
                    />
                  ))}
                  
                  {/* Vertical circuit lines */}
                  {[200, 300, 400, 500, 600].map((x, i) => (
                    <path 
                      key={`v-${i}`}
                      d={`M${x},100 L${x},500`}
                      fill="none" 
                      stroke="rgba(0, 246, 255, 0.5)" 
                      strokeWidth="1.5"
                      className="gpu-data-flow"
                      style={{ animationDelay: `${i * 0.5}s` }}
                    />
                  ))}
                  
                  {/* Circuit nodes */}
                  {[
                    [200, 200], [200, 400], [400, 200], [400, 400], [600, 200], [600, 400],
                    [300, 300], [500, 300], [300, 500], [500, 500]
                  ].map(([x, y], i) => (
                    <circle 
                      key={`node-${i}`}
                      cx={x} 
                      cy={y} 
                      r="5" 
                      fill="rgba(0, 246, 255, 0.8)"
                      className="glow-pulse"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </g>
              </svg>
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
              
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tighter">
                <span className="block">The Future of</span>
                <span className="gradient-text">AI + Web3 Infrastructure</span>
              </h1>
              
              <p className="text-gray-300 text-lg mb-8 max-w-lg leading-relaxed">
                CoreNet.AI provides cutting-edge decentralized AI infrastructure with neural network partitioning, 
                model synchronization, and edge-cached inference for next-generation applications.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-6">
                <Button href="/utilities" size="lg">
                  Explore Utilities
                </Button>
                <Button href="/docs" variant="outline" size="lg">
                  View Documentation
                </Button>
              </div>
              
              {/* Terminal moved here - under documentation button */}
              <motion.div 
                className="w-full max-w-[500px] mt-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <Card className="p-3 bg-black/90 border border-neon-blue/40 rounded-xl overflow-hidden">
                  {/* Terminal Header */}
                  <div className="h-5 flex items-center justify-between mb-1.5 border-b border-neon-blue/20 pb-1">
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-neon-blue mr-2 pulse"></div>
                      <div className="text-[10px] font-mono text-neon-blue/80 tracking-wider uppercase">Neural-Core-Terminal</div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <motion.div 
                        className="h-1.5 w-1.5 rounded-full bg-neon-green/80"
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      ></motion.div>
                      <motion.div 
                        className="h-1.5 w-1.5 rounded-full bg-neon-purple/80"
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                      ></motion.div>
                      <motion.div 
                        className="h-1.5 w-1.5 rounded-full bg-neon-pink/80"
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                      ></motion.div>
                      <div className="text-[8px] font-mono text-gray-400 ml-1 tracking-wider">ID:1337-GPU</div>
                    </div>
                  </div>
                  
                  {/* Main Terminal Content */}
                  <div className="font-mono text-xs overflow-hidden h-[100px] relative">
                    {/* Terminal background effect */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent pointer-events-none z-10"></div>
                    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
                      <motion.div 
                        className="w-full h-0.5 bg-neon-blue/10"
                        animate={{ top: ['0%', '100%'] }}
                        transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                        style={{ position: 'absolute', left: 0 }}
                      ></motion.div>
                    </div>
                    
                    {/* Scrolling terminal content */}
                    <motion.div
                      className="h-full"
                      initial={{ y: 0 }}
                      animate={{ y: -160 }}
                      transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                    >
                      <div className="pl-1 pt-1 space-y-1">
                        {Array.from({ length: 24 }).map((_, i) => (
                          <div key={i} className="flex items-start text-[10px] leading-tight">
                            {/* Command prompt */}
                            <span className="text-neon-blue/90 mr-1.5 font-bold min-w-[14px]">
                              {i % 4 === 0 ? '>>' : ''}
                            </span>
                            
                            {/* Log type indicator */}
                            <span className={`inline-block mr-1.5 min-w-[60px] ${
                              i % 5 === 0 ? 'text-neon-green/90' :
                              i % 5 === 1 ? 'text-neon-purple/90' :
                              i % 5 === 2 ? 'text-neon-blue/90' :
                              i % 5 === 3 ? 'text-neon-pink/90' :
                              'text-gray-400'
                            }`}>
                              {i % 5 === 0 ? '[CORE]' :
                               i % 5 === 1 ? '[MODEL]' :
                               i % 5 === 2 ? '[MEMORY]' :
                               i % 5 === 3 ? '[COMPUTE]' :
                               '[QUANTUM]'}
                            </span>
                            
                            {/* Main message content */}
                            <div className="text-gray-300 flex-1">
                              <span className="opacity-90">
                                {i % 5 === 0 ? `Loading neural tensor block ${(i * 17) % 64}` : 
                                 i % 5 === 1 ? `Processing weights at layer ${(i * 7) % 12}` : 
                                 i % 5 === 2 ? `Memory allocation in sector ${(i * 3) % 16}` :
                                 i % 5 === 3 ? `Units ${(i * 2) % 8}-${(i * 2 + 3) % 8} active` :
                                `Entanglement probability: ${(Math.floor(i * 17.3) % 100)}%`}
                              </span>
                              
                              {/* Status indicators */}
                              {i % 6 === 0 && (
                                <span className="ml-1.5 text-neon-green inline-flex items-center">
                                  <span className="w-1 h-1 rounded-full bg-neon-green mr-1"></span>
                                  <span className="text-[9px]">OK</span>
                                </span>
                              )}
                              
                              {/* Timestamp */}
                              <span className="ml-1.5 text-[8px] text-gray-500 opacity-70">
                                {`${(i * 13) % 24}:${(i * 17) % 60 < 10 ? '0' : ''}${(i * 17) % 60}`}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                    
                    {/* Active typing line at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 h-5 bg-black/70 backdrop-blur flex items-center px-1">
                      <span className="text-neon-blue/90 mr-1.5 font-bold">{'>'}{`>`}</span>
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                        className="h-3 w-0.5 bg-neon-green/90"
                      />
                    </div>
                  </div>
                </Card>
              </motion.div>
              
              {/* System Status */}
              <div className="flex items-center justify-center lg:justify-start">
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
            
            {/* 3D GPU Element */}
            <div 
              ref={gpuContainerRef} 
              className="lg:w-1/2 relative preserve-3d" 
              style={{ 
                height: '400px'
              }}
            >
              <motion.div
                className="absolute inset-0 opacity-100"
                style={{
                  transform: `rotateY(${mousePosition.x * 12}deg) rotateX(${-mousePosition.y * 12}deg)`,
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.15s ease-out'
                }}
                animate={{
                  scale: [0.98, 1, 0.98],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                {/* Main GPU Wireframe Image */}
                <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
                  {/* Base GPU Image with Glow */}
                  <motion.div 
                    className="absolute inset-0 rounded-xl overflow-hidden"
                    style={{
                      transform: 'translateZ(0px)',
                      boxShadow: '0 0 50px rgba(0, 246, 255, 0.15)'
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  >
                    {/* Dark gradient overlay for better contrast */}
                    <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/60 z-10"></div>
                    
                    {/* The GPU image */}
                    <div className="relative w-full h-full">
                      <Image
                        src="/images/gpu/THEOG.jpg"
                        alt="Advanced GPU Wireframe"
                        fill
                        style={{ 
                          objectFit: 'contain',
                          objectPosition: 'center'
                        }}
                        className="z-0"
                        priority
                      />
                    </div>
                    
                    {/* Subtle holographic scan effect */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-blue/5 to-transparent z-20 pointer-events-none"
                      animate={{ 
                        top: ['-100%', '100%'],
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 4,
                        ease: 'linear',
                        repeatDelay: 2
                      }}
                    />
                    
                    {/* Edge glow effects */}
                    <motion.div
                      className="absolute inset-0 z-20 pointer-events-none"
                      animate={{
                        boxShadow: [
                          'inset 0 0 15px rgba(0, 246, 255, 0.1)',
                          'inset 0 0 30px rgba(0, 246, 255, 0.2)',
                          'inset 0 0 15px rgba(0, 246, 255, 0.1)'
                        ]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }}
                    />
                    
                    {/* Highlight areas - subtle */}
                    {[
                      { x: '30%', y: '35%', size: '60px', delay: 0, color: 'neon-blue' },
                      { x: '70%', y: '35%', size: '60px', delay: 2, color: 'neon-purple' },
                      { x: '50%', y: '65%', size: '80px', delay: 4, color: 'neon-green' }
                    ].map((point, i) => (
                      <motion.div
                        key={i}
                        className={`absolute rounded-full border border-${point.color}/30 z-20 pointer-events-none`}
                        style={{
                          left: point.x,
                          top: point.y,
                          width: point.size,
                          height: point.size,
                          transform: 'translate(-50%, -50%)'
                        }}
                        animate={{
                          opacity: [0, 0.4, 0],
                          scale: [0.8, 1.1, 0.8]
                        }}
                        transition={{
                          duration: 6,
                          delay: point.delay,
                          repeat: Infinity,
                          ease: 'easeInOut'
                        }}
                      >
                        <div className={`absolute inset-0 rounded-full bg-${point.color}/5`} />
                      </motion.div>
                    ))}
                    
                    {/* Clean minimal edge accent */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-blue/50 to-transparent z-30"></div>
                    <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-neon-purple/50 to-transparent z-30"></div>
                  </motion.div>

                  {/* Minimal UI Overlay */}
                  <div className="absolute inset-0 z-40 pointer-events-none">
                    {/* Status indicator - top right */}
                    <motion.div
                      className="absolute top-4 right-4 flex items-center bg-black/30 backdrop-blur-sm border border-neon-blue/20 rounded-full px-3 py-1"
                      animate={{
                        opacity: [0.7, 0.9, 0.7]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }}
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-neon-blue/80 mr-2 pulse"></div>
                      <div className="text-neon-blue/90 text-[10px] font-mono">NEURAL ENGINE</div>
                    </motion.div>
                    
                    {/* Performance indicator - bottom left */}
                    <motion.div
                      className="absolute bottom-4 left-4 flex items-center bg-black/30 backdrop-blur-sm border border-neon-purple/20 rounded-full px-3 py-1"
                      animate={{
                        opacity: [0.7, 0.9, 0.7]
                      }}
                      transition={{
                        duration: 4,
                        delay: 2,
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }}
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-neon-purple/80 mr-2 pulse"></div>
                      <div className="text-neon-purple/90 text-[10px] font-mono">WEB3 READY</div>
                    </motion.div>
                  </div>
                  
                  {/* Floating Data Connections */}
                  <div className="absolute inset-0" style={{ transform: 'translateZ(40px)' }}>
                    {/* Connection Lines */}
                    <svg className="absolute inset-0 w-full h-full opacity-20">
                      <defs>
                        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="rgba(0, 246, 255, 0.8)" />
                          <stop offset="100%" stopColor="rgba(112, 40, 228, 0.8)" />
                        </linearGradient>
                      </defs>
                      <motion.path 
                        d="M 20% 60% L 40% 30% L 80% 40% L 60% 70% Z" 
                        stroke="url(#lineGradient)"
                        strokeWidth="0.5"
                        fill="none"
                        strokeDasharray="4 4"
                        animate={{
                          strokeDashoffset: [0, -16]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                    </svg>
                    
                    {/* Subtle Scanning Lines */}
                    <div className="absolute inset-x-0 top-0 bottom-0 overflow-hidden pointer-events-none opacity-20">
                      <motion.div 
                        className="absolute left-0 right-0 h-[1px] bg-neon-blue/20"
                        animate={{ 
                          top: ['0%', '100%'],
                        }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 10,
                          ease: 'linear',
                        }}
                      />
                    </div>
                  </div>
                  
                  {/* Accent Corner Elements */}
                  {[
                    { top: 0, left: 0 },
                    { top: 0, right: 0 },
                    { bottom: 0, left: 0 },
                    { bottom: 0, right: 0 }
                  ].map((pos, i) => (
                    <div 
                      key={i}
                      className="absolute w-6 h-6 pointer-events-none z-50"
                      style={{
                        top: pos.top === 0 ? '8px' : 'auto',
                        bottom: pos.bottom === 0 ? '8px' : 'auto',
                        left: pos.left === 0 ? '8px' : 'auto',
                        right: pos.right === 0 ? '8px' : 'auto',
                      }}
                    >
                      <motion.svg 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{ 
                          duration: 4,
                          delay: i * 0.5,
                          repeat: Infinity,
                          ease: 'easeInOut'
                        }}
                      >
                        <path 
                          d={
                            pos.top === 0 && pos.left === 0 ? "M1,1 L8,1 M1,1 L1,8" : 
                            pos.top === 0 && pos.right === 0 ? "M23,1 L16,1 M23,1 L23,8" : 
                            pos.bottom === 0 && pos.left === 0 ? "M1,23 L8,23 M1,23 L1,16" : 
                            "M23,23 L16,23 M23,23 L23,16"
                          } 
                          stroke="rgba(0, 246, 255, 0.8)" 
                          strokeWidth="1" 
                        />
                      </motion.svg>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
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
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              Powered by Advanced <span className="gradient-text">GPU Architecture</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
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
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              System <span className="gradient-text">Health Metrics</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
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
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6 tracking-tight">
              Ready to Build on <span className="gradient-text">CoreNet.AI</span>?
            </h2>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
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
