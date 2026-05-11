import { Navigate, Routes, Route } from "react-router-dom";
import { AuthPage } from "../../features/auth/pages/AuthPage";
import { DashboardPage } from "../layaouts/DashboardPage";
import { Company } from "../../features/company/Company.jsx";
import { Evidence } from "../../features/evidence/Evidence.jsx";
import { Institud } from "../../features/institud/Institud.jsx";
import { Practice } from "../../features/practice/Practice.jsx";
import { ReposteHours } from "../../features/reposteHoursmodel/ReposteHours.jsx";
import { Review } from "../../features/review/Review.jsx";
import { Student } from "../../features/student/Student.jsx";
import { Supervisor } from "../../features/supervisor/Supervisor.jsx";
import { Task } from "../../features/task/Task.jsx";
import { User } from "../../features/user/User.jsx";

const RequireAdmin = ({ children }) => {
  const role = localStorage.getItem("userRole") ?? "";
  const isAdmin = role.toUpperCase().includes("ADMIN");

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export const AppRoutes = () => {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/" element={<AuthPage />} />
      <Route path="/login" element={<Navigate to="/" replace />} />

      {/* PROTEGIDO POR ROLE CON RUTAS ANIDADAS */}
      <Route 
        path="/dashboard" 
        element={
          <RequireAdmin>
            <DashboardPage />
          </RequireAdmin>
        }
      >
        {/* Rutas internas del dashboard (se renderizan en el <Outlet />) */}
        <Route path="company" element={<Company />} />
        <Route path="evidence" element={<Evidence />} />
        <Route path="institud" element={<Institud />} />
        <Route path="practice" element={<Practice />} />
        <Route path="hours" element={<ReposteHours />} />
        <Route path="review" element={<Review />} />
        <Route path="student" element={<Student />} />
        <Route path="supervisor" element={<Supervisor />} />
        <Route path="task" element={<Task />} />
        <Route path="user" element={<User />} />
        
        {/* Redirección opcional: al entrar a /dashboard va a /dashboard/user */}
        <Route index element={<Navigate to="user" replace />} />
      </Route>

      <Route path="*" element={<h1>Página no encontrada</h1>} />
    </Routes>
  );
};