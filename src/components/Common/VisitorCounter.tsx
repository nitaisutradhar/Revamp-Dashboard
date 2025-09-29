"use client";

import api from "@/app/lib/api/api";
import { useEffect, useState } from "react";

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const updateVisitorCount = async () => {
      try {
        // Increment visitor
        await api.post("/api/v1/visitors");

        // Get updated count
        const res = await api.get("/api/v1/visitors");
        const data = res.data;

        if (res.status === 200) {
          setCount(data.data.count);
        } else {
          console.error("Error fetching visitors:", data.message);
        }
      } catch (error) {
        console.error("Visitor API error:", error);
      }
    };

    updateVisitorCount();
  }, []);

  if (count === null) return <p>Loading visitor count...</p>;

  return (
    <p className="text-sm text-gray-600 mt-4">
      👀 Total Visitors: <span className="font-bold">{count}</span>
    </p>
  );
}
