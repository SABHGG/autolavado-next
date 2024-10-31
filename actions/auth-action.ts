"use server";
import { signIn } from "@/auth";
import { loginSchema, registerSchema } from "@/lib/zod";
import { AuthError } from "next-auth";
import { z } from "zod";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export const loginAction = async (values: z.infer<typeof loginSchema>) => {
  try {
    await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: error.cause?.err?.message };
    }
    return { error: "Error 500" };
  }
};

export const registerAction = async (
  values: z.infer<typeof registerSchema>
) => {
  try {
    const { data, success } = registerSchema.safeParse(values);
    if (!success) {
      return {
        error: "Datos invalidos",
      };
    }
    // verificar si el usuario ya existe
    const user = await db.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (user) {
      return {
        error: "Usuario ya existe",
      };
    }

    // crear el usuario

    const passwordHashed = await bcrypt.hash(data.password, 10);

    await db.user.create({
      data: {
        nombre: data.name,
        email: data.email,
        contrasena: passwordHashed,
        telefono: data.telefono,
      },
    });

    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: error.cause?.err?.message };
    }
    return { error: "Error 500" };
  }
};
