import { DefaultSession } from "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      rol?: string;
      nombre?: string;
    } & DefaultSession["user"];
  }

  interface User {
    rol?: string;
    nombre?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    rol?: string;
    nombre?: string;
  }
}