'use server'
import prisma from "../lib/prisma";
import { RegisterSchema } from "../lib/schemas"
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { FormState } from "../lib/types";

const serverErrorMsg: string = 'Erro interno do servidor. Por favor, tente mais tarde.'

export async function signUp(prevState: FormState, data: FormData): Promise<FormState> {
  await new Promise((resolve) => setTimeout(resolve, 3000))
  const formData = Object.fromEntries(data)
  const parsed = RegisterSchema.safeParse(formData)
  console.log(formData, parsed)
  
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

  const {username, email, password} = parsed.data
  // should refactor to findUnique(), gotta update db schema fisrt
  if(await prisma.tabela_usuarios.findFirst({ where: {usuario_email: email}}))
    return {
      result: 'failure',
      message: 'Erro ao criar conta. Verifique seus dados e tente de novo.'
    }
  const hashedPassword = bcrypt.hashSync(password, 8)
  let user
  try {
    user = await prisma.tabela_usuarios.create({
      data: {
        usuario_nome: username,
        usuario_email: email,
        usuario_senha: hashedPassword,
      },
    })
    if(!user) 
      return {
        result: 'failure',
        message: serverErrorMsg
      }
  } catch (error: unknown) {
    return {
      result: 'failure',
      message: serverErrorMsg
    }
  }
 
  redirect('/auth/login')
}