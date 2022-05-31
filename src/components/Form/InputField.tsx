import clsx from 'clsx';
import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper';

type InputFieldProps = FieldWrapperPassThroughProps & {
  type?:
    | 'text'
    | 'email'
    | 'password'
    | 'file'
    | 'checkbox'
    | 'hidden'
    | 'tel'
    | 'number'
    | 'radio'
    | 'range'
    | 'search'
    | 'url';
  autoComplete?: string; // You can view the different autocomplete values here: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete#values
  className?: string;
  multiple?: boolean;
  accept?: string;
  value?: string | number | readonly string[] | undefined;
  placeholder?: string;
  disabled?: boolean;
  pattern?: string;
  registration: Partial<UseFormRegisterReturn>;
};

export const InputField = (props: InputFieldProps) => {
  const {
    type = 'text',
    autoComplete = '',
    label,
    subLabel,
    icon,
    className,
    multiple,
    accept,
    value,
    placeholder,
    disabled = false,
    pattern,
    registration,
    error,
  } = props;

  return (
    <FieldWrapper label={label} subLabel={subLabel} icon={icon} error={error}>
      <fieldset disabled={disabled}>
        <input
          type={type}
          autoComplete={autoComplete}
          multiple={multiple}
          accept={accept}
          value={value}
          placeholder={placeholder}
          pattern={pattern}
          className={
            type !== 'checkbox'
              ? clsx(
                  'bg-white dark:bg-gray-900 appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm',
                  'placeholder-gray-400 dark:placeholder-white focus:outline-none focus:ring-blue-500 dark:focus:ring-indigo-700 focus:border-blue-500',
                  'dark:focus:border-indigo-900 sm:text-sm',
                  className
                )
              : clsx(
                  'bg-white dark:bg-gray-900 block px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm',
                  'placeholder-gray-400 dark:placeholder-white focus:outline-none focus:ring-blue-500 dark:focus:ring-indigo-700 focus:border-blue-500',
                  'dark:focus:border-indigo-900 sm:text-sm',
                  className
                )
          }
          {...registration}
        />
      </fieldset>
    </FieldWrapper>
  );
};
