import { headers } from "next/headers";

export async function getBaseUrl() {
  const headerStore = await headers();
  const host = headerStore.get("host");

  if (!host) {
    return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  }

  const protocol = host.includes("localhost") ? "http" : "https";
  return `${protocol}://${host}`;
}
