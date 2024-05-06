import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcrypt'
import prisma from "@/app/lib/prisma"

const handler = NextAuth({
  pages:{
    signIn: '/auth/login'
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const {email, password} = credentials as {
          email: string,
          password: string
        }

        const res = await prisma.tabela_usuarios.findFirst({
          where:{
            usuario_email: email
          }
        })
        
        if(!res) return null
       
        const passwordMatches = bcrypt.compareSync(password, res.usuario_senha)
        
        const user = {
          id: (res.usuario_id).toString(),
          name: res.usuario_nome, 
          email: res.usuario_email
        }

        if(passwordMatches) return user
        return null
      }
    })
  ],
  callbacks: {
    // we can add properties from the user to the token
    async jwt({token, user}){
      if(user) token.name = user.name
      return token
    },
    // we can add properties from the token to the session
    async session({session, token}){
      if(session?.user) session.user.name = token.name
      return session
    },
  }
})

export { handler as GET, handler as POST }