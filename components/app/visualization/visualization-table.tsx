import { format } from 'date-fns';
import { Play } from 'lucide-react';
import type { Visualization } from '@/lib/types/visualization';
import { Button } from '@/components/ui/button';
import { AudioPlayer } from './audio-player';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface VisualizationTableProps {
  visualizations: Visualization[];
  playingAudio: string | null;
  onPlayAudio: (audioUrl: string | null) => void;
}

export function VisualizationTable({ 
  visualizations, 
  playingAudio, 
  onPlayAudio 
}: VisualizationTableProps) {
  return (
    <div className="rounded-lg border border-white/10 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Goal</TableHead>
            <TableHead>Challenges</TableHead>
            <TableHead>Tone</TableHead>
            <TableHead>Audio</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {visualizations.map((visualization) => (
            <TableRow key={visualization.id}>
              <TableCell className="font-medium">
                {format(new Date(visualization.created_at), 'MMM d, yyyy')}
              </TableCell>
              <TableCell>{visualization.client_goal}</TableCell>
              <TableCell>{visualization.client_challenges}</TableCell>
              <TableCell>{visualization.tone}</TableCell>
              <TableCell>
                {visualization.audio_url ? (
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onPlayAudio(
                        playingAudio === visualization.audio_url 
                          ? null 
                          : visualization.audio_url!
                      )}
                    >
                      <Play className="w-4 h-4" />
                    </Button>
                    {playingAudio === visualization.audio_url && (
                      <AudioPlayer
                        url={visualization.audio_url}
                        onEnded={() => onPlayAudio(null)}
                      />
                    )}
                  </div>
                ) : (
                  <span className="text-gray-400">Processing...</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}