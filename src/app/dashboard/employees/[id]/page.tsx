"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
// import Image from "next/image";
import api from "@/app/lib/api/api";

interface Employee {
  _id: string;
  name: string;
  email: string;
  role: string;
  team: string;
  salary: number;
  profileImage: string;
  createdAt: string;
  updatedAt: string;
}

export default function ViewEmployeePage() {
  const { id } = useParams();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await api.get(`/api/v1/employees/${id}`);
        setEmployee(res.data.data?.employee);
      } catch (error) {
        console.error("Failed to fetch employee", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchEmployee();
  }, [id]);

  if (loading) return <p className="p-4">Loading employee...</p>;
  if (!employee) return <p className="p-4">No employee found.</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white shadow rounded-lg p-6 mt-6">
      <div className="flex items-center space-x-6">
        {/* {employee.profileImage && (
          <Image
            src={`http://localhost:8000${employee.profileImage}`}
            alt={employee.name}
            width={120}
            height={120}
            className="rounded-full object-cover border"
          />
        )} */}
        <div>
          <h1 className="text-2xl font-bold">{employee.name}</h1>
          <p className="text-gray-600">{employee.email}</p>
          <p className="mt-2">
            <strong>Role:</strong> {employee.role}
          </p>
          <p>
            <strong>Team:</strong> {employee.team}
          </p>
          <p>
            <strong>Salary:</strong> ${employee.salary}
          </p>
        </div>
      </div>

      <div className="mt-6 text-sm text-gray-500">
        <p>Created: {new Date(employee.createdAt).toLocaleString()}</p>
        <p>Updated: {new Date(employee.updatedAt).toLocaleString()}</p>
      </div>
    </div>
  );
}
