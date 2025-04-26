'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import TerminalOutput from '@/components/ui/TerminalOutput';
import LoadingBar from '@/components/ui/LoadingBar';
import { useStatus } from '@/context/StatusContext';
import { generateRandomMetrics, generateRandomLogs } from '@/lib/data/mockData';
import type { Metric, LogEntry } from '@/types';

export default function NeuroSplitPage() {
  const { systemStatus } = useStatus();
  const componentStatus = systemStatus.components.neurosplit || { 
    status: 'operational', 
    latency: 15, 
    load: 65 
  };
  
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isInitializing, setIsInitializing] = useState(true);
  const [networkNodes, setNetworkNodes] = useState<number>(0);
  const [activeModels, setActiveModels] = useState<number>(0);
  const [runningJobs, setRunningJobs] = useState<number>(0);
  const [partitionProgress, setPartitionProgress] = useState<number>(0);
  const [isPartitioning, setIsPartitioning] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);

  // Initial load simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setMetrics(generateRandomMetrics().slice(0, 6));
      setLogs(generateRandomLogs(15));
      setNetworkNodes(Math.floor(Math.random() * 5000) + 10000);
      setActiveModels(Math.floor(Math.random() * 100) + 200);
      setRunningJobs(Math.floor(Math.random() * 50) + 30);
      setIsInitializing(false);
    }, 2500);
    
    return () => clearTimeout(timer);
  }, []);

  // Handle partition button
  const handlePartition = () => {
    if (isPartitioning) return;
    
    setIsPartitioning(true);
    setPartitionProgress(0);
    
    // Simulated progress updates
    const interval = setInterval(() => {
      setPartitionProgress(prev => {
        const nextProgress = prev + Math.random() * 5;
        if (nextProgress >= 100) {
          clearInterval(interval);
          // Add a log entry when complete
          const newLog: LogEntry = {
            id: uuidv4(),
            timestamp: new Date().toISOString(),
            level: 'info',
            message: 'Neural network partitioning completed successfully',
            source: 'NeuroSplit',
          };
          setLogs(prev => [newLog, ...prev]);
          
          // Increment running jobs
          setRunningJobs(prev => prev + 1);
          
          // Set analytics visible after completion
          setTimeout(() => {
            setShowAnalytics(true);
          }, 500);
          
          return 100;
        }
        return nextProgress;
      });
    }, 300);
    
    // Add processing logs during partitioning
    const logMessages = [
      'Analyzing neural network topology...',
      'Calculating optimal partition boundaries...',
      'Identifying cross-partition dependencies...',
      'Optimizing for minimal communication overhead...',
      'Allocating network segments to available nodes...',
      'Establishing synchronization protocols...',
      'Configuring partition parameter servers...',
      'Preparing distribution manifest...'
    ];
    
    let logIndex = 0;
    const logInterval = setInterval(() => {
      if (logIndex < logMessages.length) {
        const newLog: LogEntry = {
          id: uuidv4(),
          timestamp: new Date().toISOString(),
          level: 'info',
          message: logMessages[logIndex],
          source: 'NeuroSplit',
        };
        setLogs(prev => [newLog, ...prev]);
        logIndex++;
      } else {
        clearInterval(logInterval);
      }
    }, 1200);
    
    return () => {
      clearInterval(interval);
      clearInterval(logInterval);
    };
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const getLogColor = (level: string) => {
    switch (level) {
      case 'info': return 'text-neon-blue';
      case 'warning': return 'text-yellow-400';
      case 'error': return 'text-red-400';
      case 'debug': return 'text-gray-400';
      default: return 'text-white';
    }
  };

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
            status={componentStatus.status} 
            label={componentStatus.status === 'operational' ? 'Operational' : componentStatus.status === 'degraded' ? 'Performance Degraded' : 'Service Unavailable'} 
            className="mb-4" 
          />
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">NeuroSplit</span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Neural network partitioning and distribution system for efficient AI model deployment across decentralized nodes
          </p>
        </motion.div>

        {/* Loading State */}
        {isInitializing && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-t-4 border-r-4 border-neon-blue rounded-full animate-spin mb-6"></div>
            <p className="text-gray-400 animate-pulse">Initializing NeuroSplit...</p>
            <div className="w-48 mt-4">
              <LoadingBar isIndeterminate />
            </div>
          </div>
        )}

        {/* Main Dashboard */}
        {!isInitializing && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Stats */}
            <div className="lg:col-span-1">
              <Card className="p-6 mb-6">
                <h2 className="text-xl font-bold mb-6 neon-text-blue">System Status</h2>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-400">Network Nodes</span>
                      <span className="font-semibold">{networkNodes.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-800 h-1.5 rounded-full">
                      <div className="bg-neon-blue h-1.5 rounded-full" style={{ width: `85%` }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-400">Active Models</span>
                      <span className="font-semibold">{activeModels}</span>
                    </div>
                    <div className="w-full bg-gray-800 h-1.5 rounded-full">
                      <div className="bg-neon-purple h-1.5 rounded-full" style={{ width: `${(activeModels / 300) * 100}%` }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-400">Running Jobs</span>
                      <span className="font-semibold">{runningJobs}</span>
                    </div>
                    <div className="w-full bg-gray-800 h-1.5 rounded-full">
                      <div className="bg-neon-green h-1.5 rounded-full" style={{ width: `${(runningJobs / 100) * 100}%` }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-400">System Load</span>
                      <span className="font-semibold">{componentStatus.load.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-800 h-1.5 rounded-full">
                      <div 
                        className={`h-1.5 rounded-full ${
                          componentStatus.load > 80 ? 'bg-red-500' : 
                          componentStatus.load > 60 ? 'bg-yellow-500' : 
                          'bg-green-500'
                        }`} 
                        style={{ width: `${componentStatus.load}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-400">Avg. Latency</span>
                      <span className="font-semibold">{componentStatus.latency.toFixed(1)} ms</span>
                    </div>
                    <div className="w-full bg-gray-800 h-1.5 rounded-full">
                      <div 
                        className={`h-1.5 rounded-full ${
                          componentStatus.latency > 50 ? 'bg-red-500' : 
                          componentStatus.latency > 20 ? 'bg-yellow-500' : 
                          'bg-green-500'
                        }`} 
                        style={{ width: `${(componentStatus.latency / 100) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4 neon-text-blue">Quick Actions</h2>
                <div className="space-y-3">
                  <Button 
                    onClick={handlePartition}
                    isLoading={isPartitioning && partitionProgress < 100}
                    disabled={isPartitioning}
                    fullWidth
                  >
                    Partition Neural Network
                  </Button>
                  
                  <Button 
                    variant="secondary"
                    fullWidth
                  >
                    Optimize Partitions
                  </Button>
                  
                  <Button 
                    variant="outline"
                    fullWidth
                  >
                    View Network Topology
                  </Button>
                  
                  <Button 
                    variant="ghost"
                    fullWidth
                  >
                    System Diagnostics
                  </Button>
                </div>
                
                {isPartitioning && (
                  <div className="mt-6">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-400">Partitioning Progress</span>
                      <span className="text-sm text-neon-blue">{Math.round(partitionProgress)}%</span>
                    </div>
                    <LoadingBar progress={partitionProgress} />
                  </div>
                )}
              </Card>
            </div>
            
            {/* Middle Column - Logs */}
            <div className="lg:col-span-2">
              <Card className="p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold neon-text-blue">System Logs</h2>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse mr-2"></div>
                    <span className="text-xs text-gray-400">Live Feed</span>
                  </div>
                </div>
                
                <div className="h-[300px] overflow-y-auto border border-gray-800 rounded bg-black/40 p-2">
                  {logs.map((log) => (
                    <div key={log.id} className="mb-2 text-sm font-mono">
                      <span className="text-gray-500">[{formatTime(log.timestamp)}]</span>{' '}
                      <span className={`font-semibold ${getLogColor(log.level)}`}>[{log.level.toUpperCase()}]</span>{' '}
                      <span className="text-gray-300">{log.source}:</span>{' '}
                      <span className="text-white">{log.message}</span>
                    </div>
                  ))}
                </div>
              </Card>
              
              {/* Partition Analytics */}
              {showAnalytics && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="p-6 mb-6">
                    <h2 className="text-xl font-bold mb-4 neon-text-blue">Partition Analytics</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-black/40 p-4 rounded-lg border border-neon-blue/30">
                        <div className="text-sm text-gray-400 mb-1">Partitions Created</div>
                        <div className="text-2xl font-bold">{Math.floor(Math.random() * 20) + 8}</div>
                      </div>
                      <div className="bg-black/40 p-4 rounded-lg border border-neon-blue/30">
                        <div className="text-sm text-gray-400 mb-1">Network Efficiency</div>
                        <div className="text-2xl font-bold">{(Math.random() * 10 + 87).toFixed(1)}%</div>
                      </div>
                      <div className="bg-black/40 p-4 rounded-lg border border-neon-blue/30">
                        <div className="text-sm text-gray-400 mb-1">Communication Overhead</div>
                        <div className="text-2xl font-bold">{(Math.random() * 10 + 2).toFixed(1)}%</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-semibold mb-2 text-gray-300">Partition Distribution</h3>
                        <div className="bg-black/40 p-4 rounded-lg border border-gray-800 h-40 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-xs text-gray-400 mb-2">Interactive Visualization</div>
                            <div className="text-neon-blue text-sm">(Visualization Placeholder)</div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold mb-2 text-gray-300">Performance Improvement</h3>
                        <div className="bg-black/40 p-4 rounded-lg border border-gray-800 h-40 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-xs text-gray-400 mb-2">Latency Reduction</div>
                            <div className="text-4xl font-bold text-neon-green">
                              {(Math.random() * 20 + 35).toFixed(1)}%
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}
              
              {/* Metrics Section */}
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-6 neon-text-blue">Key Metrics</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {metrics.map((metric) => (
                    <div key={metric.id} className="bg-black/40 p-4 rounded-lg border border-gray-800">
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-sm text-gray-300">{metric.name}</div>
                        <div className={`text-xs ${
                          metric.trend === 'up' ? 'text-green-400' : 
                          metric.trend === 'down' ? 'text-red-400' : 
                          'text-gray-400'
                        }`}>
                          {metric.trend === 'up' ? '▲' : metric.trend === 'down' ? '▼' : '■'} {metric.trend.toUpperCase()}
                        </div>
                      </div>
                      <div className="text-2xl font-bold mb-1">
                        {metric.value.toLocaleString()} <span className="text-xs text-gray-500">{metric.unit}</span>
                      </div>
                      <div className="w-full bg-gray-800 h-1 rounded-full">
                        <div className="bg-neon-blue h-1 rounded-full" style={{ width: `${Math.min(100, metric.value)}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Documentation Section */}
        <motion.div 
          className="mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Quick Documentation</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2 neon-text-blue">What is NeuroSplit?</h3>
                <p className="text-gray-300">
                  NeuroSplit is CoreNet.AI's neural network partitioning system that enables efficient distribution of large AI models across decentralized infrastructure. It automatically analyzes model topology, identifies optimal partition boundaries, and manages cross-partition communication to ensure seamless operation with minimal overhead.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2 neon-text-blue">Key Features</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-300">
                  <li>Smart partitioning algorithms that minimize cross-node communication</li>
                  <li>Automatic load balancing across heterogeneous hardware</li>
                  <li>Fault-tolerant operation with node failure recovery</li>
                  <li>Real-time performance analytics and optimization suggestions</li>
                  <li>Compatible with popular machine learning frameworks</li>
                </ul>
              </div>
              
              <div className="flex justify-end">
                <Button href="/docs/neurosplit" variant="outline" size="sm">
                  View Full Documentation
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
} 