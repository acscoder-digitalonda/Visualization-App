"use client";

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Play, Pause, Clock, Target, MessageCircle, Volume2 } from 'lucide-react';
import type { Visualization } from '@/lib/types/visualization';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AudioPlayer } from './audio-player';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase/client';

interface VisualizationListProps {
  visualizations: Visualization[];
}

export function VisualizationList({ visualizations: initialVisualizations }: VisualizationListProps) {
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const [visualizations, setVisualizations] = useState(initialVisualizations);

  useEffect(() => {
    // Check for audio link updates every 10 seconds
    const checkAudioLinks = async () => {
      const updatedVisualizations = await Promise.all(
        visualizations.map(async (visualization) => {
          if (visualization.audio_link) return visualization;

          const { data, error } = await supabase
            .from('AppSubmissions')
            .select('audio_link')
            .eq('id', visualization.id)
            .single();

          if (error) return visualization;

          if (data?.audio_link && !visualization.audio_link) {
            toast.success('Your meditation is ready!', {
              description: 'Click the play button to listen to your session.',
            });
            return { ...visualization, audio_link: data.audio_link };
          }

          return visualization;
        })
      );

      setVisualizations(updatedVisualizations);
    };

    const interval = setInterval(checkAudioLinks, 10000);
    return () => clearInterval(interval);
  }, [visualizations]);

  if (visualizations.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No visualizations yet</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {visualizations.map((visualization) => (
        <Card key={visualization.id} className="p-6 bg-[#1a1f36] border-white/10">
          <div className="flex items-start justify-between">
            <div className="space-y-4 flex-1">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Clock className="w-4 h-4" />
                {format(new Date(visualization.created_at), 'MMM d, yyyy')}
              </div>
              
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Target className="w-4 h-4" />
                    <span className="text-sm font-medium">Goal</span>
                  </div>
                  <p className="text-white">{visualization.client_goal}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-400">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Challenges</span>
                  </div>
                  <p className="text-white">{visualization.client_challenges}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Volume2 className="w-4 h-4" />
                    <span className="text-sm font-medium">Tone</span>
                  </div>
                  <p className="text-white">{visualization.tone}</p>
                </div>
              </div>
            </div>

            <div className="ml-6">
              {visualization.audio_link ? (
                <div className="flex items-center gap-4">
                  {playingAudio !== visualization.audio_link ? (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-12 w-12 rounded-full bg-[#7c4dff]/10 hover:bg-[#7c4dff]/20 text-[#7c4dff]"
                      onClick={() => setPlayingAudio(visualization.audio_link ?? null)}
                    >
                      <Play className="w-6 h-6" />
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-12 w-12 rounded-full bg-[#7c4dff] hover:bg-[#7c4dff]/80 text-white"
                        onClick={() => setPlayingAudio(null)}
                      >
                        <Pause className="w-6 h-6" />
                      </Button>
                      <AudioPlayer
                        url={visualization.audio_link}
                        onEnded={() => setPlayingAudio(null)}
                      />
                    </>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2 text-gray-400">
                  <div className="animate-pulse h-2 w-2 rounded-full bg-[#7c4dff]" />
                  Processing...
                </div>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}