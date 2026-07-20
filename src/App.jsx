import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Import Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import ResumeUpload from './pages/ResumeUpload';
import CareerAnalysis from './pages/CareerAnalysis';
import SkillGapAnalysis from './pages/SkillGapAnalysis';
import LearningRoadmap from './pages/LearningRoadmap';
import RecommendedCourses from './pages/RecommendedCourses';
import RecommendedProjects from './pages/RecommendedProjects';
import ResumeReview from './pages/ResumeReview';
import InterviewPrep from './pages/InterviewPrep';
import CareerSummary from './pages/CareerSummary';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

// Beautiful Error Page / 404 Component
const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 bg-slate-50 dark:bg-slate-950 transition-colors">
      <h2 className="text-8xl font-black bg-gradient-to-tr from-blue-600 to-indigo-650 bg-clip-text text-transparent leading-none">
        404
      </h2>
      <h3 className="text-2xl font-extrabold text-slate-805 dark:text-white mt-4 tracking-tight">
        Page Not Found
      </h3>
      <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-sm">
        The page you are looking for doesn't exist or has been moved to another section.
      </p>
      <a
        href="/"
        className="mt-8 px-6 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 shadow-lg shadow-blue-500/25 transition-all active:scale-[0.98]"
      >
        Return to Landing Page
      </a>
    </div>
  );
};

const App = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Main Website Pages */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<LandingPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="404" element={<NotFound />} />
          </Route>

          {/* Protected Dashboard Panel Pages */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="upload" element={<ResumeUpload />} />
            <Route path="analysis" element={<CareerAnalysis />} />
            <Route path="skills" element={<SkillGapAnalysis />} />
            <Route path="roadmap" element={<LearningRoadmap />} />
            <Route path="courses" element={<RecommendedCourses />} />
            <Route path="projects" element={<RecommendedProjects />} />
            <Route path="review" element={<ResumeReview />} />
            <Route path="interview" element={<InterviewPrep />} />
            <Route path="summary" element={<CareerSummary />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Fallback to 404 */}
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
