import React from 'react';
import { type Control, Controller } from 'react-hook-form';
import { type FormInputs } from '../Modal/ClientCreateModal';
import PhoneInputWithCountrySelect, { isValidPhoneNumber } from 'react-phone-number-input';
import { Stack, type SxProps, type Theme } from '@mui/material';

import 'react-phone-number-input/style.css';
import './PhoneInput.css';

interface PhoneInputProps {
  label?: string;
  name: 'email' | 'firstName' | 'lastName' | 'phoneNumber';
  control?: Control<FormInputs, any>;
  required?: boolean;
  sx?: SxProps<Theme>;
}

const PhoneInput: React.FC<PhoneInputProps> = ({ control, label, name, required = false, sx }) => {
  return (
    <Stack gap="4px" sx={{ ...sx }}>
      <label htmlFor={name} style={{ color: 'var(--gray)' }}>
        {label}
      </label>
      <Controller
        name="phoneNumber"
        control={control}
        render={({ field, formState: { errors } }) => {
          // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
          const hasError = !!errors?.[name];

          return (
            <>
              <PhoneInputWithCountrySelect
                placeholder="Enter phone number"
                {...field}
                className={`PhoneInput ${hasError ? 'PhoneInput--hasError' : ''}`}
              />
              {hasError && (
                <p className="ErrorMessage">
                  {errors[name]?.type === 'format' ? 'Invalid format.' : errors[name]?.message}
                </p>
              )}
            </>
          );
        }}
        rules={{
          ...(required && {
            required: 'This field is required.'
          }),
          validate: {
            format: (value) => isValidPhoneNumber(value)
          }
        }}
      />
    </Stack>
  );
};

export default PhoneInput;
