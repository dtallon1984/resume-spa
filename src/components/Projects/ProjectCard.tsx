import React from 'react';
import type { Project } from '../../types/profile';
import { ExternalLink, Github } from 'lucide-react';

type ProjectCardProps = {
  project: Project;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => (
  <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
    <div className="text-6xl mb-4">{project.image}</div>
    <h3 className="text-xl font-bold text-gray-800 mb-2">{project.name}</h3>
    <p className="text-gray-600 mb-4">{project.description}</p>
    <div className="flex flex-wrap gap-2 mb-4">
      {project.tech.map((tech, idx) => (
        <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
          {tech}
        </span>
      ))}
    </div>
    <div className="flex gap-3">
      <a href={project.demoUrl} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        <ExternalLink size={16} />
        Live Demo
      </a>
      <a href={project.githubUrl} className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors">
        <Github size={16} />
        Code
      </a>
    </div>
  </div>
);

export default ProjectCard;
