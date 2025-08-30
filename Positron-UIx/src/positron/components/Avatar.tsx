import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { User } from 'lucide-react';
import { cn } from '../utils/cn';

export interface AvatarProps extends HTMLMotionProps<'div'> {
  src?: string;
  alt?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fallback?: string;
  color?: 'primary' | 'secondary' | 'accent' | 'neutral' | 'success' | 'warning' | 'error';
}

const sizeVariants = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-lg',
  xl: 'w-16 h-16 text-xl',
};

const colorVariants = {
  primary: 'bg-sky-500 text-white',
  secondary: 'bg-yellow-400 text-black',
  accent: 'bg-pink-500 text-white',
  neutral: 'bg-neutral-600 text-white',
  success: 'bg-emerald-500 text-white',
  warning: 'bg-amber-500 text-black',
  error: 'bg-red-500 text-white',
};

const motionVariants = {
  initial: { scale: 1, rotate: 0 },
  hover: { 
    scale: 1.1,
    rotate: 5,
    transition: { 
      duration: 0.15,
      ease: [0.68, -0.55, 0.265, 1.55] as const
    }
  },
  tap: { 
    scale: 0.95,
    rotate: -5,
    transition: { 
      duration: 0.1,
      ease: [0.175, 0.885, 0.32, 1.275] as const
    }
  },
};

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      alt,
      size = 'md',
      fallback,
      color = 'neutral',
      className,
      ...props
    },
    ref
  ) => {
    const [imageError, setImageError] = React.useState(false);
    const [imageLoaded, setImageLoaded] = React.useState(false);

    const showImage = src && !imageError && imageLoaded;
    const showFallback = !showImage;

    // Get initials from fallback text
    const getInitials = (text: string) => {
      return text
        .split(' ')
        .map(word => word.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2);
    };

    return (
      <motion.div
        ref={ref}
        className={cn(
          'relative inline-flex items-center justify-center rounded border-2 border-black overflow-hidden',
          'shadow-[2px_2px_0px_0px_#000000]',
          'font-mono font-bold',
          sizeVariants[size],
          showFallback && colorVariants[color],
          className
        )}
        variants={motionVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        {...props}
      >
        {src && (
          <img
            src={src}
            alt={alt}
            className={cn(
              'absolute inset-0 w-full h-full object-cover',
              showImage ? 'opacity-100' : 'opacity-0'
            )}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        )}
        {showFallback && (
          <div className="flex items-center justify-center w-full h-full">
            {fallback ? (
              <span className="select-none">
                {getInitials(fallback)}
              </span>
            ) : (
              <User className="w-1/2 h-1/2" />
            )}
          </div>
        )}
      </motion.div>
    );
  }
);

Avatar.displayName = 'Avatar';
