import { tabela_usuarios } from "@prisma/client"
import prisma from "../prisma"
import { auth } from "./auth"
import bcrypt from "bcryptjs"
import { User, UserCreationInfo } from "../types"

export async function getUserByEmail(email: string): Promise<tabela_usuarios | null> {
  try {
    return await prisma.tabela_usuarios.findFirst({
      where: {
        usuario_email: email
      }
    }) 
  } catch (error) {
    console.log('Data base error for getting user with email: ', email )
  }

  return null
}

export async function isAuthenticated(): Promise<boolean> {
  return !!(await auth())
}

export async function createUser(userData: UserCreationInfo): Promise<User | null>{
  const {usuario_nome, usuario_email, usuario_senha} = userData
  const hashedPassword = bcrypt.hashSync(usuario_senha, 8)

  try {
    return await prisma.tabela_usuarios.create({
      data: {
        usuario_nome,
        usuario_email,
        usuario_senha: hashedPassword,
      },
    })
  } catch (error: unknown) {
    console.log('Error inserting new user record to db.')
    return null
  }
}