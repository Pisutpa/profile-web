import { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Download, User, GraduationCap, Brain, Wrench, Briefcase, ExternalLink, Github, Code, Database, Server, Monitor, Zap } from 'lucide-react';

function Navbar() {
  return (
    <nav className="bg-gray-900/90 backdrop-blur-md shadow-2xl sticky top-0 z-50 border-b border-purple-500/30">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Portfolio
            </span>
          </div>
          <div className="hidden md:flex space-x-6">
            <a href="#about" className="text-gray-300 hover:text-purple-400 transition-colors duration-300">About</a>
            <a href="#projects" className="text-gray-300 hover:text-purple-400 transition-colors duration-300">Projects</a>
            <a href="#skills" className="text-gray-300 hover:text-purple-400 transition-colors duration-300">Skills</a>
            <a href="#experience" className="text-gray-300 hover:text-purple-400 transition-colors duration-300">Experience</a>
            <a href="#contact" className="text-gray-300 hover:text-purple-400 transition-colors duration-300">Contact</a>
          </div>
        </div>
      </div>
    </nav>
  );
}

function AnimatedSection({ children, delay = 0 }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}>
      {children}
    </div>
  );
}

function ImageModal({ isOpen, onClose, images, currentIndex, onIndexChange, title }) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setScale(prev => Math.max(0.5, Math.min(3, prev + delta)));
  };

  const handleMouseDown = (e) => {
    if (scale > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const resetTransform = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const nextImage = () => {
    if (currentIndex < images.length - 1) {
      onIndexChange(currentIndex + 1);
      resetTransform();
    }
  };

  const prevImage = () => {
    if (currentIndex > 0) {
      onIndexChange(currentIndex - 1);
      resetTransform();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, images.length]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm flex items-center justify-center">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent p-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div>
            <h3 className="text-white text-lg font-semibold">{title}</h3>
            <p className="text-gray-300 text-sm">{currentIndex + 1} of {images.length}</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-white text-sm">Zoom: {Math.round(scale * 100)}%</span>
            <button
              onClick={() => setScale(prev => Math.max(0.5, prev - 0.2))}
              className="text-white hover:text-purple-400 p-2 rounded-lg bg-white/10 backdrop-blur-sm"
            >
              -
            </button>
            <button
              onClick={() => setScale(prev => Math.min(3, prev + 0.2))}
              className="text-white hover:text-purple-400 p-2 rounded-lg bg-white/10 backdrop-blur-sm"
            >
              +
            </button>
            <button
              onClick={resetTransform}
              className="text-white hover:text-purple-400 p-2 rounded-lg bg-white/10 backdrop-blur-sm text-sm"
            >
              Reset
            </button>
            <button
              onClick={onClose}
              className="text-white hover:text-red-400 text-2xl p-2 rounded-lg bg-white/10 backdrop-blur-sm"
            >
              ×
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {currentIndex > 0 && (
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:text-purple-400 p-3 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-all"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {currentIndex < images.length - 1 && (
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:text-purple-400 p-3 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-all"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Image Container */}
      <div
        className="relative max-w-[90vw] max-h-[80vh] overflow-hidden cursor-grab active:cursor-grabbing"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <img
          src={images[currentIndex]}
          alt={`${title} - Image ${currentIndex + 1}`}
          className="max-w-full max-h-full object-contain select-none"
          style={{
            transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
            transition: isDragging ? 'none' : 'transform 0.1s ease-out'
          }}
          draggable={false}
        />
      </div>

      {/* Image Dots Navigation */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                onIndexChange(index);
                resetTransform();
              }}
              className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? 'bg-purple-400 w-6' : 'bg-white/50 hover:bg-white/80'
                }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
function ProjectCard({ title, description, tech, github, images = [], delay = 0 }) {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Auto slideshow for preview
  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex(prev => (prev + 1) % images.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [images.length]);

  const openModal = (index = currentImageIndex) => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div
        className={`bg-gray-800/50 backdrop-blur-md p-6 rounded-2xl border border-gray-700/50 hover:border-purple-500/50 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20`}
        style={{ animationDelay: `${delay * 0.1}s` }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative mb-4 rounded-xl overflow-hidden group cursor-pointer" onClick={openModal}>
          {images.length > 0 ? (
            <>
              <img
                src={images[currentImageIndex]}
                alt={`${title} - Preview`}
                className={`w-full h-48 object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
              />
              {/* Image Counter */}
              {images.length > 1 && (
                <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                  {currentImageIndex + 1}/{images.length}
                </div>
              )}
              {/* View Gallery Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/20 backdrop-blur-sm rounded-full p-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            </>
          ) : (
            <div className="w-full h-48 bg-gray-700 rounded-xl flex items-center justify-center">
              <span className="text-gray-400">No Image Available</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
        </div>

        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-300 mb-4 text-sm leading-relaxed">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tech.map((t, index) => (
            <span key={index} className="px-3 py-1 bg-gradient-to-r from-purple-600/30 to-cyan-600/30 text-purple-300 rounded-full text-xs border border-purple-500/30">
              {t}
            </span>
          ))}
        </div>
        <a
          href={github}
          className="inline-flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github className="w-4 h-4" />
          <span className="text-sm">View on GitHub</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        images={images}
        currentIndex={currentImageIndex}
        onIndexChange={setCurrentImageIndex}
        title={title}
      />
    </>
  );
}
function SkillBadge({ skill, icon: Icon, delay = 0 }) {
  return (
    <div
      className={`flex items-center space-x-2 bg-gray-800/50 backdrop-blur-md px-4 py-3 rounded-xl border border-gray-700/50 hover:border-purple-500/50 transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20`}
      style={{ animationDelay: `${delay * 0.05}s` }}
    >
      {Icon && <Icon className="w-5 h-5 text-purple-400" />}
      <span className="text-gray-300 font-medium">{skill}</span>
    </div>
  );
}

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const projects = [
    {
      title: "KPI Management System",
      description: "A comprehensive web-based KPI management system built with modern React architecture and PostgreSQL database. Features responsive design, real-time data visualization, and efficient backend API.",
      tech: ["React", "Tailwind CSS", "Node.js", "Express.js", "PostgreSQL", "Lucide"],
      github: "https://github.com/pisutpa/kpi_management_system",
      images: [
        "src/assets/kpi/Screenshot 2025-06-02 112639.png",
        "src/assets/kpi/Screenshot 2025-06-02 112900.png",
        "src/assets/kpi/Screenshot 2025-06-02 112915.png",
        "src/assets/kpi/Screenshot 2025-06-02 113314.png",
        "src/assets/kpi/Screenshot 2025-06-02 113347.png",
        "src/assets/kpi/Screenshot 2025-06-02 113448.png",
        "src/assets/kpi/Screenshot 2025-06-02 113748.png",
        "src/assets/kpi/Screenshot 2025-06-02 113808.png",
        "src/assets/kpi/Screenshot 2025-06-02 113821.png",
        "src/assets/kpi/Screenshot 2025-06-02 113831.png",
      ]

    },
    {
      title: "Disaster Prediction & Alert API",
      description: "Advanced RESTful API system for disaster prediction and emergency alerts. Integrates multiple notification channels and external data sources with robust caching and logging systems.",
      tech: ["Express.js", "Prisma", "Redis", "SendGrid", "Axios", "Winston"],
      github: "https://github.com/pisutpa/Disaster_api",
      image: "/api/placeholder/400/240"
    },
    {
      title: "Power Consumption Monitoring Web Application",
      description: "Developed a responsive UI using Bootstrap and CSS to display real-time energy data. Integrated backend data from Node.js APIs and MySQL database. Visualized energy usage trends with Chart.js, built reusable UI components, and ensured cross-browser compatibility.",
      tech: ["Codeigniter (PHP)", "CSS", "Bootstrap", "Node.js", "MySQL", "Chart.js"],
     
      images: [
        "src/assets/elec/Screenshot 2025-06-02 130513.png",
        "src/assets/elec/Screenshot 2025-06-02 130554.png",
        "src/assets/elec/Screenshot 2025-06-02 130613.png",
        "src/assets/elec/Screenshot 2025-06-02 130650.png",

      ]   // เพิ่มลิงก์รูปภาพโปรเจกต์ถ้ามี
    },

    {
      title: "Controlling Electricity Consumption With LoRaWAN Technology",
      description: "Developed a responsive UI using Angular, HTML, CSS, and Bootstrap to visualize real-time electricity consumption data collected via LoRaWAN technology. Collaborated with backend systems using Node-RED and SQLite, focusing on creating a user-friendly dashboard.",
      tech: ["Angular", "HTML", "CSS", "Bootstrap", "Node-RED", "SQLite"],
     
      images: [
        "src/assets/project end/Screenshot 2025-06-02 124458.png",
        "src/assets/project end/Screenshot 2025-06-02 124559.png",
        "src/assets/project end/Screenshot 2025-06-02 124629.png",
        "src/assets/project end/Screenshot 2025-06-02 124647.png",
        "src/assets/project end/Screenshot 2025-06-02 124709.png",


      ]   // ใส่ลิงก์หรือ path รูปภาพโปรเจกต์ ถ้ามี
    }


  ];

  const technicalSkills = [
    { name: "JavaScript", icon: Code },
    { name: "React", icon: Code },
    { name: "Node.js", icon: Server },
    { name: "Express.js", icon: Server },
    { name: "Angular", icon: Code },
    { name: "PostgreSQL", icon: Database },
    { name: "MongoDB", icon: Database },
    { name: "MySQL", icon: Database },
    { name: "Prisma", icon: Database },
    { name: "Redis", icon: Database },
    { name: "HTML/CSS", icon: Monitor },
    { name: "Tailwind CSS", icon: Monitor }
  ];

  const tools = [
    "GitHub", "Postman", "DBeaver", "XAMPP", "VSCode"
  ];

  const softSkills = [
    "Clear Communication", "Adaptability", "Teamwork", "Problem Solving", "Critical Thinking", "Time Management"
  ];

  return (
    <div className="font-sans text-gray-100 bg-gray-900 min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-purple-600/10 to-cyan-600/10 rounded-full blur-3xl"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            left: '10%',
            top: '20%'
          }}
        />
        <div
          className="absolute w-80 h-80 bg-gradient-to-r from-cyan-600/10 to-purple-600/10 rounded-full blur-3xl"
          style={{
            transform: `translate(${mousePosition.x * -0.015}px, ${mousePosition.y * -0.015}px)`,
            right: '10%',
            bottom: '20%'
          }}
        />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <Navbar />

      <main className="relative z-10 p-6 max-w-6xl mx-auto">
        {/* HERO */}
        <AnimatedSection delay={100}>
          <section className="text-center mb-16 py-20">
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
              {/* <img
                src="/profile.jpg"
                alt="Pisut Palapol"
                className="relative max-w-[180px] h-auto mx-auto rounded-full shadow-2xl ring-4 ring-purple-500/50 transform hover:scale-105 transition-transform duration-500"
              /> */}
            </div>
            <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Pisut Palapol
            </h1>
            <p className="text-xl text-gray-300 mb-2">
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent font-bold">
                Backend Developer | Frontend Developer
              </span>
            </p>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
              Passionate full-stack developer focused on building efficient, scalable solutions with modern technologies
            </p>
            <a
              href="/public/Pisut_Palapol_Resume.pdf"
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white py-4 px-8 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 font-medium"
              download
            >
              <Download className="w-5 h-5" />
              <span>Download Resume</span>
            </a>
          </section>
        </AnimatedSection>

        {/* OBJECTIVE */}
        <AnimatedSection delay={200}>
          <section id="about" className="mb-16 bg-gray-800/30 backdrop-blur-md p-8 rounded-3xl border border-gray-700/50">
            <div className="flex items-center mb-6">
              <User className="w-8 h-8 text-purple-400 mr-3" />
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Objective
              </h2>
            </div>
            <p className="text-gray-300 leading-relaxed text-lg">
              I have a passion for coding and software development, with a strong commitment to continuously improving my technical skills.
              I focus on designing and building efficient solutions in challenging work environments, adapting quickly to new technologies
              and collaborating effectively with teams to deliver high-quality results.
            </p>
          </section>
        </AnimatedSection>

        {/* PROJECTS */}
        <AnimatedSection delay={300}>
          <section id="projects" className="mb-16">
            <div className="flex items-center mb-8">
              <Briefcase className="w-8 h-8 text-purple-400 mr-3" />
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Featured Projects
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.title}
                  title={project.title}
                  description={project.description}
                  tech={project.tech}
                  github={project.github}
                  image={project.images?.[0]} // รูปแรก
                  images={project.images}     // ส่งทั้งหมด
                  delay={index}
                />
              ))}
            </div>
          </section>
        </AnimatedSection>

        {/* EXPERIENCE */}
        <AnimatedSection delay={400}>
          <section id="experience" className="mb-16 bg-gray-800/30 backdrop-blur-md p-8 rounded-3xl border border-gray-700/50">
            <div className="flex items-center mb-8">
              <Briefcase className="w-8 h-8 text-purple-400 mr-3" />
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Experience
              </h2>
            </div>

            <div className="space-y-8">
              {/* Full-Stack Developer */}
              <div className="border-l-2 border-purple-500 pl-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold text-white">Full-Stack Developer</h3>
                  <span className="text-purple-400 font-medium">May 2025 - Mar 2025</span>
                </div>
                <p className="text-gray-400 mb-3">Personal Project - Self-learning</p>
                <p className="text-gray-300 mb-3">KPI Management System</p>
                <ul className="text-gray-300 space-y-1 text-sm">
                  <li>• Designed and developed KPI management web system using React and Tailwind CSS</li>
                  <li>• Built responsive and user-friendly frontend with modern UI/UX principles</li>
                  <li>• Developed robust backend with Node.js, Express.js, and PostgreSQL</li>
                </ul>
              </div>

              {/* Backend Developer */}
              <div className="border-l-2 border-cyan-500 pl-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold text-white">Backend Developer</h3>
                  <span className="text-cyan-400 font-medium">May 2025 - May 2025</span>
                </div>
                <p className="text-gray-400 mb-3">Personal Project - Self-learning</p>
                <p className="text-gray-300 mb-3">Disaster Prediction and Alert API</p>
                <ul className="text-gray-300 space-y-1 text-sm">
                  <li>• Developed RESTful API with Express.js and Prisma ORM</li>
                  <li>• Implemented caching with Redis and integrated SendGrid notifications</li>
                  <li>• Maintained comprehensive logging using Morgan and Winston</li>
                </ul>
              </div>

              <div className="border-l-2 border-yellow-500 pl-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold text-white">Front-end Developer – Bachelor’s Project</h3>
                  <span className="text-yellow-500 font-medium">Dec 2022 – Jan 2023</span>
                </div>
                <p className="text-gray-400 mb-3">, RMUTI Khon Kaen</p>
                <p className="text-gray-300 mb-3">: Controlling Electricity Consumption With LoRaWAN Technology</p>
                <ul className="text-gray-300 space-y-1 text-sm">
                  <li>• Developed responsive UI with Angular, HTML, CSS, Bootstrap</li>
                  <li>• Visualized real-time electricity consumption data via LoRaWAN</li>
                  <li>• Collaborated with backend system using Node-RED and SQLite</li>
                  <li>• Focused on user-friendly dashboard design</li>
                </ul>
              </div>

              {/* Internship */}
              <div className="border-l-2 border-green-500 pl-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold text-white">Frontend Developer - Internship</h3>
                  <span className="text-green-400 font-medium">Jun 2021 - Oct 2021</span>
                </div>
                <p className="text-gray-400 mb-3">Electronic Shell Co., Ltd.</p>
                <p className="text-gray-300 mb-3">Power Consumption Monitoring Web Application</p>
                <ul className="text-gray-300 space-y-1 text-sm">
                  <li>• Developed responsive UI with Bootstrap and CSS for real-time energy data</li>
                  <li>• Integrated data visualization using Chart.js and MySQL APIs</li>
                  <li>• Built reusable UI components ensuring cross-browser compatibility</li>
                </ul>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* SKILLS */}
        <AnimatedSection delay={500}>
          <section id="skills" className="mb-16">
            <div className="flex items-center mb-8">
              <Brain className="w-8 h-8 text-purple-400 mr-3" />
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Skills & Technologies
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Technical Skills */}
              <div className="bg-gray-800/30 backdrop-blur-md p-6 rounded-2xl border border-gray-700/50">
                <h3 className="text-xl font-semibold mb-4 text-purple-400 flex items-center">
                  <Code className="w-5 h-5 mr-2" />
                  Technical Skills
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {technicalSkills.map((skill, index) => (
                    <SkillBadge key={skill.name} skill={skill.name} icon={skill.icon} delay={index} />
                  ))}
                </div>
              </div>

              {/* Tools & Others */}
              <div className="space-y-6">
                <div className="bg-gray-800/30 backdrop-blur-md p-6 rounded-2xl border border-gray-700/50">
                  <h3 className="text-xl font-semibold mb-4 text-cyan-400 flex items-center">
                    <Wrench className="w-5 h-5 mr-2" />
                    Tools & Platforms
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {tools.map((tool, index) => (
                      <span key={tool} className="px-3 py-2 bg-gray-700/50 text-gray-300 rounded-lg text-sm border border-gray-600/50">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-800/30 backdrop-blur-md p-6 rounded-2xl border border-gray-700/50">
                  <h3 className="text-xl font-semibold mb-4 text-green-400 flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Soft Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {softSkills.map((skill, index) => (
                      <span key={skill} className="px-3 py-2 bg-green-900/30 text-green-300 rounded-lg text-sm border border-green-600/30">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* EDUCATION */}
        <AnimatedSection delay={600}>
          <section className="mb-16 bg-gray-800/30 backdrop-blur-md p-8 rounded-3xl border border-gray-700/50">
            <div className="flex items-center mb-6">
              <GraduationCap className="w-8 h-8 text-purple-400 mr-3" />
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Education
              </h2>
            </div>
            <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 p-6 rounded-2xl border border-gray-600/50">
              <h3 className="font-bold text-xl text-white mb-2">🎓 Bachelor of Engineering (B.Eng.)</h3>
              <p className="text-purple-400 font-medium mb-1">Computer Engineering</p>
              <p className="text-gray-300">Rajamangala University of Technology Isan, Khon Kaen Campus</p>
              <p className="text-gray-400 text-sm">May 2018 - March 2025</p>
            </div>
          </section>
        </AnimatedSection>

        {/* CONTACT */}
        <AnimatedSection delay={700}>
          <section id="contact" className="bg-gray-800/30 backdrop-blur-md p-8 rounded-3xl border border-gray-700/50">
            <div className="flex items-center mb-8">
              <Mail className="w-8 h-8 text-purple-400 mr-3" />
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Get In Touch
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-center p-4 bg-gray-700/30 rounded-2xl border border-gray-600/50">
                <Phone className="w-6 h-6 text-green-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-400">Phone</p>
                  <p className="font-semibold text-white">064-610-3570</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-gray-700/30 rounded-2xl border border-gray-600/50">
                <Mail className="w-6 h-6 text-blue-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="font-semibold text-white">pisut.pa2@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-gray-700/30 rounded-2xl border border-gray-600/50">
                <MapPin className="w-6 h-6 text-purple-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-400">Location</p>
                  <p className="font-semibold text-white">Khon Kaen, Thailand</p>
                </div>
              </div>
            </div>
            <div className="mt-6 p-4 bg-gray-700/30 rounded-2xl border border-gray-600/50">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-gray-400 mr-2 mt-1" />
                <p className="text-gray-300 text-sm">27, Moas, Non Khong Subdistrict, Ban Fang District, Khon Kaen 40270, Thailand</p>
              </div>
            </div>
          </section>
        </AnimatedSection>
      </main>
    </div>
  );
}

export default App;