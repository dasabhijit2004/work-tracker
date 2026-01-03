import DashboardClient from "./DashboardClient";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ date?: string }>;
}) {
  const params = await searchParams;

  const selectedDate =
    params.date || new Date().toISOString().slice(0, 10);

  return <DashboardClient selectedDate={selectedDate} />;
}
