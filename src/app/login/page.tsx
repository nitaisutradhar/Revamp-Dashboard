"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const validate = () => {
    if (!email.trim() || !password) {
      setFormError("Please provide both email and password.");
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
      await login(email.trim(), password);
      // On success AuthContext stored token & user -> redirect
      router.replace("/dashboard");
    } catch (err) {
        console.error(err);
      // AuthContext already shows toast; show inline error too (optional)
      setFormError("Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen place-items-center bg-gray-50 p-6">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md space-y-6 rounded-2xl border bg-white p-6 shadow"
        aria-label="Login form"
      >
        <h1 className="text-2xl font-semibold">Login</h1>

        {formError && (
          <div className="rounded-md bg-red-50 px-4 py-2 text-sm text-red-700">{formError}</div>
        )}

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
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              placeholder="Enter your password"
              className="w-full rounded-md border px-3 py-2 pr-28 outline-none focus:ring"
              aria-label="Password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded bg-gray-100 px-3 py-1 text-sm hover:bg-gray-200"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-gray-900 py-2 text-white hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="flex items-center justify-between text-sm text-gray-600">
          <p>
            New here?{" "}
            <Link href="/signup" className="font-medium text-gray-900 underline">
              Create account
            </Link>
          </p>
          <Link href="#" className="underline">
            Forgot password?
          </Link>
        </div>
      </form>
    </div>
  );
}
