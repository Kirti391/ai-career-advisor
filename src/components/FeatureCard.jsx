import React from 'react';
import { motion } from 'framer-motion';

const FeatureCard = ({ title, description, icon: Icon }) => {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      className="p-6 md:p-8 bg-white/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-305 flex flex-col items-start text-left glass"
    >
      <div className="p-4 bg-blue-500/10 dark:bg-blue-500/20 border border-blue-500/20 rounded-2xl text-blue-600 dark:text-blue-400 mb-6 flex items-center justify-center">
        {Icon && <Icon className="w-6 h-6" />}
      </div>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
        {title}
      </h3>
      <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};

export default FeatureCard;
