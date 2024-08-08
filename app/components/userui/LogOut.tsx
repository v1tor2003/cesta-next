'use client'
import { logOut } from "@/app/auth/actions"
import { MdLogout } from "react-icons/md"

export default function LogOut() {
  return (
    <button title="Sair" onClick={async () => await logOut()}>
      <MdLogout className="w-6 h-6 text-accb-green hover:cursor-pointer" aria-label="Sair" />
    </button>
  )
}
