export type Role = "user" | "admin" | "superAdmin";


export interface User {
_id: string;
name: string;
email: string;
role: Role;
createdAt?: string;
}


export interface AuthResponse {
status: "success";
token: string;
data: { user: User };
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, role?: Role) => Promise<void>;
  logout: () => void;
}