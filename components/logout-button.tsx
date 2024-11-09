"use client"
import { signOut } from "next-auth/react";

const LogoutButton = () => {
    const handleClick = async () => {
        await signOut({
            callbackUrl: "/login",
        });
    }
  return (
    <a onClick={handleClick}>logOut</a>
  )
}

export default LogoutButton