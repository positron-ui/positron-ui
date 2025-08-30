import React, { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';
import { Button } from './Button';
import { Input } from './Input';

export interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date | null) => void;
  placeholder?: string;
  label?: string;
  helperText?: string;
  error?: boolean;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  dateFormat?: 'MM/dd/yyyy' | 'dd/MM/yyyy' | 'yyyy-MM-dd';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'brutal';
  className?: string;
}

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  placeholder = 'Select date...',
  label,
  helperText,
  error = false,
  disabled = false,
  minDate,
  maxDate,
  dateFormat = 'MM/dd/yyyy',
  size = 'md',
  variant = 'default',
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(value || new Date());
  const [inputValue, setInputValue] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const formatDate = (date: Date): string => {
    if (!date) return '';
    
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    switch (dateFormat) {
      case 'dd/MM/yyyy':
        return `${day}/${month}/${year}`;
      case 'yyyy-MM-dd':
        return `${year}-${month}-${day}`;
      default:
        return `${month}/${day}/${year}`;
    }
  };

  useEffect(() => {
    setInputValue(value ? formatDate(value) : '');
  }, [value, dateFormat]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (Date | null)[] = [];
    
    // Add empty cells for days before the month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const isDateDisabled = (date: Date): boolean => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  const isDateSelected = (date: Date): boolean => {
    if (!value) return false;
    return (
      date.getDate() === value.getDate() &&
      date.getMonth() === value.getMonth() &&
      date.getFullYear() === value.getFullYear()
    );
  };

  const handleDateSelect = (date: Date) => {
    if (!isDateDisabled(date)) {
      onChange?.(date);
      setIsOpen(false);
    }
  };

  const handleMonthChange = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    
    // Try to parse the input value
    const parsedDate = new Date(e.target.value);
    if (!isNaN(parsedDate.getTime()) && !isDateDisabled(parsedDate)) {
      onChange?.(parsedDate);
      setCurrentMonth(parsedDate);
    }
  };

  const days = getDaysInMonth(currentMonth);

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <Input
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        placeholder={placeholder}
        label={label}
        helperText={helperText}
        error={error}
        disabled={disabled}
        size={size}
        variant={variant}
        rightIcon={
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsOpen(!isOpen)}
            disabled={disabled}
            className="p-1"
          >
            <Calendar className="w-4 h-4" />
          </Button>
        }
        readOnly
      />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            transition={{ duration: 0.15 }}
            className={cn(
              'absolute top-full left-0 z-50 mt-2 p-4 bg-white border-2 border-black rounded',
              'shadow-[4px_4px_0px_0px_#000000] font-mono',
              variant === 'brutal' && 'rotate-1'
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleMonthChange('prev')}
                className={variant === 'brutal' ? 'rotate-2' : ''}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              
              <h3 className="font-black text-lg">
                {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </h3>
              
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleMonthChange('next')}
                className={variant === 'brutal' ? 'rotate-2' : ''}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Days of Week */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {daysOfWeek.map((day) => (
                <div
                  key={day}
                  className="h-8 flex items-center justify-center text-xs font-bold text-neutral-600"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {days.map((date, index) => (
                <div key={index} className="h-8">
                  {date && (
                    <button
                      onClick={() => handleDateSelect(date)}
                      disabled={isDateDisabled(date)}
                      className={cn(
                        'w-full h-full rounded border text-sm font-medium transition-all',
                        'hover:shadow-[2px_2px_0px_0px_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px]',
                        variant === 'brutal' && 'rotate-1 hover:rotate-0',
                        isDateSelected(date)
                          ? 'bg-sky-500 text-white border-black font-black'
                          : 'bg-white border-neutral-300 hover:border-black',
                        isDateDisabled(date)
                          ? 'opacity-50 cursor-not-allowed hover:shadow-none hover:translate-x-0 hover:translate-y-0'
                          : ''
                      )}
                    >
                      {date.getDate()}
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Today Button */}
            <div className="mt-4 pt-4 border-t-2 border-neutral-200">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleDateSelect(new Date())}
                disabled={isDateDisabled(new Date())}
                className={cn(
                  'w-full',
                  variant === 'brutal' && 'rotate-1 hover:rotate-0'
                )}
              >
                Today
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

DatePicker.displayName = 'DatePicker';
