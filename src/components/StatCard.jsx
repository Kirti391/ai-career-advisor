import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon: Icon, description, trend, trendType = 'up' }) => {
  const trendColors = {
    up: 'text-emerald-600 dark:text-emerald-450 bg-emerald-500/10 border-emerald-500/20',
    down: 'text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/20',
    neutral: 'text-slate-500 dark:text-slate-400 bg-slate-500/10 border-slate-500/20'
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="text-sm font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wide">
            {title}
          </span>
          <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1 tracking-tight">
            {value}
          </h3>
        </div>
        <div className="p-3 bg-blue-500/5 dark:bg-blue-500/10 border border-blue-500/10 rounded-xl text-blue-600 dark:text-blue-450">
          {Icon && <Icon className="w-6 h-6" />}
        </div>
      </div>
      
      <div className="flex items-center gap-2 mt-2">
        {trend && (
          <span className={`px-2 py-0.5 text-xs font-bold rounded border ${trendColors[trendType]}`}>
            {trend}
          </span>
        )}
        {description && (
          <span className="text-xs text-slate-450 dark:text-slate-500 font-medium">
            {description}
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default StatCard;
