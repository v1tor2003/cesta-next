'use server'
import { signIn } from "next-auth/react";
import prisma from "../lib/prisma";
import { LoginSchema, RegisterSchema } from "../lib/schemas"
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

export type FormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
}

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
    if(!user) return {message: 'Erro interno do servidor. Por favor, tente mais tarde.'}
  } catch (error: unknown) {
    return {message: 'Erro interno do servidor. Por favor, tente mais tarde.'}
  }
 
  redirect('/auth/login')
}