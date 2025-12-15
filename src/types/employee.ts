export type EmployeeStatus = 'active' | 'inactive';

export interface Employee {
  id: string;

  name: string;
  email: string;
  cpf: string;
  birthDate: string;
  phone: string;
  status: EmployeeStatus;
  isActive?: boolean;

  department: string;
  role: string;
  admissionDate: string;
  employmentType: string;
  workRegime: string;

  address: {
    cep: string;
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    contactPhone: string;
  };

  bank: {
    bankCode: string;
    agency: string;
    account: string;
    pixKey: string;
  };
}
