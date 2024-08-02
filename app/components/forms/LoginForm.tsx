'use client'
import { FaLock, FaEnvelope } from "react-icons/fa6";

import { LoginSchema } from "@/app/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormEvent, useEffect, useRef, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import SubmitFormWrapper from "@/app/components/forms/SubmitFormWrapper";
import ErrorMessage from "@/app/components/forms/ErrorMessage";
import Input from "@/app/components/forms/Input";
import CreateAccountLink from "@/app/components/authui/CreateAccountLink";
import ForgotPasswordLink from "@/app/components/authui/ForgotPasswordLink";
import Button from "@/app/components/layout/Button";
import { FormState } from "@/app/lib/types";

const handleLoginError = (errorCode: string): string => {
  const errorMesssage: { [key: string]: string } = {
    'CredentialsSignin' : 'Credenciais inválidas. Por favor, tente de novo.',
    'Configuration' : 'Erro de configuração do servidor.',
    'AccessDenied': 'Accesso negado. Você não tem permissão para acessar essa página.'
  } as const

  return errorMesssage[errorCode] || 'Um erro desconhecido ocorreu. Por favor, tente de novo.'
}

const initialState: FormState = { result: undefined }

export default function LoginForm(): JSX.Element {
  const entryPageUrl = '/dashboard/home'
  const router = useRouter()
  const [state, setState] = useState<FormState>(initialState)
  
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
    
    handleSubmit(async (data) => {
      const res = await signIn('credentials', {
        redirect: false,
        ...data
      })

      if(!res?.error) { 
        formRef.current?.reset()
        return router.push(entryPageUrl) 
      }

      setState({
        result: 'failure',
        message: handleLoginError(res?.error || '')
      })
    })(e)
  }

  const resetErrors = () => state.result === 'failure' ? setState({result : undefined}) : null

  return (
    <div>
      <form 
        className="w-full flex flex-col space-y-2 mb-2 items-center" 
        ref={formRef} 
        onSubmit={login}
        >
          <ErrorMessage hasError={state.result === 'failure'} message={state.message}/>
          <Input 
            icon={<FaEnvelope className="text-accb-green"/>}
            {...register('email', {onChange: resetErrors, disabled: isSubmitting})}
            type="email" 
            placeholder="user@email.com"
            className="w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <ErrorMessage hasError={errors.email !== undefined} message={errors.email?.message}/>
          <Input 
            icon={<FaLock className="text-accb-green"/>}
            {...register('password', {onChange: resetErrors, disabled: isSubmitting})}
            type="password"
            placeholder="********"
            className="w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            required
          />
          <ErrorMessage hasError={errors.password !== undefined} message={errors.password?.message}/>
          <ForgotPasswordLink />
          <SubmitFormWrapper
            submiting={isSubmitting}
          >
            <Button 
              className="w-full py-2 px-3 rounded-md border font-semibold text-white bg-accb-green border-accb-green hover:text-accb-green hover:border-accb-green hover:bg-white transition-colors" 
              type="submit"
              buttonlabel="Entrar"       
            />
          </SubmitFormWrapper>
          <CreateAccountLink />
      </form>
    </div>
  )
}
