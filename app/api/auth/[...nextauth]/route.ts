import prisma from "@/app/lib/prisma"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcrypt'

const handler = NextAuth({
  session: {
    strategy: "jwt"
  },
  pages:{

  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
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
        // should return a user if authenticated
        // Return null if user data could not be retrieved
        return null
      }
    })
  ]
})

export { handler as GET, handler as POST }