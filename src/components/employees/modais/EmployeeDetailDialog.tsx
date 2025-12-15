import {
  Box,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Divider,
} from '@mui/material';
import type { Employee } from '../../../types/employee';

type EmployeeDetailDialogProps = {
  open: boolean;
  employee: Employee | null;
  onClose: () => void;
  onEdit: () => void;
  onAskDelete: () => void;
};

export default function EmployeeDetailDialog({
  open,
  employee,
  onClose,
  onEdit,
  onAskDelete,
}: EmployeeDetailDialogProps) {
  if (!employee) return null;

  const isActive = employee.status === 'active';

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: '0px 10px 30px rgba(15, 23, 42, 0.18)',
        },
      }}
    >
      <DialogTitle
        sx={{
          fontFamily: 'Public Sans, system-ui',
          fontWeight: 700,
          fontSize: 18,
          color: '#111827',
          pb: 1,
        }}
      >
        Detalhes do colaborador
      </DialogTitle>

      <DialogContent
        dividers
        sx={{
          borderTop: '1px solid #F1F5F9',
          borderBottom: '1px solid #F1F5F9',
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Box>
            <Typography
              sx={{
                fontFamily: 'Public Sans, system-ui',
                fontWeight: 600,
                fontSize: 18,
                color: '#111827',
              }}
            >
              {employee.name}
            </Typography>
            <Typography
              sx={{
                fontFamily: 'Public Sans, system-ui',
                fontSize: 14,
                color: '#6B7280',
              }}
            >
              {employee.role || 'Cargo não informado'}
            </Typography>
          </Box>

          <Chip
            label={isActive ? 'Ativo' : 'Inativo'}
            sx={{
              fontSize: 12,
              fontWeight: 700,
              borderRadius: 2,
              backgroundColor: isActive ? '#22C55E29' : '#FF563029',
              color: isActive ? '#118D57' : '#B71D18',
            }}
          />
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
          <InfoItem label="E-mail" value={employee.email} />
          <InfoItem label="Departamento" value={employee.department} />
          <InfoItem label="CPF" value={employee.cpf} />
          <InfoItem label="Data de admissão" value={employee.admissionDate} />
          <InfoItem label="Tipo de vínculo" value={employee.employmentType} />
          <InfoItem label="Regime de trabalho" value={employee.workRegime} />
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography
          sx={{
            fontFamily: 'Public Sans, system-ui',
            fontWeight: 600,
            fontSize: 14,
            color: '#111827',
            mb: 1,
          }}
        >
          Endereço
        </Typography>

        <Typography
          sx={{
            fontFamily: 'Public Sans, system-ui',
            fontSize: 14,
            color: '#4B5563',
          }}
        >
          {employee.address.street}, {employee.address.number}
          {employee.address.complement && ` - ${employee.address.complement}`}
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Public Sans, system-ui',
            fontSize: 14,
            color: '#4B5563',
          }}
        >
          {employee.address.neighborhood} – {employee.address.city}/{employee.address.state}
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Public Sans, system-ui',
            fontSize: 14,
            color: '#6B7280',
            mt: 0.5,
          }}
        >
          CEP: {employee.address.cep}
        </Typography>
      </DialogContent>

      <DialogActions
        sx={{
          p: 2.5,
          gap: 1,
          justifyContent: 'space-between',
        }}
      >
        <Button
          onClick={onAskDelete}
          sx={{
            textTransform: 'none',
            fontFamily: 'Public Sans, system-ui',
            fontWeight: 600,
            fontSize: 14,
            color: '#B71D18',
          }}
        >
          Excluir
        </Button>

        <Box display="flex" gap={1}>
          <Button
            onClick={onClose}
            sx={{
              textTransform: 'none',
              fontFamily: 'Public Sans, system-ui',
              fontWeight: 600,
              fontSize: 14,
              color: '#6B7280',
            }}
          >
            Fechar
          </Button>

          <Button
            onClick={onEdit}
            variant="contained"
            sx={{
              textTransform: 'none',
              fontFamily: 'Public Sans, system-ui',
              fontWeight: 700,
              fontSize: 14,
              borderRadius: 2,
              px: 3,
              backgroundColor: '#22C55E',
              boxShadow: 'none',
              '&:hover': {
                backgroundColor: '#16A34A',
                boxShadow: 'none',
              },
            }}
          >
            Editar
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
}

type InfoItemProps = {
  label: string;
  value?: string;
};

function InfoItem({ label, value }: InfoItemProps) {
  return (
    <Box>
      <Typography
        sx={{
          fontFamily: 'Public Sans, system-ui',
          fontSize: 12,
          color: '#9CA3AF',
        }}
      >
        {label}
      </Typography>
      <Typography
        sx={{
          fontFamily: 'Public Sans, system-ui',
          fontSize: 14,
          color: '#111827',
        }}
      >
        {value || '—'}
      </Typography>
    </Box>
  );
}
