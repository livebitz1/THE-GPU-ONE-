'use client';

import React, { useEffect, useState } from 'react';

interface LoadingBarProps {
  progress?: number;
  isIndeterminate?: boolean;
  height?: number;
  className?: string;
  color?: string;
  label?: string;
  showPercentage?: boolean;
  duration?: number;
  onComplete?: () => void;
}

const LoadingBar = ({
  progress: initialProgress,
  isIndeterminate = false,
  height = 4,
  className = '',
  color = '',
  label,
  showPercentage = false,
  duration = 2000,
  onComplete,
}: LoadingBarProps) => {
  const [progress, setProgress] = useState(initialProgress || 0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (initialProgress !== undefined) {
      setProgress(initialProgress);
      
      if (initialProgress >= 100) {
        setIsComplete(true);
        if (onComplete) onComplete();
      } else {
        setIsComplete(false);
      }
    }
  }, [initialProgress, onComplete]);

  useEffect(() => {
    if (isIndeterminate && !isComplete) {
      let startTime: number;
      let animationId: number;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const nextProgress = (elapsed / duration) * 100;

        if (nextProgress >= 100) {
          setProgress(100);
          setIsComplete(true);
          if (onComplete) onComplete();
        } else {
          setProgress(nextProgress);
          animationId = requestAnimationFrame(animate);
        }
      };

      animationId = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationId);
    }
  }, [isIndeterminate, isComplete, duration, onComplete]);

  // Indeterminate animation for the "fake" loading
  const indeterminateAnimation = isIndeterminate && !isComplete
    ? 'before:absolute before:top-0 before:left-0 before:bottom-0 before:bg-gradient-to-r before:from-neon-blue/20 before:to-neon-blue before:animate-shimmer before:w-[50%]'
    : '';
    
  // Shimmer effect when complete
  const completeAnimation = isComplete
    ? 'after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent after:animate-shimmer'
    : '';

  const colorClass = color || 'loading-bar';
  
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="flex justify-between mb-1">
          <span className="text-xs text-gray-400">{label}</span>
          {showPercentage && (
            <span className="text-xs text-neon-blue">{Math.round(progress)}%</span>
          )}
        </div>
      )}
      
      <div 
        className={`w-full bg-gray-800/50 rounded-full overflow-hidden relative ${indeterminateAnimation} ${completeAnimation}`}
        style={{ height: `${height}px` }}
      >
        <div
          className={`h-full rounded-full transition-all duration-300 ${colorClass}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default LoadingBar; 