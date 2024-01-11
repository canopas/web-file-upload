import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "../../dist/style.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "React file upload management",
  description:
    "A file management system, allows for single and multiple file uploading with a preview feature",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
