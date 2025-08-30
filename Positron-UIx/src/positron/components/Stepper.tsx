import React from 'react';
import { Check, Circle } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

export interface StepperStep {
  id: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  optional?: boolean;
}

export interface StepperProps {
  steps: StepperStep[];
  currentStep: number;
  completedSteps?: number[];
  orientation?: 'horizontal' | 'vertical';
  variant?: 'default' | 'brutal' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  clickable?: boolean;
  onStepClick?: (stepIndex: number) => void;
  showProgress?: boolean;
  className?: string;
}

const sizeVariants = {
  sm: {
    icon: 'w-6 h-6 text-xs',
    title: 'text-sm',
    description: 'text-xs',
    spacing: 'gap-2',
  },
  md: {
    icon: 'w-8 h-8 text-sm',
    title: 'text-base',
    description: 'text-sm',
    spacing: 'gap-3',
  },
  lg: {
    icon: 'w-10 h-10 text-base',
    title: 'text-lg',
    description: 'text-base',
    spacing: 'gap-4',
  },
};

export const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStep,
  completedSteps = [],
  orientation = 'horizontal',
  variant = 'default',
  size = 'md',
  clickable = false,
  onStepClick,
  showProgress = true,
  className,
}) => {
  const sizeConfig = sizeVariants[size];

  const getStepStatus = (stepIndex: number): 'completed' | 'current' | 'upcoming' => {
    if (completedSteps.includes(stepIndex) || stepIndex < currentStep) {
      return 'completed';
    }
    if (stepIndex === currentStep) {
      return 'current';
    }
    return 'upcoming';
  };

  const handleStepClick = (stepIndex: number) => {
    if (clickable && onStepClick) {
      onStepClick(stepIndex);
    }
  };

  const renderStepIcon = (step: StepperStep, stepIndex: number, status: 'completed' | 'current' | 'upcoming') => {
    const iconClasses = cn(
      'rounded-full border-2 flex items-center justify-center font-mono font-black transition-all',
      sizeConfig.icon,
      variant === 'brutal' && 'shadow-[2px_2px_0px_0px_#000000]',
      status === 'completed' && 'bg-emerald-500 border-black text-white',
      status === 'current' && 'bg-sky-500 border-black text-white',
      status === 'upcoming' && 'bg-white border-neutral-300 text-neutral-500',
      variant === 'brutal' && status === 'current' && 'rotate-12 scale-110',
      variant === 'brutal' && status === 'completed' && 'rotate-6',
      variant === 'brutal' && status === 'upcoming' && 'rotate-2',
      clickable && 'cursor-pointer hover:scale-110'
    );

    if (step.icon) {
      return (
        <div className={iconClasses}>
          {step.icon}
        </div>
      );
    }

    return (
      <div className={iconClasses}>
        {status === 'completed' ? (
          <Check className="w-4 h-4" />
        ) : status === 'current' ? (
          <Circle className="w-4 h-4 fill-current" />
        ) : (
          <span>{stepIndex + 1}</span>
        )}
      </div>
    );
  };

  const renderConnector = (stepIndex: number) => {
    if (stepIndex === steps.length - 1) return null;

    const isCompleted = getStepStatus(stepIndex) === 'completed';
    const isCurrent = getStepStatus(stepIndex) === 'current';
    
    const connectorClasses = cn(
      'transition-all',
      orientation === 'horizontal' ? 'h-0.5 min-w-8 flex-1' : 'w-0.5 min-h-8 flex-1 ml-4',
      variant === 'brutal' && 'border-2 border-black',
      isCompleted || isCurrent
        ? variant === 'brutal' 
          ? 'bg-sky-500'
          : 'bg-emerald-500'
        : 'bg-neutral-300'
    );

    return (
      <div className={connectorClasses}>
        {showProgress && (isCompleted || isCurrent) && (
          <motion.div
            initial={{ width: 0, height: 0 }}
            animate={{ 
              width: orientation === 'horizontal' ? '100%' : undefined,
              height: orientation === 'vertical' ? '100%' : undefined
            }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className={cn(
              'bg-gradient-to-r from-emerald-500 to-sky-500',
              orientation === 'horizontal' ? 'h-full' : 'w-full'
            )}
          />
        )}
      </div>
    );
  };

  const containerClasses = cn(
    'flex',
    orientation === 'horizontal' ? 'items-center' : 'flex-col',
    sizeConfig.spacing,
    className
  );

  const stepContainerClasses = cn(
    'flex items-center',
    sizeConfig.spacing,
    orientation === 'vertical' && 'flex-col items-start'
  );

  return (
    <div className={containerClasses}>
      {steps.map((step, stepIndex) => {
        const status = getStepStatus(stepIndex);
        
        return (
          <React.Fragment key={step.id}>
            <div
              className={cn(
                stepContainerClasses,
                clickable && 'cursor-pointer',
                orientation === 'vertical' && 'w-full'
              )}
              onClick={() => handleStepClick(stepIndex)}
            >
              {/* Step Icon */}
              {renderStepIcon(step, stepIndex, status)}

              {/* Step Content */}
              <div className={cn(
                'flex flex-col',
                orientation === 'vertical' && 'ml-4 pb-4',
                orientation === 'horizontal' && 'min-w-0'
              )}>
                <div className="flex items-center gap-2">
                  <h3 className={cn(
                    'font-mono font-bold',
                    sizeConfig.title,
                    status === 'completed' && 'text-emerald-700',
                    status === 'current' && 'text-sky-700',
                    status === 'upcoming' && 'text-neutral-500'
                  )}>
                    {step.title}
                  </h3>
                  {step.optional && (
                    <span className="text-xs font-mono text-neutral-500 bg-neutral-100 px-2 py-1 rounded border">
                      Optional
                    </span>
                  )}
                </div>
                
                {step.description && (
                  <p className={cn(
                    'font-mono',
                    sizeConfig.description,
                    status === 'completed' && 'text-emerald-600',
                    status === 'current' && 'text-sky-600',
                    status === 'upcoming' && 'text-neutral-400'
                  )}>
                    {step.description}
                  </p>
                )}
              </div>
            </div>

            {/* Connector */}
            {orientation === 'horizontal' && renderConnector(stepIndex)}
            {orientation === 'vertical' && stepIndex < steps.length - 1 && (
              <div className="ml-4">
                {renderConnector(stepIndex)}
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

Stepper.displayName = 'Stepper';
