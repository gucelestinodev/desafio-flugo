import { Controller, useFormContext } from 'react-hook-form';
import { TextField, Box, Typography, MenuItem } from '@mui/material';
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

const departmentOptions = [
  { value: 'design', label: 'Design' },
  { value: 'ti', label: 'Informatica' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'produto', label: 'Produto' },
];

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
          color: '#637381',
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
            select
            fullWidth
            margin="normal"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            sx={inputSx}
            slotProps={{
              select: {
                displayEmpty: true,
                renderValue: (selected: unknown): React.ReactNode => {
                  if (!selected) {
                    return (
                      <span style={{ color: '#9CA3AF' }}>
                        Selecione um departamento
                      </span>
                    );
                  }
                  const option = departmentOptions.find(
                    (opt) => opt.value === selected,
                  );
                  return option?.label ?? (selected as string);
                },
              },
            }}
          >
            {departmentOptions.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </TextField>
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
