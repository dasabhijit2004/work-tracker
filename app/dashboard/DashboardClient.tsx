"use client";

import { useState } from "react";
import AddTaskForm from "@/components/AddTaskForm";
import TaskList from "@/components/TaskList";

export default function DashboardClient({
  selectedDate,
}: {
  selectedDate: string;
}) {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 space-y-6">
      <AddTaskForm onTaskAdded={() => setRefreshKey((k) => k + 1)} />
      <TaskList
        selectedDate={selectedDate}
        refreshKey={refreshKey}
      />
    </div>
  );
}
