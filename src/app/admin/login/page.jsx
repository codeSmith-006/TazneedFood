"use client";

import { Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl,
    });

    setSubmitting(false);

    if (res?.error) {
      // generic error to avoid info leakage
      setError("Invalid credentials.");
      return;
    }

    router.push(callbackUrl);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md bg-card shadow-soft rounded-xl p-8">
        <h1 className="font-display text-2xl font-bold text-foreground mb-2">
          Admin Login
        </h1>
        <p className="text-sm text-muted-foreground mb-6">
          Sign in with your admin email and password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-lg border border-border bg-background"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-lg border border-border bg-background"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full btn-hero-gold py-2.5 rounded-lg font-semibold"
          >
            {submitting ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
          <div className="w-full max-w-md bg-card shadow-soft rounded-xl p-8">
            <p className="text-sm text-muted-foreground">Loading...</p>
          </div>
        </div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}
