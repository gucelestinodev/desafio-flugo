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
import { listEmployees } from '../services/employees';
import type { Employee } from '../types/employee';

export default function EmployeesListPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    listEmployees().then(setEmployees);
  }, []);

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
                fontFamily: 'Public Sans, system-ui',
                fontWeight: 600,
                fontSize: 12,
                lineHeight: '18px',
                color: '#6B7280',
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

          <TableBody>
            {employees.map((emp) => (
              <TableRow key={emp.id}>
                <TableCell>{emp.name}</TableCell>
                <TableCell>{emp.email}</TableCell>
                <TableCell>{emp.department}</TableCell>
                <TableCell>
                  <Chip
                    label={emp.status === 'active' ? 'Ativo' : 'Inativo'}
                    size="small"
                    sx={{
                      fontFamily: 'Public Sans, system-ui',
                      fontSize: 12,
                      fontWeight: 500,
                      borderRadius: 999,
                      px: 1.5,
                      backgroundColor:
                        emp.status === 'active' ? '#DCFCE7' : '#FEE2E2',
                      color:
                        emp.status === 'active' ? '#16A34A' : '#DC2626',
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
    </Box>
  );
}
