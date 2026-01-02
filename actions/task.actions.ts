"use server";

import { connectDB } from "@/lib/db";
import { Task } from "@/models/Task";
import { User } from "@/models/User";
import crypto from "crypto";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

interface CreateTaskInput {
    title: string;
    description?: string;
    selectedDate: string;
}

export async function createTask({
    title,
    description,
    selectedDate,
}: CreateTaskInput) {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        throw new Error("Unauthorized");
    }

    await connectDB();

    const user = await User.findOne({ email: session.user.email });

    if (!user) {
        throw new Error("User not found");
    }

    await Task.create({
        taskId: crypto.randomUUID(),
        userId: user._id,
        title,
        description,
        selectedDate: new Date(selectedDate),
        isCompleted: false,
    });
}

export async function getTasksByDate(
    selectedDate: string,
    filter: "all" | "completed" | "pending"
) {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        throw new Error("Unauthorized");
    }

    await connectDB();

    const user = await User.findOne({ email: session.user.email });
    if (!user) throw new Error("User not found");

    const start = new Date(selectedDate);
    start.setHours(0, 0, 0, 0);

    const end = new Date(selectedDate);
    end.setHours(23, 59, 59, 999);

    const query: any = {
        userId: user._id,
        selectedDate: { $gte: start, $lte: end },
    };

    if (filter === "completed") query.isCompleted = true;
    if (filter === "pending") query.isCompleted = false;

    const tasks = await Task.find(query)
        .sort({ createdAt: -1 })
        .lean();

    /**
     * Convert MongoDB objects → plain JSON-safe objects
     */
    const serializedTasks = tasks.map((task) => ({
        taskId: task.taskId,
        title: task.title,
        description: task.description ?? "",
        isCompleted: task.isCompleted,
        selectedDate: task.selectedDate.toISOString(),
        createdAt: task.createdAt.toISOString(),
    }));

    return serializedTasks;
}

interface UpdateTaskInput {
    taskId: string;
    title: string;
    selectedDate: string;
}

export async function updateTask({
    taskId,
    title,
    selectedDate,
}: UpdateTaskInput) {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        throw new Error("Unauthorized");
    }

    await connectDB();

    const user = await User.findOne({ email: session.user.email });
    if (!user) throw new Error("User not found");

    const task = await Task.findOne({
        taskId,
        userId: user._id,
    });

    if (!task) {
        throw new Error("Task not found");
    }

    task.title = title;
    task.selectedDate = new Date(selectedDate);
    task.updatedAt = new Date();

    await task.save();
}

export async function deleteTask(taskId: string) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  await connectDB();

  const user = await User.findOne({ email: session.user.email });
  if (!user) {
    throw new Error("User not found");
  }

  const result = await Task.deleteOne({
    taskId,
    userId: user._id,
  });

  if (result.deletedCount === 0) {
    throw new Error("Task not found or already deleted");
  }
}

export async function toggleTaskStatus(taskId: string, isCompleted: boolean) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  await connectDB();

  const user = await User.findOne({ email: session.user.email });
  if (!user) {
    throw new Error("User not found");
  }

  const task = await Task.findOne({
    taskId,
    userId: user._id,
  });

  if (!task) {
    throw new Error("Task not found");
  }

  task.isCompleted = isCompleted;
  task.updatedAt = new Date();

  await task.save();
}