import Link from "next/link";

export default function HomePage() {
  return (
    <main className="grid min-h-screen place-items-center p-8 bg-gray-50">
      <div className="max-w-xl text-center">
        <h1 className="mb-4 text-3xl font-bold">Welcome to Softbeez Revamp Dashboard</h1>
        <p className="mb-6 text-gray-600">
          Please login or signup to continue.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link
            href="/login"
            className="rounded-lg bg-gray-900 px-4 py-2 text-white hover:opacity-90"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="rounded-lg border px-4 py-2 hover:bg-gray-100"
          >
            Signup
          </Link>
        </div>
      </div>
    </main>
  );
}
