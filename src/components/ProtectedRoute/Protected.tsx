"use client";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";


export default function Protected({ children }: { children: React.ReactNode }) {
const { user, loading } = useAuth();
const router = useRouter();


useEffect(() => {
if (!loading && !user) router.replace("/login");
}, [loading, user, router]);


if (loading) return <div className="p-6">Loading...</div>;
if (!user) return null; // Redirecting...
return <>{children}</>;
}