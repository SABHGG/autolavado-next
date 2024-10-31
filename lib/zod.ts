import { object, string } from "zod";

export const loginSchema = object({
  email: string({ required_error: "El email es requerido" })
    .min(1, "El email es requerido")
    .email("El email no es válido"),
  password: string({ required_error: "La contraseña es requerida" })
    .min(1, "La contraseña es requerida")
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .max(32, "La contraseña debe tener como máximo 32 caracteres"),
});

export const registerSchema = object({
  name: string({ required_error: "El nombre es requerido" })
    .min(1, "El nombre es requerido")
    .max(32, "El nombre debe tener como máximo 32 caracteres"),
  email: string({ required_error: "El email es requerido" })
    .min(1, "El email es requerido")
    .email("El email no es válido"),
  password: string({ required_error: "La contraseña es requerida" })
    .min(1, "La contraseña es requerida")
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .max(32, "La contraseña debe tener como máximo 32 caracteres"),
  telefono: string({ required_error: "El telefono es requerido" })
    .min(1, "El telefono es requerido")
    .max(10, "El telefono debe tener como máximo 10 caracteres"),
});
