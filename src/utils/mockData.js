export const mockAnalysisResults = {
  id: "analysis-98f2a1",
  candidateName: "Alex Rivera",
  email: "alex.rivera@example.com",
  currentRole: "Frontend Engineer",
  targetRole: "Senior Full-Stack AI Engineer",
  experienceYears: 4,
  location: "San Francisco, CA (Hybrid)",
  confidenceScore: 88, // out of 100
  atsScore: 74, // out of 100
  skillMatchPercentage: 68,
  
  careerSummary: {
    headline: "High-potential Frontend Specialist ready for Full-Stack AI Transition",
    overview: "Alex is a strong frontend engineer with 4 years of experience building responsive, interactive applications in React and JavaScript. To bridge the gap to a Senior Full-Stack AI role, they need to acquire backend architecture knowledge (fastAPI/Node), database fundamentals (SQL and Vector databases), and AI orchestration skills (LangChain, LangGraph).",
    topStrengths: [
      "Expertise in React 18/19, state management, and modern CSS frameworks like Tailwind.",
      "Excellent UI/UX sensibility, resulting in highly accessible and premium interface designs.",
      "Strong core JavaScript & TypeScript foundation with experience in modern testing frameworks."
    ],
    nextSteps: [
      "Acquire Python-based backend development skills focusing on FastAPI.",
      "Learn basic vector search and database querying (PostgreSQL & Pinecone).",
      "Build a portfolio project demonstrating an end-to-end LLM application."
    ]
  },

  profile: {
    education: [
      {
        degree: "B.S. in Computer Science",
        school: "State University",
        year: "2022",
        gpa: "3.7/4.0"
      }
    ],
    experience: [
      {
        role: "Software Engineer II",
        company: "InnovateTech Solutions",
        duration: "2024 - Present",
        description: "Lead developer on the dashboard analytics page. Rebuilt the reporting interface, boosting page speed by 40% and user satisfaction scores by 15%."
      },
      {
        role: "Junior Web Developer",
        company: "PixelPerfect Labs",
        duration: "2022 - 2024",
        description: "Built and maintained multiple client websites using React, Javascript, and standard CSS. Collaborated closely with UI/UX designers."
      }
    ],
    projects: [
      {
        name: "SaaS DevPortal",
        description: "An open-source developer portal dashboard that displays API usage, schema documents, and custom keys with active token management.",
        technologies: ["React", "Tailwind CSS", "Recharts", "NodeJS"]
      },
      {
        name: "Personal Budget Tracker",
        description: "A serverless financial application analyzing monthly credit statements and categorizing expenses using chart visuals.",
        technologies: ["JavaScript", "HTML5", "CSS3", "Local Storage"]
      }
    ],
    softSkills: ["Collaborative Teamwork", "Technical Communication", "Active Listening", "Problem Solving", "Adaptability"],
    tools: ["Git", "VS Code", "Figma", "Jira", "Postman", "Chrome DevTools"]
  },

  skillsAnalysis: {
    matched: [
      { name: "React", level: 90, category: "Frontend" },
      { name: "JavaScript", level: 88, category: "Frontend" },
      { name: "Tailwind CSS", level: 85, category: "Frontend" },
      { name: "Git", level: 80, category: "DevOps/Tools" },
      { name: "RESTful APIs", level: 85, category: "Backend" },
      { name: "HTML5/CSS3", level: 95, category: "Frontend" }
    ],
    partiallyMatched: [
      { name: "TypeScript", level: 60, currentGap: "Needs advanced typing skills (generics, utilities)", category: "Frontend" },
      { name: "Node.js", level: 50, currentGap: "Needs REST design patterns and Express/Fastify experience", category: "Backend" },
      { name: "System Design", level: 45, currentGap: "Needs experience with caching, scaling, and message queues", category: "Architecture" }
    ],
    missing: [
      { name: "Python", importance: "High", category: "Backend" },
      { name: "FastAPI", importance: "High", category: "Backend" },
      { name: "LangGraph / LangChain", importance: "Critical", category: "AI Engineering" },
      { name: "PostgreSQL", importance: "Medium", category: "Database" },
      { name: "Vector Databases", importance: "High", category: "Database" },
      { name: "Docker", importance: "Medium", category: "DevOps/Tools" }
    ]
  },

  learningRoadmap: [
    {
      phase: "30 Days: Backend Core & Python",
      objectives: [
        "Master Python basics and asynchronous programming patterns.",
        "Build robust REST APIs using FastAPI, implementing CORS and validation.",
        "Learn SQL fundamentals and interact with PostgreSQL using an ORM like SQLModel or SQLAlchemy."
      ],
      deliverables: "A mini-REST API endpoint using FastAPI connecting to a PostgreSQL database with full unit tests."
    },
    {
      phase: "60 Days: AI Orchestration & Vector Search",
      objectives: [
        "Learn LLM prompt engineering, chains, and structured outputs.",
        "Understand vector embeddings and create indexes in Pinecone or ChromaDB.",
        "Implement Retrieval Augmented Generation (RAG) pipelines using LangChain."
      ],
      deliverables: "A RAG chatbot that crawls local document directories and answers questions with citation sources."
    },
    {
      phase: "90 Days: Advanced Workflows & Agentic AI",
      objectives: [
        "Understand state management in AI workflows using LangGraph.",
        "Build multi-agent state machines that collaborate on coding or researching tasks.",
        "Deploy the backend in a Docker container and set up CI/CD pipeline."
      ],
      deliverables: "A fully deployed Multi-Agent SaaS platform that takes user project goals, plans tasks, and generates files."
    }
  ],

  courses: [
    {
      id: "course-1",
      title: "FastAPI - The Complete Course",
      provider: "Udemy",
      duration: "18 hours",
      skillsCovered: "FastAPI, Python, SQL, REST APIs",
      priceType: "Paid",
      link: "https://www.udemy.com"
    },
    {
      id: "course-2",
      title: "Introduction to LangChain & AI Agents",
      provider: "DeepLearning.AI",
      duration: "4 hours",
      skillsCovered: "LangChain, LLMs, Agents, RAG",
      priceType: "Free",
      link: "https://www.deeplearning.ai"
    },
    {
      id: "course-3",
      title: "PostgreSQL for Developers",
      provider: "Scrimba",
      duration: "12 hours",
      skillsCovered: "SQL, Relational Databases, PostgreSQL",
      priceType: "Free",
      link: "https://scrimba.com"
    },
    {
      id: "course-4",
      title: "Docker & Containerization Mastery",
      provider: "CodeWithMosh",
      duration: "8 hours",
      skillsCovered: "Docker, Containers, DevOps",
      priceType: "Paid",
      link: "https://codewithmosh.com"
    }
  ],

  projects: [
    {
      id: "project-1",
      name: "FastAPI User Authentication Microservice",
      difficulty: "Medium",
      description: "Build a modular FastAPI auth service using JWT tokens, password hashing, and PostgreSQL database storage.",
      estimatedTime: "15 hours",
      skillsLearned: ["FastAPI", "PostgreSQL", "Hashing", "Pytest"]
    },
    {
      id: "project-2",
      name: "Document-Based QA Bot (RAG)",
      difficulty: "Hard",
      description: "Develop a backend pipeline converting PDFs to text chunks, generating embeddings via OpenAI, storing them in Pinecone, and building a query loop.",
      estimatedTime: "25 hours",
      skillsLearned: ["LangChain", "Vector Databases", "OpenAI API", "Python"]
    },
    {
      id: "project-3",
      name: "Agentic Developer Assistant",
      difficulty: "Hard",
      description: "Write a LangGraph-based workflow that can write, run, and self-correct simple Python script files in a sandbox.",
      estimatedTime: "35 hours",
      skillsLearned: ["LangGraph", "State Management", "Sandboxing", "Docker"]
    }
  ],

  resumeReview: {
    atsScore: 74,
    strengths: [
      "Excellent display of quantifiable impact (e.g., 'boosting page speed by 40%').",
      "Clear, chronological layout with distinct headings and standard structure.",
      "High density of frontend keywords (React, JavaScript, Tailwind, REST)."
    ],
    weaknesses: [
      "Lack of backend or systems keywords, leading to automated filters for Full-Stack roles.",
      "Resume lacks cloud platform details (AWS/GCP/Docker) which are critical for senior roles.",
      "The profile description does not outline career progression or leadership indicators."
    ],
    missingKeywords: ["FastAPI", "Python", "Docker", "PostgreSQL", "SQL", "LangGraph", "System Design", "Kubernetes", "AWS"],
    suggestedImprovements: [
      "Add a professional summary at the top outlining your transition goal to Senior Full-Stack AI Engineer.",
      "Incorporate standard backend and DevOps keywords into the skill list and project descriptions.",
      "Convert passive descriptions into active accomplishment bullets using the X-Y-Z formula."
    ]
  },

  interviewPreparation: {
    technical: [
      {
        question: "Explain the difference between SQL and NoSQL. When would you prefer a Vector database?",
        answer: "SQL databases are relational and table-based, optimized for ACID compliance and structured data. NoSQL databases are non-relational (document, key-value, graph) and scale horizontally. A Vector database (like Pinecone) is optimized to store and query high-dimensional vector embeddings, allowing similarity searches based on semantic meaning rather than literal keyword matches—ideal for AI search/RAG."
      },
      {
        question: "What is asynchrony in Python/FastAPI, and how does it compare to Node.js?",
        answer: "Both use single-threaded event loops to execute non-blocking I/O. In Python, this is enabled by the `asyncio` library using the `async` and `await` keywords. FastAPI uses starlette to handle concurrent requests asynchronously, making it extremely fast. In Node.js, asynchronous behavior is native to the runtime engine."
      }
    ],
    behavioral: [
      {
        question: "Describe a time when you had to learn a completely new technology under a tight deadline. How did you handle it?",
        answer: "Discuss a specific frontend library or state management tool you had to implement quickly. Outline your approach: structuring your time, building a quick MVP, reading docs, asking senior devs for sanity checks, and successfully delivering the code."
      }
    ],
    hr: [
      {
        question: "Where do you see yourself in five years?",
        answer: "Focus on technical leadership inside the AI Engineering space. Express your passion for bridging complex backend AI models into clean, accessible user experiences."
      }
    ],
    roleSpecific: [
      {
        question: "How would you design a multi-agent system using LangGraph that performs research on a company and writes a summary report?",
        answer: "Explain a graph with two main nodes: a 'researcher' node that uses search tools to gather company data, and a 'writer' node that formats it. The state contains the accumulated data and a drafting status. The router decides when to finish based on whether the report answers all research guidelines."
      }
    ]
  }
};

export const mockRecentHistory = [
  { id: "analysis-98f2a1", filename: "Alex_Rivera_Resume_2026.pdf", date: "2026-07-19", score: 74, role: "Senior Full-Stack AI Engineer" },
  { id: "analysis-87e1a3", filename: "Alex_Rivera_General.pdf", date: "2026-05-10", score: 68, role: "Full-Stack Web Developer" }
];
