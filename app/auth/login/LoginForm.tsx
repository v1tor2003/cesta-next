'use client'
import { FaLock, FaEnvelope } from "react-icons/fa6";
import Link from "next/link";

import { LoginSchema } from "@/app/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRef, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import SubmitForm from "@/app/components/forms/SubmitForm";

function handleLoginError(errorCode: string): string {
  switch (errorCode) {
    case 'CredentialsSignin':
      return 'Credenciais inválidas. Por favor, tente de novo.';
    case 'Configuration':
      return 'Erro de configuração do servidor.';
    case 'AccessDenied':
      return 'Accesso negado. Você não tem permissão para acessar essa página.';
    default:
      return 'Um erro desconhecido ocorreu. Por favor, tente de novo.';
  }
}

export default function LoginForm() {
  const entryPageUrl = '/dashboard/home'
  const router = useRouter()
  const [loginError, setLoginError] = useState<string>('')
  const {handleSubmit, register, formState: {errors, isSubmitting}} = useForm<z.output<typeof LoginSchema>>({
    mode: "onBlur",
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const formRef = useRef<HTMLFormElement>(null)

  return (
    <div>
      {loginError && 
        <div className="bg-red-100 rounded-md mb-2 mx-6">
          <p className="p-2 text-red-600 text-xs italic">{loginError}</p>
        </div> 
      }
      <form 
        className="flex flex-col items-center" 
        ref={formRef} 
        onSubmit={(e) => {
          e.preventDefault()
          
          handleSubmit(async () => {
            const form = new FormData(formRef.current!)
            const data = {
              email: form.get('email') as string,
              password: form.get('password') as string
            }

            const res = await signIn('credentials', {
              redirect: false,
              ...data
            })

            if(res?.error) setLoginError(handleLoginError(res.error))
            else router.push(entryPageUrl)
          })(e)
        }}>
        <div className="flex flex-col space-y-2 mb-2 items-center">
          <div className="flex items-center border bg-gray-300 border-gray-300 rounded-lg overflow-hidden shadow-sm">
            <span className="px-2">
              <FaEnvelope className="text-accb-green"/>
            </span>
            <input 
              {...register('email')}
              type="email" 
              placeholder="user@email.com"
              className="w-full py-2 px-3  focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {errors.email && <p className="text-red-600 text-xs italic transition-all">{errors.email.message}</p>}
          <div className="flex items-center border bg-gray-300 border-gray-300 rounded-lg overflow-hidden shadow-sm">
            <span className="px-2">
              <FaLock className="text-accb-green"/>
            </span>
            <input 
              {...register('password')}
              type="password"
              placeholder="********"
              className="w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" 
              required
            />
          </div>
          {errors.password && <p className="text-red-600 text-xs italic">{errors.password.message}</p>}
          <div className="flex justify-between">            
            <Link href="#" className="text-sm font-medium text-blue-500 hover:underline ">Esqueceu a senha?</Link>
          </div>
          <SubmitForm buttonLabel="Entrar" pending={isSubmitting} className="w-full text-white p-2 rounded-md bg-accb-green"/>
          <p className="text-sm font-light text-accb-green">
            Ainda não tem conta?
            <Link href="/auth/register" className="font-medium text-blue-500 hover:underline "> Registre-se
            </Link>
          </p>
        </div>
      </form>
    </div>
  )
}
