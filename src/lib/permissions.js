import { auth } from "@/lib/auth";

export async function requireSession() {
  const session = await auth();
  if (!session?.user) {
    return { ok: false, status: 401, session: null };
  }
  return { ok: true, status: 200, session };
}

export async function requireAdmin() {
  const { ok, status, session } = await requireSession();
  if (!ok) {
    return { ok, status, session: null };
  }
  if (session.user?.role !== "admin") {
    return { ok: false, status: 403, session };
  }
  return { ok: true, status: 200, session };
}
