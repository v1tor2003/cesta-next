'use client'
import { signOut } from "next-auth/react";

export default function SignOutButton() {
  console.log('run')
  const url = 'http://localhost:3000/login'
  return (
    <button onClick={() => signOut({callbackUrl: url})}>Sair</button>
  )
}
