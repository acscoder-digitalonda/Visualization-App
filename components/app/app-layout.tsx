"use client";

import { ReactNode } from "react";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <main className="min-h-screen bg-[#1a1f36] text-white p-8">
      <div className="max-w-2xl mx-auto space-y-12 pt-12">
        {children}
      </div>
    </main>
  );
}