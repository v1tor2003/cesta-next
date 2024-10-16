import { tabela_usuarios } from "@prisma/client"

export type User = Omit<tabela_usuarios, "usuario_senha">
export type UserCreationInfo = Omit<tabela_usuarios, "usuario_id">

export type FormState = {
  result: 'success' | 'failure' | undefined
  message?: string
  validation?: FormValidation
} | undefined

export type FormValidation = {
  hasIssues: boolean
  fields?: Record<string, string>
  issues?: string[]
}
