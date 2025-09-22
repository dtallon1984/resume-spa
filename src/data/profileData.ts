import type { ProfileData } from '../types/profile';
//import { User, Briefcase, Code, MessageCircle, Zap, Award } from 'lucide-react';

export const profileData: ProfileData = {
  name: "David Scott Tallon Jr.",
  title: "Technology Leader | Enterprise Solutions Architect | Full Stack Developer",
  email: "dtallon1984@gmail.com",
  phone: "+1(708)323-8561",
  location: "Thompson's Station, TN",
  github: "https://github.com/dtallon1984",
  summary: "Results-driven technology leader with over a decade of experience guiding organizations from startup through scale and acquisition. " + 
            "I specialize in defining a clear technical vision, aligning engineering strategy with business goals, and building high-performing teams. " + 
            "My unique approach blends executive leadership with hands-on technical depth - I actively contribute to architecture and the code-base to accelerate delivery, strengthen credibility, and mentor my engineers.",
  skills: [
    { category: "Leadership", items: ["Team Building", "etc"], level: 99 },
    { category: "Frontend", items: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Vue.js"], level: 90 },
    { category: "Backend", items: ["Node.js", "Python", "PostgreSQL", "MongoDB", "GraphQL"], level: 95 },
    { category: "Cloud", items: ["Azure", "Docker", "Kubernetes", "CI/CD", "Serverless"], level: 90 },
    { category: "Tools", items: ["Git", "Jest", "Webpack", "Figma", "Jira"], level: 90 }
  ],
  experience: [
    {
      company: "BDP International / PSA Group",
      position: "Engineering Director",
      duration: "Aug 2021 - Present",
      description: "Led team of customer-facing dashboard serving 100k+ users. Reduced page load times by 40% through optimization.",
      achievements: ["Built real-time analytics platform", "Mentored 3 junior developers", "Implemented CI/CD pipeline"]
    },
    {
      company: "Bridgenet Solutions",
      position: "Software Architect",
      duration: "Nov 2019 - Aug 2021",
      description: "Balanced leadership with hands-on contributions to architecture and coding, reinforcing technical credibility and mentoring the team",
      achievements: ["Built payment processing system", "Designed responsive mobile-first UI", "Integrated third-party APIs"]
    }, 
    {
      company: "Evolent Health",
      position: "Senior Software Engineering Manager",
      duration: "Mar 2016 - Oct 2019",
      description: "Led team of customer-facing dashboard serving 100k+ users. Reduced page load times by 40% through optimization.",
      achievements: ["Built real-time analytics platform", "Mentored 3 junior developers", "Implemented CI/CD pipeline"]
    },
    {
      company: "Zirmed",
      position: "Senior Software Engineer",
      duration: "Jul 2015 - Mar 2016",
      description: "Balanced leadership with hands-on contributions to architecture and coding, reinforcing technical credibility and mentoring the team",
      achievements: ["Built payment processing system", "Designed responsive mobile-first UI", "Integrated third-party APIs"]
    }
  ],
  projects: [
    {
      name: "E-commerce Platform",
      description: "Full-featured online store with cart, payments, and admin dashboard",
      tech: ["React", "Node.js", "Stripe", "MongoDB"],
      demoUrl: "https://demo1.example.com",
      githubUrl: "https://github.com/alexjohnson/ecommerce",
      image: "🛍️"
    },
    {
      name: "Task Management App",
      description: "Collaborative project management tool with real-time updates",
      tech: ["Vue.js", "Express", "Socket.io", "PostgreSQL"],
      demoUrl: "https://demo2.example.com",
      githubUrl: "https://github.com/alexjohnson/taskmanager",
      image: "📋"
    },
    {
      name: "Weather Dashboard",
      description: "Beautiful weather app with forecasts and interactive maps",
      tech: ["React", "D3.js", "Weather API", "Tailwind"],
      demoUrl: "https://demo3.example.com",
      githubUrl: "https://github.com/alexjohnson/weather",
      image: "🌤️"
    }
  ],
  criteria: {
    salaryRange: "$120k - $180k",
    roleLevel: "Senior Developer / Tech Lead",
    preferredTech: ["React", "Node.js", "TypeScript", "AWS", "Python"],
    workStyle: "Remote or Hybrid",
    companySize: "50-500 employees"
  }
};
