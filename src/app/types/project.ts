import { Employee } from "./employee";

export type ProjectStatus = "active" | "completed" | "pending";

export interface Project {
  _id: string;
  name: string;
  client: string;
  team: Employee[];
  budget?: number;
  startDate: string;
  endDate?: string;
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
}
