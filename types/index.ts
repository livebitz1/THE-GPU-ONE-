export type SystemStatus = {
  status: 'online' | 'offline' | 'degraded' | 'maintenance';
  message: string;
  uptime: number;
  lastUpdated: string;
  components: {
    [key: string]: {
      status: 'operational' | 'degraded' | 'down';
      latency: number;
      load: number;
    };
  };
};

export type Utility = {
  id: string;
  name: string;
  description: string;
  icon: string;
  status: 'operational' | 'degraded' | 'down';
  route: string;
};

export type LogEntry = {
  id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error' | 'debug';
  message: string;
  source: string;
};

export type Metric = {
  id: string;
  name: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  history: { timestamp: string; value: number }[];
};

export type TokenData = {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
  supply: number;
  chart: { timestamp: string; price: number }[];
};

export type UserMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
};

export type ChartData = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    borderWidth: number;
    tension: number;
    fill?: boolean;
  }[];
};

export type ShardMindResponse = {
  id: string;
  response: string;
  tokens: number;
  processingTime: number;
};

export type SystemHealth = {
  cpu: number;
  memory: number;
  network: number;
  storage: number;
  temperature: number;
  load: number;
}; 