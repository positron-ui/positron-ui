import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

export interface PopoverProps {
  trigger: React.ReactElement;
  content: React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'brutal';
  arrow?: boolean;
  closeOnOutsideClick?: boolean;
  className?: string;
}

const placementVariants = {
  top: {
    popover: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    arrow: 'top-full left-1/2 -translate-x-1/2 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-black',
  },
  bottom: {
    popover: 'top-full left-1/2 -translate-x-1/2 mt-2',
    arrow: 'bottom-full left-1/2 -translate-x-1/2 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-black',
  },
  left: {
    popover: 'right-full top-1/2 -translate-y-1/2 mr-2',
    arrow: 'left-full top-1/2 -translate-y-1/2 border-t-8 border-b-8 border-l-8 border-t-transparent border-b-transparent border-l-black',
  },
  right: {
    popover: 'left-full top-1/2 -translate-y-1/2 ml-2',
    arrow: 'right-full top-1/2 -translate-y-1/2 border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent border-r-black',
  },
};

const sizeVariants = {
  sm: 'w-48',
  md: 'w-64',
  lg: 'w-80',
};

const variantStyles = {
  default: 'bg-white border-black shadow-[4px_4px_0px_0px_#000000]',
  brutal: 'bg-yellow-100 border-black shadow-[6px_6px_0px_0px_#000000] rotate-1',
};

const popoverVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
    rotate: -8,
    y: -10,
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    rotate: 0,
    y: 0,
    transition: { 
      duration: 0.2,
      ease: [0.68, -0.55, 0.265, 1.55] as const
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.8,
    rotate: 8,
    y: 10,
    transition: { 
      duration: 0.15,
      ease: [0.175, 0.885, 0.32, 1.275] as const
    }
  },
};

export const Popover: React.FC<PopoverProps> = ({
  trigger,
  content,
  placement = 'bottom',
  size = 'md',
  variant = 'default',
  arrow = true,
  closeOnOutsideClick = true,
  className,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const popoverRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLElement>(null);
  
  const placementConfig = placementVariants[placement];

  const togglePopover = () => {
    setIsOpen(!isOpen);
  };

  const closePopover = () => {
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      closePopover();
    }
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        closeOnOutsideClick &&
        isOpen &&
        popoverRef.current &&
        triggerRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        closePopover();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, closeOnOutsideClick]);

  const clonedTrigger = React.cloneElement(trigger, {
    ref: triggerRef,
    onClick: togglePopover,
    onKeyDown: handleKeyDown,
    'aria-expanded': isOpen,
    'aria-haspopup': 'dialog',
  } as any);

  return (
    <div className="relative inline-block">
      {clonedTrigger}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={popoverRef}
            role="dialog"
            aria-modal="true"
            className={cn(
              'absolute z-50 p-4 border-2 rounded font-mono',
              'max-h-96 overflow-y-auto',
              placementConfig.popover,
              sizeVariants[size],
              variantStyles[variant],
              className
            )}
            variants={popoverVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {content}
            {arrow && (
              <div className={cn('absolute w-0 h-0', placementConfig.arrow)} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

Popover.displayName = 'Popover';
