import {
  Backdrop,
  Box,
  Button,
  Fade,
  Modal,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormInput } from '../../Form';

interface ClientCreateModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 4,
  p: 4
};

const steps = ['Personal details', 'Contact details'];

export interface FormInputs {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

const ClientCreateModal: React.FC<ClientCreateModalProps> = ({ isOpen = false, setIsOpen }) => {
  const [activeStep, setActiveStep] = useState(0);
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormInputs>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    }
  });

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleNext = () => {
    if (activeStep !== steps.length - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const onSubmit = async (data: any) => console.log(data);

  return (
    <Modal
      aria-labelledby="Create new client"
      aria-describedby="Create new client modal"
      open={isOpen}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          sx: {
            background: 'none'
          }
        }
      }}
    >
      <Fade in={isOpen}>
        <Box sx={style}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              sx={{ fontWeight: 400 }}
            >
              Create new client
            </Typography>
            <Button onClick={handleClose} sx={{ padding: 0, justifyContent: 'flex-end' }}>
              <CloseIcon />
            </Button>
          </Stack>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stepper activeStep={activeStep} sx={{ marginTop: 3 }}>
              {steps.map((label, index) => {
                const stepProps: { completed?: boolean } = {};
                const labelProps: {
                  optional?: React.ReactNode;
                } = {};
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  All steps completed - you&apos;re finished
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Box sx={{ flex: '1 1 auto' }} />
                </Box>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {activeStep === 1 ? (
                  <React.Fragment key="step-2">
                    <FormInput name="email" label="Email" control={control} sx={{ marginTop: 2 }} />
                    <FormInput
                      name="phone"
                      label="Phone number"
                      control={control}
                      sx={{ marginTop: 1, marginBottom: 5 }}
                    />
                  </React.Fragment>
                ) : (
                  <React.Fragment key="step-1">
                    <FormInput
                      name="firstName"
                      label="First name"
                      control={control}
                      sx={{ marginTop: 2 }}
                    />
                    <FormInput
                      name="lastName"
                      label="Last name"
                      control={control}
                      sx={{ marginTop: 1, marginBottom: 5 }}
                    />
                  </React.Fragment>
                )}
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                  <Box sx={{ flex: '1 1 auto' }} />
                  <Button onClick={handleNext} variant="contained">
                    {activeStep === steps.length - 1 ? 'Create client' : 'Continue'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ClientCreateModal;
