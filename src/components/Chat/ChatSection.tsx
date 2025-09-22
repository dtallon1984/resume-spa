import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send } from 'lucide-react';
import type { ProfileData } from '../../types/profile';

type ChatSectionProps = {
  profileData: ProfileData;
};

const ChatSection: React.FC<ChatSectionProps> = ({ profileData }) => {
  const [chatMessages, setChatMessages] = useState([{ type: 'bot', text: 'Hi! I\'m here to help you learn about my skills and experience. Ask me anything!' }]);
  const [inputMessage, setInputMessage] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => chatEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => { scrollToBottom(); }, [chatMessages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    setChatMessages(prev => [...prev, { type: 'user', text: inputMessage }]);
    
    setTimeout(() => {
      setChatMessages(prev => [...prev, { type: 'bot', text: generateBotResponse(inputMessage) }]);
    }, 500);

    setInputMessage('');
  };

  const generateBotResponse = (msg: string) => {
    const lower = msg.toLowerCase();
    if (lower.includes('skills')) return `I specialize in ${profileData.skills.map(s => s.category).join(', ')}.`;
    if (lower.includes('experience')) return `I have ${profileData.experience.length} major roles, currently at ${profileData.experience[0].company}.`;
    if (lower.includes('project')) return `I've built ${profileData.projects.length} major projects.`;
    return "That's a great question! Ask me about skills, experience, or projects.";
  };

  return (
    <div className="bg-white rounded-xl shadow-lg h-96 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <MessageCircle className="text-blue-600" />
          Ask Me Anything!
        </h2>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        {chatMessages.map((msg, idx) => (
          <div key={idx} className={`mb-4 ${msg.type === 'user' ? 'text-right' : 'text-left'}`}>
            <div className={`inline-block p-3 rounded-lg max-w-xs lg:max-w-md ${
              msg.type === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="p-6 border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask me anything..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <button onClick={handleSendMessage} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatSection;
