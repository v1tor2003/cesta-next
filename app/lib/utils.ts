import { SafeParseReturnType } from "zod"
import { FormValidation } from "./types"

export function validateForm <In, Out>(
  formData: { [k: string]: FormDataEntryValue }, 
  parsed: SafeParseReturnType<In, Out>)
: FormValidation {  

  if(!parsed.success) {
    const fields: Record<string, string> = {}
    for(const key of Object.keys(formData))
      fields[key] = formData[key].toString()

    return {
      hasIssues: true,
      fields,
      issues: parsed.error.issues.map((issue) => issue.message)
    }
  }

  return { hasIssues: false }
}

export function handleLoginError (errorCode: string): string {
  const errorMesssage: { [key: string]: string } = {
    'CredentialsSignin' : 'Credenciais inválidas. Por favor, tente de novo.',
    'Configuration' : 'Erro de configuração do servidor.',
    'AccessDenied': 'Accesso negado. Você não tem permissão para acessar essa página.'
  } as const

  return errorMesssage[errorCode] || 'Algo deu errado! Por favor, tente de novo.'
}
