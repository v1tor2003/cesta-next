'use server'
import prisma from "../lib/prisma";
import { RegisterSchema } from "../lib/schemas"
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { FormState } from "../lib/types";

const serverErrorMsg: string = 'Erro interno do servidor. Por favor, tente mais tarde.'

export async function signUp(prevState: FormState, data: FormData): Promise<FormState> {
  const formData = Object.fromEntries(data)
  const parsed = RegisterSchema.safeParse(formData)
  
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

  const {username, email, password} = parsed.data
  // should refactor to findUnique(), gotta update db schema fisrt
  if(await prisma.tabela_usuarios.findFirst({ where: {usuario_email: email}}))
    return {message: 'Erro ao criar conta. Verifique seus dados e tente de novo.'}
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
    if(!user) return {message: serverErrorMsg}
  } catch (error: unknown) {
    return {message: serverErrorMsg}
  }
 
  redirect('/auth/login')
}