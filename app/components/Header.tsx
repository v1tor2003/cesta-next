import { getServerSession } from "next-auth"
import SignOutButton from "./SignOutButton"

interface TailWindClasses {
  className?: string
}

export default async function Header({className}: TailWindClasses) {
  const session = await getServerSession()
  
  return (
    <header className={className}>
      <div className="text-center">
        <a href="#"className="p-2 text-white capitalize ">Logo</a>
      </div>
      <div className="flex mr-8 text-white">
        {session ? (<span>
          hi, {session.user?.name}
          <SignOutButton/>
        </span>): (<></>)}
      </div>
    </header>
  )
}
