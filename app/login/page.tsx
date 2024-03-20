'use client'
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useState } from "react"

export default function LoginPage() {
  const [error, setError] = useState<string>('')

  function login(formData: FormData){
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string
    }
   
    signIn('credentials', {
        ...data,
        callbackUrl: "/dashboard/nest"
      })
  }

  function handleFormChange(){
    setError('')
  }

  return (
    <section className="bg-[#142527]">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img className="w-8 h-8 mr-2" src="" alt="logo"/>
            ACCB  
            
        </div>
        <div className="w-full bg-gray-200 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl text-center font-bold leading-tight tracking-tight">
                    Entre na sua conta
                </h1>
                <form className="space-y-4 md:space-y-6" action={login}>
                    {error && <p className="text-red-600 text-center">{error}</p>}
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
                        <input onChange={handleFormChange} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="usuario@email.com" required/>
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Senha</label>
                        <input onChange={handleFormChange} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required />
                    </div>
                    <div className="flex items-center justify-between">
                        
                        <a href="#" className="text-sm font-medium text-blue-500 hover:underline dark:text-primary-500">Esqueceu a senha?</a>
                    </div>
                    <button type="submit" className="w-full text-white bg-[#142527] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Entrar</button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Ainda não tem conta?
                        <Link href="/register" className="font-medium text-[#142527] hover:underline dark:text-primary-500"> Registre-se</Link>
                    </p>
                </form>
            </div>
        </div>
      </div>
    </section>
  )
}
