import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const InterviewCard = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`Q: ${question}\nA: ${answer}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900 transition-all duration-200">
      {/* Header */}
      <div
  onClick={() => setIsOpen(!isOpen)}
  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-850 gap-4 cursor-pointer"
>
        <span className="font-semibold text-slate-800 dark:text-slate-200 text-sm md:text-base leading-snug">
          {question}
        </span>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-750 text-slate-450 hover:text-slate-655 dark:hover:text-slate-250 bg-white dark:bg-slate-850 hover:bg-slate-50 transition-all flex items-center justify-center"
            title="Copy question and answer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
          </button>
          <span className="text-slate-400 dark:text-slate-500">
            {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </span>
        </div>
      </div>

      {/* Answer content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <div className="px-6 pb-5 pt-1 text-slate-600 dark:text-slate-355 text-sm md:text-base border-t border-slate-100 dark:border-slate-800/80 leading-relaxed">
              <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-lg border border-slate-100 dark:border-slate-850">
                <span className="font-semibold text-xs text-blue-500 dark:text-blue-400 uppercase tracking-wider block mb-1">
                  Suggested Answer Outline:
                </span>
                {answer}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InterviewCard;
