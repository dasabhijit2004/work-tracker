import LogoutButton from "./LogoutButton";

export default function Navbar({ user }: { user: any }) {
  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b">
      <h2 className="text-xl font-semibold">To-Do App</h2>

      <div className="flex items-center gap-4">
        <span>{user?.email}</span>
        <LogoutButton />
      </div>
    </nav>
  );
}
