import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../utils/cn';

export interface BadgeProps extends HTMLMotionProps<'span'> {
  variant?: 'solid' | 'outline' | 'soft';
  color?: 'primary' | 'secondary' | 'accent' | 'neutral' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const badgeVariants = {
  solid: {
    primary: 'bg-sky-500 text-white border-black',
    secondary: 'bg-yellow-400 text-black border-black',
    accent: 'bg-pink-500 text-white border-black',
    neutral: 'bg-neutral-800 text-white border-black',
    success: 'bg-emerald-500 text-white border-black',
    warning: 'bg-amber-500 text-black border-black',
    error: 'bg-red-500 text-white border-black',
  },
  outline: {
    primary: 'bg-transparent text-sky-600 border-sky-500',
    secondary: 'bg-transparent text-yellow-700 border-yellow-500',
    accent: 'bg-transparent text-pink-600 border-pink-500',
    neutral: 'bg-transparent text-neutral-800 border-neutral-600',
    success: 'bg-transparent text-emerald-600 border-emerald-500',
    warning: 'bg-transparent text-amber-700 border-amber-500',
    error: 'bg-transparent text-red-600 border-red-500',
  },
  soft: {
    primary: 'bg-sky-100 text-sky-800 border-sky-200',
    secondary: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    accent: 'bg-pink-100 text-pink-800 border-pink-200',
    neutral: 'bg-neutral-100 text-neutral-800 border-neutral-200',
    success: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    warning: 'bg-amber-100 text-amber-800 border-amber-200',
    error: 'bg-red-100 text-red-800 border-red-200',
  },
};

const sizeVariants = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-1.5 text-base',
};

const motionVariants = {
  initial: { scale: 1, rotate: 0 },
  hover: { 
    scale: 1.05,
    rotate: 1,
    transition: { 
      duration: 0.15,
      ease: [0.68, -0.55, 0.265, 1.55] as const
    }
  },
  tap: { 
    scale: 0.95,
    rotate: -1,
    transition: { 
      duration: 0.1,
      ease: [0.175, 0.885, 0.32, 1.275] as const
    }
  },
};

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = 'solid',
      color = 'primary',
      size = 'md',
      children,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <motion.span
        ref={ref}
        className={cn(
          // Base styles
          'inline-flex items-center justify-center rounded border-2 font-mono font-bold',
          'shadow-[2px_2px_0px_0px_#000000]',
          
          // Variant styles
          badgeVariants[variant][color],
          
          // Size styles
          sizeVariants[size],
          
          className
        )}
        variants={motionVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        {...props}
      >
        {children}
      </motion.span>
    );
  }
);

Badge.displayName = 'Badge';
