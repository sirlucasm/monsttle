import { Poppins, Acme } from "next/font/google";

export const PoppinsFont = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const AcmeFont = Acme({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
});
