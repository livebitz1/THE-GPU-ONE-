export const utilities = [
  {
    id: 'neurosplit',
    name: 'NeuroSplit',
    description: 'Neural network partitioning and distribution utility',
    icon: '🧠',
    status: 'online',
    version: '1.2.0',
    category: 'core',
  },
  {
    id: 'quantum-bridge',
    name: 'Quantum Bridge',
    description: 'Interface between quantum computers and neural networks',
    icon: '⚛️',
    status: 'beta',
    version: '0.9.5',
    category: 'experimental',
  },
  {
    id: 'node-sync',
    name: 'NodeSync',
    description: 'Real-time synchronization between distributed nodes',
    icon: '🔄',
    status: 'online',
    version: '2.1.3',
    category: 'core',
  },
  {
    id: 'decentralized-storage',
    name: 'DStorage',
    description: 'Secure decentralized storage for model weights and datasets',
    icon: '🗄️',
    status: 'online',
    version: '1.8.2',
    category: 'infrastructure',
  },
  {
    id: 'federated-learning',
    name: 'FedLearn',
    description: 'Privacy-preserving federated learning implementation',
    icon: '🛡️',
    status: 'online',
    version: '3.0.1',
    category: 'core',
  },
  {
    id: 'model-marketplace',
    name: 'ModelMarket',
    description: 'Decentralized marketplace for AI models and components',
    icon: '🏪',
    status: 'online',
    version: '1.5.7',
    category: 'ecosystem',
  },
  {
    id: 'compute-optimizer',
    name: 'CompOpt',
    description: 'Dynamic resource allocation and optimization',
    icon: '⚡',
    status: 'online',
    version: '2.2.0',
    category: 'infrastructure',
  },
  {
    id: 'neural-validator',
    name: 'NeuralVal',
    description: 'Consensus mechanism for validating neural computations',
    icon: '✅',
    status: 'beta',
    version: '0.8.3',
    category: 'experimental',
  },
  {
    id: 'token-economics',
    name: 'TokenEcon',
    description: 'Economic simulation and governance tools',
    icon: '💰',
    status: 'online',
    version: '1.3.4',
    category: 'ecosystem',
  }
];

// Platform system status
export const systemStatusData = {
  status: 'online', // 'online', 'degraded', 'offline'
  lastUpdated: new Date().toISOString(),
  components: [
    { name: 'Core API', status: 'online' },
    { name: 'Query Engine', status: 'online' },
    { name: 'Storage Layer', status: 'online' },
    { name: 'Authentication', status: 'online' },
    { name: 'Distributed Training', status: 'online' },
    { name: 'Model Validation', status: 'online' },
    { name: 'Marketplace', status: 'online' }
  ],
  incidents: []
};

// Team members
export const teamMembers = [
  {
    name: 'Dr. Sarah Chen',
    role: 'Chief AI Scientist',
    bio: 'Leading researcher in distributed neural networks with over 15 years of experience at MIT and Google Brain.',
    avatar: '/images/team/sarah-chen.jpg',
    social: {
      twitter: 'https://twitter.com/drsarahchen',
      linkedin: 'https://linkedin.com/in/drsarahchen',
      github: 'https://github.com/sarahchen'
    }
  },
  {
    name: 'Michael Rodriguez',
    role: 'Chief Technology Officer',
    bio: 'Former VP of Engineering at Tesla, specializing in distributed systems and blockchain technology.',
    avatar: '/images/team/michael-rodriguez.jpg',
    social: {
      twitter: 'https://twitter.com/mrodriguez',
      linkedin: 'https://linkedin.com/in/mrodriguez',
      github: 'https://github.com/mrodriguez'
    }
  },
  {
    name: 'Dr. Amit Patel',
    role: 'Head of Research',
    bio: 'Published over 30 papers on neural network optimization and distributed computing architectures.',
    avatar: '/images/team/amit-patel.jpg',
    social: {
      twitter: 'https://twitter.com/amitpatel',
      linkedin: 'https://linkedin.com/in/amitpatel',
      github: 'https://github.com/amitpatel'
    }
  },
  {
    name: 'Elena Kuznetsova',
    role: 'Lead Infrastructure Engineer',
    bio: 'Pioneered distributed training systems at OpenAI before joining CoreNet to build next-gen infrastructure.',
    avatar: '/images/team/elena-kuznetsova.jpg',
    social: {
      twitter: 'https://twitter.com/elenakuz',
      linkedin: 'https://linkedin.com/in/elenakuz',
      github: 'https://github.com/elenakuz'
    }
  },
  {
    name: 'James Washington',
    role: 'Head of Security',
    bio: 'Former cybersecurity lead at DARPA with expertise in securing distributed AI systems and privacy.',
    avatar: '/images/team/james-washington.jpg',
    social: {
      twitter: 'https://twitter.com/jwashington',
      linkedin: 'https://linkedin.com/in/jwashington',
      github: 'https://github.com/jwashington'
    }
  },
  {
    name: 'Dr. Lisa Wong',
    role: 'Quantum Computing Advisor',
    bio: 'Quantum physicist working on the intersection of quantum computing and neural networks.',
    avatar: '/images/team/lisa-wong.jpg',
    social: {
      twitter: 'https://twitter.com/lisawongphd',
      linkedin: 'https://linkedin.com/in/lisawongphd',
      github: 'https://github.com/lisawongphd'
    }
  }
];

// Project milestones
export const milestones = [
  {
    year: 2020,
    title: 'CoreNet.AI Whitepaper',
    description: 'Published the foundational whitepaper outlining the vision for a decentralized neural computing platform.'
  },
  {
    year: 2021,
    title: 'Seed Funding',
    description: 'Secured $5M in seed funding to build the first prototype of the CoreNet infrastructure.'
  },
  {
    year: 2021,
    title: 'NeuroSplit Alpha',
    description: 'Released the first version of NeuroSplit, enabling efficient partitioning of neural networks.'
  },
  {
    year: 2022,
    title: 'Testnet Launch',
    description: 'Launched the CoreNet testnet with 50 initial nodes across 12 countries.'
  },
  {
    year: 2022,
    title: 'Series A Funding',
    description: 'Raised $25M in Series A to scale development and expand the core team.'
  },
  {
    year: 2023,
    title: 'Mainnet Beta',
    description: 'Launched CoreNet Mainnet Beta with support for production workloads and token economics.'
  },
  {
    year: 2023,
    title: 'Quantum Bridge Integration',
    description: 'Pioneered the first bridge between quantum computers and distributed neural networks.'
  },
  {
    year: 2024,
    title: 'CoreNet Foundation',
    description: 'Established the CoreNet Foundation to oversee governance and ecosystem development.'
  },
  {
    year: 2024,
    title: 'Full Platform Launch',
    description: 'Official launch of the complete CoreNet.AI platform with all core utilities and services.'
  }
]; 