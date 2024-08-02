'use client'

import { signOut } from "next-auth/react"
import { MdLogout } from "react-icons/md"

export default function LogOut() {
  return (
    <button title="Sair" onClick={() => signOut()}>
      <MdLogout className="w-6 h-6 text-accb-green hover:cursor-pointer" aria-label="Sair" />
    </button>
  )
}
