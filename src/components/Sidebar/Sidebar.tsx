"use client";
import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";


const NavItem = ({ href, label }: { href: string; label: string }) => (
<Link href={href} className="block rounded-xl px-3 py-2 hover:bg-gray-200/70 transition">
{label}
</Link>
);


export default function Sidebar() {
const { user } = useAuth();
const role = user?.role;


return (
<aside className="w-64 shrink-0 border-r bg-white p-4">
<div className="mb-6 text-xl font-semibold">Dashboard</div>
<nav className="space-y-1">
<NavItem href="/dashboard" label="Overview" />
{/* Everyone */}
<NavItem href="/dashboard/blogs" label="Blogs" />
<NavItem href="/dashboard/jobs" label="Jobs" />
{/* Admin+ */}
{(role === "admin" || role === "superAdmin") && (
<>
<NavItem href="/dashboard/clients" label="Clients" />
<NavItem href="/dashboard/employees" label="Employees" />
<NavItem href="/dashboard/projects" label="Projects" />
<NavItem href="/dashboard/transactions" label="Transactions" />
</>
)}
</nav>
</aside>
);
}