import { useEffect, useState } from "react";
import { useCompanyStore } from "../users/store/companyStore.js"; 
import { useUIStore } from "../auth/uiStore.js";
import { showError } from "../../shared/utils/toast.js";
import { Spinner } from "@material-tailwind/react";
import { CompanyModal } from "./CompanyModal";
import { showConfirmToast } from "../../features/auth/components/ConfirmModal";

export const Company = () => {
  const {
    companies = [],
    loading,
    error,
    getCompanies,
    deleteCompany // ✅ Función corregida
  } = useCompanyStore();

  const [openModal, setOpenModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  useEffect(() => {
    getCompanies();
  }, [getCompanies]);

  useEffect(() => {
    if (error) showError(error);
  }, [error]);

  if (loading && companies.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner className="h-10 w-10 text-blue-500" />
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-main-blue">Gestión de Empresas</h1>
          <p className="text-gray-500 text-sm">Administra sedes legales y contactos</p>
        </div>
        <button
          className="bg-main-blue px-4 py-2 rounded text-white hover:opacity-90 transition font-semibold shadow-md"
          onClick={() => { setSelectedCompany(null); setOpenModal(true); }}
        >
          + Nueva Empresa
        </button>
      </div>

      {/* GRID */}
      {companies.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
          <p className="text-gray-500">No hay empresas activas.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {companies.map((company) => (
            <div key={company._id} className="bg-white rounded-xl shadow-md p-5 border border-gray-100 flex flex-col justify-between">
              <div>
                <div className="flex justify-between mb-3">
                  <span className="px-3 py-1 text-xs rounded-full bg-blue-50 text-blue-700 font-semibold">
                    👤 {company.encargado}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-main-blue mb-2">{company.nombreEmpresa}</h2>
                <p className="text-sm text-gray-600 truncate">📧 {company.correo}</p>
                <p className="text-sm text-gray-600">📞 {company.telefono || "N/A"}</p>
              </div>

              <div className="flex gap-3 mt-6">
                <button 
                  className="flex-1 py-2 rounded bg-main-blue text-white text-sm"
                  onClick={() => { setSelectedCompany(company); setOpenModal(true); }}
                >
                  Editar
                </button>
                <button 
                  className="flex-1 py-2 rounded bg-red-600 text-white text-sm"
                  onClick={() =>
                    showConfirmToast({
                      title: "Desactivar empresa",
                      message: `¿Deseas desactivar ${company.nombreEmpresa}?`,
                      onConfirm: () => deleteCompany(company._id), // ✅ Llamada corregida
                    })
                  }
                >
                  Desactivar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <CompanyModal
        isOpen={openModal}
        onClose={() => { setOpenModal(false); setSelectedCompany(null); }}
        company={selectedCompany}
      />
    </div>
  );
};