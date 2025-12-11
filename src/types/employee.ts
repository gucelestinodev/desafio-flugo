export type EmployeeStatus = 'active' | 'inactive';

export interface Employee {
  id?: string;
  name: string;
  email: string;
  department: string;
  role: string;
  status: EmployeeStatus;
}
