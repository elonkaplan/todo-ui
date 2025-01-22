import "./globals.css";

import type { Metadata, Viewport } from "next";

import Image from "next/image";
import { Inter } from "next/font/google";
import { LogoutButton } from "@/components/LogoutButton";
import { cookies } from "next/headers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Todo App",
  description: "A simple todo app",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();

  const hasAccessToken = cookieStore.has("access_token");

  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <header className="pt-[72px] pb-20 bg-background2">
          <div className="px-4 flex items-center justify-center flex-col mx-auto max-w-screen-md">
            {hasAccessToken && <LogoutButton className="block mb-3 ml-auto" />}

            <h1 className="flex items-center font-black text-5xl gap-3">
              <Image src="/rocket.svg" width={22} height={36} alt="Logo" />
              <span>
                <span className="text-logo1">Todo</span>{" "}
                <span className="text-logo2">App</span>
              </span>
            </h1>
          </div>
        </header>
        <main className="max-w-screen-md px-4 pb-[72px] mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
