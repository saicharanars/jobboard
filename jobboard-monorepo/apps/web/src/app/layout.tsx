// src/app/layout.tsx
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/sharedcomponents/Header";
import Footer from "@/components/sharedcomponents/Footer";
import { AuthProvider } from "../lib/context/auth";
import localFont from "next/font/local";
import { LayoutComponents } from "@/components/sharedcomponents/LayoutComponents";

const inter = Inter({ subsets: ["latin"] });

const myFont = localFont({
  src: "./Clash.woff2",
  display: "swap",
  variable: "--font-clash",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${myFont.variable} h-full`}>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <LayoutComponents>{children}</LayoutComponents>

            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
