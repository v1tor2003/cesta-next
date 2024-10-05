'use client'
import ProfileSkeleton from "./ProfileSkeleton"
import Profile from "./Profile"
import { useSession } from "next-auth/react"
// temporary comp, should improve the way the app renders the nav and then the session
// there is this bug where when the user logs in the session never loads
// but when the page gets reloaded it works
export default function RenderProfile() {
  const { data: session, status } = useSession()
  console.log('session status: ', status)
  if (status !== 'authenticated') 
    return <ProfileSkeleton />
    
  const name: string = (session?.user?.name as string) ?? ''
  const email: string = (session?.user?.email as string) ?? ''
  console.log('session status: ', status)
  return <Profile name={name} email={email} />
}
