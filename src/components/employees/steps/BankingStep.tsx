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
    '& .MuiInputLabel-root': { color: '#637381', fontFamily: 'Public Sans, system-ui', fontSize: 14 },
    '& .MuiInputLabel-root.Mui-focused': { color: '#1BB55C' },
};

const banks = [
    { value: '001', label: 'Banco do Brasil' },
    { value: '033', label: 'Santander' },
    { value: '104', label: 'Caixa' },
    { value: '237', label: 'Bradesco' },
    { value: '341', label: 'Itaú' },
    { value: '260', label: 'Nubank' },
    { value: '077', label: 'Inter' },
];

export default function BankingStep() {
    const { control } = useFormContext<EmployeeFormValues>();

    return (
        <Box>
            <Typography mb={3} sx={{ fontWeight: 700, fontSize: 24, lineHeight: '28px', color: '#637381' }}>
                Dados Bancários
            </Typography>

            <Controller
                name="bankName"
                control={control}
                render={({ field, fieldState }) => (
                    <TextField {...field} select fullWidth margin="normal" label="Banco *" error={!!fieldState.error} helperText={fieldState.error?.message} sx={inputSx}>
                        {banks.map((b) => (
                            <MenuItem key={b.value} value={b.value}>
                                {b.value} — {b.label}
                            </MenuItem>
                        ))}
                    </TextField>
                )}
            />

            <Controller
                name="bankAgency"
                control={control}
                render={({ field, fieldState }) => (
                    <TextField {...field} label="Agência *" fullWidth margin="normal" error={!!fieldState.error} helperText={fieldState.error?.message} sx={inputSx} />
                )}
            />

            <Controller
                name="bankAccount"
                control={control}
                render={({ field, fieldState }) => (
                    <TextField {...field} label="Conta *" fullWidth margin="normal" error={!!fieldState.error} helperText={fieldState.error?.message} sx={inputSx} />
                )}
            />

            <Controller
                name="bankPix"
                control={control}
                render={({ field, fieldState }) => (
                    <TextField {...field} label="Chave Pix *" placeholder="CPF, e-mail, telefone ou aleatória" fullWidth margin="normal" error={!!fieldState.error} helperText={fieldState.error?.message} sx={inputSx} />
                )}
            />
        </Box>
    );
}
