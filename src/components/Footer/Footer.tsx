import React from 'react';
import { useNavigate } from 'react-router-dom';

type FooterProps = { email: string; github: string };

const Footer: React.FC<FooterProps> = ({ email, github }) => {
  const navigate = useNavigate();

   const handleScheduleClick = () => {
    navigate('/chat', { state: { initialPrompt: "I'd like to schedule a meeting." } });
  };

  return (
    <footer className="mt-16 text-center text-gray-600">
      <p>Built with React, Tailwind CSS, and passion for clean code ✨</p>
      <div className="flex justify-center gap-4 mt-4">
        <a href={`mailto:${email}`} className="text-blue-600 hover:text-blue-800">
          Email
        </a>
        <a href={`https://${github}`} className="text-blue-600 hover:text-blue-800">
          GitHub
        </a>
        <button
        onClick={handleScheduleClick}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
      >
        Schedule a Meeting
      </button>
      </div>
    </footer>
  );
};

export default Footer;
