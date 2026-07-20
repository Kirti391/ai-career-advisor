import React, { useContext, useState } from 'react';
import { Navigate, Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, Sun, Moon, Sparkles, BrainCircuit, Bell } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import Sidebar from '../components/Sidebar';
import ToastContainer from '../components/Toast';

const DashboardLayout = () => {
  const { user, theme, toggleTheme } = useContext(AppContext);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  // Route protection
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Breadcrumbs/Title solver
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/dashboard') return 'Dashboard Overview';
    if (path === '/dashboard/upload') return 'Upload Resume';
    if (path === '/dashboard/analysis') return 'Career Analysis';
    if (path === '/dashboard/skills') return 'Skill Gap Analysis';
    if (path === '/dashboard/roadmap') return 'Learning Roadmap';
    if (path === '/dashboard/courses') return 'Recommended Courses';
    if (path === '/dashboard/projects') return 'Recommended Projects';
    if (path === '/dashboard/review') return 'Resume ATS Review';
    if (path === '/dashboard/interview') return 'Interview Preparation';
    if (path === '/dashboard/summary') return 'Career Executive Brief';
    if (path === '/dashboard/profile') return 'Candidate Profile';
    if (path === '/dashboard/settings') return 'Account Settings';
    return 'Dashboard';
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex transition-colors duration-200">
      {/* Collapsible Sidebar */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
          sidebarOpen ? 'md:pl-64' : 'md:pl-20'
        }`}
      >
        {/* Top Navbar */}
        <header className="h-16 sticky top-0 z-20 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            {/* Toggle mobile sidebar */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 md:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>

            <h1 className="font-extrabold text-lg md:text-xl text-slate-850 dark:text-white tracking-tight">
              {getPageTitle()}
            </h1>
          </div>

          {/* Quick Toolbar */}
          <div className="flex items-center gap-3">
            {/* Notification Badge */}
            <button className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-650 dark:text-slate-300 relative transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-blue-500 ring-2 ring-white dark:ring-slate-950" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-650 dark:text-slate-300 transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Avatar Display */}
            {user && (
              <Link to="/dashboard/profile" className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
                <img
                  src={user.avatar}
                  alt="User avatar"
                  className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-750 object-cover"
                />
              </Link>
            )}
          </div>
        </header>

        {/* Dashboard Pages Content */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

      <ToastContainer />
    </div>
  );
};

export default DashboardLayout;
