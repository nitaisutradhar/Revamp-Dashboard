export interface Employee {
  _id: string;
  name: string;
  email: string;
  role: string;
  team?: string;
  salary?: number;
  profileImage?: string | null;  // ✅ added
  createdAt: string;
  updatedAt: string;
}
