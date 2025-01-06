"use client";

import { useEffect, useState } from 'react';
import { useUser } from '@/lib/hooks/use-user';
import { getUserVisualizations } from '@/lib/api/visualization';
import type { Visualization } from '@/lib/types/visualization';
import { VisualizationList } from '@/components/app/visualization/visualization-list';
import { VisualizationHeader } from '@/components/app/visualization/visualization-header';
import { toast } from 'sonner';

export default function VisualizationsPage() {
  const { user } = useUser();
  const [visualizations, setVisualizations] = useState<Visualization[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadVisualizations() {
      if (!user?.id) return;

      try {
        const data = await getUserVisualizations(user.id);
        setVisualizations(data);
      } catch (error) {
        console.error('Failed to load visualizations:', error);
        toast.error('Failed to load visualizations');
      } finally {
        setLoading(false);
      }
    }

    loadVisualizations();
  }, [user?.id]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex items-center gap-2 text-gray-400">
          <div className="animate-pulse h-2 w-2 rounded-full bg-[#7c4dff]" />
          Loading...
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#1a1f36] text-white">
      <div className="max-w-6xl mx-auto px-4 py-12 space-y-8">
        <VisualizationHeader />
        <VisualizationList visualizations={visualizations} />
      </div>
    </main>
  );
}