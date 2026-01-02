import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Sidebar from "@/components/dashboard/Sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Unauthorized");
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar user={session.user} />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
