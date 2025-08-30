import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { AlertCircle, CheckCircle, Info, XCircle, X } from 'lucide-react';
import { cn } from '../utils/cn';

export interface AlertProps extends HTMLMotionProps<'div'> {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  closable?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}

const alertVariants = {
  info: {
    container: 'bg-blue-50 border-blue-500 text-blue-900',
    icon: 'text-blue-600',
    iconComponent: Info,
  },
  success: {
    container: 'bg-emerald-50 border-emerald-500 text-emerald-900',
    icon: 'text-emerald-600',
    iconComponent: CheckCircle,
  },
  warning: {
    container: 'bg-amber-50 border-amber-500 text-amber-900',
    icon: 'text-amber-600',
    iconComponent: AlertCircle,
  },
  error: {
    container: 'bg-red-50 border-red-500 text-red-900',
    icon: 'text-red-600',
    iconComponent: XCircle,
  },
};

const motionVariants = {
  initial: { opacity: 0, scale: 0.95, x: -10 },
  animate: { 
    opacity: 1, 
    scale: 1, 
    x: 0,
    transition: { 
      duration: 0.2,
      ease: [0.68, -0.55, 0.265, 1.55] as const
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95, 
    x: 10,
    transition: { 
      duration: 0.15,
      ease: [0.175, 0.885, 0.32, 1.275] as const
    }
  },
};

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      variant = 'info',
      title,
      closable = false,
      onClose,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const config = alertVariants[variant];
    const IconComponent = config.iconComponent;

    return (
      <motion.div
        ref={ref}
        className={cn(
          // Base styles
          'p-4 rounded border-2 font-mono',
          'shadow-[4px_4px_0px_0px_#000000]',
          
          // Variant styles
          config.container,
          
          className
        )}
        variants={motionVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        {...props}
      >
        <div className="flex items-start gap-3">
          <IconComponent className={cn('w-5 h-5 flex-shrink-0 mt-0.5', config.icon)} />
          <div className="flex-1 min-w-0">
            {title && (
              <h4 className="font-black text-base mb-1">
                {title}
              </h4>
            )}
            <div className="text-sm font-medium">
              {children}
            </div>
          </div>
          {closable && onClose && (
            <button
              onClick={onClose}
              className={cn(
                'flex-shrink-0 p-1 rounded hover:bg-black/10 transition-colors',
                config.icon
              )}
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </motion.div>
    );
  }
);

Alert.displayName = 'Alert';
