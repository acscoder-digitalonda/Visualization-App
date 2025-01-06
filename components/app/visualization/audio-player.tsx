"use client";

interface AudioPlayerProps {
  url: string;
  onEnded: () => void;
}

export function AudioPlayer({ url, onEnded }: AudioPlayerProps) {
  return (
    <audio
      src={url}
      autoPlay
      controls
      onEnded={onEnded}
      className="h-12 rounded-lg bg-[#7c4dff]/10"
    />
  );
}