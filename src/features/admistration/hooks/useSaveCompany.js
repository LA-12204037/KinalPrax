import { useCompanyStore } from "../../users/store/companyStore"; // Tu Store de empresas

export const useSaveCompany = () => {
  const createCompany = useCompanyStore((state) => state.createCompany);
  const updateCompany = useCompanyStore((state) => state.updateCompany);

  const saveCompany = async (data, companyId = null) => {

    // 1. Construir el payload final estructurado según tu modelo de Mongoose
    // Normalizamos nombres de campos que puedan venir del formulario en inglés o español
    const payload = {
      nombreEmpresa: (data.nombreEmpresa || data.companyName || "").trim(),
      direccion: (data.direccion || data.address || "").trim(),
      telefono: (data.telefono || data.phone || "").trim(),
      correo: (data.correo || data.email || "").trim().toLowerCase(), // Forzamos minúsculas como en el schema
      encargado: (data.encargado || data.manager || "").trim(),
    };

    // 2. Ejecutar la acción correspondiente según si hay un ID (Editar) o no (Crear)
    if (companyId) {
      await updateCompany(companyId, payload);
    } else {
      await createCompany(payload);
    }
  };

  return { saveCompany };
};