"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { createTask } from "@/actions/task.actions";

export default function AddTaskForm({
  onTaskAdded,
}: {
  onTaskAdded: () => void;
}) {
  const [title, setTitle] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title || !selectedDate) return;

    try {
      await createTask({ title, selectedDate });
      toast.success("Task added");

      setTitle("");
      onTaskAdded(); // 🔑 trigger refresh
    } catch {
      toast.error("Failed to add task");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border rounded px-3 py-2"
        placeholder="Task title"
      />

      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        className="w-full border rounded px-3 py-2"
      />

      <button className="bg-black text-white px-4 py-2 rounded">
        Add Task
      </button>
    </form>
  );
}
