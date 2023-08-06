import { type Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { Stack, type SxProps, TextField } from '@mui/material';
import React from 'react';
import { type Control, Controller } from 'react-hook-form';
import { type FormInputs } from '../../Modal/ClientCreateModal';

interface FormInputProps {
  label?: string;
  name: string | any;
  control?: Control<FormInputs, any>;
  sx?: SxProps<Theme>;
  size?: 'small' | 'medium';
}

const CustomTextField = styled(TextField)<{ size: 'small' | 'medium' }>((props) => ({
  '& label.Mui-focused': {
    color: '#A0AAB4'
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#B2BAC2'
  },
  '& .MuiInputBase-input': {
    padding: props.size === 'small' ? '12px 10px' : '16.5px 14px'
  }
}));

const FormInput: React.FC<FormInputProps> = ({ name, label, control, size = 'small', sx }) => (
  <Stack gap="8px" sx={{ ...sx }}>
    <label htmlFor={name}>{label}</label>
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <CustomTextField id={name} variant="outlined" hiddenLabel size={size} {...field} />
      )}
    />
  </Stack>
);

FormInput.displayName = 'FormInput';

export default FormInput;