"use server";
import { db } from "@/lib/db";
import { registerSchema } from "@/lib/zod";
import { z } from "zod";

type User = z.infer<typeof registerSchema>;

export const getUser = async () => {
  const users = await db.user.findMany({
    select: {
      id: true,
      nombre: true,
      email: true,
      telefono: true,
      rol: true,
    },
  });
  return users;
};

export const deleteUser = async (id: number) => {
  try {
    const user = db.user.findUnique({ where: { id } });

    if (!user) {
      return {
        status: 404,
        message: `Usuario con el id ${id} no encontrado`,
      };
    }

    await db.user.delete({
      where: {
        id,
      },
    });

    return {
      status: 200,
      message: `Usuario con el id ${id} eliminado`,
    };

  } catch (error) {
    if(error instanceof Error) {
      return {
        status: 500,
        message: `Error al eliminar el usuario con el id ${id}`,
        error: error.message,
      };
    }
  }
};

export const uptdateUser = async (id: number, data: User) => {
  await db.user.update({
    where: {
      id,
    },
    data,
  });
};
