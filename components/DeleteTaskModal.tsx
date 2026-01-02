"use client";

type Props = {
  onConfirm: () => void;
  onCancel: () => void;
};

export default function DeleteTaskModal({ onConfirm, onCancel }: Props) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="w-full max-w-sm rounded-lg bg-white p-6 space-y-4">
        <h2 className="text-lg font-semibold">Delete Task</h2>
        <p className="text-sm text-gray-600">
          Are you sure you want to delete this task? This action cannot be undone.
        </p>

        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="rounded border px-4 py-2"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="rounded bg-red-600 px-4 py-2 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
