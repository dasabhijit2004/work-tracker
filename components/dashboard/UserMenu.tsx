"use client";

import { useState } from "react";
import LogoutButton from "../LogoutButton";

export default function UserMenu({ user }: { user: any }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-3 w-full"
      >
        <img
          src={user.image || "/avatar.png"}
          className="h-8 w-8 rounded-full"
        />
        <span className="text-sm font-medium">{user.name}</span>
      </button>

      {open && (
        <div className="absolute bottom-12 left-0 w-full rounded-lg border bg-white shadow-md">
          <div className="p-3 text-sm text-gray-600">
            {user.email}
          </div>
          <div className="border-t p-2">
            <LogoutButton />
          </div>
        </div>
      )}
    </div>
  );
}
