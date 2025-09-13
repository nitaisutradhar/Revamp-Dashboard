import { Project } from "@/app/types/project";
import api from "./api";


export const getProjects = async (): Promise<Project[]> => {
  const res = await api.get("api/v1/projects");
  return res.data.data.projects as Project[];
};

export const getProjectById = async (id: string): Promise<Project> => {
  const res = await api.get(`api/v1/projects/${id}`);
  return res.data.data.project as Project;
};

export interface CreateProjectDto {
  name: string;
  client: string;
  budget?: number | string;
  startDate: string;
  endDate?: string;
  status: "active" | "completed" | "pending";
}

export const createProject = async (payload: CreateProjectDto): Promise<Project> => {
  const res = await api.post("api/v1/projects", payload);
  return res.data.data.project as Project;
};

export const updateProject = async (
  id: string,
  payload: Partial<CreateProjectDto>
): Promise<Project> => {
  const res = await api.patch(`api/v1/projects/${id}`, payload);
  return res.data.data.project as Project;
};

export const deleteProject = async (id: string): Promise<void> => {
  await api.delete(`api/v1/projects/${id}`);
};

export const assignTeam = async (id: string, team: string[]): Promise<Project> => {
  const res = await api.post(`api/v1/projects/${id}/assign-team`, { team });
  return res.data.data.project as Project;
};

export interface ProjectStat {
  status: string;
  count: number;
  avgBudget: number;
  totalBudget: number;
  avgDurationDays: number;
}

export const getProjectStats = async (): Promise<ProjectStat[]> => {
  const res = await api.get("api/v1/projects/stats");
  return res.data.data.stats as ProjectStat[];
};
