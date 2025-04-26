'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  external?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const Button = ({
  children,
  onClick,
  href,
  className = '',
  disabled = false,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  external = false,
  type = 'button',
}: ButtonProps) => {
  // Base classes for all buttons
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 outline-none focus:ring-2 focus:ring-neon-blue/50';
  
  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs rounded-md',
    md: 'px-4 py-2 text-sm rounded-md',
    lg: 'px-6 py-3 text-base rounded-md'
  };
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-gradient-to-r from-neon-blue to-neon-purple text-white hover:brightness-110 active:brightness-90',
    secondary: 'bg-background-secondary text-white border border-neon-blue/30 hover:border-neon-blue/70',
    outline: 'bg-transparent border border-neon-blue text-neon-blue hover:bg-neon-blue/10',
    ghost: 'bg-transparent text-white hover:bg-white/10',
    danger: 'bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30'
  };
  
  // States
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  const loadingClasses = isLoading ? 'relative !text-transparent cursor-wait' : '';
  const widthClasses = fullWidth ? 'w-full' : '';
  
  // Combine all classes
  const buttonClasses = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${disabledClasses}
    ${loadingClasses}
    ${widthClasses}
    ${className}
  `;
  
  // Loading spinner
  const LoadingSpinner = () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
  );
  
  // Button content
  const ButtonContent = () => (
    <>
      {isLoading && <LoadingSpinner />}
      {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
    </>
  );
  
  // If href is provided, render a Link, otherwise render a button
  if (href) {
    const linkProps = external ? { 
      href: href, 
      target: '_blank', 
      rel: 'noopener noreferrer' 
    } : { 
      href: href
    };
    
    return (
      <motion.div
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
      >
        <Link 
          {...linkProps}
          className={buttonClasses}
          onClick={onClick}
          aria-disabled={disabled}
        >
          <ButtonContent />
        </Link>
      </motion.div>
    );
  }
  
  return (
    <motion.button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || isLoading}
      whileHover={{ scale: (disabled || isLoading) ? 1 : 1.02 }}
      whileTap={{ scale: (disabled || isLoading) ? 1 : 0.98 }}
    >
      <ButtonContent />
    </motion.button>
  );
};

export default Button; 