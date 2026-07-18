import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PATHWAY — Build the career you deserve",
  description: "AI-powered, ATS-friendly resumes built around your career pathway.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
