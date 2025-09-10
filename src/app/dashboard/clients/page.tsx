"use client";

import { useEffect, useState } from "react";
import api from "@/app/lib/api/api";
import ClientTable from "@/components/Clients/ClientTable";
import { Client } from "@/app/types/client";

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchClients = async () => {
    try {
      const res = await api.get("/api/v1/clients");
      setClients(res.data.data.clients);
    } catch (err) {
      console.error("Failed to load clients", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  if (loading) return <p>Loading clients...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Clients</h1>
      <ClientTable clients={clients} reload={fetchClients} />
    </div>
  );
}
