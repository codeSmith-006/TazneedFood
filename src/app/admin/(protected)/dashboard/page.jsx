import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import DashboardPage from "@/components/admin/DashboardPage";

export default async function AdminDashboardPage() {
  const session = await auth();

  if (!session || session.user?.role !== "admin") {
    redirect("/admin/login");
  }

  return <DashboardPage />;
}
