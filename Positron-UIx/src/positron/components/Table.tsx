import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '../utils/cn';

export interface TableColumn<T = any> {
  key: string;
  header: string;
  sortable?: boolean;
  width?: string;
  render?: (value: any, row: T) => React.ReactNode;
}

export interface TableProps<T = any> extends React.HTMLAttributes<HTMLDivElement> {
  columns: TableColumn<T>[];
  data: T[];
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
  onSort?: (key: string, direction: 'asc' | 'desc') => void;
  variant?: 'default' | 'striped' | 'bordered';
  size?: 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  caption?: string;
}

const sizeVariants = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

const paddingVariants = {
  sm: 'px-3 py-2',
  md: 'px-4 py-3',
  lg: 'px-6 py-4',
};

const rowVariants = {
  initial: { backgroundColor: '#ffffff' },
  hover: { 
    backgroundColor: '#f8fafc',
    transition: { 
      duration: 0.15,
      ease: [0.68, -0.55, 0.265, 1.55] as const
    }
  },
};

const sortIconVariants = {
  initial: { scale: 1, rotate: 0 },
  hover: { 
    scale: 1.1,
    rotate: 5,
    transition: { 
      duration: 0.15,
      ease: [0.68, -0.55, 0.265, 1.55] as const
    }
  },
};

export const Table = <T extends Record<string, any> = Record<string, any>>({
  columns,
  data,
  sortBy,
  sortDirection,
  onSort,
  variant = 'default',
  size = 'md',
  hoverable = true,
  caption,
  className,
  ...props
}: TableProps<T>) => {
  const handleSort = (columnKey: string) => {
    if (!onSort) return;

    const newDirection = 
      sortBy === columnKey && sortDirection === 'asc' ? 'desc' : 'asc';
    onSort(columnKey, newDirection);
  };

  const getSortIcon = (columnKey: string) => {
    if (sortBy !== columnKey) {
      return <ArrowUpDown className="w-4 h-4" />;
    }
    return sortDirection === 'asc' 
      ? <ArrowUp className="w-4 h-4" />
      : <ArrowDown className="w-4 h-4" />;
  };

  return (
    <div 
      className={cn(
        'w-full overflow-hidden rounded border-2 border-black font-mono',
        'shadow-[4px_4px_0px_0px_#000000]',
        className
      )} 
      {...props}
    >
      {caption && (
        <div className="p-4 bg-neutral-50 border-b-2 border-black">
          <h3 className="font-black text-neutral-900">{caption}</h3>
        </div>
      )}
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-neutral-100 border-b-2 border-black">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={cn(
                    'font-black text-left text-neutral-900',
                    paddingVariants[size],
                    sizeVariants[size],
                    column.width && `w-[${column.width}]`
                  )}
                  style={column.width ? { width: column.width } : undefined}
                >
                  {column.sortable && onSort ? (
                    <button
                      type="button"
                      className="flex items-center gap-2 font-black hover:text-sky-600 transition-colors"
                      onClick={() => handleSort(column.key)}
                    >
                      <span>{column.header}</span>
                      <motion.div
                        variants={sortIconVariants}
                        initial="initial"
                        whileHover="hover"
                      >
                        {getSortIcon(column.key)}
                      </motion.div>
                    </button>
                  ) : (
                    column.header
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <motion.tr
                key={rowIndex}
                className={cn(
                  'border-b border-neutral-200 last:border-b-0',
                  variant === 'striped' && rowIndex % 2 === 1 && 'bg-neutral-50',
                  variant === 'bordered' && 'border-b-2 border-black',
                  hoverable && 'cursor-pointer'
                )}
                variants={hoverable ? rowVariants : undefined}
                initial="initial"
                whileHover={hoverable ? "hover" : undefined}
              >
                {columns.map((column) => {
                  const value = row[column.key];
                  return (
                    <td
                      key={column.key}
                      className={cn(
                        'font-medium text-neutral-700',
                        paddingVariants[size],
                        sizeVariants[size]
                      )}
                    >
                      {column.render ? column.render(value, row) : value}
                    </td>
                  );
                })}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.length === 0 && (
        <div className="p-8 text-center">
          <p className="text-neutral-500 font-medium">No data available</p>
        </div>
      )}
    </div>
  );
};

Table.displayName = 'Table';
