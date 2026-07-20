import React, { useContext, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, Chrome } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import Button from '../components/Button';

const LoginPage = () => {
  const { login } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const redirectPath = new URLSearchParams(location.search).get('redirect') || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    const success = await login(email, password);
    if (success) {
      navigate(redirectPath);
    }
  };

  const handleGoogleLogin = async () => {
    const success = await login('alex.rivera@google.com', 'google_oauth_bypass');
    if (success) {
      navigate(redirectPath);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-slate-50 dark:bg-slate-950 transition-colors relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-md h-[400px] pointer-events-none opacity-40 dark:opacity-20">
        <div className="absolute top-[10%] left-[10%] w-[250px] h-[250px] rounded-full bg-blue-500 blur-[80px]" />
        <div className="absolute top-[20%] right-[10%] w-[250px] h-[250px] rounded-full bg-indigo-500 blur-[90px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xl glass z-10"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Welcome Back
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-450 mt-2">
            Enter your credentials to access your career advisory board
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl border border-red-500/20 bg-red-500/5 text-red-600 dark:text-red-400 text-sm font-semibold text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-350 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                <Mail className="w-5 h-5" />
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                placeholder="you@example.com"
                className="w-full pl-11 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 text-slate-850 dark:text-white transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-350">
                Password
              </label>
              <a href="#" className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                <Lock className="w-5 h-5" />
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 text-slate-850 dark:text-white transition-all"
              />
            </div>
          </div>

          {/* Remeber Me checkbox */}
          <div className="flex items-center justify-between py-1">
            <label className="flex items-center gap-2 select-none cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 border-slate-350 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:ring-blue-500"
              />
              <span className="text-xs font-bold text-slate-500 dark:text-slate-450">Remember Me</span>
            </label>
          </div>

          {/* Login Button */}
          <Button type="submit" variant="primary" className="w-full font-bold" icon={LogIn}>
            Sign In
          </Button>
        </form>

        <div className="relative my-6 flex items-center justify-center">
          <hr className="w-full border-slate-100 dark:border-slate-800/80" />
          <span className="absolute px-3 bg-white dark:bg-slate-900 text-xs font-bold text-slate-400 uppercase tracking-widest">
            or
          </span>
        </div>

        {/* Google OAuth Button */}
        <Button
          variant="outline"
          className="w-full hover:bg-slate-50 dark:hover:bg-slate-900 border-slate-200 dark:border-slate-800 font-bold"
          icon={Chrome}
          onClick={handleGoogleLogin}
        >
          Sign in with Google
        </Button>

        {/* Redirect sign up */}
        <p className="text-center text-xs text-slate-500 dark:text-slate-450 mt-8 font-semibold">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-650 dark:text-blue-400 hover:underline font-bold">
            Sign up for free
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
