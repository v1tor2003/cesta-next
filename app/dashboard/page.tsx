import prisma from "../lib/prisma"

export default async function Dashboard() {
  const data = await prisma.tabela_usuarios.findMany()
  
  return (
    <></>
  )
}
