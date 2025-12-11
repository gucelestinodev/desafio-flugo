import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import type { Employee } from '../types/employee';

const employeesCol = collection(db, 'employees');

export async function listEmployees(): Promise<Employee[]> {
  const snapshot = await getDocs(employeesCol);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as Omit<Employee, 'id'>),
  }));
}

export async function createEmployee(
  employee: Omit<Employee, 'id'>
): Promise<void> {
  await addDoc(employeesCol, employee);
}
