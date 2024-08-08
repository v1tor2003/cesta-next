import prisma from "../prisma"
import { auth } from "./auth"

export async function getUserByEmail(email: string) {
  try {
    return await prisma.tabela_usuarios.findFirst({
      where: {
        usuario_email: email
      }
    }) 
  } catch (error) {
    console.log('Data base error for getting user with email: ', email )
  }
}

export async function isAuthenticated(): Promise<boolean> {
  return !!(await auth())
}