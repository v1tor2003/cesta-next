'use client'
import Image from 'next/image'
import accbLogo from '@/public/accbLogo.png'
import { FaBars } from 'react-icons/fa6'
import { FaTimes } from 'react-icons/fa'

interface HeaderProps {
  isNavOpen: boolean
  showToggle: boolean
  toggleNav: () => void
}

export default function Header({showToggle, isNavOpen,toggleNav}: HeaderProps) {
  const toggleIconStyle: string = 'w-6 h-auto text-accb-green';

  return (
    <header className={`shadow transition-all duration-300 flex fixed top-0 left-0 right-0 z-1599 w-full h-16 md:h-20 bg-white justify-between items-center p-6`}>
      <Image src={accbLogo} alt='Logo for ACCB' className="md:ml-8 w-24 md:w-40 h-auto"/>
      {showToggle &&
      <div onClick={toggleNav} className="hover:bg-gray-100 md:p-2 rounded">
        {isNavOpen ? <FaTimes className={toggleIconStyle}/> : <FaBars className={toggleIconStyle}/>}
      </div>}
    </header>
  )
}
