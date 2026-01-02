"use client";

import { useSession } from "better-auth/react";

export function UserBadge() {
  const { data: session } = useSession();

  return <span>{session?.user?.name}</span>;
}
