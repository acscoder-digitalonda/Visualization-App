"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#1a1f36] text-white p-8">
      <div className="max-w-md mx-auto space-y-8 pt-12">
        <button 
          onClick={() => router.back()} 
          className="absolute right-6 top-6 text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>
        {children}
      </div>
    </main>
  );
}