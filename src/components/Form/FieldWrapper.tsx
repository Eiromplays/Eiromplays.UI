import { ErrorMessage } from '@hookform/error-message';
import clsx from 'clsx';
import React from 'react';
import { FieldErrors } from 'react-hook-form';

export type FieldWrapperProps = {
  label?: string;
  subLabel?: string;
  icon?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
  error?: FieldWrapperErrorProps;
  description?: string;
};

export type FieldWrapperErrorProps = {
  name?: string;
  errors?: FieldErrors;
};

export type FieldWrapperPassThroughProps = Omit<FieldWrapperProps, 'className' | 'children'>;

export const FieldWrapper = (props: FieldWrapperProps) => {
  const { label, subLabel, icon, className, error, children } = props;
  return (
    <div>
      <label className={clsx('block text-sm font-medium text-gray-700 dark:text-white', className)}>
        {label} {icon && icon}
        {subLabel && <p className="text-xs text-gray-500 dark:text-gray-400">{subLabel}</p>}
        <div className="mt-1">{children}</div>
      </label>
      {error?.name && error?.errors && (
        <ErrorMessage
          name={error.name}
          errors={error.errors}
          as={<div className="text-sm font-semibold text-red-500" />}
        />
      )}
    </div>
  );
};
