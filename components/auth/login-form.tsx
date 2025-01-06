"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SocialAuth } from "./social-auth";
import Link from "next/link";
import { authService } from "@/lib/auth/auth-service";
import { toast } from "sonner";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await authService.signIn({
        email: formData.email,
        password: formData.password,
      });
      
      // Get the return URL from query params or default to /app
      const returnUrl = searchParams.get("returnUrl") || "/app";
      router.replace(returnUrl);
    } catch (error) {
      toast.error("Failed to sign in. Please check your credentials.");
      console.error("Sign in error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Sign in
        </h1>
        <p className="text-xl text-gray-300">
          You&apos;ll be able to save your progress and record your completed sessions.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="h-14 bg-[#7c4dff]/10 border-none text-white placeholder:text-gray-400"
            disabled={isLoading}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="h-14 bg-[#7c4dff]/10 border-none text-white placeholder:text-gray-400"
            disabled={isLoading}
            required
          />
        </div>

        <Link 
          href="/auth/forgot-password" 
          className="block text-[#7c4dff] hover:text-[#651fff]"
        >
          Forgot your password?
        </Link>

        <Button 
          type="submit"
          className="w-full h-14 text-lg bg-[#7c4dff] hover:bg-[#651fff] transition-colors"
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-700" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-[#1a1f36] text-gray-400">or</span>
        </div>
      </div>

      <SocialAuth />

      <div className="text-center">
        <p className="text-gray-400">
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="text-[#7c4dff] hover:text-[#651fff]">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}