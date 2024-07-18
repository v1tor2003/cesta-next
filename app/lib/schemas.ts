import * as z from 'zod'

export const RegisterSchema = z.object({
  email: z.string().trim().email({message: 'Informe um endereço de email válido.'}),
  username: z.string().trim().min(1, {message: 'Informe um nome para seu usuário.'}),
  password: z.string().trim().min(4, {message: 'A senha precisa ter 4 ou mais caracteres.'}),
  confirmPassword: z.string().trim().min(4, {message: 'As senhas devem se confirmar.'})
}).superRefine(({confirmPassword, password}, ctx) => {
if(confirmPassword !== password) {
  ctx.addIssue({
    code: 'custom',
    message: 'As senhas devem se confirmar.'
  })
}
})

export const LoginSchema = z.object({
  email: z.string().trim().email({message: 'Informe um endereço de email válido.'}),
  password: z.string().trim().min(4, {message: 'Informe uma senha válida.'}),
})

export const EditUserSchema = z.object({
  user_id: z.string().trim().min(1, {message: 'Id de usuário inválido.'}),
  email: z.string().trim().email({message: 'Informe um endereço de email válido.'}),
  name: z.string().trim().min(1, {message: 'Informe um nome válido para o usuário.'})
})