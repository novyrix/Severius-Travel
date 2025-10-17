'use client';

import { ReactNode, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  description: string;
}

interface MultiStepFormProps {
  steps: Step[];
  currentStep: number;
  onStepChange: (step: number) => void;
  children: ReactNode;
}

export function MultiStepForm({ steps, currentStep, onStepChange, children }: MultiStepFormProps) {
  return (
    <div className="space-y-8">
      {/* Progress Indicator */}
      <div className="relative">
        {/* Progress Bar */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-neutral-200">
          <motion.div
            className="h-full bg-gradient-to-r from-[rgb(var(--color-gold))] to-[rgb(var(--color-brown))]"
            initial={{ width: '0%' }}
            animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
        </div>

        {/* Steps */}
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isCompleted = currentStep > stepNumber;
            const isCurrent = currentStep === stepNumber;

            return (
              <div
                key={step.id}
                className="flex flex-col items-center cursor-pointer group"
                onClick={() => onStepChange(stepNumber)}
              >
                {/* Step Circle */}
                <motion.div
                  initial={false}
                  animate={{
                    scale: isCurrent ? 1.1 : 1,
                    backgroundColor: isCompleted
                      ? 'rgb(var(--color-gold))'
                      : isCurrent
                      ? 'rgb(var(--color-brown))'
                      : 'rgb(255, 255, 255)',
                  }}
                  className={`w-10 h-10 rounded-full border-2 flex items-center justify-center shadow-lg transition-all ${
                    isCompleted || isCurrent
                      ? 'border-[rgb(var(--color-gold))]'
                      : 'border-neutral-300'
                  } ${isCurrent ? 'ring-4 ring-[rgb(var(--color-gold))]/20' : ''}`}
                >
                  <AnimatePresence mode="wait">
                    {isCompleted ? (
                      <motion.div
                        key="check"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 180 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Check className="w-5 h-5 text-white" />
                      </motion.div>
                    ) : (
                      <motion.span
                        key="number"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className={`text-sm font-bold ${
                          isCurrent ? 'text-white' : 'text-neutral-600'
                        }`}
                      >
                        {stepNumber}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Step Label */}
                <div className="mt-3 text-center max-w-[120px]">
                  <motion.p
                    animate={{
                      color: isCurrent
                        ? 'rgb(var(--color-brown))'
                        : isCompleted
                        ? 'rgb(var(--color-gold))'
                        : 'rgb(115, 115, 115)',
                    }}
                    className="text-sm font-medium"
                  >
                    {step.title}
                  </motion.p>
                  <p className="text-xs text-neutral-500 mt-1 hidden md:block">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Content with Animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="rounded-2xl bg-white/40 backdrop-blur-xl border border-white/20 shadow-xl p-8"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  onSubmit?: () => void;
  isLoading?: boolean;
  nextLabel?: string;
  previousLabel?: string;
  submitLabel?: string;
}

export function StepNavigation({
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
  onSubmit,
  isLoading = false,
  nextLabel = 'Next Step',
  previousLabel = 'Previous',
  submitLabel = 'Complete & Save',
}: StepNavigationProps) {
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="flex items-center justify-between pt-6 border-t border-neutral-200">
      {/* Previous Button */}
      {!isFirstStep && (
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onPrevious}
          disabled={isLoading}
          className="px-6 py-3 rounded-lg border-2 border-neutral-300 text-neutral-700 font-medium hover:bg-neutral-50 transition-colors disabled:opacity-50"
        >
          ← {previousLabel}
        </motion.button>
      )}

      {/* Spacer */}
      {isFirstStep && <div />}

      {/* Progress Text */}
      <span className="text-sm text-neutral-500">
        Step {currentStep} of {totalSteps}
      </span>

      {/* Next/Submit Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={isLastStep && onSubmit ? onSubmit : onNext}
        disabled={isLoading}
        className="px-6 py-3 rounded-lg bg-gradient-to-r from-[rgb(var(--color-gold))] to-[rgb(var(--color-brown))] text-white font-medium shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Processing...
          </>
        ) : isLastStep ? (
          <>
            <Check className="w-5 h-5" />
            {submitLabel}
          </>
        ) : (
          <>
            {nextLabel} →
          </>
        )}
      </motion.button>
    </div>
  );
}
