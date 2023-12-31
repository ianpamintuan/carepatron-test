import styled from '@emotion/styled';
import { Stack, type SxProps, TextField, type Theme } from '@mui/material';
import React from 'react';
import { type Control, Controller } from 'react-hook-form';
import { type FormInputs } from '../../Modal/ClientCreateModal';

interface FormInputProps {
  label?: string;
  name: 'email' | 'firstName' | 'lastName' | 'phoneNumber';
  control?: Control<FormInputs, any>;
  sx?: SxProps<Theme>;
  size?: 'small' | 'medium';
  required?: boolean;
  type?: React.HTMLInputTypeAttribute;
}

const CustomTextField = styled(TextField)<{ size: 'small' | 'medium' }>((props) => ({
  '& .MuiInputBase-root.MuiOutlinedInput-root': {
    borderRadius: '8px'
  },
  '& label.Mui-focused': {
    color: '#A0AAB4'
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#B2BAC2'
  },
  '& .MuiInputBase-input': {
    padding: props.size === 'small' ? '12px 10px' : '16.5px 14px'
  },
  '& .MuiFormHelperText-root.Mui-error': {
    margin: '4px 0 0 0'
  }
}));

const FormInput: React.FC<FormInputProps> = ({
  name,
  label,
  control,
  size = 'small',
  sx,
  required = false,
  type = 'text'
}) => {
  return (
    <Stack gap="4px" sx={{ ...sx }}>
      <label htmlFor={name} style={{ color: 'var(--gray)' }}>
        {label}
      </label>
      <Controller
        control={control}
        name={name}
        render={({ field, formState: { errors } }) => {
          // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
          const hasError = !!errors?.[name];

          return (
            <CustomTextField
              id={name}
              variant="outlined"
              hiddenLabel
              size={size}
              error={hasError}
              type={type}
              {...(hasError && { helperText: errors[name]?.message })}
              {...field}
            />
          );
        }}
        rules={{
          ...(required && {
            required: 'This field is required.'
          }),
          ...(type === 'email' && {
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Entered value does not match email format.'
            }
          })
        }}
      />
    </Stack>
  );
};

FormInput.displayName = 'FormInput';

export default FormInput;
