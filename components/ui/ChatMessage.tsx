'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { UserMessage } from '@/types';

interface ChatMessageProps {
  message: UserMessage;
  isLatest: boolean;
}

const ChatMessage = ({ message, isLatest }: ChatMessageProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Animate typing effect for assistant messages
  useEffect(() => {
    if (message.role === 'assistant' && isLatest) {
      setIsTyping(true);
      let i = 0;
      const interval = setInterval(() => {
        setDisplayedText(message.content.substring(0, i));
        i++;
        if (i > message.content.length) {
          clearInterval(interval);
          setIsTyping(false);
        }
      }, 15); // Speed of typing
      
      return () => clearInterval(interval);
    } else {
      setDisplayedText(message.content);
    }
  }, [message.content, message.role, isLatest]);

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <motion.div
      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div 
        className={`
          max-w-[80%] md:max-w-[70%] p-4 rounded-lg 
          ${message.role === 'user' 
            ? 'bg-neon-blue/10 border border-neon-blue/30 rounded-tr-none' 
            : 'glass-card rounded-tl-none'
          }
        `}
      >
        <div className="flex items-center mb-1">
          <span className={`text-xs font-semibold ${message.role === 'user' ? 'text-neon-blue' : 'text-neon-green'}`}>
            {message.role === 'user' ? 'You' : 'ShardMind Assistant'}
          </span>
          <span className="text-gray-500 text-xs ml-2">
            {formatTimestamp(message.timestamp)}
          </span>
        </div>
        
        <div>
          {message.role === 'assistant' && isLatest ? (
            <>
              <p className="text-gray-300 whitespace-pre-wrap">{displayedText}</p>
              {isTyping && <span className="animate-pulse">▌</span>}
            </>
          ) : (
            <p className="text-gray-300 whitespace-pre-wrap">{message.content}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage; 