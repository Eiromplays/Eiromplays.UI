import React from 'react';

import { StepType } from '@/types';

import { useStepper } from './useStepper';

export type StepProps = {
  step: StepType;
  index: number;
};

export const Step = ({ step, index }: StepProps) => {
  const { currentStep } = useStepper((state) => state);

  const nextStepIndex = index + 1;
  const completed = index < currentStep;
  const highlighted = index === currentStep;
  const hasNextStep = index < nextStepIndex - 1;
  const selected = index <= currentStep;

  return (
    <div className={hasNextStep ? 'w-full flex items-center' : 'flex items-center'}>
      <div className="relative flex flex-col items-center text-teal-600 dark:text-teal-400">
        <div
          className={`rounded-full transition duration-500 ease-in-out border-2 border-gray-300 h-12 w-12 flex items-center justify-center py-3 dark:border-gray-400  ${
            selected ? 'bg-green-600 text-white font-bold border border-green-600' : ''
          }`}
        >
          {completed ? (
            <span className="text-white font-bold text-xl">&#10003;</span>
          ) : (
            nextStepIndex
          )}
        </div>
        <div
          className={`absolute top-0  text-center mt-16 w-32 text-xs font-medium uppercase ${
            highlighted ? 'text-gray-900 dark:text-gray-400' : 'text-gray-400 dark:text-gray-200'
          }`}
        >
          {/*step.icon && <step.icon className="flex-shrink-0 mr-2 w-7 h-7" aria-hidden="true" />*/}
          {step.label}
          {step.subLabel && (
            <div
              className={
                highlighted
                  ? 'text-gray-800 text-gray-300'
                  : 'text-gray-300 dark:text-gray-100 break-words'
              }
            >
              {step.subLabel}
            </div>
          )}
        </div>
      </div>
      <div
        className={`flex-auto border-t-2 transition duration-500 ease-in-out  ${
          completed
            ? 'border-green-600 dark:border-green-800'
            : 'border-gray-300 dark:border-gray-400'
        }`}
      ></div>
    </div>
  );
};
