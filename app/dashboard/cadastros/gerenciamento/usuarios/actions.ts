'use server'
import prisma from "@/app/lib/prisma";
import { EditUserSchema } from "@/app/lib/schemas";
import { FormState, User } from "@/app/lib/types";

const serverErrorMsg: string = 'Erro interno do servidor. Por favor, tente mais tarde.'

export async function getUsers(): Promise<User[]> {
  let users: User[] = new Array()
  try {
    users = (await prisma.tabela_usuarios.findMany()).map(({ usuario_senha, ...user }) => user)  
    return users;
  } catch (error: unknown) {
    console.log('server error')
  }finally{
    return users
  }
}

export async function editUser(prevState: FormState, data: FormData): Promise<FormState> {
  const formData = Object.fromEntries(data)
  const parsed = EditUserSchema.safeParse(formData)

  if(!parsed.success) {
    const fields: Record<string, string> = {}
    for(const key of Object.keys(formData))
      fields[key] = formData[key].toString()

    return {
      message: '',
      fields,
      issues: parsed.error.issues.map((issue) => issue.message)
    }
  }
  
  const {user_id, email, name} = parsed.data
  let id: number
  
  try{ id = Number.parseInt(user_id) } 
  catch (error: unknown) {
    return {message: serverErrorMsg}
  }

  // should consider testing the email as well
  if(!await prisma.tabela_usuarios.findUnique({ where: {usuario_id: id}}))
    return {message: 'Erro ao encontrar usuário. Por favor, tente mais tarde.'}

  try {
    const res = await prisma.tabela_usuarios.update({
      where: {
        usuario_id: id
      },
      data: {
        usuario_email: email,
        usuario_nome: name
      }
    })

    if(!res) return {message: serverErrorMsg}
  } catch (error: unknown) {
    return {message: serverErrorMsg}
  }

  return {message: 'Usuário atualizado com sucesso.', success: true}
}