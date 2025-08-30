import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'accent' | 'neutral' | 'success' | 'warning' | 'error';
  variant?: 'circular' | 'dots' | 'square';
}

const sizeVariants = {
  xs: 'w-4 h-4',
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-10 h-10',
  xl: 'w-12 h-12',
};

const colorVariants = {
  primary: 'border-sky-500',
  secondary: 'border-yellow-500',
  accent: 'border-pink-500',
  neutral: 'border-neutral-600',
  success: 'border-emerald-500',
  warning: 'border-amber-500',
  error: 'border-red-500',
};

const dotColorVariants = {
  primary: 'bg-sky-500',
  secondary: 'bg-yellow-500',
  accent: 'bg-pink-500',
  neutral: 'bg-neutral-600',
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  error: 'bg-red-500',
};

const circularVariants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear" as const
    }
  }
};

const dotsVariants = {
  animate: {
    scale: [1, 1.2, 1],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      ease: [0.68, -0.55, 0.265, 1.55] as const
    }
  }
};

const squareVariants = {
  animate: {
    rotate: [0, 90, 180, 270, 360],
    scale: [1, 1.1, 1, 1.1, 1],
    transition: {
      duration: 1.2,
      repeat: Infinity,
      ease: [0.68, -0.55, 0.265, 1.55] as const
    }
  }
};

export const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  (
    {
      size = 'md',
      color = 'primary',
      variant = 'circular',
      className,
      ...props
    },
    ref
  ) => {
    if (variant === 'circular') {
      return (
        <motion.div
          ref={ref}
          className={cn(
            'rounded-full border-2 border-t-transparent',
            sizeVariants[size],
            colorVariants[color],
            className
          )}
          variants={circularVariants}
          animate="animate"
          
        />
      );
    }

    if (variant === 'dots') {
      return (
        <div
          ref={ref}
          className={cn('flex items-center justify-center gap-1', className)}
          {...props}
        >
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className={cn(
                'w-2 h-2 rounded-full border border-black',
                dotColorVariants[color]
              )}
              variants={dotsVariants}
              animate="animate"
              style={{
                animationDelay: `${index * 0.2}s`
              }}
            />
          ))}
        </div>
      );
    }

    if (variant === 'square') {
      return (
        <motion.div
          ref={ref}
          className={cn(
            'border-2 border-black',
            sizeVariants[size],
            dotColorVariants[color],
            className
          )}
          variants={squareVariants}
          animate="animate"
        />
      );
    }

    return null;
  }
);

Spinner.displayName = 'Spinner';
