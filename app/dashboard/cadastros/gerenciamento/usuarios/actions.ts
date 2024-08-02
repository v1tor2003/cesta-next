'use server'
import prisma from "@/app/lib/prisma";
import { EditUserSchema } from "@/app/lib/schemas";
import { FormState, User } from "@/app/lib/types";
import { revalidatePath } from "next/cache";

const serverErrorMsg: string = 'Erro interno do servidor. Por favor, tente mais tarde.'

export async function getUsers(
  itemsPerPage: number, currPage: number = 1
): Promise<{
  users:User[], totalUsers:number
}> {
  let users: User[] = new Array()
  try {
    const totalUsers = await prisma.tabela_usuarios.count()
    users = await prisma
      .tabela_usuarios
      .findMany({
        select: { 
          usuario_id: true, 
          usuario_nome: true, 
          usuario_email: true
        },
        skip: itemsPerPage * (currPage - 1),
        take: itemsPerPage
      })  
    return { users, totalUsers}
  } catch (error: unknown) {
    console.log('server error')
    return { users: [], totalUsers: 0 }
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
      result: 'failure',
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

    if(!res) 
      return {
        result: 'failure',
        message: 'Erro ao atualizar usuário. Por favor, tente mais tarde.'
      }
  } catch (error: unknown) {
    return {
      result: 'failure',
      message: serverErrorMsg
    }
  }

  revalidatePath('/')
  return { result: 'success', message: 'Usuário atualizado com sucesso.' }
}