import { create } from "zustand";
import {
  getCompanies as getCompaniesRequest,
  createCompany as createCompanyRequest,
  updateCompany as updateCompanyRequest,
  deactivateCompany as deactivateCompanyRequest,
} from "../../../shared/api";

const getApiErrorMessage = (error, fallbackMessage) => {
  const data = error?.response?.data;
  if (typeof data?.message === "string" && data.message.trim()) {
    return data.message;
  }
  return fallbackMessage;
};

export const useCompanyStore = create((set, get) => ({
  companies: [],
  loading: false,
  error: null,

  // ✅ OBTENER EMPRESAS
  getCompanies: async () => {
    try {
      set({ loading: true, error: null });
      const response = await getCompaniesRequest();
      // Ajuste según si tu backend envuelve la data en .data o no
      const data = response.data?.data || response.data;
      set({ companies: data, loading: false });
    } catch (error) {
      set({ error: "Error al obtener empresas", loading: false });
    }
  },

  // ✅ CREAR
  createCompany: async (formData) => {
    try {
      set({ loading: true, error: null });
      await createCompanyRequest(formData);
      await get().getCompanies();
      set({ loading: false });
    } catch (error) {
      const message = getApiErrorMessage(error, "Error al crear empresa");
      set({ loading: false, error: message });
      throw new Error(message);
    }
  },

  // ✅ ACTUALIZAR
  updateCompany: async (id, formData) => {
    try {
      set({ loading: true, error: null });
      await updateCompanyRequest(id, formData);
      await get().getCompanies();
      set({ loading: false });
    } catch (error) {
      const message = getApiErrorMessage(error, "Error al actualizar empresa");
      set({ loading: false, error: message });
      throw new Error(message);
    }
  },

  // ✅ DESACTIVAR (Reemplaza al antiguo delete)
deleteCompany: async (id) => { // Renombrado de deactivateCompany a deleteCompany
    try {
      set({ loading: true, error: null });
      await deactivateCompanyRequest(id);
      set({
        companies: get().companies.filter((c) => c._id !== id),
        loading: false,
      });
    } catch (error) {
      const message = getApiErrorMessage(error, "Error al desactivar empresa");
      set({ loading: false, error: message });
      // Si lanzas el throw aquí, debes capturarlo en el componente
      throw error; 
    }
  },
}));