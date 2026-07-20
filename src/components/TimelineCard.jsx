import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';

const TimelineCard = ({ phase, objectives = [], deliverables, index }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="relative flex gap-6 md:gap-8 pb-10 last:pb-0">
      {/* Timeline Line */}
      <div className="absolute top-0 bottom-0 left-[19px] w-0.5 bg-slate-200 dark:bg-slate-800 last:hidden" />

      {/* Circle Marker */}
      <div className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full border-2 border-blue-500 bg-white dark:bg-slate-900 shadow-md">
        <Calendar className="w-5 h-5 text-blue-500" />
      </div>

      {/* Main Card */}
      <div className="flex-grow">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
        >
          {/* Header */}
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-850 select-none border-b border-transparent dark:border-transparent transition-colors"
          >
            <h4 className="font-bold text-slate-800 dark:text-white text-base md:text-lg">
              {phase}
            </h4>
            <span className="text-slate-400 dark:text-slate-500">
              {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </span>
          </div>

          {/* Body */}
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                exit={{ height: 0 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                <div className="px-6 pb-6 pt-2 border-t border-slate-100 dark:border-slate-800/85">
                  <span className="text-xs uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500 mb-3 block">
                    Core Objectives
                  </span>
                  
                  <ul className="flex flex-col gap-3.5 mb-6">
                    {objectives.map((obj, i) => (
                      <li key={i} className="flex gap-3 text-sm md:text-base text-slate-600 dark:text-slate-355 leading-relaxed">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>

                  {deliverables && (
                    <div className="p-4 bg-blue-50/50 dark:bg-blue-950/10 border border-blue-100/50 dark:border-blue-900/30 rounded-xl">
                      <span className="font-bold text-xs text-blue-600 dark:text-blue-400 uppercase tracking-wide block mb-1">
                        Phase Milestone Deliverable:
                      </span>
                      <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                        {deliverables}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default TimelineCard;
