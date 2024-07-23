'use server'
import prisma from "@/app/lib/prisma";
import { EditUserSchema } from "@/app/lib/schemas";
import { FormState, User } from "@/app/lib/types";
import { revalidatePath } from "next/cache";

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
  await new Promise(resolve => setTimeout(resolve, 2000))
  console.log(data)
  const formData = Object.fromEntries(data)
  const parsed = EditUserSchema.safeParse(formData)

  if(!parsed.success) {
    const fields: Record<string, string> = {}
    for(const key of Object.keys(formData))
      fields[key] = formData[key].toString()

    return {
      message: 'Erro ao validar campos.',
      fields,
      issues: parsed.error.issues.map((issue) => issue.message)
    }
  }
  
  const { user_id, email, name } = parsed.data
  
  try {
    const res = await prisma.tabela_usuarios.update({
      where: {
        usuario_id: user_id
      },
      data: {
        usuario_email: email,
        usuario_nome: name
      }
    })

    if(!res) return {message: 'Erro ao atualizar usuário. Por favor, tente mais tarde.'}
  } catch (error: unknown) {
    return {message: serverErrorMsg}
  }

  revalidatePath('/')
  return {message: 'Usuário atualizado com sucesso.', success: true}
}