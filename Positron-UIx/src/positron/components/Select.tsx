import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '../utils/cn';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'size'> {
  options: SelectOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
  error?: boolean;
  disabled?: boolean;
  label?: string;
  helperText?: string;
}

const sizeVariants = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
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

const triggerVariants = {
  closed: { rotate: 0 },
  open: { 
    rotate: 180,
    transition: { 
      duration: 0.2,
      ease: [0.68, -0.55, 0.265, 1.55] as const
    }
  },
};

export const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      options,
      value,
      onValueChange,
      placeholder = 'Select an option...',
      size = 'md',
      error = false,
      disabled = false,
      label,
      helperText,
      className,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [highlightedIndex, setHighlightedIndex] = React.useState(-1);
    const triggerRef = React.useRef<HTMLButtonElement>(null);
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    const selectedOption = options.find(option => option.value === value);

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;

      switch (e.key) {
        case 'Enter':
        case ' ':
          e.preventDefault();
          if (isOpen && highlightedIndex >= 0) {
            const option = options[highlightedIndex];
            if (!option.disabled) {
              onValueChange?.(option.value);
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
              const nextIndex = prev < options.length - 1 ? prev + 1 : 0;
              return options[nextIndex]?.disabled ? nextIndex + 1 : nextIndex;
            });
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (isOpen) {
            setHighlightedIndex(prev => {
              const nextIndex = prev > 0 ? prev - 1 : options.length - 1;
              return options[nextIndex]?.disabled ? nextIndex - 1 : nextIndex;
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
      <div ref={ref} className={cn('relative w-full', className)} {...props}>
        {label && (
          <label className="block text-sm font-bold font-mono text-neutral-900 mb-2">
            {label}
          </label>
        )}
        
        <button
          ref={triggerRef}
          type="button"
          className={cn(
            'w-full flex items-center justify-between rounded border-2 font-mono font-medium',
            'transition-all duration-200 ease-out',
            'focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2',
            'shadow-[2px_2px_0px_0px_#000000]',
            'hover:shadow-[4px_4px_0px_0px_#000000]',
            'bg-white border-black',
            sizeVariants[size],
            error && 'border-red-500 focus:ring-red-500',
            disabled && 'opacity-50 cursor-not-allowed hover:shadow-[2px_2px_0px_0px_#000000]',
            isOpen && 'shadow-[4px_4px_0px_0px_#000000]'
          )}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <span className={cn(
            'truncate text-left',
            !selectedOption && 'text-neutral-500'
          )}>
            {selectedOption?.label || placeholder}
          </span>
          <motion.div
            variants={triggerVariants}
            animate={isOpen ? 'open' : 'closed'}
          >
            <ChevronDown className="w-4 h-4 flex-shrink-0" />
          </motion.div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={dropdownRef}
              className={cn(
                'absolute z-50 w-full mt-2 bg-white border-2 border-black rounded',
                'shadow-[4px_4px_0px_0px_#000000]',
                'max-h-60 overflow-auto'
              )}
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              role="listbox"
            >
              {options.map((option, index) => (
                <button
                  key={option.value}
                  type="button"
                  className={cn(
                    'w-full px-4 py-2 text-left font-mono font-medium flex items-center justify-between',
                    'transition-colors duration-150',
                    'first:rounded-t last:rounded-b',
                    option.disabled 
                      ? 'text-neutral-400 cursor-not-allowed' 
                      : 'text-neutral-900 hover:bg-sky-50 active:bg-sky-100',
                    highlightedIndex === index && !option.disabled && 'bg-sky-100',
                    value === option.value && 'bg-sky-500 text-white hover:bg-sky-600'
                  )}
                  onClick={() => {
                    if (!option.disabled) {
                      onValueChange?.(option.value);
                      setIsOpen(false);
                    }
                  }}
                  onMouseEnter={() => !option.disabled && setHighlightedIndex(index)}
                  disabled={option.disabled}
                  role="option"
                  aria-selected={value === option.value}
                >
                  <span className="truncate">{option.label}</span>
                  {value === option.value && (
                    <Check className="w-4 h-4 flex-shrink-0" />
                  )}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

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

Select.displayName = 'Select';
