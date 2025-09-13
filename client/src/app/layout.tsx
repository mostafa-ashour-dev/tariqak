import type { Metadata } from "next";
import { Cairo, Tajawal } from "next/font/google";
import "./globals.css";
import TopNavbar from "@/components/navbars/top-navbar/TopNavbar";

const cairo = Cairo({ subsets: ["latin"], variable: "--font-cairo" });
const tajawal = Tajawal({ weight: ["500", "700", "800", "900", ], subsets: ["latin"], variable: "--font-tajawal" });


export const metadata: Metadata = {
  title: "طريقك - Tariqak",
  description: "كل اللي هتحتاجه لعربيتك هتلاقيه في تطبيق طريقك.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cairo.variable} ${tajawal.variable} antialiased`}>
        <TopNavbar />
        {children}
      </body>
    </html>
  );
}
