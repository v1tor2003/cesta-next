'use client'
import { signOut } from "next-auth/react"
import Link from "next/link"

export default function HeaderProfile() {
  return (
    <Link href="/api/auth/signout" legacyBehavior>
    <a onClick={e => {
      e.preventDefault()
      signOut()
    }}>Sair</a>
    </Link>
  )
}
