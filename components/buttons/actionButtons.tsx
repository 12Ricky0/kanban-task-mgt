"use client";
import { signOut, signIn } from "next-auth/react";

export function SignOut() {
  return <button onClick={() => signOut()}>Sign Out</button>;
}

export function SignIn() {
  return (
    <button onClick={() => signIn("github", { redirectTo: "/dashboard" })}>
      Sign In
    </button>
  );
}
