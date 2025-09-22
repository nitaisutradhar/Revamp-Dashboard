"use client";

import { useEffect, useState } from "react";
import { Employee } from "@/app/types/employee";
import { fetchEmployees, deleteEmployee } from "@/app/lib/api/employees";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import AddEmployeeModal from "@/components/Employees/AddEmployeeModal";
import EditEmployeeModal from "@/components/Employees/EditEmployeeModal";
import Link from "next/link";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetchEmployees(token)
      .then((data) => setEmployees(data))
      .catch(() => toast.error("Failed to fetch employees"))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await deleteEmployee(token, id);
      setEmployees((prev) => prev.filter((e) => e._id !== id));
      toast.success("Employee deleted");
    } catch {
      toast.error("Failed to delete employee");
    }
  };

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Employees</h1>
        <AddEmployeeModal
          onSuccess={(emp) => setEmployees((prev) => [...prev, emp])}
        />
      </div>

      <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Role</th>
            <th className="p-2 text-left">Team</th>
            <th className="p-2 text-left">Salary</th>
            <th className="p-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp._id} className="border-t">
              <td className="p-2">{emp.name}</td>
              <td className="p-2">{emp.email}</td>
              <td className="p-2">{emp.role}</td>
              <td className="p-2">{emp.team || "-"}</td>
              <td className="p-2">{emp.salary ? `$${emp.salary}` : "-"}</td>
              <td className="p-2 flex gap-2">
                <Link href={`/dashboard/employees/${emp._id}`}>
                <Button className="bg-blue-500 hover:bg-blue-600 text-white" >View</Button>
                </Link>
                <EditEmployeeModal
                  employee={emp}
                  onSuccess={(updated) =>
                    setEmployees((prev) =>
                      prev.map((e) => (e._id === updated._id ? updated : e))
                    )
                  }
                />
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(emp._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
