import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.scss";
import CommandBar from "./components/CommandBar";
import Footer from "./components/Footer";

const workSans = Work_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "bit",
  description: "Innovate, don't complicate.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={workSans.className}>
        <CommandBar>{children}</CommandBar>
        <Footer />
      </body>
    </html>
  );
}
