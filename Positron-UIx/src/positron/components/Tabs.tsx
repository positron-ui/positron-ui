import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

export interface TabItem {
  value: string;
  label: string;
  disabled?: boolean;
  badge?: string | number;
}

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  items: TabItem[];
  value?: string;
  onValueChange?: (value: string) => void;
  variant?: 'default' | 'pills' | 'underline';
  size?: 'sm' | 'md' | 'lg';
}

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  children: React.ReactNode;
}

const sizeVariants = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

const variantStyles = {
  default: {
    container: 'border-b-2 border-black',
    tab: 'border-2 border-transparent hover:border-black',
    active: 'border-black bg-white shadow-[2px_2px_0px_0px_#000000]',
  },
  pills: {
    container: '',
    tab: 'border-2 border-black bg-white hover:bg-neutral-50',
    active: 'bg-sky-500 text-white shadow-[2px_2px_0px_0px_#000000]',
  },
  underline: {
    container: 'border-b-2 border-neutral-200',
    tab: 'border-b-2 border-transparent hover:border-neutral-300',
    active: 'border-b-black text-sky-600',
  },
};

const tabVariants = {
  inactive: { 
    scale: 1,
    y: 0,
  },
  active: { 
    scale: 1.02,
    y: -2,
    transition: { 
      duration: 0.15,
      ease: [0.68, -0.55, 0.265, 1.55] as const
    }
  },
  hover: { 
    scale: 1.01,
    y: -1,
    transition: { 
      duration: 0.1,
      ease: [0.68, -0.55, 0.265, 1.55] as const
    }
  },
};

const TabsContext = React.createContext<{
  value?: string;
  onValueChange?: (value: string) => void;
}>({});

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      items,
      value,
      onValueChange,
      variant = 'default',
      size = 'md',
      children,
      className,
      ...props
    },
    ref
  ) => {
    const [activeValue, setActiveValue] = React.useState(value || items[0]?.value);

    const handleValueChange = (newValue: string) => {
      setActiveValue(newValue);
      onValueChange?.(newValue);
    };

    const contextValue = React.useMemo(() => ({
      value: value || activeValue,
      onValueChange: handleValueChange,
    }), [value, activeValue, onValueChange]);

    const styles = variantStyles[variant];

    return (
      <TabsContext.Provider value={contextValue}>
        <div ref={ref} className={cn('w-full', className)} {...props}>
          <div className={cn(
            'flex gap-1 font-mono',
            styles.container,
            variant === 'default' && 'pb-0',
            variant === 'underline' && 'mb-4'
          )}>
            {items.map((item) => {
              const isActive = (value || activeValue) === item.value;
              const canActivate = !item.disabled;

              return (
                <motion.button
                  key={item.value}
                  type="button"
                  className={cn(
                    'relative flex items-center gap-2 font-medium rounded transition-all',
                    'focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2',
                    sizeVariants[size],
                    styles.tab,
                    isActive && styles.active,
                    item.disabled && 'opacity-50 cursor-not-allowed',
                    variant === 'default' && 'rounded-b-none mb-[-2px]',
                    variant === 'underline' && 'rounded-none bg-transparent hover:bg-neutral-50'
                  )}
                  onClick={() => canActivate && handleValueChange(item.value)}
                  disabled={item.disabled}
                  variants={variant !== 'underline' ? tabVariants : undefined}
                  initial="inactive"
                  animate={isActive ? "active" : "inactive"}
                  whileHover={canActivate && !isActive ? "hover" : undefined}
                  aria-selected={isActive}
                  role="tab"
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={cn(
                      'px-2 py-0.5 text-xs font-bold rounded border border-black',
                      isActive && variant === 'pills' 
                        ? 'bg-white text-sky-500' 
                        : 'bg-yellow-400 text-black'
                    )}>
                      {item.badge}
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>
          <div className="mt-4">
            {children}
          </div>
        </div>
      </TabsContext.Provider>
    );
  }
);

Tabs.displayName = 'Tabs';

export const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ value, children, className, ...props }, ref) => {
    const { value: activeValue } = React.useContext(TabsContext);

    if (activeValue !== value) {
      return null;
    }

    return (
      <motion.div
        ref={ref}
        className={cn('focus:outline-none', className)}
        initial={{ opacity: 0, y: 10 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          transition: { 
            duration: 0.2,
            ease: [0.68, -0.55, 0.265, 1.55] as const
          }
        }}
        role="tabpanel"
        {...(props as any)}
      >
        {children}
      </motion.div>
    );
  }
);

TabsContent.displayName = 'TabsContent';
