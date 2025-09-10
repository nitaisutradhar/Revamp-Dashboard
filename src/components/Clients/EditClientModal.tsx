"use client";

import api from "@/app/lib/api/api";
import { Client } from "@/app/types/client";
import { useState } from "react";

export default function EditClientModal({
  client,
  onClose,
  reload,
}: {
  client: Client;
  onClose: () => void;
  reload: () => void;
}) {
  const [form, setForm] = useState(client);

  const handleSubmit = async () => {
    try {
      await api.patch(`/api/v1/clients/${client._id}`, form);
      reload();
      onClose();
    } catch (err) {
      console.error("Failed to update client", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-96 space-y-3">
        <h2 className="text-xl font-semibold mb-4">Edit Client</h2>
        <input
          className="border p-2 w-full mb-2"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="border p-2 w-full mb-2"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          className="border p-2 w-full mb-2"
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
        />
        <div className="flex justify-end gap-2 mt-3">
          <button className="px-4 py-2 border rounded cursor-pointer" onClick={onClose}>
            Cancel
          </button>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer"
            onClick={handleSubmit}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
