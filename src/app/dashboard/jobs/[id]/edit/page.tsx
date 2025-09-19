"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Job } from "@/app/types/job";
import api from "@/app/lib/api/api";


export default function EditJobPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params as { id: string };

  const [job, setJob] = useState<Job | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState<string[]>([]);
  const [status, setStatus] = useState<"open" | "closed">("open");
  const [loading, setLoading] = useState(true);

  // Fetch job details
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await api.get<{
          status: string;
          data: { job: Job };
        }>(`/api/v1/jobs/${id}`);

        const jobData = response.data.data.job;
        setJob(jobData);
        setTitle(jobData.title);
        setDescription(jobData.description);
        setRequirements(jobData.requirements);
        setStatus(jobData.status);
      } catch {
        alert("Failed to load job.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchJob();
  }, [id]);

  const handleRequirementChange = (index: number, value: string) => {
    const newRequirements = [...requirements];
    newRequirements[index] = value;
    setRequirements(newRequirements);
  };

  const addRequirement = () => {
    setRequirements([...requirements, ""]);
  };

  const removeRequirement = (index: number) => {
    setRequirements(requirements.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.patch(`/api/v1/jobs/${id}`, {
        title,
        description,
        requirements,
        status,
      });
      alert("Job updated successfully!");
      router.push("/dashboard/jobs");
    } catch {
      alert("Failed to update job.");
    }
  };

  if (loading) {
    return <p className="text-center py-10">Loading job...</p>;
  }

  if (!job) {
    return <p className="text-center py-10 text-red-500">Job not found</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Job</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1">Job Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded px-3 py-2"
            rows={4}
          />
        </div>

        {/* Requirements */}
        <div>
          <label className="block text-sm font-medium mb-1">Requirements</label>
          {requirements.map((req, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={req}
                onChange={(e) => handleRequirementChange(index, e.target.value)}
                className="flex-1 border rounded px-3 py-2"
              />
              <button
                type="button"
                onClick={() => removeRequirement(index)}
                className="text-red-600"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addRequirement}
            className="mt-2 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            + Add Requirement
          </button>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as "open" | "closed")}
            className="w-full border rounded px-3 py-2"
          >
            <option value="open">Open</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update Job
        </button>
      </form>
    </div>
  );
}
