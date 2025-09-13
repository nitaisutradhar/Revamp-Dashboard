"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Project } from "@/app/types/project";
import { getProjectById } from "@/app/lib/api/projects";

export default function ProjectDetailsPage() {
  const params = useParams();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    if (params?.id) {
      (async () => {
        const data = await getProjectById(params.id as string);
        setProject(data);
      })();
    }
  }, [params?.id]);

  if (!project) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{project.name}</h1>
      <p>
        <strong>Client:</strong> {project.client}
      </p>
      <p>
        <strong>Status:</strong> {project.status}
      </p>
      <p>
        <strong>Budget:</strong> {project.budget ?? "-"}
      </p>
      <p>
        <strong>Start:</strong>{" "}
        {new Date(project.startDate).toLocaleDateString()}
      </p>
      {project.endDate && (
        <p>
          <strong>End:</strong>{" "}
          {new Date(project.endDate).toLocaleDateString()}
        </p>
      )}
    </div>
  );
}
