'use client';

import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface TerminalOutputProps {
  lines?: string[];
  autoTyping?: boolean;
  typingSpeed?: number;
  prompt?: string;
  maxLines?: number;
  className?: string;
  autoScroll?: boolean;
  showCursor?: boolean;
  highlightPattern?: RegExp;
  highlightColor?: string;
  onComplete?: () => void;
}

const TerminalOutput = ({
  lines = [],
  autoTyping = true,
  typingSpeed = 30,
  prompt = '$',
  maxLines = 100,
  className = '',
  autoScroll = true,
  showCursor = true,
  highlightPattern,
  highlightColor = 'var(--neon-blue)',
  onComplete,
}: TerminalOutputProps) => {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentLine, setCurrentLine] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of terminal
  useEffect(() => {
    if (autoScroll && terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [displayedLines, autoScroll]);

  // Handle typing animation
  useEffect(() => {
    if (!lines.length || !autoTyping) {
      setDisplayedLines(lines);
      if (onComplete) onComplete();
      return;
    }

    if (currentIndex >= lines.length) {
      setIsTyping(false);
      if (onComplete) onComplete();
      return;
    }

    setIsTyping(true);
    const targetLine = lines[currentIndex];
    
    if (currentLine.length === 0) {
      // Start typing a new line
      const timer = setTimeout(() => {
        setCurrentLine(targetLine.charAt(0));
      }, typingSpeed * 2);
      return () => clearTimeout(timer);
    }
    
    if (currentLine.length < targetLine.length) {
      // Continue typing current line
      const timer = setTimeout(() => {
        setCurrentLine(targetLine.substring(0, currentLine.length + 1));
      }, typingSpeed);
      return () => clearTimeout(timer);
    } 
    
    if (currentLine.length === targetLine.length) {
      // Line complete, move to next line
      const timer = setTimeout(() => {
        setDisplayedLines(prev => [...prev, currentLine]);
        setCurrentLine('');
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, typingSpeed * 3);
      return () => clearTimeout(timer);
    }
  }, [currentLine, currentIndex, lines, autoTyping, typingSpeed, onComplete]);

  // Generate random terminal outputs
  const generateRandomOutput = () => {
    const outputs = [
      'Analyzing neural pathways...',
      'Initializing quantum compute modules...',
      'Syncing distributed nodes...',
      'Verifying blockchain integrity...',
      'Loading model weights...',
      'Establishing secure connection...',
      'Optimizing resource allocation...',
      'Scanning network topology...',
      'Partitioning neural networks...',
      'Calculating inference metrics...',
      'Deploying edge cache instances...',
      'Validating cryptographic signatures...',
      'Synchronizing distributed parameters...',
      'Analyzing threat matrix...',
      'Running system diagnostics...',
    ];
    
    const randomOutputs = Array(Math.floor(Math.random() * 5) + 3)
      .fill(null)
      .map(() => outputs[Math.floor(Math.random() * outputs.length)]);
    
    return randomOutputs;
  };

  // Add random outputs when lines are empty
  useEffect(() => {
    if (lines.length === 0) {
      const randomOutputs = generateRandomOutput();
      setDisplayedLines(randomOutputs);
    }
  }, [lines]);

  // Function to highlight matching text
  const highlightText = (text: string) => {
    if (!highlightPattern) return text;
    
    return text.split(highlightPattern).map((part, index, array) => {
      // If this is the last part and there are no more matches, just return it
      if (index === array.length - 1) return part;
      
      // Find the match that follows this part
      const match = text.substring(
        text.indexOf(part) + part.length, 
        text.indexOf(array[index + 1], text.indexOf(part) + part.length)
      );
      
      return (
        <React.Fragment key={uuidv4()}>
          {part}
          <span style={{ color: highlightColor }}>{match}</span>
        </React.Fragment>
      );
    });
  };

  return (
    <div 
      className={`terminal overflow-auto ${className}`}
      ref={terminalRef}
    >
      {displayedLines.map((line, index) => (
        <div key={index} className="opacity-90">
          {line.startsWith('>') ? (
            <div className="flex">
              <span className="text-neon-pink mr-2">{prompt}</span>
              <span>{highlightText(line.substring(1))}</span>
            </div>
          ) : (
            <div>{highlightText(line)}</div>
          )}
        </div>
      ))}
      
      {isTyping && (
        <div className="flex">
          {currentLine.startsWith('>') ? (
            <>
              <span className="text-neon-pink mr-2">{prompt}</span>
              <span>{highlightText(currentLine.substring(1))}</span>
            </>
          ) : (
            <span>{highlightText(currentLine)}</span>
          )}
          {showCursor && <span className="animate-pulse">▌</span>}
        </div>
      )}
    </div>
  );
};

export default TerminalOutput; 