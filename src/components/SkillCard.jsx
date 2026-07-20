import React from 'react';
import { motion } from 'framer-motion';
import { Check, AlertTriangle, X } from 'lucide-react';

const SkillCard = ({ name, type = 'matched', level, gap, importance }) => {
  const statusConfig = {
    matched: {
      border: 'border-emerald-500/20 dark:border-emerald-500/10',
      bg: 'bg-emerald-500/5 dark:bg-emerald-950/10',
      text: 'text-emerald-700 dark:text-emerald-400',
      icon: <Check className="w-4 h-4 text-emerald-500" />
    },
    partiallyMatched: {
      border: 'border-amber-500/20 dark:border-amber-500/10',
      bg: 'bg-amber-500/5 dark:bg-amber-950/10',
      text: 'text-amber-700 dark:text-amber-400',
      icon: <AlertTriangle className="w-4 h-4 text-amber-500" />
    },
    missing: {
      border: 'border-rose-500/20 dark:border-rose-500/10',
      bg: 'bg-rose-500/5 dark:bg-rose-950/10',
      text: 'text-rose-700 dark:text-rose-450',
      icon: <X className="w-4 h-4 text-rose-500" />
    }
  };

  const config = statusConfig[type] || statusConfig.matched;

  return (
    <motion.div
      whileHover={{ y: -2, boxShadow: '0 8px 30px rgba(0, 0, 0, 0.04)' }}
      className={`p-4 rounded-xl border glass flex flex-col justify-between transition-all ${config.border} ${config.bg}`}
    >
      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-semibold text-slate-800 dark:text-slate-200">{name}</h4>
          <span className="p-1 rounded-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm flex items-center justify-center">
            {config.icon}
          </span>
        </div>

        {type === 'matched' && level && (
          <div className="mt-2">
            <div className="flex justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
              <span>Proficiency</span>
              <span>{level}%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${level}%` }} />
            </div>
          </div>
        )}

        {type === 'partiallyMatched' && gap && (
          <p className="text-xs text-amber-600 dark:text-amber-400 mt-1 font-medium italic">
            Gap: {gap}
          </p>
        )}

        {type === 'missing' && importance && (
          <span className={`inline-block mt-2 px-2 py-0.5 text-[10px] font-bold uppercase rounded ${
            importance === 'Critical' ? 'bg-red-500/20 text-red-700 dark:text-red-400' :
            importance === 'High' ? 'bg-amber-500/20 text-amber-700 dark:text-amber-400' :
            'bg-slate-500/20 text-slate-700 dark:text-slate-400'
          }`}>
            {importance} Priority
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default SkillCard;
