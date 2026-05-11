import { useState } from "react";
import { PlusIcon, PencilIcon, TrashIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

const mockHours = [
  { id: 1, student: "Juan Pérez", date: "2026-05-01", hours: 8, description: "Desarrollo de funcionalidades" },
  { id: 2, student: "María García", date: "2026-05-02", hours: 6, description: "Testing y documentación" },
];

export const ReposteHours = () => {
  const [hours, setHours] = useState(mockHours);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ student: "", date: "", hours: "", description: "" });

  const handleAdd = () => {
    setEditingId(null);
    setFormData({ student: "", date: "", hours: "", description: "" });
    setShowModal(true);
  };

  const handleEdit = (hour) => {
    setEditingId(hour.id);
    setFormData(hour);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (confirm("¿Está seguro de que desea eliminar este reporte?")) {
      setHours(hours.filter(h => h.id !== id));
    }
  };

  const handleSave = () => {
    if (editingId) {
      setHours(hours.map(h => h.id === editingId ? { ...formData, id: editingId } : h));
    } else {
      setHours([...hours, { ...formData, id: Date.now() }]);
    }
    setShowModal(false);
  };

  const totalHours = hours.reduce((sum, h) => sum + (parseInt(h.hours) || 0), 0);

  return (
    <section className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#2C1506]">Reporte de Horas</h1>
          <p className="text-sm text-[#2C1506]/80 mt-1">Total de horas registradas: **{totalHours} horas**</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-[#C00000] text-white px-4 py-2 rounded-lg hover:bg-[#A00000] transition"
        >
          <PlusIcon className="w-5 h-5" />
          Nuevo Reporte
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-[#FFF8F0] border-b border-[#C00000]/20">
            <tr>
              <th className="px-6 py-3 text-left font-semibold text-[#2C1506]">Estudiante</th>
              <th className="px-6 py-3 text-left font-semibold text-[#2C1506]">Fecha</th>
              <th className="px-6 py-3 text-left font-semibold text-[#2C1506]">Horas</th>
              <th className="px-6 py-3 text-left font-semibold text-[#2C1506]">Descripción</th>
              <th className="px-6 py-3 text-center font-semibold text-[#2C1506]">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {hours.map((hour) => (
              <tr key={hour.id} className="border-b border-[#C00000]/10 hover:bg-[#FFF8F0]/50 transition">
                <td className="px-6 py-4 text-[#2C1506] font-medium">{hour.student}</td>
                <td className="px-6 py-4 text-[#2C1506]/80">{hour.date}</td>
                <td className="px-6 py-4 text-[#2C1506]/80 font-semibold">{hour.hours} h</td>
                <td className="px-6 py-4 text-[#2C1506]/80">{hour.description}</td>
                <td className="px-6 py-4 flex justify-center gap-2">
                  <button
                    onClick={() => handleEdit(hour)}
                    className="p-2 text-[#C00000] hover:bg-[#C00000]/10 rounded transition"
                  >
                    <PencilIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(hour.id)}
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
              {editingId ? "Editar Reporte" : "Nuevo Reporte"}
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Nombre del estudiante"
                value={formData.student}
                onChange={(e) => setFormData({ ...formData, student: e.target.value })}
                className="w-full px-3 py-2 border border-[#C00000]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C00000]"
              />
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2 border border-[#C00000]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C00000]"
              />
              <input
                type="number"
                placeholder="Horas"
                value={formData.hours}
                onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                className="w-full px-3 py-2 border border-[#C00000]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C00000]"
              />
              <textarea
                placeholder="Descripción del trabajo"
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