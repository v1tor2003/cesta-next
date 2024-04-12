'use client'
import Image from 'next/image'
import accbLogo from '@/public/accbLogo.png'
import SignOutButton from "./SignOutButton"
import { useSession } from 'next-auth/react'
import { FaBars, FaXmark } from 'react-icons/fa6'
import { HeaderProps } from '../lib/types'
import { FaTimes } from 'react-icons/fa'

export default function Header({isNavOpen, toggleNav}: HeaderProps) {
  const iconStyle: string = 'w-6 h-auto text-accb-green'
  const {data: session} = useSession()
  
  return (
    <header className="shadow flex fixed top-0 left-0 right-0 z-10 w-full h-16 bg-white justify-between items-center p-6">
      <div className="">
        <Image src={accbLogo} alt='Logo for ACCB' className="w-24 h-auto"/>
      </div>
      <div onClick={toggleNav} className="hover:bg-gray-100 md:p-2 rounded">
        {isNavOpen ? <FaTimes className={iconStyle}/> : <FaBars className={iconStyle}/>}
      </div>
    </header>
  )
}
