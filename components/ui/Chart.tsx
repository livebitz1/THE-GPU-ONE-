'use client';

import React, { useEffect, useRef } from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ChartData } from '@/types';

ChartJS.register(...registerables);

interface ChartProps {
  data: ChartData;
  height?: number;
  title?: string;
  showLegend?: boolean;
  showGrid?: boolean;
  animation?: boolean;
  className?: string;
  darkMode?: boolean;
}

const Chart = ({
  data,
  height = 300,
  title,
  showLegend = true,
  showGrid = true,
  animation = true,
  className = '',
  darkMode = true,
}: ChartProps) => {
  const chartRef = useRef<ChartJS>(null);

  // Apply custom styling after the chart renders
  useEffect(() => {
    const chart = chartRef.current;
    
    if (chart) {
      // Add custom styling or logic here if needed
    }
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: showLegend,
        position: 'top' as const,
        labels: {
          color: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: !!title,
        text: title || '',
        color: darkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
        font: {
          size: 16,
          weight: 'bold',
        },
        padding: {
          bottom: 20,
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)',
        titleColor: darkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
        bodyColor: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
        borderColor: 'rgba(0, 246, 255, 0.3)',
        borderWidth: 1,
        padding: 10,
        titleFont: {
          size: 14,
          weight: 'bold',
        },
        bodyFont: {
          size: 12,
        },
        titleMarginBottom: 8,
      },
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false,
    },
    scales: {
      x: {
        grid: {
          display: showGrid,
          color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: darkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
          font: {
            size: 10,
          },
          maxRotation: 45,
          minRotation: 45,
        },
      },
      y: {
        grid: {
          display: showGrid,
          color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: darkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
          font: {
            size: 10,
          },
        },
      },
    },
    animations: {
      tension: {
        duration: 1000,
        easing: 'linear',
        from: 0.8,
        to: 0.4,
        loop: true,
      },
    },
    transitions: {
      active: {
        animation: {
          duration: 400,
        },
      },
    },
  };

  // If animation is disabled, remove the animations configuration
  if (!animation) {
    // @ts-ignore
    options.animations = {};
  }

  return (
    <div className={`h-${height} w-full ${className}`} style={{ height: `${height}px` }}>
      <Line
        // @ts-ignore
        ref={chartRef}
        data={data}
        options={options}
      />
    </div>
  );
};

export default Chart; 