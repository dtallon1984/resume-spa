// hooks/useProtectedChat.ts
import { useState, useRef, useCallback } from 'react';

interface UseProtectedChatOptions {
  maxMessagesPerHour?: number;
  maxMessageLength?: number;
  cooldownMs?: number;
}

export const useProtectedChat = ({
  maxMessagesPerHour = 30,
  maxMessageLength = 500,
  cooldownMs = 2000
}: UseProtectedChatOptions = {}) => {
  const [messageCount, setMessageCount] = useState(0);
  const [lastMessageTime, setLastMessageTime] = useState(0);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const resetTimeRef = useRef(Date.now() + 3600000);

  const checkRateLimit = useCallback(() => {
    const now = Date.now();
    
    // Reset hourly counter
    if (now > resetTimeRef.current) {
      setMessageCount(0);
      resetTimeRef.current = now + 3600000;
      setIsRateLimited(false);
    }
    
    // Check cooldown period
    if (now - lastMessageTime < cooldownMs) {
      return { allowed: false, reason: 'Please wait a moment between messages.' };
    }
    
    // Check hourly limit
    if (messageCount >= maxMessagesPerHour) {
      setIsRateLimited(true);
      return { allowed: false, reason: 'You\'ve reached the conversation limit. Please try again in an hour.' };
    }
    
    return { allowed: true };
  }, [messageCount, lastMessageTime, cooldownMs, maxMessagesPerHour]);

  const validateMessage = useCallback((message: string) => {
    if (!message || message.trim().length === 0) {
      return { valid: false, reason: 'Please enter a message.' };
    }
    
    if (message.length > maxMessageLength) {
      return { valid: false, reason: `Message too long. Please keep it under ${maxMessageLength} characters.` };
    }
    
    // Block obvious spam
    if (/(.)\1{5,}/.test(message)) {
      return { valid: false, reason: 'Please enter a normal question.' };
    }
    
    // Block URLs
    if (/https?:\/\//.test(message)) {
      return { valid: false, reason: 'Please don\'t include links in your message.' };
    }
    
    return { valid: true };
  }, [maxMessageLength]);

  const recordMessage = useCallback(() => {
    setMessageCount(prev => prev + 1);
    setLastMessageTime(Date.now());
  }, []);

  return {
    checkRateLimit,
    validateMessage,
    recordMessage,
    isRateLimited,
    messagesRemaining: Math.max(0, maxMessagesPerHour - messageCount),
    timeUntilReset: Math.max(0, resetTimeRef.current - Date.now())
  };
};