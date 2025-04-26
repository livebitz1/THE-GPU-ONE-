'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import ChatMessage from '@/components/ui/ChatMessage';
import LoadingBar from '@/components/ui/LoadingBar';
import { useStatus } from '@/context/StatusContext';
import { UserMessage, ShardMindResponse } from '@/types';

export default function AssistantPage() {
  const { systemStatus } = useStatus();
  const [messages, setMessages] = useState<UserMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStats, setProcessingStats] = useState<ShardMindResponse | null>(null);
  const [isConnecting, setIsConnecting] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial connection simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsConnecting(false);
      
      // Add initial greeting message
      const initialMessage: UserMessage = {
        id: uuidv4(),
        role: 'assistant',
        content: 'Hello! I am ShardMind, your decentralized AI assistant. I can help you with information about CoreNet.AI, its utilities, and answer general questions about AI and Web3 technology. How can I assist you today?',
        timestamp: new Date().toISOString(),
      };
      
      setMessages([initialMessage]);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle send message
  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isProcessing) return;
    
    // Add user message
    const userMessage: UserMessage = {
      id: uuidv4(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsProcessing(true);
    
    // Simulate processing delay
    const processingTime = Math.floor(Math.random() * 2000) + 1000;
    await new Promise(resolve => setTimeout(resolve, processingTime));
    
    // Generate AI response based on input
    const aiResponse = generateResponse(inputMessage);
    const responseLength = aiResponse.length;
    
    // Calculate simulated tokens and processing metrics
    const tokens = Math.floor(responseLength / 4);
    
    setProcessingStats({
      id: uuidv4(),
      response: aiResponse,
      tokens: tokens,
      processingTime: processingTime / 1000,
    });
    
    // Add AI response
    const assistantMessage: UserMessage = {
      id: uuidv4(),
      role: 'assistant',
      content: aiResponse,
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, assistantMessage]);
    setIsProcessing(false);
  };

  // Generate a simulated response based on user input
  const generateResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    // Check for CoreNet utilities
    if (lowerInput.includes('neurosplit') || lowerInput.includes('neural network')) {
      return "NeuroSplit is CoreNet.AI's neural network partitioning system. It allows for efficient distribution of large AI models across decentralized infrastructure. This technology enables running massive neural networks on distributed hardware, improving performance and reducing single points of failure.";
    }
    
    if (lowerInput.includes('cerebralsync') || lowerInput.includes('synchronization')) {
      return "CerebralSync handles model synchronization across the CoreNet infrastructure. It ensures all distributed neural network partitions remain coherent and maintain consistent parameters during training and inference operations. This is crucial for decentralized AI systems to operate as a unified intelligence.";
    }
    
    if (lowerInput.includes('shardmind') || (lowerInput.includes('assistant') && !lowerInput.includes('what'))) {
      return "I am ShardMind, a decentralized AI assistant powered by CoreNet's distributed intelligence architecture. Unlike traditional assistants that run on centralized servers, my processing is distributed across multiple nodes in the network, making me more resilient and capable of maintaining service even if some nodes go offline.";
    }
    
    if (lowerInput.includes('mcp') || lowerInput.includes('token') || lowerInput.includes('tracker')) {
      return "MCP (Master Control Protocol) is the utility token that powers the CoreNet ecosystem. The MCP Tracker utility provides real-time analytics on token performance, network validation rewards, and liquidity pools. It's an essential tool for participants in the network who want to monitor their assets and the overall network economy.";
    }
    
    if (lowerInput.includes('autotrainx') || lowerInput.includes('training')) {
      return "AutoTrainX is our automated AI model training and optimization utility. It streamlines the process of training neural networks on the CoreNet infrastructure, automatically finding optimal hyperparameters, and efficiently distributing compute resources for faster convergence and better results.";
    }
    
    if (lowerInput.includes('ghostcache') || lowerInput.includes('cache')) {
      return "GhostCache is an edge-cached inference system that allows AI models to run with minimal latency by positioning prediction capabilities close to the end user. It manages a distributed cache of model weights and frequent inference results to optimize performance and reduce bandwidth requirements.";
    }
    
    if (lowerInput.includes('shieldos') || lowerInput.includes('security')) {
      return "ShieldOS is our comprehensive AI security system that protects against adversarial attacks, model poisoning, and unauthorized access. It continuously monitors the network for suspicious activities and implements various defense mechanisms to ensure the integrity and safety of all AI operations.";
    }
    
    if (lowerInput.includes('gpuflow') || lowerInput.includes('gpu')) {
      return "GPUFlow is a decentralized marketplace for GPU computing resources. It allows owners of GPU hardware to monetize their idle compute capacity by contributing to the CoreNet network, while AI developers can access scalable computing power without massive upfront investments in hardware.";
    }
    
    if (lowerInput.includes('infraprobe') || lowerInput.includes('monitoring')) {
      return "InfraProbe provides comprehensive infrastructure monitoring and diagnostics for the CoreNet ecosystem. It tracks system health, network performance, and component status in real-time, helping to maintain optimal operation and quickly identify any issues that might affect service quality.";
    }
    
    if (lowerInput.includes('liquidmesh') || lowerInput.includes('liquidity')) {
      return "LiquidMesh is our decentralized liquidity protocol that ensures smooth operation of the economic layer of CoreNet.AI. It manages token liquidity pools, facilitates efficient resource allocation, and enables seamless exchanges between computational resources and tokens within the ecosystem.";
    }
    
    // General questions
    if (lowerInput.includes('what is corenet') || lowerInput.includes('about corenet')) {
      return "CoreNet.AI is a cutting-edge decentralized AI infrastructure platform that combines the power of artificial intelligence with Web3 technologies. It provides a suite of utilities for building, deploying, and scaling AI applications in a secure, distributed environment. The platform's decentralized nature ensures higher reliability, better privacy, and resistance to censorship compared to traditional centralized AI systems.";
    }
    
    if (lowerInput.includes('how does') && lowerInput.includes('work')) {
      return "CoreNet.AI works by distributing AI workloads across a network of nodes, each contributing computational resources to the ecosystem. Neural networks are partitioned using NeuroSplit technology, synchronized with CerebralSync, and can be trained with AutoTrainX. The system uses a token-based economy powered by MCP to incentivize resource providers and enable a decentralized governance model where stakeholders can vote on system upgrades and parameter changes.";
    }
    
    if (lowerInput.includes('web3') || lowerInput.includes('blockchain')) {
      return "CoreNet.AI integrates Web3 technologies to create a decentralized infrastructure for AI. This includes blockchain-based governance, token economics to incentivize network participants, and cryptographic security measures. By leveraging these Web3 principles, CoreNet.AI creates a more open, transparent, and resilient alternative to traditional centralized AI platforms, while enabling new economic models for AI resource sharing and utilization.";
    }
    
    // Default responses for other queries
    const defaultResponses = [
      "That's an interesting question about AI and decentralized systems. CoreNet.AI is designed to address challenges in this space by providing a robust infrastructure that combines the best of both worlds - advanced AI capabilities with the resilience and transparency of decentralized networks.",
      
      "As a ShardMind assistant, I'm part of CoreNet.AI's suite of utilities designed to showcase how AI can operate in a decentralized environment. My responses are distributed across multiple nodes in the network, making the system more resilient to failures and censorship.",
      
      "Within the CoreNet.AI ecosystem, various utilities work together to provide a comprehensive platform for AI development and deployment. Each utility specializes in different aspects of the AI lifecycle, from model training and optimization to inference and security.",
      
      "The future of AI lies in decentralized systems like CoreNet.AI, which can provide greater transparency, user control, and resistance to single points of failure. By combining neural network technology with blockchain principles, we're creating new possibilities for AI applications that respect user privacy and autonomy.",
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  // Handle key press for sending messages
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge 
            status="online" 
            label="Decentralized AI Assistant" 
            className="mb-4" 
          />
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">ShardMind</span> Assistant
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Interact with CoreNet.AI's decentralized assistant powered by distributed neural networks.
          </p>
        </motion.div>

        {/* Chat Interface */}
        <div className="max-w-4xl mx-auto">
          <Card className="p-4 md:p-6">
            {/* Chat Header */}
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-800">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2 animate-pulse"></div>
                <span className="text-sm text-gray-300">ShardMind Assistant</span>
              </div>
              <div className="flex items-center">
                <span className="text-xs text-gray-400 mr-2">Node Status:</span>
                <Badge 
                  status={systemStatus.components.shardmind?.status || 'operational'} 
                  size="sm" 
                />
              </div>
            </div>

            {/* Connecting State */}
            {isConnecting && (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-16 h-16 border-t-4 border-r-4 border-neon-blue rounded-full animate-spin mb-6"></div>
                <p className="text-gray-400 animate-pulse">Connecting to ShardMind network...</p>
                <div className="w-48 mt-4">
                  <LoadingBar isIndeterminate />
                </div>
              </div>
            )}

            {/* Chat Messages */}
            {!isConnecting && (
              <div className="h-[50vh] overflow-y-auto mb-4 p-2" role="log">
                {messages.map((message, index) => (
                  <ChatMessage 
                    key={message.id} 
                    message={message} 
                    isLatest={index === messages.length - 1 && message.role === 'assistant'} 
                  />
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}

            {/* Processing Stats */}
            {processingStats && !isProcessing && (
              <div className="mb-4 p-2 bg-background-secondary rounded text-xs text-gray-400 flex justify-between">
                <span>Tokens: {processingStats.tokens}</span>
                <span>Processing time: {processingStats.processingTime.toFixed(2)}s</span>
              </div>
            )}

            {/* Input Area */}
            {!isConnecting && (
              <div className="relative">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Type your message..."
                  className="w-full px-4 py-3 bg-background-secondary rounded-lg border border-gray-700 text-white resize-none focus:outline-none focus:border-neon-blue/60 focus:ring-1 focus:ring-neon-blue/50 min-h-[100px]"
                  disabled={isProcessing}
                />
                
                <div className="absolute bottom-4 right-4 flex items-center">
                  {isProcessing ? (
                    <div className="text-xs text-gray-400 animate-pulse mr-2">Processing...</div>
                  ) : (
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim()}
                    >
                      Send Message
                    </Button>
                  )}
                </div>
              </div>
            )}
          </Card>

          {/* Info Section */}
          <motion.div 
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Card className="p-4">
              <h3 className="text-lg font-semibold mb-2">About ShardMind Assistant</h3>
              <p className="text-gray-400 text-sm mb-4">
                ShardMind is CoreNet.AI's decentralized assistant, powered by distributed neural networks running across multiple nodes. 
                Unlike traditional AI assistants, ShardMind's processing is split across the network, providing increased resilience, 
                privacy, and censorship resistance.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-background-secondary rounded-lg">
                  <div className="text-neon-blue text-lg mb-1">Decentralized</div>
                  <div className="text-xs text-gray-400">Running on multiple nodes</div>
                </div>
                <div className="p-3 bg-background-secondary rounded-lg">
                  <div className="text-neon-blue text-lg mb-1">Private</div>
                  <div className="text-xs text-gray-400">No central data collection</div>
                </div>
                <div className="p-3 bg-background-secondary rounded-lg">
                  <div className="text-neon-blue text-lg mb-1">Resilient</div>
                  <div className="text-xs text-gray-400">Fault-tolerant architecture</div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 