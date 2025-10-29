import type { ProfileData } from '../types/profile';
//import { User, Briefcase, Code, MessageCircle, Zap, Award } from 'lucide-react';

export const profileData: ProfileData = {
  avatarUrl:"/headshot.jpg",
  name: "David Scott Tallon Jr.",
  title: "Technology Leader | Enterprise Solutions Architect | Full Stack Developer",
  email: "dtallon1984@gmail.com",
  phone: "+1(708)323-8561",
  location: "Thompson's Station, TN",
  github: "https://github.com/dtallon1984",
  summary: [
  "I’m a results-driven technology leader with over a decade of experience guiding organizations from startup through scale and acquisition. My sweet spot is where business strategy and deep technical execution intersect: defining the vision, setting the architecture, and building teams that deliver at speed.",
  "I thrive in cloud-based SaaS environments, particularly enterprise-grade platforms where scale, performance, and customer satisfaction are mission-critical. While industry verticals are less important to me, I’m especially energized by opportunities to apply AI, machine learning, and data science to drive new value — whether as a core capability or as a new feature set.",
  "My leadership philosophy centers on empowering autonomy. I encourage teams to trust their intuition, learn by doing, and fail fast — creating a culture where engineers grow quickly and innovation accelerates. I’m equally comfortable building teams from the ground up or joining an established team to learn their strengths and amplify their success.",
  "At the core, my strengths are dual: I’m a capable hands-on engineer who can dig into architecture and code, but my true talent is seeing the bigger picture — aligning technology with business goals and translating complex requirements into creative, scalable solutions. This balance is sharpened by my early experience in retail and service industries, which gave me a customer-first mindset I still apply today: every stakeholder, whether internal or external, is a customer of Engineering and IT.",
  "I’ve always been a tinkerer at heart. From taking apart electronics as a kid to tearing down applications today, I seek to understand how things work — and then make them better. That drive fuels my passion for building and scaling products, mentoring engineers, and helping organizations achieve ambitious outcomes."
],
skills: [
    { category: "Leadership", items: ["Team Building",
    "Mentoring & Coaching",
    "Strategic Planning",
    "Decision Making",
    "Conflict Resolution",
    "Cross-functional Collaboration",
    "Stakeholder Communication"], level: 99 },
    { category: "Frontend", items: [ "React",
    "TypeScript",
    "Next.js",
    "Tailwind CSS | CSS3 | PostCSS",
    "HTML5 & Semantic Markup",
    "Responsive & Mobile-first Design",
    "Accessibility (a11y)"], level: 87 },
    { category: "Backend", items:[
    ".NET / C#",
    "Node.js / Express",
    "Java",
    "SQL Server",
    "PostgreSQL",
    "MongoDB",
    "GraphQL",
    "RESTful API Design",
    "Microservices Architecture",
    "Caching (Redis, Memcached)",
    "Unit & Integration Testing"
  ], level: 95 },
    { category: "Cloud", items: ["Azure",
    "AWS",
    "Docker / Containers",
    "Kubernetes / Orchestration",
    "CI/CD Pipelines (GitHub Actions, Azure DevOps)",
    "Serverless Architecture (AWS Lambda, Azure Functions)",
    "Monitoring & Logging",
    "Infrastructure as Code (Terraform, ARM Templates)",
    "Cloud Security Best Practices"], level: 87 },
    { 
  category: "Machine Learning | AI", 
  items: [
    "Python", 
    "R", 
    "Pandas", 
    "NumPy", 
    "scikit-learn", 
    "TensorFlow", 
    "OpenAI API", 
    "Data Visualization (Matplotlib, Seaborn, Plotly)"
  ], 
  level: 85 
},
    { category: "Tools", items: [ "Git / GitHub / GitLab",
    "Python / Scripting",
    "Jest / Testing Library",
    "Webpack / Vite / Parcel",
    "Figma / Design Handoff",
    "Jira / Agile Tools",
    "Postman / API Testing",
    "VSCode / Productivity Plugins",
    "ESLint / Prettier / Code Quality",
    "Docker CLI / Compose"], level: 82 }
  ],
  experience: [
    {
      company: "BDP International / PSA Group",
      position: "Principal Enterprise Architect & Engineering Manager ",
      duration: "Aug 2021 - Present",
      description: "Led a cross-functional team integrating multiple internal platforms across legacy and new client systems, ensuring seamless transitions and high customer satisfaction.",
      achievements: ["Delivered cloud-native technology solutions that cut costs and met SLA commitments.", "Maintained high customer satisfaction throughout platform migrations.", "Guided a multi-team engineering group across diverse products.", "Built a real-time analytics platform and implemented CI/CD pipelines."]
    },
    {
      company: "Bridgenet Solutions, LLC",
      position: "Software Architect",
      duration: "Nov 2019 - Aug 2021",
      description: "Served as principal engineer and architect, building a team that delivered a lean, cutting-edge cloud solution from concept to scalable enterprise system. Mentored engineers while contributing hands-on to architecture and development.",
      achievements: ["Designed and implemented a scalable cloud platform that became the core of a large enterprise EDI integration system.", "Built and led a high-performing engineering team from scratch.", "Delivered a production-ready solution within the first year, leading to acquisition by an investment group and subsequently by BDP International." ]
    }, 
    {
      company: "Evolent Health",
      position: "Senior Software Engineering Manager",
      duration: "Mar 2016 - Oct 2019",
      description: "Led a cross-functional engineering team supporting and modernizing legacy healthcare platforms while delivering new applications to meet security and reporting requirements. Hired and mentored junior engineers to maintain high business and regulatory standards.",
      achievements: ["Mentored and developed junior engineers, fostering a high-performing team.", "Supported and optimized legacy on-prem solutions", "Built new reporting and analytics solutions to support government contract requirements"]
    },
    {
      company: "Zirmed",
      position: "Senior Software Engineer",
      duration: "Jul 2015 - Mar 2016",
      description: "Modernized a hospital billing application during an acquisition process, collaborating closely with business users and senior architects to improve usability and performance. Recognized by executive leadership for efficiency and high performance.",
      achievements: ["Modernized legacy healthcare billing applications using .NET and SQL Server.", "Improved page load performance by 50–80%, delivering a faster, more responsive UI.", "Collaborated with cross-functional teams to ensure high-quality software delivery.", "Received recognition from executive leadership for outstanding performance."]
    }
  ],
  projects: [
    {
      name: "Schema Scout EDI Platform",
      description: "Full Featured EDI translation and integration platform",
      tech: ["React", "Node.js", "MongoDB", "Auth0", "Tailwind"],
      demoUrl: "https://schema-scout.vercel.app/",
        githubUrl: "https://github.com/dtallon1984",
      image: "🛄"
    },
    {
      name: "WorkWithMe Task Manager",
      description: "Collaborative project management tool with real-time updates",
      tech: ["React", "Node.js", "MongoDB", "Auth0", "Tailwind"],
      demoUrl: "https://work-with-me-orcin.vercel.app/dashboard",
      githubUrl: "https://github.com/dtallon1984",
      image: "📋"
    },
    {
      name: "Demo Dashboard",
      description: "Demo dashboard application and components showcasing React and Tailwind skills",
      tech: ["React", "Tailwind", "Google Maps API", "DataTables"],
      demoUrl: "https://react-dashboard-demo-three.vercel.app/",
      githubUrl: "https://github.com/dtallon1984/react-dashboard-portfolio",
      image: "📊"
    }
  ],
  criteria: {
    salaryRange: "$225k - $275k",
    roleLevel: "Executive / Director",
    preferredTech: ["React", "Node.js", "TypeScript", "Azure", "AWS", "Mongo", "SQL", ".NET", "Python"],
    workStyle: "Remote or Hybrid",
    companySize: "50-500 employees"
  }
};
