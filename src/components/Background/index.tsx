"use client";

import { SwordsIcon } from "lucide-react";
import { memo } from "react";

export const Background = memo(function Background() {
  return (
    <>
      {/* Animated background elements */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary-700 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-primary-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 left-40 w-72 h-72 bg-orange-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Floating stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <SwordsIcon
            key={i}
            className={`absolute text-yellow-400 opacity-35 animate-pulse`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              fontSize: `${Math.random() * 16 + 12}px`,
            }}
            size={Math.random() * 48}
          />
        ))}
      </div>
    </>
  );
});
