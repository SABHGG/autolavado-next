import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "./lib/zod";
import { db } from "./lib/db";
import bcrypt from "bcryptjs";

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const { data, success } = loginSchema.safeParse(credentials);
        if (!success) {
          throw new Error("Credenciales invalidas");
        }
        // buscar si el usuario existe en la base de datos
        const user = await db.user.findFirst({
          where: {
            email: data.email,
          },
        });

        if (!user || !user.contrasena) {
          throw new Error("Usuario no encontrado");
        }

        const isValid = await bcrypt.compare(data.password, user.contrasena);

        if (!isValid) {
          throw new Error("Contraseña incorrecta");
        }

        return {
          ...user,
          id: user.id.toString(), // Ensure id is a string
        };
      },
    }),
  ],
} satisfies NextAuthConfig;
