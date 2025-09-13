"use client";
import { useEffect, useState } from "react";
import { Project } from "@/app/types/project";
import { getProjects, deleteProject } from "@/app/lib/api/projects";
import Link from "next/link";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getProjects();
      setProjects(data);
    })();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p._id !== id));
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Link
          href="/dashboard/projects/new"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          + New Project
        </Link>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Name</th>
            <th className="p-2">Client</th>
            <th className="p-2">Status</th>
            <th className="p-2">Budget</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project._id} className="border-t">
              <td className="p-2">{project.name}</td>
              <td className="p-2">{project.client}</td>
              <td className="p-2">{project.status}</td>
              <td className="p-2">{project.budget ?? "-"}</td>
              <td className="p-2 space-x-2">
                <Link
                  href={`/dashboard/projects/${project._id}`}
                  className="px-2 py-1 bg-green-500 text-white rounded"
                >
                  View
                </Link>
                <Link
                  href={`/dashboard/projects/${project._id}/edit`}
                  className="px-2 py-1 bg-yellow-500 text-white rounded"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(project._id)}
                  className="px-2 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
