"use client";

import { useState } from "react";
import AddClientModal from "./AddClientModal";
import EditClientModal from "./EditClientModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { Client } from "@/app/types/client";
import Link from "next/link";

export default function ClientTable({
  clients,
  reload,
}: {
  clients: Client[];
  reload: () => void;
}) {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Clients</h1>
        <Link
          href="/dashboard/projects/new"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          + Add Client
        </Link>
      </div>

      <table className="w-full mt-4 border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Company</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client._id}>
              <td className="p-2 border">{client.name}</td>
              <td className="p-2 border">{client.email}</td>
              <td className="p-2 border">{client.company}</td>
              <td className="p-2 border flex gap-2 justify-center">
                <Link
                  href={`/dashboard/clients/${client._id}`}
                  className="bg-green-500 text-white px-3 py-1 rounded cursor-pointer"
                >
                  View
                </Link>
                <button
                  className="bg-yellow-500 text-white px-3 py-1 rounded cursor-pointer"
                  onClick={() => setSelectedClient(client)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer"
                  onClick={() => setDeleteId(client._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showAdd && <AddClientModal onClose={() => setShowAdd(false)} reload={reload} />}
      {selectedClient && (
        <EditClientModal
          client={selectedClient}
          onClose={() => setSelectedClient(null)}
          reload={reload}
        />
      )}
      {deleteId && (
        <ConfirmDeleteModal id={deleteId} onClose={() => setDeleteId(null)} reload={reload} />
      )}
    </div>
  );
}
