'use client'
import { FaLock, FaEnvelope } from "react-icons/fa6";

import { LoginSchema } from "@/app/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormEvent, useRef, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import SubmitForm from "@/app/components/forms/SubmitForm";
import ErrorMessage from "@/app/components/forms/ErrorMessage";
import Input from "@/app/components/forms/Input";
import CreateAccountLink from "@/app/components/authui/CreateAccountLink";
import ForgotPasswordLink from "@/app/components/authui/ForgotPasswordLink";
import Button from "@/app/components/layout/Button";

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

export default function LoginForm(): JSX.Element {
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

  const login = (e: FormEvent<HTMLFormElement>) => {
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
  }

  return (
    <div>
      <form 
        className="flex flex-col space-y-2 mb-2 items-center" 
        ref={formRef} 
        onSubmit={(e) => login(e)}>
          <ErrorMessage hasError={loginError !== ''} message={loginError}/>
          <Input 
            icon={<FaEnvelope className="text-accb-green"/>}
            {...register('email')}
            type="email" 
            placeholder="user@email.com"
            className="w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <ErrorMessage hasError={errors.email !== undefined} message={errors.email?.message}/>
          <Input 
            icon={<FaLock className="text-accb-green"/>}
            {...register('password')}
            type="password"
            placeholder="********"
            aria-disabled={isSubmitting}
            className="w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            required
          />
          <ErrorMessage hasError={errors.password !== undefined} message={errors.password?.message}/>
          <ForgotPasswordLink />
          <SubmitForm>
            <Button 
              className="w-full p-2 rounded-md border font-semibold" 
              colors={{
                default: "accb-green",
                hover: "white"
              }}
              buttonType="submit"
              buttonLabel="Entrar"       
            />
          </SubmitForm>
          <CreateAccountLink />
      </form>
    </div>
  )
}
