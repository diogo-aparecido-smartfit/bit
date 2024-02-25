"use server";

import { cookies } from "next/headers";

import * as jose from "jose";

const jwtConfig = {
  secret: new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET),
};

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

    const decoded = await jose.jwtVerify(token, jwtConfig.secret);

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
