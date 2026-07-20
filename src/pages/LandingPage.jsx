import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Search,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Brain,
  TrendingUp,
  FileCheck2,
  Users2,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { AppContext } from '../context/AppContext';
import Button from '../components/Button';
import FeatureCard from '../components/FeatureCard';

const LandingPage = () => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);

  const features = [
    {
      title: "ATS Resume Optimization",
      description: "Scan your resume against modern ATS algorithms. Pinpoint missing keywords, layout flaws, and formatting issues instantly.",
      icon: FileCheck2
    },
    {
      title: "Granular Skill Gap Analysis",
      description: "Analyze your technical and soft skills against thousands of active job descriptions. Map exact matches, partial gaps, and missing competencies.",
      icon: TrendingUp
    },
    {
      title: "AI-Powered Learning Roadmaps",
      description: "Receive a personalized 30-60-90 day learning plan with specific, measurable objectives and recommended portfolio project prompts.",
      icon: Brain
    },
    {
      title: "Targeted Resources",
      description: "Get direct matching to top-rated courses and projects tailored specifically to fill the missing gaps identified in your resume.",
      icon: BookOpen
    }
  ];

  const testimonials = [
    {
      name: "Marcus Chen",
      role: "Transitioned from QA to Full-Stack Developer",
      quote: "The Skill Gap analysis showed me exactly what projects I needed to build. The FastAPI course match was spot on. I landed a Full-Stack developer role within 3 months!",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80"
    },
    {
      name: "Sarah Jenkins",
      role: "Computer Science Graduate",
      quote: "As a fresh graduate, I didn't know why my resume was getting rejected. Pathfinder's ATS review pointed out missing industry keywords. Fixed it and got 3 interviews in a week!",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80"
    }
  ];

  const faqs = [
    {
      question: "How does Pathfinder analyze my resume?",
      answer: "We use an advanced LangGraph backend orchestration pipeline that extracts details from your PDF resume (skills, experience, projects) and evaluates them against current industry benchmarks and job standards for your target role."
    },
    {
      question: "What is SDG Goal 8, and how does this app align with it?",
      answer: "UN Sustainable Development Goal 8 promotes sustained, inclusive economic growth, full and productive employment, and decent work for all. By diagnosing skill mismatches and advising candidates how to qualify for higher-paying tech careers, we help reduce underemployment."
    },
    {
      question: "Is my resume data safe and private?",
      answer: "Yes. Your uploaded files are processed securely. We don't sell your personal data or resume contents to recruiters or third-party platforms."
    }
  ];

  const handleStartClick = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/signup');
    }
  };

  const handleUploadClick = () => {
    if (user) {
      navigate('/dashboard/upload');
    } else {
      navigate('/login?redirect=/dashboard/upload');
    }
  };

  return (
    <div className="relative overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors">
      
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none opacity-50 dark:opacity-30">
        <div className="absolute top-[-10%] left-[20%] w-[350px] h-[350px] rounded-full bg-blue-400 dark:bg-blue-600 blur-[120px]" />
        <div className="absolute top-[10%] right-[10%] w-[400px] h-[400px] rounded-full bg-indigo-400 dark:bg-indigo-650 blur-[130px]" />
      </div>

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 md:pt-32 md:pb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            AI Career Counseling &bull; SDG 8 Initiative
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-4xl leading-[1.1] mb-6">
            Bridge the Skill Gap with{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-650 to-purple-600 bg-clip-text text-transparent">
              AI Guidance
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed mb-10">
            Upload your resume and receive personalized career guidance, skill gap analysis, learning roadmap, interview preparation, ATS resume review, and AI-powered recommendations.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button variant="primary" size="lg" icon={ArrowRight} onClick={handleStartClick}>
              Get Started
            </Button>
            <Button variant="outline" size="lg" onClick={handleUploadClick}>
              Upload Resume
            </Button>
          </div>

          {/* Social proof / icons */}
          <div className="mt-16 flex items-center justify-center gap-8 flex-wrap opacity-60 grayscale dark:invert">
            <span className="font-bold text-slate-400 text-sm tracking-widest uppercase">Empowering Decent Work Worldwide</span>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 border-t border-slate-200/60 dark:border-slate-900">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Comprehensive Career Diagnostics
          </h2>
          <p className="text-slate-550 dark:text-slate-400 max-w-xl mx-auto mt-4 text-sm md:text-base leading-relaxed">
            Diagnose resume bottlenecks and follow step-by-step custom career routes generated dynamically by our AI advisor engine.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, idx) => (
            <FeatureCard
              key={idx}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 border-t border-slate-200/60 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-950/20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            How It Works
          </h2>
          <p className="text-slate-550 dark:text-slate-400 max-w-xl mx-auto mt-4 text-sm md:text-base">
            Transitioning to your dream job is structured into four easy steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {[
            { step: "01", title: "Upload Resume", desc: "Drag and drop your PDF resume. Our system extracts your detailed experience profile securely." },
            { step: "02", title: "AI Skill Matching", desc: "Our LangGraph agent checks your skills against current tech market requirements." },
            { step: "03", title: "Get Your Roadmap", desc: "Obtain a personalized 30-60-90 day timeline mapping study goals and portfolio projects." },
            { step: "04", title: "Interview & Apply", desc: "Use customized Q&A prep sheets, optimize your resume ATS, and apply confidently." }
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-start p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl relative">
              <span className="text-4xl font-black bg-gradient-to-tr from-blue-600 to-indigo-650 bg-clip-text text-transparent opacity-30 mb-4 block">
                {item.step}
              </span>
              <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-2">{item.title}</h4>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 border-t border-slate-200/60 dark:border-slate-900">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Success Stories
          </h2>
          <p className="text-slate-550 dark:text-slate-400 max-w-xl mx-auto mt-4 text-sm md:text-base">
            Hear from job seekers who successfully bridged their gaps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((test, idx) => (
            <div key={idx} className="p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm flex flex-col justify-between">
              <p className="text-slate-650 dark:text-slate-300 text-lg italic leading-relaxed mb-6">
                "{test.quote}"
              </p>
              <div className="flex items-center gap-4">
                <img src={test.avatar} alt={test.name} className="w-12 h-12 rounded-full object-cover border border-slate-200 dark:border-slate-800" />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">{test.name}</h4>
                  <p className="text-xs text-blue-600 dark:text-blue-450 font-semibold">{test.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs Section */}
      <section id="faqs" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 border-t border-slate-200/60 dark:border-slate-900">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-850"
              >
                <span className="font-semibold text-slate-800 dark:text-slate-200">{faq.question}</span>
                {openFaq === idx ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
              </button>
              {openFaq === idx && (
                <div className="px-6 pb-4 pt-1 text-slate-500 dark:text-slate-400 text-sm border-t border-slate-100 dark:border-slate-800/80 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
      
    </div>
  );
};

export default LandingPage;
