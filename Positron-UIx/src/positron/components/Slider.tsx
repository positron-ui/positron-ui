import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

export interface SliderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
  label?: string;
  showValue?: boolean;
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  orientation?: 'horizontal' | 'vertical';
}

const colorVariants = {
  primary: 'bg-sky-500',
  secondary: 'bg-yellow-400',
  accent: 'bg-pink-500',
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  error: 'bg-red-500',
};

const sizeVariants = {
  sm: {
    track: 'h-2',
    thumb: 'w-4 h-4',
    vertical: 'w-2 h-32',
  },
  md: {
    track: 'h-3',
    thumb: 'w-5 h-5',
    vertical: 'w-3 h-40',
  },
  lg: {
    track: 'h-4',
    thumb: 'w-6 h-6',
    vertical: 'w-4 h-48',
  },
};

const thumbVariants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.2,
    transition: { 
      duration: 0.15,
      ease: [0.68, -0.55, 0.265, 1.55] as const
    }
  },
  active: { 
    scale: 1.3,
    transition: { 
      duration: 0.1,
      ease: [0.68, -0.55, 0.265, 1.55] as const
    }
  },
};

const fillVariants = {
  initial: { scale: 1 },
  active: { 
    scale: 1.02,
    transition: { 
      duration: 0.15,
      ease: [0.68, -0.55, 0.265, 1.55] as const
    }
  },
};

export const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      value,
      defaultValue = 50,
      min = 0,
      max = 100,
      step = 1,
      onChange,
      disabled = false,
      label,
      showValue = false,
      color = 'primary',
      size = 'md',
      orientation = 'horizontal',
      className,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(value ?? defaultValue);
    const [isDragging, setIsDragging] = React.useState(false);
    const trackRef = React.useRef<HTMLDivElement>(null);

    const currentValue = value ?? internalValue;
    const percentage = ((currentValue - min) / (max - min)) * 100;
    const sizeConfig = sizeVariants[size];

    const updateValue = React.useCallback((clientX: number, clientY: number) => {
      if (!trackRef.current || disabled) return;

      const rect = trackRef.current.getBoundingClientRect();
      let newPercentage: number;

      if (orientation === 'horizontal') {
        newPercentage = ((clientX - rect.left) / rect.width) * 100;
      } else {
        newPercentage = ((rect.bottom - clientY) / rect.height) * 100;
      }

      newPercentage = Math.max(0, Math.min(100, newPercentage));
      const newValue = Math.round(((newPercentage / 100) * (max - min) + min) / step) * step;
      const clampedValue = Math.max(min, Math.min(max, newValue));

      setInternalValue(clampedValue);
      onChange?.(clampedValue);
    }, [disabled, orientation, max, min, step, onChange]);

    const handleMouseDown = (e: React.MouseEvent) => {
      if (disabled) return;
      setIsDragging(true);
      updateValue(e.clientX, e.clientY);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
      if (disabled) return;
      setIsDragging(true);
      const touch = e.touches[0];
      updateValue(touch.clientX, touch.clientY);
    };

    React.useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        if (isDragging) {
          updateValue(e.clientX, e.clientY);
        }
      };

      const handleTouchMove = (e: TouchEvent) => {
        if (isDragging) {
          e.preventDefault();
          const touch = e.touches[0];
          updateValue(touch.clientX, touch.clientY);
        }
      };

      const handleEnd = () => {
        setIsDragging(false);
      };

      if (isDragging) {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleEnd);
        document.addEventListener('touchmove', handleTouchMove, { passive: false });
        document.addEventListener('touchend', handleEnd);

        return () => {
          document.removeEventListener('mousemove', handleMouseMove);
          document.removeEventListener('mouseup', handleEnd);
          document.removeEventListener('touchmove', handleTouchMove);
          document.removeEventListener('touchend', handleEnd);
        };
      }
    }, [isDragging, updateValue]);

    const trackClasses = cn(
      'relative bg-neutral-200 border-2 border-black rounded-full cursor-pointer select-none',
      'shadow-[2px_2px_0px_0px_#000000]',
      orientation === 'horizontal' ? sizeConfig.track : sizeConfig.vertical,
      disabled && 'opacity-50 cursor-not-allowed'
    );

    const fillClasses = cn(
      'absolute rounded-full border border-black',
      'shadow-[1px_1px_0px_0px_#000000]',
      colorVariants[color],
      orientation === 'horizontal' ? 'h-full top-0 left-0' : 'w-full bottom-0 left-0'
    );

    const thumbClasses = cn(
      'absolute bg-white border-2 border-black rounded-full cursor-grab active:cursor-grabbing',
      'shadow-[2px_2px_0px_0px_#000000]',
      'flex items-center justify-center',
      sizeConfig.thumb,
      disabled && 'cursor-not-allowed'
    );

    const getThumbPosition = () => {
      if (orientation === 'horizontal') {
        return {
          left: `calc(${percentage}% - ${parseInt(sizeConfig.thumb.split(' ')[0].slice(2)) / 2}px)`,
          top: '50%',
          transform: 'translateY(-50%)',
        };
      } else {
        return {
          bottom: `calc(${percentage}% - ${parseInt(sizeConfig.thumb.split(' ')[1].slice(2)) / 2}px)`,
          left: '50%',
          transform: 'translateX(-50%)',
        };
      }
    };

    const getFillSize = () => {
      if (orientation === 'horizontal') {
        return { width: `${percentage}%` };
      } else {
        return { height: `${percentage}%` };
      }
    };

    return (
      <div ref={ref} className={cn('w-full', className)} {...props}>
        {(label || showValue) && (
          <div className="flex justify-between items-center mb-3">
            {label && (
              <label className="text-sm font-bold font-mono text-neutral-900">
                {label}
              </label>
            )}
            {showValue && (
              <span className="text-sm font-mono text-neutral-600">
                {currentValue}
              </span>
            )}
          </div>
        )}

        <div className={cn(
          'relative',
          orientation === 'vertical' && 'flex justify-center'
        )}>
          <div
            ref={trackRef}
            className={trackClasses}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            role="slider"
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={currentValue}
            aria-orientation={orientation}
            tabIndex={disabled ? -1 : 0}
          >
            <motion.div
              className={fillClasses}
              style={getFillSize()}
              variants={fillVariants}
              initial="initial"
              animate={isDragging ? "active" : "initial"}
            />
            
            <motion.div
              className={thumbClasses}
              style={getThumbPosition()}
              variants={thumbVariants}
              initial="initial"
              whileHover={!disabled ? "hover" : undefined}
              animate={isDragging ? "active" : "initial"}
            >
              <div className="w-2 h-2 bg-neutral-400 rounded-full" />
            </motion.div>
          </div>
        </div>
      </div>
    );
  }
);

Slider.displayName = 'Slider';
