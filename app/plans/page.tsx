"use client";

import { PricingPlans } from "@/components/pricing/pricing-plans";
import { AuthLayout } from "@/components/auth/auth-layout";

export default function PlansPage() {
  return (
    <AuthLayout>
      <PricingPlans />
    </AuthLayout>
  );
}