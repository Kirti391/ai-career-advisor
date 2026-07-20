import React, { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle, Info, X } from 'lucide-react';
import { AppContext } from '../context/AppContext';

const ToastContainer = () => {
  const { toasts } = useContext(AppContext);

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-emerald-500" />,
    error: <AlertCircle className="w-5 h-5 text-red-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />
  };

  const bgStyles = {
    success: 'border-emerald-500/30 bg-emerald-500/5 dark:bg-emerald-950/20',
    error: 'border-red-500/30 bg-red-500/5 dark:bg-red-950/20',
    info: 'border-blue-500/30 bg-blue-500/5 dark:bg-blue-950/20'
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 w-full max-w-sm pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
            className={`flex items-start gap-3 p-4 rounded-xl border glass shadow-lg pointer-events-auto ${bgStyles[toast.type]}`}
          >
            <div className="flex-shrink-0 mt-0.5">
              {icons[toast.type]}
            </div>
            <div className="flex-grow">
              <p>
  {typeof toast.message === "string"
    ? toast.message
    : Array.isArray(toast.message)
      ? toast.message.map((e) => e.msg).join(", ")
      : JSON.stringify(toast.message)}
</p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;
