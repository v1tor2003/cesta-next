'use client'
import { navbarOptions } from "@/app/lib/navConstants";
import NavBar from "../nav/NavBar";
import Header from "./Header";
import { useEffect, useState } from "react";

export default function NavLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [visibility, setVisibility] = useState<string>('hidden')
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [showToggleButton, setShowToggleButton] = useState<boolean>(false)
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false)

  const toggleNav = () => setIsNavOpen(!isNavOpen)
  const closeNav = () => setIsNavOpen(false)

  useEffect(() => {
    setVisibility('')
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 640)
        closeNav();
      }

      setIsMobile(window.innerWidth < 640)
      setShowToggleButton(window.innerWidth < 640)

      window.addEventListener('resize', handleResize)

      return () => window.removeEventListener('resize', handleResize)
    }
  }, [isMobile])

  return (
    <>
      <Header isNavOpen={isNavOpen} showToggle={showToggleButton} toggleNav={toggleNav} />
      <aside
       className={`${visibility} pt-8 flex flex-col justify-center col-span-2 sm:col-span-1 ${isMobile && !isNavOpen ? 'hidden' : 'block'}`}
       style={{ height: 'calc(100vh - 8rem)' }}
      >
        <NavBar options={navbarOptions} />
      </aside>
      <main className={`sm:row-span-2 max-sm:col-span-2 ${isMobile && isNavOpen ? 'hidden' : 'block'} `}>{children}</main>
    </>
  )
}
