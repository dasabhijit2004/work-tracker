"use client";

import { useState } from "react";
import { createTask } from "@/actions/task.actions";

export default function AddTaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title || !selectedDate) return;

    await createTask({
      title,
      description,
      selectedDate,
    });

    setTitle("");
    setDescription("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-lg border p-4"
    >
      <input
        type="text"
        placeholder="Task title"
        className="w-full rounded border px-3 py-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Description (optional)"
        className="w-full rounded border px-3 py-2"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="date"
        className="w-full rounded border px-3 py-2"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />

      <button
        type="submit"
        className="w-full rounded bg-black py-2 text-white"
      >
        Add Task
      </button>
    </form>
  );
}
