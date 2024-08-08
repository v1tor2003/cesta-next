'use server'
import prisma from "../lib/prisma";
import { LoginSchema, RegisterSchema } from "../lib/schemas"
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { FormState } from "../lib/types";
import { signIn, signOut } from "../lib/auth/auth";
import { AuthError } from "next-auth";

const serverErrorMsg: string = 'Erro interno do servidor. Por favor, tente mais tarde.'

const handleLoginError = (errorCode: string): string => {
  const errorMesssage: { [key: string]: string } = {
    'CredentialsSignin' : 'Credenciais inválidas. Por favor, tente de novo.',
    'Configuration' : 'Erro de configuração do servidor.',
    'AccessDenied': 'Accesso negado. Você não tem permissão para acessar essa página.'
  } as const

  return errorMesssage[errorCode] || 'Um erro desconhecido ocorreu. Por favor, tente de novo.'
}

export async function logOut() { await signOut({redirectTo: process.env.LOGIN_PAGE}) }

export async function credentialsLogin(prevState: FormState, data: FormData): Promise<FormState>{
  const formData = Object.fromEntries(data)
  const parsed = LoginSchema.safeParse(formData)
  
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
  let errorCode: string = ''
  try {
    await signIn('credentials', {
      redirect: false,
      ...parsed.data
    })
  } catch (error) {
    if(error instanceof AuthError) errorCode = error.type
    return { result: 'failure', message: handleLoginError(errorCode) }
  }

  redirect(process.env.HOME_PAGE ?? '')
}

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
 
  redirect(process.env.LOGIN_PAGE ?? '')
}