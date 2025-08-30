import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../utils/cn';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'size'> {
  variant?: 'solid' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'accent' | 'neutral' | 'success' | 'warning' | 'error';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

const buttonVariants = {
  solid: {
    primary: 'bg-sky-500 text-white border-black hover:bg-sky-400 active:bg-sky-600',
    secondary: 'bg-yellow-400 text-black border-black hover:bg-yellow-300 active:bg-yellow-500',
    accent: 'bg-pink-500 text-white border-black hover:bg-pink-400 active:bg-pink-600',
    neutral: 'bg-neutral-800 text-white border-black hover:bg-neutral-700 active:bg-neutral-900',
    success: 'bg-emerald-500 text-white border-black hover:bg-emerald-400 active:bg-emerald-600',
    warning: 'bg-amber-500 text-black border-black hover:bg-amber-400 active:bg-amber-600',
    error: 'bg-red-500 text-white border-black hover:bg-red-400 active:bg-red-600',
  },
  outline: {
    primary: 'bg-transparent text-sky-500 border-sky-500 hover:bg-sky-50 active:bg-sky-100',
    secondary: 'bg-transparent text-yellow-600 border-yellow-600 hover:bg-yellow-50 active:bg-yellow-100',
    accent: 'bg-transparent text-pink-500 border-pink-500 hover:bg-pink-50 active:bg-pink-100',
    neutral: 'bg-transparent text-neutral-800 border-neutral-800 hover:bg-neutral-50 active:bg-neutral-100',
    success: 'bg-transparent text-emerald-500 border-emerald-500 hover:bg-emerald-50 active:bg-emerald-100',
    warning: 'bg-transparent text-amber-600 border-amber-600 hover:bg-amber-50 active:bg-amber-100',
    error: 'bg-transparent text-red-500 border-red-500 hover:bg-red-50 active:bg-red-100',
  },
  ghost: {
    primary: 'bg-transparent text-sky-500 border-transparent hover:bg-sky-50 active:bg-sky-100',
    secondary: 'bg-transparent text-yellow-600 border-transparent hover:bg-yellow-50 active:bg-yellow-100',
    accent: 'bg-transparent text-pink-500 border-transparent hover:bg-pink-50 active:bg-pink-100',
    neutral: 'bg-transparent text-neutral-800 border-transparent hover:bg-neutral-50 active:bg-neutral-100',
    success: 'bg-transparent text-emerald-500 border-transparent hover:bg-emerald-50 active:bg-emerald-100',
    warning: 'bg-transparent text-amber-600 border-transparent hover:bg-amber-50 active:bg-amber-100',
    error: 'bg-transparent text-red-500 border-transparent hover:bg-red-50 active:bg-red-100',
  },
};

const sizeVariants = {
  sm: 'px-3 py-1.5 text-sm font-medium',
  md: 'px-4 py-2 text-base font-medium',
  lg: 'px-6 py-3 text-lg font-semibold',
};

const motionVariants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.02,
    transition: { 
      duration: 0.15,
      ease: [0.68, -0.55, 0.265, 1.55] as const
    }
  },
  tap: { 
    scale: 0.98,
    transition: { 
      duration: 0.1,
      ease: [0.175, 0.885, 0.32, 1.275] as const
    }
  },
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'solid',
      size = 'md',
      color = 'primary',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <motion.button
        ref={ref}
        className={cn(
          // Base styles
          'inline-flex items-center justify-center gap-2 rounded border-2 font-mono font-medium',
          'transition-all duration-200 ease-out',
          'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black',
          'shadow-[4px_4px_0px_0px_#000000]',
          'hover:shadow-[6px_6px_0px_0px_#000000]',
          'active:shadow-[2px_2px_0px_0px_#000000]',
          'active:translate-x-[2px] active:translate-y-[2px]',
          
          // Variant styles
          buttonVariants[variant][color],
          
          // Size styles
          sizeVariants[size],
          
          // Disabled styles
          isDisabled && 'opacity-50 cursor-not-allowed hover:shadow-[4px_4px_0px_0px_#000000] active:translate-x-0 active:translate-y-0',
          
          className
        )}
        variants={motionVariants}
        initial="initial"
        whileHover={!isDisabled ? "hover" : undefined}
        whileTap={!isDisabled ? "tap" : undefined}
        disabled={isDisabled}
        {...props}
      >
        {isLoading && (
          <motion.div
            className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        )}
        {!isLoading && leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
        <span className="truncate">{children}</span>
        {!isLoading && rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
