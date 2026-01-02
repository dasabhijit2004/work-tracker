import CalendarPicker from "./CalendarPicker";
import UserMenu from "./UserMenu";

export default function Sidebar({ user }: { user: any }) {
  return (
    <aside className="w-72 border-r bg-white hidden md:flex flex-col">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold">Work Tracker</h1>
      </div>

      <div className="p-4">
        <CalendarPicker />
      </div>

      <div className="mt-auto p-4 border-t">
        <UserMenu user={user} />
      </div>
    </aside>
  );
}
