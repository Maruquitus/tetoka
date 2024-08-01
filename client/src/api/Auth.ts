import { AuthenticatedUser } from "@/interfaces";

export async function checkAuthenticated() {
  return (await (await fetch("/api/auth/check")).json()) as [
    boolean,
    AuthenticatedUser
  ];
}

export async function logOut() {
  return await fetch("/api/auth/logout", { method: "POST" });
}
