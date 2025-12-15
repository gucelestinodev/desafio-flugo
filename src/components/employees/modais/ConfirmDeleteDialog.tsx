import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from '@mui/material';

type ConfirmDeleteDialogProps = {
  open: boolean;
  employeeName?: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function ConfirmDeleteDialog({
  open,
  employeeName,
  onCancel,
  onConfirm,
}: ConfirmDeleteDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      maxWidth="xs"
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
        }}
      >
        Excluir colaborador
      </DialogTitle>

      <DialogContent dividers>
        <Typography
          sx={{
            fontFamily: 'Public Sans, system-ui',
            fontSize: 14,
            color: '#4B5563',
          }}
        >
          Tem certeza que deseja excluir{' '}
          <Box component="span" sx={{ fontWeight: 600 }}>
            {employeeName ?? 'este colaborador'}
          </Box>
          ? Essa ação não pode ser desfeita.
        </Typography>
      </DialogContent>

      <DialogActions sx={{ p: 2.5 }}>
        <Button
          onClick={onCancel}
          sx={{
            textTransform: 'none',
            fontFamily: 'Public Sans, system-ui',
            fontWeight: 600,
            fontSize: 14,
            color: '#6B7280',
          }}
        >
          Cancelar
        </Button>

        <Button
          onClick={onConfirm}
          variant="contained"
          sx={{
            textTransform: 'none',
            fontFamily: 'Public Sans, system-ui',
            fontWeight: 700,
            fontSize: 14,
            borderRadius: 2,
            px: 3,
            backgroundColor: '#DC2626',
            boxShadow: 'none',
            '&:hover': {
              backgroundColor: '#B91C1C',
              boxShadow: 'none',
            },
          }}
        >
          Excluir
        </Button>
      </DialogActions>
    </Dialog>
  );
}
