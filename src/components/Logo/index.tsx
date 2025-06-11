import { AcmeFont } from "@/styles/fonts";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
}

export default function Logo({ className }: LogoProps) {
  return (
    <div className={clsx("flex items-end justify-center", className)}>
      <Link href="/" className="flex items-end justify-center gap-2 w-fit">
        <Image src="/assets/logo.png" alt="Logo" width={48} height={48} />
        <span
          className={clsx(
            "text-4xl bg-gradient-to-r from-orange-400 via-primary-500 to-pink-500 bg-clip-text text-transparent",
            AcmeFont.className
          )}
        >
          Monsttle
        </span>
      </Link>
    </div>
  );
}
