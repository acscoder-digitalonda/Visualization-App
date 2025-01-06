"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from "@/components/ui/carousel";
import { Mic, Sparkles, Wind } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [carouselApi, setCarouselApi] = useState<any>(null);

  const slides = [
    {
      icon: Wind,
      title: "Peaceful Sleep",
      description: "Drift away with calming sounds",
      color: "blue",
    },
    {
      icon: Sparkles,
      title: "Dream Better",
      description: "Enhance your sleep quality",
      color: "green",
    },
    {
      icon: Mic,
      title: "Guided Relaxation",
      description: "Let us guide your journey",
      color: "red",
    },
  ];

  useEffect(() => {
    if (!carouselApi) {
      return;
    }

    carouselApi.on("select", () => {
      setCurrentSlide(carouselApi.selectedScrollSnap());
    });
  }, [carouselApi]);

  const handleDotClick = (index: number) => {
    if (carouselApi) {
      carouselApi.scrollTo(index);
    }
  };

  return (
    <main className="min-h-screen bg-[#1a1f36] text-white flex flex-col items-center justify-center p-4 space-y-12 relative overflow-hidden">
     

      {/* Main content */}
      <div className="max-w-4xl w-full space-y-16 z-10">
        {/* Card Carousel */}
        <div className="relative">
          <Carousel 
            className="w-full max-w-xl mx-auto"
            setApi={setCarouselApi}
          >
            <CarouselContent>
              {slides.map((slide, index) => (
                <CarouselItem key={index}>
                  <Card className={`bg-[#2196f3]/10 border-none p-8 aspect-[3/4] flex flex-col items-center justify-center text-center`}>
                    <slide.icon className={`w-16 h-16 mb-4 ${
                      slide.color === "blue" ? "text-blue-400" :
                      slide.color === "green" ? "text-green-400" :
                      "text-red-400"
                    }`} />
                    <h3 className="text-xl font-medium mb-2">{slide.title}</h3>
                    <p className={`${
                      slide.color === "blue" ? "text-blue-200/80" :
                      slide.color === "green" ? "text-green-200/80" :
                      "text-red-200/80"
                    }`}>{slide.description}</p>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          
          {/* Carousel dots */}
          <div className="flex justify-center gap-2 mt-4">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  currentSlide === index 
                    ? "bg-[#7c4dff] w-8" 
                    : "bg-[#7c4dff]/30 w-4"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Welcome Text */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold tracking-tight">Own Your Vision</h1>
          <p className="text-xl text-gray-300">
            We will ask you a few questions to personalize your experience.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 w-full max-w-md mx-auto">
          <Button 
            className="w-full h-14 text-lg bg-[#7c4dff] hover:bg-[#651fff] transition-colors"
            onClick={() => router.push("/quiz")}
          >
            Get started
          </Button>
          <div className="text-center">
            <span className="text-gray-400">Already have an account? </span>
            <Link href="/auth/login" className="text-[#7c4dff] hover:text-[#651fff]">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}