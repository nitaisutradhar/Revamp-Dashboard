"use client";

import api from "@/app/lib/api/api";

export default function ConfirmDeleteModal({
  id,
  onClose,
  reload,
}: {
  id: string;
  onClose: () => void;
  reload: () => void;
}) {
  const handleDelete = async () => {
    try {
      await api.delete(`/api/v1/clients/${id}`);
      reload();
      onClose();
    } catch (err) {
      console.error("Failed to delete client", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl">
        <h2 className="text-lg font-semibold mb-4">
          Are you sure you want to delete this client?
        </h2>
        <div className="flex justify-end gap-2">
          <button className="px-4 py-2 border rounded" onClick={onClose}>
            Cancel
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
