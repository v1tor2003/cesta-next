'use client'
import { signOut } from "next-auth/react";

export default function SignOutButton() {
  const url = process.env.NEXTAUTH_URL + '/login'
  return (
    <button onClick={() => signOut({callbackUrl: url})}>Sair</button>
  )
}
