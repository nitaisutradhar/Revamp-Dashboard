"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { toast } from "react-toastify";
import api from "@/app/lib/api/api";
import { updateProject } from "@/app/lib/api/projects";

type Status = "pending" | "active" | "completed";

interface FormState {
  name: string;
  client: string;
  budget: string;
  startDate: string;
  endDate: string;
  status: Status;
}

export default function EditProjectPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [form, setForm] = useState<FormState>({
    name: "",
    client: "",
    budget: "",
    startDate: "",
    endDate: "",
    status: "pending",
  });
  const [loading, setLoading] = useState(true);

  // Fetch single project by id
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await api.get(`/api/v1/projects/${id}`);
        const project = res.data.data?.project; // depends on backend response
        setForm({
          name: project.name || "",
          client: project.client || "",
          budget: project.budget?.toString() || "",
          startDate: project.startDate?.slice(0, 10) || "",
          endDate: project.endDate?.slice(0, 10) || "",
          status: project.status || "pending",
        });
      } catch (error) {
        console.error("❌ Failed to fetch project:", error);
        toast.error("Failed to load project details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProject();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        console.log("🚀 ~ file: page.tsx:78 ~ handleSubmit ~ form:", form);
    //   await api.put(`/api/v1/projects/${id}`, form);
     updateProject(id!, form);
      toast.success("✅ Project updated successfully!");
      router.push("/dashboard/projects");
    } catch (error) {
      console.error("❌ Update failed:", error);
      toast.error("Failed to update project.");
    }
  };

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Edit Project</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Client */}
        <div>
          <label className="block font-medium">Client</label>
          <input
            type="text"
            name="client"
            value={form.client}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Budget */}
        <div>
          <label className="block font-medium">Budget</label>
          <input
            type="number"
            name="budget"
            value={form.budget}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Start Date */}
        <div>
          <label className="block font-medium">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* End Date */}
        <div>
          <label className="block font-medium">End Date</label>
          <input
            type="date"
            name="endDate"
            value={form.endDate}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Status */}
        <div>
          <label className="block font-medium">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="pending">Pending</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
