import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import {db} from "@/lib/db";
import authConfig from "@/auth.config";


export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  ...authConfig,
  session:{ strategy: 'jwt'},
  callbacks: {
    jwt({ token, user }) {
      if (user) { // User is available during sign-in
        token.rol = user.rol
        token.nombre = user.nombre
      }
      return token
    },
    session({ session, token }) {
      session.user.rol = token.rol
      session.user.nombre = token.nombre
      return session
    },
  }
});
