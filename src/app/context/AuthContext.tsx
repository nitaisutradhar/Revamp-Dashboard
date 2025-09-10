"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { AuthContextType, AuthResponse, Role, User } from "../types/auth";
import { storage } from "../lib/storage";
import api from "../lib/api/api";
import { toast } from "react-toastify";
import { AxiosError } from "axios";


const AuthContext = createContext<AuthContextType | null>(null);


export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
const [user, setUser] = useState<User | null>(null);
const [loading, setLoading] = useState(true);


useEffect(() => {
// hydrate from storage
const storedUser = storage.getUser();
if (storedUser) setUser(storedUser);
setLoading(false);
}, []);


const login = async (email: string, password: string) => {
try {
const { data } = await api.post<AuthResponse>("/api/v1/auth/login", { email, password });
storage.setToken(data.token);
storage.setUser(data.data.user);
setUser(data.data.user);
toast.success("Logged in successfully");
} catch (err) {
// const msg = err?.response?.data?.message || "Login failed";
// toast.error(msg);
// throw err;
const axiosErr = err as AxiosError<{ message: string }>;
    const msg = axiosErr.response?.data?.message || "Login failed";
    toast.error(msg);
    throw err;
}
};


const signup = async (name: string, email: string, password: string, role: Role = "user") => {
try {
const { data } = await api.post<AuthResponse>("/api/v1/auth/signup", { name, email, password, role });
storage.setToken(data.token);
storage.setUser(data.data.user);
setUser(data.data.user);
toast.success("Account created & logged in");
} catch (err) {
// const msg = err?.response?.data?.message || "Signup failed";
// toast.error(msg);
// throw err;
const axiosErr = err as AxiosError<{ message: string }>;
    const msg = axiosErr.response?.data?.message || "Signup failed";
    toast.error(msg);
    throw err;
}
};


const logout = () => {
storage.clearToken();
storage.clearUser();
setUser(null);
toast.info("Logged out");
};


return (
<AuthContext.Provider value={{ user, loading, login, signup, logout }}>
{children}
</AuthContext.Provider>
);
};


export const useAuth = () => {
const ctx = useContext(AuthContext);
if (!ctx) throw new Error("useAuth must be used within AuthProvider");
return ctx;
};