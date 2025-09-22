import React from 'react';
import { Code } from 'lucide-react';
import { profileData } from '../data/profileData';
import ProjectCard from '../components/Projects/ProjectCard';

const Projects: React.FC = () => (
  <div>
    <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-2">
      <Code className="text-blue-600" />
      Featured Projects
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {profileData.projects.map((project, idx) => (
        <ProjectCard key={idx} project={project} />
      ))}
    </div>
  </div>
);

export default Projects;
