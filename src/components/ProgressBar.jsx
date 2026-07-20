import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ value = 0, max = 100, label, color = 'blue', className = '' }) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const colors = {
    blue: 'bg-gradient-to-r from-blue-500 to-indigo-600',
    green: 'bg-gradient-to-r from-emerald-500 to-teal-500',
    yellow: 'bg-gradient-to-r from-amber-500 to-yellow-500',
    red: 'bg-gradient-to-r from-rose-500 to-red-600',
    purple: 'bg-gradient-to-r from-purple-500 to-pink-600'
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="flex justify-between mb-1.5 text-sm font-medium text-slate-700 dark:text-slate-300">
          <span>{label}</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={`h-full rounded-full ${colors[color] || colors.blue}`}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
