"use client";

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function VisualizationHeader() {
  const router = useRouter();

  return (
    <div className="flex justify-between items-center">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Your Sessions</h1>
        <p className="text-gray-400">Listen to your personalized meditations</p>
      </div>
      <Button
        onClick={() => router.push('/app')}
        className="h-12 px-6 bg-[#7c4dff] hover:bg-[#651fff] transition-colors flex items-center gap-2"
      >
        <Plus className="w-5 h-5" />
        New Session
      </Button>
    </div>
  );
}