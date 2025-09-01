"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';

export default function Loader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 1100);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0.7 }}
            animate={{ scale: [0.9, 1.05, 1], opacity: [0.7, 1, 1] }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="relative"
            style={{ transformOrigin: 'center' }}
          >
            <div className="w-24 h-24 rounded-full bg-blue-900/30 border-2 border-blue-600/50 flex items-center justify-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                CN
              </span>
            </div>
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, rotate: 0 }}
              animate={{ opacity: [0, 1, 0], rotate: [0, 15, 0] }}
              transition={{ duration: 0.9, ease: 'easeInOut' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
