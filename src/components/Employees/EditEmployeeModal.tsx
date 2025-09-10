"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Employee } from "@/app/types/employee";
import { updateEmployee } from "@/app/lib/api/employees";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "react-toastify";

export default function EditEmployeeModal({
  employee,
  onSuccess,
}: {
  employee: Employee;
  onSuccess: (emp: Employee) => void;
}) {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm<Partial<Employee>>({
    defaultValues: employee,
  });

  const onSubmit = async (data: Partial<Employee>) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const updated = await updateEmployee(token, employee._id, data);
      onSuccess(updated);
      toast.success("Employee updated!");
      reset(updated);
      setOpen(false);
    } catch {
      toast.error("Failed to update employee");
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Edit</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Employee</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <Input placeholder="Name" {...register("name")} />
            <Input type="email" placeholder="Email" {...register("email")} />
            <Input placeholder="Role" {...register("role")} />
            <Input placeholder="Team" {...register("team")} />
            <Input type="number" placeholder="Salary" {...register("salary", { valueAsNumber: true })} />

            <Button type="submit" className="w-full">Update</Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
