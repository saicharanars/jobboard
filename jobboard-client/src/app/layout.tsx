// app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/sharedcomponents/Header";
import Footer from "@/components/sharedcomponents/Footer";
import { AuthProvider } from "../lib/context/auth";
import AuthCheck from "@/components/sharedcomponents/Authcheck";
import {
  Home,
  MessageSquareIcon,
  Badge,
  FileIcon,
  SearchIcon,
  UserIcon,
  User2,
  SquareDashedKanban,
} from "lucide-react";
import Link from "next/link";
import Linkitem from "@/components/sharedcomponents/Linkitem";
import Navigation from "@/components/sharedcomponents/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
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
        <AuthProvider>
          <Header />
          <div className="h-full overflow-auto">
            <div className="grid grid-cols-5 grid-flow-col bg-[#E9EBFD] gap-2 pt-4">
              <AuthCheck redirect={false}>
                <div className="hidden md:block bg-[#E9EBFD]">
                  <Navigation />
                </div>
              </AuthCheck>
              {children}
            </div>
          </div>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
