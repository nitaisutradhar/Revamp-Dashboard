"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProject } from "@/app/lib/api/projects";

type Status = "pending" | "active" | "completed";

interface FormState {
  name: string;
  client: string;
  budget: string;
  startDate: string;
  endDate: string;
  status: Status;
}

export default function NewProjectPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    client: "",
    budget: "",
    startDate: "",
    endDate: "",
    status: "pending",
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createProject(form);
    router.push("/dashboard/projects");
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Project</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Project Name" className="w-full border p-2"
          value={form.name} onChange={handleChange} required />
        <input name="client" placeholder="Client" className="w-full border p-2"
          value={form.client} onChange={handleChange} required />
        <input name="budget" type="number" placeholder="Budget" className="w-full border p-2"
          value={form.budget} onChange={handleChange} />
        <input name="startDate" type="date" className="w-full border p-2"
          value={form.startDate} onChange={handleChange} required />
        <input name="endDate" type="date" className="w-full border p-2"
          value={form.endDate} onChange={handleChange} />
        <select name="status" className="w-full border p-2" value={form.status} onChange={handleChange}>
          <option value="pending">Pending</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Save</button>
      </form>
    </div>
  );
}
