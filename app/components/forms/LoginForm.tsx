'use client'
import { FaLock, FaEnvelope } from "react-icons/fa6";

import { LoginSchema } from "@/app/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRef } from "react";

import SubmitFormWrapper from "@/app/components/forms/SubmitFormWrapper";
import ErrorMessage from "@/app/components/forms/ErrorMessage";
import Input from "@/app/components/forms/Input";
import CreateAccountLink from "@/app/components/authui/CreateAccountLink";
import ForgotPasswordLink from "@/app/components/authui/ForgotPasswordLink";
import Button from "@/app/components/layout/Button";
import { FormState } from "@/app/lib/types";
import { useFormState } from "react-dom";
import { credentialsLogin } from "@/app/auth/actions";

const initialState: FormState = { result: undefined }

export default function LoginForm(): JSX.Element {
  const [state, formAction] = useFormState(credentialsLogin, initialState)

  const { register, formState: {errors}} = useForm<z.output<typeof LoginSchema>>({
    mode: "onBlur",
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const formRef = useRef<HTMLFormElement>(null)
  // maybe should clean the form
  
  return (
    <div>
      <form 
        className="w-full flex flex-col space-y-2 mb-2 items-center" 
        ref={formRef} 
        action={formAction}
        >
          <ErrorMessage hasError={!!(state?.result) ? state.result === 'failure' : false} message={state?.message}/>
          <Input 
            icon={<FaEnvelope className="text-accb-green"/>}
            {...register('email')}
            type="email" 
            placeholder="user@email.com"
            className="w-[15rem] py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <ErrorMessage hasError={errors.email !== undefined} message={errors.email?.message}/>
          <Input 
            icon={<FaLock className="text-accb-green"/>}
            {...register('password')}
            type="password"
            placeholder="********"
            className="w-[15rem] py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            required
          />
          <ErrorMessage hasError={errors.password !== undefined} message={errors.password?.message}/>
          <ForgotPasswordLink />
          <SubmitFormWrapper>
            <Button 
              className="w-[17em] py-2 px-3 rounded-md border font-semibold text-white bg-accb-green border-accb-green hover:text-accb-green hover:border-accb-green hover:bg-white transition-colors" 
              type="submit"
              buttonlabel="Entrar"       
            />
          </SubmitFormWrapper>
          <CreateAccountLink />
      </form>
    </div>
  )
}
