import { useState } from "react";
import { PlusIcon, PencilIcon, TrashIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

const mockSupervisors = [
  { id: 1, firstName: "Dr.", lastName: "López", profession: "Ingeniero", email: "lopez@example.com", phone: "25412345" },
  { id: 2, firstName: "Ing.", lastName: "Rodríguez", profession: "Especialista", email: "rodriguez@example.com", phone: "78945612" },
];

export const Supervisor = () => {
  const [supervisors, setSupervisors] = useState(mockSupervisors);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ firstName: "", lastName: "", profession: "", email: "", phone: "" });

  const handleAdd = () => {
    setEditingId(null);
    setFormData({ firstName: "", lastName: "", profession: "", email: "", phone: "" });
    setShowModal(true);
  };

  const handleEdit = (supervisor) => {
    setEditingId(supervisor.id);
    setFormData(supervisor);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (confirm("¿Está seguro de que desea eliminar este supervisor?")) {
      setSupervisors(supervisors.filter(s => s.id !== id));
    }
  };

  const handleSave = () => {
    if (editingId) {
      setSupervisors(supervisors.map(s => s.id === editingId ? { ...formData, id: editingId } : s));
    } else {
      setSupervisors([...supervisors, { ...formData, id: Date.now() }]);
    }
    setShowModal(false);
  };

  return (
    <section className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#2C1506]">Supervisores</h1>
          <p className="text-sm text-[#2C1506]/80 mt-1">Gestión de supervisores de prácticas</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-[#C00000] text-white px-4 py-2 rounded-lg hover:bg-[#A00000] transition"
        >
          <PlusIcon className="w-5 h-5" />
          Nuevo Supervisor
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-[#FFF8F0] border-b border-[#C00000]/20">
            <tr>
              <th className="px-6 py-3 text-left font-semibold text-[#2C1506]">Nombre</th>
              <th className="px-6 py-3 text-left font-semibold text-[#2C1506]">Profesión</th>
              <th className="px-6 py-3 text-left font-semibold text-[#2C1506]">Email</th>
              <th className="px-6 py-3 text-left font-semibold text-[#2C1506]">Teléfono</th>
              <th className="px-6 py-3 text-center font-semibold text-[#2C1506]">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {supervisors.map((supervisor) => (
              <tr key={supervisor.id} className="border-b border-[#C00000]/10 hover:bg-[#FFF8F0]/50 transition">
                <td className="px-6 py-4 text-[#2C1506] font-medium">{supervisor.firstName} {supervisor.lastName}</td>
                <td className="px-6 py-4 text-[#2C1506]/80">{supervisor.profession}</td>
                <td className="px-6 py-4 text-[#2C1506]/80">{supervisor.email}</td>
                <td className="px-6 py-4 text-[#2C1506]/80">{supervisor.phone}</td>
                <td className="px-6 py-4 flex justify-center gap-2">
                  <button
                    onClick={() => handleEdit(supervisor)}
                    className="p-2 text-[#C00000] hover:bg-[#C00000]/10 rounded transition"
                  >
                    <PencilIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(supervisor.id)}
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
              {editingId ? "Editar Supervisor" : "Nuevo Supervisor"}
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Título/Nombre"
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
                placeholder="Profesión"
                value={formData.profession}
                onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                className="w-full px-3 py-2 border border-[#C00000]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C00000]"
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-[#C00000]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C00000]"
              />
              <input
                type="text"
                placeholder="Teléfono"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
