import { Controller, useFormContext } from 'react-hook-form';
import { TextField, Box, Typography, MenuItem } from '@mui/material';
import type { EmployeeFormValues } from '../employeeSchema';

const inputSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: 2,
    '& fieldset': { borderColor: '#263238', borderWidth: '1px' },
    '&:hover fieldset': { borderColor: '#1BB55C' },
    '&.Mui-focused fieldset': { borderColor: '#1BB55C', borderWidth: '2px' },
  },
  '& .MuiInputLabel-root': {
    color: '#637381',
    fontFamily: 'Public Sans, system-ui',
    fontSize: 14,
  },
  '& .MuiInputLabel-root.Mui-focused': { color: '#1BB55C' },
};

const departmentOptions = [
  { value: 'design', label: 'Design' },
  { value: 'ti', label: 'Informática' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'produto', label: 'Produto' },
];

const employmentTypeOptions = [
  { value: 'clt', label: 'CLT' },
  { value: 'pj', label: 'PJ' },
  { value: 'estagio', label: 'Estágio' },
  { value: 'temporario', label: 'Temporário' },
  { value: 'freelancer', label: 'Freelancer' },
  { value: 'aprendiz', label: 'Aprendiz' },
  { value: 'terceirizado', label: 'Terceirizado' },
];

const workRegimeOptions = [
  { value: 'presencial', label: 'Presencial' },
  { value: 'hibrido', label: 'Híbrido' },
  { value: 'remoto', label: 'Remoto' },
];

export default function ProfessionalInfoStep() {
  const { control } = useFormContext<EmployeeFormValues>();

  return (
    <Box>
      <Typography mb={3} sx={{ fontWeight: 700, fontSize: 24, lineHeight: '28px', color: '#637381' }}>
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
            label="Departamento"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            sx={inputSx}
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
          <TextField {...field} label="Cargo" fullWidth margin="normal" error={!!fieldState.error} helperText={fieldState.error?.message} sx={inputSx} />
        )}
      />

      <Controller
        name="admissionDate"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            type="date"
            label="Data de Admissão *"
            fullWidth
            margin="normal"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            sx={inputSx}
            InputLabelProps={{ shrink: true }}
          />
        )}
      />

      <Controller
        name="employmentType"
        control={control}
        render={({ field, fieldState }) => (
          <TextField {...field} select fullWidth margin="normal" label="Tipo de Vínculo *" error={!!fieldState.error} helperText={fieldState.error?.message} sx={inputSx}>
            {employmentTypeOptions.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </TextField>
        )}
      />

      <Controller
        name="workRegime"
        control={control}
        render={({ field, fieldState }) => (
          <TextField {...field} select fullWidth margin="normal" label="Regime de Trabalho *" error={!!fieldState.error} helperText={fieldState.error?.message} sx={inputSx}>
            {workRegimeOptions.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
    </Box>
  );
}
