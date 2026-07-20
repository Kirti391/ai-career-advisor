import React from 'react';
import { motion } from 'framer-motion';

const DashboardCard = ({ title, subtitle, children, actions, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm flex flex-col justify-between overflow-hidden ${className}`}
    >
      {/* Header */}
      {(title || subtitle || actions) && (
        <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between flex-wrap gap-4">
          <div>
            {title && (
              <h3 className="font-bold text-slate-950 dark:text-white text-base md:text-lg tracking-tight">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-xs md:text-sm text-slate-450 dark:text-slate-500 font-medium mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
          {actions && (
            <div className="flex items-center gap-2">
              {actions}
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="p-6 grow">
        {children}
      </div>
    </motion.div>
  );
};

export default DashboardCard;
