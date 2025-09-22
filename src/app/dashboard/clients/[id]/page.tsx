"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/app/lib/api/api";

interface Client {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  projects: string[];
  createdAt: string;
  updatedAt: string;
}

export default function ViewClientPage() {
  const { id } = useParams();
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const res = api.get(`/api/v1/clients/${id}`);
        setClient((await res).data.data.client);
      } catch (error) {
        console.error("Failed to fetch client", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchClient();
  }, [id]);

  if (loading) return <p className="p-4">Loading client...</p>;
  if (!client) return <p className="p-4">No client found.</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white shadow rounded-lg p-6 mt-6">
      <h1 className="text-2xl font-bold mb-4">{client.name}</h1>
      <p>
        <strong>Email:</strong> {client.email}
      </p>
      <p>
        <strong>Phone:</strong> {client.phone}
      </p>
      <p>
        <strong>Company:</strong> {client.company}
      </p>
      <p>
        <strong>Projects:</strong>{" "}
        {client.projects.length > 0 ? (
          client.projects.join(", ")
        ) : (
          <span className="text-gray-500">No projects</span>
        )}
      </p>
      <p className="text-sm text-gray-500 mt-4">
        Created: {new Date(client.createdAt).toLocaleString()}
      </p>
      <p className="text-sm text-gray-500">
        Updated: {new Date(client.updatedAt).toLocaleString()}
      </p>
    </div>
  );
}
