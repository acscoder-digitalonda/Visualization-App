"use client";

import { useEffect, useState } from "react";

interface Sparkle {
  id: number;
  size: number;
  style: {
    top: string;
    left: string;
    animation: string;
  };
}

export function Sparkles() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    const colors = ["#FFD700", "#FFA500", "#FF69B4", "#00CED1"];
    const newSparkles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      size: Math.random() * 4 + 1,
      style: {
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animation: `sparkle ${Math.random() * 2 + 1}s linear infinite ${Math.random() * 2}s`,
      },
    }));
    setSparkles(newSparkles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none">
      <style jsx global>{`
        @keyframes sparkle {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 0;
          }
          50% {
            transform: scale(1) rotate(180deg);
            opacity: 1;
          }
          100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute"
          style={{
            ...sparkle.style,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            background: "#FFD700",
            borderRadius: "50%",
            boxShadow: "0 0 4px #FFD700",
          }}
        />
      ))}
    </div>
  );
}