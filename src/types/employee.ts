export type EmployeeStatus = 'active' | 'inactive';

export type EmployeeAddress = {
  cep: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  contactPhone: string;
};

export type EmployeeBank = {
  bankCode: string;
  agency: string;
  account: string;
  pixKey: string;
};

export type Employee = {
  id: string;
  name: string;
  email: string;
  cpf: string;
  birthDate: string;
  status: EmployeeStatus;

  department: string;
  role: string;
  admissionDate: string;
  employmentType: string;
  workRegime: string;

  address: EmployeeAddress;
  bank: EmployeeBank;
};
