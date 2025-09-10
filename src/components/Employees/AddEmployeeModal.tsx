"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Employee } from "@/app/types/employee";
import { createEmployee } from "@/app/lib/api/employees";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "react-toastify";

export default function AddEmployeeModal({ onSuccess }: { onSuccess: (emp: Employee) => void }) {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm<Partial<Employee>>();

  const onSubmit = async (data: Partial<Employee>) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const newEmployee = await createEmployee(token, data);
      onSuccess(newEmployee);
      toast.success("Employee created successfully!");
      reset();
      setOpen(false);
    } catch {
      toast.error("Failed to create employee");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Employee</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Employee</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <Input placeholder="Name" {...register("name", { required: true })} />
          <Input type="email" placeholder="Email" {...register("email", { required: true })} />
          <Input placeholder="Role" {...register("role", { required: true })} />
          <Input placeholder="Team" {...register("team")} />
          <Input type="number" placeholder="Salary" {...register("salary", { valueAsNumber: true })} />

          <Button type="submit" className="w-full">Save</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
