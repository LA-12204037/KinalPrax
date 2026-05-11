import { useState } from "react";
import { PlusIcon, PencilIcon, TrashIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

const mockUsers = [
  { id: 1, firstName: "Admin", lastName: "Sistema", email: "admin@example.com", role: "ADMIN", status: "Activo" },
  { id: 2, firstName: "Juan", lastName: "Usuario", email: "user@example.com", role: "USER", status: "Activo" },
];

export const User = () => {
  const [users, setUsers] = useState(mockUsers);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", role: "USER", status: "Activo" });

  const handleAdd = () => {
    setEditingId(null);
    setFormData({ firstName: "", lastName: "", email: "", role: "USER", status: "Activo" });
    setShowModal(true);
  };

  const handleEdit = (user) => {
    setEditingId(user.id);
    setFormData(user);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (confirm("¿Está seguro de que desea eliminar este usuario?")) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const handleSave = () => {
    if (editingId) {
      setUsers(users.map(u => u.id === editingId ? { ...formData, id: editingId } : u));
    } else {
      setUsers([...users, { ...formData, id: Date.now() }]);
    }
    setShowModal(false);
  };

  return (
    <section className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#2C1506]">Usuarios</h1>
          <p className="text-sm text-[#2C1506]/80 mt-1">Gestión de usuarios del sistema</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-[#C00000] text-white px-4 py-2 rounded-lg hover:bg-[#A00000] transition"
        >
          <PlusIcon className="w-5 h-5" />
          Nuevo Usuario
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-[#FFF8F0] border-b border-[#C00000]/20">
            <tr>
              <th className="px-6 py-3 text-left font-semibold text-[#2C1506]">Nombre</th>
              <th className="px-6 py-3 text-left font-semibold text-[#2C1506]">Email</th>
              <th className="px-6 py-3 text-left font-semibold text-[#2C1506]">Rol</th>
              <th className="px-6 py-3 text-left font-semibold text-[#2C1506]">Estado</th>
              <th className="px-6 py-3 text-center font-semibold text-[#2C1506]">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-[#C00000]/10 hover:bg-[#FFF8F0]/50 transition">
                <td className="px-6 py-4 text-[#2C1506] font-medium">{user.firstName} {user.lastName}</td>
                <td className="px-6 py-4 text-[#2C1506]/80">{user.email}</td>
                <td className="px-6 py-4"><span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold">{user.role}</span></td>
                <td className="px-6 py-4"><span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold">{user.status}</span></td>
                <td className="px-6 py-4 flex justify-center gap-2">
                  <button
                    onClick={() => handleEdit(user)}
                    className="p-2 text-[#C00000] hover:bg-[#C00000]/10 rounded transition"
                  >
                    <PencilIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
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
              {editingId ? "Editar Usuario" : "Nuevo Usuario"}
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
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-[#C00000]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C00000]"
              />
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-3 py-2 border border-[#C00000]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C00000]"
              >
                <option value="USER">Usuario</option>
                <option value="ADMIN">Administrador</option>
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
