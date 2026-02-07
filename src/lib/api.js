import { headers } from "next/headers";

export function getBaseUrl() {
  const headerStore = headers();
  const host = headerStore.get("host");

  if (!host) {
    return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  }

  const protocol = host.includes("localhost") ? "http" : "https";
  return `${protocol}://${host}`;
}
