import React, { useState, useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link, useNavigate, useParams } from 'react-router-dom';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  Download,
  Calendar,
  Star,
  ChevronLeft,
  Database,
  Cpu,
  Code2,
  Layers,
  Globe
} from 'lucide-react';

// --- DATA: PROJECTS ---
const projectsData = [
  {
    id: 1,
    title: "Dakira: AI OCR for Historical Heritage",
    category: "Computer Vision & NLP",
    description: "An intelligent digitization platform for rare historical documents using Hybrid OCR and Deep Learning.",
    fullDescription: `
      Dakira is an innovative platform designed to preserve and valorize rare historical documents. It addresses the challenges of physical degradation and complex layouts in ancient prints using a specialized pipeline.
      
      The system moves beyond standard OCR by implementing a 'Diplomatic Reproduction' process, reconstructing documents visually faithful to the original while making the text fully searchable.
    `,
    features: [
      "Preprocessing: DnCNN for denoising & Hough Transform for deskewing",
      "Hybrid Recognition: Voting system combining PaddleOCR & Tesseract",
      "Diplomatic Reproduction: Layout & font reconstruction",
      "Smart Search: Lexical (BM25) + Semantic (BERT/MPNet) retrieval"
    ],
    technologies: ["Python", "PyTorch", "OpenCV", "PaddleOCR", "Tesseract", "Lucene", "FastAPI"],
    images: ["https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=1200&q=80"], // Placeholder for thesis image
    github: "https://github.com/syfax-am",
    link: "https://dakira.online/"
  },
  {
    id: 2,
  title: "Image2Text Engine",
  category: "SaaS / Web App",
  description: "An intelligent image captioning platform using BLIP models with SEO optimization and content safety features.",
  fullDescription: `
    Image2Text Engine is a comprehensive web application that transforms images into descriptive text using state-of-the-art BLIP (Bootstrapping Language-Image Pre-training) models. The platform provides both single image processing and batch processing capabilities, making it ideal for content creators, marketers, and developers.

    Key capabilities include:
    • Advanced image captioning using BLIP Base and BLIP Large models
    • Batch processing for multiple images via ZIP upload
    • Automatic SEO metadata generation (keywords and descriptions)
    • NSFW content detection and filtering
    • Content moderation for generated captions
    • Real-time processing with customizable parameters

    The application is built with a focus on user experience, featuring an intuitive Streamlit interface, comprehensive safety measures, and export functionality for batch results.
  `,
  features: [
    "Dual BLIP Model Support: Base & Large variants for optimal performance",
    "Batch Processing: Handle multiple images via ZIP upload with CSV/JSON export",
    "SEO Optimization: Automatic keyword extraction and meta description generation",
    "Safety Features: NSFW detection and content moderation",
    "Customizable Generation: Adjustable length, beam search, and creativity settings",
    "Real-time Processing: Instant results with progress indicators"
  ],
  technologies: [
    "Python", 
    "Streamlit", 
    "PyTorch", 
    "Transformers", 
    "BLIP Models", 
    "Sentence Transformers",
    "OpenCV", 
    "PIL", 
    "scikit-learn",
    "Hugging Face"
  ],
  images: [
    "https://raw.githubusercontent.com/syfax-am/Image2Text-Engine/refs/heads/main/assets/logo.png",
  ],
  github: "https://github.com/syfax-am/Image2Text-Engine",
  link: "https://image2text-engine.streamlit.app/"
  }
];

// --- COMPONENT: SCROLL TO TOP ---
function ScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === '/') {
      const savedPosition = sessionStorage.getItem('homeScrollPosition');
      if (savedPosition) {
        window.scrollTo(0, parseInt(savedPosition));
        sessionStorage.removeItem('homeScrollPosition');
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);
  return null;
}

// --- COMPONENT: PROJECT DETAIL ---
function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projectsData.find(p => p.id === Number(id));
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [showEscPopup, setShowEscPopup] = useState(true);

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);
  
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowEscPopup(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') navigate('/');
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [navigate]);

  if (!project) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <Link to="/" className="text-[#476da3] hover:text-[#6ea1e6] inline-flex items-center">
            <ChevronLeft size={20} className="mr-2" /> Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans">
       {showEscPopup && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed top-6 left-0 right-0 flex justify-center z-50 pointer-events-none"
        >
          <div className="bg-zinc-800/90 backdrop-blur-sm rounded-full px-6 py-2 text-sm text-zinc-300 border border-zinc-700 shadow-xl">
            Press <span className="font-bold text-white">ESC</span> to return home
          </div>
        </motion.div>
      )}

      {showScrollButton && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 bg-[#476da3] hover:bg-[#375580] p-3 rounded-full text-white transition-all z-50 shadow-lg shadow-blue-900/20"
        >
          <ChevronUp size={24} />
        </motion.button>
      )}

      <div className="absolute inset-0 z-0 opacity-20">
        <Particles
          id="tsparticles-project"
          init={particlesInit}
          options={{
            fullScreen: { enable: false, zIndex: 0 },
            background: { color: { value: "transparent" } },
            particles: {
              color: { value: "#ffffff" },
              links: { enable: true, color: "#ffffff", opacity: 0.1 },
              move: { enable: true, speed: 0.5 },
              number: { value: 40, density: { enable: true, area: 800 } },
              opacity: { value: 0.1 },
              size: { value: { min: 1, max: 3 } },
            },
          }}
          className="absolute inset-0"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 max-w-5xl">
        <Link
          to="/"
          className="inline-flex items-center text-zinc-400 hover:text-[#476da3] transition-colors mb-12 group"
        >
          <div className="p-2 rounded-full bg-zinc-900 group-hover:bg-zinc-800 mr-3 transition-colors">
            <ChevronLeft size={20} />
          </div>
          <span className="font-medium">Back to Projects</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-2 gap-12 mb-16"
        >
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-[#476da3]/10 text-[#476da3] rounded-full text-sm font-medium border border-[#476da3]/20">
                {project.category}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-zinc-400 text-transparent bg-clip-text">
              {project.title}
            </h1>
            <div className="flex flex-wrap gap-4 mb-8">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-[#476da3] hover:bg-[#375580] rounded-lg text-white font-medium transition-all shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40"
                >
                  <Globe size={20} className="mr-2" /> Live Demo
                </a>
              )}
              {project.github && (
              <a
                href={project.id === 1 ? "#" : project.github}
                target={project.id === 1 ? "_self" : "_blank"}
                rel="noopener noreferrer"
                className={`inline-flex items-center px-6 py-3 rounded-lg text-white font-medium transition-all border ${
                  project.id === 1 
                    ? "bg-zinc-600 cursor-not-allowed border-zinc-600 text-zinc-400" 
                    : "bg-zinc-800 hover:bg-zinc-700 border-zinc-700"
                }`}
                onClick={project.id === 1 ? (e) => e.preventDefault() : undefined}
              >
                <Github size={20} className="mr-2" /> 
                {project.id === 1 ? "Code Private" : "View Code"}
              </a>
            )}
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl bg-zinc-900">
            <img 
              src={project.images[0]} 
              alt={project.title} 
              className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/50 to-transparent pointer-events-none" />
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-zinc-900 text-[#476da3]">
                  <Database size={24} />
                </div>
                Overview
              </h2>
              <div className="prose prose-invert max-w-none text-zinc-400 leading-relaxed whitespace-pre-line text-lg">
                {project.fullDescription}
              </div>
            </motion.div>

            {project.features && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-zinc-900 text-[#476da3]">
                    <Layers size={24} />
                  </div>
                  Key Features
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {project.features.map((feature, idx) => (
                    <div key={idx} className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl flex items-start gap-3">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#476da3] shrink-0" />
                      <span className="text-zinc-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          <div className="md:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 sticky top-24"
            >
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Cpu size={20} className="text-[#476da3]" />
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span 
                    key={tech} 
                    className="px-3 py-1.5 bg-zinc-950 border border-zinc-800 text-zinc-300 rounded-lg text-sm hover:border-[#476da3]/50 hover:text-white transition-colors cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- COMPONENT: HOME PAGE ---
function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const { scrollY } = useScroll();
  
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const currentScroll = latest;
    setIsNavVisible(currentScroll < lastScrollY || currentScroll < 100);
    setLastScrollY(currentScroll);
    setShowScrollButton(currentScroll > 500);
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const technologies = [
    { name: 'Python', color: 'bg-blue-500/10 text-blue-400', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { name: 'SQL', color: 'bg-cyan-500/10 text-cyan-400', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
    { name: 'PyTorch', color: 'bg-orange-500/10 text-orange-400', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg' },
    { name: 'TensorFlow', color: 'bg-yellow-500/10 text-yellow-400', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
    { name: 'Scikit-Learn', color: 'bg-green-500/10 text-green-400', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg' },
    { name: 'Pandas', color: 'bg-red-500/10 text-red-400', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg' },
    { name: 'NumPy', color: 'bg-indigo-500/10 text-indigo-400', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg' },
    { name: 'Apache Spark', color: 'bg-gray-500/10 text-gray-400', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/apache-original.svg' },
    { name: 'AWS', color: 'bg-pink-500/10 text-pink-400', icon: 'https://img.icons8.com/?size=100&id=G0CnLqqcRBXl&format=png&color=FFFFFF' },
    { name: 'Docker', color: 'bg-blue-400/10 text-blue-300', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
    { name: 'Git', color: 'bg-orange-500/10 text-orange-400', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
    { name: 'Jupyter', color: 'bg-yellow-500/10 text-yellow-400', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg' }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-[#476da3] selection:text-white">
      {/* Navigation */}
      <motion.nav 
        initial={{ y: 0, x: "-50%" }}  
        animate={{ 
          y: isNavVisible ? 0 : -100,
          opacity: isNavVisible ? 1 : 0,
          x: "-50%"  
        }}
        transition={{ duration: 0.3 }}
        className="fixed left-1/2 top-8 md:top-14 z-50 bg-zinc-900/80 backdrop-blur-md rounded-lg md:rounded-full px-4 md:px-7 py-2 md:py-4 border border-zinc-800/50 text-base md:text-lg shadow-lg shadow-black/20"
      >
        <div className="flex items-center justify-center">
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2 hover:text-[#476da3] transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:flex space-x-8 px-4"
          >
            <a href="#home" className="hover:text-[#476da3] transition-colors font-medium">Home</a>
            <a href="#tech" className="hover:text-[#476da3] transition-colors font-medium">Tech Stack</a>
            <a href="#projects" className="hover:text-[#476da3] transition-colors font-medium">Projects</a>
            <a href="#about" className="hover:text-[#476da3] transition-colors font-medium">About</a>
            <a href="#contact" className="hover:text-[#476da3] transition-colors font-medium">Contact</a>
          </motion.div>
        </div>

        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: isMenuOpen ? 'auto' : 0, opacity: isMenuOpen ? 1 : 0 }}
          className="md:hidden overflow-hidden mt-2"
        >
          <div className="px-4 py-2 space-y-1">
            <a href="#home" className="block py-2 hover:text-[#476da3] transition-colors">Home</a>
            <a href="#tech" className="block py-2 hover:text-[#476da3] transition-colors">Tech Stack</a>
            <a href="#projects" className="block py-2 hover:text-[#476da3] transition-colors">Projects</a>
            <a href="#about" className="block py-2 hover:text-[#476da3] transition-colors">About</a>
            <a href="#contact" className="block py-2 hover:text-[#476da3] transition-colors">Contact</a>
          </div>
        </motion.div>
      </motion.nav>


      {/* Hero Section */}
      <header id="home" className="relative min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pt-28">
        <div className="absolute inset-0 z-0">
          <Particles
            id="tsparticles-home"
            init={particlesInit}
            options={{
              fullScreen: { enable: false, zIndex: 0 },
              background: { color: { value: "transparent" } },
              particles: {
                color: { value: "#ffffff" },
                links: { color: "#ffffff", distance: 150, enable: true, opacity: 0.05, width: 1 },
                move: { enable: true, speed: 0.8 },
                number: { value: 80, density: { enable: true, area: 1200 } },
                opacity: { value: 0.05 },
                size: { value: { min: 1, max: 3 } },
              },
            }}
            className="absolute inset-0"
          />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center text-center mb-20">
          <motion.div
            initial="initial"
            animate="animate"
            className="space-y-8"
          >
            <motion.div variants={fadeIn} className="relative inline-block mt-12">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#476da3] to-cyan-500 rounded-full opacity-20 blur"></div>
              <p className="relative text-zinc-300 text-lg sm:text-xl px-4">
                Hi, I'm Syfax.
              </p>
            </motion.div>

            <motion.h1
              variants={fadeIn}
              className="text-5xl sm:text-7xl font-bold tracking-tight"
            >
              <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 text-transparent bg-clip-text">
                Junior Data Scientist
              </span>
              <br />
              <span className="text-[#476da3] text-4xl sm:text-6xl mt-2 block">
                & ML Engineer
              </span>
            </motion.h1>

            <motion.p
              variants={fadeIn}
              className="text-zinc-400 text-lg sm:text-xl text-center mx-auto leading-relaxed"
            >
            I enjoy working with data, refining models, and deploying NLP and Computer Vision solutions.
            </motion.p>

            <motion.div
              variants={fadeIn}
              className="flex flex-col sm:flex-row gap-6 items-center justify-center pt-2"
            >
              <div className="flex gap-6 items-center">
                <a href="https://github.com/syfax-am" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-[#476da3] transition-colors transform hover:scale-110 duration-200">
                  <Github size={28} />
                </a>
                <a href="https://www.linkedin.com/in/syfax-ait-medjber/" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-[#476da3] transition-colors transform hover:scale-110 duration-200">
                  <Linkedin size={28} />
                </a>
                <a href="mailto:syfaxaitmedjber@gmail.com" className="text-zinc-400 hover:text-[#476da3] transition-colors transform hover:scale-110 duration-200">
                  <Mail size={28} />
                </a>
              </div>
              <a
                href="assets/CV_syfax-ait-medjber.pdf"
                download
                className="inline-flex items-center px-8 py-3 bg-[#476da3] hover:bg-[#375580] rounded-full text-white font-medium transition-all shadow-lg shadow-blue-900/25 hover:shadow-blue-900/40 hover:-translate-y-0.5"
              >
                Download CV <Download size={18} className="ml-2" />
              </a>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer text-zinc-500 hover:text-white transition-colors"
          onClick={() => document.getElementById("tech")?.scrollIntoView({ behavior: "smooth" })}
        >
          <ChevronDown size={24} />
        </motion.div>
      </header>

      {/* Technologies Section */}
      <section id="tech" className="py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="flex items-baseline gap-4 mb-16">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-bold"
          >
            Tech Stack
          </motion.h2>
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-zinc-600 font-medium italic"
          >
            & tools
          </motion.span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className={`${tech.color} p-4 rounded-xl text-center flex items-center justify-center gap-3 hover:scale-105 transition-all duration-300 cursor-default border border-transparent hover:border-white/10 hover:shadow-xl`}
            >
              <img src={tech.icon} alt={tech.name} className="w-6 h-6" />
              <span className="font-semibold text-sm sm:text-base">{tech.name}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-bold mb-16"
        >
          Featured Projects
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectsData.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group relative bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-700 transition-all duration-300 flex flex-col h-full"
            >
              <div className="aspect-video overflow-hidden relative">
                <div className="absolute inset-0 bg-[#476da3]/10 group-hover:bg-transparent transition-colors z-10" />
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 z-20">
                  <span className="px-3 py-1 bg-zinc-950/80 backdrop-blur text-xs font-bold text-white rounded-full border border-white/10">
                    {project.category}
                  </span>
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold mb-3 group-hover:text-[#476da3] transition-colors">
                  {project.title}
                </h3>
                <p className="text-zinc-400 mb-6 line-clamp-3 flex-grow leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-zinc-800">
                  <div className="flex gap-2">
                    {project.technologies.slice(0, 3).map(t => (
                      <span key={t} className="text-xs text-zinc-500 bg-zinc-950 px-2 py-1 rounded">
                        {t}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-xs text-zinc-500 bg-zinc-950 px-2 py-1 rounded">+{project.technologies.length - 3}</span>
                    )}
                  </div>
                  <Link
                    to={`/project/${project.id}`}
                    className="inline-flex items-center text-[#476da3] font-medium hover:text-white transition-colors"
                    onClick={() => sessionStorage.setItem('homeScrollPosition', window.scrollY.toString())}
                  >
                    View Details <ExternalLink size={16} className="ml-2" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="bg-zinc-900 rounded-3xl p-8 md:p-12 border border-zinc-800">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-[#476da3] rounded-2xl opacity-20 blur-xl"></div>
              <img
                src="https://media.licdn.com/dms/image/v2/D4D03AQFIvsn-6gzNmQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1731677331865?e=1765411200&v=beta&t=kRBov8BuuKqSR-gX7bIFd5qlW6TgbEDYtwoG53PW1OU"
                alt="Syfax Ait Medjber"
                className="relative rounded-xl object-cover w-full shadow-2xl border border-zinc-700/50 grayscale hover:grayscale-0 transition-all duration-500"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl sm:text-5xl font-bold mb-8">About Me</h2>
              
              <div className="space-y-6 text-lg text-zinc-400">
                <p className="leading-relaxed">
                  I am a Data Scientist driven by the challenge of turning raw data into actionable solutions. Over the last two years, I have moved beyond theory to master the full Machine Learning lifecycle. From data engineering to deploying models in NLP and Computer Vision.
                </p>
                
                <p className="leading-relaxed">
                  My approach combines technical rigor with creative problem-solving. I don't just build models; I build software that solves real-world problems. I am now looking for a dynamic environment where I can leverage my skills in Python, PyTorch, and Cloud computing to make a tangible impact.
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-6 mt-10">
                <div className="p-5 bg-zinc-950 rounded-xl border border-zinc-800 hover:border-[#476da3]/30 transition-colors text-center group">
                  <span className="block text-4xl font-bold text-[#476da3] group-hover:scale-110 transition-transform">5+</span>
                  <span className="text-sm text-zinc-500 font-medium uppercase tracking-wider mt-1">Years Coding</span>
                </div>
                <div className="p-5 bg-zinc-950 rounded-xl border border-zinc-800 hover:border-[#476da3]/30 transition-colors text-center group">
                  <span className="block text-4xl font-bold text-[#476da3] group-hover:scale-110 transition-transform">2+</span>
                  <span className="text-sm text-zinc-500 font-medium uppercase tracking-wider mt-1">Major Projects</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section with Particles */}
      <section id="contact" className="relative py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="absolute inset-0 z-0">
          <Particles
            id="tsparticles-contact"
            init={particlesInit}
            options={{
              fullScreen: { enable: false, zIndex: 0 },
              background: { 
                color: { 
                  value: "transparent" 
                }
              },
              fpsLimit: 120,
              interactivity: {
                events: {
                  onClick: { enable: true, mode: "push" },
                  onHover: { enable: true, mode: "repulse" },
                  resize: true,
                },
                modes: {
                  push: { quantity: 4 },
                  repulse: { distance: 200, duration: 0.4 },
                },
              },
              particles: {
                color: { value: "#ffffff" },
                links: {
                  color: "#ffffff",
                  distance: 150,
                  enable: true,
                  opacity: 0.1,
                  width: 1,
                },
                move: {
                  direction: "none",
                  enable: true,
                  outModes: { default: "bounce" },
                  random: false,
                  speed: 2,
                  straight: false,
                },
                number: {
                  density: { enable: true, area: 1200 },
                  value: 120,
                },
                opacity: { value: 0.1 },
                shape: { type: "circle" },
                size: { value: { min: 1, max: 5 } },
              },
              detectRetina: true,
            }}
            className="absolute inset-0"
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-2xl mx-auto text-center"
        >
          <h2 className="text-5xl font-bold mb-6">Get In Touch</h2>
          <p className="text-zinc-400 mb-8">
            Like what you see? Reach out via email to collaborate!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:syfaxaitmedjber@gmail.com"
              className="inline-flex items-center px-6 py-3 bg-[#476da3] hover:bg-[#375580] rounded-full text-white transition-colors"
            >
              Send Message <Mail size={20} className="ml-2" />
            </a>
            <a
              href="https://calendly.com/syfax-aitmedjber-pro/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-full text-white transition-colors"
            >
              Schedule a Call <Calendar size={20} className="ml-2" />
            </a>
          </div>
        </motion.div>
      </section>


      {/* Footer */}
      <footer className="bg-zinc-950 pt-20 pb-10 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 text-center">
            {/* Navigation Column */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">Navigation</h3>
              <ul className="space-y-4 text-zinc-500">
                <li><a href="#home" className="hover:text-[#476da3] transition-colors">Home</a></li>
                <li><a href="#projects" className="hover:text-[#476da3] transition-colors">Projects</a></li>
                <li><a href="#about" className="hover:text-[#476da3] transition-colors">About</a></li>
              </ul>
            </div>

            {/* Socials Column */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">Socials</h3>
              <div className="flex flex-col space-y-4 text-zinc-500 items-center">
                <a href="https://github.com/syfax-am" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-[#476da3] transition-colors">
                  <Github size={20} className="mr-3" /> GitHub
                </a>
                <a href="https://www.linkedin.com/in/syfax-ait-medjber/" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-[#476da3] transition-colors">
                  <Linkedin size={20} className="mr-3" /> LinkedIn
                </a>
                <a href="mailto:syfaxaitmedjber@gmail.com" className="flex items-center hover:text-[#476da3] transition-colors">
                  <Mail size={20} className="mr-3" /> Email
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-zinc-900 text-center text-zinc-600 text-sm">
            <p>© {new Date().getFullYear()} Syfax AIT MEDJBER. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-[#476da3] hover:bg-[#375580] p-3 rounded-full text-white transition-all shadow-xl z-50"
        >
          <ChevronUp size={24} />
        </button>
      )}
    </div>
  );
}

// --- APP COMPONENT ---
function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
      </Routes>
    </Router>
  );
}

export default App;