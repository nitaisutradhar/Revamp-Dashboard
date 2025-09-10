"use client";

import { useAuth } from "@/app/context/AuthContext";


export default function Topbar() {
const { user, logout } = useAuth();
return (
<header className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-6 py-3">
<div className="font-semibold">Revamp Dashboard</div>
<div className="flex items-center gap-3">
{user && (
<div className="text-sm text-gray-600">
<div className="font-medium text-gray-800">{user.name}</div>
<div className="text-xs">{user.email} • {user.role}</div>
</div>
)}
<button onClick={logout} className="rounded-lg bg-gray-900 px-3 py-2 text-white hover:opacity-90">
Logout
</button>
</div>
</header>
);
}