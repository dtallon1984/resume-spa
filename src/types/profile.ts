export interface Skill {
  category: string;
  items: string[];
  level: number;
}

export interface Experience {
  company: string;
  position: string;
  duration: string;
  description: string;
  achievements: string[];
}

export interface Project {
  name: string;
  description: string;
  tech: string[];
  demoUrl: string;
  githubUrl: string;
  image: string;
}

export interface Criteria {
  salaryRange: string;
  roleLevel: string;
  preferredTech: string[];
  workStyle: string;
  companySize: string;
}

export interface ProfileData {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  summary: string;
  skills: Skill[];
  experience: Experience[];
  projects: Project[];
  criteria: Criteria;
}
