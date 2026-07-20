import React from 'react';
import { motion } from 'framer-motion';

const CircularProgress = ({ value = 0, size = 120, strokeWidth = 10, label, color = 'blue' }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  const colorStyles = {
    blue: 'stroke-blue-500 dark:stroke-blue-400',
    green: 'stroke-emerald-500 dark:stroke-emerald-450',
    yellow: 'stroke-amber-500 dark:stroke-amber-450',
    red: 'stroke-red-500 dark:stroke-red-400',
    purple: 'stroke-indigo-600 dark:stroke-indigo-400'
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="w-full h-full transform -rotate-95" viewBox={`0 0 ${size} ${size}`}>
          {/* Background circle */}
          <circle
            className="text-slate-100 dark:text-slate-800"
            strokeWidth={strokeWidth}
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
          {/* Progress circle */}
          <motion.circle
            className={`${colorStyles[color] || colorStyles.blue} transition-all duration-300`}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            strokeLinecap="round"
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
        </svg>
        {/* Percentage Label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-slate-900 dark:text-white">{Math.round(value)}%</span>
          {label && <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{label}</span>}
        </div>
      </div>
    </div>
  );
};

export default CircularProgress;
