import { User } from "@/app/components/UsersTable";
import prisma from "@/app/lib/prisma";

export async function getUsers(): Promise<User[]> {
  const users: User[] = await prisma.tabela_usuarios.findMany()
  return users
}