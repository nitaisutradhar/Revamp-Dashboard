"use client";
import { useEffect, useState } from "react";
import axios from "axios";

type Filter = "today" | "week" | "month" | "year" | "custom";

interface VisitorStats {
  total: number;
}

export default function VisitorsPage() {
  const [filter, setFilter] = useState<Filter>("today");
  const [stats, setStats] = useState<VisitorStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchVisitors = async () => {
    try {
      setLoading(true);

      let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/visitors?filter=${filter}`;
      if (filter === "custom" && startDate && endDate) {
        url += `&startDate=${startDate}&endDate=${endDate}`;
      }

      const res = await axios.get(url);
      setStats({ total: res.data.total });
    } catch (err) {
      console.error("Error fetching visitors", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVisitors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Visitor Overview</h1>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3">
        {(["today", "week", "month", "year", "custom"] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-md text-sm font-medium border transition ${
              filter === f
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Custom Date Picker */}
      {filter === "custom" && (
        <div className="flex items-center gap-3">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border px-3 py-2 rounded-md"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border px-3 py-2 rounded-md"
          />
          <button
            onClick={fetchVisitors}
            className="px-4 py-2 bg-green-600 text-white rounded-md"
          >
            Apply
          </button>
        </div>
      )}

      {/* Visitor Stats */}
      <div className="p-6 border rounded-lg shadow bg-white">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <p className="text-xl font-semibold">
            Total Visitors:{" "}
            <span className="text-blue-600">{stats?.total ?? 0}</span>
          </p>
        )}
      </div>
    </div>
  );
}
