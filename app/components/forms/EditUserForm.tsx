'use client'
import SubmitForm from "./SubmitForm"

import { User } from "@/app/lib/types"
import { useRef } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod" 
import { EditUserSchema } from "@/app/lib/schemas"
import { useFormState } from "react-dom"
import { editUser } from "@/app/dashboard/cadastros/gerenciamento/usuarios/actions"

interface EditUserFormProps {
  defaultData?: User
}

export default function EditUserForm({defaultData}: EditUserFormProps): JSX.Element {
  const inputStyle: string = "block p-2 text-gray-900 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-blue-500 "

  const [state, formAction] = useFormState(editUser, {
    message: ''
  })

  const { register, formState: {errors, isSubmitting}} = useForm<z.output<typeof EditUserSchema>>({
    mode: 'onBlur',
    resolver: zodResolver(EditUserSchema),
    defaultValues: {
      email: defaultData?.usuario_email,
      name: defaultData?.usuario_nome
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
        className="flex flex-col space-y-2"
        ref={formRef} 
        action={formAction}
        onSubmit={(e) => {
          e.preventDefault()
          
          const form = new FormData(formRef.current!)
          const user_id = defaultData?.usuario_id ? defaultData.usuario_id.toString() : ''
          form.append('user_id', user_id)
          formAction(form)
        }}>
        <div className="w-full">
          <label htmlFor="" className="block mb-2 text-sm font-medium text-gray-700">Id:</label>
          <p className={inputStyle + 'bg-gray-200'}> 
            {defaultData?.usuario_id} 
          </p>
        </div>
        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Email:</label>
          <input 
            {...register('email')}
            type="email"
            placeholder="user@email.com"
            aria-disabled={isSubmitting}
            className={inputStyle}
            required
          />
        </div>
        {errors.email && <p className="text-red-600 text-xs italic">{errors.email.message}</p>}
        <div>
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">Nome:</label>
          <input 
            {...register('name')}
            type="text"
            placeholder="Joao Silva"
            aria-disabled={isSubmitting}
            className={inputStyle}
            required
          />
        </div>
        {errors.name && <p className="text-red-600 text-xs italic">{errors.name.message}</p>}
        <SubmitForm 
          buttonLabel="Editar" 
          pending={isSubmitting} 
          className="w-full text-white p-2 rounded-md bg-accb-green"
        />
      </form>
    </div>
  )
}
