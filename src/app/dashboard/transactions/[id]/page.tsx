"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/app/lib/api/api";
import { Transaction } from "../page";

export default function TransactionDetails() {
  const { id } = useParams();
  const [transaction, setTransaction] = useState<Transaction | null>(null);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const res = await api.get(`/api/v1/transactions/${id}`);
        setTransaction(res.data.data.transaction);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTransaction();
  }, [id]);

  if (!transaction) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Transaction Details</h1>
      <p><b>Type:</b> {transaction.type}</p>
      <p><b>Amount:</b> ${transaction.amount}</p>
      <p><b>Category:</b> {transaction.category}</p>
      <p><b>Project:</b> {transaction.project?.name || "-"}</p>
      <p><b>Date:</b> {new Date(transaction.date).toLocaleDateString()}</p>
      <p><b>Description:</b> {transaction.description || "-"}</p>
    </div>
  );
}
