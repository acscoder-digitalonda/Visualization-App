"use client";

import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";

interface PricingCardProps {
  name: string;
  price: string;
  period: string;
  pricePerDay: string;
  features: string[];
  popular?: boolean;
  trial?: string;
}

export function PricingCard({
  name,
  price,
  period,
  pricePerDay,
  features,
  popular,
  trial,
}: PricingCardProps) {
  const router = useRouter();

  return (
    <div className={`relative rounded-xl p-6 ${
      popular 
        ? "bg-[#7c4dff]/20 border-2 border-[#7c4dff]" 
        : "bg-[#7c4dff]/10"
    }`}>
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-[#7c4dff] text-white px-3 py-1 rounded-full text-sm">
            Most popular
          </span>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold">{name}</h3>
          {trial && (
            <p className="text-[#7c4dff] font-medium">{trial}</p>
          )}
        </div>

        <div className="space-y-1">
          <div className="text-3xl font-bold">{price}</div>
          <div className="text-gray-400">{period}</div>
          <div className="text-sm text-[#7c4dff] font-medium">{pricePerDay}</div>
        </div>

        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-3 text-gray-300">
              <Check className="w-5 h-5 text-[#7c4dff]" />
              {feature}
            </li>
          ))}
        </ul>

        <Button
          className={`w-full h-12 ${
            popular
              ? "bg-[#7c4dff] hover:bg-[#651fff]"
              : "bg-white/10 hover:bg-white/20"
          } transition-colors`}
          onClick={() => router.push("/auth/register")}
        >
          Get started
        </Button>
      </div>
    </div>
  );
}