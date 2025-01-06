"use client";

import { Button } from "@/components/ui/button";
import { Sparkles } from "./sparkles";
import { useRouter } from "next/navigation";
import { Sparkles as SparklesIcon } from "lucide-react";

export function ThankYouContent() {
  const router = useRouter();

  return (
    <div className="relative min-h-[60vh] flex flex-col items-center justify-center text-center space-y-8">
      <Sparkles />
      
      <div className="space-y-6 relative z-10">
        <div className="inline-block p-4 bg-[#7c4dff]/20 rounded-full mb-6">
          <SparklesIcon className="w-12 h-12 text-[#7c4dff]" />
        </div>
        
        <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text animate-gradient">
          Thank You!
        </h1>
        
        <p className="text-xl text-gray-300 max-w-md mx-auto">
          Your session has been created. We're preparing your personalized experience.
        </p>

        <div className="relative w-full max-w-md mx-auto aspect-video rounded-lg overflow-hidden mt-8">
          <iframe
            src="https://player.vimeo.com/video/718009320?autoplay=1&loop=1&background=1&muted=1"
            allow="autoplay; fullscreen; picture-in-picture"
            className="absolute top-0 left-0 w-full h-full"
            frameBorder="0"
          />
          <div className="absolute inset-0 bg-[#7c4dff]/10" />
        </div>
      </div>

      <div className="space-y-4 relative z-10">
        <Button
          onClick={() => router.push("/app")}
          className="w-full h-14 text-lg bg-[#7c4dff] hover:bg-[#651fff] transition-colors"
        >
          Go to Dashboard
        </Button>
        
       
      </div>
    </div>
  );
}