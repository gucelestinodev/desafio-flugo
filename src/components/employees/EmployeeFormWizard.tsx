import { useEffect, useState } from 'react';
import { Box, Button, Step, StepLabel, Stepper, Typography } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { employeeSchema, type EmployeeFormValues } from './employeeSchema';
import BasicInfoStep from './steps/BasicInfoStep';
import ProfessionalInfoStep from './steps/ProfessionalInfoStep';
import AddressContactStep from './steps/AddressContactStep';
import BankingStep from './steps/BankingStep';
import { createEmployee, getEmployee, updateEmployee } from '../../services/employees';
import { useNavigate } from 'react-router-dom';
import type { Employee, EmployeeStatus } from '../../types/employee';

type EmployeeFormWizardProps = {
  employeeId?: string;
};

const steps = [
  'Infos Básicas',
  'Infos Profissionais',
  'Endereço e Contato',
  'Dados Bancários',
];

export default function EmployeeFormWizard({ employeeId }: EmployeeFormWizardProps) {
  const [activeStep, setActiveStep] = useState(0);
  const isEdit = !!employeeId;

  const methods = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      name: '',
      email: '',
      isActive: true,
      cpf: '',
      birthDate: '',

      department: '',
      role: '',
      admissionDate: '',
      employmentType: '',
      workRegime: '',

      addressCep: '',
      addressStreet: '',
      addressNumber: '',
      addressComplement: '',
      addressNeighborhood: '',
      addressCity: '',
      addressState: '',
      contactPhone: '',

      bankName: '',
      bankAgency: '',
      bankAccount: '',
      bankPix: '',
    },
    mode: 'onChange',
  });

  const { reset } = methods;

  useEffect(() => {
    if (!employeeId) return;

    (async () => {
      const emp = await getEmployee(employeeId);
      if (!emp) return;

      reset({
        name: emp.name,
        email: emp.email,
        isActive: emp.status === 'active',
        cpf: emp.cpf,
        birthDate: emp.birthDate,

        department: emp.department,
        role: emp.role,
        admissionDate: emp.admissionDate,
        employmentType: emp.employmentType,
        workRegime: emp.workRegime,

        addressCep: emp.address.cep,
        addressStreet: emp.address.street,
        addressNumber: emp.address.number,
        addressComplement: emp.address.complement ?? '',
        addressNeighborhood: emp.address.neighborhood,
        addressCity: emp.address.city,
        addressState: emp.address.state,
        contactPhone: emp.address.contactPhone,

        bankName: emp.bank.bankCode,
        bankAgency: emp.bank.agency,
        bankAccount: emp.bank.account,
        bankPix: emp.bank.pixKey,
      });
    })();
  }, [employeeId, reset]);

  const navigate = useNavigate();
  const progressPercent = Math.round((activeStep / (steps.length - 1)) * 100);

  const handleNext = async () => {
    const fieldsToValidate: Record<number, (keyof EmployeeFormValues)[]> = {
      0: ['name', 'email', 'cpf', 'birthDate', 'isActive'],
      1: ['department', 'role', 'admissionDate', 'employmentType', 'workRegime'],
      2: [
        'addressCep',
        'addressStreet',
        'addressNumber',
        'addressNeighborhood',
        'addressCity',
        'addressState',
        'contactPhone',
      ],
      3: ['bankName', 'bankAgency', 'bankAccount', 'bankPix'],
    };

    const isValid = await methods.trigger(fieldsToValidate[activeStep] as any);
    if (!isValid) return;

    if (activeStep === steps.length - 1) {
      const values = methods.getValues();

      const payload: Omit<Employee, 'id'> = {
        name: values.name,
        email: values.email,
        cpf: values.cpf,
        birthDate: values.birthDate,
        status: (values.isActive ? 'active' : 'inactive') as EmployeeStatus,

        department: values.department,
        role: values.role,
        admissionDate: values.admissionDate,
        employmentType: values.employmentType,
        workRegime: values.workRegime,

        address: {
          cep: values.addressCep,
          street: values.addressStreet,
          number: values.addressNumber,
          complement: values.addressComplement,
          neighborhood: values.addressNeighborhood,
          city: values.addressCity,
          state: values.addressState,
          contactPhone: values.contactPhone,
        },

        bank: {
          bankCode: values.bankName,
          agency: values.bankAgency,
          account: values.bankAccount,
          pixKey: values.bankPix,
        },
      };

      try {
        if (isEdit && employeeId) {
          await updateEmployee(employeeId, payload);
        } else {
          await createEmployee(payload);
        }

        navigate('/colaboradores');
      } catch (err) {
        console.error('Erro ao salvar funcionário', err);
      }
    } else {
      setActiveStep(prev => prev + 1);
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

          <Typography sx={{ color: '#919EAB' }}> • </Typography>
          <Typography sx={{ fontWeight: 400, fontSize: 14, lineHeight: '22px', color: '#919EAB' }}>
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

          <Typography sx={{ fontWeight: 400, fontSize: 12, lineHeight: '18px', color: '#919EAB', minWidth: 40, textAlign: 'right' }}>
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
              '& .MuiStepLabel-label': { fontSize: 14, fontWeight: 500, color: '#637381' },
              '& .MuiStepLabel-label.Mui-active': { color: '#212B36', fontWeight: 600 },
              '& .MuiStepLabel-label.Mui-completed': { color: '#212B36', fontWeight: 600 },

              '& .MuiStepIcon-root': { color: '#DFE3E8' },
              '& .MuiStepIcon-root .MuiStepIcon-text': { fill: '#637381', fontWeight: 600 },
              '& .MuiStepIcon-root.Mui-active': { color: '#22C55E' },
              '& .MuiStepIcon-root.Mui-active .MuiStepIcon-text': { fill: '#FFFFFF' },
              '& .MuiStepIcon-root.Mui-completed': { color: '#22C55E' },
              '& .MuiStepIcon-root.Mui-completed .MuiStepIcon-text': { fill: '#FFFFFF' },
              '& .MuiStep-root': { padding: '6px 0' },
              '& .MuiStepConnector-line': { borderColor: '#DFE3E8', borderLeftWidth: 3, minHeight: 64 },
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
          {activeStep === 2 && <AddressContactStep />}
          {activeStep === 3 && <BankingStep />}

          <Box mt={4} display="flex" justifyContent="space-between">
            <Button
              onClick={handleBack}
              sx={{ textTransform: 'none', fontWeight: 600, fontSize: 14, color: '#637381' }}
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
                '&:hover': { backgroundColor: '#16A34A', boxShadow: 'none' },
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
