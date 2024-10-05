import { tabela_usuarios } from "@prisma/client"

export type User = Omit<tabela_usuarios, "usuario_senha">

export type FormState = {
  result: 'success' | 'failure' | undefined
  message?: string
  fields?: Record<string, string>
  issues?: string[]
}