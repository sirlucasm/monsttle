"use client";

import { GameProvider } from "@/contexts/game";
import { HeroUIProvider } from "@heroui/react";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <GameProvider>{children}</GameProvider>
      <Toaster position="top-center" visibleToasts={7} richColors />
    </HeroUIProvider>
  );
}
