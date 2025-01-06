"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/hooks/use-user";
import { getUserVisualizations } from "@/lib/api/visualization";
import { AppForm } from "@/components/app/app-form";
import { AppLayout } from "@/components/app/app-layout";
import { toast } from "sonner";

export default function AppPage() {
  const router = useRouter();
  const { user, loading: userLoading } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkVisualizations() {
      if (!user?.id) return;

      try {
        const visualizations = await getUserVisualizations(user.id);
        if (visualizations.length > 0) {
          router.replace("/app/visualizations");
        }
      } catch (error) {
        console.error("Failed to check visualizations:", error);
        toast.error("Failed to load your data");
      } finally {
        setLoading(false);
      }
    }

    if (!userLoading) {
      checkVisualizations();
    }
  }, [user?.id, userLoading, router]);

  if (userLoading || loading) {
    return (
      <AppLayout>
        <div className="min-h-[400px] flex items-center justify-center">
          <div className="text-gray-400">Loading...</div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <AppForm />
    </AppLayout>
  );
}