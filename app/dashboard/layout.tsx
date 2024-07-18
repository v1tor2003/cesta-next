'use client'
import { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import NavBar from "../components/nav/NavBar";
import { navbarOptions } from "../lib/navConstants";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const screenMd: number = 768
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [showToggle, setShowToggle] = useState<boolean>(false)
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false)

  const toggleNav = () => setIsNavOpen(!isNavOpen)
  const closeNav = () => {if (window.innerWidth > screenMd) setIsNavOpen(false)}
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < screenMd)
      closeNav()
    }
    
    setShowToggle(isMobile)
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [isMobile])

  return (
    <div className="flex flex-col h-dvh">
      <Header showToggle={showToggle} isNavOpen={isNavOpen} toggleNav={toggleNav}/>
      <div className="flex w-full h-dvh pt-16 md:pt-20">
        <NavBar isNavOpen={isNavOpen} isMobile={isMobile} options={navbarOptions}/>  
        <main className={`${isNavOpen ? 'hidden' : 'block'} grow`}>{children}</main>
      </div>
    </div>
  );
}
