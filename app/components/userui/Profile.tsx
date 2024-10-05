'use client'
import LogOut from "./LogOut"

interface ProfileProps {
  name: string
  email: string
}

export default function Profile({name, email}: ProfileProps) {
  
  return (
    <div className="flex pb-8 justify-center space-x-2 w-full">  
      <span className="flex rounded-full w-12 h-12 text-center text-2xl justify-center items-center bg-accb-green text-white capitalize">
        {name.charAt(0)}
      </span>
      <div className="flex flex-col justify-center">
        <span className="capitalize text-md text-accb-green font-semibold"> {name} </span>
        <span className="lowercase text-sm text-accb-green font-medium"> {email} </span>
      </div>
      <LogOut />
  </div>
  )
}