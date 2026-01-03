"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() =>
        signOut({
          callbackUrl: "/", // 👈 force clean redirect
        })
      }
      className="w-full rounded px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
    >
      Logout
    </button>
  );
}
