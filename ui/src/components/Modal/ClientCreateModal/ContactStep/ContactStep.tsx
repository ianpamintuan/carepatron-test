import { Stack } from '@mui/material';
import { FormInput } from '../../../Form';
import { PhoneInput } from '../../../PhoneInput';

interface ContactStepProps {
  control: any;
  show?: boolean;
}

const ContactStep: React.FC<ContactStepProps> = ({ control, show = false }) => {
  return (
    <Stack sx={{ display: show ? 'block' : 'none' }}>
      <FormInput
        name="email"
        label="Email"
        type="email"
        control={control}
        sx={{ marginTop: 2 }}
        required
      />
      <PhoneInput
        name="phoneNumber"
        label="Phone number"
        control={control}
        sx={{ marginTop: 1, marginBottom: 5 }}
        required
      />
    </Stack>
  );
};

export default ContactStep;
