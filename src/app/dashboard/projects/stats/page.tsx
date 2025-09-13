"use client";
import { getProjectStats } from "@/app/lib/api/projects";
import { useEffect, useState } from "react";

interface Stat {
  status: string;
  count: number;
  avgBudget: number;
  totalBudget: number;
  avgDurationDays: number;
}

export default function ProjectStatsPage() {
  const [stats, setStats] = useState<Stat[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getProjectStats();
      setStats(data);
    })();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Project Statistics</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Status</th>
            <th className="p-2">Count</th>
            <th className="p-2">Avg Budget</th>
            <th className="p-2">Total Budget</th>
            <th className="p-2">Avg Duration (Days)</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((s, i) => (
            <tr key={i} className="border-t">
              <td className="p-2">{s.status}</td>
              <td className="p-2">{s.count}</td>
              <td className="p-2">{s.avgBudget}</td>
              <td className="p-2">{s.totalBudget}</td>
              <td className="p-2">{s.avgDurationDays}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
