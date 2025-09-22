import React from 'react';
import type { Skill } from '../../types/profile';

type SkillBarProps = {
  skill: Skill;
};

const SkillBar: React.FC<SkillBarProps> = ({ skill }) => (
  <div className="mb-4">
    <div className="flex justify-between items-center mb-2">
      <h4 className="font-semibold text-gray-800">{skill.category}</h4>
      {/* <span className="text-sm text-gray-600">{skill.level}%</span> */}
    </div>
    <div className="bg-gray-200 rounded-full h-3">
      <div
        className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-1000 ease-out"
        style={{ width: `${skill.level}%` }}
      ></div>
    </div>
    <div className="flex flex-wrap gap-2 mt-2">
      {skill.items.map((item, idx) => (
        <span key={idx} className="px-2 py-1 bg-gray-100 rounded-md text-sm text-gray-700">
          {item}
        </span>
      ))}
    </div>
  </div>
);

export default SkillBar;
