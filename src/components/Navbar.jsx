import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X, BrainCircuit, LayoutDashboard, LogOut } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import Button from './Button';

const Navbar = () => {
  const { theme, toggleTheme, user, logout } = useContext(AppContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (sectionId) => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/' + sectionId);
      return;
    }
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-slate-200/60 dark:border-slate-800/60 bg-white/75 dark:bg-slate-950/75 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-lg md:text-xl tracking-tight bg-gradient-to-r from-slate-900 via-blue-600 to-indigo-600 dark:from-white dark:via-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              PathFinder AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => handleNavClick('#features')} className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Features
            </button>
            <button onClick={() => handleNavClick('#how-it-works')} className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              How It Works
            </button>
            <button onClick={() => handleNavClick('#testimonials')} className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Testimonials
            </button>
            <button onClick={() => handleNavClick('#faqs')} className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              FAQs
            </button>
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-300 transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {user ? (
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  icon={LayoutDashboard}
                  onClick={() => navigate('/dashboard')}
                >
                  Dashboard
                </Button>
                <button
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  className="p-2.5 rounded-xl border border-rose-200 dark:border-rose-900/30 hover:bg-rose-50 dark:hover:bg-rose-950/20 text-rose-600 dark:text-rose-450 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-blue-650 dark:hover:text-blue-400 px-3 py-2 transition-colors">
                  Sign In
                </Link>
                <Button variant="primary" size="sm" onClick={() => navigate('/signup')}>
                  Get Started
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-650 dark:text-slate-305"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 dark:border-slate-900 bg-white dark:bg-slate-950 px-4 py-4 flex flex-col gap-4">
          <button onClick={() => handleNavClick('#features')} className="text-left py-2 font-semibold text-slate-600 dark:text-slate-350">
            Features
          </button>
          <button onClick={() => handleNavClick('#how-it-works')} className="text-left py-2 font-semibold text-slate-600 dark:text-slate-350">
            How It Works
          </button>
          <button onClick={() => handleNavClick('#testimonials')} className="text-left py-2 font-semibold text-slate-600 dark:text-slate-355">
            Testimonials
          </button>
          <button onClick={() => handleNavClick('#faqs')} className="text-left py-2 font-semibold text-slate-600 dark:text-slate-355">
            FAQs
          </button>
          <hr className="border-slate-100 dark:border-slate-900" />
          {user ? (
            <div className="flex flex-col gap-3">
              <Button
                variant="primary"
                size="sm"
                icon={LayoutDashboard}
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/dashboard');
                }}
              >
                Dashboard
              </Button>
              <Button
                variant="outline"
                size="sm"
                icon={LogOut}
                onClick={() => {
                  setMobileMenuOpen(false);
                  logout();
                  navigate('/');
                }}
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center font-bold py-2 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-700 dark:text-slate-300"
              >
                Sign In
              </Link>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/signup');
                }}
              >
                Get Started
              </Button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
