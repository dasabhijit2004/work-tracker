export default function TaskSkeleton() {
  return (
    <div className="space-y-3 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="rounded-lg border p-4 flex justify-between"
        >
          <div className="space-y-2 w-full">
            <div className="h-4 w-3/4 bg-gray-200 rounded" />
            <div className="h-3 w-1/3 bg-gray-200 rounded" />
          </div>
          <div className="h-4 w-4 bg-gray-200 rounded" />
        </div>
      ))}
    </div>
  );
}
