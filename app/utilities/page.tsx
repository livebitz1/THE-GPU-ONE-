'use client';

import { useState, useEffect } from 'react';
import { utilities } from '@/app/lib/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { motion } from 'framer-motion';

export default function UtilitiesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const filteredUtilities = utilities.filter((utility) => {
    const matchesSearch = 
      utility.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      utility.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || utility.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || utility.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = ['all', ...new Set(utilities.map(u => u.category))];
  const statuses = ['all', ...new Set(utilities.map(u => u.status))];
  
  return (
    <div className="container mx-auto py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">CoreNet.AI Utilities</h1>
          <p className="text-muted-foreground">
            Explore the ecosystem of tools and utilities that power the CoreNet.AI platform.
          </p>
        </div>
        
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="w-full md:w-2/3">
            <Input
              placeholder="Search utilities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex gap-2 w-full md:w-1/3">
            <Select
              value={categoryFilter}
              onValueChange={setCategoryFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {filteredUtilities.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium">No utilities found</h3>
            <p className="text-muted-foreground mt-2">
              Try adjusting your search or filters
            </p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setCategoryFilter('all');
                setStatusFilter('all');
              }}
              className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUtilities.map((utility) => (
              <motion.div
                key={utility.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div className="space-y-1">
                      <CardTitle className="text-2xl font-bold">{utility.name}</CardTitle>
                      <CardDescription>{utility.description}</CardDescription>
                    </div>
                    <div className="text-3xl">{utility.icon}</div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant={utility.status === 'online' ? 'default' : 'secondary'}>
                        {utility.status}
                      </Badge>
                      <Badge variant="outline">v{utility.version}</Badge>
                      <Badge variant="outline" className="capitalize">
                        {utility.category}
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <div className="flex gap-2">
                      <a 
                        href={`/docs/utilities/${utility.id}`}
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium"
                      >
                        View Docs
                      </a>
                      <a 
                        href={`/api/utilities/${utility.id}`}
                        className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md text-sm font-medium"
                      >
                        API Reference
                      </a>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
        
        <div className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-bold mb-6">Integration Examples</h2>
          
          <Tabs defaultValue="javascript">
            <TabsList>
              <TabsTrigger value="javascript">JavaScript</TabsTrigger>
              <TabsTrigger value="python">Python</TabsTrigger>
              <TabsTrigger value="rust">Rust</TabsTrigger>
            </TabsList>
            <TabsContent value="javascript" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                    <code>{`
import { CoreNetClient } from '@corenet/sdk';

// Initialize the client
const client = new CoreNetClient({
  apiKey: process.env.CORENET_API_KEY,
  network: 'mainnet'
});

// Using NeuroSplit utility
const neuralNetwork = await client.utilities.neurosplit.splitModel({
  model: myNeuralNetwork,
  partitions: 8,
  optimizationStrategy: 'balanced'
});

// Start distributed training
const trainingJob = await client.startDistributedTraining({
  model: neuralNetwork,
  dataset: myDataset,
  parameters: {
    epochs: 100,
    batchSize: 64,
    learningRate: 0.001
  }
});

console.log(\`Training job started: \${trainingJob.id}\`);
                    `}</code>
                  </pre>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="python" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                    <code>{`
from corenet.client import CoreNetClient
from corenet.utilities import NeuroSplit

# Initialize the client
client = CoreNetClient(
    api_key=os.environ["CORENET_API_KEY"],
    network="mainnet"
)

# Using NeuroSplit utility
neurosplit = NeuroSplit(client)
neural_network = neurosplit.split_model(
    model=my_neural_network,
    partitions=8,
    optimization_strategy="balanced"
)

# Start distributed training
training_job = client.start_distributed_training(
    model=neural_network,
    dataset=my_dataset,
    parameters={
        "epochs": 100,
        "batch_size": 64,
        "learning_rate": 0.001
    }
)

print(f"Training job started: {training_job.id}")
                    `}</code>
                  </pre>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="rust" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                    <code>{`
use corenet_sdk::{CoreNetClient, ClientConfig};
use corenet_sdk::utilities::neurosplit::{NeuroSplit, SplitConfig};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Initialize the client
    let client = CoreNetClient::new(ClientConfig {
        api_key: std::env::var("CORENET_API_KEY")?,
        network: "mainnet".to_string(),
    });

    // Using NeuroSplit utility
    let neurosplit = NeuroSplit::new(&client);
    let neural_network = neurosplit.split_model(
        &my_neural_network,
        SplitConfig {
            partitions: 8,
            optimization_strategy: "balanced".to_string(),
        },
    ).await?;

    // Start distributed training
    let training_job = client.start_distributed_training(
        &neural_network,
        &my_dataset,
        serde_json::json!({
            "epochs": 100,
            "batch_size": 64,
            "learning_rate": 0.001
        }),
    ).await?;

    println!("Training job started: {}", training_job.id);
    
    Ok(())
}
                    `}</code>
                  </pre>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>
    </div>
  );
} 