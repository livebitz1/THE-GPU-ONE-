'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Chart from '@/components/ui/Chart';
import TerminalOutput from '@/components/ui/TerminalOutput';
import LoadingBar from '@/components/ui/LoadingBar';
import { useStatus } from '@/context/StatusContext';
import { generateRandomTokenData, generateLineChartData, generateMultiLineChartData } from '@/lib/data/mockData';
import type { TokenData, ChartData } from '@/types';

export default function TokensPage() {
  const { systemStatus } = useStatus();
  const [tokenData, setTokenData] = useState<TokenData | null>(null);
  const [priceChartData, setPriceChartData] = useState<ChartData | null>(null);
  const [volumeChartData, setVolumeChartData] = useState<ChartData | null>(null);
  const [liquidityChartData, setLiquidityChartData] = useState<ChartData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [refreshCounter, setRefreshCounter] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newTokenData = generateRandomTokenData();
      setTokenData(newTokenData);
      
      // Create price chart data
      const chartLabels = newTokenData.chart.map(point => point.timestamp);
      const chartValues = newTokenData.chart.map(point => point.price);
      
      const priceData: ChartData = {
        labels: chartLabels,
        datasets: [
          {
            label: 'MCP Price',
            data: chartValues,
            borderColor: 'rgba(0, 246, 255, 1)',
            backgroundColor: 'rgba(0, 246, 255, 0.1)',
            borderWidth: 2,
            tension: 0.4,
            fill: true,
          },
        ],
      };
      
      setPriceChartData(priceData);
      
      // Generate volume chart data
      setVolumeChartData(generateLineChartData('Volume (USD)', 30));
      
      // Generate liquidity charts
      setLiquidityChartData(generateMultiLineChartData(['MCP/ETH', 'MCP/USDC', 'MCP/BTC'], 30));
      
      setIsLoading(false);
    };
    
    loadData();
  }, [refreshCounter]);

  // Handle refresh
  const handleRefresh = async () => {
    if (isRefreshing) return;
    
    setIsRefreshing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setRefreshCounter(prev => prev + 1);
    setIsRefreshing(false);
  };

  // Format numbers with commas
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // Format currency with dollar sign
  const formatCurrency = (num: number) => {
    return '$' + formatNumber(num);
  };

  // Format price with proper decimals
  const formatPrice = (price: number) => {
    return price < 1 ? price.toFixed(4) : price.toFixed(2);
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
            status={systemStatus.components.mcptracker?.status || 'operational'} 
            label="Token Analytics" 
            className="mb-4" 
          />
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">MCP Tracker</span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Monitor the Master Control Protocol token performance and network analytics
          </p>
          
          {!isLoading && (
            <div className="flex justify-center mt-6">
              <Button 
                onClick={handleRefresh}
                isLoading={isRefreshing}
                variant="secondary"
                size="sm"
              >
                Refresh Data
              </Button>
            </div>
          )}
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-t-4 border-r-4 border-neon-blue rounded-full animate-spin mb-6"></div>
            <p className="text-gray-400 animate-pulse">Loading token data...</p>
            <div className="w-48 mt-4">
              <LoadingBar isIndeterminate />
            </div>
          </div>
        )}

        {/* Token Data */}
        {!isLoading && tokenData && (
          <>
            {/* Token Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card className="p-6">
                <div className="text-gray-400 text-sm mb-1">MCP Price</div>
                <div className="text-2xl font-bold mb-2">
                  ${formatPrice(tokenData.price)}
                </div>
                <div className={`text-sm ${tokenData.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {tokenData.change24h >= 0 ? '+' : ''}{tokenData.change24h.toFixed(2)}% (24h)
                </div>
              </Card>

              <Card className="p-6">
                <div className="text-gray-400 text-sm mb-1">Market Cap</div>
                <div className="text-2xl font-bold mb-2">
                  {formatCurrency(tokenData.marketCap)}
                </div>
                <div className="text-sm text-gray-500">
                  Rank: #42
                </div>
              </Card>

              <Card className="p-6">
                <div className="text-gray-400 text-sm mb-1">24h Volume</div>
                <div className="text-2xl font-bold mb-2">
                  {formatCurrency(tokenData.volume24h)}
                </div>
                <div className="text-sm text-gray-500">
                  {(tokenData.volume24h / tokenData.marketCap * 100).toFixed(2)}% of Market Cap
                </div>
              </Card>

              <Card className="p-6">
                <div className="text-gray-400 text-sm mb-1">Circulating Supply</div>
                <div className="text-2xl font-bold mb-2">
                  {formatNumber(Math.floor(tokenData.supply))}
                </div>
                <div className="text-sm text-gray-500">
                  {((tokenData.supply / 1000000000) * 100).toFixed(2)}% of Max Supply
                </div>
              </Card>
            </div>

            {/* Tab Navigation */}
            <div className="flex mb-6 border-b border-gray-800">
              <button
                className={`px-4 py-3 text-sm font-medium ${
                  selectedTab === 'overview' 
                    ? 'text-neon-blue border-b-2 border-neon-blue' 
                    : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => setSelectedTab('overview')}
              >
                Overview
              </button>
              <button
                className={`px-4 py-3 text-sm font-medium ${
                  selectedTab === 'markets' 
                    ? 'text-neon-blue border-b-2 border-neon-blue' 
                    : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => setSelectedTab('markets')}
              >
                Markets
              </button>
              <button
                className={`px-4 py-3 text-sm font-medium ${
                  selectedTab === 'network' 
                    ? 'text-neon-blue border-b-2 border-neon-blue' 
                    : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => setSelectedTab('network')}
              >
                Network
              </button>
              <button
                className={`px-4 py-3 text-sm font-medium ${
                  selectedTab === 'terminal' 
                    ? 'text-neon-blue border-b-2 border-neon-blue' 
                    : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => setSelectedTab('terminal')}
              >
                Terminal
              </button>
            </div>

            {/* Overview Tab */}
            {selectedTab === 'overview' && (
              <div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                  <Card className="p-6 lg:col-span-2">
                    <h3 className="text-xl font-semibold mb-4">Price Chart</h3>
                    <div className="h-80">
                      {priceChartData && <Chart data={priceChartData} height={300} />}
                    </div>
                  </Card>

                  <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Market Stats</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-400 text-sm">All-Time High</span>
                          <span className="text-white text-sm font-medium">${(tokenData.price * (1 + Math.random() * 2)).toFixed(2)}</span>
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-400 text-sm">All-Time Low</span>
                          <span className="text-white text-sm font-medium">${(tokenData.price * 0.2 * Math.random()).toFixed(4)}</span>
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-400 text-sm">Max Supply</span>
                          <span className="text-white text-sm font-medium">1,000,000,000</span>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-400 text-sm">Total Validators</span>
                          <span className="text-white text-sm font-medium">{Math.floor(Math.random() * 5000) + 10000}</span>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-400 text-sm">Staked MCP</span>
                          <span className="text-white text-sm font-medium">{Math.floor(tokenData.supply * 0.4)}</span>
                        </div>
                        <div className="text-xs text-gray-500">
                          {((tokenData.supply * 0.4) / tokenData.supply * 100).toFixed(2)}% of Supply
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-400 text-sm">Network APY</span>
                          <span className="text-white text-sm font-medium">{(Math.random() * 10 + 5).toFixed(2)}%</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Volume (24h)</h3>
                    <div className="h-60">
                      {volumeChartData && <Chart data={volumeChartData} height={220} />}
                    </div>
                  </Card>
                </div>
              </div>
            )}

            {/* Markets Tab */}
            {selectedTab === 'markets' && (
              <div>
                <div className="grid grid-cols-1 gap-6 mb-8">
                  <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Liquidity Pools</h3>
                    <div className="h-80">
                      {liquidityChartData && <Chart data={liquidityChartData} height={300} />}
                    </div>
                  </Card>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Top Exchanges</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="text-left text-gray-400 text-sm">
                            <th className="pb-4">#</th>
                            <th className="pb-4">Exchange</th>
                            <th className="pb-4">Pair</th>
                            <th className="pb-4 text-right">Price</th>
                            <th className="pb-4 text-right">Volume (24h)</th>
                            <th className="pb-4 text-right">Volume %</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Array.from({ length: 5 }).map((_, i) => {
                            const volume = Math.random() * tokenData.volume24h * 0.3;
                            const volumePercent = (volume / tokenData.volume24h) * 100;
                            const exchanges = ['Binance', 'Coinbase', 'KuCoin', 'OKX', 'Kraken', 'Bybit', 'Gate.io'];
                            const pairs = ['USDT', 'USDC', 'BTC', 'ETH'];
                            const priceDiff = (Math.random() * 0.02) - 0.01; // -1% to +1%
                            
                            return (
                              <tr key={i} className="border-t border-gray-800">
                                <td className="py-4">{i + 1}</td>
                                <td className="py-4 font-medium">{exchanges[i % exchanges.length]}</td>
                                <td className="py-4">MCP/{pairs[i % pairs.length]}</td>
                                <td className="py-4 text-right">${formatPrice(tokenData.price * (1 + priceDiff))}</td>
                                <td className="py-4 text-right">${formatNumber(Math.floor(volume))}</td>
                                <td className="py-4 text-right">{volumePercent.toFixed(2)}%</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </Card>
                </div>
              </div>
            )}

            {/* Network Tab */}
            {selectedTab === 'network' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Network Stats</h3>
                  <div className="space-y-6">
                    <div>
                      <div className="text-gray-400 text-sm mb-2">Total Nodes</div>
                      <div className="text-2xl font-bold">
                        {formatNumber(Math.floor(Math.random() * 15000) + 25000)}
                      </div>
                      <div className="w-full bg-gray-800 h-1 mt-2">
                        <div className="bg-neon-blue h-1" style={{ width: '78%' }}></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Active: 78%</span>
                        <span>Syncing: 22%</span>
                      </div>
                    </div>

                    <div>
                      <div className="text-gray-400 text-sm mb-2">Transactions (24h)</div>
                      <div className="text-2xl font-bold">
                        {formatNumber(Math.floor(Math.random() * 500000) + 1000000)}
                      </div>
                      <div className="text-sm text-green-400 mt-1">
                        +{(Math.random() * 10 + 2).toFixed(2)}% from yesterday
                      </div>
                    </div>

                    <div>
                      <div className="text-gray-400 text-sm mb-2">Average Block Time</div>
                      <div className="text-2xl font-bold">
                        {(Math.random() * 3 + 2).toFixed(2)} seconds
                      </div>
                    </div>

                    <div>
                      <div className="text-gray-400 text-sm mb-2">Network Utilization</div>
                      <div className="text-2xl font-bold">
                        {Math.floor(Math.random() * 30 + 60)}%
                      </div>
                      <div className="w-full bg-gray-800 h-1 mt-2">
                        <div className="bg-neon-purple h-1" style={{ width: '72%' }}></div>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Governance</h3>
                  <div className="space-y-4">
                    <div className="p-4 border border-neon-blue/30 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <div className="text-neon-blue font-medium">CIP-42</div>
                        <Badge status="online" label="Active" size="sm" />
                      </div>
                      <div className="text-sm mb-2">Parameter Update: Node Reward Adjustment</div>
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>Votes: {formatNumber(Math.floor(Math.random() * 5000000) + 10000000)}</span>
                        <span>Ends in: 2 days</span>
                      </div>
                      <div className="w-full bg-gray-800 h-1 mt-3">
                        <div className="bg-green-500 h-1" style={{ width: '67%' }}></div>
                      </div>
                      <div className="flex justify-between text-xs mt-1">
                        <span className="text-green-400">For: 67%</span>
                        <span className="text-red-400">Against: 33%</span>
                      </div>
                    </div>

                    <div className="p-4 border border-gray-800 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <div className="text-gray-300 font-medium">CIP-41</div>
                        <Badge status="operational" label="Passed" size="sm" />
                      </div>
                      <div className="text-sm mb-2">Network Upgrade: Shard Optimization</div>
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>Votes: {formatNumber(Math.floor(Math.random() * 5000000) + 15000000)}</span>
                        <span>Completed: 3 days ago</span>
                      </div>
                      <div className="w-full bg-gray-800 h-1 mt-3">
                        <div className="bg-green-500 h-1" style={{ width: '89%' }}></div>
                      </div>
                      <div className="flex justify-between text-xs mt-1">
                        <span className="text-green-400">For: 89%</span>
                        <span className="text-red-400">Against: 11%</span>
                      </div>
                    </div>

                    <div className="p-4 border border-gray-800 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <div className="text-gray-300 font-medium">CIP-40</div>
                        <Badge status="down" label="Rejected" size="sm" />
                      </div>
                      <div className="text-sm mb-2">Treasury Allocation: Marketing Fund</div>
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>Votes: {formatNumber(Math.floor(Math.random() * 5000000) + 8000000)}</span>
                        <span>Completed: 12 days ago</span>
                      </div>
                      <div className="w-full bg-gray-800 h-1 mt-3">
                        <div className="bg-green-500 h-1" style={{ width: '42%' }}></div>
                      </div>
                      <div className="flex justify-between text-xs mt-1">
                        <span className="text-green-400">For: 42%</span>
                        <span className="text-red-400">Against: 58%</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {/* Terminal Tab */}
            {selectedTab === 'terminal' && (
              <Card className="p-4">
                <div className="flex items-center justify-between mb-3 px-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  </div>
                  <div className="text-xs text-gray-400">mcp-terminal-2.1.0</div>
                </div>
                
                <div className="h-[60vh] overflow-auto">
                  <TerminalOutput
                    lines={[
                      '> connect --node mainnet',
                      'Establishing connection to MCP mainnet...',
                      'Successfully connected to Master Control Protocol network.',
                      'Node version: 2.1.0-stable',
                      'Chain ID: 0x7c70',
                      '> stats --summary',
                      'MCP Price: $' + formatPrice(tokenData.price),
                      'Market Cap: $' + formatNumber(Math.floor(tokenData.marketCap)),
                      'Circulating Supply: ' + formatNumber(Math.floor(tokenData.supply)),
                      'Current Block: ' + formatNumber(Math.floor(Math.random() * 1000000) + 8000000),
                      'Network TPS: ' + (Math.random() * 1000 + 500).toFixed(2),
                      'Active Validators: ' + formatNumber(Math.floor(Math.random() * 5000) + 10000),
                      '> query --recent-transactions',
                      'Fetching recent transactions...',
                      '[TX] 0x7a5d' + uuidv4().substring(0, 8) + ': Stake 1250 MCP',
                      '[TX] 0x3e9f' + uuidv4().substring(0, 8) + ': Transfer 500 MCP',
                      '[TX] 0x2c1d' + uuidv4().substring(0, 8) + ': Smart Contract Execution',
                      '[TX] 0x8b4e' + uuidv4().substring(0, 8) + ': Unstake 750 MCP',
                      '[TX] 0x5f2a' + uuidv4().substring(0, 8) + ': Bridge Transfer 1000 MCP',
                      '> query --governance-status',
                      'Active Proposals: 1',
                      'Recently Passed: 3',
                      'Recently Rejected: 1',
                      'Governance Participation Rate: 42.8%',
                      '> _'
                    ]}
                  />
                </div>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
} 