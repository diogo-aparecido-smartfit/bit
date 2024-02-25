"use server";

import { cookies } from "next/headers";

const apiUrl = process.env.API_URL || "";

export async function authenticate(Username: string, Password: string) {
  try {
    const token = cookies().get("jwt")?.value;

    if (token) {
      cookies().delete("jwt");
    }

    const response = await fetch(`${apiUrl}/auth/signin`, {
      method: "POST",
      headers: {
        "Cache-Control": "no-cache",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Name: Username, Password }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.log(`Error: ${data.message}`);

      return {
        error: {
          message: data.message,
          status: data.status,
        },
      };
    }

    cookies().set({
      name: "jwt",
      value: data.token,
      httpOnly: true,
      sameSite: "strict",
      maxAge: 36000,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return response.ok;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        status: 400,
        message: `Falha na autenticação: (${error.message})`,
      };
    }
  }
}

export async function logout() {
  try {
    const cookieStore = cookies();
    const getToken = cookieStore.get("jwt");

    if (!getToken) {
      return {
        error: {
          message: "Unauthorized",
          status: 401,
        },
      };
    }

    cookieStore.delete("jwt");

    return { success: true };
  } catch (error) {
    return {
      error: {
        message: error,
        status: 400,
      },
    };
  }
}
