import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useCompanyStore } from "../users/store/companyStore.js"; 
import { Spinner } from "@material-tailwind/react";
import { showSuccess, showError } from "../../shared/utils/toast.js";

export const CompanyModal = ({ isOpen, onClose, company }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // ✅ Accedemos directamente a las acciones del Store
  const { createCompany, updateCompany, loading } = useCompanyStore();

  // 🔹 Cargar datos de la empresa al editar
  useEffect(() => {
    if (isOpen) {
      if (company) {
        reset({
          nombreEmpresa: company.nombreEmpresa,
          direccion: company.direccion,
          telefono: company.telefono,
          correo: company.correo,
          encargado: company.encargado,
        });
      } else {
        reset({
          nombreEmpresa: "",
          direccion: "",
          telefono: "",
          correo: "",
          encargado: "",
        });
      }
    }
  }, [isOpen, company, reset]);

  // 🔹 Lógica de guardado directamente usando el Store
  const onSubmit = async (data) => {
    try {
      if (company) {
        // Modo Edición
        await updateCompany(company._id, data);
        showSuccess("Empresa actualizada correctamente");
      } else {
        // Modo Creación
        await createCompany(data);
        showSuccess("Empresa registrada correctamente");
      }

      reset();
      onClose();
    } catch (error) {
      // El error ya viene formateado desde el store o capturamos el mensaje
      showError(error.message || "Error al procesar la solicitud");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-3 sm:px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg md:max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">

        {/* HEADER */}
        <div
          className="p-4 sm:p-5 text-white sticky top-0 z-10"
          style={{
            background: "linear-gradient(90deg, var(--main-blue) 0%, #1956a3 100%)",
          }}
        >
          <h2 className="text-xl sm:text-2xl font-bold">
            {company ? "Editar Empresa" : "Nueva Empresa"}
          </h2>
          <p className="text-xs sm:text-sm opacity-80">
            Gestiona la información legal y de contacto de la empresa
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-4 sm:p-6 space-y-5 overflow-y-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Nombre Empresa */}
            <div className="flex flex-col md:col-span-2">
              <label className="text-sm font-semibold">Nombre de la Empresa</label>
              <input
                type="text"
                placeholder="Ej. Restaurante Sabores S.A."
                {...register("nombreEmpresa", {
                  required: "El nombre de la empresa es obligatorio",
                  maxLength: { value: 255, message: "Máximo 255 caracteres" }
                })}
                className="input border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-main-blue outline-none"
              />
              {errors.nombreEmpresa && (
                <p className="text-red-500 text-xs mt-1">{errors.nombreEmpresa.message}</p>
              )}
            </div>

            {/* Encargado */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold">Encargado / Gerente</label>
              <input
                type="text"
                placeholder="Nombre del responsable"
                {...register("encargado", {
                  required: "El encargado es obligatorio",
                })}
                className="input border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-main-blue outline-none"
              />
              {errors.encargado && (
                <p className="text-red-500 text-xs mt-1">{errors.encargado.message}</p>
              )}
            </div>

            {/* Teléfono */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold">Teléfono de Contacto</label>
              <input
                type="tel"
                placeholder="Ej. +502 1234 5678"
                {...register("telefono", {
                  maxLength: { value: 20, message: "Máximo 20 caracteres" }
                })}
                className="input border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-main-blue outline-none"
              />
              {errors.telefono && (
                <p className="text-red-500 text-xs mt-1">{errors.telefono.message}</p>
              )}
            </div>

            {/* Correo Electrónico */}
            <div className="flex flex-col md:col-span-2">
              <label className="text-sm font-semibold">Correo Electrónico</label>
              <input
                type="email"
                placeholder="contacto@empresa.com"
                {...register("correo", {
                  required: "El correo es obligatorio",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Correo inválido"
                  }
                })}
                className="input border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-main-blue outline-none"
              />
              {errors.correo && (
                <p className="text-red-500 text-xs mt-1">{errors.correo.message}</p>
              )}
            </div>

            {/* Dirección */}
            <div className="flex flex-col md:col-span-2">
              <label className="text-sm font-semibold">Dirección Física</label>
              <textarea
                placeholder="Dirección completa de la sede"
                {...register("direccion", {
                  required: "La dirección es obligatoria",
                })}
                className="input border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-main-blue outline-none min-h-[80px]"
              />
              {errors.direccion && (
                <p className="text-red-500 text-xs mt-1">{errors.direccion.message}</p>
              )}
            </div>

          </div>

          {/* BOTONES */}
          <div className="flex gap-3 pt-4 border-t justify-end">
            <button
              type="button"
              disabled={loading}
              onClick={() => {
                reset();
                onClose();
              }}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 bg-main-blue hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center min-w-[140px] shadow-md"
            >
              {loading ? (
                <Spinner className="h-4 w-4" />
              ) : company ? (
                "Guardar cambios"
              ) : (
                "Registrar Empresa"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};