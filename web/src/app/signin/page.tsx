"use client";

import Link from "next/link";
import Button from "../components/Button";
import Input from "../components/Input";
import React, { useState } from "react";
import { authenticate } from "../services/auth";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { push } = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const payload = {
      username: e.currentTarget.Username.value,
      password: e.currentTarget.Password.value,
    };

    try {
      setIsLoading(true);

      await authenticate(payload.username, payload.password);
      const result = await authenticate(
        payload.username,
        payload.password
      ).catch();

      if (result === true) {
        setIsLoading(false);

        return push("/dashboard");
      } else {
        setIsLoading(false);

        toast.error(`Invalid username or password.`, {
          duration: 4000,
          position: "top-center",
          style: {
            background: "#161616",
            color: "#fcfcfc",
          },
        });
      }
    } catch (error) {
      const err = error as AxiosError;
      console.log(err);
      toast.error(`Erro: ${err}`);
    }

    return;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full  min-h-screen">
      <form onSubmit={handleSubmit} className="flex flex-col max-w-xs gap-1">
        <Input name="Username" placeholder="username" type="text" required />
        <Input
          name="Password"
          placeholder="********"
          type="password"
          required
        />
        <Button isLoading={isLoading} className="mt-10" type="submit">
          Login
        </Button>
        <Link
          className="mt-4 font-medium hover:text-primaryColor transition-all duration-500 ease-in-out flex flex-col items-center"
          href="/"
        >
          Back to home
        </Link>
      </form>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}
