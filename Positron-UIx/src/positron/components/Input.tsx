import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: 'default' | 'brutal';
  size?: 'sm' | 'md' | 'lg';
  error?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  label?: string;
  helperText?: string;
}

const inputVariants = {
  default: 'bg-white border-black focus:ring-2 focus:ring-black focus:ring-offset-2',
  brutal: 'bg-yellow-100 border-black focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:bg-white',
};

const sizeVariants = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

const motionVariants = {
  initial: { scale: 1 },
  focus: { 
    scale: 1.02,
    transition: { 
      duration: 0.15,
      ease: [0.68, -0.55, 0.265, 1.55] as const
    }
  },
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = 'default',
      size = 'md',
      error = false,
      leftIcon,
      rightIcon,
      label,
      helperText,
      className,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = React.useState(false);

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-bold font-mono text-neutral-900 mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500">
              {leftIcon}
            </div>
          )}
          <motion.input
            ref={ref}
            className={cn(
              // Base styles
              'w-full rounded border-2 font-mono font-medium',
              'transition-all duration-200 ease-out',
              'focus:outline-none',
              'shadow-[2px_2px_0px_0px_#000000]',
              'focus:shadow-[4px_4px_0px_0px_#000000]',
              
              // Variant styles
              inputVariants[variant],
              
              // Size styles
              sizeVariants[size],
              
              // Icon padding
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              
              // Error styles
              error && 'border-red-500 focus:ring-red-500',
              
              className
            )}
            variants={motionVariants}
            initial="initial"
            animate={isFocused ? "focus" : "initial"}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            {...(props as any)}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500">
              {rightIcon}
            </div>
          )}
        </div>
        {helperText && (
          <p className={cn(
            'mt-2 text-sm font-mono',
            error ? 'text-red-600' : 'text-neutral-600'
          )}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
