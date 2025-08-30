import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

export interface DropdownItem {
  value: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  separator?: boolean;
}

export interface DropdownProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  trigger: React.ReactNode;
  items: DropdownItem[];
  onSelect?: (value: string) => void;
  placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
  size?: 'sm' | 'md' | 'lg';
}

const sizeVariants = {
  sm: 'min-w-32 text-sm',
  md: 'min-w-40 text-base',
  lg: 'min-w-48 text-lg',
};

const paddingVariants = {
  sm: 'px-3 py-1.5',
  md: 'px-4 py-2',
  lg: 'px-6 py-3',
};

const placementVariants = {
  'bottom-start': 'top-full left-0 mt-2',
  'bottom-end': 'top-full right-0 mt-2',
  'top-start': 'bottom-full left-0 mb-2',
  'top-end': 'bottom-full right-0 mb-2',
};

const dropdownVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.95,
    y: -10,
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: { 
      duration: 0.15,
      ease: [0.68, -0.55, 0.265, 1.55] as const
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95,
    y: -10,
    transition: { 
      duration: 0.1,
      ease: [0.175, 0.885, 0.32, 1.275] as const
    }
  },
};

const itemVariants = {
  initial: { x: 0, scale: 1 },
  hover: { 
    x: 4,
    scale: 1.02,
    transition: { 
      duration: 0.1,
      ease: [0.68, -0.55, 0.265, 1.55] as const
    }
  },
};

export const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
  (
    {
      trigger,
      items,
      onSelect,
      placement = 'bottom-start',
      size = 'md',
      className,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [highlightedIndex, setHighlightedIndex] = React.useState(-1);
    const triggerRef = React.useRef<HTMLDivElement>(null);
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    const handleKeyDown = (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'Enter':
        case ' ':
          e.preventDefault();
          if (isOpen && highlightedIndex >= 0) {
            const item = items[highlightedIndex];
            if (!item.disabled && !item.separator) {
              onSelect?.(item.value);
              setIsOpen(false);
            }
          } else {
            setIsOpen(!isOpen);
          }
          break;
        case 'Escape':
          setIsOpen(false);
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          } else {
            setHighlightedIndex(prev => {
              let nextIndex = prev < items.length - 1 ? prev + 1 : 0;
              while (items[nextIndex]?.disabled || items[nextIndex]?.separator) {
                nextIndex = nextIndex < items.length - 1 ? nextIndex + 1 : 0;
                if (nextIndex === prev) break; // Prevent infinite loop
              }
              return nextIndex;
            });
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (isOpen) {
            setHighlightedIndex(prev => {
              let nextIndex = prev > 0 ? prev - 1 : items.length - 1;
              while (items[nextIndex]?.disabled || items[nextIndex]?.separator) {
                nextIndex = nextIndex > 0 ? nextIndex - 1 : items.length - 1;
                if (nextIndex === prev) break; // Prevent infinite loop
              }
              return nextIndex;
            });
          }
          break;
      }
    };

    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node) &&
          triggerRef.current &&
          !triggerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
      }
    }, [isOpen]);

    return (
      <div ref={ref} className={cn('relative inline-block', className)} {...props}>
        <div
          ref={triggerRef}
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="button"
          aria-expanded={isOpen}
          aria-haspopup="menu"
          className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded"
        >
          {trigger}
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={dropdownRef}
              className={cn(
                'absolute z-50 bg-white border-2 border-black rounded font-mono',
                'shadow-[4px_4px_0px_0px_#000000]',
                'py-1',
                sizeVariants[size],
                placementVariants[placement]
              )}
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              role="menu"
            >
              {items.map((item, index) => {
                if (item.separator) {
                  return (
                    <div
                      key={`separator-${index}`}
                      className="my-1 border-t-2 border-black border-dashed"
                    />
                  );
                }

                const isHighlighted = highlightedIndex === index;

                return (
                  <motion.button
                    key={item.value}
                    type="button"
                    className={cn(
                      'w-full flex items-center gap-3 text-left font-medium',
                      'transition-colors duration-150',
                      paddingVariants[size],
                      item.disabled 
                        ? 'text-neutral-400 cursor-not-allowed' 
                        : 'text-neutral-900 hover:bg-sky-50 active:bg-sky-100',
                      isHighlighted && !item.disabled && 'bg-sky-100'
                    )}
                    onClick={() => {
                      if (!item.disabled) {
                        onSelect?.(item.value);
                        setIsOpen(false);
                      }
                    }}
                    onMouseEnter={() => !item.disabled && setHighlightedIndex(index)}
                    disabled={item.disabled}
                    role="menuitem"
                    variants={!item.disabled ? itemVariants : undefined}
                    initial="initial"
                    whileHover={!item.disabled ? "hover" : undefined}
                  >
                    {item.icon && (
                      <span className="flex-shrink-0">{item.icon}</span>
                    )}
                    <span className="flex-1 truncate">{item.label}</span>
                  </motion.button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

Dropdown.displayName = 'Dropdown';
