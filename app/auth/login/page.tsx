import React from 'react'
import LoginForm from '../../components/forms/LoginForm'
import accbLogo from '@/public/accbLogo.png'
import Image from "next/image"
import { isAuthenticated } from '@/app/lib/auth/actions'
import { redirect } from 'next/navigation'

export default async function LoginPage() {
  if(await isAuthenticated()) redirect(process.env.HOME_PAGE ?? '')

  return (
    <section className="flex justify-center items-center bg-accb-green w-dvh h-lvh">
    <div className="flex flex-col items-center justify-center w-screen h-screen xs:w-80 xs:h-[32rem] transition-all xs:transition-all rounded-md bg-gray-100 ">
      <div className="flex flex-col items-center justify-center mb-4">
        <Image src={accbLogo} alt="Logo for ACCB" className="w-48 h-auto mb-4"/>
        <span className="text-accb-green font-semibold mb-4">Entre em sua conta</span>
        <p className="text-center text-sm w-64 font-light">
          Forneça suas credencias para acessar o Gerenciador de Dados da Cesta.
        </p>
      </div>
      <LoginForm />
    </div>
  </section>
  )
}
