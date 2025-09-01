import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative mb-8"
        >
          <div className="flex items-center justify-center space-x-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="relative"
            >
              <Star className="w-12 h-12 text-yellow-400" />
              <div className="absolute inset-0 bg-yellow-400/30 rounded-full blur-xl animate-pulse"></div>
            </motion.div>
            <motion.h1
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl font-bold bg-gradient-to-r from-yellow-400 via-purple-500 to-red-500 bg-clip-text text-transparent"
            >
              SAUNTRIX
            </motion.h1>
          </div>
        </motion.div>
        
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-gray-300 text-lg mb-8"
        >
          Stronger Together, Shining Forever
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1, duration: 1.5 }}
          className="w-64 h-1 bg-gradient-to-r from-yellow-400 via-purple-500 to-red-500 mx-auto rounded-full"
        ></motion.div>
      </div>
    </div>
  );
};

export default LoadingScreen;