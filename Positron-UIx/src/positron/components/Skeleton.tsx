import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

export interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  variant?: 'rectangular' | 'circular' | 'text' | 'avatar';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  lines?: number;
  animated?: boolean;
  brutal?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const sizeVariants = {
  sm: {
    rectangular: 'h-16 w-24',
    circular: 'h-8 w-8',
    text: 'h-4 w-32',
    avatar: 'h-8 w-8',
  },
  md: {
    rectangular: 'h-24 w-40',
    circular: 'h-12 w-12',
    text: 'h-5 w-48',
    avatar: 'h-12 w-12',
  },
  lg: {
    rectangular: 'h-32 w-56',
    circular: 'h-16 w-16',
    text: 'h-6 w-64',
    avatar: 'h-16 w-16',
  },
  xl: {
    rectangular: 'h-48 w-80',
    circular: 'h-20 w-20',
    text: 'h-7 w-80',
    avatar: 'h-20 w-20',
  },
};

const shimmerVariants = {
  initial: { x: '-100%' },
  animate: {
    x: '100%',
    transition: {
      repeat: Infinity,
      duration: 2,
      ease: 'linear' as const,
    },
  },
};

const pulseVariants = {
  animate: {
    opacity: [0.6, 1, 0.6],
    transition: {
      repeat: Infinity,
      duration: 1.5,
      ease: 'easeInOut' as const,
    },
  },
};

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      width,
      height,
      variant = 'rectangular',
      size = 'md',
      lines = 1,
      animated = true,
      brutal = false,
      className,
      style,
    },
    ref
  ) => {
    const customStyle = {
      width: width || undefined,
      height: height || undefined,
      ...style,
    };

    const baseClasses = cn(
      'bg-neutral-300 overflow-hidden relative',
      brutal && 'border-2 border-black shadow-[2px_2px_0px_0px_#000000]',
      {
        'rounded': variant === 'rectangular',
        'rounded-full': variant === 'circular' || variant === 'avatar',
        'rounded-sm': variant === 'text',
      },
      !width && !height && sizeVariants[size][variant],
      className
    );

    if (variant === 'text' && lines > 1) {
      return (
        <div className="space-y-2">
          {Array.from({ length: lines }).map((_, index) => (
            <motion.div
              key={index}
              ref={index === 0 ? ref : undefined}
              className={cn(
                baseClasses,
                index === lines - 1 && 'w-3/4' // Last line is shorter
              )}
              style={customStyle}
              variants={animated ? pulseVariants : undefined}
              animate={animated ? 'animate' : undefined}
            >
              {animated && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                />
              )}
            </motion.div>
          ))}
        </div>
      );
    }

    return (
      <motion.div
        ref={ref}
        className={baseClasses}
        style={customStyle}
        variants={animated ? pulseVariants : undefined}
        animate={animated ? 'animate' : undefined}
      >
        {animated && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            variants={shimmerVariants}
            initial="initial"
            animate="animate"
          />
        )}
      </motion.div>
    );
  }
);

Skeleton.displayName = 'Skeleton';

export interface SkeletonCardProps {
  includeAvatar?: boolean;
  includeImage?: boolean;
  lines?: number;
  brutal?: boolean;
  className?: string;
}

export const SkeletonCard: React.FC<SkeletonCardProps> = ({
  includeAvatar = false,
  includeImage = false,
  lines = 3,
  brutal = false,
  className,
}) => {
  return (
    <div className={cn(
      'p-4 bg-white rounded border-2',
      brutal ? 'border-black shadow-[4px_4px_0px_0px_#000000]' : 'border-neutral-200',
      className
    )}>
      {includeImage && (
        <Skeleton 
          variant="rectangular" 
          height={200} 
          brutal={brutal}
          className="mb-4" 
        />
      )}
      
      <div className="space-y-3">
        {includeAvatar && (
          <div className="flex items-center gap-3">
            <Skeleton 
              variant="avatar" 
              size="md" 
              brutal={brutal}
            />
            <Skeleton 
              variant="text" 
              width="60%" 
              brutal={brutal}
            />
          </div>
        )}
        
        <Skeleton 
          variant="text" 
          width="90%" 
          size="lg" 
          brutal={brutal}
        />
        
        <Skeleton 
          variant="text" 
          lines={lines} 
          brutal={brutal}
        />
        
        <div className="flex gap-2 pt-2">
          <Skeleton 
            variant="rectangular" 
            width={80} 
            height={32} 
            brutal={brutal}
          />
          <Skeleton 
            variant="rectangular" 
            width={60} 
            height={32} 
            brutal={brutal}
          />
        </div>
      </div>
    </div>
  );
};

SkeletonCard.displayName = 'SkeletonCard';
