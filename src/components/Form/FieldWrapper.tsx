import clsx from 'clsx';
import React from 'react';
import { FieldError } from 'react-hook-form';

export type FieldWrapperProps = {
  label?: string;
  subLabel?: string;
  icon?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
  error?: FieldError | FieldError[] | undefined;
  description?: string;
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
      {Array.isArray(error)
        ? error.map((err, i) => (
            <div
              key={i}
              role="alert"
              aria-label={err.message}
              className="text-sm font-semibold text-red-500"
            >
              {err.message}
            </div>
          ))
        : error?.message && (
            <div
              role="alert"
              aria-label={error.message}
              className="text-sm font-semibold text-red-500"
            >
              {error.message}
            </div>
          )}
    </div>
  );
};
