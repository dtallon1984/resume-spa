import React from 'react';
import { useNavigate } from 'react-router-dom';

type FooterProps = { email: string; github: string };

const Footer: React.FC<FooterProps> = ({ email, github }) => {
  const navigate = useNavigate();

   const handleScheduleClick = () => {
    navigate('/chat', { state: { initialPrompt: "I'd like to schedule a meeting." } });
  };
  const buttonClasses = "px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all text-sm flex items-center justify-center";

  return (
  <footer className="mt-8 py-4 border-t border-gray-200">
      <div className="flex justify-center items-center gap-4">
        <a
          href={`mailto:${email}`}
          className={buttonClasses}
        >
          Email
        </a>
        <a
          href={`https://${github}`}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClasses}
        >
          GitHub
        </a>
        <button
          onClick={handleScheduleClick}
          className={buttonClasses}
        >
          Schedule Meeting
        </button>
      </div>
    </footer>
  );
};

export default Footer;
