import React from 'react';

interface BadgeProps {
  status: 'operational' | 'degraded' | 'down' | 'online' | 'offline' | 'maintenance';
  label?: string;
  className?: string;
  showDot?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const Badge = ({ 
  status, 
  label, 
  className = '', 
  showDot = true,
  size = 'md' 
}: BadgeProps) => {
  const getStatusColor = () => {
    switch (status) {
      case 'operational':
      case 'online':
        return {
          bg: 'bg-green-500/20',
          text: 'text-green-400',
          border: 'border-green-500/30',
          dot: 'bg-green-500'
        };
      case 'degraded':
      case 'maintenance':
        return {
          bg: 'bg-yellow-500/20',
          text: 'text-yellow-400',
          border: 'border-yellow-500/30',
          dot: 'bg-yellow-500'
        };
      case 'down':
      case 'offline':
        return {
          bg: 'bg-red-500/20',
          text: 'text-red-400',
          border: 'border-red-500/30',
          dot: 'bg-red-500'
        };
      default:
        return {
          bg: 'bg-gray-500/20',
          text: 'text-gray-400',
          border: 'border-gray-500/30',
          dot: 'bg-gray-500'
        };
    }
  };

  const colors = getStatusColor();
  
  const displayLabel = label || status.charAt(0).toUpperCase() + status.slice(1);
  
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm'
  };

  return (
    <span 
      className={`
        inline-flex items-center rounded-full
        ${colors.bg} ${colors.text} ${colors.border}
        border ${sizeClasses[size]} font-medium
        ${className}
      `}
    >
      {showDot && (
        <span 
          className={`mr-1.5 h-1.5 w-1.5 rounded-full ${colors.dot} ${status === 'operational' || status === 'online' ? 'animate-pulse' : ''}`}
        />
      )}
      {displayLabel}
    </span>
  );
};

export default Badge; 