import { useState } from "react";
import { PlusIcon, PencilIcon, TrashIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

const mockEvidences = [
  { id: 1, title: "Certificado de Participación", type: "Certificado", date: "2026-04-15", description: "Participación en taller de desarrollo" },
  { id: 2, title: "Proyecto Finalizado", type: "Proyecto", date: "2026-04-20", description: "Sistema de gestión de prácticas" },
];

export const Evidence = () => {
  const [evidences, setEvidences] = useState(mockEvidences);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ title: "", type: "", date: "", description: "" });

  const handleAdd = () => {
    setEditingId(null);
    setFormData({ title: "", type: "", date: "", description: "" });
    setShowModal(true);
  };

  const handleEdit = (evidence) => {
    setEditingId(evidence.id);
    setFormData(evidence);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (confirm("¿Está seguro de que desea eliminar esta evidencia?")) {
      setEvidences(evidences.filter(e => e.id !== id));
    }
  };

  const handleSave = () => {
    if (editingId) {
      setEvidences(evidences.map(e => e.id === editingId ? { ...formData, id: editingId } : e));
    } else {
      setEvidences([...evidences, { ...formData, id: Date.now() }]);
    }
    setShowModal(false);
  };

  return (
    <section className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#2C1506]">Evidencias</h1>
          <p className="text-sm text-[#2C1506]/80 mt-1">Gestión de documentación y evidencias</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-[#C00000] text-white px-4 py-2 rounded-lg hover:bg-[#A00000] transition"
        >
          <PlusIcon className="w-5 h-5" />
          Nueva Evidencia
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-[#FFF8F0] border-b border-[#C00000]/20">
            <tr>
              <th className="px-6 py-3 text-left font-semibold text-[#2C1506]">Título</th>
              <th className="px-6 py-3 text-left font-semibold text-[#2C1506]">Tipo</th>
              <th className="px-6 py-3 text-left font-semibold text-[#2C1506]">Fecha</th>
              <th className="px-6 py-3 text-left font-semibold text-[#2C1506]">Descripción</th>
              <th className="px-6 py-3 text-center font-semibold text-[#2C1506]">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {evidences.map((evidence) => (
              <tr key={evidence.id} className="border-b border-[#C00000]/10 hover:bg-[#FFF8F0]/50 transition">
                <td className="px-6 py-4 text-[#2C1506] font-medium">{evidence.title}</td>
                <td className="px-6 py-4 text-[#2C1506]/80">{evidence.type}</td>
                <td className="px-6 py-4 text-[#2C1506]/80">{evidence.date}</td>
                <td className="px-6 py-4 text-[#2C1506]/80">{evidence.description}</td>
                <td className="px-6 py-4 flex justify-center gap-2">
                  <button
                    onClick={() => handleEdit(evidence)}
                    className="p-2 text-[#C00000] hover:bg-[#C00000]/10 rounded transition"
                  >
                    <PencilIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(evidence.id)}
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
              {editingId ? "Editar Evidencia" : "Nueva Evidencia"}
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Título"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-[#C00000]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C00000]"
              />
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3 py-2 border border-[#C00000]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C00000]"
              >
                <option value="">Seleccionar tipo</option>
                <option value="Certificado">Certificado</option>
                <option value="Proyecto">Proyecto</option>
                <option value="Documento">Documento</option>
              </select>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2 border border-[#C00000]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C00000]"
              />
              <textarea
                placeholder="Descripción"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-[#C00000]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C00000] h-24"
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
