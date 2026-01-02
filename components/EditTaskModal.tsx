"use client";

import { useState } from "react";
import { updateTask } from "@/actions/task.actions";

type Props = {
    task: {
        taskId: string;
        title: string;
        selectedDate: string;
    };
    onClose: () => void;
    onOptimisticUpdate: (title: string, date: string) => void;
};

export default function EditTaskModal({
    task,
    onClose,
    onOptimisticUpdate,
}: Props) {
    const [title, setTitle] = useState(task.title);
    const [date, setDate] = useState(
        new Date(task.selectedDate).toISOString().slice(0, 10)
    );
    const [loading, setLoading] = useState(false);

    async function handleSave() {
        setLoading(true);

        // Optimistic UI update
        onOptimisticUpdate(title, date);

        await updateTask({
            taskId: task.taskId,
            title,
            selectedDate: date,
        });

        setLoading(false);
        onClose();
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div className="w-full max-w-md rounded-lg bg-white p-6 space-y-4">
                <h2 className="text-lg font-semibold">Edit Task</h2>

                <input
                    className="w-full rounded border px-3 py-2"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <input
                    type="date"
                    className="w-full rounded border px-3 py-2"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />

                <div className="flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="rounded border px-4 py-2"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="rounded bg-black px-4 py-2 text-white"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}
