"use client";

import { useState } from "react";
// import axios from "axios";
import { useRouter } from "next/navigation";
import { Job } from "@/app/types/job";
import api from "@/app/lib/api/api";

export default function CreateJobPage() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [requirements, setRequirements] = useState<string>("");
  const [status, setStatus] = useState<"open" | "closed">("open");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await api.post<{ data: { job: Job } }>("/api/v1/jobs", {
        title,
        description,
        requirements: requirements
          .split(",")
          .map((req) => req.trim())
          .filter((req) => req.length > 0),
        status,
      });

      console.log("Job created:", res.data.data.job);
      router.push("/dashboard/jobs");
    } catch (err) {
      console.error("Failed to create job", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create Job</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block mb-1 font-medium">Job Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded p-2"
            rows={5}
          />
        </div>

        {/* Requirements */}
        <div>
          <label className="block mb-1 font-medium">
            Requirements (comma separated)
          </label>
          <input
            type="text"
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block mb-1 font-medium">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as "open" | "closed")}
            className="w-full border rounded p-2"
          >
            <option value="open">Open</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Job"}
        </button>
      </form>
    </div>
  );
}
