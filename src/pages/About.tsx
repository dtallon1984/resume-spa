import React from 'react';
import { User, Zap } from 'lucide-react';
import { profileData } from '../data/profileData';
import SkillBar from '../components/Skills/SkillBar';

const About: React.FC = () => {
  const renderAvatar = () => {
    if (profileData.avatarUrl) {
      return (
        <img
          src={profileData.avatarUrl}
          alt={profileData.name}
          className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
        />
      );
    } else {
      const initials = profileData.name
        .split(' ')
        .map((n) => n[0])
        .join('');
      return (
        <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-4xl font-bold">
          {initials}
        </div>
      );
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        {renderAvatar()}
        <h1 className="text-4xl font-bold text-gray-800 mb-2">{profileData.name}</h1>
        <p className="text-xl text-gray-600 mb-6">{profileData.title}</p>
      </div>

      <div className="bg-white rounded-xl p-8 shadow-lg">
  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
    <User className="text-blue-600" />
    About Me
  </h2>
  {profileData.summary.map((para, idx) => (
    <p key={idx} className="text-gray-700 leading-relaxed text-lg mb-4">
      {para}
    </p>
  ))}
</div>

      <div className="bg-white rounded-xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Zap className="text-blue-600" />
          Skills & Technologies
        </h2>
        {profileData.skills.map((skill, idx) => (
          <SkillBar key={idx} skill={skill} />
        ))}
      </div>
    </div>
  );
};

export default About;
