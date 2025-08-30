import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '../utils/cn';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  showHome?: boolean;
  homeHref?: string;
  onHomeClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'brutal';
  className?: string;
}

const sizeVariants = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator = <ChevronRight className="w-4 h-4" />,
  showHome = true,
  homeHref = '/',
  onHomeClick,
  size = 'md',
  variant = 'default',
  className,
}) => {
  const handleHomeClick = (e: React.MouseEvent) => {
    if (onHomeClick) {
      e.preventDefault();
      onHomeClick();
    }
  };

  const handleItemClick = (item: BreadcrumbItem, e: React.MouseEvent) => {
    if (item.onClick) {
      e.preventDefault();
      item.onClick();
    }
  };

  const allItems = showHome 
    ? [{ label: 'Home', href: homeHref, onClick: onHomeClick, icon: <Home className="w-4 h-4" /> }, ...items]
    : items;

  return (
    <nav
      className={cn(
        'flex items-center gap-2 font-mono font-medium',
        sizeVariants[size],
        className
      )}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center gap-2">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;
          const isHome = showHome && index === 0;
          
          return (
            <li key={index} className="flex items-center gap-2">
              {/* Breadcrumb Item */}
              {item.href || item.onClick ? (
                <a
                  href={item.href}
                  onClick={isHome ? handleHomeClick : (e) => handleItemClick(item, e)}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2 rounded border-2 transition-all',
                    'hover:shadow-[2px_2px_0px_0px_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px]',
                    variant === 'brutal' && 'rotate-1 hover:rotate-0',
                    isLast
                      ? 'bg-sky-500 text-white border-black font-black'
                      : 'bg-white border-neutral-300 hover:border-black text-neutral-700 hover:text-black'
                  )}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </a>
              ) : (
                <span
                  className={cn(
                    'flex items-center gap-2 px-3 py-2 rounded border-2',
                    variant === 'brutal' && 'rotate-1',
                    isLast
                      ? 'bg-sky-500 text-white border-black font-black'
                      : 'bg-neutral-100 border-neutral-300 text-neutral-600'
                  )}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </span>
              )}

              {/* Separator */}
              {!isLast && (
                <div 
                  className={cn(
                    'text-neutral-400 flex-shrink-0',
                    variant === 'brutal' && 'rotate-12'
                  )}
                  aria-hidden="true"
                >
                  {separator}
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

Breadcrumb.displayName = 'Breadcrumb';
