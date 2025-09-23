import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, Briefcase, Code, MessageCircle, Download } from 'lucide-react';

const tabs = [
  { id: 'about', label: 'About', icon: User, path: '/' },
  { id: 'experience', label: 'Experience', icon: Briefcase, path: '/experience' },
  { id: 'projects', label: 'Projects', icon: Code, path: '/projects' },
  { id: 'chat', label: 'Chat with Me', icon: MessageCircle, path: '/chat' },
   { id: 'getpdf', label: 'PDF Resume', icon: Download, path: '/pdf' },
];

const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="mb-8">
      <div className="flex flex-wrap justify-center gap-4">
        {tabs.map(tab => {
  const Icon = tab.icon;
  const isActive = location.pathname === tab.path;

  // Special case for PDF download
  if (tab.id === 'getpdf') {
    return (
      <a
        key={tab.id}
        href="/davidtallon.pdf"        // path to your PDF in public folder
        download                  // forces download
        className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-300"
      >
        <Icon size={20} />
        <span className="font-medium">{tab.label}</span>
      </a>
    );
  }

  // Normal tab for SPA routes
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
