// hooks/useOpenAIChat.ts
import { useState, useCallback } from 'react';
import type { ProfileData } from '../types/profile';

interface ChatMessage {
  type: 'user' | 'bot' | 'system';
  text: string;
  timestamp: Date;
}

interface UseOpenAIChatProps {
  profileData: ProfileData;
  apiKey?: string;
}

export const useOpenAIChat = ({ profileData, apiKey }: UseOpenAIChatProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      type: 'bot',
      text: `Hi! I'm ${profileData.name}'s AI assistant. I can answer questions about their background, skills, projects, and career goals. What would you like to know?`,
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

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
- Offer to set up a meeting or call to discuss further when contextually appropriate

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
    if (!apiKey) {
      // Fallback to enhanced local response if no API key
      return generateLocalResponse(userMessage);
    }

    setIsLoading(true);
    
    const newUserMessage: ChatMessage = {
      type: 'user',
      text: userMessage,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newUserMessage]);

    try {
      const conversationHistory = messages.slice(-10).map(msg => ({
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
            { role: 'user', content: userMessage }
          ]
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      const botMessage: ChatMessage = {
        type: 'bot',
        text: data.message,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      
      // Fallback to local response
      const fallbackResponse = generateLocalResponse(userMessage);
      const botMessage: ChatMessage = {
        type: 'bot',
        text: fallbackResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateLocalResponse = (userMessage: string) => {
    // Enhanced local fallback (from the previous component)
    const lower = userMessage.toLowerCase();
    
    if (lower.includes('skill') || lower.includes('tech')) {
      return `${profileData.name} specializes in ${profileData.skills.map(s => s.category).join(', ')}. Their strongest technologies include ${profileData.skills.flatMap(s => s.items).slice(0, 5).join(', ')}. What specific technology interests you?`;
    }
    
    if (lower.includes('experience') || lower.includes('work')) {
      const currentRole = profileData.experience[0];
      return `${profileData.name} is currently a ${currentRole.position} at ${currentRole.company}. They've ${currentRole.description.toLowerCase()} Key achievements include: ${currentRole.achievements.slice(0, 2).join(' and ')}. Would you like to know more about their career journey?`;
    }
    
    if (lower.includes('project')) {
      const randomProject = profileData.projects[Math.floor(Math.random() * profileData.projects.length)];
      return `One of ${profileData.name}'s notable projects is ${randomProject.name} - ${randomProject.description} Built with ${randomProject.tech.join(', ')}. They have ${profileData.projects.length} featured projects total. Which type of project interests you most?`;
    }
    
    if (lower.includes('hire') || lower.includes('opportunity')) {
      return `${profileData.name} is exploring opportunities in the ${profileData.criteria.salaryRange} range for ${profileData.criteria.roleLevel} positions. They prefer ${profileData.criteria.workStyle} work with technologies like ${profileData.criteria.preferredTech.slice(0, 3).join(', ')}. Contact them at ${profileData.email} to discuss!`;
    }
    
    return `That's a great question! ${profileData.name} has a lot to offer. Feel free to ask about their technical skills, professional experience, portfolio projects, or what they're looking for in their next role. What interests you most?`;
  };

  return {
    messages,
    sendMessage,
    isLoading
  };
};