'use client'
import { FormState, User } from "@/app/lib/types"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod" 
import { EditUserSchema } from "@/app/lib/schemas"
import { useFormState, useFormStatus } from "react-dom"
import { editUser } from "@/app/dashboard/cadastros/gerenciamento/usuarios/actions"
import Input from "./Input"
import ErrorMessage from "./ErrorMessage"
import InputLabel from "./InputLabel"
import Button from "../layout/Button"
import SucessMessage from "./SucessMessage"
import SubmitForm from "./SubmitForm"
import { useEffect, useRef } from "react"

interface EditUserFormProps {
  defaultData?: User
}

const initialState: FormState = { result: undefined }

export default function EditUserForm({defaultData}: EditUserFormProps): JSX.Element {
  const baseInputStyle: string = "w-full p-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none"
  const inputStyle: string = baseInputStyle + " focus:border-blue-500 focus:ring-blue-500"
  const disabledInputStyle: string = baseInputStyle + " bg-gray-200"

  const [state, formAction] = useFormState(editUser, initialState)
  
  const { register, formState: { errors }} = useForm<z.output<typeof EditUserSchema>>({
    mode: 'onBlur',
    resolver: zodResolver(EditUserSchema),
    defaultValues: {
      user_id: defaultData?.usuario_id || 0,
      email: defaultData?.usuario_email,
      name: defaultData?.usuario_nome
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
        className="flex flex-col space-y-2"
        ref={formRef}
        action={formAction}
      >
        {state.result === 'success' && <SucessMessage message={state.message || ''} />}
        <ErrorMessage hasError={state.result === 'failure'} message={state.message}/>
        <InputLabel label="id"/>
        <Input 
          {...register('user_id')}
          type="number"
          className={disabledInputStyle}
          required
          readOnly
        />
        <InputLabel label="email"/>
        <Input 
          {...register('email')}
          type="email"
          placeholder="user@email.com" 
          className={inputStyle}
          required
        />
        <ErrorMessage hasError={errors.email !== undefined} message={errors.email?.message}/>
        <InputLabel label="nome"/>
        <Input
          {...register('name')}
          type="text"
          placeholder="Joao Silva"
          className={inputStyle}
          required
        />
        <ErrorMessage hasError={errors.name !== undefined} message={errors.name?.message}/>
        <SubmitForm >
          <Button 
            className="w-full py-2 px-3 rounded-md border font-semibold text-white bg-accb-green border-accb-green hover:text-accb-green hover:border-accb-green hover:bg-white transition-colors" 
            type="submit"
            buttonlabel="Criar"       
          />
        </SubmitForm>
      </form>
    </div>
  )
}
