export interface Application {
  name: string;
  email: string;
  resume: string;
  appliedAt: string;
}

export interface Job {
  _id: string;
  title: string;
  description: string;
  requirements: string[];
  status: "open" | "closed";
  applications: Application[];
  createdAt: string;
  updatedAt: string;
}
