import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "./components/AuthProvider";
import TopLoadingBar from "./components/TopLoadingBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ACCB",
  description: "Gerenciador do projeto ACCB",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <AuthProvider>
        <body className={inter.className}>
          <TopLoadingBar/>
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
