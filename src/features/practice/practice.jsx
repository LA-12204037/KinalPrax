import { useState } from "react";
import { PlusIcon, PencilIcon, TrashIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

const mockPractices = [
  { id: 1, title: "Práctica en Desarrollo Web", company: "Tech Solutions", startDate: "2026-04-01", endDate: "2026-06-30", status: "En Curso" },
  { id: 2, title: "Práctica en Sistemas", company: "Constructora Moderna", startDate: "2026-03-15", endDate: "2026-05-15", status: "Completada" },
];

export const Practice = () => {
  const [practices, setPractices] = useState(mockPractices);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ title: "", company: "", startDate: "", endDate: "", status: "En Curso" });

  const handleAdd = () => {
    setEditingId(null);
    setFormData({ title: "", company: "", startDate: "", endDate: "", status: "En Curso" });
    setShowModal(true);
  };

  const handleEdit = (practice) => {
    setEditingId(practice.id);
    setFormData(practice);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (confirm("¿Está seguro de que desea eliminar esta práctica?")) {
      setPractices(practices.filter(p => p.id !== id));
    }
  };

  const handleSave = () => {
    if (editingId) {
      setPractices(practices.map(p => p.id === editingId ? { ...formData, id: editingId } : p));
    } else {
      setPractices([...practices, { ...formData, id: Date.now() }]);
    }
    setShowModal(false);
  };

  return (
    <section className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#2C1506]">Prácticas</h1>
          <p className="text-sm text-[#2C1506]/80 mt-1">Gestión de prácticas profesionales</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-[#C00000] text-white px-4 py-2 rounded-lg hover:bg-[#A00000] transition"
        >
          <PlusIcon className="w-5 h-5" />
          Nueva Práctica
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-[#FFF8F0] border-b border-[#C00000]/20">
            <tr>
              <th className="px-6 py-3 text-left font-semibold text-[#2C1506]">Título</th>
              <th className="px-6 py-3 text-left font-semibold text-[#2C1506]">Empresa</th>
              <th className="px-6 py-3 text-left font-semibold text-[#2C1506]">Inicio</th>
              <th className="px-6 py-3 text-left font-semibold text-[#2C1506]">Fin</th>
              <th className="px-6 py-3 text-left font-semibold text-[#2C1506]">Estado</th>
              <th className="px-6 py-3 text-center font-semibold text-[#2C1506]">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {practices.map((practice) => (
              <tr key={practice.id} className="border-b border-[#C00000]/10 hover:bg-[#FFF8F0]/50 transition">
                <td className="px-6 py-4 text-[#2C1506] font-medium">{practice.title}</td>
                <td className="px-6 py-4 text-[#2C1506]/80">{practice.company}</td>
                <td className="px-6 py-4 text-[#2C1506]/80">{practice.startDate}</td>
                <td className="px-6 py-4 text-[#2C1506]/80">{practice.endDate}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    practice.status === "En Curso" ? "bg-blue-100 text-blue-700" : 
                    practice.status === "Completada" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                  }`}>
                    {practice.status}
                  </span>
                </td>
                <td className="px-6 py-4 flex justify-center gap-2">
                  <button
                    onClick={() => handleEdit(practice)}
                    className="p-2 text-[#C00000] hover:bg-[#C00000]/10 rounded transition"
                  >
                    <PencilIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(practice.id)}
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
              {editingId ? "Editar Práctica" : "Nueva Práctica"}
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Título"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-[#C00000]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C00000]"
              />
              <input
                type="text"
                placeholder="Empresa"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-3 py-2 border border-[#C00000]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C00000]"
              />
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-3 py-2 border border-[#C00000]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C00000]"
              />
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full px-3 py-2 border border-[#C00000]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C00000]"
              />
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 border border-[#C00000]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C00000]"
              >
                <option value="En Curso">En Curso</option>
                <option value="Completada">Completada</option>
                <option value="Pausada">Pausada</option>
              </select>
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