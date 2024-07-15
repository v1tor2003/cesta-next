'use client'
import SubmitForm from "@/app/components/forms/SubmitForm";
import Link from "next/link";

import { useFormState } from "react-dom";
import { FaCheckCircle } from "react-icons/fa";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa6";
import { signUp } from "../actions";
import { RegisterSchema } from "@/app/lib/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRef } from "react";

export default function RegisterForm() {
  const [state, formAction] = useFormState(signUp, {
    message: ''
  })

  const {handleSubmit, register, formState: {errors, isSubmitting}} = useForm<z.output<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      username: '',
      password: '',
      confirmPassword: ''
    }
  })

  const formRef = useRef<HTMLFormElement>(null)
  
  return (
    <div>
      {state.message !== '' && 
        <div className="bg-red-100 rounded-md mb-2 mx-6">
          <p className="p-2 text-red-600 text-xs italic">{state.message}</p>
        </div> 
      }
      <form 
        className="flex flex-col items-center"
        ref={formRef} 
        action={formAction}
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit(() => {
            formAction(new FormData(formRef.current!))
          })(e)
        }}>
          <div className="flex flex-col gap-2 mb-2 items-center">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-2 flex items-center">
                <FaUser className="text-gray-400"/>
              </span>
              <input 
                {...register('username')}
                placeholder="user123"
                className="block py-2 pl-8 pr-4 text-gray-900 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-blue-500" 
                required
              />
              {errors.username && <p className="text-red-500 text-xs italic">{errors.username.message}</p>}
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-2 flex items-center">
                <FaEnvelope className="text-gray-400"/>
              </span>
              <input 
                {...register('email')}
                type="email"
                placeholder="user@email.com"
                className="block py-2 pl-8 pr-4 text-gray-900 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-blue-500" 
                required
              />
               {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-2 flex items-center">
                <FaLock className="text-gray-400"/>
              </span>
              <input 
                {...register('password')}
                type="password"
                placeholder="********"
                className="block py-2 pl-8 pr-4 text-gray-900 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-blue-500" 
                required
              />
               {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
            </div>
            <div className="relative mb-2">
              <span className="absolute inset-y-0 left-0 pl-2 flex items-center">
                <FaCheckCircle className="text-gray-400"/>
              </span>
              <input 
                {...register('confirmPassword')}
                type="password"
                placeholder="********"
                className="block py-2 pl-8 pr-4 text-gray-900 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-blue-500"
                required
              />
               {errors.confirmPassword && <p className="text-red-500 text-xs italic">{errors.confirmPassword.message}</p>}
            </div>
            <SubmitForm buttonLabel="Criar" pending={isSubmitting} className="w-full text-white p-2 rounded-md bg-accb-green"/>
            <p className="text-sm font-light text-accb-green">
              Já possui conta?
              <Link href="/auth/login" className="font-medium text-blue-500 hover:underline "> Entrar
              </Link>
            </p>
          </div>
        </form>
      </div>
  )
}
