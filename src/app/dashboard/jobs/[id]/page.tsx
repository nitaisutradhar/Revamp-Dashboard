"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/app/lib/api/api";
import { Job } from "@/app/types/job";


export default function ViewJobPage() {
  const params = useParams();
  const jobId = params?.id as string;

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!jobId) return;

    const fetchJob = async () => {
      try {
        const response = await api.get<{ data: { job : Job} }>(
          `/api/v1/jobs/${jobId}`
        );
        setJob(response.data.data.job);
      } catch (err) {
        setError(`Failed to fetch job details.${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  if (loading) {
    return <p className="text-center py-10">Loading job details...</p>;
  }

  if (error) {
    return <p className="text-center py-10 text-red-500">{error}</p>;
  }

  if (!job) {
    return <p className="text-center py-10">No job found.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
      <p className="text-gray-700 mb-4">{job.description}</p>

      <h2 className="text-xl font-semibold mb-2">Requirements:</h2>
      <ul className="list-disc list-inside mb-4">
        {(job.requirements ?? []).map((req, index) => (
          <li key={index} className="text-gray-600">
            {req}
          </li>
        ))}
      </ul>

      <p
        className={`mb-4 font-semibold ${
          job.status === "open" ? "text-green-600" : "text-red-600"
        }`}
      >
        Status: {job.status}
      </p>

      <p className="text-sm text-gray-500 mb-6">
        Posted on: {new Date(job.createdAt).toLocaleDateString()}
      </p>

      <h2 className="text-xl font-semibold mb-2">Applications:</h2>
      {(job.applications ?? []).length > 0 ? (
        <ul className="space-y-3">
          {(job.applications ?? []).map((app, index) => (
            <li
              key={index}
              className="border p-3 rounded-md shadow-sm bg-gray-50"
            >
              <p className="font-semibold">{app.name}</p>
              <p className="text-gray-600">{app.email}</p>
              {app.resume && (
                <a
                  href={app.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  View Resume
                </a>
              )}
              <p className="text-xs text-gray-500">
                Applied on: {new Date(app.appliedAt).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No applications yet.</p>
      )}
    </div>
  );
}
