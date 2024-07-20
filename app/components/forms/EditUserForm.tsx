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
import Input from "./Input"
import ErrorMessage from "./ErrorMessage"
import InputLabel from "./InputLabel"
import Button from "../layout/Button"
import SucessMessage from "./SucessMessage"

interface EditUserFormProps {
  defaultData?: User
}

export default function EditUserForm({defaultData}: EditUserFormProps): JSX.Element {
  const inputStyle: string = "w-full p-2 text-gray-900 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-blue-500 "

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
        {state.success && <SucessMessage message={state.message} />}
        <ErrorMessage hasError={state.success == false} message={state.message}/>
        <InputLabel label="id"/>
        <Input>
          <div className="w-full">
            <p className={inputStyle + 'bg-gray-200'}> 
              {defaultData?.usuario_id} 
            </p>
          </div>
        </Input>
        <InputLabel label="email"/>
        <Input >
          <input 
            {...register('email')}
            type="email"
            placeholder="user@email.com"
            aria-disabled={isSubmitting}
            className={inputStyle}
            required
          />
        </Input>
        <ErrorMessage hasError={errors.email !== undefined} message={errors.email?.message}/>
        <InputLabel label="nome"/>
        <Input>
          <input 
            {...register('name')}
            type="text"
            placeholder="Joao Silva"
            aria-disabled={isSubmitting}
            className={inputStyle}
            required
          />
        </Input>
        <ErrorMessage hasError={errors.name !== undefined} message={errors.name?.message}/>
        <SubmitForm pending={isSubmitting}>
          <Button 
            className="w-full p-2 rounded-md border font-semibold" 
            colors={{
              default: "accb-green",
              hover: "white"
            }}
            buttonType="submit"
            buttonLabel="Editar"       
          />
        </SubmitForm>
      </form>
    </div>
  )
}
