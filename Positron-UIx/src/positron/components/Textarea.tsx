import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: 'default' | 'brutal';
  error?: boolean;
  label?: string;
  helperText?: string;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

const textareaVariants = {
  default: 'bg-white border-black focus:ring-2 focus:ring-black focus:ring-offset-2',
  brutal: 'bg-yellow-100 border-black focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:bg-white',
};

const motionVariants = {
  initial: { scale: 1 },
  focus: { 
    scale: 1.01,
    transition: { 
      duration: 0.15,
      ease: [0.68, -0.55, 0.265, 1.55] as const
    }
  },
};

const resizeVariants = {
  none: 'resize-none',
  vertical: 'resize-y',
  horizontal: 'resize-x',
  both: 'resize',
};

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      variant = 'default',
      error = false,
      label,
      helperText,
      resize = 'vertical',
      className,
      rows = 4,
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
        <motion.textarea
          ref={ref}
          rows={rows}
          className={cn(
            // Base styles
            'w-full px-4 py-3 rounded border-2 font-mono font-medium',
            'transition-all duration-200 ease-out',
            'focus:outline-none',
            'shadow-[2px_2px_0px_0px_#000000]',
            'focus:shadow-[4px_4px_0px_0px_#000000]',
            'placeholder:text-neutral-400',
            
            // Variant styles
            textareaVariants[variant],
            
            // Resize styles
            resizeVariants[resize],
            
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

Textarea.displayName = 'Textarea';
