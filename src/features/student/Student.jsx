import { useState } from "react";
import { PlusIcon, PencilIcon, TrashIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

const mockStudents = [
  { id: 1, firstName: "Juan", lastName: "Pérez", carnet: "E-2024-001", email: "juan.perez@example.com", status: "Activo" },
  { id: 2, firstName: "María", lastName: "García", carnet: "E-2024-002", email: "maria.garcia@example.com", status: "Activo" },
];

export const Student = () => {
  const [students, setStudents] = useState(mockStudents);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ firstName: "", lastName: "", carnet: "", email: "", status: "Activo" });

  const handleAdd = () => {
    setEditingId(null);
    setFormData({ firstName: "", lastName: "", carnet: "", email: "", status: "Activo" });
    setShowModal(true);
  };

  const handleEdit = (student) => {
    setEditingId(student.id);
    setFormData(student);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (confirm("¿Está seguro de que desea eliminar este estudiante?")) {
      setStudents(students.filter(s => s.id !== id));
    }
  };

  const handleSave = () => {
    if (editingId) {
      setStudents(students.map(s => s.id === editingId ? { ...formData, id: editingId } : s));
    } else {
      setStudents([...students, { ...formData, id: Date.now() }]);
    }
    setShowModal(false);
  };

  return (
    <section className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#2C1506]">Estudiantes</h1>
          <p className="text-sm text-[#2C1506]/80 mt-1">Gestión de estudiantes en prácticas</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-[#C00000] text-white px-4 py-2 rounded-lg hover:bg-[#A00000] transition"
        >
          <PlusIcon className="w-5 h-5" />
          Nuevo Estudiante
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-[#FFF8F0] border-b border-[#C00000]/20">
            <tr>
              <th className="px-6 py-3 text-left font-semibold text-[#2C1506]">Nombre</th>
              <th className="px-6 py-3 text-left font-semibold text-[#2C1506]">Carné</th>
              <th className="px-6 py-3 text-left font-semibold text-[#2C1506]">Email</th>
              <th className="px-6 py-3 text-left font-semibold text-[#2C1506]">Estado</th>
              <th className="px-6 py-3 text-center font-semibold text-[#2C1506]">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border-b border-[#C00000]/10 hover:bg-[#FFF8F0]/50 transition">
                <td className="px-6 py-4 text-[#2C1506] font-medium">{student.firstName} {student.lastName}</td>
                <td className="px-6 py-4 text-[#2C1506]/80">{student.carnet}</td>
                <td className="px-6 py-4 text-[#2C1506]/80">{student.email}</td>
                <td className="px-6 py-4"><span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold">{student.status}</span></td>
                <td className="px-6 py-4 flex justify-center gap-2">
                  <button
                    onClick={() => handleEdit(student)}
                    className="p-2 text-[#C00000] hover:bg-[#C00000]/10 rounded transition"
                  >
                    <PencilIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(student.id)}
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
              {editingId ? "Editar Estudiante" : "Nuevo Estudiante"}
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Nombre"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full px-3 py-2 border border-[#C00000]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C00000]"
              />
              <input
                type="text"
                placeholder="Apellido"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full px-3 py-2 border border-[#C00000]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C00000]"
              />
              <input
                type="text"
                placeholder="Carné"
                value={formData.carnet}
                onChange={(e) => setFormData({ ...formData, carnet: e.target.value })}
                className="w-full px-3 py-2 border border-[#C00000]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C00000]"
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
