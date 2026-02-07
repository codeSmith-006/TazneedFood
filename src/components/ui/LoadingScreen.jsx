"use client";

import { motion } from "framer-motion";

export default function LoadingScreen({
  title = "Loading...",
  subtitle = "Please wait"
}) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-background">
      <div className="text-center px-4">
        {/* Animated Logo/Spinner */}
        <motion.div
          className="relative mx-auto w-16 h-16 mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Outer Ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-primary/20"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          {/* Inner Spinning Circle */}
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          {/* Center Dot */}
          <motion.div
            className="absolute inset-0 m-auto w-4 h-4 rounded-full bg-primary"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [1, 0.8, 1]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="space-y-2"
        >
          <h3 className="font-display text-xl sm:text-2xl font-semibold text-foreground">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {subtitle}
          </p>
        </motion.div>

        {/* Pulsing Dots */}
        <motion.div
          className="flex items-center justify-center gap-2 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-2 h-2 rounded-full bg-primary"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}