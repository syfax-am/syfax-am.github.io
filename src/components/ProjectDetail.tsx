import React, { useCallback, useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { ChevronLeft, Github, ExternalLink, ChevronUp} from 'lucide-react'; // Add ChevronUp and X
import { projects } from '../data/projects';

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find(p => p.id === Number(id));
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [showEscPopup, setShowEscPopup] = useState(true);

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);
  
  // Scroll to top functionality
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-hide ESC popup after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowEscPopup(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // Add Escape key handler
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        navigate('/'); // Same as Back to Projects button
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <Link to="/" className="text-purple-400 hover:text-purple-300 inline-flex items-center">
            <ChevronLeft size={20} className="mr-2" /> Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
       {/* ESC Key Hint Popup */}
       {showEscPopup && (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="fixed top-6 left-0 right-0 flex justify-center z-50"
  >
    <div className="bg-zinc-800/90 backdrop-blur-sm rounded-lg p-4 text-sm text-center w-fit">
      <span>Press ESC to return home</span>
    </div>
  </motion.div>
)}

      {/* Scroll to Top Button */}
      {showScrollButton && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 bg-purple-500 hover:bg-purple-600 p-3 rounded-full text-white transition-all z-50"
        >
          <ChevronUp size={24} />
        </motion.button>
      )}
      {/* Particles Background */}
      <div className="absolute inset-0 z-0">
        <Particles
          id="tsparticles-project"
          init={particlesInit}
          options={{
            fullScreen: { enable: false, zIndex: 0 },
            background: { color: { value: "transparent" } },
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
                opacity: 0.08,
                width: 1,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: { default: "bounce" },
                random: false,
                speed: 1,
                straight: false,
              },
              number: {
                density: { enable: true, area: 1200 },
                value: 120,
              },
              opacity: { value: 0.08 },
              shape: { type: "circle" },
              size: { value: { min: 1, max: 5 } },
            },
            detectRetina: true,
          }}
          className="absolute inset-0"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-8"
        >
          <ChevronLeft size={20} className="mr-2" /> Back to Projects
        </Link>

        {/* Project Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-bold mb-6">{project.title}</h1>
          <p className="text-xl text-zinc-400">{project.fullDescription}</p>
        </motion.div>

        {/* Project Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-4 mb-12"
        >
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-full text-white transition-colors"
            >
              <Github size={20} className="mr-2" /> View Source
            </a>
          )}
          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-purple-500 hover:bg-purple-600 rounded-full text-white transition-colors"
            >
              <ExternalLink size={20} className="mr-2" /> Live Demo
            </a>
          )}
        </motion.div>

        {/* Project Images */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
        >
          {project.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${project.title} screenshot ${index + 1}`}
              className="rounded-lg shadow-lg"
            />
          ))}
        </motion.div>

        {/* Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold mb-6">Technologies Used</h2>
          <div className="flex flex-wrap gap-3">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-zinc-800 rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold mb-6">Key Features</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.features.map((feature, index) => (
              <li
                key={index}
                className="flex items-center bg-zinc-900 rounded-lg p-4"
              >
                <div className="w-2 h-2 bg-purple-400 rounded-full mr-3" />
                {feature}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Development Process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold mb-6">Development Process</h2>
          <p className="text-zinc-400">{project.process}</p>
        </motion.div>

        {/* Role and Impact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid md:grid-cols-2 gap-8"
        >
          <div>
            <h2 className="text-3xl font-bold mb-6">My Role</h2>
            <p className="text-zinc-400">{project.role}</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6">Impact</h2>
            <p className="text-zinc-400">{project.impact}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}