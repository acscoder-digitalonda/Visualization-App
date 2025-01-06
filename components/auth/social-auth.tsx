"use client";

import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase/client";
import { toast } from "sonner";

export function SocialAuth() {
  const handleGoogleSignIn = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (error) throw error;
      
      // The redirect will happen automatically
      toast.success("Redirecting to Google...");
    } catch (error) {
      toast.error("Failed to sign in with Google");
      console.error("Google sign in error:", error);
    }
  };

  return (
    <div className="flex justify-center">
      <Button
        variant="outline"
        className="w-14 h-14 rounded-full bg-white p-0 hover:bg-gray-50"
        onClick={handleGoogleSignIn}
      >
        <img src="/google-logo.svg" alt="Google" className="w-6 h-6" />
      </Button>
    </div>
  );
}