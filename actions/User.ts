import {db} from "@/lib/db";
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
  await db.user.delete({
    where: {
      id,
    },
  });
}; 

export const uptdateUser = async (id: number, data: User ) => {
  await db.user.update({
    where: {
      id,
    },
    data,
  });
};