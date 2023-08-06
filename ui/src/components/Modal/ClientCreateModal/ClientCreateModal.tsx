import React, { useContext, useState } from 'react';
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
import { useForm } from 'react-hook-form';
import { NameStep } from './NameStep';
import { ContactStep } from './ContactStep';
import { StateContext } from '../../../store/DataProvider';

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
  phoneNumber: string;
}

const ClientCreateModal: React.FC<ClientCreateModalProps> = ({ isOpen = false, setIsOpen }) => {
  const { dispatch } = useContext(StateContext);
  const [activeStep, setActiveStep] = useState(0);
  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger
  } = useForm<FormInputs>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: ''
    }
  });

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleNext = async () => {
    if (activeStep === 0) {
      const noError = await trigger(['firstName', 'lastName']);

      if (noError) setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const onSubmit = async (data: any) => {
    dispatch({ type: 'CREATE_CLIENT', data });
    handleClose();
  };

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

                return (
                  <Step
                    key={label}
                    {...stepProps}
                    sx={{
                      '& .MuiStepLabel-root .Mui-completed': {
                        color: 'var(--green)' // circle color (COMPLETED)
                      },
                      '& .MuiStepLabel-label.Mui-completed': {
                        color: 'black', // Just text label (COMPLETED)
                        fontWeight: 600
                      },
                      '& .MuiStepLabel-root .Mui-active': {
                        color: 'var(--blue)' // circle color (ACTIVE)
                      },
                      '& .MuiStepLabel-label.Mui-active': {
                        color: 'black', // Just text label (ACTIVE)
                        fontWeight: 600
                      },
                      '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {
                        fill: 'white' // circle's number (ACTIVE)
                      }
                    }}
                  >
                    <StepLabel>{label}</StepLabel>
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
                <NameStep control={control} show={activeStep === 0} />
                <ContactStep control={control} show={activeStep === 1} />
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
                  {activeStep !== steps.length - 1 && (
                    <Button onClick={handleNext} variant="contained">
                      Continue
                    </Button>
                  )}
                  {activeStep === steps.length - 1 && (
                    <Button variant="contained" type="submit">
                      Create client
                    </Button>
                  )}
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
