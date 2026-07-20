import React, { useContext, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileUp,
  FileText,
  X,
  AlertCircle,
  Brain,
  Sparkles,
} from 'lucide-react';
import { AppContext } from '../context/AppContext';
import Button from '../components/Button';

const ResumeUpload = () => {
  const {
    uploadResumeFile,
    resume,
    clearResume,
    runAnalysis,
    addToast,
  } = useContext(AppContext);

  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);

  const [targetRole, setTargetRole] = useState("");
  const [industry, setIndustry] = useState("IT");

  const analysisSteps = [
    "Reading resume layout and parsing sections...",
    "Extracting technical and soft skills...",
    "Matching your profile with the selected role...",
    "Checking ATS compatibility...",
    "Finding missing skills and learning gaps...",
    "Generating personalized roadmap...",
    "Preparing dashboard..."
  ];

  useEffect(() => {
    let interval;

    if (analyzing) {
      interval = setInterval(() => {
        setAnalysisStep((prev) => (prev + 1) % analysisSteps.length);
      }, 2500);
    } else {
      setAnalysisStep(0);
    }

    return () => clearInterval(interval);
  }, [analyzing]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    }

    if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const validateFile = (file) => {
    if (!file) return;

    if (file.type !== "application/pdf") {
      setError("Only PDF resumes are supported.");
      addToast("Please upload a PDF resume.", "error");
      return;
    }

    setError("");
    uploadResumeFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setDragActive(false);

    if (e.dataTransfer.files?.length) {
      validateFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files?.length) {
      validateFile(e.target.files[0]);
    }
  };

  const onButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleAnalyze = async () => {
    if (!resume) {
      addToast("Please upload your resume.", "error");
      return;
    }

    if (!targetRole) {
      addToast("Please select your target role.", "error");
      return;
    }

    setAnalyzing(true);

    try {
      const success = await runAnalysis(
        targetRole,
        industry
      );

      if (success) {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
      addToast("Analysis failed.", "error");
    } finally {
      setAnalyzing(false);
    }
  };

  return (
  <div className="max-w-3xl mx-auto py-8 px-4">
    <AnimatePresence mode="wait">
      {!analyzing ? (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          className="space-y-8"
        >

          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white">
              Upload Your Resume
            </h2>

            <p className="text-slate-500 dark:text-slate-400 mt-3">
              Upload your resume and select your dream role to receive a personalized AI career roadmap.
            </p>
          </div>

          {error && (
            <div className="rounded-xl border border-red-300 bg-red-50 text-red-600 p-4 flex items-center gap-3">
              <AlertCircle className="w-5 h-5" />
              {error}
            </div>
          )}

          {/* Target Role */}

          <div className="space-y-2">
            <label className="font-semibold text-slate-700 dark:text-white">
              Target Role
            </label>

            <select
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 p-3 bg-white dark:bg-slate-900"
            >
              <option value="">Select Target Role</option>

              <option>AI Engineer</option>
              <option>Machine Learning Engineer</option>
              <option>Data Scientist</option>
              <option>Data Analyst</option>

              <option>Software Engineer</option>
              <option>Full Stack Developer</option>
              <option>Frontend Developer</option>
              <option>Backend Developer</option>

              <option>Java Developer</option>
              <option>Python Developer</option>

              <option>DevOps Engineer</option>
              <option>Cloud Engineer</option>

              <option>Cyber Security Engineer</option>
              <option>Blockchain Developer</option>

              <option>Mobile App Developer</option>
            </select>
          </div>

          {/* Industry */}

          <div className="space-y-2">
            <label className="font-semibold text-slate-700 dark:text-white">
              Industry
            </label>

            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 p-3 bg-white dark:bg-slate-900"
            >
              <option>IT</option>
              <option>Finance</option>
              <option>Healthcare</option>
              <option>E-Commerce</option>
              <option>Education</option>
              <option>Manufacturing</option>
              <option>Consulting</option>
              <option>Telecom</option>
            </select>
          </div>

          {/* Upload Box */}

          {!resume ? (
            <form
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onSubmit={(e) => e.preventDefault()}
              className={`border-2 border-dashed rounded-3xl p-12 text-center transition-all ${
                dragActive
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                  : "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleChange}
                className="hidden"
              />

              <div className="flex justify-center mb-5">
                <FileUp className="w-14 h-14 text-blue-600" />
              </div>

              <h3 className="font-bold text-xl">
                Drag & Drop Resume
              </h3>

              <p className="text-slate-500 mt-2 mb-6">
                PDF only (Max 5MB)
              </p>

              <Button
                variant="outline"
                onClick={onButtonClick}
              >
                Browse Files
              </Button>

            </form>
          ) : (
            <div className="rounded-3xl border border-slate-300 dark:border-slate-700 p-6 bg-white dark:bg-slate-900 flex justify-between items-center">

              <div className="flex gap-4 items-center">

                <FileText className="text-blue-600 w-8 h-8" />

                <div>

                  <h3 className="font-bold">
                    {resume.name}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {resume.size}
                  </p>

                </div>

              </div>

              <button
                onClick={clearResume}
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>

            </div>
          )}

          {resume && (
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              icon={Brain}
              onClick={handleAnalyze}
            >
              Analyze Resume
            </Button>
          )}
          </motion.div>
       ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center justify-center py-20"
          >
            {/* Animated AI Orb */}
            <div className="relative mb-10">

              <motion.div
                animate={{
                  rotate: 360,
                  borderRadius: [
                    "30% 70% 70% 30% / 30% 30% 70% 70%",
                    "70% 30% 30% 70% / 60% 40% 60% 40%",
                    "30% 70% 70% 30% / 30% 30% 70% 70%",
                  ],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="w-28 h-28 bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-2xl"
              >
                <Brain className="w-12 h-12 animate-pulse" />
              </motion.div>

              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
                <span className="flex items-center gap-2 px-4 py-1 rounded-full bg-slate-900 text-white text-xs font-bold">
                  <Sparkles className="w-3 h-3" />
                  AI Engine Running
                </span>
              </div>
            </div>

            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-3">
              Building Your Career Report
            </h2>

            <p className="text-slate-500 dark:text-slate-400 text-center max-w-lg h-12 mb-10">
              {analysisSteps[analysisStep]}
            </p>

            {/* Progress Bar */}

            <div className="w-full max-w-md">

              <div className="h-3 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">

                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    width: "45%",
                  }}
                />

              </div>

            </div>

            <div className="mt-10 text-sm text-slate-500 dark:text-slate-400 text-center max-w-md">
              We are comparing your resume with industry requirements for
              <span className="font-bold text-blue-600"> {targetRole}</span>
              {" "}in{" "}
              <span className="font-bold text-indigo-600">
                {industry}
              </span>
              .
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResumeUpload;