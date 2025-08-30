import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '../utils/cn';

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  items: AccordionItem[];
  type?: 'single' | 'multiple';
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  collapsible?: boolean;
}

const accordionVariants = {
  expanded: {
    height: 'auto',
    opacity: 1,
    transition: {
      height: {
        duration: 0.3,
        ease: [0.68, -0.55, 0.265, 1.55] as const,
      },
      opacity: {
        duration: 0.2,
        delay: 0.1,
      },
    },
  },
  collapsed: {
    height: 0,
    opacity: 0,
    transition: {
      height: {
        duration: 0.3,
        ease: [0.175, 0.885, 0.32, 1.275] as const,
      },
      opacity: {
        duration: 0.2,
      },
    },
  },
};

const chevronVariants = {
  collapsed: { rotate: 0 },
  expanded: { 
    rotate: 180,
    transition: { 
      duration: 0.2,
      ease: [0.68, -0.55, 0.265, 1.55] as const
    }
  },
};

const itemVariants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.01,
    transition: { 
      duration: 0.1,
      ease: [0.68, -0.55, 0.265, 1.55] as const
    }
  },
};

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      items,
      type = 'single',
      defaultValue,
      value,
      onValueChange,
      collapsible = true,
      className,
      ...props
    },
    ref
  ) => {
    const [openItems, setOpenItems] = React.useState<string[]>(() => {
      if (value) {
        return Array.isArray(value) ? value : [value];
      }
      if (defaultValue) {
        return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
      }
      return [];
    });

    React.useEffect(() => {
      if (value !== undefined) {
        setOpenItems(Array.isArray(value) ? value : [value]);
      }
    }, [value]);

    const handleToggle = (itemId: string) => {
      const isOpen = openItems.includes(itemId);
      let newOpenItems: string[];

      if (type === 'single') {
        if (isOpen && collapsible) {
          newOpenItems = [];
        } else {
          newOpenItems = [itemId];
        }
      } else {
        if (isOpen) {
          newOpenItems = openItems.filter(id => id !== itemId);
        } else {
          newOpenItems = [...openItems, itemId];
        }
      }

      setOpenItems(newOpenItems);
      onValueChange?.(type === 'single' ? newOpenItems[0] || '' : newOpenItems);
    };

    return (
      <div ref={ref} className={cn('w-full space-y-2', className)} {...props}>
        {items.map((item, index) => {
          const isOpen = openItems.includes(item.id);
          const isFirst = index === 0;
          const isLast = index === items.length - 1;

          return (
            <motion.div
              key={item.id}
              className={cn(
                'border-2 border-black bg-white font-mono overflow-hidden',
                'shadow-[2px_2px_0px_0px_#000000]',
                isFirst && 'rounded-t',
                isLast && 'rounded-b',
                items.length === 1 && 'rounded'
              )}
              variants={itemVariants}
              initial="initial"
              whileHover={!item.disabled ? "hover" : undefined}
            >
              <button
                type="button"
                className={cn(
                  'w-full flex items-center justify-between p-4 text-left',
                  'font-bold text-neutral-900 transition-colors',
                  'hover:bg-neutral-50 focus:outline-none focus:bg-neutral-50',
                  item.disabled && 'opacity-50 cursor-not-allowed hover:bg-white'
                )}
                onClick={() => !item.disabled && handleToggle(item.id)}
                disabled={item.disabled}
                aria-expanded={isOpen}
                aria-controls={`accordion-content-${item.id}`}
              >
                <span className="text-base">{item.title}</span>
                <motion.div
                  variants={chevronVariants}
                  animate={isOpen ? 'expanded' : 'collapsed'}
                >
                  <ChevronDown className="w-5 h-5 flex-shrink-0" />
                </motion.div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    id={`accordion-content-${item.id}`}
                    className="overflow-hidden"
                    variants={accordionVariants}
                    initial="collapsed"
                    animate="expanded"
                    exit="collapsed"
                  >
                    <div className="p-4 pt-0 border-t-2 border-black border-dashed">
                      <div className="text-neutral-700 font-medium">
                        {item.content}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    );
  }
);

Accordion.displayName = 'Accordion';
