import { Navigate, Routes, Route } from "react-router-dom";
import { AuthPage } from "../../features/auth/pages/AuthPage";
import { DashboardPage } from "../layaouts/DashboardPage";

const RequireAdmin = ({ children }) => {
  const role = localStorage.getItem("userRole") ?? "";
  const isAdmin = role.toUpperCase().includes("ADMIN");

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export const AppRoutes = () => {
    return(
        <Routes>
            {/* PUBLIC */}
            <Route path="/" element={<AuthPage />} />
                <Route path="/login" element={<Navigate to="/" replace />} /> // aqui me da error

            {/* PROTEGIDO POR ROLE */}
            <Route path="/dashboard/*" element={ <RequireAdmin>
            <DashboardPage />
          </RequireAdmin>} />

                {/* Aqui van las rutas internas del dashboard */}



         <Route path="*" element={<h1>Página no encontrada</h1>} />
        </Routes>
    );
};