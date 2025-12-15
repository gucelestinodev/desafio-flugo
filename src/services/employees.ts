import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from './firebase';
import type { Employee } from '../types/employee';

const employeesCol = collection(db, 'employees');

export async function listEmployees(): Promise<Employee[]> {
  const snapshot = await getDocs(employeesCol);
  return snapshot.docs.map(docSnap => ({
    id: docSnap.id,
    ...(docSnap.data() as Omit<Employee, 'id'>),
  }));
}

export async function createEmployee(
  employee: Omit<Employee, 'id'>
): Promise<void> {
  await addDoc(employeesCol, employee);
}

export async function getEmployee(id: string): Promise<Employee | null> {
  const ref = doc(db, 'employees', id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { id: snap.id, ...(snap.data() as Omit<Employee, 'id'>) };
}

export async function updateEmployee(
  id: string,
  employee: Partial<Omit<Employee, 'id'>>
): Promise<void> {
  const ref = doc(db, 'employees', id);
  await updateDoc(ref, employee);
}

export async function deleteEmployee(id: string): Promise<void> {
  const ref = doc(db, 'employees', id);
  await deleteDoc(ref);
}
