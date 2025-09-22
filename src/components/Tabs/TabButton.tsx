import React from 'react';

type TabButtonProps = {
  id: string;
  icon: React.ComponentType<{ size?: number }>;
  label: string;
  isActive: boolean;
  onClick: (id: string) => void;
};

const TabButton: React.FC<TabButtonProps> = ({ id, icon: Icon, label, isActive, onClick }) => (
  <button
    onClick={() => onClick(id)}
    className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${
      isActive 
        ? 'bg-blue-600 text-white shadow-lg transform scale-105' 
        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
    }`}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </button>
);

export default TabButton;
