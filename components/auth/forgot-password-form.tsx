"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase/client";
import Link from "next/link";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) throw error;
      
      setIsSubmitted(true);
      toast.success("Password reset instructions sent to your email");
    } catch (error) {
      toast.error("Failed to send reset instructions. Please try again.");
      console.error("Reset password error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Check your email</h1>
          <p className="text-xl text-gray-300">
            We&apos;ve sent password reset instructions to {email}
          </p>
        </div>

        <div className="space-y-4">
          <Link href="/auth/login">
            <Button 
              className="w-full h-14 text-lg bg-[#7c4dff] hover:bg-[#651fff] transition-colors"
            >
              Back to Sign in
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Reset password</h1>
        <p className="text-xl text-gray-300">
          Enter your email address and we&apos;ll send you instructions to reset your password.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-14 bg-[#7c4dff]/10 border-none text-white placeholder:text-gray-400"
          disabled={isLoading}
          required
        />

        <Button 
          type="submit"
          className="w-full h-14 text-lg bg-[#7c4dff] hover:bg-[#651fff] transition-colors"
          disabled={isLoading}
        >
          {isLoading ? "Sending instructions..." : "Send instructions"}
        </Button>

        <Link 
          href="/auth/login"
          className="block text-center text-[#7c4dff] hover:text-[#651fff]"
        >
          Back to Sign in
        </Link>
      </form>
    </div>
  );
}