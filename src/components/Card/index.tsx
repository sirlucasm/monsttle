import clsx from "clsx";
import { forwardRef } from "react";

export const Card = forwardRef<
  HTMLDivElement,
  { children: React.ReactNode; className?: string }
>(({ children, className }, ref) => {
  return (
    <div
      ref={ref}
      className={clsx(
        "bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 shadow-2xl p-8 flex flex-col gap-8",
        className
      )}
    >
      {children}
    </div>
  );
});
