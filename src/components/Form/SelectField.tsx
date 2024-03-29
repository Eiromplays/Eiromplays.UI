import clsx from 'clsx';
import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper';

type Option = {
  label: React.ReactNode;
  value: string | number | string[];
};

type SelectFieldProps = FieldWrapperPassThroughProps & {
  options: Option[];
  className?: string;
  defaultValue?: string;
  placeholder?: string;
  registration: Partial<UseFormRegisterReturn>;
};

export const SelectField = (props: SelectFieldProps) => {
  const {
    label,
    options,
    className,
    defaultValue,
    registration,
    placeholder,
    subLabel,
    icon,
    error,
  } = props;

  return (
    <FieldWrapper
      label={label}
      subLabel={subLabel}
      icon={icon}
      error={{
        name: registration.name ?? error?.name ?? '',
        errors: error?.errors,
      }}
    >
      <select
        placeholder={placeholder}
        name="location"
        className={clsx(
          'mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md',
          className
        )}
        defaultValue={defaultValue}
        {...registration}
      >
        {options.map(({ label, value }) => (
          <option key={label?.toString()} value={value}>
            {label}
          </option>
        ))}
      </select>
    </FieldWrapper>
  );
};
