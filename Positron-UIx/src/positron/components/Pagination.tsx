import React from 'react';
import { Button } from './Button';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { cn } from '../utils/cn';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  showPrevNext?: boolean;
  siblingCount?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'brutal';
  className?: string;
}

const sizeVariants = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = true,
  showPrevNext = true,
  siblingCount = 1,
  size = 'md',
  variant = 'default',
  className,
}) => {
  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];
    
    // Always show first page
    pages.push(1);
    
    // Calculate range around current page
    const startPage = Math.max(2, currentPage - siblingCount);
    const endPage = Math.min(totalPages - 1, currentPage + siblingCount);
    
    // Add ellipsis after first page if needed
    if (startPage > 2) {
      pages.push('ellipsis-start');
    }
    
    // Add pages around current page
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    // Add ellipsis before last page if needed
    if (endPage < totalPages - 1) {
      pages.push('ellipsis-end');
    }
    
    // Always show last page (if more than 1 page)
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    
    return pages;
  };

  const pages = generatePageNumbers();

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  if (totalPages <= 1) return null;

  return (
    <nav
      className={cn(
        'flex items-center justify-center gap-1',
        sizeVariants[size],
        className
      )}
      role="navigation"
      aria-label="Pagination"
    >
      {/* First Page */}
      {showFirstLast && currentPage > 1 && (
        <Button
          variant="outline"
          size={size}
          onClick={() => handlePageChange(1)}
          className={variant === 'brutal' ? 'rotate-1 hover:rotate-0' : ''}
          aria-label="Go to first page"
        >
          First
        </Button>
      )}

      {/* Previous Page */}
      {showPrevNext && (
        <Button
          variant="outline"
          size={size}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className={variant === 'brutal' ? 'rotate-1 hover:rotate-0' : ''}
          aria-label="Go to previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
      )}

      {/* Page Numbers */}
      {pages.map((page, index) => {
        if (typeof page === 'string') {
          return (
            <div
              key={`${page}-${index}`}
              className="px-3 py-2 flex items-center justify-center font-mono font-bold"
              aria-hidden="true"
            >
              <MoreHorizontal className="w-4 h-4 text-neutral-400" />
            </div>
          );
        }

        const isActive = page === currentPage;
        return (
          <Button
            key={page}
            variant={isActive ? 'solid' : 'outline'}
            color={isActive ? 'primary' : 'neutral'}
            size={size}
            onClick={() => handlePageChange(page)}
            className={cn(
              variant === 'brutal' && !isActive && 'rotate-1 hover:rotate-0',
              variant === 'brutal' && isActive && 'scale-110 rotate-2'
            )}
            aria-label={`Go to page ${page}`}
            aria-current={isActive ? 'page' : undefined}
          >
            {page}
          </Button>
        );
      })}

      {/* Next Page */}
      {showPrevNext && (
        <Button
          variant="outline"
          size={size}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className={variant === 'brutal' ? 'rotate-1 hover:rotate-0' : ''}
          aria-label="Go to next page"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      )}

      {/* Last Page */}
      {showFirstLast && currentPage < totalPages && (
        <Button
          variant="outline"
          size={size}
          onClick={() => handlePageChange(totalPages)}
          className={variant === 'brutal' ? 'rotate-1 hover:rotate-0' : ''}
          aria-label="Go to last page"
        >
          Last
        </Button>
      )}
    </nav>
  );
};

Pagination.displayName = 'Pagination';
