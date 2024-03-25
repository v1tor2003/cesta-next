import { getServerSession } from "next-auth"
import SignOutButton from "./SignOutButton"

export default async function Header() {
  const session = await getServerSession()
  
  return (
    <header className="fixed top-0 left-0 w-full flex justify-between items-center bg-gray-50 border-b border-gray-200 p-4 z-10">
      <a href="#" className="ml-8 inline-block">Logo</a>
      <div className="flex mr-8">
        {session ? (<span>
          hi, {session.user?.name}
          <SignOutButton/>
        </span>): (<></>)}
      </div>
    </header>
  )
}
