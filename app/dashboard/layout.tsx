'use client'
import { useState } from "react";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import { navbarOptions } from "../lib/navConstants";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isNavOpen, setNavOpen] = useState<boolean>(false)
  const toggleNav = () => { setNavOpen(!isNavOpen) }

  return (
    <div className="flex flex-col h-dvh">
      <Header isNavOpen={isNavOpen} toggleNav={toggleNav}/>
      <div className="flex w-full h-dvh pt-16">
        <NavBar isNavOpen={isNavOpen} options={navbarOptions}/>  
        <main className={`${isNavOpen ? 'hidden' : 'block'} grow`}>{children}</main>
      </div>
    </div>
  );
}
