import { getServerSession } from "next-auth"
import LogOut from "./LogOut"

export default async function ProfileTest() {
  const session = await getServerSession()
  const userName: string = (session?.user?.name as string) ?? ''

  return (
    <div className="flex pb-8 justify-center space-x-2 w-full">
      {session &&  
        <span className="flex rounded-full w-12 h-12 text-center text-2xl justify-center items-center bg-accb-green text-white capitalize">
          {userName.charAt(0)}
        </span>
      }
    <span className="mt-[10px] lowercase font-medium"> {userName.split(' ')[0]} </span>
    <LogOut />
  </div>
  )
}
