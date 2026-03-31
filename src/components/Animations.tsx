import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

export const FadeUp = ({ children, delay = 0, className = '', duration = 0.5 }: { children: React.ReactNode, delay?: number, className?: string, duration?: number }) => {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerContainer = ({ children, className = '', delayChildren = 0, staggerChildren = 0.15 }: { children: React.ReactNode, className?: string, delayChildren?: number, staggerChildren?: number }) => {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: shouldReduceMotion ? 1 : 0 },
        visible: {
          opacity: 1,
          transition: {
            delayChildren,
            staggerChildren: shouldReduceMotion ? 0 : staggerChildren,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({ children, className = '', yOffset = 30 }: { children: React.ReactNode, className?: string, yOffset?: number, key?: React.Key }) => {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: shouldReduceMotion ? 0 : yOffset },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
