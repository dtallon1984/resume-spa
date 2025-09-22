import React from 'react';
import ChatSection from '../components/Chat/ChatSection';
import { profileData } from '../data/profileData';

const Chat: React.FC = () => {
  return (
    <div>
      <ChatSection profileData={profileData} />
    </div>
  );
};

export default Chat;
