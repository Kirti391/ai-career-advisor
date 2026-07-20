import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FileUp,
  UserCheck,
  BarChart3,
  Map,
  GraduationCap,
  FolderCode,
  Sparkles,
  HelpCircle,
  FileText,
  User,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { AppContext } from '../context/AppContext';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { logout, user } = useContext(AppContext);
  const navigate = useNavigate();

  const links = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/dashboard/upload', label: 'Resume Upload', icon: FileUp },
    { path: '/dashboard/analysis', label: 'Career Analysis', icon: UserCheck },
    { path: '/dashboard/skills', label: 'Skill Gap', icon: BarChart3 },
    { path: '/dashboard/roadmap', label: 'Learning Roadmap', icon: Map },
    { path: '/dashboard/courses', label: 'Recommended Courses', icon: GraduationCap },
    { path: '/dashboard/projects', label: 'Recommended Projects', icon: FolderCode },
    { path: '/dashboard/review', label: 'Resume ATS Review', icon: Sparkles },
    { path: '/dashboard/interview', label: 'Interview Prep', icon: HelpCircle },
    { path: '/dashboard/summary', label: 'Career Summary', icon: FileText },
    { path: '/dashboard/profile', label: 'Profile', icon: User },
    { path: '/dashboard/settings', label: 'Settings', icon: Settings }
  ];

  return (
    <aside
      className={`fixed top-0 bottom-0 left-0 z-30 flex flex-col border-r border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-950 transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      {/* Title Header */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-slate-100 dark:border-slate-900">
        {isOpen ? (
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-base tracking-tight bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              PathFinder Pro
            </span>
          </div>
        ) : (
          <span className="font-extrabold text-blue-600 dark:text-blue-400 mx-auto text-xl">P</span>
        )}
        <button
          onClick={toggleSidebar}
          className="hidden md:flex p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-400 hover:text-slate-655"
        >
          {isOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
      </div>

      {/* Nav List */}
      <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === '/dashboard'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 shadow-sm border border-blue-100 dark:border-blue-900/30'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-slate-100 border border-transparent'
              }`
            }
          >
            <link.icon className="w-5 h-5 shrink-0" />
            {isOpen && <span className="truncate">{link.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Profile/Footer */}
      <div className="p-3 border-t border-slate-150 dark:border-slate-900">
        {isOpen && user && (
          <div className="flex items-center gap-3 p-2 mb-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-850">
            <img
              src={user.avatar}
              alt="Avatar"
              className="w-9 h-9 rounded-full object-cover border border-slate-200 dark:border-slate-700"
            />
            <div className="truncate">
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{user.name}</h4>
              <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 truncate">{user.email}</p>
            </div>
          </div>
        )}
        <button
          onClick={() => {
            logout();
            navigate('/');
          }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-955/20 transition-colors"
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {isOpen && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
