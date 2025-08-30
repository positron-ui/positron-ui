import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error';
  showValue?: boolean;
  label?: string;
}

const sizeVariants = {
  sm: 'h-2',
  md: 'h-3',
  lg: 'h-4',
};

const colorVariants = {
  primary: 'bg-sky-500',
  secondary: 'bg-yellow-400',
  accent: 'bg-pink-500',
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  error: 'bg-red-500',
};

const progressVariants = {
  initial: { width: 0, scale: 1 },
  animate: (progress: number) => ({
    width: `${progress}%`,
    scale: 1,
    transition: { 
      duration: 0.8,
      ease: [0.68, -0.55, 0.265, 1.55] as const
    }
  }),
  pulse: {
    scale: [1, 1.02, 1],
    transition: { 
      duration: 0.6,
      repeat: Infinity,
      ease: [0.68, -0.55, 0.265, 1.55] as const
    }
  },
};

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      value,
      max = 100,
      size = 'md',
      color = 'primary',
      showValue = false,
      label,
      className,
      ...props
    },
    ref
  ) => {
    const progress = Math.min(Math.max((value / max) * 100, 0), 100);
    const isComplete = progress >= 100;

    return (
      <div className={cn('w-full', className)} {...props}>
        {(label || showValue) && (
          <div className="flex justify-between items-center mb-2">
            {label && (
              <span className="text-sm font-mono font-bold text-neutral-900">
                {label}
              </span>
            )}
            {showValue && (
              <span className="text-sm font-mono text-neutral-600">
                {Math.round(progress)}%
              </span>
            )}
          </div>
        )}
        <div
          ref={ref}
          className={cn(
            'w-full bg-neutral-200 rounded border-2 border-black overflow-hidden',
            'shadow-[2px_2px_0px_0px_#000000]',
            sizeVariants[size]
          )}
        >
          <motion.div
            className={cn(
              'h-full rounded-sm',
              colorVariants[color],
              isComplete && 'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3)]'
            )}
            variants={progressVariants}
            initial="initial"
            animate={isComplete ? "pulse" : "animate"}
            custom={progress}
          />
        </div>
      </div>
    );
  }
);

Progress.displayName = 'Progress';
