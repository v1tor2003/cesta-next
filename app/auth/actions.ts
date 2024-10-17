'use server'
import prisma from "../lib/prisma";
import { LoginSchema, RegisterSchema } from "../lib/schemas"

import { redirect } from "next/navigation";
import { FormState } from "../lib/types";
import { signIn, signOut } from "../lib/auth/auth";
import { AuthError } from "next-auth";
import { validateForm, handleLoginError }from "../lib/utils";
import { createUser } from "../lib/auth/actions";

export async function logOut() { 
  const loginUrl = process.env.LOGIN_PAGE
  if (!loginUrl) throw new Error('Could not load login page.')  
  await signOut({redirectTo: loginUrl}) 
}

function redirectHome(): undefined {
  const homeUrl = process.env.HOME_PAGE
  if (!homeUrl) throw new Error('Could not load home page.')  
  return redirect(homeUrl)
}

async function doLoginUsingCredentials(
  prevState: FormState, 
  user: { email: string, password: string }
): Promise<FormState> {
  const userLoginFormData = new FormData()
  userLoginFormData.append('email', user.email)
  userLoginFormData.append('password', user.password)
  
  return credentialsLogin(prevState, userLoginFormData)
}

export async function credentialsLogin(prevState: FormState, data: FormData): Promise<FormState> {
  const formData = Object.fromEntries(data)
  const parsed = LoginSchema.safeParse(formData)
  
  const validation = validateForm(formData, parsed)
  
  if(validation.hasIssues)
    return { result: 'failure', message: 'Erro ao validar campos.', validation }

  try {
    await signIn('credentials', {
      ...parsed.data,
      redirect: false
    })
  }catch(error) {
    let errorCode: string = ''
    if(error instanceof AuthError) errorCode = error.type
    return { result: 'failure', message: handleLoginError(errorCode) }
  }
  
  redirectHome()
}

export async function signUp(prevState: FormState, data: FormData): Promise<FormState> {
  const formData = Object.fromEntries(data)
  const parsed = RegisterSchema.safeParse(formData)
 
  const validation = validateForm(formData, parsed)
  
  if(validation.hasIssues || !parsed.success)
    return { result: 'failure', message: 'Erro ao validar campos.', validation }
   
  const user = {
    usuario_email: parsed.data.email,
    usuario_nome: parsed.data.username,
    usuario_senha: parsed.data.password
  }

  // should refactor to findUnique(), gotta update db schema fisrt
  if(await prisma.tabela_usuarios.findFirst({ where: { usuario_email: user.usuario_email }}))
    return {
      result: 'failure',
      message: 'Erro ao criar conta! Verifique seus dados e tente de novo.'
    }

  if(!(await createUser(user))) return { result: 'failure', message: 'Algo deu errado! Por favor tente de novo.'}
   
  return await doLoginUsingCredentials(
    prevState, 
    { email: user.usuario_email, password: user.usuario_senha }
  )
}