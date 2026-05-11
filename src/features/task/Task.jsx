import { useState } from "react";
import { PlusIcon, PencilIcon, TrashIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

const mockTasks = [
  { id: 1, title: "Crear sistema de login", assignedTo: "Juan Pérez", dueDate: "2026-05-15", priority: "Alta", status: "En Progreso" },
  { id: 2, title: "Documentar API", assignedTo: "María García", dueDate: "2026-05-20", priority: "Media", status: "Por Hacer" },
];

export const Task = () => {
  const [tasks, setTasks] = useState(mockTasks);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ title: "", assignedTo: "", dueDate: "", priority: "Media", status: "Por Hacer" });

  const handleAdd = () => {
    setEditingId(null);
    setFormData({ title: "", assignedTo: "", dueDate: "", priority: "Media", status: "Por Hacer" });
    setShowModal(true);
  };

  const handleEdit = (task) => {
    setEditingId(task.id);
    setFormData(task);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (confirm("¿Está seguro de que desea eliminar esta tarea?")) {
      setTasks(tasks.filter(t => t.id !== id));
    }
  };

  const handleSave = () => {
    if (editingId) {
      setTasks(tasks.map(t => t.id === editingId ? { ...formData, id: editingId } : t));
    } else {
      setTasks([...tasks, { ...formData, id: Date.now() }]);
    }
    setShowModal(false);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Alta": return "bg-red-100 text-red-700";
      case "Media": return "bg-yellow-100 text-yellow-700";
      case "Baja": return "bg-green-100 text-green-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Por Hacer": return "bg-gray-100 text-gray-700";
      case "En Progreso": return "bg-blue-100 text-blue-700";
      case "Completada": return "bg-green-100 text-green-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <section className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#2C1506]">Tareas</h1>
          <p className="text-sm text-[#2C1506]/80 mt-1">Gestión de tareas de prácticas</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-[#C00000] text-white px-4 py-2 rounded-lg hover:bg-[#A00000] transition"
        >
          <PlusIcon className="w-5 h-5" />
          Nueva Tarea
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-[#FFF8F0] border-b border-[#C00000]/20">
            <tr>
              <th className="px-6 py-3 text-left font-semibold text-[#2C1506]">Título</th>
              <th className="px-6 py-3 text-left font-semibold text-[#2C1506]">Asignado a</th>
              <th className="px-6 py-3 text-left font-semibold text-[#2C1506]">Fecha Límite</th>
              <th className="px-6 py-3 text-left font-semibold text-[#2C1506]">Prioridad</th>
              <th className="px-6 py-3 text-left font-semibold text-[#2C1506]">Estado</th>
              <th className="px-6 py-3 text-center font-semibold text-[#2C1506]">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id} className="border-b border-[#C00000]/10 hover:bg-[#FFF8F0]/50 transition">
                <td className="px-6 py-4 text-[#2C1506] font-medium">{task.title}</td>
                <td className="px-6 py-4 text-[#2C1506]/80">{task.assignedTo}</td>
                <td className="px-6 py-4 text-[#2C1506]/80">{task.dueDate}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(task.status)}`}>
                    {task.status}
                  </span>
                </td>
                <td className="px-6 py-4 flex justify-center gap-2">
                  <button
                    onClick={() => handleEdit(task)}
                    className="p-2 text-[#C00000] hover:bg-[#C00000]/10 rounded transition"
                  >
                    <PencilIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(task.id)}
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
              {editingId ? "Editar Tarea" : "Nueva Tarea"}
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
                placeholder="Asignado a"
                value={formData.assignedTo}
                onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
                className="w-full px-3 py-2 border border-[#C00000]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C00000]"
              />
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="w-full px-3 py-2 border border-[#C00000]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C00000]"
              />
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full px-3 py-2 border border-[#C00000]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C00000]"
              >
                <option value="Baja">Baja</option>
                <option value="Media">Media</option>
                <option value="Alta">Alta</option>
              </select>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 border border-[#C00000]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C00000]"
              >
                <option value="Por Hacer">Por Hacer</option>
                <option value="En Progreso">En Progreso</option>
                <option value="Completada">Completada</option>
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