import { User } from "../types/auth";

export const storage = {
getToken: () => (typeof window !== "undefined" ? localStorage.getItem("token") : null),
setToken: (token: string) => {
if (typeof window !== "undefined") localStorage.setItem("token", token);
},
clearToken: () => {
if (typeof window !== "undefined") localStorage.removeItem("token");
},
getUser: () => {
if (typeof window === "undefined") return null;
const raw = localStorage.getItem("user");
return raw ? JSON.parse(raw) : null;
},
setUser: (user: User) => {
if (typeof window !== "undefined") localStorage.setItem("user", JSON.stringify(user));
},
clearUser: () => {
if (typeof window !== "undefined") localStorage.removeItem("user");
},
};