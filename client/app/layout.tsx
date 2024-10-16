import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import State from "@/app/Context/State";

const inter = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Sight Shark Portal",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <State>{children}</State>
      </body>
    </html>
  );
}
