import prisma from "@/app/lib/prisma";
import { User } from "@/app/lib/types";

export async function getUsers(): Promise<User[]> {
  return (await prisma.tabela_usuarios.findMany()).map(({ usuario_senha, ...user }) => user)
}