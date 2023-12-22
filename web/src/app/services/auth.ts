"use server";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { error } from "console";
import { ok } from "assert";

const apiUrl = process.env.API_URL || "";

export async function authenticate(Username: string, Password: string) {
  try {
    const response = await fetch(`${apiUrl}/api/v1/auth`, {
      method: "POST",
      headers: {
        "Cache-Control": "no-cache",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Username, Password }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.log(`Erro: ${data.message}`);

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

export async function isAuthenticated() {
  try {
    const token = cookies().get("jwt")?.value;

    if (!token) {
      return {
        error: {
          message: "Unauthorized",
          status: 401,
        },
      };
    }

    const secret = process.env.SECRET_KEY || "";

    jwt.verify(token, secret);
    return true;
  } catch (error: unknown) {
    console.log(`Error: ${error}`);
    return {
      error: {
        message: "Unauthorized",
        status: 401,
      },
    };
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
