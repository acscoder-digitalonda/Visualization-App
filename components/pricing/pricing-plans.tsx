"use client";

import { PricingCard } from "./pricing-card";
import { Check } from "lucide-react";

const plans = [
  {
    name: "1 Week",
    price: "$4.99",
    period: "per week",
    pricePerDay: "$0.71 per day",
    features: [
      "200+ meditations",
      "Special techniques",
      "Weekly new content",
      "Cancel anytime",
    ],
  },
  {
    name: "1 Month",
    price: "$17.99",
    period: "per month",
    pricePerDay: "$0.59 per day",
    features: [
      "Everything in Weekly",
      "Priority support",
      "Personalized plan",
      "Progress tracking",
    ],
    popular: true,
    trial: "7 days free",
  },
  {
    name: "3 Months",
    price: "$29.99",
    period: "per 3 months",
    pricePerDay: "$0.33 per day",
    features: [
      "Everything in Monthly",
      "Best value",
      "Advanced features",
      "Personal meditation coach",
    ],
  },
];

export function PricingPlans() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Choose your plan</h1>
        <p className="text-xl text-gray-300">
          Select the perfect plan for your meditation journey
        </p>
      </div>

      <div className="grid gap-6">
        {plans.map((plan) => (
          <PricingCard key={plan.name} {...plan} />
        ))}
      </div>

      <div className="mt-8 p-6 rounded-xl bg-[#7c4dff]/10 space-y-4">
        <div className="flex items-center gap-3">
          <div className="text-[#7c4dff]">👥</div>
          <p className="text-lg font-medium">15+ Million users</p>
        </div>
        <p className="text-gray-300">
          People using our app for 3 months achieve twice the results compared to 1 month*
        </p>
        <p className="text-sm text-gray-400">*According to user research, 2023</p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">All plans include:</h2>
        <ul className="space-y-3">
          {[
            "200+ meditations, special techniques to increase efficiency",
            "New content is added every week",
            "Cancel anytime, no questions asked",
          ].map((feature, index) => (
            <li key={index} className="flex items-center gap-3 text-gray-300">
              <Check className="w-5 h-5 text-[#7c4dff]" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}