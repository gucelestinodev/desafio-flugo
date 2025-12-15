import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import EmployeeFormWizard from '../components/employees/EmployeeFormWizard';

export default function NewEmployeePage() {
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;

  return (
    <Box>
      {isEdit &&
        <Typography
          mb={3}
          sx={{ fontWeight: 700, fontSize: 24, lineHeight: '28px', color: '#637381' }}
        >
          Editar Colaborador
        </Typography>
      }
      <EmployeeFormWizard employeeId={id} />
    </Box>
  );
}
