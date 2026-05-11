import { useState } from "react";
import { PlusIcon, PencilIcon, TrashIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

const mockReviews = [
  { id: 1, student: "Juan Pérez", reviewer: "Dr. López", date: "2026-04-20", rating: 5, comments: "Excelente desempeño" },
  { id: 2, student: "María García", reviewer: "Ing. Rodríguez", date: "2026-04-22", rating: 4, comments: "Buen trabajo general" },
];

export const Review = () => {
  const [reviews, setReviews] = useState(mockReviews);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ student: "", reviewer: "", date: "", rating: 5, comments: "" });

  const handleAdd = () => {
    setEditingId(null);
    setFormData({ student: "", reviewer: "", date: "", rating: 5, comments: "" });
    setShowModal(true);
  };

  const handleEdit = (review) => {
    setEditingId(review.id);
    setFormData(review);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (confirm("¿Está seguro de que desea eliminar esta revisión?")) {
      setReviews(reviews.filter(r => r.id !== id));
    }
  };

  const handleSave = () => {
    if (editingId) {
      setReviews(reviews.map(r => r.id === editingId ? { ...formData, id: editingId } : r));
    } else {
      setReviews([...reviews, { ...formData, id: Date.now() }]);
    }
    setShowModal(false);
  };

  const renderStars = (rating) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  return (
    <section className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#2C1506]">Revisiones</h1>
          <p className="text-sm text-[#2C1506]/80 mt-1">Evaluaciones y revisiones de prácticas</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-[#C00000] text-white px-4 py-2 rounded-lg hover:bg-[#A00000] transition"
        >
          <PlusIcon className="w-5 h-5" />
          Nueva Revisión
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-[#FFF8F0] border-b border-[#C00000]/20">
            <tr>
              <th className="px-6 py-3 text-left font-semibold text-[#2C1506]">Estudiante</th>
              <th className="px-6 py-3 text-left font-semibold text-[#2C1506]">Evaluador</th>
              <th className="px-6 py-3 text-left font-semibold text-[#2C1506]">Fecha</th>
              <th className="px-6 py-3 text-left font-semibold text-[#2C1506]">Calificación</th>
              <th className="px-6 py-3 text-left font-semibold text-[#2C1506]">Comentarios</th>
              <th className="px-6 py-3 text-center font-semibold text-[#2C1506]">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review.id} className="border-b border-[#C00000]/10 hover:bg-[#FFF8F0]/50 transition">
                <td className="px-6 py-4 text-[#2C1506] font-medium">{review.student}</td>
                <td className="px-6 py-4 text-[#2C1506]/80">{review.reviewer}</td>
                <td className="px-6 py-4 text-[#2C1506]/80">{review.date}</td>
                <td className="px-6 py-4 text-yellow-500 text-lg">{renderStars(review.rating)}</td>
                <td className="px-6 py-4 text-[#2C1506]/80 max-w-xs truncate">{review.comments}</td>
                <td className="px-6 py-4 flex justify-center gap-2">
                  <button
                    onClick={() => handleEdit(review)}
                    className="p-2 text-[#C00000] hover:bg-[#C00000]/10 rounded transition"
                  >
                    <PencilIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(review.id)}
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
              {editingId ? "Editar Revisión" : "Nueva Revisión"}
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
                type="text"
                placeholder="Evaluador"
                value={formData.reviewer}
                onChange={(e) => setFormData({ ...formData, reviewer: e.target.value })}
                className="w-full px-3 py-2 border border-[#C00000]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C00000]"
              />
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2 border border-[#C00000]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C00000]"
              />
              <select
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-[#C00000]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C00000]"
              >
                <option value={5}>5 estrellas</option>
                <option value={4}>4 estrellas</option>
                <option value={3}>3 estrellas</option>
                <option value={2}>2 estrellas</option>
                <option value={1}>1 estrella</option>
              </select>
              <textarea
                placeholder="Comentarios"
                value={formData.comments}
                onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
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