"use client";

import Protected from "@/components/ProtectedRoute/Protected";
import Sidebar from "@/components/Sidebar/Sidebar";
import Topbar from "@/components/Topbar/Topbar";



export default function DashboardLayout({ children }: { children: React.ReactNode }) {
return (
<Protected>
    <div className="flex min-h-screen">
    <Sidebar />
    <div className="flex w-full flex-col">
        <Topbar />
        <main className="p-6 bg-gray-50 min-h-[calc(100vh-64px)]">{children}</main>
    </div>
    </div>
</Protected>
);
}