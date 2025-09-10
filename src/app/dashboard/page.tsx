export default function DashboardHome() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Overview</h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border bg-white p-5">Clients: <strong>-</strong></div>
        <div className="rounded-2xl border bg-white p-5">Employees: <strong>-</strong></div>
        <div className="rounded-2xl border bg-white p-5">Projects: <strong>-</strong></div>
        <div className="rounded-2xl border bg-white p-5">Transactions: <strong>-</strong></div>
      </div>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border bg-white p-4">Recent activity / charts (placeholder)</div>
        <div className="rounded-2xl border bg-white p-4">Quick actions (placeholder)</div>
      </section>
    </div>
  );
}
