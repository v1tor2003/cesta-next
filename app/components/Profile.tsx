'use client'
import { signOut, useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { MdLogout } from "react-icons/md"

export default function HeaderProfile() {
  const {data: session} = useSession()
  const [userName, setUserName] = useState<string>('')

  useEffect(() => {
    const name = session?.user?.name
    if(name) setUserName(name)
  }, [session])

  return (
    <div className="flex pb-8 justify-center space-x-2 w-full">
      {userName &&  
      <span className="flex rounded-full w-12 h-12 text-center text-2xl justify-center items-center bg-accb-green text-white capitalize">{userName.charAt(0)}</span>}
      <span className="mt-[10px] lowercase font-medium"> {userName.split(' ')[0]} </span>
      <button title="Sair" onClick={() => signOut()}>
        <MdLogout className="w-6 h-6 text-accb-green hover:cursor-pointer" aria-label="Sair" />
      </button>
    </div>
  )
}
