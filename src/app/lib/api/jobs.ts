import { Job } from "@/app/types/job";
import api from "./api";

export const getJobs = async () => {
  const res = await api.get("api/v1/jobs");
  return res.data.data.jobs;
};

export const getJob = async (id: string) => {
  const res = await api.get(`api/v1/jobs/${id}`);
  return res.data.data.job;
};

export const createJob = async (data: Job) => {
  const res = await api.post("api/v1/jobs", data);
  return res.data.data.job;
};

export const updateJob = async (id: string, data: Job) => {
  const res = await api.patch(`api/v1/jobs/${id}`, data);
  return res.data.data.job;
};

export const deleteJob = async (id: string) => {
  await api.delete(`/jobs/${id}`);
};

export const applyJob = async (id: string, data: FormData) => {
  const res = await api.post(`api/v1/jobs/${id}/apply`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.data.job;
};

export const getJobStats = async () => {
  const res = await api.get("api/v1/jobs/stats");
  return res.data.data.stats;
};
