"use client";

import api from "@/app/lib/api/api";
import { useState } from "react";

export default function AddClientModal({
  onClose,
  reload,
}: {
  onClose: () => void;
  reload: () => void;
}) {
  const [form, setForm] = useState({ name: "", email: "", company: "" });

  const handleSubmit = async () => {
    try {
      await api.post("/api/v1/clients", form);
      reload();
      onClose();
    } catch (err) {
      console.error("Failed to add client", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-96">
        <h2 className="text-xl font-semibold mb-4">Add Client</h2>
        <input
          className="border p-2 w-full mb-2"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="border p-2 w-full mb-2"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          className="border p-2 w-full mb-2"
          placeholder="Company"
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
        />
        <div className="flex justify-end gap-2">
          <button className="px-4 py-2 border rounded" onClick={onClose}>
            Cancel
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
