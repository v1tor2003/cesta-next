import { auth } from "@/app/lib/auth/auth"
import ServerLogOut from "./ServerLogOut"

export default async function ServerProfile() {
  await new Promise((res) => setTimeout(res, 2000))
  const session = await auth()
  const name = session?.user?.name ?? ''
  const email = session?.user?.email ?? ''

  return (
    <div className="flex py-2 sm:py-4 justify-center space-x-2 w-full">  
      <span className="flex rounded-full w-12 h-12 text-center text-2xl justify-center items-center bg-accb-green text-white capitalize">
        {name.charAt(0)}
      </span>
      <div className="flex flex-col justify-center">
        <span className="text-md text-accb-green font-semibold"> {name} </span>
        <span className="lowercase text-sm text-accb-green font-medium"> {email} </span>
      </div>
      <ServerLogOut />
  </div>
  )
}
