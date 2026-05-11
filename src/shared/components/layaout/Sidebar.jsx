import { useNavigate, useLocation } from "react-router-dom";
import {
  BuildingOffice2Icon,
  DocumentTextIcon,
  AcademicCapIcon,
  ClipboardDocumentListIcon,
  ClockIcon,
  UserIcon,
  ShieldCheckIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'

export const Sidebar = () => {
    const navigate = useNavigate();
  const location = useLocation();
  const items = [
   { label: "Dashboard", path: "/dashboard", icon: BuildingOffice2Icon },
    { label: "Compañia", path: "/dashboard/company", icon: BuildingOffice2Icon },
    { label: "Evidecia", path: "/dashboard/evidence", icon: DocumentTextIcon },
    { label: "Instituto", path: "/dashboard/institud", icon: AcademicCapIcon },
    { label: "Practica", path: "/dashboard/practice", icon: ClipboardDocumentListIcon },
    { label: "Reporte de horas", path: "/dashboard/reposteHoursmodel", icon: ClockIcon },
    { label: "Reseña", path: "/dashboard/review", icon: ClockIcon },
    { label: "Estudiante", path: "/dashboard/student", icon: UserIcon },
    { label: "supervisor", path: "/dashboard/supervisor", icon: ShieldCheckIcon },
    { label: "task", path: "/dashboard/task", icon: ShieldCheckIcon },
    { label: "Usuario", path: "/dashboard/user", icon: UsersIcon },
  ];

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    navigate("/");
  };

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <aside className="w-60 bg-[#FFF8F0]/95 backdrop-blur-md border-r border-[#C00000]/20 min-h-[calc(100vh-4rem)] p-4 shadow-sm flex flex-col">
      <ul className="space-y-2 flex-1">
        {items.map((item, index) => (
          <li key={index}>
            <button
              type="button"
              onClick={() => navigate(item.path)}
              className={`
                w-full text-left flex items-center gap-3 px-4 py-2 rounded-lg font-medium text-black
                transition-all duration-150 ease-out
                hover:bg-[#C00000]/10 hover:scale-[1.03]
                active:scale-95 active:bg-[#C00000]/20
                ${isActive(item.path) ? "bg-[#C00000]/15 border-l-4 border-[#C00000]" : ""}
              `}
            >
              <span className="text-sm">
                {(() => {
                  const Icon = item.icon;
                  return <Icon className="w-5 h-5" />;
                })()}
              </span>
              <span>{item.label}</span>
            </button>
          </li>
        ))}
      </ul>

      <button
        onClick={handleLogout}
        className="
          w-full flex items-center gap-3 px-4 py-2 rounded-lg font-medium text-white
          bg-[#C00000]
          transition-all duration-150 ease-out
          hover:bg-[#A00000]
          hover:scale-[1.02]
          active:scale-95
          cursor-pointer
          mt-4 border-t border-[#C00000]/30 pt-4
        "
      >
        <span className="text-lg">🚪</span>
        <span>Cerrar Sesión</span>
      </button>
    </aside>
  );
};