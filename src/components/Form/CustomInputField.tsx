import React from 'react';

import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper';

type CustomInputFieldProps = FieldWrapperPassThroughProps & {
  customInputField: React.ReactNode;
  disabled?: boolean;
};

export const CustomInputField = (props: CustomInputFieldProps) => {
  const { label, subLabel, icon, disabled = false, error, customInputField } = props;

  return (
    <FieldWrapper label={label} subLabel={subLabel} icon={icon} error={error}>
      <fieldset disabled={disabled}>{customInputField}</fieldset>
    </FieldWrapper>
  );
};
