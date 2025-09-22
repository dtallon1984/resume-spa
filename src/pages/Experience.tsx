import React from 'react';
import { Briefcase, Award } from 'lucide-react';
import { profileData } from '../data/profileData';

const Experience: React.FC = () => (
  <div className="space-y-6">
    <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-2">
      <Briefcase className="text-blue-600" />
      Work Experience
    </h2>

    {profileData.experience.map((exp, idx) => (
      <div key={idx} className="bg-white rounded-xl p-8 shadow-lg">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-800">{exp.position}</h3>
            <p className="text-lg text-blue-600 font-semibold">{exp.company}</p>
          </div>
          <span className="px-3 py-1 bg-gray-100 rounded-full text-gray-600 text-sm">
            {exp.duration}
          </span>
        </div>
        <p className="text-gray-700 mb-4">{exp.description}</p>
        <div className="space-y-2">
          <h4 className="font-semibold text-gray-800 flex items-center gap-2">
            <Award size={16} className="text-yellow-500" />
            Key Achievements:
          </h4>
          <ul className="list-disc list-inside space-y-1 text-gray-700 ml-6">
            {exp.achievements.map((achievement, aidx) => (
              <li key={aidx}>{achievement}</li>
            ))}
          </ul>
        </div>
      </div>
    ))}
  </div>
);

export default Experience;
