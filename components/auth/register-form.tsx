"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SocialAuth } from "./social-auth";
import Link from "next/link";
import { authService } from "@/lib/auth/auth-service";
import { toast } from "sonner";

export function RegisterForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await authService.signUp(formData);
      toast.success("Account created successfully!");
      router.push("/dashboard");
    } catch (error) {
      toast.error("Failed to create account. Please try again.");
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Create an account
        </h1>
        <p className="text-xl text-gray-300">
          You&apos;ll be able to save your progress and record your completed sessions.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Your name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="h-14 bg-[#7c4dff]/10 border-none text-white placeholder:text-gray-400"
            disabled={isLoading}
            required
          />
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

        <Button 
          type="submit"
          className="w-full h-14 text-lg bg-[#7c4dff] hover:bg-[#651fff] transition-colors"
          disabled={isLoading}
        >
          {isLoading ? "Creating account..." : "Sign up"}
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
          Already have an account?{" "}
          <Link href="/auth/login" className="text-[#7c4dff] hover:text-[#651fff]">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}