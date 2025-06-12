import { AcmeFont } from "@/styles/fonts";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function Logo({ className, size = "md" }: LogoProps) {
  const textSize = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-4xl",
  }[size];

  const imageSize = {
    sm: {
      width: 24,
      height: 24,
    },
    md: {
      width: 32,
      height: 32,
    },
    lg: {
      width: 48,
      height: 48,
    },
  }[size];

  return (
    <div className={clsx("flex items-end justify-center", className)}>
      <Link href="/" className="flex items-end justify-center gap-2 w-fit">
        <Image
          src="/assets/logo.png"
          alt="Logo"
          width={imageSize.width}
          height={imageSize.height}
        />
        <span
          className={clsx(
            textSize,
            "bg-gradient-to-r from-orange-400 via-primary-500 to-pink-500 bg-clip-text text-transparent",
            AcmeFont.className
          )}
        >
          Monsttle
        </span>
      </Link>
    </div>
  );
}
