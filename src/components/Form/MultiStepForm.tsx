import React from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { ZodType, ZodTypeDef } from 'zod';

import { Button } from '../Elements';

import { Form, FormProps } from './Form';
import { useStepper } from './MultiStep';

export type MultiStepFormProps<TFormValues extends FieldValues, Schema> = FormProps<
  TFormValues,
  Schema
> & {
  customNextButton?: React.ReactNode;
  customPrevButton?: React.ReactNode;
  customSubmitButton?: React.ReactNode;
};

export const MultiStepForm = <
  TFormValues extends Record<string, unknown> = Record<string, unknown>,
  Schema extends ZodType<unknown, ZodTypeDef, unknown> = ZodType<unknown, ZodTypeDef, unknown>
>(
  props: MultiStepFormProps<TFormValues, Schema>
) => {
  const { hasPreviousStep, formValues, prevStep, steps, currentStep } = useStepper(
    (state) => state
  );

  const { children, customNextButton, customPrevButton, customSubmitButton, ...rest } = props;

  const hasNextStep = currentStep + 1 < steps.length;

  const nextButton = () => {
    if (!hasNextStep) return <></>;

    return customNextButton ? (
      customNextButton
    ) : (
      <Button form={rest.id} type="submit" size="sm" variant="outline" className="mt-4">
        Next
      </Button>
    );
  };

  const submitButton = () => {
    if (hasNextStep) return <></>;

    return customSubmitButton ? (
      customSubmitButton
    ) : (
      <Button
        form={rest.id}
        type="submit"
        variant="outline"
        size="sm"
        className="hover:bg-green-600 dark:hover:bg-green-700 mt-4"
        onClick={() => {
          rest.onSubmit(formValues as TFormValues);
        }}
      >
        Submit
      </Button>
    );
  };

  const prevButton = () => {
    if (!hasPreviousStep) return <></>;

    return customPrevButton ? (
      customPrevButton
    ) : (
      <Button variant="outline" size="sm" onClick={() => prevStep()}>
        Previous
      </Button>
    );
  };

  rest.customChildren = (methods: UseFormReturn<TFormValues>) => {
    return (
      <>
        {children(methods)}
        <div className="flex justify-between items-center">
          {prevButton()}
          {nextButton()}
          {submitButton()}
        </div>
      </>
    );
  };

  return <Form {...rest}>{rest.customChildren}</Form>;
};
