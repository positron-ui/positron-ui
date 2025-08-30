import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface RadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
  disabled?: boolean;
  orientation?: 'horizontal' | 'vertical';
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  error?: boolean;
  helperText?: string;
}

const sizeVariants = {
  sm: {
    radio: 'w-4 h-4',
    dot: 'w-2 h-2',
    text: 'text-sm',
  },
  md: {
    radio: 'w-5 h-5',
    dot: 'w-2.5 h-2.5',
    text: 'text-base',
  },
  lg: {
    radio: 'w-6 h-6',
    dot: 'w-3 h-3',
    text: 'text-lg',
  },
};

const radioVariants = {
  unchecked: { 
    backgroundColor: '#ffffff',
    borderColor: '#000000',
    scale: 1,
  },
  checked: { 
    backgroundColor: '#ffffff',
    borderColor: '#000000',
    scale: 1.05,
    transition: { 
      duration: 0.15,
      ease: [0.68, -0.55, 0.265, 1.55] as const
    }
  },
};

const dotVariants = {
  unchecked: { scale: 0, opacity: 0 },
  checked: { 
    scale: 1, 
    opacity: 1,
    transition: { 
      duration: 0.15,
      ease: [0.68, -0.55, 0.265, 1.55] as const
    }
  },
};

const optionVariants = {
  initial: { x: 0 },
  hover: { 
    x: 2,
    transition: { 
      duration: 0.1,
      ease: [0.68, -0.55, 0.265, 1.55] as const
    }
  },
};

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      options,
      value,
      onChange,
      name,
      disabled = false,
      orientation = 'vertical',
      size = 'md',
      label,
      error = false,
      helperText,
      className,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState<string>(value || '');
    const sizeConfig = sizeVariants[size];
    const groupName = name || React.useId();

    const currentValue = value !== undefined ? value : internalValue;

    const handleChange = (optionValue: string) => {
      if (disabled) return;
      
      setInternalValue(optionValue);
      onChange?.(optionValue);
    };

    return (
      <div ref={ref} className={cn('w-full', className)} {...props}>
        {label && (
          <fieldset>
            <legend className="text-sm font-bold font-mono text-neutral-900 mb-3">
              {label}
            </legend>
            <div className={cn(
              'space-y-3',
              orientation === 'horizontal' && 'flex flex-wrap gap-6 space-y-0'
            )}>
              {options.map((option) => {
                const isChecked = currentValue === option.value;
                const isDisabled = disabled || option.disabled;

                return (
                  <motion.label
                    key={option.value}
                    className={cn(
                      'inline-flex items-start gap-3 cursor-pointer',
                      isDisabled && 'cursor-not-allowed opacity-50'
                    )}
                    variants={!isDisabled ? optionVariants : undefined}
                    initial="initial"
                    whileHover={!isDisabled ? "hover" : undefined}
                  >
                    <div className="relative flex-shrink-0">
                      <input
                        type="radio"
                        name={groupName}
                        value={option.value}
                        checked={isChecked}
                        onChange={() => handleChange(option.value)}
                        disabled={isDisabled}
                        className="sr-only"
                      />
                      <motion.div
                        className={cn(
                          'rounded-full border-2 flex items-center justify-center',
                          'shadow-[2px_2px_0px_0px_#000000]',
                          'focus-within:ring-2 focus-within:ring-black focus-within:ring-offset-2',
                          sizeConfig.radio,
                          error && 'border-red-500'
                        )}
                        variants={radioVariants}
                        animate={isChecked ? "checked" : "unchecked"}
                      >
                        <motion.div
                          className={cn(
                            'bg-sky-500 rounded-full',
                            sizeConfig.dot
                          )}
                          variants={dotVariants}
                          animate={isChecked ? "checked" : "unchecked"}
                        />
                      </motion.div>
                    </div>
                    <div className="min-w-0">
                      <div className={cn(
                        'font-mono font-bold text-neutral-900',
                        sizeConfig.text
                      )}>
                        {option.label}
                      </div>
                      {option.description && (
                        <div className="text-sm font-mono text-neutral-600 mt-1">
                          {option.description}
                        </div>
                      )}
                    </div>
                  </motion.label>
                );
              })}
            </div>
          </fieldset>
        )}

        {!label && (
          <div className={cn(
            'space-y-3',
            orientation === 'horizontal' && 'flex flex-wrap gap-6 space-y-0'
          )} role="radiogroup">
            {options.map((option) => {
              const isChecked = currentValue === option.value;
              const isDisabled = disabled || option.disabled;

              return (
                <motion.label
                  key={option.value}
                  className={cn(
                    'inline-flex items-start gap-3 cursor-pointer',
                    isDisabled && 'cursor-not-allowed opacity-50'
                  )}
                  variants={!isDisabled ? optionVariants : undefined}
                  initial="initial"
                  whileHover={!isDisabled ? "hover" : undefined}
                >
                  <div className="relative flex-shrink-0">
                    <input
                      type="radio"
                      name={groupName}
                      value={option.value}
                      checked={isChecked}
                      onChange={() => handleChange(option.value)}
                      disabled={isDisabled}
                      className="sr-only"
                    />
                    <motion.div
                      className={cn(
                        'rounded-full border-2 flex items-center justify-center',
                        'shadow-[2px_2px_0px_0px_#000000]',
                        'focus-within:ring-2 focus-within:ring-black focus-within:ring-offset-2',
                        sizeConfig.radio,
                        error && 'border-red-500'
                      )}
                      variants={radioVariants}
                      animate={isChecked ? "checked" : "unchecked"}
                    >
                      <motion.div
                        className={cn(
                          'bg-sky-500 rounded-full',
                          sizeConfig.dot
                        )}
                        variants={dotVariants}
                        animate={isChecked ? "checked" : "unchecked"}
                      />
                    </motion.div>
                  </div>
                  <div className="min-w-0">
                    <div className={cn(
                      'font-mono font-bold text-neutral-900',
                      sizeConfig.text
                    )}>
                      {option.label}
                    </div>
                    {option.description && (
                      <div className="text-sm font-mono text-neutral-600 mt-1">
                        {option.description}
                      </div>
                    )}
                  </div>
                </motion.label>
              );
            })}
          </div>
        )}

        {helperText && (
          <p className={cn(
            'mt-3 text-sm font-mono',
            error ? 'text-red-600' : 'text-neutral-600'
          )}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';
