import { AcmeFont } from "@/styles/fonts";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
}

export default function Logo({ className }: LogoProps) {
  return (
    <div className={clsx("mt-4", className)}>
      <Link href="/">
        <Image src="/assets/logo.png" alt="Logo" width={52} height={52} />
        <span className={clsx("text-2xl text-primary-400", AcmeFont.className)}>
          Monsttle
        </span>
      </Link>
    </div>
  );
}
