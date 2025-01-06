"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { authService } from "@/lib/auth/auth-service";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

export function DashboardNav() {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await authService.signOut();
      router.push("/");
    } catch (error) {
      toast.error("Failed to sign out");
      console.error("Sign out error:", error);
    }
  };

  return (
    <nav className="border-b border-white/10">
      <div className="max-w-4xl mx-auto px-8 h-16 flex items-center justify-between">
        <div className="text-xl font-semibold">Mo</div>
        <Button
          variant="ghost"
          className="text-gray-300 hover:text-white"
          onClick={handleSignOut}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign out
        </Button>
      </div>
    </nav>
  );
}