"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "./use-user";

export function useAuthRedirect(redirectTo: string = "/auth/login") {
  const router = useRouter();
  const { user, loading } = useUser();

  useEffect(() => {
    if (!loading && !user) {
      router.replace(redirectTo);
    }
  }, [user, loading, router, redirectTo]);

  return { user, loading };
}