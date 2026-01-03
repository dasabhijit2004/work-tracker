"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getTasksByDate,
  toggleTaskStatus,
  deleteTask,
} from "@/actions/task.actions";
import EditTaskModal from "./EditTaskModal";
import DeleteTaskModal from "./DeleteTaskModal";
import TaskSkeleton from "./TaskSkeleton";

type Task = {
  taskId: string;
  title: string;
  description?: string;
  selectedDate: string;
  isCompleted: boolean;
  createdAt: string;
};

export default function TaskList({
  selectedDate,
  refreshKey,
}: {
  selectedDate: string;
  refreshKey: number;
}) {
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deletingTask, setDeletingTask] = useState<Task | null>(null);

  useEffect(() => {
    async function fetchTasks() {
      setLoading(true);
      const data = await getTasksByDate(selectedDate, "all");
      setTasks(data as Task[]);
      setLoading(false);
    }

    fetchTasks();
  }, [selectedDate, refreshKey]); // 🔑 refreshKey added

  if (loading) return <TaskSkeleton />;

  const pendingTasks = tasks.filter((t) => !t.isCompleted);
  const completedTasks = tasks.filter((t) => t.isCompleted);

  const visibleTasks =
    filter === "all"
      ? tasks
      : filter === "completed"
        ? completedTasks
        : pendingTasks;

  async function handleToggle(task: Task, checked: boolean) {
    const prevTasks = [...tasks];

    setTasks((prev) =>
      prev.map((t) =>
        t.taskId === task.taskId ? { ...t, isCompleted: checked } : t
      )
    );

    try {
      await toggleTaskStatus(task.taskId, checked);
      toast.success(
        checked ? "Task marked as completed" : "Task marked as pending"
      );
    } catch {
      setTasks(prevTasks);
      toast.error("Failed to update task");
    }
  }

  function renderTask(task: Task) {
    return (
      <li
        key={task.taskId}
        className="rounded-lg border p-4 flex justify-between items-start
                   transition-all duration-300 ease-in-out
                   hover:shadow-md hover:-translate-y-0.5"
      >
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={task.isCompleted}
            onChange={(e) => handleToggle(task, e.target.checked)}
            className="mt-1 h-4 w-4"
          />

          <div>
            <h3
              className={`font-medium transition-all duration-300 ${task.isCompleted
                ? "line-through text-gray-400 opacity-70"
                : ""
                }`}
            >
              {task.title}
            </h3>

            <span className="hidden sm:inline text-xs text-gray-400">
              {new Date(task.createdAt).toLocaleTimeString()}
            </span>
          </div>
        </div>

        <div className="flex gap-3 text-sm">
          <button
            onClick={() => setEditingTask(task)}
            className="text-blue-600"
          >
            Edit
          </button>
          <button
            onClick={() => setDeletingTask(task)}
            className="text-red-600"
          >
            Delete
          </button>
        </div>
      </li>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters – ALWAYS visible */}
      <div className="flex gap-2 flex-wrap">
        {["all", "completed", "pending"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            className={`rounded px-3 py-1 text-sm ${filter === f
              ? "bg-black text-white"
              : "border text-gray-600"
              }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Empty State (per filter) */}
      {visibleTasks.length === 0 && (
        <div className="rounded-lg border p-6 text-center text-gray-500">
          {filter === "all" && "No tasks for this date."}
          {filter === "completed" && "No completed tasks yet."}
          {filter === "pending" && "No pending tasks."}
        </div>
      )}

      {/* Task Sections */}
      {visibleTasks.length > 0 && (
        <>
          {(filter === "all" || filter === "pending") &&
            pendingTasks.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-sm font-semibold text-gray-600">
                  Pending
                </h2>
                <ul className="space-y-3">
                  {pendingTasks.map(renderTask)}
                </ul>
              </div>
            )}

          {(filter === "all" || filter === "completed") &&
            completedTasks.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-sm font-semibold text-gray-600">
                  Completed
                </h2>
                <ul className="space-y-3">
                  {completedTasks.map(renderTask)}
                </ul>
              </div>
            )}
        </>
      )}

      {/* Edit Modal */}
      {editingTask && (
        <EditTaskModal
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onOptimisticUpdate={(newTitle, newDate) => {
            setTasks((prev) =>
              prev.map((t) =>
                t.taskId === editingTask.taskId
                  ? {
                    ...t,
                    title: newTitle,
                    selectedDate: new Date(newDate).toISOString(),
                  }
                  : t
              )
            );
            toast.success("Task updated");
          }}
        />
      )}

      {/* Delete Modal */}
      {deletingTask && (
        <DeleteTaskModal
          onCancel={() => setDeletingTask(null)}
          onConfirm={async () => {
            const prevTasks = [...tasks];

            setTasks((prev) =>
              prev.filter((t) => t.taskId !== deletingTask.taskId)
            );

            try {
              await deleteTask(deletingTask.taskId);
              toast.success("Task deleted");
            } catch {
              setTasks(prevTasks);
              toast.error("Failed to delete task");
            } finally {
              setDeletingTask(null);
            }
          }}
        />
      )}
    </div>
  );
}
