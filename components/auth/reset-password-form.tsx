"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export function ResetPasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) throw error;
      
      toast.success("Password updated successfully");
      router.push("/auth/login");
    } catch (error) {
      toast.error("Failed to update password. Please try again.");
      console.error("Update password error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Set new password</h1>
        <p className="text-xl text-gray-300">
          Please enter your new password below.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <Input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-14 bg-[#7c4dff]/10 border-none text-white placeholder:text-gray-400"
            disabled={isLoading}
            required
            minLength={6}
          />
          <Input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="h-14 bg-[#7c4dff]/10 border-none text-white placeholder:text-gray-400"
            disabled={isLoading}
            required
            minLength={6}
          />
        </div>

        <Button 
          type="submit"
          className="w-full h-14 text-lg bg-[#7c4dff] hover:bg-[#651fff] transition-colors"
          disabled={isLoading}
        >
          {isLoading ? "Updating password..." : "Update password"}
        </Button>
      </form>
    </div>
  );
}