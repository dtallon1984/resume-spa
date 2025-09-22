import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, Briefcase, Code, MessageCircle } from 'lucide-react';

const tabs = [
  { id: 'about', label: 'About', icon: User, path: '/' },
  { id: 'experience', label: 'Experience', icon: Briefcase, path: '/experience' },
  { id: 'projects', label: 'Projects', icon: Code, path: '/projects' },
  { id: 'chat', label: 'Chat with Me', icon: MessageCircle, path: '/chat' },
];

const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="mb-8">
      <div className="flex flex-wrap justify-center gap-4">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = location.pathname === tab.path;
          return (
            <Link
              key={tab.id}
              to={tab.path}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-lg transform scale-105' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;
