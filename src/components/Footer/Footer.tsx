import React from 'react';
import { useNavigate } from 'react-router-dom';

type FooterProps = { email: string; github: string };

const Footer: React.FC<FooterProps> = ({ email, github }) => {
  const navigate = useNavigate();

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
          onClick={() => navigate('/chat')}
          className="text-blue-600 hover:text-blue-800"
        >
          Schedule Discussion
        </button>
      </div>
    </footer>
  );
};

export default Footer;
