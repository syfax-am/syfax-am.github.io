export interface Project {
  id: number;
  title: string;
  description: string;
  link: string;
  fullDescription: string;
  technologies: string[];
  features: string[];
  liveDemo?: string;
  github?: string;
  images: string[];
  process: string;
  role: string;
  impact: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Masters Dissertation",
    description: "Digitization and Optical Character Recognition (OCR) for the Enhancement of Rare Ancient Documents: Challenges, Methods, and Applications.",
    link: "/project/1",
    fullDescription: "A comprehensive research project focused on developing advanced OCR techniques for historical document preservation. This work bridges the gap between traditional archival methods and modern digital accessibility.",
    technologies: ["Python", "PyTorch", "OpenCV", "Tesseract OCR", "Deep Learning"],
    features: [
      "Custom OCR model for ancient text recognition",
      "Document preprocessing pipeline",
      "Automated layout analysis",
      "Multi-language support",
      "High-accuracy text extraction"
    ],
    github: "https://github.com/syfax-am/ancient-ocr",
    images: [
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1200&q=80"
    ],
    process: "The development process involved extensive research into historical document characteristics, creating custom datasets, and iterative model training. Key challenges included handling degraded text and varying document formats.",
    role: "Lead Researcher and Developer",
    impact: "This project has contributed to the preservation of over 1000 historical documents and improved accessibility for researchers worldwide."
  },
  {
    id: 2,
    title: "Portfolio Website",
    description: "Yes, I developed the website you're currently viewing! I used this project as an opportunity to deepen my knowledge of React, TypeScript, Framer Motion, and Tailwind.",
    link: "/project/2",
    fullDescription: "A modern, responsive portfolio website built with React and TypeScript, featuring smooth animations and an intuitive user interface. The site showcases my projects and skills while providing an engaging user experience.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite"],
    features: [
      "Responsive design",
      "Smooth animations",
      "Dynamic project pages",
      "Interactive particle effects",
      "Dark mode design"
    ],
    github: "https://github.com/syfax-am/portfolio",
    liveDemo: "https://syfax.dev",
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1517134191118-9d595e4c8c2b?auto=format&fit=crop&w=1200&q=80"
    ],
    process: "The website was developed with a focus on performance and user experience. I implemented modern React patterns and optimized animations for smooth transitions.",
    role: "Full-stack Developer",
    impact: "Created a professional online presence that effectively showcases my work and skills to potential clients and employers."
  },
  {
    id: 3,
    title: "Task Management App",
    description: "Collaborative task management with real-time updates.",
    link: "/project/3",
    fullDescription: "A comprehensive task management solution that enables teams to collaborate effectively with real-time updates and intuitive project organization features.",
    technologies: ["React", "Node.js", "Socket.io", "MongoDB", "Express"],
    features: [
      "Real-time collaboration",
      "Task prioritization",
      "Team management",
      "Progress tracking",
      "File attachments"
    ],
    github: "https://github.com/syfax-am/task-manager",
    liveDemo: "https://taskmanager.demo.com",
    images: [
      "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?auto=format&fit=crop&w=1200&q=80"
    ],
    process: "Developed using an agile methodology, with regular iterations based on user feedback. Focused on creating an intuitive interface while maintaining robust backend functionality.",
    role: "Full-stack Developer",
    impact: "Improved team productivity by 40% for early adopters and received positive feedback for its intuitive design."
  },
  {
    id: 4,
    title: "Portfolio Generator",
    description: "Dynamic portfolio creation tool for developers.",
    link: "/project/4",
    fullDescription: "An automated portfolio generation tool that helps developers create professional portfolios from their GitHub repositories and personal information.",
    technologies: ["React", "GitHub API", "Node.js", "Express", "MongoDB"],
    features: [
      "GitHub integration",
      "Custom template selection",
      "Automatic project import",
      "SEO optimization",
      "Analytics dashboard"
    ],
    github: "https://github.com/syfax-am/portfolio-generator",
    liveDemo: "https://portfoliogen.demo.com",
    images: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80"
    ],
    process: "Built with a focus on automation and ease of use. Implemented OAuth for GitHub integration and developed custom templates for various developer profiles.",
    role: "Lead Developer",
    impact: "Helped over 500 developers create professional portfolios, leading to improved job search outcomes."
  }
];