'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  glowEffect?: boolean;
  variant?: 'default' | 'gradient' | 'transparent';
  onClick?: () => void;
}

const Card = ({ 
  children, 
  className = '', 
  hoverEffect = false,
  glowEffect = false,
  variant = 'default',
  onClick
}: CardProps) => {
  const baseClasses = 'rounded-lg backdrop-blur-sm';
  
  const variantClasses = {
    default: 'glass-card',
    gradient: 'border border-neon-blue/20 bg-gradient-to-br from-background-secondary to-background/40',
    transparent: 'bg-black/30 border border-white/5'
  };
  
  const hoverClasses = hoverEffect 
    ? 'transition-all duration-300 hover:border-neon-blue/50 hover:-translate-y-1' 
    : '';
  
  const glowClasses = glowEffect 
    ? 'hover:shadow-[0_0_15px_rgba(0,246,255,0.3)]' 
    : '';
    
  const clickClasses = onClick ? 'cursor-pointer' : '';

  return (
    <motion.div
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${hoverClasses}
        ${glowClasses}
        ${clickClasses}
        ${className}
      `}
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={hoverEffect ? { y: -5 } : {}}
    >
      {children}
    </motion.div>
  );
};

export default Card; 