import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { listEmployees, deleteEmployee } from '../services/employees';
import type { Employee } from '../types/employee';
import EmployeeDetailDialog from '../components/employees/modais/EmployeeDetailDialog';
import ConfirmDeleteDialog from '../components/employees/modais/ConfirmDeleteDialog';

export default function EmployeesListPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selected, setSelected] = useState<Employee | null>(null);
  const [openDetail, setOpenDetail] = useState(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    listEmployees().then(setEmployees);
  }, []);

  const handleRowClick = (emp: Employee) => {
    setSelected(emp);
    setOpenDetail(true);
  };

  const handleCloseDetail = () => {
    setOpenDetail(false);
  };

  const handleEdit = () => {
    if (!selected) return;
    setOpenDetail(false);
    navigate(`/colaboradores/${selected.id}`);
  };

  const handleAskDelete = () => {
    setOpenDetail(false);
    setOpenConfirmDelete(true);
  };

  const handleCancelDelete = () => {
    setOpenConfirmDelete(false);
  };

  const handleConfirmDelete = async () => {
    if (!selected) return;
    await deleteEmployee(selected.id);
    setEmployees(prev => prev.filter(e => e.id !== selected.id));
    setOpenConfirmDelete(false);
    setSelected(null);
  };

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: 24,
            lineHeight: '36px',
            letterSpacing: 0,
          }}
        >
          Colaboradores
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/colaboradores/novo')}
          sx={{
            borderRadius: 2,
            gap: 1,
            px: '16px',
            py: '10px',
            textTransform: 'none',
            fontWeight: 700,
            fontSize: 15,
            backgroundColor: '#22C55E',
            boxShadow: 'none',
            '&:hover': {
              backgroundColor: '#16A34A',
              boxShadow: 'none',
            },
          }}
        >
          Novo Colaborador
        </Button>
      </Box>
      <Paper
        elevation={0}
        sx={{
          mt: 1,
          borderRadius: 3,
          overflow: 'hidden',
          backgroundColor: '#FFFFFF',
          boxShadow: '0px 6px 14px rgba(15, 23, 42, 0.06)',
        }}
      >
        <Table>
          <TableHead
            sx={{
              '& .MuiTableCell-head': {
                backgroundColor: '#F4F6F8',
                fontWeight: 600,
                fontSize: 14,
                lineHeight: '24px',
                color: '#637381',
              },
            }}
          >
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Departamento</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody
            sx={{
              '& .MuiTableCell-root': {
                fontWeight: 400,
                fontSize: 14,
                lineHeight: '22px',
              },
            }}
          >
            {employees.map(emp => (
              <TableRow
                key={emp.id}
                hover
                onClick={() => handleRowClick(emp)}
                sx={{ cursor: 'pointer' }}
              >
                <TableCell>{emp.name}</TableCell>
                <TableCell>{emp.email}</TableCell>
                <TableCell>{emp.department}</TableCell>
                <TableCell>
                  <Chip
                    label={emp.status === 'active' ? 'Ativo' : 'Inativo'}
                    size="small"
                    sx={{
                      fontSize: 12,
                      fontWeight: 700,
                      borderRadius: 2,
                      backgroundColor:
                        emp.status === 'active'
                          ? '#22C55E29'
                          : '#FF563029',
                      color:
                        emp.status === 'active' ? '#118D57' : '#B71D18',
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}

            {employees.length === 0 && (
              <TableRow>
                <TableCell colSpan={4}>
                  <Typography>
                    Nenhum colaborador cadastrado ainda.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>

      <EmployeeDetailDialog
        open={openDetail}
        employee={selected}
        onClose={handleCloseDetail}
        onEdit={handleEdit}
        onAskDelete={handleAskDelete}
      />

      <ConfirmDeleteDialog
        open={openConfirmDelete}
        employeeName={selected?.name}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </Box>
  );
}
