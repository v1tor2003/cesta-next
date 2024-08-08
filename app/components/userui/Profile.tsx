'use client'
import { useSession } from "next-auth/react"
import LogOut from "./LogOut"

export default function Profile() {
  const {data: session} = useSession()
  const userName: string = (session?.user?.name as string) ?? ''
  const email: string = (session?.user?.email as string) ?? ''

  return (
    <div className="flex pb-8 justify-center space-x-2 w-full">
      {session &&  
        <span className="flex rounded-full w-12 h-12 text-center text-2xl justify-center items-center bg-accb-green text-white capitalize">
          {userName.charAt(0)}
        </span>
      }
      <div className="flex flex-col justify-center">
        <span className="capitalize text-md text-accb-green font-semibold"> {userName} </span>
        <span className="lowercase text-sm text-accb-green font-medium"> {email} </span>
      </div>
      <LogOut />
  </div>
  )
}