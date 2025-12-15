import { z } from 'zod';

export const employeeSchema = z.object({
  name: z.string().min(1, 'Nome obrigatório'),
  email: z.string().email('E-mail inválido'),
  isActive: z.boolean(),
  cpf: z.string().min(11, 'CPF obrigatório'),
  birthDate: z.string().min(1, 'Data de nascimento obrigatória'),

  department: z.string().min(1, 'Departamento obrigatório'),
  role: z.string().min(1, 'Cargo obrigatório'),
  admissionDate: z.string().min(1, 'Data de admissão obrigatória'),
  employmentType: z.string().min(1, 'Tipo de vínculo obrigatório'),
  workRegime: z.string().min(1, 'Regime de trabalho obrigatório'),

  addressCep: z.string().min(1, 'CEP obrigatório'),
  addressStreet: z.string().min(1, 'Rua obrigatória'),
  addressNumber: z.string().min(1, 'Número obrigatório'),
  addressComplement: z.string().optional(),
  addressNeighborhood: z.string().min(1, 'Bairro obrigatório'),
  addressCity: z.string().min(1, 'Cidade obrigatória'),
  addressState: z.string().min(1, 'Estado obrigatório'),
  contactPhone: z.string().min(8, 'Telefone de contato obrigatório'),

  bankName: z.string().min(1, 'Banco obrigatório'),
  bankAgency: z.string().min(1, 'Agência obrigatória'),
  bankAccount: z.string().min(1, 'Conta obrigatória'),
  bankPix: z.string().min(1, 'Chave Pix obrigatória'),
});

export type EmployeeFormValues = z.infer<typeof employeeSchema>;
