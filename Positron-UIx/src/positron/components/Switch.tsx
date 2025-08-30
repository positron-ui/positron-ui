import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  description?: string;
}

const sizeVariants = {
  sm: {
    track: 'w-9 h-5',
    thumb: 'w-4 h-4',
    translate: 'translate-x-4',
    text: 'text-sm',
  },
  md: {
    track: 'w-11 h-6',
    thumb: 'w-5 h-5',
    translate: 'translate-x-5',
    text: 'text-base',
  },
  lg: {
    track: 'w-14 h-7',
    thumb: 'w-6 h-6',
    translate: 'translate-x-7',
    text: 'text-lg',
  },
};

const trackVariants = {
  off: { 
    backgroundColor: '#e5e5e5',
    borderColor: '#000000',
  },
  on: { 
    backgroundColor: '#0ea5e9',
    borderColor: '#000000',
    transition: { 
      duration: 0.2,
      ease: [0.68, -0.55, 0.265, 1.55] as const
    }
  },
};

const thumbVariants = {
  off: { 
    x: 2,
    scale: 1,
  },
  on: { 
    x: '100%',
    scale: 1.1,
    transition: { 
      duration: 0.2,
      ease: [0.68, -0.55, 0.265, 1.55] as const
    }
  },
};

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      size = 'md',
      label,
      description,
      checked,
      className,
      ...props
    },
    ref
  ) => {
    const sizeConfig = sizeVariants[size];
    const state = checked ? 'on' : 'off';

    return (
      <label className={cn('inline-flex items-start gap-3 cursor-pointer', className)}>
        <div className="relative flex-shrink-0">
          <input
            type="checkbox"
            ref={ref}
            checked={checked}
            className="sr-only"
            {...props}
          />
          <motion.div
            className={cn(
              'relative rounded-full border-2 p-0.5',
              'shadow-[2px_2px_0px_0px_#000000]',
              'focus-within:ring-2 focus-within:ring-black focus-within:ring-offset-2',
              sizeConfig.track
            )}
            variants={trackVariants}
            animate={state}
          >
            <motion.div
              className={cn(
                'bg-white rounded-full border border-black',
                'shadow-[1px_1px_0px_0px_#000000]',
                sizeConfig.thumb
              )}
              variants={thumbVariants}
              animate={state}
            />
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

Switch.displayName = 'Switch';
