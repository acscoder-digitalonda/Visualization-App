"use client";

import { ReactNode } from "react";
import { useAuthRedirect } from "@/lib/hooks/use-auth-redirect";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const { loading } = useAuthRedirect();

  if (loading) {
    return null;
  }

  return children;
}