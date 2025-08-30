import React from 'react';
import { motion } from 'framer-motion';
import { Check, Minus } from 'lucide-react';
import { cn } from '../utils/cn';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 'sm' | 'md' | 'lg';
  indeterminate?: boolean;
  label?: string;
  description?: string;
}

const sizeVariants = {
  sm: {
    container: 'w-4 h-4',
    icon: 'w-3 h-3',
    text: 'text-sm',
  },
  md: {
    container: 'w-5 h-5',
    icon: 'w-4 h-4',
    text: 'text-base',
  },
  lg: {
    container: 'w-6 h-6',
    icon: 'w-5 h-5',
    text: 'text-lg',
  },
};

const checkVariants = {
  unchecked: { scale: 0, opacity: 0 },
  checked: { 
    scale: 1, 
    opacity: 1,
    transition: { 
      duration: 0.15,
      ease: [0.68, -0.55, 0.265, 1.55] as const
    }
  },
};

const boxVariants = {
  unchecked: { 
    backgroundColor: '#ffffff',
    borderColor: '#000000',
    scale: 1,
  },
  checked: { 
    backgroundColor: '#0ea5e9',
    borderColor: '#000000',
    scale: 1.05,
    transition: { 
      duration: 0.15,
      ease: [0.68, -0.55, 0.265, 1.55] as const
    }
  },
  indeterminate: { 
    backgroundColor: '#f59e0b',
    borderColor: '#000000',
    scale: 1.05,
    transition: { 
      duration: 0.15,
      ease: [0.68, -0.55, 0.265, 1.55] as const
    }
  },
};

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      size = 'md',
      indeterminate = false,
      label,
      description,
      className,
      checked,
      ...props
    },
    ref
  ) => {
    const sizeConfig = sizeVariants[size];
    const isChecked = indeterminate ? false : checked;
    const state = indeterminate ? 'indeterminate' : (isChecked ? 'checked' : 'unchecked');

    return (
      <label className={cn('inline-flex items-start gap-3 cursor-pointer', className)}>
        <div className="relative flex-shrink-0">
          <input
            type="checkbox"
            ref={ref}
            checked={isChecked}
            className="sr-only"
            {...props}
          />
          <motion.div
            className={cn(
              'rounded border-2 flex items-center justify-center',
              'shadow-[2px_2px_0px_0px_#000000]',
              'focus-within:ring-2 focus-within:ring-black focus-within:ring-offset-2',
              sizeConfig.container
            )}
            variants={boxVariants}
            animate={state}
          >
            {indeterminate ? (
              <motion.div
                variants={checkVariants}
                animate="checked"
                initial="unchecked"
              >
                <Minus className={cn('text-white', sizeConfig.icon)} />
              </motion.div>
            ) : (
              <motion.div
                variants={checkVariants}
                animate={isChecked ? "checked" : "unchecked"}
                initial="unchecked"
              >
                <Check className={cn('text-white', sizeConfig.icon)} />
              </motion.div>
            )}
          </motion.div>
        </div>
        {(label || description) && (
          <div className="min-w-0">
            {label && (
              <div className={cn('font-mono font-bold text-neutral-900', sizeConfig.text)}>
                {label}
              </div>
            )}
            {description && (
              <div className="text-sm font-mono text-neutral-600 mt-1">
                {description}
              </div>
            )}
          </div>
        )}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
