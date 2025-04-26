'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { SystemStatus, SystemHealth } from '@/types';
import { generateRandomSystemStatus, generateRandomSystemHealth } from '@/lib/data/mockData';

type StatusContextType = {
  systemStatus: SystemStatus;
  systemHealth: SystemHealth;
  updateStatus: () => void;
  updateSystemHealth: () => void;
  isLoading: boolean;
};

const StatusContext = createContext<StatusContextType | undefined>(undefined);

export const StatusProvider = ({ children }: { children: React.ReactNode }) => {
  const [systemStatus, setSystemStatus] = useState<SystemStatus>(generateRandomSystemStatus());
  const [systemHealth, setSystemHealth] = useState<SystemHealth>(generateRandomSystemHealth());
  const [isLoading, setIsLoading] = useState(false);

  const updateStatus = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setSystemStatus(generateRandomSystemStatus());
      setIsLoading(false);
    }, 1200);
  };

  const updateSystemHealth = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setSystemHealth(generateRandomSystemHealth());
      setIsLoading(false);
    }, 800);
  };

  useEffect(() => {
    // Initial load and set up intervals
    updateStatus();
    updateSystemHealth();

    const statusInterval = setInterval(updateStatus, 60000); // Update every minute
    const healthInterval = setInterval(updateSystemHealth, 30000); // Update every 30 seconds

    return () => {
      clearInterval(statusInterval);
      clearInterval(healthInterval);
    };
  }, []);

  return (
    <StatusContext.Provider
      value={{
        systemStatus,
        systemHealth,
        updateStatus,
        updateSystemHealth,
        isLoading,
      }}
    >
      {children}
    </StatusContext.Provider>
  );
};

export const useStatus = (): StatusContextType => {
  const context = useContext(StatusContext);
  if (context === undefined) {
    throw new Error('useStatus must be used within a StatusProvider');
  }
  return context;
}; 