import React from 'react';
import { motion } from 'framer-motion';

const Loader = ({ message = "Analyzing Resume with AI...", size = "md" }) => {
  const containerVariants = {
    start: {
      transition: {
        staggerChildren: 0.2
      }
    },
    end: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const circleVariants = {
    start: {
      y: "0%"
    },
    end: {
      y: "100%"
    }
  };

  const circleTransition = {
    duration: 0.6,
    repeat: Infinity,
    repeatType: "reverse",
    ease: "easeInOut"
  };

  const dimensions = {
    sm: "w-2 h-2 mx-1",
    md: "w-4 h-4 mx-1.5",
    lg: "w-6 h-6 mx-2"
  };

  return (
    <div className="flex flex-col items-center justify-center py-12">
      {/* Wave animation circles */}
      <motion.div
        className="flex mb-6"
        variants={containerVariants}
        initial="start"
        animate="end"
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className={`${dimensions[size]} bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full`}
            variants={circleVariants}
            transition={circleTransition}
          />
        ))}
      </motion.div>
      {message && (
        <motion.p
          initial={{ opacity: 0.5, y: 5 }}
          animate={{ opacity: [0.5, 1, 0.5], y: 0 }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-slate-600 dark:text-slate-300 font-medium text-lg tracking-wide"
        >
          {message}
        </motion.p>
      )}
    </div>
  );
};

export default Loader;
