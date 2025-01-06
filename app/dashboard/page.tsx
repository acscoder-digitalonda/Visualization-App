"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/auth/login");
        return;
      }
      setUser(user);
    };

    checkUser();
  }, [router]);

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#1a1f36] text-white p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
          <Button
            onClick={() => router.push("/app")}
            className="bg-[#7c4dff] hover:bg-[#651fff] transition-colors"
          >
            Create New Session
          </Button>
        </div>

        <div className="grid gap-6">
          <div className="bg-white/5 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Welcome back!</h2>
            <p className="text-gray-300">
              Start creating your personalized sessions or continue where you left off.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}