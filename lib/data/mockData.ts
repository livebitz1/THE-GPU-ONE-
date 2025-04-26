import { v4 as uuidv4 } from 'uuid';
import { 
  SystemStatus, 
  Utility, 
  LogEntry, 
  Metric, 
  TokenData,
  SystemHealth,
  ChartData 
} from '@/types';

// Helper function to get random item from array
const getRandomItem = <T>(items: T[]): T => {
  return items[Math.floor(Math.random() * items.length)];
};

// Helper function to get random number between min and max
const getRandomNumber = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

// Helper function to get random integer between min and max
const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Generate random timestamp within the last N hours
const getRandomTimestamp = (hoursAgo = 24): string => {
  const date = new Date();
  date.setHours(date.getHours() - Math.random() * hoursAgo);
  return date.toISOString();
};

// Generate formatted date string
export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

// Generate random system status
export const generateRandomSystemStatus = (): SystemStatus => {
  const status = getRandomItem(['online', 'degraded']) as 'online' | 'offline' | 'degraded' | 'maintenance';
  const uptime = getRandomInt(86400, 2592000); // Between 1 day and 30 days in seconds
  
  const components = {
    'neurosplit': {
      status: getRandomItem(['operational', 'operational', 'operational', 'degraded']) as 'operational' | 'degraded' | 'down',
      latency: getRandomNumber(5, 100),
      load: getRandomNumber(0, 100),
    },
    'cerebralsync': {
      status: getRandomItem(['operational', 'operational', 'degraded']) as 'operational' | 'degraded' | 'down',
      latency: getRandomNumber(1, 50),
      load: getRandomNumber(0, 100),
    },
    'shardmind': {
      status: 'operational' as 'operational' | 'degraded' | 'down',
      latency: getRandomNumber(10, 200),
      load: getRandomNumber(0, 100),
    },
    'mcptracker': {
      status: getRandomItem(['operational', 'operational', 'operational', 'degraded']) as 'operational' | 'degraded' | 'down',
      latency: getRandomNumber(5, 80),
      load: getRandomNumber(0, 100),
    },
    'autotrainx': {
      status: getRandomItem(['operational', 'operational', 'degraded', 'down']) as 'operational' | 'degraded' | 'down',
      latency: getRandomNumber(20, 300),
      load: getRandomNumber(0, 100),
    },
    'ghostcache': {
      status: 'operational' as 'operational' | 'degraded' | 'down',
      latency: getRandomNumber(1, 20),
      load: getRandomNumber(0, 100),
    },
    'shieldos': {
      status: getRandomItem(['operational', 'operational', 'operational', 'degraded']) as 'operational' | 'degraded' | 'down',
      latency: getRandomNumber(10, 100),
      load: getRandomNumber(0, 100),
    },
    'gpuflow': {
      status: getRandomItem(['operational', 'degraded']) as 'operational' | 'degraded' | 'down',
      latency: getRandomNumber(5, 150),
      load: getRandomNumber(50, 100),
    },
    'infraprobe': {
      status: 'operational' as 'operational' | 'degraded' | 'down',
      latency: getRandomNumber(5, 30),
      load: getRandomNumber(0, 100),
    },
    'liquidmesh': {
      status: getRandomItem(['operational', 'operational', 'degraded']) as 'operational' | 'degraded' | 'down',
      latency: getRandomNumber(10, 120),
      load: getRandomNumber(0, 100),
    },
  };

  let message = '';
  if (status === 'online') {
    message = 'All systems operational';
    
    // Check if any component is degraded
    const degradedComponents = Object.entries(components)
      .filter(([_, data]) => data.status === 'degraded')
      .map(([name, _]) => name);
      
    if (degradedComponents.length > 0) {
      message = `Performance degradation detected in: ${degradedComponents.join(', ')}`;
    }
  } else if (status === 'degraded') {
    message = 'System performance degraded. Engineers notified.';
  } else if (status === 'maintenance') {
    message = 'Scheduled maintenance in progress';
  } else {
    message = 'System offline. Emergency response activated.';
  }

  return {
    status,
    message,
    uptime,
    lastUpdated: new Date().toISOString(),
    components,
  };
};

// Generate random system health metrics
export const generateRandomSystemHealth = (): SystemHealth => {
  return {
    cpu: getRandomNumber(20, 85),
    memory: getRandomNumber(30, 90),
    network: getRandomNumber(10, 95),
    storage: getRandomNumber(40, 85),
    temperature: getRandomNumber(45, 75),
    load: getRandomNumber(20, 90),
  };
};

// List of utilities
export const utilities: Utility[] = [
  {
    id: 'neurosplit',
    name: 'NeuroSplit',
    description: 'Neural network partitioning and distribution system',
    icon: 'brain-circuit',
    status: 'operational',
    route: '/utilities/neurosplit',
  },
  {
    id: 'cerebralsync',
    name: 'CerebralSync',
    description: 'AI model synchronization and coordination',
    icon: 'brain-cycle',
    status: 'operational',
    route: '/utilities/cerebralsync',
  },
  {
    id: 'shardmind',
    name: 'ShardMind Assistant',
    description: 'Decentralized AI assistant with personalized agents',
    icon: 'sparkles',
    status: 'operational',
    route: '/assistant',
  },
  {
    id: 'mcptracker',
    name: 'MCP Tracker',
    description: 'Token analytics and blockchain monitoring',
    icon: 'chart-line-up',
    status: 'operational',
    route: '/tokens',
  },
  {
    id: 'autotrainx',
    name: 'AutoTrainX',
    description: 'Automated AI model training and optimization',
    icon: 'cpu',
    status: 'operational',
    route: '/utilities/autotrainx',
  },
  {
    id: 'ghostcache',
    name: 'GhostCache',
    description: 'Edge-cached AI inference and prediction',
    icon: 'database',
    status: 'operational',
    route: '/utilities/ghostcache',
  },
  {
    id: 'shieldos',
    name: 'ShieldOS',
    description: 'AI security and threat protection system',
    icon: 'shield-check',
    status: 'operational',
    route: '/utilities/shieldos',
  },
  {
    id: 'gpuflow',
    name: 'GPUFlow',
    description: 'Decentralized GPU computing marketplace',
    icon: 'gpu-card',
    status: 'operational',
    route: '/utilities/gpuflow',
  },
  {
    id: 'infraprobe',
    name: 'InfraProbe',
    description: 'Infrastructure monitoring and diagnostics',
    icon: 'activity',
    status: 'operational',
    route: '/utilities/infraprobe',
  },
  {
    id: 'liquidmesh',
    name: 'LiquidMesh',
    description: 'Decentralized liquidity protocol for AI infrastructure',
    icon: 'waves',
    status: 'operational',
    route: '/utilities/liquidmesh',
  },
];

// Update utilities with current status
export const getUtilitiesWithStatus = (): Utility[] => {
  const systemStatus = generateRandomSystemStatus();
  
  return utilities.map(utility => {
    const componentStatus = systemStatus.components[utility.id]?.status || 'operational';
    return {
      ...utility,
      status: componentStatus,
    };
  });
};

// Generate random log entries
export const generateRandomLogs = (count = 10): LogEntry[] => {
  const logSources = [
    'System', 'API', 'Database', 'Network', 'Security', 
    'NeuroSplit', 'CerebralSync', 'ShardMind', 'GPUFlow', 'AutoTrainX'
  ];
  
  const infoMessages = [
    'Session initialized', 'Connection established', 'Data sync complete',
    'Cache refreshed', 'Model loaded', 'Configuration updated',
    'Parameters optimized', 'Checkpoint saved', 'Queue processed'
  ];
  
  const warningMessages = [
    'High latency detected', 'Memory usage approaching threshold',
    'Rate limit approaching', 'Slow query performance', 'Token usage high',
    'Storage space low', 'API response delayed'
  ];
  
  const errorMessages = [
    'Connection refused', 'Authentication failed', 'API timeout',
    'Database query error', 'Memory allocation failed', 'Network partition detected',
    'Model initialization error', 'Invalid configuration'
  ];
  
  const debugMessages = [
    'Debug trace initialized', 'Parameter inspection', 'Cache hit ratio: 78%',
    'Query execution plan', 'Latency profile generated', 'Memory heap dump',
    'Network packet inspection', 'Thread scheduling analysis'
  ];

  return Array(count).fill(null).map(() => {
    const level = getRandomItem(['info', 'info', 'info', 'warning', 'error', 'debug']) as 'info' | 'warning' | 'error' | 'debug';
    let message = '';
    
    switch(level) {
      case 'info':
        message = getRandomItem(infoMessages);
        break;
      case 'warning':
        message = getRandomItem(warningMessages);
        break;
      case 'error':
        message = getRandomItem(errorMessages);
        break;
      case 'debug':
        message = getRandomItem(debugMessages);
        break;
    }
    
    return {
      id: uuidv4(),
      timestamp: getRandomTimestamp(1), // Within the last hour
      level,
      message,
      source: getRandomItem(logSources),
    };
  });
};

// Generate random metrics
export const generateRandomMetrics = (): Metric[] => {
  const metricNames = [
    { name: 'API Latency', unit: 'ms' },
    { name: 'Request Rate', unit: 'req/s' },
    { name: 'Error Rate', unit: '%' },
    { name: 'CPU Usage', unit: '%' },
    { name: 'Memory Usage', unit: '%' },
    { name: 'Network I/O', unit: 'MB/s' },
    { name: 'Storage I/O', unit: 'MB/s' },
    { name: 'Active Users', unit: 'users' },
    { name: 'Token Usage', unit: 'tokens/min' },
    { name: 'Cache Hit Rate', unit: '%' },
  ];
  
  return metricNames.map(({ name, unit }) => {
    const value = getRandomNumber(
      unit === '%' ? 0 : 1,
      unit === '%' ? 100 : unit === 'ms' ? 500 : 1000
    );
    
    const trend = getRandomItem(['up', 'down', 'stable']) as 'up' | 'down' | 'stable';
    
    // Generate history data for the past 24 hours
    const history = Array(24).fill(null).map((_, i) => {
      const date = new Date();
      date.setHours(date.getHours() - (23 - i));
      
      // Base value with some variance
      const historyValue = value * (0.7 + Math.random() * 0.6);
      
      return {
        timestamp: date.toISOString(),
        value: +historyValue.toFixed(2),
      };
    });
    
    return {
      id: uuidv4(),
      name,
      value: +value.toFixed(2),
      unit,
      trend,
      history,
    };
  });
};

// Generate random token data
export const generateRandomTokenData = (): TokenData => {
  const basePrice = getRandomNumber(0.5, 200);
  const change24h = getRandomNumber(-15, 15);
  const volume24h = getRandomNumber(100000, 10000000);
  const marketCap = getRandomNumber(1000000, 1000000000);
  const supply = getRandomNumber(10000000, 1000000000);
  
  // Generate chart data for the past 30 days
  const chart = Array(30).fill(null).map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    
    // Price with some daily variance
    const dailyChange = getRandomNumber(-5, 5) / 100; // -5% to +5%
    const dayPrice = i === 0 ? 
      basePrice : 
      chart[i-1].price * (1 + dailyChange);
    
    return {
      timestamp: formatDate(date),
      price: +dayPrice.toFixed(4),
    };
  });
  
  return {
    symbol: 'MCP',
    name: 'Master Control Protocol',
    price: +basePrice.toFixed(4),
    change24h: +change24h.toFixed(2),
    volume24h: +volume24h.toFixed(0),
    marketCap: +marketCap.toFixed(0),
    supply: +supply.toFixed(0),
    chart,
  };
};

// Generate line chart data for visualizations
export const generateLineChartData = (label: string, count = 12): ChartData => {
  const labels = Array(count).fill(null).map((_, i) => {
    const date = new Date();
    date.setHours(date.getHours() - (count - 1 - i));
    return `${date.getHours()}:00`;
  });
  
  return {
    labels,
    datasets: [
      {
        label,
        data: Array(count).fill(null).map(() => getRandomNumber(10, 100)),
        borderColor: 'rgba(0, 246, 255, 1)',
        backgroundColor: 'rgba(0, 246, 255, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
      },
    ],
  };
};

// Generate multi-line chart data
export const generateMultiLineChartData = (labels: string[], count = 12): ChartData => {
  const timeLabels = Array(count).fill(null).map((_, i) => {
    const date = new Date();
    date.setHours(date.getHours() - (count - 1 - i));
    return `${date.getHours()}:00`;
  });
  
  const colors = [
    { border: 'rgba(0, 246, 255, 1)', background: 'rgba(0, 246, 255, 0.1)' },
    { border: 'rgba(112, 40, 228, 1)', background: 'rgba(112, 40, 228, 0.1)' },
    { border: 'rgba(255, 0, 229, 1)', background: 'rgba(255, 0, 229, 0.1)' },
    { border: 'rgba(0, 255, 143, 1)', background: 'rgba(0, 255, 143, 0.1)' },
  ];
  
  return {
    labels: timeLabels,
    datasets: labels.map((label, index) => {
      const colorIndex = index % colors.length;
      return {
        label,
        data: Array(count).fill(null).map(() => getRandomNumber(10, 100)),
        borderColor: colors[colorIndex].border,
        backgroundColor: colors[colorIndex].background,
        borderWidth: 2,
        tension: 0.4,
      };
    }),
  };
}; 