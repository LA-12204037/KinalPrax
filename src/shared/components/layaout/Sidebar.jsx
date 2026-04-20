import {
  Building2,
  FileText,
  School,
  ClipboardList,
  Clock,
  User,
  Users,
  ShieldCheck
} from "lucide-react";

export const Sidebar = () => {
  const items = [
    { label: "Compañia", icon: Building2 },
    { label: "Evidecia", icon: FileText },
    { label: "Instituto", icon: School },
    { label: "Practica", icon: ClipboardList },
    { label: "Reporte de horas", icon: Clock },
    { label: "Estudiante", icon: User },
    { label: "supervisor", icon: ShieldCheck },
    { label: "Usuario", icon: Users },
  ];

  return (
    <aside className="w-60 min-h-[calc(100vh-4rem)] p-4 
                     bg-[#041F3D]/95 backdrop-blur-md 
                     border-r border-[#18A7A1]/20">

      <ul className="space-y-2">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <li key={item.label}>
              <div className="
                flex items-center gap-3
                px-4 py-2 rounded-lg font-medium cursor-pointer
                text-[#E6E6E6] 
                hover:bg-[#0B3A66] 
                hover:text-[#18A7A1]
                transition-all duration-200
              ">
                {/* 🔥 ICONO */}
                <Icon size={18} />

                {/* TEXTO */}
                <span className="capitalize">
                  {item.label}
                </span>
              </div>
            </li>
          );
        })}
      </ul>

    </aside>
  );
};