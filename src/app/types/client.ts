export interface Client {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  projects?: {
    _id: string;
    name: string;
    status: string;
  }[];
  createdAt?: string;
  updatedAt?: string;
}
