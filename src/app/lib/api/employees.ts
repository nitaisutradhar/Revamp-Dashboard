import { Employee } from "@/app/types/employee";


const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchEmployees(token: string): Promise<Employee[]> {
  const res = await fetch(`${BASE_URL}/api/v1/employees`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch employees");
  const data = await res.json();
  return data.data.employees;
}

export async function createEmployee(token: string, employee: Partial<Employee>): Promise<Employee> {
  const res = await fetch(`${BASE_URL}/api/v1/employees`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(employee),
  });
  if (!res.ok) throw new Error("Failed to create employee");
  const data = await res.json();
  return data.data.employee;
}

export async function updateEmployee(token: string, id: string, updates: Partial<Employee>): Promise<Employee> {
  const res = await fetch(`${BASE_URL}/api/v1/employees/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error("Failed to update employee");
  const data = await res.json();
  return data.data.employee;
}

export async function deleteEmployee(token: string, id: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/api/v1/employees/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to delete employee");
}
