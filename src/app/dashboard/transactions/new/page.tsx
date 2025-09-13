"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/app/lib/api/api";

export default function NewTransactionPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    type: "income",
    amount: "",
    category: "",
    project: "",
    date: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/api/v1/transactions", form);
      router.push("/dashboard/transactions");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Create Transaction</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <select name="type" value={form.type} onChange={handleChange} className="border p-2 w-full">
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <input
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          placeholder="Amount"
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          name="project"
          value={form.project}
          onChange={handleChange}
          placeholder="Project ID (optional)"
          className="border p-2 w-full"
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2 w-full"
        />
        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
          Save
        </button>
      </form>
    </div>
  );
}
