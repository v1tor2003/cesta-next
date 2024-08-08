import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials"
import { LoginSchema } from "../schemas";
import { getUserByEmail } from "./actions";
import bcrypt from 'bcryptjs'
import { ZodError } from "zod";

const TOKEN_MAX_DURATION_TIME: number = 30 * 24 * 60 * 60 // 30 days in secs

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: TOKEN_MAX_DURATION_TIME
  },
  pages: {
    signIn: process.env.LOGIN_PAGE
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {}
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = await LoginSchema.parseAsync(credentials)
          const res = await getUserByEmail(email)
          
          if(!res || !bcrypt.compareSync(password, res.usuario_senha)) return null
          
          const user: User = {
            id: res.usuario_id.toString(),
            email: res.usuario_email,
            name: res.usuario_nome
          }

          return user   
        } catch (error) {
          if(error instanceof ZodError) console.log('validation error')
          return null
        }        
      }
    })
  ],
  callbacks: {
    async jwt({ token, user}) {
      if(user) 
        return {
          ...token,
          id: user.id
        }
      
      return token
    },
    async session({session, token}) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string
        }
      }
    }
  }
})