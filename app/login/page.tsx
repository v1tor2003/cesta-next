'use client'
import { FaLock, FaEnvelope } from "react-icons/fa6";
import accbLogo from '@/public/accbLogo.png'
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [error, setError] = useState<string>('')

  function login(formData: FormData){
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string
    }
   
    signIn('credentials', {
        ...data,
        callbackUrl: "/dashboard/home"
      })
  }

  function handleFormChange(){
    setError('')
  }

  // should use the pending hook to disable submit
  // should display errors
  // shoud validate
  
  return (
    <section className="flex justify-center items-center bg-accb-green w-dvh h-lvh">
      <div className="flex flex-col items-center justify-center w-screen h-screen xs:w-80 xs:h-[32rem] transition-all xs:transition-all rounded-md bg-gray-100 ">
        <div className="flex flex-col items-center justify-center mb-6">
          <Image src={accbLogo} alt="Logo for ACCB" className="w-48 h-auto mb-4"/>
          <span className="text-accb-green font-semibold mb-4">Entre em sua conta</span>
          <p className="text-center text-sm w-64 font-light">
            Forneça suas credencias para acessar o Gerenciador de Dados da Cesta.
          </p>
        </div>
        <form className="flex flex-col items-center" action={login}>
          {error && <p className="text-red-600 text-center">{error}</p>}
          <div className="flex flex-col gap-2 mb-2 items-center">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-2 flex items-center">
                <FaEnvelope className="text-gray-400"/>
              </span>
              <input type="email" name="email" id="email" placeholder="user@email.com"
                className="block py-2 pl-8 pr-4 text-gray-900 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-blue-500" required/>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-2 flex items-center">
                <FaLock className="text-gray-400"/>
              </span>
              <input type="password" name="password" id="password" placeholder="********"
                className="block py-2 pl-8 pr-4 text-gray-900 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-blue-500" required/>
            </div>
            <div className="flex justify-between">            
              <Link href="#" className="text-sm font-medium text-blue-500 hover:underline ">Esqueceu a senha?</Link>
            </div>
          <button type="submit" className="w-full text-white p-2 rounded-md bg-accb-green">Entrar</button>
          <p className="text-sm font-light text-accb-green">
            Ainda não tem conta?
            <Link href="/register" className="font-medium text-blue-500 hover:underline "> Registrar-se
            </Link>
          </p>
          </div>
        </form>
      </div>
    </section>
  )
}
