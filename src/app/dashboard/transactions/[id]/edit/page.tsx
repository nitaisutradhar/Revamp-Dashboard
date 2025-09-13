"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/app/lib/api/api";

interface Transaction {
  _id: string;
  type: "income" | "expense";
  amount: number;
  category: string;
  project: string;
  date: string;
  description?: string;
}

export default function EditTransactionPage() {
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState<Transaction | null>(null);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const res = await api.get(`/api/v1/transactions/${id}`);
        setForm(res.data.data.transaction);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTransaction();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => {
      if (!prevForm) return null; // Should not happen if form is rendered, but good for type safety
      const valueToSet = name === "amount" ? Number(value) : value;
      return { ...prevForm, [name]: valueToSet };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.patch(`/api/v1/transactions/${id}`, form);
      router.push("/dashboard/transactions");
    } catch (err) {
      console.error(err);
    }
  };

  if (!form) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Edit Transaction</h1>
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
          placeholder="Project ID"
          className="border p-2 w-full"
        />
        <input
          type="date"
          name="date"
          value={form.date?.slice(0, 10)}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          name="description"
          value={form.description || ""}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2 w-full"
        />
        <button type="submit" className="px-4 py-2 bg-yellow-600 text-white rounded">
          Update
        </button>
      </form>
    </div>
  );
}
