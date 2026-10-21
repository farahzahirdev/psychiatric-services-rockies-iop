import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FAVICON, SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${SITE_NAME} | Adult Intensive Outpatient Program (IOP)`,
  description:
    "Build skills, manage life, and feel more you. Our Adult Intensive Outpatient Program (IOP) in Fort Collins offers structured, DBT-focused support while you keep work, school, and family life going.",
  icons: {
    icon: FAVICON,
    shortcut: FAVICON,
    apple: FAVICON,
  },
  keywords: [
    "Adult IOP Fort Collins",
    "Intensive Outpatient Program",
    "DBT IOP",
    "Psychiatric Services of the Rockies",
    "mental health Fort Collins",
    "Dialectical Behavior Therapy",
  ],
  openGraph: {
    title: `${SITE_NAME} | Adult IOP`,
    description:
      "Structured, supportive Adult IOP focused on practical skills for emotions, relationships, and a more balanced life.",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
