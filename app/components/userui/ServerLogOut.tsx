import { signOut } from "@/app/lib/auth/auth"
import { MdLogout } from "react-icons/md"

export default async function ServerLogOut() {
  return (
    <form className="pt-2"
      action={async () => {
        'use server'
        await signOut({redirectTo: '/'})
      }}
    >
      <button title="Sair">
        <MdLogout className="w-6 h-6 text-accb-green hover:cursor-pointer" aria-label="Sair" />
      </button>
    </form>
  )
}
