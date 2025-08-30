import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

export interface TooltipProps {
  content: React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  trigger?: 'hover' | 'click' | 'focus';
  delay?: number;
  children: React.ReactElement;
  className?: string;
}

const placementVariants = {
  top: {
    tooltip: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    arrow: 'top-full left-1/2 -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-black',
  },
  bottom: {
    tooltip: 'top-full left-1/2 -translate-x-1/2 mt-2',
    arrow: 'bottom-full left-1/2 -translate-x-1/2 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-black',
  },
  left: {
    tooltip: 'right-full top-1/2 -translate-y-1/2 mr-2',
    arrow: 'left-full top-1/2 -translate-y-1/2 border-t-4 border-b-4 border-l-4 border-t-transparent border-b-transparent border-l-black',
  },
  right: {
    tooltip: 'left-full top-1/2 -translate-y-1/2 ml-2',
    arrow: 'right-full top-1/2 -translate-y-1/2 border-t-4 border-b-4 border-r-4 border-t-transparent border-b-transparent border-r-black',
  },
};

const tooltipVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
    rotate: -5,
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    rotate: 0,
    transition: { 
      duration: 0.15,
      ease: [0.68, -0.55, 0.265, 1.55] as const
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.8,
    rotate: 5,
    transition: { 
      duration: 0.1,
      ease: [0.175, 0.885, 0.32, 1.275] as const
    }
  },
};

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  placement = 'top',
  trigger = 'hover',
  delay = 300,
  children,
  className,
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [delayTimeout, setDelayTimeout] = React.useState<NodeJS.Timeout | null>(null);
  const tooltipRef = React.useRef<HTMLDivElement>(null);
  
  const placementConfig = placementVariants[placement];

  const showTooltip = React.useCallback(() => {
    if (delayTimeout) {
      clearTimeout(delayTimeout);
    }
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    setDelayTimeout(timeout);
  }, [delay, delayTimeout]);

  const hideTooltip = React.useCallback(() => {
    if (delayTimeout) {
      clearTimeout(delayTimeout);
      setDelayTimeout(null);
    }
    setIsVisible(false);
  }, [delayTimeout]);

  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      showTooltip();
    }
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover') {
      hideTooltip();
    }
  };

  const handleClick = () => {
    if (trigger === 'click') {
      if (isVisible) {
        hideTooltip();
      } else {
        showTooltip();
      }
    }
  };

  const handleFocus = () => {
    if (trigger === 'focus') {
      showTooltip();
    }
  };

  const handleBlur = () => {
    if (trigger === 'focus') {
      hideTooltip();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      hideTooltip();
    }
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        trigger === 'click' &&
        isVisible &&
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        hideTooltip();
      }
    };

    if (isVisible && trigger === 'click') {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isVisible, trigger, hideTooltip]);

  React.useEffect(() => {
    return () => {
      if (delayTimeout) {
        clearTimeout(delayTimeout);
      }
    };
  }, [delayTimeout]);

  const clonedTrigger = React.cloneElement(children, {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onClick: handleClick,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onKeyDown: handleKeyDown,
    'aria-describedby': isVisible ? 'tooltip' : undefined,
  } as any);

  return (
    <>
      {clonedTrigger}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={tooltipRef}
            id="tooltip"
            role="tooltip"
            className={cn(
              'absolute z-50 px-3 py-2 bg-neutral-900 text-white text-sm font-mono font-medium',
              'border-2 border-black rounded shadow-[2px_2px_0px_0px_#000000]',
              'max-w-xs break-words whitespace-pre-wrap',
              placementConfig.tooltip,
              className
            )}
            variants={tooltipVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {content}
            <div className={cn('absolute w-0 h-0', placementConfig.arrow)} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

Tooltip.displayName = 'Tooltip';
