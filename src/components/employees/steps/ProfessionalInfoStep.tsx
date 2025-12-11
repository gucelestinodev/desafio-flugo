import { Controller, useFormContext } from 'react-hook-form';
import { TextField, Box, Typography } from '@mui/material';
import type { EmployeeFormValues } from '../employeeSchema';

const inputSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: 2,
    '& fieldset': {
      borderColor: '#263238',
      borderWidth: '1px',
    },
    '&:hover fieldset': {
      borderColor: '#1BB55C',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#1BB55C',
      borderWidth: '2px',
    },
  },
  '& .MuiInputLabel-root': {
    color: '#637381',
    fontFamily: 'Public Sans, system-ui',
    fontSize: 14,
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#1BB55C',
  },
};

export default function ProfessionalInfoStep() {
  const { control } = useFormContext<EmployeeFormValues>();

  return (
    <Box>
      <Typography
        mb={3}
        sx={{
          fontWeight: 700,
          fontSize: 24,
          lineHeight: '28px',
          color: '#637381'
        }}
      >
        Informações Profissionais
      </Typography>

      <Controller
        name="department"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Departamento"
            fullWidth
            margin="normal"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            sx={inputSx}
          />
        )}
      />

      <Controller
        name="role"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Cargo"
            fullWidth
            margin="normal"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            sx={inputSx}
          />
        )}
      />
    </Box>
  );
}
