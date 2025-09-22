"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/app/lib/api/api";

export interface Transaction {
  _id: string;
  type: "income" | "expense";
  amount: number;
  category: string;
  date: string;
  description?: string;
  project?: { name: string; client: string };
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await api.get("/api/v1/transactions"); // Proxy to backend
        setTransactions(res.data.data.transactions);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this transaction?")) return;
        try {
            await api.delete(`/api/v1/transactions/${id}`);
            setTransactions(transactions.filter(tx => tx._id !== id));
        } catch (err) {
            console.error(err);
        }
    }



  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Transactions</h1>
        <Link
          href="/dashboard/transactions/new"
          className="px-3 py-2 bg-blue-600 text-white rounded"
        >
          + New Transaction
        </Link>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-3 py-2">Type</th>
            <th className="border px-3 py-2">Amount</th>
            <th className="border px-3 py-2">Category</th>
            <th className="border px-3 py-2">Project</th>
            <th className="border px-3 py-2">Date</th>
            <th className="border px-3 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx._id} className="hover:bg-gray-50">
              <td className="border px-3 py-2">{tx.type}</td>
              <td className="border px-3 py-2">${tx.amount}</td>
              <td className="border px-3 py-2">{tx.category}</td>
              <td className="border px-3 py-2">
                {tx.project ? tx.project.name : "-"}
              </td>
              <td className="border px-3 py-2">
                {new Date(tx.date).toLocaleDateString()}
              </td>
              <td className="border px-3 py-2 space-x-2">
                <Link
                  href={`/dashboard/transactions/${tx._id}`}
                  className="px-2 py-1 bg-green-500 text-white rounded"
                >
                  View
                </Link>
                <Link
                  href={`/dashboard/transactions/${tx._id}/edit`}
                  className="px-2 py-1 bg-yellow-500 text-white rounded"
                >
                  Edit
                </Link>
                <button
                  onClick={() => {handleDelete(tx._id)}}
                  className="px-2 py-1 bg-red-500 text-white rounded"
                >
                    Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
