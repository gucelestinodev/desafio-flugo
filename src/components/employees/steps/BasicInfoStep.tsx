import { Controller, useFormContext } from 'react-hook-form';
import { TextField, Switch, FormControlLabel, Box, Typography } from '@mui/material';
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

export default function BasicInfoStep() {
  const { control } = useFormContext<EmployeeFormValues>();

  return (
    <Box>
      <Typography mb={3} sx={{ fontFamily: 'Public Sans, system-ui', fontWeight: 700, fontSize: 24, lineHeight: '28px', color: '#637381' }}>
        Informações Básicas
      </Typography>

      <Controller
        name="name"
        control={control}
        render={({ field, fieldState }) => (
          <TextField {...field} label="Nome" fullWidth margin="normal" error={!!fieldState.error} helperText={fieldState.error?.message} sx={inputSx} />
        )}
      />

      <Controller
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <TextField {...field} label="E-mail" fullWidth margin="normal" error={!!fieldState.error} helperText={fieldState.error?.message} sx={inputSx} />
        )}
      />

      <Controller
        name="cpf"
        control={control}
        render={({ field, fieldState }) => (
          <TextField {...field} label="CPF *" placeholder="Somente números" fullWidth margin="normal" error={!!fieldState.error} helperText={fieldState.error?.message} sx={inputSx} />
        )}
      />

      <Controller
        name="birthDate"
        control={control}
        render={({ field, fieldState }) => (
          <TextField {...field} type="date" label="Data de Nascimento *" fullWidth margin="normal" error={!!fieldState.error} helperText={fieldState.error?.message} sx={inputSx} InputLabelProps={{ shrink: true }} />
        )}
      />

      <Controller
        name="phone"
        control={control}
        render={({ field, fieldState }) => (
          <TextField {...field} label="Telefone *" placeholder="(99) 99999-9999" fullWidth margin="normal" error={!!fieldState.error} helperText={fieldState.error?.message} sx={inputSx} />
        )}
      />

      <Controller
        name="isActive"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={
              <Switch
                {...field}
                checked={field.value}
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': { color: '#22C55E' },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#22C55E' },
                }}
              />
            }
            label="Ativar ao criar"
          />
        )}
      />
    </Box>
  );
}
