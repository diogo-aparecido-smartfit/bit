import { useRouter } from "next/router";
import { logout } from "../services/auth";

export async function handleLogout() {
  const result = await logout().catch();

  if (result.success === true) {
    window.location.replace("/");
  }
}
