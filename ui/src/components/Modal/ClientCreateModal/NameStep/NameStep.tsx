import React from 'react';
import { FormInput } from '../../../Form';
import { Stack } from '@mui/material';

interface NameStepProps {
  control: any;
  show?: boolean;
}

const NameStep: React.FC<NameStepProps> = ({ control, show = false }) => {
  return (
    <Stack sx={{ display: show ? 'block' : 'none' }}>
      <FormInput
        name="firstName"
        label="First name"
        control={control}
        sx={{ marginTop: 2 }}
        required
      />
      <FormInput
        name="lastName"
        label="Last name"
        control={control}
        sx={{ marginTop: 1, marginBottom: 5 }}
        required
      />
    </Stack>
  );
};

export default NameStep;
