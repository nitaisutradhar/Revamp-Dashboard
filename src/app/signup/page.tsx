"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { Role } from "../types/auth";

export default function SignupPage() {
  const { signup } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"user" | "admin" | "superAdmin">("user");
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const validate = () => {
    if (!name.trim() || !email.trim() || !password) {
      setFormError("Please fill all required fields.");
      return false;
    }
    if (password.length < 8) {
      setFormError("Password must be at least 8 characters.");
      return false;
    }
    return true;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!validate()) return;

    setLoading(true);
    try {
      await signup(name.trim(), email.trim(), password, role);
      // Successful signup -> logged in by AuthContext -> redirect to dashboard
      router.replace("/dashboard");
    } catch (err) {
      setFormError("Signup failed. Try a different email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen place-items-center bg-gray-50 p-6">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md space-y-6 rounded-2xl border bg-white p-6 shadow"
        aria-label="Signup form"
      >
        <h1 className="text-2xl font-semibold">Create account</h1>

        {formError && (
          <div className="rounded-md bg-red-50 px-4 py-2 text-sm text-red-700">{formError}</div>
        )}

        <div>
          <label className="mb-1 block text-sm font-medium">Full name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Your full name"
            className="w-full rounded-md border px-3 py-2 outline-none focus:ring"
            aria-label="Full name"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@example.com"
            className="w-full rounded-md border px-3 py-2 outline-none focus:ring"
            aria-label="Email"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            placeholder="At least 8 characters"
            className="w-full rounded-md border px-3 py-2 outline-none focus:ring"
            aria-label="Password"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Role (optional)</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as Role)}
            className="w-full rounded-md border px-3 py-2 outline-none focus:ring"
            aria-label="Role"
          >
            <option value="user">user</option>
            <option value="admin">admin</option>
            <option value="superAdmin">superAdmin</option>
          </select>
          <p className="mt-1 text-xs text-gray-500">
            Pick role only if you should (for testing). In production, roles should be assigned server-side.
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-gray-900 py-2 text-white hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create account"}
        </button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-gray-900 underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
