'use client'
import Image from 'next/image'
import accbLogo from '@/public/accbLogo.png'
import { FaBars } from 'react-icons/fa6'
import { HeaderProps } from '../lib/types'
import { FaTimes } from 'react-icons/fa'
import { useEffect, useState } from 'react'

export default function Header({isNavOpen, toggleNav}: HeaderProps) {
  const [showShadow, setShowShadow] = useState<boolean>(false)
  const [isAtTop, setisAtTop] = useState<boolean>(true)

  const toggleIconStyle: string = 'w-6 h-auto text-accb-green';

  useEffect(() => {
    const handleScroll = () => {
      const hasYOverflow = document.body.scrollHeight > document.body.clientHeight
      setShowShadow(hasYOverflow)
      setisAtTop(window.scrollY === 0)
    };

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  return (
    <header className={`${showShadow && !isAtTop ? 'shadow' : ''} transition-all duration-300 flex fixed top-0 left-0 right-0 z-10 w-full h-16 bg-white justify-between items-center p-6`}>
      <div className="">
        <Image src={accbLogo} alt='Logo for ACCB' className="w-24 h-auto"/>
      </div>
      <div onClick={toggleNav} className="hover:bg-gray-100 md:p-2 rounded">
        {isNavOpen ? <FaTimes className={toggleIconStyle}/> : <FaBars className={toggleIconStyle}/>}
      </div>
    </header>
  )
}
