"use client";

import { useSession } from "next-auth/react";

export function UserBadge() {
  const { data: session } = useSession();

  if (!session?.user) return null;

  return (
    <div className="flex items-center gap-2">
      <img
        src={session.user.image || "/avatar.png"}
        alt="User"
        className="h-8 w-8 rounded-full"
      />
      <span className="text-sm font-medium">
        {session.user.name}
      </span>
    </div>
  );
}
