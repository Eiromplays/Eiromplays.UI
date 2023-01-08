import create from 'zustand';

import { StepType } from '@/types';

export type MultiStepFormState = {
  currentStep: number;
  hasNextStep: boolean;
  hasPreviousStep: boolean;
  nextStep: () => void;
  prevStep: () => void;
  step: StepType;
  steps: StepType[];
  setSteps: (steps: StepType[]) => void;
  formValues: Record<string, any>;
  setFormValues: (values: Record<string, any>) => void;
  reset: () => void;
};

export const useStepper = create<MultiStepFormState>((set) => ({
  currentStep: 0,
  hasNextStep: false,
  hasPreviousStep: false,
  nextStep: () =>
    set((state) => {
      const hasPreviousStep = state.currentStep > 0;
      const hasNextStep = state.currentStep < state.steps.length - 1;

      if (hasNextStep) {
        const nextStep = state.currentStep + 1;
        return {
          ...state,
          currentStep: nextStep,
          step: state.steps[nextStep],
          hasNextStep,
          hasPreviousStep,
        };
      }
      return { ...state, hasNextStep, hasPreviousStep };
    }),
  prevStep: () =>
    set((state) => {
      const hasPreviousStep = state.currentStep > 0;
      const hasNextStep = state.currentStep < state.steps.length - 1;

      if (hasPreviousStep) {
        const prevStep = state.currentStep - 1;
        return {
          ...state,
          currentStep: prevStep,
          step: state.steps[prevStep],
          hasPreviousStep,
          hasNextStep,
        };
      }
      return { ...state, hasPreviousStep, hasNextStep };
    }),
  step: {} as StepType,
  steps: [],
  setSteps: (steps) =>
    set((state) => {
      return {
        steps,
        step: steps[state.currentStep],
        hasNextStep: state.currentStep < steps.length - 1,
        hasPreviousStep: state.currentStep > 0,
      };
    }),
  formValues: {},
  setFormValues: (values) =>
    set((state) => ({ ...state, formValues: { ...state.formValues, ...values } })),
  reset: () =>
    set(() => ({
      currentStep: 0,
      hasNextStep: false,
      hasPreviousStep: false,
      step: {} as StepType,
      steps: [],
      formValues: {},
    })),
}));
