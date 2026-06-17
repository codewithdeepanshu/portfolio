import React, { useState, useEffect } from 'react';
import { 
  Menu, X, ArrowRight, Mail, 
  MapPin, ExternalLink, Briefcase, Code, User, 
  Send, CheckCircle, AlertCircle, Terminal, 
  Database, Layers, Cpu, Heart, Award, BookOpen, Phone,
  Settings, Bot, TrendingUp, Sparkles, Check, Workflow, Palette
} from 'lucide-react';
// Dynamic backend URL configuration (defaults to local Django for dev, configurable via environment variable in production)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

// Inline SVGs for brand icons to ensure cross-version compatibility
const GithubIcon = ({ size = 20, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 20, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// Typewriter Roles Array - Deepanshu Gautam
const ROLES = [
  "AI Agent Engineer",
  "Python Developer",
  "Django Backend Engineer",
  "Machine Learning Enthusiast"
];

// Freelance Services Offered (Refined for AI Agents & Duo)
const SERVICES_DATA = [
  {
    icon: <Bot size={26} />,
    title: "AI Agent & LLM Orchestration",
    desc: "Engineering autonomous agentic systems that use function calling, vector storage, custom memory modules, and web tools to automate cognitive pipelines.",
    bullets: [
      "Multi-agent workflow design (LangChain/CrewAI)",
      "Secure LLM Tool Calling & API integration",
      "Vector search (RAG) & semantic database retrieval"
    ]
  },
  {
    icon: <Settings size={26} />,
    title: "Django & Flask API Development",
    desc: "Architecting high-performance, secure, and clean RESTful API systems tailored for mobile frontends or single page web applications.",
    bullets: [
      "Custom authentication & JWT setups",
      "Optimized SQL databases (MySQL/Postgres)",
      "Secure backend architecture"
    ]
  },
  {
    icon: <Palette size={26} />,
    title: "End-to-End Design & Build",
    desc: "Partnered with a professional graphic designer to supply premium branding, custom vectors, high-fidelity UI/UX layouts, and backend delivery.",
    bullets: [
      "High-end visual asset design",
      "Seamless Design-to-Code translation",
      "Unified project delivery"
    ]
  }
];

// 4-Step Collaborative Blueprint
const PROCESS_STEPS = [
  { step: "01", title: "Discovery", desc: "Aligning on project features, scope, and technical roadmap." },
  { step: "02", title: "Design & Specs", desc: "Zenos creates high-fidelity UI assets; I structure backend architecture." },
  { step: "03", title: "Agile Build", desc: "Writing clean, unit-tested code with incremental progress." },
  { step: "04", title: "Deployment", desc: "Launching secure code to staging/production on AWS or HF Spaces." }
];

// Teammate details (Zenos Bisht)
const PARTNER_DATA = {
  name: "Zenos Bisht",
  role: "Graphic & UI/UX Designer",
  behance: "https://www.behance.net/zenosbisht",
  description: "Zenos is our creative core, specializing in custom graphic illustrations, corporate branding, interface wireframing, and premium digital layouts. By pairing high-concept creative design with advanced back-end code, we eliminate development friction and deliver client projects that look stunning and run with solid technical stability.",
  skills: ["Creative UI/UX Design", "Custom Vector Illustrations", "Brand Strategy & Logo Design", "Digital Mockups"]
};

// Projects Data from Resume (Plus AI Agent Project)
const PROJECTS_DATA = [
  {
    id: 1,
    title: "Autonomous AI Agent Workflow Engine",
    description: "Designed and built an AI Agent system that orchestrates model calls, performs Web Tool search queries, parses responses, and automatically generates structured database schemas. Leveraged LangChain for agentic memory, function calling for secure tool execution, and Flask for routing.",
    tech: ["Python", "LangChain", "OpenAI API", "Tool Calling", "Flask", "SQLite"],
    category: "ai",
    github: "https://github.com/codewithdeepanshu",
    live: "https://portfolio-ilawetkb2-codewithdeepanshu-4995s-projects.vercel.app/"
  },
  {
    id: 2,
    title: "AI Twitter/X Sentiment Analyzer",
    description: "Developed a full-stack web application utilizing Flask for the backend server and vanilla JavaScript for the client interface. Integrated a RoBERTa-based deep learning transformer model (cardiffnlp/twitter-roberta-base-sentiment-latest) via PyTorch to execute 3-class sentiment classification on over 124 million parameters. Designed interactive data visualization charts representing live user sentiment metrics.",
    tech: ["Python", "Flask", "PyTorch", "Hugging Face", "JavaScript", "Tweepy API"],
    category: "fullstack",
    github: "https://github.com/codewithdeepanshu/twitter-sentiment-analysis-",
    live: "https://huggingface.co/spaces/deepanshugautam/twitter-sentiment-analysis"
  },
  {
    id: 3,
    title: "Social Media Content Analyzer",
    description: "Engineered a responsive web dashboard in Streamlit to aggregate, clean, and visualize content performance indicators and text files. Utilized Pandas and NumPy data pipelines for structural data cleaning, trend sorting, and sentiment scoring across CSV datasets.",
    tech: ["Python", "Streamlit", "Pandas", "NumPy", "Matplotlib"],
    category: "backend",
    github: "https://github.com/2400520140023-arch/social-media-content-analyzer",
    live: "https://social-media-content-analyzer-ffqt8dgzr5pfoq8clmtynf.streamlit.app/"
  },
  {
    id: 4,
    title: "Online Bookstore Web App",
    description: "Built a full-stack e-commerce bookstore leveraging Django's Model-View-Template (MVT) architecture with secure session-based authentication. Designed database schemas in MySQL, writing optimized SQL queries to manage products, order carts, and relational transaction data.",
    tech: ["Django", "MySQL", "SQL", "Bootstrap", "HTML5/CSS3"],
    category: "fullstack",
    github: "https://github.com/codewithdeepanshu",
    live: "https://portfolio-ilawetkb2-codewithdeepanshu-4995s-projects.vercel.app/"
  }
];

// Education Data from Resume
const EDUCATION_DATA = [
  {
    degree: "MCA (Master of Computer Applications)",
    institution: "Institute of Engineering and Technology, Lucknow",
    period: "2024 - 2026",
    details: "CGPA: 8.43 (ongoing) | First Class"
  },
  {
    degree: "BCA (Bachelor of Computer Applications)",
    institution: "IME Ghaziabad",
    period: "2020 - 2023",
    details: "Percentage: 69.56% | First Class"
  },
  {
    degree: "Class XII (CBSE)",
    institution: "S.B.V. Rouse Avenue",
    period: "2020",
    details: "Percentage: 72.33% | First Class"
  },
  {
    degree: "Class X (CBSE)",
    institution: "S.B.V. Anand Vihar",
    period: "2018",
    details: "Percentage: 65.17% | First Class"
  }
];

// Achievements & Certifications from Resume
const ACHIEVEMENTS_DATA = [
  {
    title: "AI Agent Architect Certification",
    issuer: "Professional Certificate",
    period: "Credentials Achieved",
    description: "Demonstrated skills in creating, evaluating, and fine-tuning advanced autonomous AI agents and automated workflows.",
    link: "https://drive.google.com/file/d/1TZLcu5zlE8hEpIG-yJTHOieZiZTQ9n1H/view"
  },
  {
    title: "Smart India Hackathon 2025",
    issuer: "National Level Hackathon Participant",
    period: "2025",
    description: "Collaborated in a development team to solve national challenges, coding functional prototypes under strict deadlines.",
    link: "https://drive.google.com/file/d/1yLpPykj2jTjcmCOhnXzR7QaNlVJ4S_S2/view"
  },
  {
    title: "Data Analysis with Python",
    issuer: "IBM SkillsBuild",
    period: "Credentials Achieved",
    description: "Mastered python data libraries (NumPy, Pandas) to perform cleaning, exploratory analysis, and visualization.",
    link: "https://courses.skillsbuild.skillsnetwork.site/certificates/ab16bc4d94e34778ac061df40bf3e8ee"
  },
  {
    title: "LeetCode Practice",
    issuer: "Data Structures & Algorithms",
    period: "Ongoing Developer Skill",
    description: "Actively solving algorithmic and logical problems on LeetCode to refine coding efficacy and space/time complexity optimization.",
    link: "https://leetcode.com/u/deepanshu__gautam/"
  }
];


// Core Skills Data (Updated with AI Agents)
const SKILLS_DATA = [
  { name: "AI Agent Design / LLM Orchestration", level: 90, icon: <Bot size={18} /> },
  { name: "Python / Java / C++", level: 90, icon: <Code size={18} /> },
  { name: "Django / Flask Web Frameworks", level: 95, icon: <Layers size={18} /> },
  { name: "SQL / MySQL / Relational DBs", level: 90, icon: <Database size={18} /> },
  { name: "PyTorch / NumPy / Pandas / ML", level: 85, icon: <Cpu size={18} /> },
  { name: "Git & VS Code & Hugging Face", level: 80, icon: <Terminal size={18} /> }
];

// Project Brief Selectable Services
const BRIEF_SERVICES = [
  "AI Agent / Orchestration",
  "Django Backend API",
  "Full Stack Web App",
  "UI/UX & Branding Brief",
  "Streamlit Dashboard"
];

// Project Brief Selectable Budgets
const BRIEF_BUDGETS = [
  "< $500",
  "$500 - $1,500",
  "$1,500 - $3,000",
  "$3,000+"
];

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [activeFilter, setActiveFilter] = useState('all');

  // Interactive Project Brief States
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedBudget, setSelectedBudget] = useState("");

  // Contact Form Inputs State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // Contact Form Status State
  const [formStatus, setFormStatus] = useState({
    submitting: false,
    success: false,
    error: null
  });

  // Sticky Navbar logic
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Typewriter effect logic
  useEffect(() => {
    let timer;
    const fullRole = ROLES[roleIndex];

    const handleType = () => {
      if (!isDeleting) {
        setCurrentText(fullRole.substring(0, currentText.length + 1));
        setTypingSpeed(100);

        if (currentText === fullRole) {
          timer = setTimeout(() => setIsDeleting(true), 2000);
          return;
        }
      } else {
        setCurrentText(fullRole.substring(0, currentText.length - 1));
        setTypingSpeed(50);

        if (currentText === '') {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % ROLES.length);
          return;
        }
      }
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, roleIndex, typingSpeed]);

  const toggleServiceSelection = (service) => {
    setSelectedServices(prev => 
      prev.includes(service) 
        ? prev.filter(s => s !== service) 
        : [...prev, service]
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Submit Contact Form to Django API
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        submitting: false,
        success: false,
        error: "Please fill in all required fields (Name, Email, Message)."
      });
      return;
    }

    setFormStatus({ submitting: true, success: false, error: null });

    // Format final message to include Project Brief Details (Services & Budget)
    const servicesPart = selectedServices.length > 0 
      ? `\nServices Requested: ${selectedServices.join(', ')}` 
      : '';
    const budgetPart = selectedBudget 
      ? `\nEstimated Budget: ${selectedBudget}` 
      : '';
    
    const formattedMessage = `[PROJECT BRIEF DETAILS]${servicesPart}${budgetPart}\n\nClient Message:\n${formData.message}`;
    const subjectPrefix = selectedServices.length > 0 
      ? `[${selectedServices[0]}] ${formData.subject || 'Freelance Project Inquiry'}` 
      : (formData.subject || 'Freelance Project Inquiry');

    const apiPayload = {
      name: formData.name,
      email: formData.email,
      subject: subjectPrefix,
      message: formattedMessage
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiPayload),
      });

      const data = await response.json();

      if (response.ok) {
        setFormStatus({
          submitting: false,
          success: true,
          error: null
        });
        // Reset inputs
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        setSelectedServices([]);
        setSelectedBudget("");
      } else {
        let errorMsg = "Something went wrong. Please check your details.";
        if (data.email) {
          errorMsg = `Email Error: ${data.email.join(' ')}`;
        } else if (data.message) {
          errorMsg = `Message Error: ${data.message.join(' ')}`;
        }
        setFormStatus({
          submitting: false,
          success: false,
          error: errorMsg
        });
      }
    } catch (err) {
      console.error("Fetch API connection error: ", err);
      setFormStatus({
        submitting: false,
        success: false,
        error: "Failed to connect to the backend server. Make sure Django is running on port 8000."
      });
    }
  };

  const filteredProjects = activeFilter === 'all' 
    ? PROJECTS_DATA 
    : activeFilter === 'ai' 
      ? PROJECTS_DATA.filter(p => p.category === 'ai' || p.tech.includes('LangChain'))
      : PROJECTS_DATA.filter(p => p.category === activeFilter);

  return (
    <>
      <div className="bg-ambient">
        <div className="bg-orb orb-1"></div>
        <div className="bg-orb orb-2"></div>
      </div>

      {/* NAVIGATION BAR */}
      <nav className={`navbar ${scrolled ? 'scrolled glass-panel' : ''}`}>
        <div className="container nav-container">
          <a href="#home" className="nav-logo">
            <span className="logo-icon">&lt;/&gt;</span>
            <span className="logo-text">Deepanshu<span className="text-gradient-cyan">Gautam</span></span>
          </a>

          <div className="nav-right-sec">
            <div className="nav-links">
              <a href="#home" className="nav-link">Home</a>
              <a href="#services" className="nav-link">Services</a>
              <a href="#projects" className="nav-link">Projects</a>
              <a href="#collaboration" className="nav-link">Design Partner</a>
              <a href="#journey" className="nav-link">Education & Skills</a>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="nav-link">Resume</a>
              <a href="#contact" className="nav-link btn btn-secondary nav-cta">Start A Project</a>
            </div>

            <img src="/profile.png" alt="Deepanshu Gautam" className="nav-avatar" />

            <button 
              className="mobile-toggle" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        {mobileMenuOpen && (
          <div className="mobile-menu glass-panel">
            <a href="#home" onClick={() => setMobileMenuOpen(false)}>Home</a>
            <a href="#services" onClick={() => setMobileMenuOpen(false)}>Services</a>
            <a href="#projects" onClick={() => setMobileMenuOpen(false)}>Projects</a>
            <a href="#collaboration" onClick={() => setMobileMenuOpen(false)}>Design Partner</a>
            <a href="#journey" onClick={() => setMobileMenuOpen(false)}>Education & Skills</a>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)}>Resume</a>
            <a href="#contact" className="btn btn-primary" onClick={() => setMobileMenuOpen(false)}>Start A Project</a>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section id="home" className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <span className="hero-greeting glass-panel"><Sparkles size={14} className="text-gradient" style={{ marginRight: '6px' }} /> Available for Freelance Contracts</span>
            <h1 className="hero-title">
              Building Scalable <br />
              <span className="text-gradient typewriter-container">
                {currentText}
                <span className="cursor-blink">|</span>
              </span>
            </h1>
            <p className="hero-subtitle">
              Specializing in the orchestration of **autonomous AI Agents** (using function calling and LLM memory structures), designing highly performant **Django backends**, and building data-driven Streamlit interfaces.
            </p>
            <div className="hero-actions">
              <a href="#contact" className="btn btn-primary">
                Hire Me / Start Project <ArrowRight size={18} />
              </a>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                Download Resume <ExternalLink size={16} />
              </a>
            </div>
          </div>

          <div className="hero-visual floating-element">
            <div className="visual-card glass-panel">
              <div className="card-header-dots">
                <span className="dot dot-red"></span>
                <span className="dot dot-yellow"></span>
                <span className="dot dot-green"></span>
              </div>
              <div className="card-terminal-body">
                <p className="line-prefix">~ $ <span className="cmd-text">curl -s https://deepanshu.dev/ai-engineer</span></p>
                <pre className="terminal-code">
{`{
  "name": "Deepanshu Gautam",
  "status": "Available for AI Agent Builds",
  "credentials": "AI Agent Architect Certified",
  "specialties": [
    "Autonomous Agentic Workflows",
    "OpenAI Tool-Use & Function Calling",
    "Django REST API Backends"
  ],
  "agentStack": ["LangChain", "CrewAI", "VectorDBs", "RAG"]
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FREELANCE SERVICES SECTION */}
      <section id="services" style={{ paddingBottom: '2rem' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">AI & Backend Services</span>
            <h2 className="section-title">How I Help Startups & Businesses</h2>
          </div>

          <div className="services-grid">
            {SERVICES_DATA.map((srv, idx) => (
              <div className="service-card glass-card" key={idx}>
                <div className="service-icon-wrapper">
                  {srv.icon}
                </div>
                <h3 className="service-title">{srv.title}</h3>
                <p className="service-desc">{srv.desc}</p>
                <ul className="service-bullets">
                  {srv.bullets.map((bullet, bidx) => (
                    <li key={bidx}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FREELANCE BLUEPRINT SECTION */}
      <section id="blueprint" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">My Framework</span>
            <h2 className="section-title">Collaborative Agent & API Blueprint</h2>
          </div>
          <div className="process-container glass-panel" style={{ borderRadius: '16px' }}>
            {PROCESS_STEPS.map((step, idx) => (
              <div className="process-step" key={idx}>
                <div className="step-num">{step.step}</div>
                <h4 className="process-step-title">{step.title}</h4>
                <p className="process-step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CREATIVE PARTNERSHIP SECTION (ZENOS BISHT) */}
      <section id="collaboration" className="about-section" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Design Partner</span>
            <h2 className="section-title">Design & Development Synergy</h2>
          </div>

          <div className="about-grid">
            <div className="about-bio-card glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div className="bio-icon-wrapper">
                <Workflow size={32} className="bio-icon" />
              </div>
              <h3 className="card-heading">Duo Agency Capability</h3>
              <p className="bio-paragraph">
                Startups often struggle with the friction between visual UI designers and software backend engineers. We eliminate that gap completely.
              </p>
              <p className="bio-paragraph">
                By teaming up directly with a highly skilled graphic designer, we deliver a unified pipeline: Zenos creates stunning branding, layouts, and assets, which I directly transition into clean, optimized React interfaces and Django REST backend code.
              </p>
            </div>

            <div className="about-bio-card glass-card">
              <div className="bio-icon-wrapper" style={{ borderColor: 'var(--border-cyan-glow)', background: 'rgba(6, 182, 212, 0.1)' }}>
                <Palette size={32} className="bio-icon" style={{ color: 'var(--color-secondary)' }} />
              </div>
              <h3 className="card-heading">{PARTNER_DATA.name}</h3>
              <h4 className="timeline-company" style={{ marginTop: '-0.75rem', marginBottom: '1rem', color: 'var(--color-secondary)' }}>{PARTNER_DATA.role}</h4>
              <p className="bio-paragraph" style={{ fontSize: '0.95rem' }}>
                {PARTNER_DATA.description}
              </p>
              <div className="about-details" style={{ marginTop: '1.5rem' }}>
                <div className="brief-pills-container" style={{ marginBottom: '1.5rem' }}>
                  {PARTNER_DATA.skills.map((skill, idx) => (
                    <span className="tech-badge" key={idx} style={{ padding: '0.35rem 0.75rem', borderRadius: '12px' }}>{skill}</span>
                  ))}
                </div>
                <a 
                  href={PARTNER_DATA.behance} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-secondary"
                  style={{ gap: '0.5rem', width: 'fit-content' }}
                >
                  Explore Behance Portfolio <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT & SKILLS SECTION */}
      <section id="about" className="about-section" style={{ paddingTop: '2rem' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Technical Profile</span>
            <h2 className="section-title">My Background & Core Skills</h2>
          </div>

          <div className="about-grid">
            <div className="about-bio-card glass-card">
              <div className="bio-icon-wrapper">
                <User size={32} className="bio-icon" />
              </div>
              <h3 className="card-heading">About Deepanshu</h3>
              <p className="bio-paragraph">
                I am a results-driven Python Developer and Certified AI Agent Architect pursuing an MCA with a strong foundation in Software Engineering, Object-Oriented Programming (OOPs), Database Management Systems (DBMS), and Computer Networks (CN).
              </p>
              <p className="bio-paragraph">
                My core strength lies in combining classical backend technologies (like Django REST Framework and relational SQL optimization) with modern intelligence systems (including LangChain autonomous agents, model function-calling, and custom PyTorch sentiment pipelines).
              </p>
              <div className="about-details">
                <div className="detail-item">
                  <MapPin size={18} className="detail-icon" />
                  <span>Ghaziabad, Delhi NCR, India</span>
                </div>
                <div className="detail-item">
                  <Mail size={18} className="detail-icon" />
                  <span>Deepanshugautam9899@gmail.com</span>
                </div>
                <div className="detail-item">
                  <Phone size={18} className="detail-icon" />
                  <span>+91 8882440354</span>
                </div>
              </div>
            </div>

            <div className="skills-card glass-card">
              <h3 className="card-heading">Expertise Matrix</h3>
              <div className="skills-list">
                {SKILLS_DATA.map((skill, index) => (
                  <div className="skill-item" key={index}>
                    <div className="skill-info">
                      <span className="skill-name-icon">
                        {skill.icon}
                        <span className="skill-name">{skill.name}</span>
                      </span>
                      <span className="skill-percentage">{skill.level}%</span>
                    </div>
                    <div className="skill-bar-bg">
                      <div 
                        className="skill-bar-fill" 
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="projects-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Portfolio</span>
            <h2 className="section-title">My Projects & Proof of Work</h2>
          </div>

          <div className="project-filters">
            <button 
              className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All Projects
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'ai' ? 'active' : ''}`}
              onClick={() => setActiveFilter('ai')}
            >
              AI Agents & ML
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'fullstack' ? 'active' : ''}`}
              onClick={() => setActiveFilter('fullstack')}
            >
              Full Stack
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'backend' ? 'active' : ''}`}
              onClick={() => setActiveFilter('backend')}
            >
              Data Science
            </button>
          </div>

          <div className="projects-grid">
            {filteredProjects.map((project) => (
              <article className="project-card glass-card" key={project.id}>
                <div className="project-header">
                  <span className="project-tag-badge">
                    {project.category === 'ai' ? 'AI Agents' : project.category === 'fullstack' ? 'Full Stack' : 'Data & Backend'}
                  </span>
                  <div className="project-links">
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="proj-link" aria-label="GitHub Repository">
                      <GithubIcon size={20} />
                    </a>
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="proj-link" aria-label="Live Demo">
                      <ExternalLink size={20} />
                    </a>
                  </div>
                </div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>
                <div className="project-tech-stack">
                  {project.tech.map((t, idx) => (
                    <span className="tech-badge" key={idx}>{t}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION & ACHIEVEMENTS GRIDS (DUAL TIMELINE) */}
      <section id="journey" className="experience-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Academic & Certifications</span>
            <h2 className="section-title">Education & Credentials</h2>
          </div>

          <div className="about-grid">
            {/* EDUCATION TIMELINE */}
            <div className="glass-panel" style={{ padding: '2rem', borderRadius: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                <BookOpen size={24} className="text-gradient-cyan" />
                <h3 className="card-heading" style={{ margin: 0 }}>Education</h3>
              </div>
              <div className="timeline-container" style={{ margin: 0, maxWidth: '100%' }}>
                <div className="timeline-line" style={{ left: '21px' }}></div>
                
                {EDUCATION_DATA.map((edu, index) => (
                  <div className="timeline-item" key={index} style={{ paddingLeft: '50px', marginBottom: '2rem' }}>
                    <div className="timeline-dot" style={{ left: '6px', width: '28px', height: '28px', borderColor: 'var(--color-secondary)' }}>
                      <BookOpen size={12} />
                    </div>
                    <div className="timeline-content glass-card" style={{ padding: '1.25rem' }}>
                      <span className="timeline-period">{edu.period}</span>
                      <h4 className="timeline-role" style={{ fontSize: '1.1rem' }}>{edu.degree}</h4>
                      <h5 className="timeline-company" style={{ fontSize: '0.9rem' }}>{edu.institution}</h5>
                      <p className="timeline-desc" style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--color-secondary)' }}>{edu.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ACHIEVEMENTS TIMELINE */}
            <div className="glass-panel" style={{ padding: '2rem', borderRadius: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                <Award size={24} className="text-gradient" />
                <h3 className="card-heading" style={{ margin: 0 }}>Achievements & Certificates</h3>
              </div>
              <div className="timeline-container" style={{ margin: 0, maxWidth: '100%' }}>
                <div className="timeline-line" style={{ left: '21px' }}></div>
                
                {ACHIEVEMENTS_DATA.map((ach, index) => (
                  <div className="timeline-item" key={index} style={{ paddingLeft: '50px', marginBottom: '2rem' }}>
                    <div className="timeline-dot" style={{ left: '6px', width: '28px', height: '28px' }}>
                      <Award size={12} />
                    </div>
                    <div className="timeline-content glass-card" style={{ padding: '1.25rem' }}>
                      <span className="timeline-period" style={{ color: 'var(--color-primary)' }}>{ach.period}</span>
                      <h4 className="timeline-role" style={{ fontSize: '1.1rem' }}>{ach.title}</h4>
                      <h5 className="timeline-company" style={{ fontSize: '0.9rem' }}>{ach.issuer}</h5>
                      <p className="timeline-desc" style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>{ach.description}</p>
                      {ach.link && (
                        <a 
                          href={ach.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          style={{ 
                            display: 'inline-flex', 
                            alignItems: 'center', 
                            gap: '4px', 
                            marginTop: '0.75rem', 
                            fontSize: '0.85rem', 
                            color: 'var(--color-secondary)', 
                            textDecoration: 'none',
                            fontWeight: '500'
                          }}
                          className="cert-link"
                        >
                          View Credentials <ExternalLink size={12} />
                        </a>
                      )}
                    </div>

                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT ME SECTION / PROJECT BRIEF GENERATOR */}
      <section id="contact" className="contact-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Let's Work Together</span>
            <h2 className="section-title">Start Your Project Brief</h2>
          </div>

          <div className="contact-grid">
            <div className="contact-info-card glass-card">
              <h3 className="card-heading">Let's Connect</h3>
              <p className="contact-subtext">
                Fill out the project brief to request AI Agents, backend development, design wireframes, or full stack systems. I will receive your details directly in my Django CRM dashboard.
              </p>
              
              <div className="contact-methods">
                <div className="method-item">
                  <div className="method-icon-box">
                    <Mail size={20} />
                  </div>
                  <div className="method-details">
                    <span className="method-label">Email Me</span>
                    <a href="mailto:Deepanshugautam9899@gmail.com" className="method-val">Deepanshugautam9899@gmail.com</a>
                  </div>
                </div>

                <div className="method-item">
                  <div className="method-icon-box">
                    <Phone size={20} />
                  </div>
                  <div className="method-details">
                    <span className="method-label">Call / WhatsApp</span>
                    <span className="method-val">+91 8882440354</span>
                  </div>
                </div>

                <div className="method-item">
                  <div className="method-icon-box">
                    <MapPin size={20} />
                  </div>
                  <div className="method-details">
                    <span className="method-label">Location</span>
                    <span className="method-val">Ghaziabad, Delhi NCR, India</span>
                  </div>
                </div>
              </div>

              <div className="contact-socials">
                <a href="https://github.com/codewithdeepanshu" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="GitHub Link">
                  <GithubIcon size={22} />
                </a>
                <a href="https://www.linkedin.com/in/deepanshu-gautam-9b1051240/" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="LinkedIn Link">
                  <LinkedinIcon size={22} />
                </a>
              </div>

            </div>

            {/* Direct Contact Form / Interactive Project Brief Generator */}
            <div className="contact-form-wrapper glass-panel">
              <h3 className="card-heading">Define Your Project</h3>
              
              {formStatus.success && (
                <div className="form-alert alert-success">
                  <CheckCircle className="alert-icon" size={20} />
                  <div>
                    <strong>Brief Submitted!</strong> Your project parameters have been securely saved to my Django backend database. I will contact you shortly to review.
                  </div>
                </div>
              )}

              {formStatus.error && (
                <div className="form-alert alert-error">
                  <AlertCircle className="alert-icon" size={20} />
                  <div>
                    <strong>Error:</strong> {formStatus.error}
                  </div>
                </div>
              )}

              <form onSubmit={handleFormSubmit} className="contact-form">
                
                {/* INTERACTIVE COMPONENT: Service Checklist */}
                <div>
                  <span className="brief-label">What services do you require?</span>
                  <div className="brief-pills-container">
                    {BRIEF_SERVICES.map((service, sidx) => {
                      const isActive = selectedServices.includes(service);
                      return (
                        <button
                          type="button"
                          key={sidx}
                          className={`brief-pill ${isActive ? 'active' : ''}`}
                          onClick={() => toggleServiceSelection(service)}
                        >
                          {isActive && <Check size={12} />}
                          {service}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* INTERACTIVE COMPONENT: Budget Selector */}
                <div>
                  <span className="brief-label">Estimated Project Budget</span>
                  <div className="budget-container">
                    {BRIEF_BUDGETS.map((budget, bidx) => {
                      const isActive = selectedBudget === budget;
                      return (
                        <button
                          type="button"
                          key={bidx}
                          className={`budget-btn ${isActive ? 'active' : ''}`}
                          onClick={() => setSelectedBudget(budget)}
                        >
                          {budget}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name <span className="required-star">*</span></label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleInputChange}
                      required 
                      disabled={formStatus.submitting}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address <span className="required-star">*</span></label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required 
                      disabled={formStatus.submitting}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject" 
                    placeholder="Project Inquiry"
                    value={formData.subject}
                    onChange={handleInputChange}
                    disabled={formStatus.submitting}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Project Description <span className="required-star">*</span></label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows="4" 
                    placeholder="Briefly explain what you need to build, your timeline, or any specific requirements..."
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    disabled={formStatus.submitting}
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary submit-btn"
                  disabled={formStatus.submitting}
                >
                  {formStatus.submitting ? (
                    <>Submitting Brief...</>
                  ) : (
                    <>
                      Submit Project Brief <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container footer-container">
          <p className="footer-copy">
            &copy; {new Date().getFullYear()} Deepanshu Gautam. All rights reserved.
          </p>
          <p className="footer-built-with">
            Built with React.js & Django. Crafted with <Heart size={14} className="heart-icon" /> & Vanilla CSS.
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
