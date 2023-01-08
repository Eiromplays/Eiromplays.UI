import React from 'react';

import { StepType } from '@/types';

import { Step } from './Step';
import { useStepper } from './useStepper';

export type StepperProps = {
  steps: StepType[];
  onSubmit: (values: any) => void | Promise<void>;
};
export const Stepper = ({ steps, onSubmit }: StepperProps) => {
  const { currentStep, nextStep, step, setSteps, formValues, reset } = useStepper((state) => state);
  React.useEffect(() => {
    setSteps(steps);
  }, [steps, setSteps]);

  return (
    <div className="mx-auto rounded-2xl bg-white pb-2 shadow-xl md:w-1/2 dark:bg-gray-800">
      <div className="horizontal container mt-5">
        <div className="mx-4 p-4 flex justify-between items-center">
          {steps.map((step, index) => {
            return <Step key={index} step={step} index={index} />;
          })}
        </div>

        <div className="my-10 p-10 ">
          {step.component && (
            <step.component
              onFormCompleted={() => {
                const hasNextStep = currentStep + 1 < steps.length;

                if (hasNextStep) {
                  nextStep();
                } else {
                  onSubmit(formValues);
                  reset();
                }
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
