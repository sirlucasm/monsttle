import type { Metadata } from "next";
import "./globals.css";
import { PoppinsFont } from "@/styles/fonts";
import clsx from "clsx";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Monsttle: The monster creator",
  description: "Create and battle your monsters",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx(PoppinsFont.className)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
