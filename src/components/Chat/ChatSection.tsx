import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, Loader2, AlertTriangle } from 'lucide-react';
import { useOpenAIProtectedChat } from '../../hooks/useOpenAIChat';
import type { ProfileData } from '../../types/profile';

interface ChatMessage {
  type: 'user' | 'bot' | 'system';
  text: string;
  timestamp: Date;
}

type ChatSectionProps = {
  profileData: ProfileData;
};

const ChatSection: React.FC<ChatSectionProps> = ({ profileData }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      type: 'bot',
      text: `Hi! I'm ${profileData.name}'s AI assistant! 🤖✨\n\nI can answer questions about their professional background. Please keep conversations respectful and career-focused.`,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  const {
    checkRateLimit,
    validateMessage,
    recordMessage,
    isRateLimited,
     createSystemPrompt
    //messagesRemaining,
    //timeUntilReset
  } = useOpenAIProtectedChat({
    profileData,
  });

  const scrollToBottom = () => chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => { scrollToBottom(); }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    setError(null);

    // Client-side validation
    const messageValidation = validateMessage(inputMessage);
    if (!messageValidation.valid) {
      setError(messageValidation.reason!);
      return;
    }

    // Rate limit check
    const rateLimitCheck = checkRateLimit();
    if (!rateLimitCheck.allowed) {
      setError(rateLimitCheck.reason!);
      return;
    }

    const userMessage: ChatMessage = {
      type: 'user',
      text: inputMessage,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    recordMessage();
    setIsLoading(true);

    try {
      const conversationHistory = messages.slice(-8).map(msg => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.text
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: createSystemPrompt() },
            ...conversationHistory,
            { role: 'user', content: inputMessage }
          ]
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Request failed');
      }

      const botMessage: ChatMessage = {
        type: 'bot',
        text: data.message || data.fallback || 'Sorry, I had trouble processing that.',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);

    } catch (error: unknown) {
  console.error("Chat error:", error);

  let errorMessage = "Sorry, something went wrong.";

  if (error instanceof Error) {
    if (error.message.includes("429")) {
      errorMessage = "Too many requests. Please wait a moment and try again.";
    } else if (error.message.includes("400")) {
      errorMessage = "Please rephrase your question more clearly.";
    }
  }

  const errorMsg: ChatMessage = {
    type: "system",
    text: errorMessage,
    timestamp: new Date(),
  };

  setMessages((prev) => [...prev, errorMsg]);
} finally {
  setIsLoading(false);
}


    setInputMessage('');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg h-[600px] flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-xl">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2"/>
              <MessageCircle className="text-blue-600" />
              AI Career Assistant
              {/*<Sparkles className="text-purple-500" size={20} /> */}
            </div>
            <p className="text-gray-600 mt-1">
              Ask me about {profileData.name}'s professional background
            </p>
          </div>
          
          {/* Rate limit indicator */}
          {/*
          <div className="text-right">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Shield size={16} />
              <span>{messagesRemaining} messages left</span>
            </div>
            {isRateLimited && (
              <div className="text-xs text-amber-600 mt-1">
                Resets in {formatTimeRemaining(timeUntilReset)}
              </div>
            )}
          </div> /*/}
        </div>

        {/* Error display */}
        {error && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
            <AlertTriangle size={16} className="text-red-500" />
            <span className="text-red-700 text-sm">{error}</span>
          </div>
        )}
      

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-6 ${msg.type === 'user' ? 'text-right' : 'text-left'}`}>
            <div className={`inline-block p-4 rounded-2xl max-w-xs lg:max-w-lg whitespace-pre-line ${
              msg.type === 'user' 
                ? 'bg-blue-600 text-white rounded-br-md shadow-md'
                : msg.type === 'system'
                ? 'bg-yellow-50 text-yellow-800 border border-yellow-200 rounded-md'
                : 'bg-gray-50 text-gray-800 rounded-bl-md border border-gray-100 shadow-sm'
            }`}>
              {msg.text}
            </div>
            <div className={`text-xs text-gray-400 mt-1 ${msg.type === 'user' ? 'text-right' : 'text-left'}`}>
              {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="mb-6 text-left">
            <div className="inline-block p-4 bg-gray-50 rounded-2xl rounded-bl-md border border-gray-100">
              <div className="flex items-center gap-3">
                <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                <span className="text-gray-600">AI is thinking...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
        <div className="flex gap-3">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => {
              setInputMessage(e.target.value);
              setError(null);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder={isRateLimited ? 'Rate limited - please wait...' : 'Ask about skills, experience, or projects...'}
            disabled={isLoading || isRateLimited}
            maxLength={400}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100 transition-all"
          />
          <button 
            onClick={handleSendMessage}
            disabled={isLoading || !inputMessage.trim() || isRateLimited}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
          </button>
        </div>
        
        <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
          <span>{inputMessage.length}/400 characters</span>
          <span>Protected by rate limiting</span>
        </div>
      </div>
    </div>
  );
};

export default ChatSection;