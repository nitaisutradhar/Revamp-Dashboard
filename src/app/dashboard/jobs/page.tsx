"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
// import axios from "axios";
// import { useRouter } from "next/navigation";
import { Job } from "@/app/types/job";
import api from "@/app/lib/api/api";
export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // const router = useRouter();

  // Fetch jobs
    useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.get<{
          status: string;
          results: number;
          data: { jobs: Job[] };
        }>("/api/v1/jobs");

        setJobs(response.data.data.jobs);
      } catch (err) {
        setError(`Failed to fetch jobs.${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Delete job
  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this job?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/api/v1/jobs/${id}`);
      setJobs((prev) => prev.filter((job) => job._id !== id));
    } catch {
      alert("Failed to delete job.");
    }
  };

  if (loading) {
    return <p className="text-center py-10">Loading jobs...</p>;
  }

  if (error) {
    return <p className="text-center py-10 text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Jobs</h1>
        <Link
          href="/dashboard/jobs/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          + Create Job
        </Link>
      </div>

      {jobs.length === 0 ? (
        <p className="text-center text-gray-600">No jobs available.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 px-4 py-2 text-left">Title</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Status</th>
              <th className="border border-gray-200 px-4 py-2 text-left">
                Applications
              </th>
              <th className="border border-gray-200 px-4 py-2 text-left">
                Created At
              </th>
              <th className="border border-gray-200 px-4 py-2 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job._id} className="hover:bg-gray-50">
                <td className="border border-gray-200 px-4 py-2">{job.title}</td>
                <td className="border border-gray-200 px-4 py-2">
                  {job.status === "open" ? (
                    <span className="text-green-600 font-medium">Open</span>
                  ) : (
                    <span className="text-red-600 font-medium">Closed</span>
                  )}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {job.applications.length}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {new Date(job.createdAt).toLocaleDateString()}
                </td>
                <td className="border border-gray-200 px-4 py-2 text-center space-x-2">
                  <Link
                    href={`/dashboard/jobs/${job._id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </Link>
                  <Link
                    href={`/dashboard/jobs/${job._id}/edit`}
                    className="text-yellow-600 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(job._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
