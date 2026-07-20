import React from 'react';
import { motion } from 'framer-motion';
import { Award, Clock, ArrowUpRight } from 'lucide-react';

const ProjectCard = ({ name, difficulty, description, estimatedTime, skillsLearned = [] }) => {
  const diffColors = {
    Easy: 'bg-emerald-550/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    Medium: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    Hard: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20'
  };

  return (
    <motion.div
      whileHover={{ y: -3, boxShadow: '0 12px 30px rgba(0, 0, 0, 0.05)' }}
      className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl flex flex-col justify-between h-full transition-all"
    >
      <div>
        <div className="flex justify-between items-center mb-3">
          <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded border ${diffColors[difficulty] || diffColors.Medium}`}>
            {difficulty}
          </span>
          <div className="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500 font-semibold">
            <Clock className="w-3.5 h-3.5" />
            <span>{estimatedTime}</span>
          </div>
        </div>

        <h4 className="font-bold text-slate-800 dark:text-white text-lg mb-2 flex items-center gap-1 group">
          {name}
        </h4>

        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
          {description}
        </p>
      </div>

      <div>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {skillsLearned.map((skill, idx) => (
            <span
              key={idx}
              className="px-2 py-1 text-[10px] font-medium bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-355 rounded border border-slate-100 dark:border-slate-750"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
