import TaskList from "@/components/TaskList";
import AddTaskForm from "@/components/AddTaskForm";

export default function DashboardPage({
  searchParams,
}: {
  searchParams: { date?: string };
}) {
  const selectedDate =
    searchParams.date || new Date().toISOString().slice(0, 10);

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 space-y-6">
      <AddTaskForm />
      <TaskList selectedDate={selectedDate} />
    </div>
  );
}
