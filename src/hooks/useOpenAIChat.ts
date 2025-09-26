import { useState, useCallback } from 'react';
import type { ProfileData } from '../types/profile';
import { useProtectedChat } from './useProtectedChat';

interface ChatMessage {
  type: 'user' | 'bot' | 'system';
  text: string;
  timestamp: Date;
}

interface UseOpenAIProtectedChatProps {
  profileData: ProfileData;
  apiKey?: string;

  // Optional chat protection options
  maxMessagesPerHour?: number;
  maxMessageLength?: number;
  cooldownMs?: number;
}

export const useOpenAIProtectedChat = ({ profileData, apiKey }: UseOpenAIProtectedChatProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      type: 'bot',
      text: `Hi! I'm ${profileData.name}'s AI assistant. I can answer questions about their background, skills, projects, and career goals. What would you like to know?`,
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const protectedChat = useProtectedChat({
    maxMessagesPerHour: 30,
    maxMessageLength: 500,
    cooldownMs: 2000
  });

const createSystemPrompt = useCallback(() => {
    return `You are an AI assistant representing ${profileData.name}, a ${profileData.title}. 

IMPORTANT INSTRUCTIONS:
- You can ONLY discuss information about ${profileData.name} based on the provided data
- Be conversational, friendly, and enthusiastic about ${profileData.name}'s qualifications
- If asked about topics outside of ${profileData.name}'s profile, politely redirect back to their professional background
- Don't make up or infer information not provided
- Speak in first person as if you're ${profileData.name}'s representative
- Keep responses concise but informative
- Always encourage follow-up questions
- When asked about ${profileData.name}'s skills or experience, highlight Backend development and cloud expertise
- If asked about your origins say that David created you to help people learn about his professional background and career goals
- If asked about availability or interest in a role, respond positively
- Offer to set up a meeting or call to discuss further when contextually appropriate
When the user requests to schedule a meeting:
- Gather their Name, Company, Role, Phone, and Email.
- Once you have all fields, respond with:
  1. A clear meeting request email template.
  2. A JSON object containing the details under a meetingRequest key.
- Format the response exactly as follows:{
    "action": "schedule_meeting",
    "data": { "name": "...", "company": "...", "role": "...", "phone": "...", "email": "..." },
    "draftEmail": "..."
  }

PROFILE INFORMATION:

Personal Info:
- Name: ${profileData.name}
- Title: ${profileData.title}  
- Email: ${profileData.email}
- Phone: ${profileData.phone}
- Location: ${profileData.location}
- GitHub: ${profileData.github}

Summary: ${profileData.summary}

Skills: ${profileData.skills.map(skill => 
  `${skill.category}: ${skill.items.join(', ')} (${skill.level}% proficiency)`
).join('\n')}

Experience: ${profileData.experience.map(exp => 
  `${exp.position} at ${exp.company} (${exp.duration}): ${exp.description}. Achievements: ${exp.achievements.join(', ')}`
).join('\n')}

Projects: ${profileData.projects.map(project => 
  `${project.name}: ${project.description} (Tech: ${project.tech.join(', ')})`
).join('\n')}

What ${profileData.name} is looking for:
- Salary Range: ${profileData.criteria.salaryRange}
- Role Level: ${profileData.criteria.roleLevel}
- Preferred Tech: ${profileData.criteria.preferredTech.join(', ')}
- Work Style: ${profileData.criteria.workStyle}
- Company Size: ${profileData.criteria.companySize}

Remember: Stay focused on this information and be enthusiastic about ${profileData.name}'s qualifications!`;
  }, [profileData]);

const sendMessage = async (userMessage: string) => {
  // 1. Validate message content
  const validation = protectedChat.validateMessage(userMessage);
  if (!validation.valid) {
    setMessages(prev => [
      ...prev,
      { type: 'bot', text: validation.reason ?? 'Invalid message.', timestamp: new Date() }
    ]);
    return;
  }

  // 2. Check rate limits
  const rateCheck = protectedChat.checkRateLimit();
  if (!rateCheck.allowed) {
    setMessages(prev => [
      ...prev,
      { type: 'bot', text: rateCheck.reason ?? 'You are sending messages too quickly.', timestamp: new Date() }
    ]);
    return;
  }

  // 3. Record the message (update counters)
  protectedChat.recordMessage();

  // 4. Add user message to chat
  const newUserMessage: ChatMessage = {
    type: 'user',
    text: userMessage,
    timestamp: new Date()
  };
  setMessages(prev => [...prev, newUserMessage]);

  setIsLoading(true);

  try {
    // Fallback if no API key
    if (!apiKey) {
      const botMessage: ChatMessage = {
        type: 'bot',
        text: generateLocalResponse(userMessage),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      return;
    }

    // Build conversation history
    const conversationHistory = messages.slice(-10).map(msg => ({
      role: msg.type === 'user' ? 'user' : 'assistant',
      content: msg.text
    }));

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [
          { role: 'system', content: createSystemPrompt() },
          ...conversationHistory,
          { role: 'user', content: userMessage }
        ]
      })
    });

    if (!response.ok) throw new Error('Failed to get response');

    const data = await response.json();

    let parsed;
    try {
      parsed = typeof data.message === "string" ? JSON.parse(data.message) : data;
    } catch {
      parsed = null; // Not JSON
    }

    if (parsed && parsed.action === "schedule_meeting" && parsed.data) {
      // ✅ Show the draft email
      setMessages(prev => [
        ...prev,
        {
          type: 'bot',
          text: `📧 Here’s a draft email:\n\n${parsed.draftEmail}`,
          timestamp: new Date()
        }
      ]);

      // ✅ Send the email via API
      try {
        await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(parsed.data),
        });
        setMessages(prev => [
          ...prev,
          { type: 'system', text: "✅ Meeting request sent successfully!", timestamp: new Date() }
        ]);
      } catch (err) {
        console.error("Email API failed", err);
        setMessages(prev => [
          ...prev,
          { type: 'system', text: "⚠️ Could not send the email, please try again later.", timestamp: new Date() }
        ]);
      }
    } else {
      // Normal response
      const botMessage: ChatMessage = {
        type: 'bot',
        text: data.message || "Sorry, I didn’t quite get that.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }

  } catch (error) {
    console.error('Chat error:', error);
    const fallbackMessage: ChatMessage = {
      type: 'bot',
      text: generateLocalResponse(userMessage),
      timestamp: new Date()
    };
    setMessages(prev => [...prev, fallbackMessage]);
  } finally {
    setIsLoading(false);
  }
};


  const generateLocalResponse = (userMessage: string) => {
    const lower = userMessage.toLowerCase();
    if (lower.includes('skill')) {
      return `${profileData.name} specializes in ${profileData.skills.map(s => s.category).join(', ')}.`;
    }
    if (lower.includes('experience')) {
      const currentRole = profileData.experience[0];
      return `${profileData.name} is currently a ${currentRole.position} at ${currentRole.company}.`;
    }
    return `That's a great question! ${profileData.name} has a lot to offer.`;
  };

  return {
     messages,
  sendMessage,
  isLoading,
  createSystemPrompt, 
  messagesRemaining: protectedChat.messagesRemaining,
  isRateLimited: protectedChat.isRateLimited,
  checkRateLimit: protectedChat.checkRateLimit,
  validateMessage: protectedChat.validateMessage,
  recordMessage: protectedChat.recordMessage
  };
};
