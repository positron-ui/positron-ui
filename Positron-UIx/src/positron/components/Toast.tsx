import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info, XCircle } from 'lucide-react';
import { cn } from '../utils/cn';

export interface ToastProps {
  id: string;
  title?: string;
  description?: string;
  variant?: 'info' | 'success' | 'warning' | 'error';
  duration?: number;
  onClose?: (id: string) => void;
}

const toastVariants = {
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
  initial: { 
    opacity: 0, 
    scale: 0.8, 
    x: 100,
    rotate: 5,
  },
  animate: { 
    opacity: 1, 
    scale: 1, 
    x: 0,
    rotate: 0,
    transition: { 
      duration: 0.3,
      ease: [0.68, -0.55, 0.265, 1.55] as const
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.8, 
    x: 100,
    rotate: -5,
    transition: { 
      duration: 0.2,
      ease: [0.175, 0.885, 0.32, 1.275] as const
    }
  },
};

export const Toast: React.FC<ToastProps> = ({
  id,
  title,
  description,
  variant = 'info',
  duration = 5000,
  onClose,
}) => {
  const config = toastVariants[variant];
  const IconComponent = config.iconComponent;

  React.useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose?.(id);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [id, duration, onClose]);

  return (
    <motion.div
      className={cn(
        'relative p-4 rounded border-2 font-mono max-w-sm w-full',
        'shadow-[4px_4px_0px_0px_#000000]',
        config.container
      )}
      variants={motionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      layout
    >
      <div className="flex items-start gap-3">
        <IconComponent className={cn('w-5 h-5 flex-shrink-0 mt-0.5', config.icon)} />
        <div className="flex-1 min-w-0">
          {title && (
            <h4 className="font-black text-base mb-1">
              {title}
            </h4>
          )}
          {description && (
            <div className="text-sm font-medium">
              {description}
            </div>
          )}
        </div>
        <button
          onClick={() => onClose?.(id)}
          className={cn(
            'flex-shrink-0 p-1 rounded hover:bg-black/10 transition-colors',
            config.icon
          )}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

export interface ToastContainerProps {
  toasts: ToastProps[];
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

const positionVariants = {
  'top-right': 'top-4 right-4',
  'top-left': 'top-4 left-4',
  'bottom-right': 'bottom-4 right-4',
  'bottom-left': 'bottom-4 left-4',
};

export const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  position = 'top-right',
}) => {
  return (
    <div className={cn('fixed z-50 flex flex-col gap-2', positionVariants[position])}>
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} />
        ))}
      </AnimatePresence>
    </div>
  );
};

Toast.displayName = 'Toast';
ToastContainer.displayName = 'ToastContainer';
