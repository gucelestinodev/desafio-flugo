import { useState } from 'react';
import { Box, Button, Step, StepLabel, Stepper, Typography } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { employeeSchema, type EmployeeFormValues } from './employeeSchema';
import BasicInfoStep from './steps/BasicInfoStep';
import ProfessionalInfoStep from './steps/ProfessionalInfoStep';
import { createEmployee } from '../../services/employees';
import { useNavigate } from 'react-router-dom';

const steps = ['Infos Básicas', 'Infos Profissionais'];

export default function EmployeeFormWizard() {
  const [activeStep, setActiveStep] = useState(0);

  const methods = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      name: '',
      email: '',
      isActive: true,
      department: '',
      role: '',
    },
    mode: 'onChange',
  });

  const navigate = useNavigate();
  const progressPercent = Math.round((activeStep / steps.length) * 100);

  const handleNext = async () => {
    const fieldsToValidate =
      activeStep === 0 ? ['name', 'email', 'isActive'] : ['department', 'role'];

    const isValid = await methods.trigger(fieldsToValidate as any);
    if (!isValid) return;

    if (activeStep === steps.length - 1) {
      const values = methods.getValues();
      await createEmployee({
        name: values.name,
        email: values.email,
        department: values.department,
        role: values.role,
        status: values.isActive ? 'active' : 'inactive',
      });

      navigate('/colaboradores');
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (activeStep === 0) {
      navigate('/colaboradores');
    } else {
      setActiveStep((prev) => prev - 1);
    }
  };

  return (
    <FormProvider {...methods}>
      <Box mb={3}>
        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: 14,
              lineHeight: '22px',
              color: '#212B36',
              cursor: 'pointer',
            }}
            onClick={() => navigate('/colaboradores')}
          >
            Colaboradores
          </Typography>

          <Typography sx={{
            color: '#919EAB',
          }}> • </Typography>
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: 14,
              lineHeight: '22px',
              color: '#919EAB',
            }}
          >
            Cadastrar Colaborador
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Box
            sx={{
              position: 'relative',
              flex: 1,
              height: 4,
              borderRadius: 999,
              backgroundColor: '#22C55E3D',
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                width: `${progressPercent}%`,
                maxWidth: '100%',
                backgroundColor: '#22C55E',
                transition: 'width 200ms ease',
              }}
            />
          </Box>

          <Typography
            sx={{
              fontWeight: 400,
              fontSize: 12,
              lineHeight: '18px',
              color: '#919EAB',
              minWidth: 40,
              textAlign: 'right',
            }}
          >
            {progressPercent}%
          </Typography>
        </Box>
      </Box>
      <Box display="flex" gap={6}>
        <Box minWidth={220}>
          <Stepper
            orientation="vertical"
            activeStep={activeStep}
            sx={{
              '& .MuiStepLabel-label': {
                fontSize: 14,
                fontWeight: 500,
                color: '#637381',
              },
              '& .MuiStepLabel-label.Mui-active': {
                color: '#212B36',
                fontWeight: 600,
              },
              '& .MuiStepLabel-label.Mui-completed': {
                color: '#212B36',
                fontWeight: 600,
              },

              '& .MuiStepIcon-root': {
                color: '#DFE3E8',
              },
              '& .MuiStepIcon-root .MuiStepIcon-text': {
                fill: '#637381',
                fontWeight: 600,
              },
              '& .MuiStepIcon-root.Mui-active': {
                color: '#22C55E',
              },
              '& .MuiStepIcon-root.Mui-active .MuiStepIcon-text': {
                fill: '#FFFFFF',
              },
              '& .MuiStepIcon-root.Mui-completed': {
                color: '#22C55E',
              },
              '& .MuiStepIcon-root.Mui-completed .MuiStepIcon-text': {
                fill: '#FFFFFF',
              },
              '& .MuiStepConnector-line': {
                borderColor: '#DFE3E8',
                borderLeftWidth: 3,
                minHeight: 120,
              },
              '& .MuiStepConnector-root.Mui-completed .MuiStepConnector-line': {
                borderColor: '#22C55E',
                borderLeftWidth: 3,
              },
            }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        <Box flex={1} bgcolor="#FFFFFF">
          {activeStep === 0 && <BasicInfoStep />}
          {activeStep === 1 && <ProfessionalInfoStep />}

          <Box mt={4} display="flex" justifyContent="space-between">
            <Button
              onClick={handleBack}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                fontSize: 14,
                color: '#637381',
              }}
            >
              Voltar
            </Button>

            <Button
              variant="contained"
              onClick={handleNext}
              sx={{
                borderRadius: 2,
                px: '16px',
                py: '10px',
                textTransform: 'none',
                fontWeight: 700,
                fontSize: 15,
                backgroundColor: '#22C55E',
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: '#16A34A',
                  boxShadow: 'none',
                },
              }}
            >
              {activeStep === steps.length - 1 ? 'Finalizar' : 'Próximo'}
            </Button>
          </Box>
        </Box>
      </Box>
    </FormProvider>
  );
}
