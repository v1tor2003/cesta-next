'use server'
import { redirect } from 'next/navigation'

export default async function registerAction(currentState: any, formData: FormData): Promise<string> {
  const app = process.env.NEXTAUTH_URL

  const username = formData.get('username') as string 
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  
  const res = await fetch(app + '/api/auth/register', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({username, email, password})
  })

  const json = await res.json()

  if(res.ok){
    redirect('/login')
  }else{
    return json.error()
  }
}