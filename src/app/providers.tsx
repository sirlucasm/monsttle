"use client";

import { HeroUIProvider } from "@heroui/react";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      {children}
      <Toaster position="top-center" visibleToasts={7} richColors />
    </HeroUIProvider>
  );
}
