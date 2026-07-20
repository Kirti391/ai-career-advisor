import React from 'react';
import { Link } from 'react-router-dom';
import { BrainCircuit, Twitter, Github, Linkedin, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200/60 dark:border-slate-900 py-12 md:py-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand Info */}
          <div className="md:col-span-1 flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl text-white shadow-md shadow-blue-500/20">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-slate-900 to-indigo-650 dark:from-white dark:to-indigo-400 bg-clip-text text-transparent">
                PathFinder AI
              </span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-450 leading-relaxed">
              Empowering students and job seekers to bridge the skill-job mismatch and achieve decent, meaningful work. Inspired by SDG Goal 8.
            </p>
            <div className="flex gap-4 items-center mt-2 text-slate-400 dark:text-slate-500">
              <a href="#" className="hover:text-blue-550 transition-colors"><Twitter className="w-4 h-4" /></a>
              <a href="#" className="hover:text-blue-550 transition-colors"><Github className="w-4 h-4" /></a>
              <a href="#" className="hover:text-blue-550 transition-colors"><Linkedin className="w-4 h-4" /></a>
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-4">
              Platform
            </h4>
            <ul className="space-y-3">
              <li><a href="#features" className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">How It Works</a></li>
              <li><a href="#faqs" className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">FAQs</a></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-4">
              Legal
            </h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">GDPR compliance</a></li>
            </ul>
          </div>

          {/* Links Column 3 */}
          <div>
            <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-4">
              SDG Impact
            </h4>
            <p className="text-sm text-slate-550 dark:text-slate-400 leading-relaxed mb-3">
              We align with United Nations SDG Goal 8: Promoting sustained, inclusive and sustainable economic growth, full and productive employment, and decent work for all.
            </p>
          </div>
        </div>

        <hr className="border-slate-200 dark:border-slate-900 my-8 md:my-10" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-450 dark:text-slate-500">
            &copy; {new Date().getFullYear()} PathFinder AI. All rights reserved.
          </p>
          <p className="text-xs text-slate-450 dark:text-slate-500 flex items-center gap-1">
            Built for SDG 8 with <Heart className="w-3 h-3 text-red-500 fill-current animate-pulse" /> Decent Work & Growth
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
