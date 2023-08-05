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
  TextField,
  Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

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

const ClientCreateModal: React.FC<ClientCreateModalProps> = ({ isOpen = false, setIsOpen }) => {
  const [activeStep, setActiveStep] = useState(0);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
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
                  <Stack>
                  <label htmlFor="email">Email</label>
                  <TextField id='email' variant="outlined" hiddenLabel  {...register("email")} />
                  </Stack>
                  <Stack>
                  <label htmlFor="phone">Phone number</label>
                  <TextField id='phone' variant="outlined" hiddenLabel  {...register("phone")}  />
                  </Stack>
                </React.Fragment>
                ) : (
                  <React.Fragment key="step-1">
                    <Stack>
                    <label htmlFor="firstName">First name</label>
                    <TextField id='firstName' variant="outlined" hiddenLabel   {...register("firstName")} />
                    </Stack>
                    <Stack>
                    <label htmlFor="lastName">Last name</label>
                    <TextField id='lastName' variant="outlined" hiddenLabel  {...register("lastName")}/>
                    </Stack>
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
