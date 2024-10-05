'use client'
import SubmitFormWrapper from "@/app/components/forms/SubmitFormWrapper";

import { useFormState } from "react-dom";
import { FaCheckCircle } from "react-icons/fa";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa6";
import { signUp } from "../../auth/actions";
import { RegisterSchema } from "@/app/lib/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ErrorMessage from "@/app/components/forms/ErrorMessage";
import Input from "@/app/components/forms/Input";
import LoginAccountLink from "@/app/components/authui/LoginAccountLink";
import Button from "@/app/components/layout/Button";
import { FormState } from "@/app/lib/types";
import { useEffect, useRef } from "react";

const initialState: FormState = { result: undefined }

export default function RegisterForm(): JSX.Element {
  const [state, formAction] = useFormState(signUp, initialState)

  const { register, formState: { errors }} = useForm<z.output<typeof RegisterSchema>>({
    mode: "onBlur",
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      username: '',
      password: '',
      confirmPassword: ''
    }
  })

  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => { 
    if(state.result === 'success')
      formRef.current?.reset()
  }, [state])

  return (
    <div>
      <form 
        className="flex flex-col gap-2 mb-2 items-center"
        ref={formRef}
        action={formAction}
      >
        <ErrorMessage hasError={state.result === 'failure'} message={state.message}/>
        <Input 
          icon={<FaUser className="text-accb-green"/>}
          {...register('username')}
          placeholder="user123"
          className="w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" 
          required
        />
        <ErrorMessage hasError={errors.username !== undefined} message={errors.username?.message}/>
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
          className="w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" 
          required
        />
        <ErrorMessage hasError={errors.password !== undefined} message={errors.password?.message}/>
        <Input 
          icon={<FaCheckCircle className="text-accb-green"/>}
          {...register('confirmPassword')}
          type="password"
          placeholder="********"
          className="w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <ErrorMessage hasError={errors.confirmPassword !== undefined} message={errors.confirmPassword?.message}/>
        <SubmitFormWrapper >
          <Button 
            className="w-full py-2 px-3 rounded-md border font-semibold text-white bg-accb-green border-accb-green hover:text-accb-green hover:border-accb-green hover:bg-white transition-colors" 
            type="submit"
            buttonlabel="Criar"       
          />
        </SubmitFormWrapper>
        <LoginAccountLink />
      </form>
    </div>
  )
}
