'use client'
import { useFormState } from "react-dom";
import registerAction from "./registerAction";
import Link from "next/link";

export default function SignUpPage() {
  const [error, formAction] = useFormState(registerAction, undefined)

  // should use the pending hook to disable submit
  

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
                    Crie sua conta
                </h1>
                <form className="space-y-4 md:space-y-6" action={formAction}>
                    {error && <p className="text-red-600 text-center">{error}</p>}
                    <div>
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 ">Usuário</label>
                        <input type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="usuario123" required/>
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
                        <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="usuario@email.com" required/>
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Senha</label>
                        <input  type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required />
                    </div>
                    
                    <button type="submit" className="w-full text-white bg-[#142527] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Registrar</button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Já possui conta?
                        <Link href="/login" className="font-medium text-[#142527] hover:underline dark:text-primary-500"> Entrar</Link>
                    </p>
                </form>
            </div>
        </div>
      </div>
    </section>
  )
}
