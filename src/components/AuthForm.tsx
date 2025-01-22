"use server";

import { login, register } from "@/actions/auth";

import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface Props {
  type: "login" | "register";
  error?: string;
}

export default async function AuthForm({ type, error }: Props) {
  const cookiesStore = await cookies();

  if (cookiesStore.has("access_token")) {
    redirect("/");
  }

  return (
    <div className="pt-16 relative">
      <h2 className="font-bold text-3xl text-logo1 mb-9 text-center">
        {type === "login" ? "LOGIN" : "REGISTRATION"}
      </h2>

      {error && (
        <div className="absolute top-4 right-4 bg-error-light text-error border border-error rounded-md px-4 py-2 text-xs shadow-lg">
          {error}
        </div>
      )}

      <form action={type === "login" ? login : register}>
        <label className="block mb-6">
          <span className="block text-logo1 font-bold text-sm mb-3">
            Username
          </span>
          <input
            type="text"
            name="username"
            placeholder="Ex. john_doe"
            className={`p-4 border rounded-lg w-full bg-background4 outline-none font-normal text-sm border-background3 ${
              error ? "border-error" : ""
            }`}
          />
        </label>

        <label className="block mb-12">
          <span className="block text-logo1 font-bold text-sm mb-3">
            Password
          </span>
          <input
            type="password"
            name="password"
            className={`p-4 border rounded-lg w-full bg-background4 outline-none font-normal text-sm border-background3 ${
              error ? "border-error" : ""
            }`}
          />
        </label>

        <button
          type="submit"
          className="w-full bg-accent py-4 font-bold text-sm flex items-center justify-center gap-2 rounded-lg"
        >
          <span>{type === "login" ? "Login" : "Create account"}</span>
        </button>
      </form>

      <Link
        href={type === "login" ? "/register" : "/login"}
        className="underline mx-auto w-fit block mt-6 text-logo1 text-sm"
      >
        {type === "login" ? "Create account" : "Login to existed account"}
      </Link>
    </div>
  );
}
