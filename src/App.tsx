import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import EmployeesListPage from './pages/EmployeesListPage';
import NewEmployeePage from './pages/NewEmployeePage';
import AppLayout from './components/layout/AppLayout';

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/colaboradores" />} />
          <Route path="/colaboradores" element={<EmployeesListPage />} />
          <Route path="/colaboradores/novo" element={<NewEmployeePage />} />
          <Route path="/colaboradores/:id" element={<NewEmployeePage />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}
