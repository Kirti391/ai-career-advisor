import React from 'react';
import { motion } from 'framer-motion';

const ATSGauge = ({ score = 0, size = 180 }) => {
  const getScoreColor = (val) => {
    if (val < 60) return 'text-red-500 stroke-red-500 dark:stroke-red-400';
    if (val < 80) return 'text-amber-500 stroke-amber-500 dark:stroke-amber-450';
    return 'text-emerald-500 stroke-emerald-500 dark:stroke-emerald-400';
  };

  const getScoreStatus = (val) => {
    if (val < 60) return 'Needs Work';
    if (val < 80) return 'Competitive';
    return 'Excellent';
  };

  // Semi-circle configuration
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * Math.PI; // semi-circle circumference
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size / 2 + 10 }}>
        <svg className="w-full" viewBox={`0 0 ${size} ${size / 2 + 10}`}>
          {/* Background track (180 deg) */}
          <path
            className="text-slate-100 dark:text-slate-800"
            strokeWidth={strokeWidth}
            stroke="currentColor"
            strokeLinecap="round"
            fill="transparent"
            d={`M ${strokeWidth/2} ${size/2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth/2} ${size/2}`}
          />
          {/* Progress track */}
          <motion.path
            className={`${getScoreColor(score)}`}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            strokeLinecap="round"
            fill="transparent"
            d={`M ${strokeWidth/2} ${size/2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth/2} ${size/2}`}
          />
        </svg>

        {/* Text Details in middle */}
        <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center">
          <span className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {score}
          </span>
          <span className="text-xs uppercase font-semibold text-slate-400 dark:text-slate-500 mt-0.5">
            ATS Score
          </span>
        </div>
      </div>
      
      {/* Badge showing quality status */}
      <span className={`mt-4 px-3 py-1 text-xs font-semibold rounded-full glass border ${
        score < 60 ? 'bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400' :
        score < 80 ? 'bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400' :
        'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-450'
      }`}>
        {getScoreStatus(score)}
      </span>
    </div>
  );
};

export default ATSGauge;
