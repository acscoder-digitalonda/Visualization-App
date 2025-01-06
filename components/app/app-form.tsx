"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useUser } from "@/lib/hooks/use-user";
import { createVisualization } from "@/lib/api/visualization";
import { getCookie } from "@/lib/utils/cookies";

interface FormData {
  goal: string;
  challenges: string;
  tone: string;
}

export function AppForm() {
  const router = useRouter();
  const { user, loading } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>(() => {
    const quizSelections = getCookie('userQuizSelections');
    return {
      goal: quizSelections?.Goal || "",
      challenges: "",
      tone: "",
    };
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user?.id) {
      toast.error("Please sign in to submit the form");
      router.push("/auth/login");
      return;
    }

    setIsLoading(true);

    try {
      const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_URL;
      const webhookPassword = process.env.NEXT_PUBLIC_WEBHOOK_PASSWORD;

      if (!webhookUrl || !webhookPassword) {
        throw new Error("Webhook configuration is missing");
      }

      // Create visualization in Supabase first
      const visualization = await createVisualization({
        user_id: user.id,
        ...formData
      });

      // Send to webhook with visualization ID
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Basic ${btoa(`:${webhookPassword}`)}`,
        },
        body: JSON.stringify({
          ...formData,
          userId: user.id,
          userEmail: user.email,
          name: user.user_metadata?.name || user.email?.split('@')[0] || 'User',
          submissionId: visualization.id // Include the visualization ID
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      toast.success("Session created successfully!");
      router.push("/app/thank-you");
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Failed to create session. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return null;
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Own Your Vision</h1>
        <p className="text-xl text-gray-300">
         Answer the 3 question survey below with any goal you would like to achieve and receive a personalized visualization meditation in your inbox in less than 3 minutes.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="goal" className="text-sm text-gray-300">
              Current Goal
            </label>
            <Textarea
              id="goal"
              value={formData.goal}
              onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
              className="min-h-[100px] bg-[#7c4dff]/10 border-none text-white placeholder:text-gray-400"
              placeholder="What is one life-changing goal you'd like to achieve?"
              disabled={isLoading}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="challenges" className="text-sm text-gray-300">
              Challenges You're Facing
            </label>
            <Textarea
              id="challenges"
              value={formData.challenges}
              onChange={(e) => setFormData({ ...formData, challenges: e.target.value })}
              className="min-h-[100px] bg-[#7c4dff]/10 border-none text-white placeholder:text-gray-400"
              placeholder="What's been the biggest roadblock in achieving your goal so far?"
              disabled={isLoading}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="tone" className="text-sm text-gray-300">
              What tone do you respond best to?
            </label>
            <Select
              value={formData.tone}
              onValueChange={(value) => setFormData({ ...formData, tone: value })}
              disabled={isLoading}
              required
            >
              <SelectTrigger className="h-14 bg-[#7c4dff]/10 border-none text-white">
                <SelectValue placeholder="Select a tone" />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1f36] border-none text-white">
                <SelectItem value="Calm and Grounding">Calm and Grounding</SelectItem>
                <SelectItem value="Encouraging and Uplifting">Encouraging and Uplifting</SelectItem>
                <SelectItem value="Empowering and Confident">Empowering and Confident</SelectItem>
                <SelectItem value="Reflective and Meditative">Reflective and Meditative</SelectItem>
                <SelectItem value="Dynamic and Energizing">Dynamic and Energizing</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full h-14 text-lg bg-[#7c4dff] hover:bg-[#651fff] transition-colors"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </div>
  );
}