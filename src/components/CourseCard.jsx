import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, BookOpen, Clock } from 'lucide-react';
import Button from './Button';

const CourseCard = ({ title, provider, duration, skillsCovered, priceType, link }) => {
  return (
    <motion.div
      whileHover={{ y: -3, boxShadow: '0 12px 30px rgba(0, 0, 0, 0.05)' }}
      className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl flex flex-col justify-between h-full transition-all"
    >
      <div>
        <div className="flex justify-between items-start mb-3">
          <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            {provider}
          </span>
          <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-full ${
            priceType === 'Free'
              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
              : 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20'
          }`}>
            {priceType}
          </span>
        </div>

        <h4 className="font-bold text-slate-800 dark:text-white text-lg mb-2 line-clamp-2 leading-tight">
          {title}
        </h4>

        <div className="flex flex-col gap-2 mt-4 text-sm text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-slate-400" />
            <span>{duration}</span>
          </div>
          <div className="flex items-start gap-1.5 mt-1">
            <BookOpen className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
            <span className="line-clamp-2"><strong>Focus:</strong> {skillsCovered}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/60">
        <Button
          variant="outline"
          size="sm"
          className="w-full text-xs font-semibold hover:border-blue-500 dark:hover:border-blue-500"
          icon={ExternalLink}
          onClick={() => window.open(link, '_blank')}
        >
          View Course
        </Button>
      </div>
    </motion.div>
  );
};

export default CourseCard;
