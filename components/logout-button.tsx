"use client"
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

const LogoutButton = () => {
    const handleClick = async () => {
        await signOut({
            callbackUrl: "/login",
        });
    }
  return (
    <Button onClick={handleClick}>logOut</Button>
  )
}

export default LogoutButton