import { z } from 'zod';

export const employeeSchema = z.object({
  name: z.string().min(1, 'Nome obrigatório'),
  email: z.string().email('E-mail inválido'),
  isActive: z.boolean(),
  department: z.string().min(1, 'Departamento obrigatório'),
  role: z.string().min(1, 'Cargo obrigatório'),
});

export type EmployeeFormValues = z.infer<typeof employeeSchema>;
