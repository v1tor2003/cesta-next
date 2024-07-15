import prisma from "@/app/lib/prisma";
import { User } from "@/app/lib/types";

export async function getUsers(): Promise<User[]> {
  // should mangle the user type to not expose the password
  const users: User[] = await prisma.tabela_usuarios.findMany()
  return users
}