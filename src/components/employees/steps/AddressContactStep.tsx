import { Controller, useFormContext } from 'react-hook-form';
import { TextField, Box, Typography, Grid } from '@mui/material';
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

export default function AddressContactStep() {
    const { control } = useFormContext<EmployeeFormValues>();

    return (
        <Box>
            <Typography mb={3} sx={{ fontWeight: 700, fontSize: 24, lineHeight: '28px', color: '#637381' }}>
                Endereço e Contato
            </Typography>

            <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 4 }}>
                    <Controller
                        name="addressCep"
                        control={control}
                        render={({ field, fieldState }) => (
                            <TextField {...field} label="CEP *" fullWidth error={!!fieldState.error} helperText={fieldState.error?.message} sx={inputSx} />
                        )}
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 8 }}>
                    <Controller
                        name="addressStreet"
                        control={control}
                        render={({ field, fieldState }) => (
                            <TextField {...field} label="Rua *" fullWidth error={!!fieldState.error} helperText={fieldState.error?.message} sx={inputSx} />
                        )}
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 2 }}>
                    <Controller
                        name="addressNumber"
                        control={control}
                        render={({ field, fieldState }) => (
                            <TextField {...field} label="Número *" fullWidth error={!!fieldState.error} helperText={fieldState.error?.message} sx={inputSx} />
                        )}
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 4 }}>
                    <Controller
                        name="addressNeighborhood"
                        control={control}
                        render={({ field, fieldState }) => (
                            <TextField {...field} label="Bairro *" fullWidth error={!!fieldState.error} helperText={fieldState.error?.message} sx={inputSx} />
                        )}
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 5 }}>
                    <Controller
                        name="addressCity"
                        control={control}
                        render={({ field, fieldState }) => (
                            <TextField {...field} label="Cidade *" fullWidth error={!!fieldState.error} helperText={fieldState.error?.message} sx={inputSx} />
                        )}
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 1 }}>
                    <Controller
                        name="addressState"
                        control={control}
                        render={({ field, fieldState }) => (
                            <TextField {...field} label="UF *" placeholder="UF" fullWidth error={!!fieldState.error} helperText={fieldState.error?.message} sx={inputSx} />
                        )}
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 8 }}>
                    <Controller
                        name="addressComplement"
                        control={control}
                        render={({ field, fieldState }) => (
                            <TextField {...field} label="Complemento" fullWidth error={!!fieldState.error} helperText={fieldState.error?.message} sx={inputSx} />
                        )}
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 4 }}>
                    <Controller
                        name="contactPhone"
                        control={control}
                        render={({ field, fieldState }) => (
                            <TextField {...field} label="Telefone (Contato) *" placeholder="(99) 99999-9999" fullWidth error={!!fieldState.error} helperText={fieldState.error?.message} sx={inputSx} />
                        )}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}
