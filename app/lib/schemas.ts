import * as z from 'zod'

export const RegisterSchema = z.object({
  email: z.string().trim().email({message: 'Informe um endereço de email válido.'}),
  username: z.string().trim().min(1, {message: 'Informe um nome para seu usuário.'}),
  password: z.string().trim().min(4, {message: 'A senha precisa ter 4 ou mais caracteres.'}),
  confirmPassword: z.string().trim().min(4)
}).superRefine(({confirmPassword, password}, ctx) => {
if(confirmPassword !== password) {
  ctx.addIssue({
    code: 'custom',
    message: 'Senhas diferentes'
  })
}
})

export const LoginSchema = z.object({
  email: z.string().trim().email({message: 'Informe um endereço de email válido.'}),
  password: z.string().trim().min(4, {message: 'A senha precisa ter 4 ou mais caracteres.'}),
})