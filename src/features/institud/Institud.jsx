import { useState } from "react";
import { PlusIcon, PencilIcon, TrashIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

const mockInstitutions = [
  { id: 1, name: "Universidad Estatal", acronym: "UES", type: "Pública", city: "San Salvador", address: "Calle Principal 123" },
  { id: 2, name: "Universidad Privada", acronym: "UP", type: "Privada", city: "San Salvador", address: "Avenida Central 456" },
];

export const Institud = () => {
  const [institutions, setInstitutions] = useState(mockInstitutions);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: "", acronym: "", type: "", city: "", address: "" });

  const handleAdd = () => {
    setEditingId(null);
    setFormData({ name: "", acronym: "", type: "", city: "", address: "" });
    setShowModal(true);
  };

  const handleEdit = (institution) => {
    setEditingId(institution.id);
    setFormData(institution);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (confirm("¿Está seguro de que desea eliminar esta institución?")) {
      setInstitutions(institutions.filter(i => i.id !== id));
    }
  };

  const handleSave = () => {
    if (editingId) {
      setInstitutions(institutions.map(i => i.id === editingId ? { ...formData, id: editingId } : i));
    } else {
      setInstitutions([...institutions, { ...formData, id: Date.now() }]);
    }
    setShowModal(false);
  };

  return (
    <section className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#2C1506]">Instituciones</h1>
          <p className="text-sm text-[#2C1506]/80 mt-1">Gestión de instituciones educativas</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-[#C00000] text-white px-4 py-2 rounded-lg hover:bg-[#A00000] transition"
        >
          <PlusIcon className="w-5 h-5" />
          Nueva Institución
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-[#FFF8F0] border-b border-[#C00000]/20">
            <tr>
              <th className="px-6 py-3 text-left font-semibold text-[#2C1506]">Nombre</th>
              <th className="px-6 py-3 text-left font-semibold text-[#2C1506]">Acrónimo</th>
              <th className="px-6 py-3 text-left font-semibold text-[#2C1506]">Tipo</th>
              <th className="px-6 py-3 text-left font-semibold text-[#2C1506]">Ciudad</th>
              <th className="px-6 py-3 text-left font-semibold text-[#2C1506]">Dirección</th>
              <th className="px-6 py-3 text-center font-semibold text-[#2C1506]">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {institutions.map((institution) => (
              <tr key={institution.id} className="border-b border-[#C00000]/10 hover:bg-[#FFF8F0]/50 transition">
                <td className="px-6 py-4 text-[#2C1506] font-medium">{institution.name}</td>
                <td className="px-6 py-4 text-[#2C1506]/80">{institution.acronym}</td>
                <td className="px-6 py-4 text-[#2C1506]/80">{institution.type}</td>
                <td className="px-6 py-4 text-[#2C1506]/80">{institution.city}</td>
                <td className="px-6 py-4 text-[#2C1506]/80">{institution.address}</td>
                <td className="px-6 py-4 flex justify-center gap-2">
                  <button
                    onClick={() => handleEdit(institution)}
                    className="p-2 text-[#C00000] hover:bg-[#C00000]/10 rounded transition"
                  >
                    <PencilIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(institution.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h2 className="text-xl font-bold text-[#2C1506] mb-4">
              {editingId ? "Editar Institución" : "Nueva Institución"}
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Nombre"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-[#C00000]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C00000]"
              />
              <input
                type="text"
                placeholder="Acrónimo"
                value={formData.acronym}
                onChange={(e) => setFormData({ ...formData, acronym: e.target.value })}
                className="w-full px-3 py-2 border border-[#C00000]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C00000]"
              />
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3 py-2 border border-[#C00000]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C00000]"
              >
                <option value="">Seleccionar tipo</option>
                <option value="Pública">Pública</option>
                <option value="Privada">Privada</option>
              </select>
              <input
                type="text"
                placeholder="Ciudad"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-3 py-2 border border-[#C00000]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C00000]"
              />
              <input
                type="text"
                placeholder="Dirección"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3 py-2 border border-[#C00000]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C00000]"
              />
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSave}
                className="flex-1 flex items-center justify-center gap-2 bg-[#C00000] text-white py-2 rounded-lg hover:bg-[#A00000] transition"
              >
                <CheckIcon className="w-4 h-4" /> Guardar
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 flex items-center justify-center gap-2 bg-gray-300 text-[#2C1506] py-2 rounded-lg hover:bg-gray-400 transition"
              >
                <XMarkIcon className="w-4 h-4" /> Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};